/*
  Warnings:

  - You are about to drop the column `name` on the `commissionaire` table. All the data in the column will be lost.
  - You are about to drop the column `commissionaireId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `isAdmin` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `paymentStatus` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `photoUrl` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `services` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `commissionaire` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `commissionaire` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'MECHANIC', 'COMMISSIONAIRE');

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_commissionaireId_fkey";

-- AlterTable
ALTER TABLE "commissionaire" DROP COLUMN "name",
ADD COLUMN     "commission" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "referrals" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "commissionaireId",
DROP COLUMN "isAdmin",
DROP COLUMN "paymentStatus",
DROP COLUMN "photoUrl",
DROP COLUMN "services",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'MECHANIC';

-- CreateTable
CREATE TABLE "mechanic" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "specialties" TEXT[],
    "experience" INTEGER NOT NULL,
    "cityId" TEXT NOT NULL,
    "photoUrl" TEXT,

    CONSTRAINT "mechanic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "mechanic_userId_key" ON "mechanic"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "commissionaire_userId_key" ON "commissionaire"("userId");

-- AddForeignKey
ALTER TABLE "mechanic" ADD CONSTRAINT "mechanic_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commissionaire" ADD CONSTRAINT "commissionaire_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
