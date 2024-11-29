/*
  Warnings:

  - Added the required column `adminEmail` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "adminEmail" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Admin" (
    "adminEmail" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_adminEmail_key" ON "Admin"("adminEmail");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_adminEmail_fkey" FOREIGN KEY ("adminEmail") REFERENCES "Admin"("adminEmail") ON DELETE RESTRICT ON UPDATE CASCADE;
