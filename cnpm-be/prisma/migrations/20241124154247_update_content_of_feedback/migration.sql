/*
  Warnings:

  - You are about to drop the column `content` on the `Feedback` table. All the data in the column will be lost.
  - Added the required column `contentByCustomer` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contentBySPSO` to the `Feedback` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "content",
ADD COLUMN     "contentByCustomer" TEXT NOT NULL,
ADD COLUMN     "contentBySPSO" TEXT NOT NULL;
