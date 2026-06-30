// Datos de ejemplo migrados desde el prototipo original (index.html).
// Esta capa simula lo que hoy vendría de la tabla `trips` (con join a
// `users`/`vehicles`/`trip_genres`) una vez que se conecte la base de datos.
// Ver lib/services/trips.ts para el punto único donde reemplazar esto por
// llamadas reales a Supabase/Postgres.

import type { SociabilityLevel, Trip } from './types';

export const SOCIABILITY_LEVELS: Record<number, SociabilityLevel> = {
  "1": {
    "level": 1,
    "label": "Introvertido",
    "emoji": "🎧",
    "desc": "Prefiero silencio en el viaje"
  },
  "2": {
    "level": 2,
    "label": "Reservado",
    "emoji": "📖",
    "desc": "Converso si me hablan"
  },
  "3": {
    "level": 3,
    "label": "Neutro",
    "emoji": "😊",
    "desc": "Me adapto al ambiente"
  },
  "4": {
    "level": 4,
    "label": "Sociable",
    "emoji": "💬",
    "desc": "Me gusta conversar"
  },
  "5": {
    "level": 5,
    "label": "Muy Sociable",
    "emoji": "🎉",
    "desc": "¡Bienvenidas las conversaciones!"
  }
};

export const CITIES: string[] = [
  "Chillán",
  "Concepción",
  "Curicó",
  "La Serena",
  "Rancagua",
  "Rengo",
  "San Fernando",
  "Santiago",
  "Talca",
  "Temuco",
  "Valparaíso",
  "Viña del Mar"
];

