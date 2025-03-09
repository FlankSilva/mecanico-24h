/*
  Warnings:

  - You are about to drop the `UserServices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserServices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `service` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserServices" DROP CONSTRAINT "UserServices_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "UserServices" DROP CONSTRAINT "UserServices_userId_fkey";

-- DropForeignKey
ALTER TABLE "_UserServices" DROP CONSTRAINT "_UserServices_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserServices" DROP CONSTRAINT "_UserServices_B_fkey";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "services" TEXT[];

-- DropTable
DROP TABLE "UserServices";

-- DropTable
DROP TABLE "_UserServices";

-- DropTable
DROP TABLE "service";
