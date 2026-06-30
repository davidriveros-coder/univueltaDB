import { NextRequest, NextResponse } from 'next/server';

const SHEETS_EXEC = process.env.SHEETS_EXEC!;

export async function GET(req: NextRequest) {
  const qs = req.nextUrl.searchParams.toString();
  const res = await fetch(`${SHEETS_EXEC}?${qs}`, { cache: 'no-store' });
  const data = await res.json();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const res = await fetch(SHEETS_EXEC, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data);
}
