/**
 * Backend de UniVuelta sobre Google Sheets.
 * Pega este código en Extensiones > Apps Script del Google Sheet,
 * reemplazando el contenido de Code.gs, y publícalo como Web App.
 *
 * Convenciones:
 * - Cada pestaña (Sheet) es una "tabla". La fila 1 son los headers.
 * - La columna A de cada pestaña debe llamarse "id" y ser única.
 * - GET  ?sheet=Viajes&action=list           -> lista todas las filas
 * - GET  ?sheet=Viajes&action=list&origen=Santiago -> filtra por igualdad exacta
 * - GET  ?sheet=Viajes&action=get&id=3        -> una fila por id
 * - POST { sheet, action:'create', data:{...} }
 * - POST { sheet, action:'update', id, data:{...} }
 * - POST { sheet, action:'delete', id }
 * - POST { sheet:'usuarios', action:'solicitarVerificacion', data:{...} }
 *     -> envía el correo de verificación con las 3 fotos a REVISORES
 * - GET  ?action=verificar&id=...&token=...
 *     -> link que se hace clic desde el correo, marca verificado=true
 *
 * IMPORTANTE sobre POST desde el navegador: para evitar el preflight CORS,
 * el cliente debe enviar el body con header Content-Type: text/plain
 * (aunque el contenido sea JSON). Este script lo parsea igual.
 *
 * La pestaña "usuarios" necesita una columna extra: "token_verificacion".
 */

// Agrega aquí los correos de las personas que revisan y aprueban perfiles.
// MailApp acepta varios destinatarios separados por coma.
const REVISORES = [
  'david.riveros723@gmail.com',
  // 'segundo.revisor@gmail.com',
  // 'tercer.revisor@gmail.com',
];

function doGet(e) {
  if (e.parameter.action === 'verificar') {
    return verificarUsuario(e.parameter);
  }
  return handleRequest(e.parameter, 'GET');
}

function doPost(e) {
  const body = JSON.parse(e.postData.contents || '{}');
  return handleRequest(body, 'POST');
}

function handleRequest(params, method) {
  try {
    const sheetName = params.sheet;
    if (!sheetName) return jsonResponse({ error: 'Falta parámetro "sheet"' });

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    if (!sheet) return jsonResponse({ error: 'La hoja "' + sheetName + '" no existe' });

    const action = params.action || 'list';

    if (method === 'GET' && action === 'list') return jsonResponse(listRows(sheet, params));
    if (method === 'GET' && action === 'get') return jsonResponse(getRow(sheet, params.id));
    if (method === 'POST' && action === 'create') return jsonResponse(createRow(sheet, params.data));
    if (method === 'POST' && action === 'update') return jsonResponse(updateRow(sheet, params.id, params.data));
    if (method === 'POST' && action === 'delete') return jsonResponse(deleteRow(sheet, params.id));
    if (method === 'POST' && action === 'solicitarVerificacion') return jsonResponse(enviarVerificacion(sheet, params.data));

    return jsonResponse({ error: 'Combinación método/acción no soportada' });
  } catch (err) {
    return jsonResponse({ error: err.message });
  }
}

function getHeaders(sheet) {
  return sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
}

function rowToObject(headers, row) {
  const obj = {};
  headers.forEach(function (h, i) { obj[h] = row[i]; });
  return obj;
}

function listRows(sheet, params) {
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  let rows = data.slice(1)
    .filter(function (r) { return r[0] !== '' && r[0] !== null; })
    .map(function (row) { return rowToObject(headers, row); });

  Object.keys(params).forEach(function (key) {
    if (key === 'sheet' || key === 'action') return;
    rows = rows.filter(function (r) { return String(r[key]) === String(params[key]); });
  });
  return rows;
}

function getRow(sheet, id) {
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const row = data.slice(1).find(function (r) { return String(r[0]) === String(id); });
  return row ? rowToObject(headers, row) : null;
}

// Sheets autoconvierte texto tipo "2026-07-01" o "17:00" a celdas de
// Fecha/Hora reales, lo que rompe el formato esperado por el cliente
// (y arrastra desfases de huso horario al leerlas de vuelta). Forzamos
// formato de texto plano en estas columnas antes de escribir el valor.
const COLUMNAS_TEXTO_PLANO = ['fecha', 'hora'];

function createRow(sheet, data) {
  const headers = getHeaders(sheet);
  if (!data.id) data.id = Utilities.getUuid();
  const row = headers.map(function (h) { return data[h] !== undefined ? data[h] : ''; });
  const targetRow = sheet.getLastRow() + 1;
  headers.forEach(function (h, i) {
    if (COLUMNAS_TEXTO_PLANO.indexOf(h) !== -1) {
      sheet.getRange(targetRow, i + 1).setNumberFormat('@');
    }
  });
  sheet.getRange(targetRow, 1, 1, headers.length).setValues([row]);
  return data;
}

function updateRow(sheet, id, data) {
  const values = sheet.getDataRange().getValues();
  const headers = values[0];
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][0]) === String(id)) {
      headers.forEach(function (h, col) {
        if (data[h] !== undefined) {
          const cell = sheet.getRange(i + 1, col + 1);
          if (COLUMNAS_TEXTO_PLANO.indexOf(h) !== -1) cell.setNumberFormat('@');
          cell.setValue(data[h]);
        }
      });
      return getRow(sheet, id);
    }
  }
  throw new Error('ID no encontrado: ' + id);
}

