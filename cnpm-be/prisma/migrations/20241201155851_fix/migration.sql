/*
  Warnings:

  - You are about to drop the column `sPSOMemberSosoMemberId` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `fileUrl` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `printerId` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `docQuantity` on the `PrintOrder` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `PrintOrder` table. All the data in the column will be lost.
  - Added the required column `customerId` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `docName` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `docQuantity` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attributes` to the `PrintOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `docId` to the `PrintOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `PrintOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numCopies` to the `PrintOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `PrintOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brand` to the `Printer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `building` to the `Printer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `facility` to the `Printer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model` to the `Printer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room` to the `Printer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_sPSOMemberSosoMemberId_fkey";

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_printerId_fkey";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "sPSOMemberSosoMemberId",
ADD COLUMN     "spsoMemberId" INTEGER;

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "fileUrl",
DROP COLUMN "printerId",
ADD COLUMN     "customerId" INTEGER NOT NULL,
ADD COLUMN     "docLink" TEXT,
ADD COLUMN     "docName" TEXT NOT NULL,
ADD COLUMN     "docQuantity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PrintOrder" DROP COLUMN "docQuantity",
DROP COLUMN "status",
ADD COLUMN     "attributes" TEXT NOT NULL,
ADD COLUMN     "docId" INTEGER NOT NULL,
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "numCopies" INTEGER NOT NULL,
ADD COLUMN     "poStatus" TEXT NOT NULL DEFAULT 'Pending',
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Printer" ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "building" TEXT NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "facility" TEXT NOT NULL,
ADD COLUMN     "model" TEXT NOT NULL,
ADD COLUMN     "room" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'VALID';

-- CreateTable
CREATE TABLE "Feedback" (
    "feedbackId" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "feedTime" TIMESTAMP(3) NOT NULL,
    "rating" INTEGER NOT NULL,
    "contentByCustomer" TEXT NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("feedbackId")
);

-- CreateTable
CREATE TABLE "PagePurchaseOrder" (
    "ppoId" SERIAL NOT NULL,
    "purchaseTime" TIMESTAMP(3) NOT NULL,
    "customerId" INTEGER NOT NULL,
    "ppoStatus" TEXT NOT NULL DEFAULT 'Pending',
    "pageNum" INTEGER NOT NULL DEFAULT 0,
    "price" DOUBLE PRECISION NOT NULL,
    "paymentMethod" TEXT NOT NULL,

    CONSTRAINT "PagePurchaseOrder_pkey" PRIMARY KEY ("ppoId")
);

-- CreateTable
CREATE TABLE "Contains" (
    "id" SERIAL NOT NULL,
    "documentId" INTEGER NOT NULL,
    "printOrderId" INTEGER NOT NULL,

    CONSTRAINT "Contains_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_spsoMemberId_fkey" FOREIGN KEY ("spsoMemberId") REFERENCES "SPSOMember"("sosoMemberId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PagePurchaseOrder" ADD CONSTRAINT "PagePurchaseOrder_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrintOrder" ADD CONSTRAINT "PrintOrder_docId_fkey" FOREIGN KEY ("docId") REFERENCES "Document"("documentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contains" ADD CONSTRAINT "Contains_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("documentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contains" ADD CONSTRAINT "Contains_printOrderId_fkey" FOREIGN KEY ("printOrderId") REFERENCES "PrintOrder"("printOrderId") ON DELETE RESTRICT ON UPDATE CASCADE;
