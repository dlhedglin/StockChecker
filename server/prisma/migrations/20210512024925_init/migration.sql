/*
  Warnings:

  - Added the required column `year` to the `Price` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `Price` table without a default value. This is not possible if the table is not empty.
  - Added the required column `day` to the `Price` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Price" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price" DECIMAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Price" ("id", "timestamp", "price", "itemId") SELECT "id", "timestamp", "price", "itemId" FROM "Price";
DROP TABLE "Price";
ALTER TABLE "new_Price" RENAME TO "Price";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
