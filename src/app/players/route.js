import { getAllPlayers } from "../db";
import { NextResponse } from "next/server";

export async function GET() {
  const { data } = await getAllPlayers();

  const players = data.map((role) => ({
    label: role.name,
    players: role.players.map((player) => ({
      label: player,
      value: player,
    })),
  }));
  return NextResponse.json(players);
}
