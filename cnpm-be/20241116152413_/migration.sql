/*
  Warnings:

  - The primary key for the `Customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `accountBalance` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `memberId` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `parameterChanges` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `purchaseAndPrintHistory` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `remainingPages` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `usageHistory` on the `Customer` table. All the data in the column will be lost.
  - The `customerId` column on the `Customer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Document` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `documentCount` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `requiredDocument` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Document` table. All the data in the column will be lost.
  - The `documentId` column on the `Document` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Feedback` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `feedbackTime` on the `Feedback` table. All the data in the column will be lost.
  - The `feedbackId` column on the `Feedback` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `PrintOrder` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `copyCount` on the `PrintOrder` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `PrintOrder` table. All the data in the column will be lost.
  - You are about to drop the column `printAttributes` on the `PrintOrder` table. All the data in the column will be lost.
  - You are about to drop the column `printedDocument` on the `PrintOrder` table. All the data in the column will be lost.
  - You are about to drop the column `printerId` on the `PrintOrder` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `PrintOrder` table. All the data in the column will be lost.
  - The primary key for the `Printer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `brandName` on the `Printer` table. All the data in the column will be lost.
  - You are about to drop the column `isInstalled` on the `Printer` table. All the data in the column will be lost.
  - You are about to drop the column `printerType` on the `Printer` table. All the data in the column will be lost.
  - The `printerId` column on the `Printer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `SPSOMember` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `birthDate` on the `SPSOMember` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `SPSOMember` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `SPSOMember` table. All the data in the column will be lost.
  - You are about to drop the column `memberId` on the `SPSOMember` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `SPSOMember` table. All the data in the column will be lost.
  - You are about to drop the column `usageHistory` on the `SPSOMember` table. All the data in the column will be lost.
  - You are about to drop the `PrintRecord` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PurchaseOrder` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `accBalance` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `remainPages` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `docName` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `docQuantity` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `printerId` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `feedTime` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spsomemberId` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `customerId` on the `Feedback` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `attributes` to the `PrintOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numCopies` to the `PrintOrder` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `customerId` on the `PrintOrder` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `brand` to the `Printer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model` to the `Printer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spsomemberId` to the `Printer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dob` to the `SPSOMember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `SPSOMember` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_memberId_fkey";

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_customerId_fkey";

-- DropForeignKey
ALTER TABLE "PrintOrder" DROP CONSTRAINT "PrintOrder_customerId_fkey";

-- DropForeignKey
ALTER TABLE "PrintOrder" DROP CONSTRAINT "PrintOrder_printerId_fkey";

-- DropForeignKey
ALTER TABLE "PrintRecord" DROP CONSTRAINT "PrintRecord_documentId_fkey";

-- DropForeignKey
ALTER TABLE "PrintRecord" DROP CONSTRAINT "PrintRecord_printerId_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseOrder" DROP CONSTRAINT "PurchaseOrder_customerId_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseOrder" DROP CONSTRAINT "PurchaseOrder_printerId_fkey";

-- DropIndex
DROP INDEX "Customer_memberId_key";

-- AlterTable
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_pkey",
DROP COLUMN "accountBalance",
DROP COLUMN "email",
DROP COLUMN "fullName",
DROP COLUMN "memberId",
DROP COLUMN "parameterChanges",
DROP COLUMN "phoneNumber",
DROP COLUMN "purchaseAndPrintHistory",
DROP COLUMN "remainingPages",
DROP COLUMN "usageHistory",
ADD COLUMN     "accBalance" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "ppHistory" TEXT,
ADD COLUMN     "remainPages" INTEGER NOT NULL,
ADD COLUMN     "spsoMemberId" INTEGER,
ADD COLUMN     "userId" INTEGER NOT NULL,
DROP COLUMN "customerId",
ADD COLUMN     "customerId" SERIAL NOT NULL,
ALTER COLUMN "summary" DROP NOT NULL,
ADD CONSTRAINT "Customer_pkey" PRIMARY KEY ("customerId");

-- AlterTable
ALTER TABLE "Document" DROP CONSTRAINT "Document_pkey",
DROP COLUMN "documentCount",
DROP COLUMN "requiredDocument",
DROP COLUMN "title",
ADD COLUMN     "customerId" INTEGER NOT NULL,
ADD COLUMN     "docName" TEXT NOT NULL,
ADD COLUMN     "docQuantity" INTEGER NOT NULL,
ADD COLUMN     "printerId" INTEGER NOT NULL,
DROP COLUMN "documentId",
ADD COLUMN     "documentId" SERIAL NOT NULL,
ADD CONSTRAINT "Document_pkey" PRIMARY KEY ("documentId");

-- AlterTable
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_pkey",
DROP COLUMN "feedbackTime",
ADD COLUMN     "feedTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "spsomemberId" INTEGER NOT NULL,
DROP COLUMN "feedbackId",
ADD COLUMN     "feedbackId" SERIAL NOT NULL,
DROP COLUMN "customerId",
ADD COLUMN     "customerId" INTEGER NOT NULL,
ADD CONSTRAINT "Feedback_pkey" PRIMARY KEY ("feedbackId");

-- AlterTable
ALTER TABLE "PrintOrder" DROP CONSTRAINT "PrintOrder_pkey",
DROP COLUMN "copyCount",
DROP COLUMN "orderId",
DROP COLUMN "printAttributes",
DROP COLUMN "printedDocument",
DROP COLUMN "printerId",
DROP COLUMN "status",
ADD COLUMN     "attributes" TEXT NOT NULL,
ADD COLUMN     "numCopies" INTEGER NOT NULL,
ADD COLUMN     "poStatus" TEXT NOT NULL DEFAULT 'Pending',
ADD COLUMN     "printOrderId" SERIAL NOT NULL,
DROP COLUMN "customerId",
ADD COLUMN     "customerId" INTEGER NOT NULL,
ADD CONSTRAINT "PrintOrder_pkey" PRIMARY KEY ("printOrderId");

-- AlterTable
ALTER TABLE "Printer" DROP CONSTRAINT "Printer_pkey",
DROP COLUMN "brandName",
DROP COLUMN "isInstalled",
DROP COLUMN "printerType",
ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "model" TEXT NOT NULL,
ADD COLUMN     "spsomemberId" INTEGER NOT NULL,
DROP COLUMN "printerId",
ADD COLUMN     "printerId" SERIAL NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ADD CONSTRAINT "Printer_pkey" PRIMARY KEY ("printerId");

-- AlterTable
ALTER TABLE "SPSOMember" DROP CONSTRAINT "SPSOMember_pkey",
DROP COLUMN "birthDate",
DROP COLUMN "email",
DROP COLUMN "fullName",
DROP COLUMN "memberId",
DROP COLUMN "phoneNumber",
DROP COLUMN "usageHistory",
ADD COLUMN     "dob" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "sosoMemberId" SERIAL NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "SPSOMember_pkey" PRIMARY KEY ("sosoMemberId");

-- DropTable
DROP TABLE "PrintRecord";

-- DropTable
DROP TABLE "PurchaseOrder";

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "fname" TEXT NOT NULL,
    "lname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "usageHistory" TEXT,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "PagePurchaseOrder" (
    "ppoId" SERIAL NOT NULL,
    "purchaseTime" TIMESTAMP(3) NOT NULL,
    "customerId" INTEGER NOT NULL,
    "ppoStatus" TEXT NOT NULL DEFAULT 'Pending',
    "pQuantity" INTEGER NOT NULL,
    "paperType" TEXT NOT NULL,
    "printerId" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PagePurchaseOrder_pkey" PRIMARY KEY ("ppoId")
);

-- CreateTable
CREATE TABLE "Contains" (
    "id" SERIAL NOT NULL,
    "documentId" INTEGER NOT NULL,
    "printOrderId" INTEGER NOT NULL,

    CONSTRAINT "Contains_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "SPSOMember" ADD CONSTRAINT "SPSOMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_spsoMemberId_fkey" FOREIGN KEY ("spsoMemberId") REFERENCES "SPSOMember"("sosoMemberId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_spsomemberId_fkey" FOREIGN KEY ("spsomemberId") REFERENCES "SPSOMember"("sosoMemberId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Printer" ADD CONSTRAINT "Printer_spsomemberId_fkey" FOREIGN KEY ("spsomemberId") REFERENCES "SPSOMember"("sosoMemberId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PagePurchaseOrder" ADD CONSTRAINT "PagePurchaseOrder_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PagePurchaseOrder" ADD CONSTRAINT "PagePurchaseOrder_printerId_fkey" FOREIGN KEY ("printerId") REFERENCES "Printer"("printerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrintOrder" ADD CONSTRAINT "PrintOrder_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_printerId_fkey" FOREIGN KEY ("printerId") REFERENCES "Printer"("printerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contains" ADD CONSTRAINT "Contains_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("documentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contains" ADD CONSTRAINT "Contains_printOrderId_fkey" FOREIGN KEY ("printOrderId") REFERENCES "PrintOrder"("printOrderId") ON DELETE RESTRICT ON UPDATE CASCADE;
