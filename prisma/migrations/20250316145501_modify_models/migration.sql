-- CreateTable
CREATE TABLE "referral" (
    "id" TEXT NOT NULL,
    "commissionaireId" TEXT NOT NULL,
    "mechanicId" TEXT NOT NULL,
    "commission" DOUBLE PRECISION NOT NULL,
    "referralDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "referral_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "referral" ADD CONSTRAINT "referral_commissionaireId_fkey" FOREIGN KEY ("commissionaireId") REFERENCES "commissionaire"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral" ADD CONSTRAINT "referral_mechanicId_fkey" FOREIGN KEY ("mechanicId") REFERENCES "mechanic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
