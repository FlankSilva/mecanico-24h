-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'MECHANIC', 'COMMISSIONAIRE');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('pending', 'paid', 'failed');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "role" "UserRole" NOT NULL DEFAULT 'MECHANIC',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mechanic" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "specialties" TEXT[],
    "experience" INTEGER NOT NULL,
    "cityId" TEXT NOT NULL,
    "photoUrl" TEXT,
    "commissionaireId" TEXT,

    CONSTRAINT "mechanic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commissionaire" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "uniqueCode" TEXT NOT NULL,
    "referrals" INTEGER NOT NULL DEFAULT 0,
    "commission" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "commissionaire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "commissionaireId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "PaymentStatus" NOT NULL DEFAULT 'pending',

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "mechanic_userId_key" ON "mechanic"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "commissionaire_userId_key" ON "commissionaire"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "commissionaire_uniqueCode_key" ON "commissionaire"("uniqueCode");

-- AddForeignKey
ALTER TABLE "mechanic" ADD CONSTRAINT "mechanic_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mechanic" ADD CONSTRAINT "mechanic_commissionaireId_fkey" FOREIGN KEY ("commissionaireId") REFERENCES "commissionaire"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commissionaire" ADD CONSTRAINT "commissionaire_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_commissionaireId_fkey" FOREIGN KEY ("commissionaireId") REFERENCES "commissionaire"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
