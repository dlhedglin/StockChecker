/*
  Warnings:

  - The primary key for the `Price` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Price" (
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price" DECIMAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,

    PRIMARY KEY ("itemId", "year", "month", "day"),
    FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Price" ("timestamp", "price", "itemId", "year", "month", "day") SELECT "timestamp", "price", "itemId", "year", "month", "day" FROM "Price";
DROP TABLE "Price";
ALTER TABLE "new_Price" RENAME TO "Price";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
