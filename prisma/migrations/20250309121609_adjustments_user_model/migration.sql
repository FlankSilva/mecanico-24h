-- AlterTable
ALTER TABLE "user" ALTER COLUMN "photoUrl" DROP NOT NULL,
ALTER COLUMN "isAdmin" SET DEFAULT false;
