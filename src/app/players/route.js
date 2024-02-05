import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function GET() {
  const qwe = await prisma.role.findMany({
    select: {
      name: true,
      players: {
        select: {
          name: true,
          aliases: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  const players = qwe.map((role) => ({
    label: role.name,
    players: role.players.map((player) => ({
      label: player.name,
      value: player.aliases.map((alias) => alias.name),
    })),
  }));
  return NextResponse.json(players);
}
