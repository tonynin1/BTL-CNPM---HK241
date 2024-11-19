/*
  Warnings:

  - Added the required column `adminEmail` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_userId_fkey";

-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "accBalance" SET DEFAULT 0,
ALTER COLUMN "remainPages" SET DEFAULT 0,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "adminEmail" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Admin" (
    "adminEmail" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("adminEmail")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_adminEmail_key" ON "Admin"("adminEmail");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_adminEmail_fkey" FOREIGN KEY ("adminEmail") REFERENCES "Admin"("adminEmail") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
