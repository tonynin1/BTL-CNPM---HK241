/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "SPSOMember" (
    "memberId" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "address" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "usageHistory" TEXT NOT NULL,

    CONSTRAINT "SPSOMember_pkey" PRIMARY KEY ("memberId")
);

-- CreateTable
CREATE TABLE "Customer" (
    "customerId" TEXT NOT NULL,
    "purchaseAndPrintHistory" TEXT NOT NULL,
    "accountBalance" DOUBLE PRECISION NOT NULL,
    "summary" TEXT NOT NULL,
    "remainingPages" INTEGER NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "usageHistory" TEXT NOT NULL,
    "parameterChanges" TEXT NOT NULL,
    "memberId" TEXT,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("customerId")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "feedbackId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "feedbackTime" TIMESTAMP(3) NOT NULL,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("feedbackId")
);

-- CreateTable
CREATE TABLE "Printer" (
    "printerId" TEXT NOT NULL,
    "printerType" TEXT NOT NULL,
    "brandName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "facility" TEXT NOT NULL,
    "building" TEXT NOT NULL,
    "room" TEXT NOT NULL,
    "isInstalled" BOOLEAN NOT NULL,

    CONSTRAINT "Printer_pkey" PRIMARY KEY ("printerId")
);

-- CreateTable
CREATE TABLE "PurchaseOrder" (
    "transactionId" TEXT NOT NULL,
    "purchaseTime" TIMESTAMP(3) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "paperType" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "printerId" TEXT NOT NULL,

    CONSTRAINT "PurchaseOrder_pkey" PRIMARY KEY ("transactionId")
);

-- CreateTable
CREATE TABLE "PrintOrder" (
    "orderId" TEXT NOT NULL,
    "printAttributes" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "copyCount" INTEGER NOT NULL,
    "printedDocument" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "printerId" TEXT NOT NULL,

    CONSTRAINT "PrintOrder_pkey" PRIMARY KEY ("orderId")
);

-- CreateTable
CREATE TABLE "Document" (
    "documentId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "documentCount" INTEGER NOT NULL,
    "requiredDocument" TEXT NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("documentId")
);

-- CreateTable
CREATE TABLE "PrintRecord" (
    "documentId" TEXT NOT NULL,
    "printerId" TEXT NOT NULL,

    CONSTRAINT "PrintRecord_pkey" PRIMARY KEY ("documentId","printerId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_memberId_key" ON "Customer"("memberId");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "SPSOMember"("memberId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_printerId_fkey" FOREIGN KEY ("printerId") REFERENCES "Printer"("printerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrintOrder" ADD CONSTRAINT "PrintOrder_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrintOrder" ADD CONSTRAINT "PrintOrder_printerId_fkey" FOREIGN KEY ("printerId") REFERENCES "Printer"("printerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrintRecord" ADD CONSTRAINT "PrintRecord_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("documentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrintRecord" ADD CONSTRAINT "PrintRecord_printerId_fkey" FOREIGN KEY ("printerId") REFERENCES "Printer"("printerId") ON DELETE RESTRICT ON UPDATE CASCADE;