function deleteRow(sheet, id) {
  const values = sheet.getDataRange().getValues();
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][0]) === String(id)) {
      sheet.deleteRow(i + 1);
      return { deleted: id };
    }
  }
  throw new Error('ID no encontrado: ' + id);
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// ── Verificación de identidad por correo ─────────────────────────────────

// Convierte un data URL "data:image/jpeg;base64,...." en un Blob para
// adjuntar/incrustar en el correo.
function dataUrlToBlob(dataUrl, filename) {
  const match = String(dataUrl || '').match(/^data:(.+);base64,(.*)$/);
  if (!match) return null;
  const contentType = match[1];
  const bytes = Utilities.base64Decode(match[2]);
  return Utilities.newBlob(bytes, contentType, filename);
}

function enviarVerificacion(sheet, data) {
  if (!data || !data.id) throw new Error('Falta el id del usuario');

  const token = Utilities.getUuid();
  const values = sheet.getDataRange().getValues();
  const headers = values[0];
  const idCol = headers.indexOf('id');
  const tokenCol = headers.indexOf('token_verificacion');
  if (tokenCol === -1) throw new Error('Falta la columna "token_verificacion" en la hoja usuarios');

  let encontrado = false;
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][idCol]) === String(data.id)) {
      sheet.getRange(i + 1, tokenCol + 1).setValue(token);
      encontrado = true;
      break;
    }
  }
  if (!encontrado) throw new Error('Usuario no encontrado: ' + data.id);

  const frente = dataUrlToBlob(data.carnetFrente, 'carnet_frente.jpg');
  const reverso = dataUrlToBlob(data.carnetReverso, 'carnet_reverso.jpg');
  const credencial = dataUrlToBlob(data.credencial, 'credencial.jpg');
  if (!frente || !reverso || !credencial) throw new Error('Faltan fotos de verificación');

  const verifyUrl = ScriptApp.getService().getUrl()
    + '?action=verificar&id=' + encodeURIComponent(data.id)
    + '&token=' + encodeURIComponent(token);

  const htmlBody =
    '<div style="font-family:sans-serif;max-width:480px">' +
    '<h2>Solicitud de verificación — UniVuelta</h2>' +
    '<p><b>Nombre:</b> ' + data.nombre + '<br>' +
    '<b>Email:</b> ' + data.email + '<br>' +
    '<b>Universidad:</b> ' + data.universidad + '<br>' +
    '<b>Rol:</b> ' + data.rol + '</p>' +
    '<p><b>Carnet (frente):</b><br><img src="cid:frente" style="max-width:100%;border-radius:8px"></p>' +
    '<p><b>Carnet (reverso):</b><br><img src="cid:reverso" style="max-width:100%;border-radius:8px"></p>' +
    '<p><b>Credencial universitaria:</b><br><img src="cid:credencial" style="max-width:100%;border-radius:8px"></p>' +
    '<p style="margin-top:20px">Si los documentos corresponden a una persona real y la información calza, confirma su perfil:</p>' +
    '<a href="' + verifyUrl + '" style="display:inline-block;background:#2563eb;color:#fff;padding:12px 22px;border-radius:8px;text-decoration:none;font-weight:bold">✅ Verificar este perfil</a>' +
    '</div>';

  MailApp.sendEmail({
    to: REVISORES.join(','),
    subject: 'Verificación de identidad — ' + data.nombre,
    htmlBody: htmlBody,
    inlineImages: { frente: frente, reverso: reverso, credencial: credencial },
  });

  return { ok: true };
}

function verificarUsuario(params) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('usuarios');
  if (!sheet) return HtmlService.createHtmlOutput('<h2>Error</h2><p>No se encontró la hoja "usuarios".</p>');

  const values = sheet.getDataRange().getValues();
  const headers = values[0];
  const idCol = headers.indexOf('id');
  const tokenCol = headers.indexOf('token_verificacion');
  const verifCol = headers.indexOf('verificado');
  const nombreCol = headers.indexOf('nombre');

  for (let i = 1; i < values.length; i++) {
    if (String(values[i][idCol]) === String(params.id)) {
      const tokenGuardado = tokenCol !== -1 ? values[i][tokenCol] : '';
      if (!params.token || String(tokenGuardado) !== String(params.token)) {
        return HtmlService.createHtmlOutput(
          '<div style="font-family:sans-serif;text-align:center;padding:40px">'
          + '<h2>Enlace inválido</h2><p>Este enlace de verificación no es válido o ya fue usado.</p></div>'
        );
      }
      if (verifCol !== -1) sheet.getRange(i + 1, verifCol + 1).setValue(true);
      const nombre = nombreCol !== -1 ? values[i][nombreCol] : '';
      return HtmlService.createHtmlOutput(
        '<div style="font-family:sans-serif;text-align:center;padding:40px">'
        + '<h1>✅ Perfil verificado</h1>'
        + '<p>' + nombre + ' ya puede publicar y reservar viajes en UniVuelta.</p></div>'
      );
    }
  }
  return HtmlService.createHtmlOutput('<h2>Usuario no encontrado</h2>');
}
