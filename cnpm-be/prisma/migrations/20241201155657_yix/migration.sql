-- CreateTable
CREATE TABLE "Admin" (
    "adminEmail" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("adminEmail")
);

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "fname" TEXT NOT NULL,
    "lname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "usageHistory" TEXT,
    "hash" TEXT NOT NULL,
    "hashedRt" TEXT,
    "role" TEXT NOT NULL,
    "adminEmail" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "SPSOMember" (
    "sosoMemberId" SERIAL NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "address" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "SPSOMember_pkey" PRIMARY KEY ("sosoMemberId")
);

-- CreateTable
CREATE TABLE "Customer" (
    "customerId" SERIAL NOT NULL,
    "ppHistory" TEXT,
    "accBalance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "summary" TEXT,
    "remainPages" INTEGER NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,
    "sPSOMemberSosoMemberId" INTEGER,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("customerId")
);

-- CreateTable
CREATE TABLE "Printer" (
    "printerId" SERIAL NOT NULL,
    "spsomemberId" INTEGER NOT NULL,

    CONSTRAINT "Printer_pkey" PRIMARY KEY ("printerId")
);

-- CreateTable
CREATE TABLE "Document" (
    "documentId" SERIAL NOT NULL,
    "printerId" INTEGER NOT NULL,
    "fileUrl" TEXT NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("documentId")
);

-- CreateTable
CREATE TABLE "PrintOrder" (
    "printOrderId" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "printerId" INTEGER NOT NULL,
    "docQuantity" INTEGER NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "PrintOrder_pkey" PRIMARY KEY ("printOrderId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_adminEmail_key" ON "Admin"("adminEmail");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_adminEmail_fkey" FOREIGN KEY ("adminEmail") REFERENCES "Admin"("adminEmail") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SPSOMember" ADD CONSTRAINT "SPSOMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_sPSOMemberSosoMemberId_fkey" FOREIGN KEY ("sPSOMemberSosoMemberId") REFERENCES "SPSOMember"("sosoMemberId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Printer" ADD CONSTRAINT "Printer_spsomemberId_fkey" FOREIGN KEY ("spsomemberId") REFERENCES "SPSOMember"("sosoMemberId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_printerId_fkey" FOREIGN KEY ("printerId") REFERENCES "Printer"("printerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrintOrder" ADD CONSTRAINT "PrintOrder_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrintOrder" ADD CONSTRAINT "PrintOrder_printerId_fkey" FOREIGN KEY ("printerId") REFERENCES "Printer"("printerId") ON DELETE RESTRICT ON UPDATE CASCADE;
