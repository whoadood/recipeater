/*
  Warnings:

  - You are about to drop the column `description` on the `Direction` table. All the data in the column will be lost.
  - You are about to drop the column `step_number` on the `Direction` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Ingredient` table. All the data in the column will be lost.
  - Added the required column `step` to the `Direction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `Direction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `public_id` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `signature` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `version` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `Ingredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit` to the `Ingredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `views` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Direction" DROP COLUMN "description",
DROP COLUMN "step_number",
ADD COLUMN     "step" INTEGER NOT NULL,
ADD COLUMN     "text" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "url",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "public_id" TEXT NOT NULL,
ADD COLUMN     "signature" TEXT NOT NULL,
ADD COLUMN     "version" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "quantity",
ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "unit" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "views" INTEGER NOT NULL;
