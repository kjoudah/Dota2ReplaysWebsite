import { NextResponse } from 'next/server';
import { getPubMatchesForProsFromD2PT } from '../service/D2PTScraper';

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const players = searchParams.get('players').split(',');
  const d2PTData = await getPubMatchesForProsFromD2PT(players);

  return NextResponse.json(d2PTData.flat());
}
