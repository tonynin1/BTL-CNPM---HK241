-- CreateTable
CREATE TABLE "Deposit" (
    "depositId" SERIAL NOT NULL,
    "depositTime" TIMESTAMP(3) NOT NULL,
    "customerId" INTEGER NOT NULL,
    "depositStatus" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "Deposit_pkey" PRIMARY KEY ("depositId")
);

-- AddForeignKey
ALTER TABLE "Deposit" ADD CONSTRAINT "Deposit_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;
