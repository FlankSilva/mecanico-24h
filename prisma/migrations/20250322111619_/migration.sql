/*
  Warnings:

  - The `cityId` column on the `mechanic` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "mechanic" DROP COLUMN "cityId",
ADD COLUMN     "cityId" TEXT[];
