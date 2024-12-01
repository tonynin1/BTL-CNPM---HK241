/*
  Warnings:

  - You are about to drop the column `printerId` on the `Document` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_printerId_fkey";

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "printerId";
