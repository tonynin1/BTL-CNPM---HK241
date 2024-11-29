/*
  Warnings:

  - You are about to drop the column `printerId` on the `PagePurchaseOrder` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PagePurchaseOrder" DROP CONSTRAINT "PagePurchaseOrder_printerId_fkey";

-- AlterTable
ALTER TABLE "PagePurchaseOrder" DROP COLUMN "printerId";
