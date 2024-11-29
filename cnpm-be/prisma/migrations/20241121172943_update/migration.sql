/*
  Warnings:

  - The primary key for the `PagePurchaseOrder` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "PagePurchaseOrder" DROP CONSTRAINT "PagePurchaseOrder_pkey",
ADD CONSTRAINT "PagePurchaseOrder_pkey" PRIMARY KEY ("customerId");