export const MOCK_TRIPS: Trip[] = [
  {
    "id": "1",
    "driver": {
      "id": "driver-1",
      "fullName": "Carlos Martínez",
      "initials": "CM",
      "avatarClass": "av-blue",
      "gender": "M",
      "verificationType": "Estudiante Verificado",
      "badgeClass": "b-blue",
      "badgeIcon": "🎓",
      "university": "UDP",
      "careerOrRole": "3er año Diseño",
      "rating": 4.9,
      "reviewCount": 23,
      "vehicle": "Suzuki Swift 2020"
    },
    "origin": "Santiago",
    "destination": "Valparaíso",
    "originPoint": "Metro U. de Santiago (L9)",
    "destinationPoint": "Valparaíso, centro",
    "dateISO": "2026-05-30",
    "dateLabel": "Viernes 30 may",
    "time": "17:00",
    "priceCLP": 4500,
    "seatsTotal": 3,
    "seatsAvailable": 3,
    "genres": [
      "Indie",
      "Rock Alternativo",
      "Pop"
    ],
    "sociabilityLevel": 3,
    "driverNote": "\"Viajo todos los fines de semana. Música tranquila, sin paradas extra.\"",
    "reviews": [
      {
        "id": "1-rev-0",
        "authorName": "Ana R.",
        "stars": 5,
        "comment": "Muy buen conductor, puntual y amable."
      },
      {
        "id": "1-rev-1",
        "authorName": "Diego F.",
        "stars": 5,
        "comment": "Todo perfecto. Llegamos antes de lo esperado."
      }
    ],
    "weekDays": [
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "11",
    "driver": {
      "id": "driver-11",
      "fullName": "Camila Torres",
      "initials": "CT",
      "avatarClass": "av-pink",
      "gender": "F",
      "verificationType": "Estudiante Verificada",
      "badgeClass": "b-blue",
      "badgeIcon": "🎓",
      "university": "PUC",
      "careerOrRole": "2do año Letras",
      "rating": 4.7,
      "reviewCount": 14,
      "vehicle": "Mazda 2 2021"
    },
    "origin": "Santiago",
    "destination": "Valparaíso",
    "originPoint": "Metro Baquedano (L1/L5)",
    "destinationPoint": "Valparaíso, Av. Argentina",
    "dateISO": "2026-05-30",
    "dateLabel": "Viernes 30 may",
    "time": "15:00",
    "priceCLP": 4000,
    "seatsTotal": 3,
    "seatsAvailable": 3,
    "genres": [
      "Pop",
      "K-Pop",
      "Indie"
    ],
    "sociabilityLevel": 4,
    "driverNote": "\"Salida a las 15:00 puntual. Música suave, viaje tranquilo.\"",
    "reviews": [
      {
        "id": "11-rev-0",
        "authorName": "Laura V.",
        "stars": 5,
        "comment": "Muy simpática, llegamos antes de lo esperado."
      },
      {
        "id": "11-rev-1",
        "authorName": "Tomás A.",
        "stars": 5,
        "comment": "Todo perfecto."
      }
    ],
    "weekDays": [
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "12",
    "driver": {
      "id": "driver-12",
      "fullName": "Rodrigo Soto",
      "initials": "RS",
      "avatarClass": "av-green",
      "gender": "M",
      "verificationType": "Egresado Verificado",
      "badgeClass": "b-purple",
      "badgeIcon": "🏛️",
      "university": "USACH",
      "careerOrRole": "Egresado Ing. Eléctrica",
      "rating": 4.8,
      "reviewCount": 29,
      "vehicle": "Honda Fit 2020"
    },
    "origin": "Santiago",
    "destination": "Valparaíso",
    "originPoint": "Metro U. de Santiago (L9)",
    "destinationPoint": "Valparaíso, Puerto",
    "dateISO": "2026-05-31",
    "dateLabel": "Sábado 31 may",
    "time": "10:00",
    "priceCLP": 4500,
    "seatsTotal": 2,
    "seatsAvailable": 2,
    "genres": [
      "Rock",
      "Alternativo",
      "Metal"
    ],
    "sociabilityLevel": 2,
    "driverNote": "\"Salida el sábado a las 10. Sin paradas, directo al puerto.\"",
    "reviews": [
      {
        "id": "12-rev-0",
        "authorName": "Marcela P.",
        "stars": 5,
        "comment": "Puntual y muy seguro."
      },
      {
        "id": "12-rev-1",
        "authorName": "Felipe R.",
        "stars": 5,
        "comment": "Recomendado."
      }
    ],
    "weekDays": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "13",
    "driver": {
      "id": "driver-13",
      "fullName": "Patricia Mora",
      "initials": "PM",
      "avatarClass": "av-amber",
      "gender": "F",
      "verificationType": "Verificado Plus",
      "badgeClass": "b-amber",
      "badgeIcon": "⭐",
      "university": "U. de Chile",
      "careerOrRole": "Docente Fac. Artes",
      "rating": 4.9,
      "reviewCount": 52,
      "vehicle": "Hyundai Tucson 2022"
    },
    "origin": "Santiago",
    "destination": "Valparaíso",
    "originPoint": "Metro U. de Chile (L1)",
    "destinationPoint": "Valparaíso, Cerro Alegre",
    "dateISO": "2026-05-29",
    "dateLabel": "Jueves 29 may",
    "time": "17:30",
    "priceCLP": 5000,
    "seatsTotal": 3,
    "seatsAvailable": 3,
    "genres": [
      "Jazz",
      "Clásica",
      "Folclore"
    ],
    "sociabilityLevel": 3,
    "driverNote": "\"Jueves en la tarde. Viaje cómodo con A/C, más de 50 viajes en la plataforma.\"",
    "reviews": [
      {
        "id": "13-rev-0",
        "authorName": "Sofía B.",
        "stars": 5,
        "comment": "Increíble conductora, auto impecable."
      },
      {
        "id": "13-rev-1",
        "authorName": "Andrés C.",
        "stars": 5,
        "comment": "Muy profesional."
      }
    ],
    "weekDays": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "14",
    "driver": {
      "id": "driver-14",
      "fullName": "Daniela Reyes",
      "initials": "DR",
      "avatarClass": "av-purple",
      "gender": "F",
      "verificationType": "Estudiante Verificada",
      "badgeClass": "b-blue",
      "badgeIcon": "🎓",
      "university": "UDP",
      "careerOrRole": "3er año Comunicación",
      "rating": 4.6,
      "reviewCount": 9,
      "vehicle": "Chevrolet Sail 2021"
    },
    "origin": "Santiago",
    "destination": "Valparaíso",
    "originPoint": "Metro Baquedano (L1/L5)",
    "destinationPoint": "Valparaíso, centro",
    "dateISO": "2026-06-05",
    "dateLabel": "Viernes 5 jun",
    "time": "17:00",
    "priceCLP": 4000,
    "seatsTotal": 4,
    "seatsAvailable": 4,
    "genres": [
      "R&B",
      "Indie",
      "Pop"
    ],
    "sociabilityLevel": 4,
    "driverNote": "\"Viernes 5 de junio. Ambiente relajado, se acepta parada rápida.\"",
    "reviews": [
      {
        "id": "14-rev-0",
        "authorName": "Carla M.",
        "stars": 5,
        "comment": "Simpática y puntual."
      }
    ],
    "weekDays": [
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "2",
    "driver": {
      "id": "driver-2",
      "fullName": "Sofía Ramírez",
      "initials": "SR",
      "avatarClass": "av-purple",
      "gender": "F",
      "verificationType": "Egresada Verificada",
      "badgeClass": "b-purple",
      "badgeIcon": "🏛️",
      "university": "PUC",
      "careerOrRole": "Egresada Ingeniería",
      "rating": 5,
      "reviewCount": 41,
      "vehicle": "Toyota Yaris 2022"
    },
    "origin": "Santiago",
    "destination": "Viña del Mar",
    "originPoint": "Metro Baquedano (L1/L5)",
    "destinationPoint": "Viña del Mar, Av. España",
    "dateISO": "2026-05-30",
    "dateLabel": "Viernes 30 may",
    "time": "18:30",
    "priceCLP": 5000,
    "seatsTotal": 2,
    "seatsAvailable": 2,
    "genres": [
      "Jazz",
      "Bossa Nova",
      "Clásica"
    ],
    "sociabilityLevel": 2,
    "driverNote": "\"Egresada PUC. Auto limpio, no fumar, llegamos puntual.\"",
    "reviews": [
      {
        "id": "2-rev-0",
        "authorName": "Martín P.",
        "stars": 5,
        "comment": "Perfecta conductora, muy responsable."
      },
      {
        "id": "2-rev-1",
        "authorName": "Camila V.",
        "stars": 5,
        "comment": "La recomiendo."
      }
    ],
    "weekDays": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "15",
    "driver": {
      "id": "driver-15",
      "fullName": "Tomás Herrera",
      "initials": "TH",
      "avatarClass": "av-blue",
      "gender": "M",
      "verificationType": "Estudiante Verificado",
      "badgeClass": "b-blue",
      "badgeIcon": "🎓",
      "university": "UDP",
      "careerOrRole": "3er año Com. Audiovisual",
      "rating": 4.7,
      "reviewCount": 16,
      "vehicle": "Kia Rio 2020"
    },
    "origin": "Santiago",
    "destination": "Viña del Mar",
    "originPoint": "Metro U. de Santiago (L9)",
    "destinationPoint": "Viña del Mar, centro",
    "dateISO": "2026-05-30",
    "dateLabel": "Viernes 30 may",
    "time": "17:00",
    "priceCLP": 5000,
    "seatsTotal": 3,
    "seatsAvailable": 3,
    "genres": [
      "Reggaeton",
      "Hip-Hop",
      "Pop"
    ],
    "sociabilityLevel": 5,
    "driverNote": "\"Viernes tarde a Viña. Reggaeton de fondo, buen ambiente.\"",
    "reviews": [
      {
        "id": "15-rev-0",
        "authorName": "Carla R.",
        "stars": 5,
        "comment": "Divertido y puntual."
      },
      {
        "id": "15-rev-1",
        "authorName": "Pablo S.",
        "stars": 4,
        "comment": "Llegamos perfecto."
      }
    ],
    "weekDays": [
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "16",
    "driver": {
      "id": "driver-16",
      "fullName": "Bárbara Fuentes",
      "initials": "BF",
      "avatarClass": "av-pink",
      "gender": "F",
      "verificationType": "Egresada Verificada",
      "badgeClass": "b-purple",
      "badgeIcon": "🏛️",
      "university": "UAI",
      "careerOrRole": "Egresada Arquitectura",
      "rating": 4.8,
      "reviewCount": 33,
      "vehicle": "Nissan Versa 2021"
    },
    "origin": "Santiago",
    "destination": "Viña del Mar",
    "originPoint": "Metro Baquedano (L1/L5)",
    "destinationPoint": "Viña del Mar, Av. Marina",
    "dateISO": "2026-05-31",
    "dateLabel": "Sábado 31 may",
    "time": "09:00",
    "priceCLP": 5500,
    "seatsTotal": 2,
    "seatsAvailable": 2,
    "genres": [
      "Pop",
      "Indie",
      "Bossa Nova"
    ],
    "sociabilityLevel": 3,
    "driverNote": "\"Sábado mañana a Viña. Viaje tranquilo, sin ruidos.\"",
    "reviews": [
      {
        "id": "16-rev-0",
        "authorName": "Ignacio V.",
        "stars": 5,
        "comment": "Conductora muy confiable."
      },
      {
        "id": "16-rev-1",
        "authorName": "Raquel M.",
        "stars": 5,
        "comment": "Todo bien."
      }
    ],
    "weekDays": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "17",
    "driver": {
      "id": "driver-17",
      "fullName": "Marco Pizarro",
      "initials": "MP",
      "avatarClass": "av-green",
      "gender": "M",
      "verificationType": "Estudiante Verificado",
      "badgeClass": "b-blue",
      "badgeIcon": "🎓",
      "university": "U. de Chile",
      "careerOrRole": "4to año Ingeniería",
      "rating": 4.7,
      "reviewCount": 11,
      "vehicle": "Suzuki Swift 2021"
    },
    "origin": "Santiago",
    "destination": "Viña del Mar",
    "originPoint": "Metro U. de Chile (L1)",
    "destinationPoint": "Viña del Mar, sector norte",
    "dateISO": "2026-06-05",
    "dateLabel": "Viernes 5 jun",
    "time": "18:00",
    "priceCLP": 5000,
    "seatsTotal": 3,
    "seatsAvailable": 3,
    "genres": [
      "Rock",
      "Alternativo",
      "Indie"
    ],
    "sociabilityLevel": 3,
    "driverNote": "\"Viernes 5 de junio a las 18:00. Música tranquila.\"",
    "reviews": [
      {
        "id": "17-rev-0",
        "authorName": "Ana L.",
        "stars": 5,
        "comment": "Buen viaje."
      }
    ],
    "weekDays": [
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "3",
    "driver": {
      "id": "driver-3",
      "fullName": "Diego Fuentes",
      "initials": "DF",
      "avatarClass": "av-green",
      "gender": "M",
      "verificationType": "Estudiante Verificado",
      "badgeClass": "b-blue",
      "badgeIcon": "🎓",
      "university": "USACH",
      "careerOrRole": "4to año Ing. Civil",
      "rating": 4.8,
      "reviewCount": 17,
      "vehicle": "Chevrolet Spark 2019"
    },
    "origin": "Santiago",
    "destination": "Rancagua",
    "originPoint": "Metro Estación Central (L1)",
    "destinationPoint": "Rancagua, terminal",
    "dateISO": "2026-05-30",
    "dateLabel": "Viernes 30 may",
    "time": "16:00",
    "priceCLP": 3500,
    "seatsTotal": 4,
    "seatsAvailable": 4,
    "genres": [
      "Reggaeton",
      "Trap",
      "Hip-Hop"
    ],
    "sociabilityLevel": 5,
    "driverNote": "\"Viajo seguido a Rancagua, salida puntual. Acepto paradas rápidas.\"",
    "reviews": [
      {
        "id": "3-rev-0",
        "authorName": "Luis M.",
        "stars": 5,
        "comment": "Buen viaje, puntual y seguro."
      },
      {
        "id": "3-rev-1",
        "authorName": "Paula G.",
        "stars": 4,
        "comment": "Muy respetuoso."
      }
    ],
    "weekDays": [
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "18",
    "driver": {
      "id": "driver-18",
      "fullName": "Isabella Vega",
      "initials": "IV",
      "avatarClass": "av-pink",
      "gender": "F",
      "verificationType": "Estudiante Verificada",
      "badgeClass": "b-blue",
      "badgeIcon": "🎓",
      "university": "USACH",
      "careerOrRole": "2do año Enfermería",
      "rating": 4.7,
      "reviewCount": 12,
      "vehicle": "Kia Morning 2020"
    },
    "origin": "Santiago",
    "destination": "Rancagua",
    "originPoint": "Metro U. de Santiago (L9)",
    "destinationPoint": "Rancagua, centro",
    "dateISO": "2026-05-30",
    "dateLabel": "Viernes 30 may",
    "time": "17:00",
    "priceCLP": 3000,
    "seatsTotal": 3,
    "seatsAvailable": 3,
    "genres": [
      "Pop",
      "Reggaeton",
      "K-Pop"
    ],
    "sociabilityLevel": 4,
    "driverNote": "\"Comparto viaje todos los viernes. Pop y buena onda garantizados.\"",
    "reviews": [
      {
        "id": "18-rev-0",
        "authorName": "Sofía C.",
        "stars": 5,
        "comment": "Muy agradable el viaje."
      },
      {
        "id": "18-rev-1",
        "authorName": "Matías R.",
        "stars": 5,
        "comment": "Puntual."
      }
    ],
    "weekDays": [
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "19",
    "driver": {
      "id": "driver-19",
      "fullName": "Benjamín Rojas",
      "initials": "BR",
      "avatarClass": "av-blue",
      "gender": "M",
      "verificationType": "Egresado Verificado",
      "badgeClass": "b-purple",
      "badgeIcon": "🏛️",
      "university": "PUC",
      "careerOrRole": "Egresado Derecho",
      "rating": 4.9,
      "reviewCount": 38,
      "vehicle": "Toyota Corolla 2021"
    },
    "origin": "Santiago",
    "destination": "Rancagua",
    "originPoint": "Metro Baquedano (L1/L5)",
    "destinationPoint": "Rancagua, terminal bus",
    "dateISO": "2026-05-31",
    "dateLabel": "Sábado 31 may",
    "time": "08:00",
    "priceCLP": 3500,
    "seatsTotal": 3,
    "seatsAvailable": 3,
    "genres": [
      "Jazz",
      "Blues",
      "Rock"
    ],
    "sociabilityLevel": 2,
    "driverNote": "\"Sábado mañana. Viaje tranquilo, Jazz de fondo.\"",
    "reviews": [
      {
        "id": "19-rev-0",
        "authorName": "Valeria T.",
        "stars": 5,
        "comment": "Excelente conductor."
      },
      {
        "id": "19-rev-1",
        "authorName": "Rodrigo F.",
        "stars": 5,
        "comment": "Muy confiable."
      }
    ],
    "weekDays": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "20",
    "driver": {
      "id": "driver-20",
      "fullName": "Valeria Castro",
      "initials": "VC",
      "avatarClass": "av-purple",
      "gender": "F",
      "verificationType": "Estudiante Verificada",
      "badgeClass": "b-blue",
      "badgeIcon": "🎓",
      "university": "UDP",
      "careerOrRole": "1er año Diseño",
      "rating": 4.6,
      "reviewCount": 6,
      "vehicle": "Chevrolet Aveo 2019"
    },
    "origin": "Santiago",
    "destination": "Rancagua",
    "originPoint": "Metro U. de Santiago (L9)",
    "destinationPoint": "Rancagua, sector sur",
    "dateISO": "2026-05-29",
    "dateLabel": "Jueves 29 may",
    "time": "17:30",
    "priceCLP": 3000,
    "seatsTotal": 2,
    "seatsAvailable": 2,
    "genres": [
      "Pop",
      "R&B",
      "Indie"
    ],
    "sociabilityLevel": 4,
    "driverNote": "\"Jueves tarde, salida puntual desde el metro.\"",
    "reviews": [
      {
        "id": "20-rev-0",
        "authorName": "Florencia M.",
        "stars": 5,
        "comment": "Muy simpática."
      }
    ],
    "weekDays": [
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "4",
    "driver": {
      "id": "driver-4",
      "fullName": "María Jiménez",
      "initials": "MJ",
      "avatarClass": "av-amber",
      "gender": "F",
      "verificationType": "Verificado Plus",
      "badgeClass": "b-amber",
      "badgeIcon": "⭐",
      "university": "U. de Chile",
      "careerOrRole": "Docente Fac. Derecho",
      "rating": 4.9,
      "reviewCount": 68,
      "vehicle": "Hyundai Accent 2021"
    },
    "origin": "Santiago",
    "destination": "Talca",
    "originPoint": "Metro U. de Chile (L1)",
    "destinationPoint": "Talca, centro cívico",
    "dateISO": "2026-05-30",
    "dateLabel": "Viernes 30 may",
    "time": "15:30",
    "priceCLP": 6000,
    "seatsTotal": 3,
    "seatsAvailable": 3,
    "genres": [
      "Pop Latino",
      "Baladas",
      "Cumbia"
    ],
    "sociabilityLevel": 4,
    "driverNote": "\"Viajo cada semana a Talca. A/C, cómodo. Más de 60 viajes en plataforma.\"",
    "reviews": [
      {
        "id": "4-rev-0",
        "authorName": "Rodrigo S.",
        "stars": 5,
        "comment": "Excelente conductora."
      },
      {
        "id": "4-rev-1",
        "authorName": "Isidora L.",
        "stars": 5,
        "comment": "Puntual y segura."
      },
      {
        "id": "4-rev-2",
        "authorName": "Felipe A.",
        "stars": 5,
        "comment": "La mejor experiencia."
      }
    ],
    "weekDays": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "21",
    "driver": {
      "id": "driver-21",
      "fullName": "Nicolás Vargas",
      "initials": "NV",
      "avatarClass": "av-blue",
      "gender": "M",
      "verificationType": "Estudiante Verificado",
      "badgeClass": "b-blue",
      "badgeIcon": "🎓",
      "university": "U. de Chile",
      "careerOrRole": "4to año Medicina",
      "rating": 4.8,
      "reviewCount": 21,
      "vehicle": "Suzuki Vitara 2020"
    },
    "origin": "Santiago",
    "destination": "Talca",
    "originPoint": "Metro U. de Chile (L1)",
    "destinationPoint": "Talca, Av. Lircay",
    "dateISO": "2026-05-30",
    "dateLabel": "Viernes 30 may",
    "time": "16:30",
    "priceCLP": 6000,
    "seatsTotal": 2,
    "seatsAvailable": 2,
    "genres": [
      "Trap",
      "Hip-Hop",
      "Pop"
    ],
    "sociabilityLevel": 3,
    "driverNote": "\"Viernes tarde. Trap de fondo, viaje relajado.\"",
    "reviews": [
      {
        "id": "21-rev-0",
        "authorName": "Javiera P.",
        "stars": 5,
        "comment": "Puntual, buen viaje."
      },
      {
        "id": "21-rev-1",
        "authorName": "Camilo B.",
        "stars": 4,
        "comment": "Todo correcto."
      }
    ],
    "weekDays": [
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "22",
    "driver": {
      "id": "driver-22",
      "fullName": "Andrea Castillo",
      "initials": "AC",
      "avatarClass": "av-amber",
      "gender": "F",
      "verificationType": "Verificado Plus",
      "badgeClass": "b-amber",
      "badgeIcon": "⭐",
      "university": "PUC",
      "careerOrRole": "Docente Psicología",
      "rating": 5,
      "reviewCount": 44,
      "vehicle": "Honda HR-V 2022"
    },
    "origin": "Santiago",
    "destination": "Talca",
    "originPoint": "Metro Baquedano (L1/L5)",
    "destinationPoint": "Talca, terminal Rodoviario",
    "dateISO": "2026-05-31",
    "dateLabel": "Sábado 31 may",
    "time": "07:30",
    "priceCLP": 6500,
    "seatsTotal": 3,
    "seatsAvailable": 3,
    "genres": [
      "Pop",
      "Salsa",
      "Cumbia"
    ],
    "sociabilityLevel": 5,
    "driverNote": "\"Sábado mañana a Talca. Auto familiar, muy cómodo. Salida 100% puntual.\"",
    "reviews": [
      {
        "id": "22-rev-0",
        "authorName": "Macarena V.",
        "stars": 5,
        "comment": "La mejor conductora del portal."
      },
      {
        "id": "22-rev-1",
        "authorName": "Josefa R.",
        "stars": 5,
        "comment": "Super profesional."
      }
    ],
    "weekDays": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "23",
    "driver": {
      "id": "driver-23",
      "fullName": "Daniel Moreno",
      "initials": "DM",
      "avatarClass": "av-green",
      "gender": "M",
      "verificationType": "Egresado Verificado",
      "badgeClass": "b-purple",
      "badgeIcon": "🏛️",
      "university": "USACH",
      "careerOrRole": "Egresado Ing. Mecánica",
      "rating": 4.7,
      "reviewCount": 27,
      "vehicle": "Mazda 3 2020"
    },
    "origin": "Santiago",
    "destination": "Talca",
    "originPoint": "Metro U. de Santiago (L9)",
    "destinationPoint": "Talca, centro",
    "dateISO": "2026-06-05",
    "dateLabel": "Viernes 5 jun",
    "time": "16:00",
    "priceCLP": 5500,
    "seatsTotal": 4,
    "seatsAvailable": 4,
    "genres": [
      "Rock",
      "Pop",
      "Alternativo"
    ],
    "sociabilityLevel": 3,
    "driverNote": "\"Viernes 5 de junio, salida puntual. Rock suave de fondo.\"",
    "reviews": [
      {
        "id": "23-rev-0",
        "authorName": "Fernanda C.",
        "stars": 5,
        "comment": "Muy responsable."
      }
    ],
    "weekDays": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "5",
    "driver": {
      "id": "driver-5",
      "fullName": "Andrés Morales",
      "initials": "AM",
      "avatarClass": "av-teal",
      "gender": "M",
      "verificationType": "Verificado Externo",
      "badgeClass": "b-teal",
      "badgeIcon": "🔗",
      "university": "Externo verificado",
      "careerOrRole": "+100 viajes registrados",
      "rating": 4.7,
      "reviewCount": 112,
      "vehicle": "Kia Sportage 2023"
    },
    "origin": "Santiago",
    "destination": "Temuco",
    "originPoint": "Metro Pudahuel (L5)",
    "destinationPoint": "Temuco, centro",
    "dateISO": "2026-05-31",
    "dateLabel": "Sábado 31 may",
    "time": "07:00",
    "priceCLP": 9500,
    "seatsTotal": 3,
    "seatsAvailable": 3,
    "genres": [
      "Electrónica",
      "House",
      "Ambient"
    ],
    "sociabilityLevel": 1,
    "driverNote": "\"Conductor externo verificado avanzado. Parada en Los Ángeles.\"",
    "reviews": [
      {
        "id": "5-rev-0",
        "authorName": "Javier P.",
        "stars": 5,
        "comment": "Seguro y puntual. Auto muy cómodo."
      },
      {
        "id": "5-rev-1",
        "authorName": "Lucía M.",
        "stars": 4,
        "comment": "Excelente para viaje largo."
      }
    ],
    "weekDays": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "24",
    "driver": {
      "id": "driver-24",
      "fullName": "Valentina Díaz",
      "initials": "VD",
      "avatarClass": "av-pink",
      "gender": "F",
      "verificationType": "Estudiante Verificada",
      "badgeClass": "b-blue",
      "badgeIcon": "🎓",
      "university": "UAI",
      "careerOrRole": "3er año Psicología",
      "rating": 4.7,
      "reviewCount": 15,
      "vehicle": "Hyundai Elantra 2021"
    },
    "origin": "Santiago",
    "destination": "Temuco",
    "originPoint": "Metro Baquedano (L1/L5)",
    "destinationPoint": "Temuco, Av. Alemania",
    "dateISO": "2026-05-30",
    "dateLabel": "Viernes 30 may",
    "time": "06:00",
    "priceCLP": 9000,
    "seatsTotal": 3,
    "seatsAvailable": 3,
    "genres": [
      "Indie",
      "Folk",
      "Pop"
    ],
    "sociabilityLevel": 3,
    "driverNote": "\"Salida temprano el viernes. Indie folk de fondo para el viaje largo.\"",
    "reviews": [
      {
        "id": "24-rev-0",
        "authorName": "Ignacia S.",
        "stars": 5,
        "comment": "Muy buena conductora para viaje largo."
      },
      {
        "id": "24-rev-1",
        "authorName": "Ramón B.",
        "stars": 5,
        "comment": "Segura y puntual."
      }
    ],
    "weekDays": [
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "25",
    "driver": {
      "id": "driver-25",
      "fullName": "Roberto Núñez",
      "initials": "RN",
      "avatarClass": "av-teal",
      "gender": "M",
      "verificationType": "Verificado Externo",
      "badgeClass": "b-teal",
      "badgeIcon": "🔗",
      "university": "Externo verificado",
      "careerOrRole": "+80 viajes registrados",
      "rating": 4.8,
      "reviewCount": 83,
      "vehicle": "Chevrolet Traverse 2022"
    },
    "origin": "Santiago",
    "destination": "Temuco",
    "originPoint": "Metro Estación Central (L1)",
    "destinationPoint": "Temuco, terminal",
    "dateISO": "2026-05-31",
    "dateLabel": "Sábado 31 may",
    "time": "08:00",
    "priceCLP": 10000,
    "seatsTotal": 2,
    "seatsAvailable": 2,
    "genres": [
      "Cumbia",
      "Salsa",
      "Reggaeton"
    ],
    "sociabilityLevel": 4,
    "driverNote": "\"SUV amplio, A/C, parada en Chillán. Viaje cómodo garantizado.\"",
    "reviews": [
      {
        "id": "25-rev-0",
        "authorName": "Carla V.",
        "stars": 5,
        "comment": "El auto es muy cómodo para viaje largo."
      },
      {
        "id": "25-rev-1",
        "authorName": "Felipe M.",
        "stars": 5,
        "comment": "Todo excelente."
      }
    ],
    "weekDays": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "26",
    "driver": {
      "id": "driver-26",
      "fullName": "Laura Sepúlveda",
      "initials": "LS",
      "avatarClass": "av-purple",
      "gender": "F",
      "verificationType": "Estudiante Verificada",
      "badgeClass": "b-blue",
      "badgeIcon": "🎓",
      "university": "U. de Chile",
      "careerOrRole": "3er año Ciencias",
      "rating": 4.6,
      "reviewCount": 8,
      "vehicle": "Nissan Kicks 2021"
    },
    "origin": "Santiago",
    "destination": "Temuco",
    "originPoint": "Metro U. de Chile (L1)",
    "destinationPoint": "Temuco, centro",
    "dateISO": "2026-06-05",
    "dateLabel": "Viernes 5 jun",
    "time": "07:00",
    "priceCLP": 9500,
    "seatsTotal": 3,
    "seatsAvailable": 3,
    "genres": [
      "Folk",
      "Indie",
      "Clásica"
    ],
    "sociabilityLevel": 2,
    "driverNote": "\"Viernes 5 junio. Folk tranquilo, viaje sin drama.\"",
    "reviews": [
      {
        "id": "26-rev-0",
        "authorName": "Sandra O.",
        "stars": 5,
        "comment": "Muy confiable."
      }
    ],
    "weekDays": [
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "8",
    "driver": {
      "id": "driver-8",
      "fullName": "Catalina Vega",
      "initials": "CV",
      "avatarClass": "av-purple",
      "gender": "F",
      "verificationType": "Estudiante Verificada",
      "badgeClass": "b-blue",
      "badgeIcon": "🎓",
      "university": "UAI",
      "careerOrRole": "3er año Administración",
      "rating": 4.6,
      "reviewCount": 11,
      "vehicle": "Suzuki Vitara 2020"
    },
    "origin": "Santiago",
    "destination": "Concepción",
    "originPoint": "Metro Baquedano (L1)",
    "destinationPoint": "Concepción, terminal Collao",
    "dateISO": "2026-05-31",
    "dateLabel": "Sábado 31 may",
    "time": "08:30",
    "priceCLP": 8000,
    "seatsTotal": 2,
    "seatsAvailable": 2,
    "genres": [
      "K-Pop",
      "R&B",
      "Pop"
    ],
    "sociabilityLevel": 5,
    "driverNote": "\"Viaje directo a Conce, sin paradas intermedias.\"",
    "reviews": [
      {
        "id": "8-rev-0",
        "authorName": "Matías A.",
        "stars": 5,
        "comment": "Muy buena conductora."
      }
    ],
    "weekDays": [
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "27",
    "driver": {
      "id": "driver-27",
      "fullName": "Eduardo Muñoz",
      "initials": "EM",
      "avatarClass": "av-amber",
      "gender": "M",
      "verificationType": "Verificado Plus",
      "badgeClass": "b-amber",
      "badgeIcon": "⭐",
      "university": "PUC",
      "careerOrRole": "Egresado Ing. Comercial",
      "rating": 4.9,
      "reviewCount": 57,
      "vehicle": "Toyota RAV4 2022"
    },
    "origin": "Santiago",
    "destination": "Concepción",
    "originPoint": "Metro Baquedano (L1/L5)",
    "destinationPoint": "Concepción, Av. Prat",
    "dateISO": "2026-05-30",
    "dateLabel": "Viernes 30 may",
    "time": "07:00",
    "priceCLP": 8000,
    "seatsTotal": 3,
    "seatsAvailable": 3,
    "genres": [
      "Jazz",
      "Pop",
      "Blues"
    ],
    "sociabilityLevel": 3,
    "driverNote": "\"Más de 50 viajes a Conce. SUV amplio con A/C. Muy puntual.\"",
    "reviews": [
      {
        "id": "27-rev-0",
        "authorName": "Alicia T.",
        "stars": 5,
        "comment": "Excelente conductor, el mejor del portal."
      },
      {
        "id": "27-rev-1",
        "authorName": "Rodrigo C.",
        "stars": 5,
        "comment": "Muy profesional."
      }
    ],
    "weekDays": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "28",
    "driver": {
      "id": "driver-28",
      "fullName": "Renata Silva",
      "initials": "RS",
      "avatarClass": "av-pink",
      "gender": "F",
      "verificationType": "Estudiante Verificada",
      "badgeClass": "b-blue",
      "badgeIcon": "🎓",
      "university": "UDP",
      "careerOrRole": "3er año Diseño",
      "rating": 4.7,
      "reviewCount": 13,
      "vehicle": "Mazda 2 2021"
    },
    "origin": "Santiago",
    "destination": "Concepción",
    "originPoint": "Metro U. de Santiago (L9)",
    "destinationPoint": "Concepción, terminal",
    "dateISO": "2026-06-06",
    "dateLabel": "Sábado 6 jun",
    "time": "08:00",
    "priceCLP": 7500,
    "seatsTotal": 3,
    "seatsAvailable": 3,
    "genres": [
      "Pop",
      "K-Pop",
      "R&B"
    ],
    "sociabilityLevel": 5,
    "driverNote": "\"Sábado 6 junio. K-Pop de fondo y buen ambiente.\"",
    "reviews": [
      {
        "id": "28-rev-0",
        "authorName": "Paula M.",
        "stars": 5,
        "comment": "Muy buena onda."
      },
      {
        "id": "28-rev-1",
        "authorName": "Felipe G.",
        "stars": 5,
        "comment": "Recomendada."
      }
    ],
    "weekDays": [
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "9",
    "driver": {
      "id": "driver-9",
      "fullName": "Pedro Alvarado",
      "initials": "PA",
      "avatarClass": "av-green",
      "gender": "M",
      "verificationType": "Egresado Verificado",
      "badgeClass": "b-purple",
      "badgeIcon": "🏛️",
      "university": "USACH",
      "careerOrRole": "Egresado Ing. Eléctrica",
      "rating": 4.7,
      "reviewCount": 34,
      "vehicle": "Hyundai i10 2020"
    },
    "origin": "Santiago",
    "destination": "San Fernando",
    "originPoint": "Metro Estación Central (L1)",
    "destinationPoint": "San Fernando, centro",
    "dateISO": "2026-05-30",
    "dateLabel": "Viernes 30 may",
    "time": "17:30",
    "priceCLP": 3000,
    "seatsTotal": 4,
    "seatsAvailable": 4,
    "genres": [
      "Cumbia",
      "Salsa",
      "Reggaeton"
    ],
    "sociabilityLevel": 4,
    "driverNote": "\"Viaje rápido. Coordino con quienes también van a Curicó.\"",
    "reviews": [
      {
        "id": "9-rev-0",
        "authorName": "Rosa M.",
        "stars": 5,
        "comment": "Muy amable."
      },
      {
        "id": "9-rev-1",
        "authorName": "Sebastián F.",
        "stars": 4,
        "comment": "Conductor responsable."
      }
    ],
    "weekDays": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "29",
    "driver": {
      "id": "driver-29",
      "fullName": "Francisca Lara",
      "initials": "FL",
      "avatarClass": "av-purple",
      "gender": "F",
      "verificationType": "Egresada Verificada",
      "badgeClass": "b-purple",
      "badgeIcon": "🏛️",
      "university": "USACH",
      "careerOrRole": "Egresada Diseño Gráfico",
      "rating": 4.8,
      "reviewCount": 22,
      "vehicle": "Chevrolet Sail 2021"
    },
    "origin": "Santiago",
    "destination": "San Fernando",
    "originPoint": "Metro U. de Santiago (L9)",
    "destinationPoint": "San Fernando, plaza central",
    "dateISO": "2026-05-30",
    "dateLabel": "Viernes 30 may",
    "time": "18:00",
    "priceCLP": 3000,
    "seatsTotal": 3,
    "seatsAvailable": 3,
    "genres": [
      "Pop",
      "Indie",
      "Alternativo"
    ],
    "sociabilityLevel": 4,
    "driverNote": "\"Viernes 18:00 puntual. Indie y buena compañía.\"",
    "reviews": [
      {
        "id": "29-rev-0",
        "authorName": "Camila R.",
        "stars": 5,
        "comment": "Muy agradable el viaje."
      },
      {
        "id": "29-rev-1",
        "authorName": "Jorge V.",
        "stars": 5,
        "comment": "Puntual y segura."
      }
    ],
    "weekDays": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "30",
    "driver": {
      "id": "driver-30",
      "fullName": "Matías Pérez",
      "initials": "MP",
      "avatarClass": "av-blue",
      "gender": "M",
      "verificationType": "Estudiante Verificado",
      "badgeClass": "b-blue",
      "badgeIcon": "🎓",
      "university": "U. de Chile",
      "careerOrRole": "2do año Geología",
      "rating": 4.6,
      "reviewCount": 7,
      "vehicle": "Kia Morning 2021"
    },
    "origin": "Santiago",
    "destination": "San Fernando",
    "originPoint": "Metro U. de Chile (L1)",
    "destinationPoint": "San Fernando, terminal",
    "dateISO": "2026-05-31",
    "dateLabel": "Sábado 31 may",
    "time": "17:00",
    "priceCLP": 3000,
    "seatsTotal": 2,
    "seatsAvailable": 2,
    "genres": [
      "Rock",
      "Metal",
      "Alternativo"
    ],
    "sociabilityLevel": 2,
    "driverNote": "\"Sábado tarde. Metal suave, viaje tranquilo.\"",
    "reviews": [
      {
        "id": "30-rev-0",
        "authorName": "María J.",
        "stars": 5,
        "comment": "Viaje seguro y puntual."
      }
    ],
    "weekDays": [
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "31",
    "driver": {
      "id": "driver-31",
      "fullName": "Ana Vera",
      "initials": "AV",
      "avatarClass": "av-pink",
      "gender": "F",
      "verificationType": "Estudiante Verificada",
      "badgeClass": "b-blue",
      "badgeIcon": "🎓",
      "university": "PUC",
      "careerOrRole": "3er año Psicología",
      "rating": 4.7,
      "reviewCount": 10,
      "vehicle": "Chevrolet Aveo 2020"
    },
    "origin": "Santiago",
    "destination": "San Fernando",
    "originPoint": "Metro Baquedano (L1/L5)",
    "destinationPoint": "San Fernando, centro",
    "dateISO": "2026-06-05",
    "dateLabel": "Viernes 5 jun",
    "time": "17:30",
    "priceCLP": 2500,
    "seatsTotal": 3,
    "seatsAvailable": 3,
    "genres": [
      "Pop",
      "K-Pop",
      "Indie"
    ],
    "sociabilityLevel": 4,
    "driverNote": "\"Viernes 5 junio. K-Pop y buena energía.\"",
    "reviews": [
      {
        "id": "31-rev-0",
        "authorName": "Lucía A.",
        "stars": 5,
        "comment": "Muy simpática."
      }
    ],
    "weekDays": [
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "32",
    "driver": {
      "id": "driver-32",
      "fullName": "Javiera Molina",
      "initials": "JM",
      "avatarClass": "av-purple",
      "gender": "F",
      "verificationType": "Egresada Verificada",
      "badgeClass": "b-purple",
      "badgeIcon": "🏛️",
      "university": "U. de Chile",
      "careerOrRole": "Egresada Astronomía",
      "rating": 4.9,
      "reviewCount": 45,
      "vehicle": "Honda CRV 2021"
    },
    "origin": "Santiago",
    "destination": "La Serena",
    "originPoint": "Metro Pudahuel (L5)",
    "destinationPoint": "La Serena, Av. del Mar",
    "dateISO": "2026-05-30",
    "dateLabel": "Viernes 30 may",
    "time": "06:30",
    "priceCLP": 11000,
    "seatsTotal": 3,
    "seatsAvailable": 3,
    "genres": [
      "Indie",
      "Folk",
      "Clásica"
    ],
    "sociabilityLevel": 2,
    "driverNote": "\"Salida muy temprano. Parada en Ovalle. Folk e indie de fondo.\"",
    "reviews": [
      {
        "id": "32-rev-0",
        "authorName": "Renata P.",
        "stars": 5,
        "comment": "Auto cómodo para viaje largo. Muy profesional."
      },
      {
        "id": "32-rev-1",
        "authorName": "Tomás C.",
        "stars": 5,
        "comment": "Recomendada."
      }
    ],
    "weekDays": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "33",
    "driver": {
      "id": "driver-33",
      "fullName": "Héctor Araya",
      "initials": "HA",
      "avatarClass": "av-teal",
      "gender": "M",
      "verificationType": "Verificado Externo",
      "badgeClass": "b-teal",
      "badgeIcon": "🔗",
      "university": "Externo verificado",
      "careerOrRole": "+120 viajes registrados",
      "rating": 4.8,
      "reviewCount": 124,
      "vehicle": "Toyota Hilux 2022"
    },
    "origin": "Santiago",
    "destination": "La Serena",
    "originPoint": "Metro Estación Central (L1)",
    "destinationPoint": "La Serena, terminal",
    "dateISO": "2026-05-31",
    "dateLabel": "Sábado 31 may",
    "time": "07:00",
    "priceCLP": 12000,
    "seatsTotal": 4,
    "seatsAvailable": 4,
    "genres": [
      "Cumbia",
      "Reggaeton",
      "Pop"
    ],
    "sociabilityLevel": 3,
    "driverNote": "\"Camioneta amplia. Parada en Ovalle para combustible. Puntualísimo.\"",
    "reviews": [
      {
        "id": "33-rev-0",
        "authorName": "Sofía B.",
        "stars": 5,
        "comment": "Excelente viaje. Llegamos en tiempo récord."
      },
      {
        "id": "33-rev-1",
        "authorName": "Diego A.",
        "stars": 5,
        "comment": "Muy cómodo."
      }
    ],
    "weekDays": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "34",
    "driver": {
      "id": "driver-34",
      "fullName": "Macarena Ortiz",
      "initials": "MO",
      "avatarClass": "av-pink",
      "gender": "F",
      "verificationType": "Estudiante Verificada",
      "badgeClass": "b-blue",
      "badgeIcon": "🎓",
      "university": "UDP",
      "careerOrRole": "2do año Psicología",
      "rating": 4.6,
      "reviewCount": 8,
      "vehicle": "Hyundai Accent 2020"
    },
    "origin": "Santiago",
    "destination": "La Serena",
    "originPoint": "Metro U. de Santiago (L9)",
    "destinationPoint": "La Serena, centro",
    "dateISO": "2026-06-05",
    "dateLabel": "Viernes 5 jun",
    "time": "07:00",
    "priceCLP": 11000,
    "seatsTotal": 2,
    "seatsAvailable": 2,
    "genres": [
      "Pop",
      "R&B",
      "Indie"
    ],
    "sociabilityLevel": 4,
    "driverNote": "\"Viernes 5 junio. Pop tranquilo para el viaje largo al norte.\"",
    "reviews": [
      {
        "id": "34-rev-0",
        "authorName": "Valentina M.",
        "stars": 5,
        "comment": "Muy buena compañía de viaje."
      }
    ],
    "weekDays": [
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "35",
    "driver": {
      "id": "driver-35",
      "fullName": "Sebastián Castro",
      "initials": "SC",
      "avatarClass": "av-blue",
      "gender": "M",
      "verificationType": "Estudiante Verificado",
      "badgeClass": "b-blue",
      "badgeIcon": "🎓",
      "university": "USACH",
      "careerOrRole": "4to año Ing. Civil",
      "rating": 4.7,
      "reviewCount": 19,
      "vehicle": "Kia Rio 2020"
    },
    "origin": "Santiago",
    "destination": "Curicó",
    "originPoint": "Metro U. de Santiago (L9)",
    "destinationPoint": "Curicó, terminal",
    "dateISO": "2026-05-30",
    "dateLabel": "Viernes 30 may",
    "time": "17:00",
    "priceCLP": 5000,
    "seatsTotal": 3,
    "seatsAvailable": 3,
    "genres": [
      "Rap",
      "Hip-Hop",
      "Trap"
    ],
    "sociabilityLevel": 4,
    "driverNote": "\"Viernes a Curicó. Trap de fondo, buen ambiente.\"",
    "reviews": [
      {
        "id": "35-rev-0",
        "authorName": "Daniela F.",
        "stars": 5,
        "comment": "Muy puntual y agradable."
      },
      {
        "id": "35-rev-1",
        "authorName": "Cristóbal M.",
        "stars": 4,
        "comment": "Buen viaje."
      }
    ],
    "weekDays": [
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "36",
    "driver": {
      "id": "driver-36",
      "fullName": "Isidora Pérez",
      "initials": "IP",
      "avatarClass": "av-amber",
      "gender": "F",
      "verificationType": "Egresada Verificada",
      "badgeClass": "b-purple",
      "badgeIcon": "🏛️",
      "university": "UAI",
      "careerOrRole": "Egresada Administración",
      "rating": 4.8,
      "reviewCount": 26,
      "vehicle": "Toyota Yaris 2021"
    },
    "origin": "Santiago",
    "destination": "Curicó",
    "originPoint": "Metro Baquedano (L1/L5)",
    "destinationPoint": "Curicó, plaza de armas",
    "dateISO": "2026-05-30",
    "dateLabel": "Viernes 30 may",
    "time": "18:00",
    "priceCLP": 4500,
    "seatsTotal": 2,
    "seatsAvailable": 2,
    "genres": [
      "Pop",
      "Baladas",
      "Jazz"
    ],
    "sociabilityLevel": 3,
    "driverNote": "\"Egresada UAI. Jazz y baladas de fondo, viaje muy tranquilo.\"",
    "reviews": [
      {
        "id": "36-rev-0",
        "authorName": "Luciana V.",
        "stars": 5,
        "comment": "Muy confiable y puntual."
      },
      {
        "id": "36-rev-1",
        "authorName": "Rodrigo A.",
        "stars": 5,
        "comment": "Excelente."
      }
    ],
    "weekDays": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "37",
    "driver": {
      "id": "driver-37",
      "fullName": "Andrés Lagos",
      "initials": "AL",
      "avatarClass": "av-green",
      "gender": "M",
      "verificationType": "Estudiante Verificado",
      "badgeClass": "b-blue",
      "badgeIcon": "🎓",
      "university": "PUC",
      "careerOrRole": "3er año Agronomía",
      "rating": 4.6,
      "reviewCount": 9,
      "vehicle": "Chevrolet Sail 2020"
    },
    "origin": "Santiago",
    "destination": "Curicó",
    "originPoint": "Metro Baquedano (L1/L5)",
    "destinationPoint": "Curicó, terminal",
    "dateISO": "2026-05-31",
    "dateLabel": "Sábado 31 may",
    "time": "17:00",
    "priceCLP": 5000,
    "seatsTotal": 3,
    "seatsAvailable": 3,
    "genres": [
      "Rock",
      "Indie",
      "Alternativo"
    ],
    "sociabilityLevel": 3,
    "driverNote": "\"Sábado tarde a Curicó. Rock suave, viaje relajado.\"",
    "reviews": [
      {
        "id": "37-rev-0",
        "authorName": "Carla S.",
        "stars": 5,
        "comment": "Buen viaje."
      }
    ],
    "weekDays": [
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "38",
    "driver": {
      "id": "driver-38",
      "fullName": "Alejandro Ramos",
      "initials": "AR",
      "avatarClass": "av-amber",
      "gender": "M",
      "verificationType": "Verificado Plus",
      "badgeClass": "b-amber",
      "badgeIcon": "⭐",
      "university": "U. de Chile",
      "careerOrRole": "Egresado Agricultura",
      "rating": 4.9,
      "reviewCount": 41,
      "vehicle": "Hyundai Tucson 2022"
    },
    "origin": "Santiago",
    "destination": "Chillán",
    "originPoint": "Metro U. de Chile (L1)",
    "destinationPoint": "Chillán, terminal",
    "dateISO": "2026-05-30",
    "dateLabel": "Viernes 30 may",
    "time": "07:30",
    "priceCLP": 7000,
    "seatsTotal": 3,
    "seatsAvailable": 3,
    "genres": [
      "Cumbia",
      "Folclore",
      "Rock"
    ],
    "sociabilityLevel": 4,
    "driverNote": "\"Más de 40 viajes a Chillán. A/C, muy puntual. Folclore y cumbia de fondo.\"",
    "reviews": [
      {
        "id": "38-rev-0",
        "authorName": "Valentina R.",
        "stars": 5,
        "comment": "El mejor conductor para Chillán."
      },
      {
        "id": "38-rev-1",
        "authorName": "Marcelo C.",
        "stars": 5,
        "comment": "Muy profesional."
      }
    ],
    "weekDays": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "39",
    "driver": {
      "id": "driver-39",
      "fullName": "Paula Contreras",
      "initials": "PC",
      "avatarClass": "av-purple",
      "gender": "F",
      "verificationType": "Estudiante Verificada",
      "badgeClass": "b-blue",
      "badgeIcon": "🎓",
      "university": "PUC",
      "careerOrRole": "2do año Música",
      "rating": 4.7,
      "reviewCount": 14,
      "vehicle": "Mazda 2 2021"
    },
    "origin": "Santiago",
    "destination": "Chillán",
    "originPoint": "Metro Baquedano (L1/L5)",
    "destinationPoint": "Chillán, centro",
    "dateISO": "2026-05-31",
    "dateLabel": "Sábado 31 may",
    "time": "08:00",
    "priceCLP": 6500,
    "seatsTotal": 3,
    "seatsAvailable": 3,
    "genres": [
      "Clásica",
      "Jazz",
      "Pop"
    ],
    "sociabilityLevel": 3,
    "driverNote": "\"Estudiante de música, viaje muy tranquilo. Clásica y jazz de fondo.\"",
    "reviews": [
      {
        "id": "39-rev-0",
        "authorName": "Fernanda B.",
        "stars": 5,
        "comment": "Viaje muy agradable."
      },
      {
        "id": "39-rev-1",
        "authorName": "Alberto C.",
        "stars": 4,
        "comment": "Puntual."
      }
    ],
    "weekDays": [
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "40",
    "driver": {
      "id": "driver-40",
      "fullName": "Gloria Muñoz",
      "initials": "GM",
      "avatarClass": "av-pink",
      "gender": "F",
      "verificationType": "Egresada Verificada",
      "badgeClass": "b-purple",
      "badgeIcon": "🏛️",
      "university": "USACH",
      "careerOrRole": "Egresada Trabajo Social",
      "rating": 4.8,
      "reviewCount": 31,
      "vehicle": "Honda Fit 2020"
    },
    "origin": "Santiago",
    "destination": "Chillán",
    "originPoint": "Metro U. de Santiago (L9)",
    "destinationPoint": "Chillán, terminal",
    "dateISO": "2026-06-05",
    "dateLabel": "Viernes 5 jun",
    "time": "07:30",
    "priceCLP": 7000,
    "seatsTotal": 2,
    "seatsAvailable": 2,
    "genres": [
      "Pop",
      "Salsa",
      "Cumbia"
    ],
    "sociabilityLevel": 4,
    "driverNote": "\"Viernes 5 junio. Salsa y cumbia para el viaje al sur.\"",
    "reviews": [
      {
        "id": "40-rev-0",
        "authorName": "Renata V.",
        "stars": 5,
        "comment": "Muy agradable y segura."
      }
    ],
    "weekDays": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "41",
    "driver": {
      "id": "driver-41",
      "fullName": "Camila Espinoza",
      "initials": "CE",
      "avatarClass": "av-pink",
      "gender": "F",
      "verificationType": "Egresada Verificada",
      "badgeClass": "b-purple",
      "badgeIcon": "🏛️",
      "university": "USACH",
      "careerOrRole": "Egresada Trabajo Social",
      "rating": 4.8,
      "reviewCount": 20,
      "vehicle": "Suzuki Swift 2020"
    },
    "origin": "Santiago",
    "destination": "Rengo",
    "originPoint": "Metro Estación Central (L1)",
    "destinationPoint": "Rengo, plaza central",
    "dateISO": "2026-05-30",
    "dateLabel": "Viernes 30 may",
    "time": "17:30",
    "priceCLP": 2500,
    "seatsTotal": 4,
    "seatsAvailable": 4,
    "genres": [
      "Pop",
      "Salsa",
      "Cumbia"
    ],
    "sociabilityLevel": 5,
    "driverNote": "\"Viaje corto y económico a Rengo. Pop y buena energía.\"",
    "reviews": [
      {
        "id": "41-rev-0",
        "authorName": "Karen M.",
        "stars": 5,
        "comment": "Muy amable, llegamos antes de lo esperado."
      },
      {
        "id": "41-rev-1",
        "authorName": "Luis F.",
        "stars": 5,
        "comment": "Excelente."
      }
    ],
    "weekDays": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "42",
    "driver": {
      "id": "driver-42",
      "fullName": "Lucas Morales",
      "initials": "LM",
      "avatarClass": "av-green",
      "gender": "M",
      "verificationType": "Estudiante Verificado",
      "badgeClass": "b-blue",
      "badgeIcon": "🎓",
      "university": "U. de Chile",
      "careerOrRole": "3er año Sociología",
      "rating": 4.7,
      "reviewCount": 11,
      "vehicle": "Kia Morning 2020"
    },
    "origin": "Santiago",
    "destination": "Rengo",
    "originPoint": "Metro U. de Chile (L1)",
    "destinationPoint": "Rengo, centro",
    "dateISO": "2026-05-31",
    "dateLabel": "Sábado 31 may",
    "time": "17:00",
    "priceCLP": 2500,
    "seatsTotal": 3,
    "seatsAvailable": 3,
    "genres": [
      "Hip-Hop",
      "Jazz",
      "Pop"
    ],
    "sociabilityLevel": 3,
    "driverNote": "\"Sábado tarde a Rengo. Hip-Hop tranquilo de fondo.\"",
    "reviews": [
      {
        "id": "42-rev-0",
        "authorName": "Sofía C.",
        "stars": 5,
        "comment": "Buen viaje, puntual."
      }
    ],
    "weekDays": [
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "43",
    "driver": {
      "id": "driver-43",
      "fullName": "Fernanda Ojeda",
      "initials": "FO",
      "avatarClass": "av-purple",
      "gender": "F",
      "verificationType": "Estudiante Verificada",
      "badgeClass": "b-blue",
      "badgeIcon": "🎓",
      "university": "UDP",
      "careerOrRole": "2do año Psicología",
      "rating": 4.6,
      "reviewCount": 5,
      "vehicle": "Chevrolet Aveo 2019"
    },
    "origin": "Santiago",
    "destination": "Rengo",
    "originPoint": "Metro U. de Santiago (L9)",
    "destinationPoint": "Rengo, terminal",
    "dateISO": "2026-06-05",
    "dateLabel": "Viernes 5 jun",
    "time": "17:30",
    "priceCLP": 2500,
    "seatsTotal": 2,
    "seatsAvailable": 2,
    "genres": [
      "Pop",
      "R&B",
      "K-Pop"
    ],
    "sociabilityLevel": 4,
    "driverNote": "\"Viernes 5 junio. R&B y K-Pop, buen ambiente.\"",
    "reviews": [
      {
        "id": "43-rev-0",
        "authorName": "Ana T.",
        "stars": 5,
        "comment": "Muy simpática."
      }
    ],
    "weekDays": [
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "6",
    "driver": {
      "id": "driver-6",
      "fullName": "Valentina Rojas",
      "initials": "VR",
      "avatarClass": "av-pink",
      "gender": "F",
      "verificationType": "Estudiante Verificada",
      "badgeClass": "b-blue",
      "badgeIcon": "🎓",
      "university": "U. de Valparaíso",
      "careerOrRole": "2do año Psicología",
      "rating": 4.8,
      "reviewCount": 19,
      "vehicle": "Nissan March 2021"
    },
    "origin": "Valparaíso",
    "destination": "Santiago",
    "originPoint": "Valparaíso, Plaza Victoria",
    "destinationPoint": "Santiago, Metro Baquedano",
    "dateISO": "2026-05-30",
    "dateLabel": "Viernes 30 may",
    "time": "08:00",
    "priceCLP": 4000,
    "seatsTotal": 3,
    "seatsAvailable": 3,
    "genres": [
      "K-Pop",
      "Indie",
      "Pop"
    ],
    "sociabilityLevel": 4,
    "driverNote": "\"Salida temprana hacia Santiago. Llegan antes del mediodía.\"",
    "reviews": [
      {
        "id": "6-rev-0",
        "authorName": "Ignacio C.",
        "stars": 5,
        "comment": "Muy simpática y puntual."
      },
      {
        "id": "6-rev-1",
        "authorName": "Bárbara V.",
        "stars": 5,
        "comment": "Todo perfecto."
      }
    ],
    "weekDays": [
      5,
      6,
      0,
      1
    ]
  },
  {
    "id": "44",
    "driver": {
      "id": "driver-44",
      "fullName": "Roberto Gallardo",
      "initials": "RG",
      "avatarClass": "av-amber",
      "gender": "M",
      "verificationType": "Verificado Plus",
      "badgeClass": "b-amber",
      "badgeIcon": "⭐",
      "university": "U. de Valparaíso",
      "careerOrRole": "Egresado Arquitectura",
      "rating": 4.9,
      "reviewCount": 63,
      "vehicle": "Toyota Corolla 2022"
    },
    "origin": "Valparaíso",
    "destination": "Santiago",
    "originPoint": "Valparaíso, terminal Turbus",
    "destinationPoint": "Santiago, Metro Pajaritos",
    "dateISO": "2026-05-30",
    "dateLabel": "Viernes 30 may",
    "time": "07:30",
    "priceCLP": 4500,
    "seatsTotal": 3,
    "seatsAvailable": 3,
    "genres": [
      "Jazz",
      "Rock",
      "Blues"
    ],
    "sociabilityLevel": 2,
    "driverNote": "\"Más de 60 viajes Valpo–Santiago. Jazz y blues de fondo. Muy puntual.\"",
    "reviews": [
      {
        "id": "44-rev-0",
        "authorName": "Lorena S.",
        "stars": 5,
        "comment": "Excelente conductor, muy confiable."
      },
      {
        "id": "44-rev-1",
        "authorName": "Matías B.",
        "stars": 5,
        "comment": "Siempre puntual."
      }
    ],
    "weekDays": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "45",
    "driver": {
      "id": "driver-45",
      "fullName": "Ignacio Reyes",
      "initials": "IR",
      "avatarClass": "av-blue",
      "gender": "M",
      "verificationType": "Egresado Verificado",
      "badgeClass": "b-purple",
      "badgeIcon": "🏛️",
      "university": "U. de Valparaíso",
      "careerOrRole": "Egresado Química",
      "rating": 4.7,
      "reviewCount": 24,
      "vehicle": "Honda Fit 2020"
    },
    "origin": "Valparaíso",
    "destination": "Santiago",
    "originPoint": "Valparaíso, Av. Argentina",
    "destinationPoint": "Santiago, Metro Baquedano",
    "dateISO": "2026-05-31",
    "dateLabel": "Sábado 31 may",
    "time": "07:00",
    "priceCLP": 4000,
    "seatsTotal": 2,
    "seatsAvailable": 2,
    "genres": [
      "Rock",
      "Alternativo",
      "Jazz"
    ],
    "sociabilityLevel": 2,
    "driverNote": "\"Sábado mañana de regreso a Santiago. Rock alternativo tranquilo.\"",
    "reviews": [
      {
        "id": "45-rev-0",
        "authorName": "Catalina P.",
        "stars": 5,
        "comment": "Puntual y seguro."
      }
    ],
    "weekDays": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "46",
    "driver": {
      "id": "driver-46",
      "fullName": "Sofía Mendoza",
      "initials": "SM",
      "avatarClass": "av-purple",
      "gender": "F",
      "verificationType": "Estudiante Verificada",
      "badgeClass": "b-blue",
      "badgeIcon": "🎓",
      "university": "U. de Valparaíso",
      "careerOrRole": "3er año Sociología",
      "rating": 4.8,
      "reviewCount": 16,
      "vehicle": "Suzuki Celerio 2021"
    },
    "origin": "Valparaíso",
    "destination": "Santiago",
    "originPoint": "Valparaíso, Plaza Victoria",
    "destinationPoint": "Santiago, Metro Baquedano",
    "dateISO": "2026-06-01",
    "dateLabel": "Domingo 1 jun",
    "time": "09:00",
    "priceCLP": 4000,
    "seatsTotal": 3,
    "seatsAvailable": 3,
    "genres": [
      "K-Pop",
      "Pop",
      "Indie"
    ],
    "sociabilityLevel": 4,
    "driverNote": "\"Domingo de regreso. K-Pop y pop para el viaje.\"",
    "reviews": [
      {
        "id": "46-rev-0",
        "authorName": "Felipe A.",
        "stars": 5,
        "comment": "Muy buena conductora."
      },
      {
        "id": "46-rev-1",
        "authorName": "Pilar R.",
        "stars": 5,
        "comment": "Puntual."
      }
    ],
    "weekDays": [
      5,
      6,
      0,
      1
    ]
  },
  {
    "id": "47",
    "driver": {
      "id": "driver-47",
      "fullName": "Josefa Carvajal",
      "initials": "JC",
      "avatarClass": "av-pink",
      "gender": "F",
      "verificationType": "Egresada Verificada",
      "badgeClass": "b-purple",
      "badgeIcon": "🏛️",
      "university": "PUC",
      "careerOrRole": "Egresada Letras",
      "rating": 4.9,
      "reviewCount": 38,
      "vehicle": "Mazda 2 2022"
    },
    "origin": "Valparaíso",
    "destination": "Santiago",
    "originPoint": "Valparaíso, terminal Turbus",
    "destinationPoint": "Santiago, Metro U. de Chile",
    "dateISO": "2026-06-07",
    "dateLabel": "Domingo 7 jun",
    "time": "08:30",
    "priceCLP": 4500,
    "seatsTotal": 2,
    "seatsAvailable": 2,
    "genres": [
      "Indie",
      "Pop",
      "Jazz"
    ],
    "sociabilityLevel": 3,
    "driverNote": "\"Domingo 7 junio. Indie y jazz, viaje muy tranquilo.\"",
    "reviews": [
      {
        "id": "47-rev-0",
        "authorName": "Rodrigo T.",
        "stars": 5,
        "comment": "Excelente."
      },
      {
        "id": "47-rev-1",
        "authorName": "Marcela V.",
        "stars": 5,
        "comment": "La recomiendo."
      }
    ],
    "weekDays": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "7",
    "driver": {
      "id": "driver-7",
      "fullName": "Felipe Castro",
      "initials": "FC",
      "avatarClass": "av-amber",
      "gender": "M",
      "verificationType": "Verificado Plus",
      "badgeClass": "b-amber",
      "badgeIcon": "⭐",
      "university": "U. de La Serena",
      "careerOrRole": "Egresado Geología",
      "rating": 4.9,
      "reviewCount": 87,
      "vehicle": "Chevrolet Traverse 2022"
    },
    "origin": "La Serena",
    "destination": "Santiago",
    "originPoint": "La Serena, terminal Sotraser",
    "destinationPoint": "Santiago, Metro Pajaritos",
    "dateISO": "2026-05-30",
    "dateLabel": "Viernes 30 may",
    "time": "06:30",
    "priceCLP": 12000,
    "seatsTotal": 4,
    "seatsAvailable": 4,
    "genres": [
      "Rock",
      "Metal",
      "Alternativo"
    ],
    "sociabilityLevel": 2,
    "driverNote": "\"SUV amplio con A/C. Parada en Ovalle para café.\"",
    "reviews": [
      {
        "id": "7-rev-0",
        "authorName": "Constanza B.",
        "stars": 5,
        "comment": "Muy cómodo el auto."
      },
      {
        "id": "7-rev-1",
        "authorName": "Tomás R.",
        "stars": 5,
        "comment": "Gran conductor."
      }
    ],
    "weekDays": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "48",
    "driver": {
      "id": "driver-48",
      "fullName": "Carmen Rodríguez",
      "initials": "CR",
      "avatarClass": "av-amber",
      "gender": "F",
      "verificationType": "Verificado Plus",
      "badgeClass": "b-amber",
      "badgeIcon": "⭐",
      "university": "U. de La Serena",
      "careerOrRole": "Docente Matemáticas",
      "rating": 4.8,
      "reviewCount": 53,
      "vehicle": "Hyundai Santa Fe 2021"
    },
    "origin": "La Serena",
    "destination": "Santiago",
    "originPoint": "La Serena, terminal",
    "destinationPoint": "Santiago, Metro Pudahuel",
    "dateISO": "2026-05-31",
    "dateLabel": "Sábado 31 may",
    "time": "07:00",
    "priceCLP": 12000,
    "seatsTotal": 3,
    "seatsAvailable": 3,
    "genres": [
      "Folclore",
      "Jazz",
      "Clásica"
    ],
    "sociabilityLevel": 3,
    "driverNote": "\"Docente universitaria. Folclore y clásica de fondo. Muy puntual.\"",
    "reviews": [
      {
        "id": "48-rev-0",
        "authorName": "Isidora C.",
        "stars": 5,
        "comment": "Conductora muy confiable para viaje largo."
      },
      {
        "id": "48-rev-1",
        "authorName": "Mateo V.",
        "stars": 5,
        "comment": "Excelente."
      }
    ],
    "weekDays": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "49",
    "driver": {
      "id": "driver-49",
      "fullName": "Claudia Mena",
      "initials": "CM",
      "avatarClass": "av-purple",
      "gender": "F",
      "verificationType": "Egresada Verificada",
      "badgeClass": "b-purple",
      "badgeIcon": "🏛️",
      "university": "U. de La Serena",
      "careerOrRole": "Egresada Ing. Ambiental",
      "rating": 4.7,
      "reviewCount": 18,
      "vehicle": "Toyota Corolla 2021"
    },
    "origin": "La Serena",
    "destination": "Santiago",
    "originPoint": "La Serena, Av. del Mar",
    "destinationPoint": "Santiago, Metro Pudahuel",
    "dateISO": "2026-06-01",
    "dateLabel": "Domingo 1 jun",
    "time": "07:00",
    "priceCLP": 11500,
    "seatsTotal": 2,
    "seatsAvailable": 2,
    "genres": [
      "Pop",
      "Indie",
      "R&B"
    ],
    "sociabilityLevel": 4,
    "driverNote": "\"Domingo de vuelta. Pop y R&B para el camino.\"",
    "reviews": [
      {
        "id": "49-rev-0",
        "authorName": "Sandra O.",
        "stars": 5,
        "comment": "Conductora muy confiable."
      }
    ],
    "weekDays": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "10",
    "driver": {
      "id": "driver-10",
      "fullName": "Martina Bravo",
      "initials": "MB",
      "avatarClass": "av-teal",
      "gender": "F",
      "verificationType": "Estudiante Verificada",
      "badgeClass": "b-blue",
      "badgeIcon": "🎓",
      "university": "USACH",
      "careerOrRole": "1er año Arquitectura",
      "rating": 4.8,
      "reviewCount": 8,
      "vehicle": "Kia Morning 2021"
    },
    "origin": "Rancagua",
    "destination": "Santiago",
    "originPoint": "Rancagua, Estación de tren",
    "destinationPoint": "Santiago, Metro Tobalaba",
    "dateISO": "2026-05-31",
    "dateLabel": "Sábado 31 may",
    "time": "10:00",
    "priceCLP": 3500,
    "seatsTotal": 3,
    "seatsAvailable": 3,
    "genres": [
      "Hip-Hop",
      "Trap",
      "Pop"
    ],
    "sociabilityLevel": 3,
    "driverNote": "\"Sábado de regreso. Hip-Hop tranquilo de fondo.\"",
    "reviews": [
      {
        "id": "10-rev-0",
        "authorName": "Nicolás V.",
        "stars": 5,
        "comment": "Muy puntual y buena onda."
      }
    ],
    "weekDays": [
      5,
      6,
      0,
      1
    ]
  },
  {
    "id": "50",
    "driver": {
      "id": "driver-50",
      "fullName": "Kevin Flores",
      "initials": "KF",
      "avatarClass": "av-green",
      "gender": "M",
      "verificationType": "Estudiante Verificado",
      "badgeClass": "b-blue",
      "badgeIcon": "🎓",
      "university": "USACH",
      "careerOrRole": "2do año Computación",
      "rating": 4.7,
      "reviewCount": 15,
      "vehicle": "Chevrolet Spark 2020"
    },
    "origin": "Rancagua",
    "destination": "Santiago",
    "originPoint": "Rancagua, terminal",
    "destinationPoint": "Santiago, Metro Estación Central",
    "dateISO": "2026-05-30",
    "dateLabel": "Viernes 30 may",
    "time": "07:30",
    "priceCLP": 3500,
    "seatsTotal": 3,
    "seatsAvailable": 3,
    "genres": [
      "Reggaeton",
      "Trap",
      "Hip-Hop"
    ],
    "sociabilityLevel": 5,
    "driverNote": "\"Viernes temprano de regreso. Reggaeton y buena energía.\"",
    "reviews": [
      {
        "id": "50-rev-0",
        "authorName": "Andrea M.",
        "stars": 5,
        "comment": "Muy buena onda, viaje entretenido."
      },
      {
        "id": "50-rev-1",
        "authorName": "Gonzalo P.",
        "stars": 4,
        "comment": "Puntual."
      }
    ],
    "weekDays": [
      5,
      6,
      0,
      1
    ]
  },
  {
    "id": "51",
    "driver": {
      "id": "driver-51",
      "fullName": "Constanza Peña",
      "initials": "CP",
      "avatarClass": "av-pink",
      "gender": "F",
      "verificationType": "Egresada Verificada",
      "badgeClass": "b-purple",
      "badgeIcon": "🏛️",
      "university": "PUC",
      "careerOrRole": "Egresada Psicología",
      "rating": 4.9,
      "reviewCount": 31,
      "vehicle": "Nissan Versa 2021"
    },
    "origin": "Rancagua",
    "destination": "Santiago",
    "originPoint": "Rancagua, Av. Libertador",
    "destinationPoint": "Santiago, Metro Baquedano",
    "dateISO": "2026-06-01",
    "dateLabel": "Domingo 1 jun",
    "time": "07:00",
    "priceCLP": 3000,
    "seatsTotal": 2,
    "seatsAvailable": 2,
    "genres": [
      "Pop",
      "R&B",
      "Indie"
    ],
    "sociabilityLevel": 4,
    "driverNote": "\"Domingo de vuelta. Pop indie, viaje muy tranquilo.\"",
    "reviews": [
      {
        "id": "51-rev-0",
        "authorName": "Felipe L.",
        "stars": 5,
        "comment": "Excelente conductora."
      },
      {
        "id": "51-rev-1",
        "authorName": "Sofía T.",
        "stars": 5,
        "comment": "Muy recomendada."
      }
    ],
    "weekDays": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "52",
    "driver": {
      "id": "driver-52",
      "fullName": "Gabriel Soto",
      "initials": "GS",
      "avatarClass": "av-amber",
      "gender": "M",
      "verificationType": "Verificado Plus",
      "badgeClass": "b-amber",
      "badgeIcon": "⭐",
      "university": "U. de Concepción",
      "careerOrRole": "Docente Historia",
      "rating": 4.9,
      "reviewCount": 46,
      "vehicle": "Toyota Corolla 2022"
    },
    "origin": "Concepción",
    "destination": "Santiago",
    "originPoint": "Concepción, terminal Collao",
    "destinationPoint": "Santiago, Metro Estación Central",
    "dateISO": "2026-05-31",
    "dateLabel": "Sábado 31 may",
    "time": "06:00",
    "priceCLP": 8000,
    "seatsTotal": 3,
    "seatsAvailable": 3,
    "genres": [
      "Rock",
      "Blues",
      "Jazz"
    ],
    "sociabilityLevel": 2,
    "driverNote": "\"Más de 45 viajes. Rock y blues tranquilo. Salida puntualísima.\"",
    "reviews": [
      {
        "id": "52-rev-0",
        "authorName": "Daniela F.",
        "stars": 5,
        "comment": "El conductor más confiable del portal."
      },
      {
        "id": "52-rev-1",
        "authorName": "Rodrigo C.",
        "stars": 5,
        "comment": "Todo perfecto."
      }
    ],
    "weekDays": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "53",
    "driver": {
      "id": "driver-53",
      "fullName": "Antonella Vega",
      "initials": "AV",
      "avatarClass": "av-pink",
      "gender": "F",
      "verificationType": "Estudiante Verificada",
      "badgeClass": "b-blue",
      "badgeIcon": "🎓",
      "university": "U. de Concepción",
      "careerOrRole": "4to año Derecho",
      "rating": 4.7,
      "reviewCount": 12,
      "vehicle": "Hyundai Accent 2021"
    },
    "origin": "Concepción",
    "destination": "Santiago",
    "originPoint": "Concepción, Av. Chacabuco",
    "destinationPoint": "Santiago, Metro Baquedano",
    "dateISO": "2026-06-01",
    "dateLabel": "Domingo 1 jun",
    "time": "07:00",
    "priceCLP": 7500,
    "seatsTotal": 2,
    "seatsAvailable": 2,
    "genres": [
      "Pop",
      "Reggaeton",
      "K-Pop"
    ],
    "sociabilityLevel": 4,
    "driverNote": "\"Domingo de vuelta. K-Pop y pop para el viaje largo.\"",
    "reviews": [
      {
        "id": "53-rev-0",
        "authorName": "Isabel R.",
        "stars": 5,
        "comment": "Muy agradable el viaje."
      }
    ],
    "weekDays": [
      5,
      6,
      0,
      1
    ]
  },
  {
    "id": "54",
    "driver": {
      "id": "driver-54",
      "fullName": "Cristóbal Torres",
      "initials": "CT",
      "avatarClass": "av-blue",
      "gender": "M",
      "verificationType": "Egresado Verificado",
      "badgeClass": "b-purple",
      "badgeIcon": "🏛️",
      "university": "U. de La Frontera",
      "careerOrRole": "Egresado Agronomía",
      "rating": 4.8,
      "reviewCount": 35,
      "vehicle": "Subaru Outback 2021"
    },
    "origin": "Temuco",
    "destination": "Santiago",
    "originPoint": "Temuco, terminal Tur-Bus",
    "destinationPoint": "Santiago, Metro Estación Central",
    "dateISO": "2026-05-31",
    "dateLabel": "Sábado 31 may",
    "time": "06:30",
    "priceCLP": 9500,
    "seatsTotal": 3,
    "seatsAvailable": 3,
    "genres": [
      "Folclore",
      "Cumbia",
      "Rock"
    ],
    "sociabilityLevel": 3,
    "driverNote": "\"Egresado UFRO. Folclore y cumbia de fondo. Parada en Chillán.\"",
    "reviews": [
      {
        "id": "54-rev-0",
        "authorName": "Bernardita M.",
        "stars": 5,
        "comment": "Auto cómodo, conductor responsable."
      },
      {
        "id": "54-rev-1",
        "authorName": "Álvaro C.",
        "stars": 5,
        "comment": "Muy puntual."
      }
    ],
    "weekDays": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "55",
    "driver": {
      "id": "driver-55",
      "fullName": "Rosa Mansilla",
      "initials": "RM",
      "avatarClass": "av-teal",
      "gender": "F",
      "verificationType": "Verificado Externo",
      "badgeClass": "b-teal",
      "badgeIcon": "🔗",
      "university": "Externo verificado",
      "careerOrRole": "+90 viajes registrados",
      "rating": 4.7,
      "reviewCount": 91,
      "vehicle": "Kia Sorento 2022"
    },
    "origin": "Temuco",
    "destination": "Santiago",
    "originPoint": "Temuco, terminal",
    "destinationPoint": "Santiago, Metro Pudahuel",
    "dateISO": "2026-06-01",
    "dateLabel": "Domingo 1 jun",
    "time": "07:00",
    "priceCLP": 10000,
    "seatsTotal": 3,
    "seatsAvailable": 3,
    "genres": [
      "Folclore",
      "Cumbia",
      "Pop"
    ],
    "sociabilityLevel": 4,
    "driverNote": "\"Conductora externa verificada. Folclore y pop. SUV amplio.\"",
    "reviews": [
      {
        "id": "55-rev-0",
        "authorName": "Javiera P.",
        "stars": 5,
        "comment": "Muy buena conductora para viaje largo."
      },
      {
        "id": "55-rev-1",
        "authorName": "Diego S.",
        "stars": 5,
        "comment": "Recomendada."
      }
    ],
    "weekDays": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "56",
    "driver": {
      "id": "driver-56",
      "fullName": "Felipe Venegas",
      "initials": "FV",
      "avatarClass": "av-green",
      "gender": "M",
      "verificationType": "Estudiante Verificado",
      "badgeClass": "b-blue",
      "badgeIcon": "🎓",
      "university": "U. de Talca",
      "careerOrRole": "3er año Administración",
      "rating": 4.7,
      "reviewCount": 17,
      "vehicle": "Hyundai i20 2021"
    },
    "origin": "Talca",
    "destination": "Santiago",
    "originPoint": "Talca, terminal Rodoviario",
    "destinationPoint": "Santiago, Metro U. de Chile",
    "dateISO": "2026-05-31",
    "dateLabel": "Sábado 31 may",
    "time": "07:00",
    "priceCLP": 6000,
    "seatsTotal": 3,
    "seatsAvailable": 3,
    "genres": [
      "Hip-Hop",
      "Trap",
      "Reggaeton"
    ],
    "sociabilityLevel": 5,
    "driverNote": "\"Sábado de vuelta. Trap y hip-hop de fondo, buen ambiente.\"",
    "reviews": [
      {
        "id": "56-rev-0",
        "authorName": "Camila F.",
        "stars": 5,
        "comment": "Muy agradable y puntual."
      },
      {
        "id": "56-rev-1",
        "authorName": "Nicolás A.",
        "stars": 4,
        "comment": "Buen viaje."
      }
    ],
    "weekDays": [
      5,
      6,
      0,
      1
    ]
  },
  {
    "id": "57",
    "driver": {
      "id": "driver-57",
      "fullName": "Marcela Ibáñez",
      "initials": "MI",
      "avatarClass": "av-amber",
      "gender": "F",
      "verificationType": "Verificado Plus",
      "badgeClass": "b-amber",
      "badgeIcon": "⭐",
      "university": "U. de Talca",
      "careerOrRole": "Egresada Odontología",
      "rating": 4.9,
      "reviewCount": 36,
      "vehicle": "Honda HR-V 2022"
    },
    "origin": "Talca",
    "destination": "Santiago",
    "originPoint": "Talca, Av. Lircay",
    "destinationPoint": "Santiago, Metro Baquedano",
    "dateISO": "2026-05-30",
    "dateLabel": "Viernes 30 may",
    "time": "08:00",
    "priceCLP": 6500,
    "seatsTotal": 3,
    "seatsAvailable": 3,
    "genres": [
      "Pop",
      "Salsa",
      "Jazz"
    ],
    "sociabilityLevel": 4,
    "driverNote": "\"Viernes por la mañana a Santiago. Pop y salsa de fondo.\"",
    "reviews": [
      {
        "id": "57-rev-0",
        "authorName": "Javiera C.",
        "stars": 5,
        "comment": "Increíble conductora, muy profesional."
      },
      {
        "id": "57-rev-1",
        "authorName": "Andrés M.",
        "stars": 5,
        "comment": "Recomendada."
      }
    ],
    "weekDays": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "58",
    "driver": {
      "id": "driver-58",
      "fullName": "Karen Salinas",
      "initials": "KS",
      "avatarClass": "av-pink",
      "gender": "F",
      "verificationType": "Estudiante Verificada",
      "badgeClass": "b-blue",
      "badgeIcon": "🎓",
      "university": "U. de Talca",
      "careerOrRole": "2do año Nutrición",
      "rating": 4.6,
      "reviewCount": 9,
      "vehicle": "Chevrolet Aveo 2020"
    },
    "origin": "Talca",
    "destination": "Santiago",
    "originPoint": "Talca, terminal",
    "destinationPoint": "Santiago, Metro Estación Central",
    "dateISO": "2026-06-01",
    "dateLabel": "Domingo 1 jun",
    "time": "07:30",
    "priceCLP": 5500,
    "seatsTotal": 2,
    "seatsAvailable": 2,
    "genres": [
      "Pop",
      "K-Pop",
      "R&B"
    ],
    "sociabilityLevel": 4,
    "driverNote": "\"Domingo de regreso. K-Pop y pop para el camino.\"",
    "reviews": [
      {
        "id": "58-rev-0",
        "authorName": "Lorena M.",
        "stars": 5,
        "comment": "Simpática y puntual."
      }
    ],
    "weekDays": [
      5,
      6,
      0,
      1
    ]
  },
  {
    "id": "59",
    "driver": {
      "id": "driver-59",
      "fullName": "Alicia Bravo",
      "initials": "AB",
      "avatarClass": "av-purple",
      "gender": "F",
      "verificationType": "Egresada Verificada",
      "badgeClass": "b-purple",
      "badgeIcon": "🏛️",
      "university": "USACH",
      "careerOrRole": "Egresada Enfermería",
      "rating": 4.8,
      "reviewCount": 22,
      "vehicle": "Nissan Versa 2020"
    },
    "origin": "Curicó",
    "destination": "Santiago",
    "originPoint": "Curicó, plaza de armas",
    "destinationPoint": "Santiago, Metro Estación Central",
    "dateISO": "2026-05-31",
    "dateLabel": "Sábado 31 may",
    "time": "07:30",
    "priceCLP": 5000,
    "seatsTotal": 2,
    "seatsAvailable": 2,
    "genres": [
      "Pop",
      "Clásica",
      "Indie"
    ],
    "sociabilityLevel": 3,
    "driverNote": "\"Egresada USACH. Pop y clásica de fondo, viaje tranquilo.\"",
    "reviews": [
      {
        "id": "59-rev-0",
        "authorName": "Valentina R.",
        "stars": 5,
        "comment": "Muy confiable."
      },
      {
        "id": "59-rev-1",
        "authorName": "Sergio A.",
        "stars": 5,
        "comment": "Buen viaje."
      }
    ],
    "weekDays": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "60",
    "driver": {
      "id": "driver-60",
      "fullName": "Pablo Navarro",
      "initials": "PN",
      "avatarClass": "av-blue",
      "gender": "M",
      "verificationType": "Estudiante Verificado",
      "badgeClass": "b-blue",
      "badgeIcon": "🎓",
      "university": "U. de Chile",
      "careerOrRole": "3er año Economía",
      "rating": 4.7,
      "reviewCount": 13,
      "vehicle": "Kia Rio 2021"
    },
    "origin": "Curicó",
    "destination": "Santiago",
    "originPoint": "Curicó, terminal",
    "destinationPoint": "Santiago, Metro Baquedano",
    "dateISO": "2026-06-01",
    "dateLabel": "Domingo 1 jun",
    "time": "08:00",
    "priceCLP": 5000,
    "seatsTotal": 3,
    "seatsAvailable": 3,
    "genres": [
      "Rock",
      "Alternativo",
      "Jazz"
    ],
    "sociabilityLevel": 3,
    "driverNote": "\"Domingo de vuelta. Rock alternativo de fondo.\"",
    "reviews": [
      {
        "id": "60-rev-0",
        "authorName": "Pilar C.",
        "stars": 5,
        "comment": "Buen conductor."
      }
    ],
    "weekDays": [
      5,
      6,
      0,
      1
    ]
  },
  {
    "id": "61",
    "driver": {
      "id": "driver-61",
      "fullName": "Joaquín Riquelme",
      "initials": "JR",
      "avatarClass": "av-blue",
      "gender": "M",
      "verificationType": "Estudiante Verificado",
      "badgeClass": "b-blue",
      "badgeIcon": "🎓",
      "university": "U. del Bío-Bío",
      "careerOrRole": "4to año Educación",
      "rating": 4.7,
      "reviewCount": 19,
      "vehicle": "Mazda 3 2020"
    },
    "origin": "Chillán",
    "destination": "Santiago",
    "originPoint": "Chillán, terminal",
    "destinationPoint": "Santiago, Metro Estación Central",
    "dateISO": "2026-05-31",
    "dateLabel": "Sábado 31 may",
    "time": "07:00",
    "priceCLP": 7000,
    "seatsTotal": 3,
    "seatsAvailable": 3,
    "genres": [
      "Rock",
      "Alternativo",
      "Folk"
    ],
    "sociabilityLevel": 3,
    "driverNote": "\"Sábado de vuelta a Santiago. Rock y alternativo de fondo.\"",
    "reviews": [
      {
        "id": "61-rev-0",
        "authorName": "Catalina A.",
        "stars": 5,
        "comment": "Muy puntual."
      },
      {
        "id": "61-rev-1",
        "authorName": "Rodrigo M.",
        "stars": 4,
        "comment": "Buen viaje."
      }
    ],
    "weekDays": [
      5,
      6,
      0,
      1
    ]
  },
  {
    "id": "62",
    "driver": {
      "id": "driver-62",
      "fullName": "Lorena Vargas",
      "initials": "LV",
      "avatarClass": "av-purple",
      "gender": "F",
      "verificationType": "Egresada Verificada",
      "badgeClass": "b-purple",
      "badgeIcon": "🏛️",
      "university": "U. del Bío-Bío",
      "careerOrRole": "Egresada Pedagogía",
      "rating": 4.8,
      "reviewCount": 24,
      "vehicle": "Chevrolet Sail 2021"
    },
    "origin": "Chillán",
    "destination": "Santiago",
    "originPoint": "Chillán, Av. El Roble",
    "destinationPoint": "Santiago, Metro U. de Chile",
    "dateISO": "2026-06-01",
    "dateLabel": "Domingo 1 jun",
    "time": "07:30",
    "priceCLP": 6500,
    "seatsTotal": 2,
    "seatsAvailable": 2,
    "genres": [
      "Pop",
      "Salsa",
      "Cumbia"
    ],
    "sociabilityLevel": 4,
    "driverNote": "\"Domingo de regreso. Pop y salsa, muy buen ambiente.\"",
    "reviews": [
      {
        "id": "62-rev-0",
        "authorName": "Sandra V.",
        "stars": 5,
        "comment": "Muy confiable y agradable."
      }
    ],
    "weekDays": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "63",
    "driver": {
      "id": "driver-63",
      "fullName": "Pilar González",
      "initials": "PG",
      "avatarClass": "av-pink",
      "gender": "F",
      "verificationType": "Egresada Verificada",
      "badgeClass": "b-purple",
      "badgeIcon": "🏛️",
      "university": "PUC",
      "careerOrRole": "Egresada Letras",
      "rating": 4.8,
      "reviewCount": 17,
      "vehicle": "Toyota Yaris 2021"
    },
    "origin": "San Fernando",
    "destination": "Santiago",
    "originPoint": "San Fernando, terminal",
    "destinationPoint": "Santiago, Metro Estación Central",
    "dateISO": "2026-05-31",
    "dateLabel": "Sábado 31 may",
    "time": "07:00",
    "priceCLP": 3000,
    "seatsTotal": 2,
    "seatsAvailable": 2,
    "genres": [
      "Indie",
      "Pop",
      "Jazz"
    ],
    "sociabilityLevel": 3,
    "driverNote": "\"Sábado de vuelta. Indie y jazz, viaje muy tranquilo.\"",
    "reviews": [
      {
        "id": "63-rev-0",
        "authorName": "Andrés R.",
        "stars": 5,
        "comment": "Muy puntual."
      },
      {
        "id": "63-rev-1",
        "authorName": "Camila F.",
        "stars": 5,
        "comment": "Buen viaje."
      }
    ],
    "weekDays": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "64",
    "driver": {
      "id": "driver-64",
      "fullName": "Marco Andrade",
      "initials": "MA",
      "avatarClass": "av-green",
      "gender": "M",
      "verificationType": "Estudiante Verificado",
      "badgeClass": "b-blue",
      "badgeIcon": "🎓",
      "university": "U. de Chile",
      "careerOrRole": "3er año Arquitectura",
      "rating": 4.6,
      "reviewCount": 8,
      "vehicle": "Hyundai i10 2021"
    },
    "origin": "San Fernando",
    "destination": "Santiago",
    "originPoint": "San Fernando, plaza",
    "destinationPoint": "Santiago, Metro Baquedano",
    "dateISO": "2026-06-01",
    "dateLabel": "Domingo 1 jun",
    "time": "07:30",
    "priceCLP": 3000,
    "seatsTotal": 3,
    "seatsAvailable": 3,
    "genres": [
      "Rock",
      "Indie",
      "Alternativo"
    ],
    "sociabilityLevel": 3,
    "driverNote": "\"Domingo de vuelta. Rock suave, viaje corto y directo.\"",
    "reviews": [
      {
        "id": "64-rev-0",
        "authorName": "Lorena C.",
        "stars": 5,
        "comment": "Puntual y confiable."
      }
    ],
    "weekDays": [
      5,
      6,
      0,
      1
    ]
  },
  {
    "id": "65",
    "driver": {
      "id": "driver-65",
      "fullName": "Teresa Muñoz",
      "initials": "TM",
      "avatarClass": "av-pink",
      "gender": "F",
      "verificationType": "Egresada Verificada",
      "badgeClass": "b-purple",
      "badgeIcon": "🏛️",
      "university": "USACH",
      "careerOrRole": "Egresada Periodismo",
      "rating": 4.7,
      "reviewCount": 14,
      "vehicle": "Kia Morning 2020"
    },
    "origin": "Rengo",
    "destination": "Santiago",
    "originPoint": "Rengo, terminal",
    "destinationPoint": "Santiago, Metro Estación Central",
    "dateISO": "2026-05-31",
    "dateLabel": "Sábado 31 may",
    "time": "07:30",
    "priceCLP": 2500,
    "seatsTotal": 3,
    "seatsAvailable": 3,
    "genres": [
      "Pop",
      "Cumbia",
      "Salsa"
    ],
    "sociabilityLevel": 4,
    "driverNote": "\"Sábado de vuelta. Pop y cumbia, trayecto corto.\"",
    "reviews": [
      {
        "id": "65-rev-0",
        "authorName": "Ignacio M.",
        "stars": 5,
        "comment": "Muy simpática y puntual."
      }
    ],
    "weekDays": [
      0,
      1,
      2,
      3,
      4,
      5,
      6
    ]
  },
  {
    "id": "66",
    "driver": {
      "id": "driver-66",
      "fullName": "Jorge Lagos",
      "initials": "JL",
      "avatarClass": "av-blue",
      "gender": "M",
      "verificationType": "Estudiante Verificado",
      "badgeClass": "b-blue",
      "badgeIcon": "🎓",
      "university": "U. de Chile",
      "careerOrRole": "2do año Ingeniería",
      "rating": 4.6,
      "reviewCount": 6,
      "vehicle": "Chevrolet Aveo 2019"
    },
    "origin": "Rengo",
    "destination": "Santiago",
    "originPoint": "Rengo, plaza central",
    "destinationPoint": "Santiago, Metro U. de Chile",
    "dateISO": "2026-06-01",
    "dateLabel": "Domingo 1 jun",
    "time": "08:00",
    "priceCLP": 2500,
    "seatsTotal": 2,
    "seatsAvailable": 2,
    "genres": [
      "Hip-Hop",
      "Jazz",
      "Pop"
    ],
    "sociabilityLevel": 3,
    "driverNote": "\"Domingo de regreso. Hip-Hop tranquilo de fondo.\"",
    "reviews": [
      {
        "id": "66-rev-0",
        "authorName": "Ana F.",
        "stars": 5,
        "comment": "Buen conductor."
      }
    ],
    "weekDays": [
      5,
      6,
      0,
      1
    ]
  }
];
