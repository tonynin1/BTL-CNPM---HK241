/*
  Warnings:

  - You are about to drop the column `contentBySPSO` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `spsomemberId` on the `Feedback` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_spsomemberId_fkey";

-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "contentBySPSO",
DROP COLUMN "spsomemberId";
