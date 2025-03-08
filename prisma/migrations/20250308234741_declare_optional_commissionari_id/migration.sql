-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_commissionaireId_fkey";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "commissionaireId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_commissionaireId_fkey" FOREIGN KEY ("commissionaireId") REFERENCES "commissionaire"("id") ON DELETE SET NULL ON UPDATE CASCADE;
