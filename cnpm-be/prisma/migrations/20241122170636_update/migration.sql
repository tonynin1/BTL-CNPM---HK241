/*
  Warnings:

  - You are about to drop the column `pageOrder` on the `PagePurchaseOrder` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PagePurchaseOrder" DROP COLUMN "pageOrder",
ADD COLUMN     "pageNum" INTEGER NOT NULL DEFAULT 0;
