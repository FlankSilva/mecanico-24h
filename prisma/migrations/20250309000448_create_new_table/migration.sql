-- CreateTable
CREATE TABLE "UserServices" (
    "userId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "UserServices_pkey" PRIMARY KEY ("userId","serviceId")
);

-- AddForeignKey
ALTER TABLE "UserServices" ADD CONSTRAINT "UserServices_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserServices" ADD CONSTRAINT "UserServices_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
