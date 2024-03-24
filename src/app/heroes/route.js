import { NextResponse } from "next/server";
import { getAllHeroes } from "../service/StratzService";

export async function GET() {
  const heroes = await getAllHeroes();
  return NextResponse.json(heroes);
}
