/*
  Warnings:

  - Added the required column `name` to the `Alias` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Alias" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "playerId" TEXT,
    CONSTRAINT "Alias_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Alias" ("id", "playerId") SELECT "id", "playerId" FROM "Alias";
DROP TABLE "Alias";
ALTER TABLE "new_Alias" RENAME TO "Alias";
CREATE UNIQUE INDEX "Alias_id_key" ON "Alias"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
