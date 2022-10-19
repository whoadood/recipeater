/*
  Warnings:

  - You are about to drop the column `cook_time` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `prep_time` on the `Recipe` table. All the data in the column will be lost.
  - Changed the type of `yield` on the `Recipe` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "cook_time",
DROP COLUMN "prep_time",
DROP COLUMN "yield",
ADD COLUMN     "yield" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Prep_time" (
    "id" TEXT NOT NULL,
    "time" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "recipe_id" TEXT NOT NULL,

    CONSTRAINT "Prep_time_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cook_time" (
    "id" TEXT NOT NULL,
    "time" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "recipe_id" TEXT NOT NULL,

    CONSTRAINT "Cook_time_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Prep_time_recipe_id_key" ON "Prep_time"("recipe_id");

-- CreateIndex
CREATE UNIQUE INDEX "Cook_time_recipe_id_key" ON "Cook_time"("recipe_id");

-- AddForeignKey
ALTER TABLE "Prep_time" ADD CONSTRAINT "Prep_time_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cook_time" ADD CONSTRAINT "Cook_time_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
