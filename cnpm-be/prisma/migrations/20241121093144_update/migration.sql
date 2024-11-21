/*
  Warnings:

  - You are about to drop the column `pQuantity` on the `PagePurchaseOrder` table. All the data in the column will be lost.
  - You are about to drop the column `paperType` on the `PagePurchaseOrder` table. All the data in the column will be lost.
  - Added the required column `pageOrder` to the `PagePurchaseOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PagePurchaseOrder" DROP COLUMN "pQuantity",
DROP COLUMN "paperType",
ADD COLUMN     "pageOrder" JSONB NOT NULL;
