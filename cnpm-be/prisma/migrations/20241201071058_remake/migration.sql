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
    "spsoMemberId" INTEGER,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("customerId")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "feedbackId" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "feedTime" TIMESTAMP(3) NOT NULL,
    "rating" INTEGER NOT NULL,
    "contentByCustomer" TEXT NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("feedbackId")
);

-- CreateTable
CREATE TABLE "Printer" (
    "printerId" SERIAL NOT NULL,
    "model" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "description" TEXT,
    "facility" TEXT NOT NULL,
    "building" TEXT NOT NULL,
    "room" TEXT NOT NULL,
    "spsomemberId" INTEGER NOT NULL,

    CONSTRAINT "Printer_pkey" PRIMARY KEY ("printerId")
);

-- CreateTable
CREATE TABLE "PagePurchaseOrder" (
    "ppoId" SERIAL NOT NULL,
    "purchaseTime" TIMESTAMP(3) NOT NULL,
    "customerId" INTEGER NOT NULL,
    "ppoStatus" TEXT NOT NULL DEFAULT 'Pending',
    "pageNum" INTEGER NOT NULL DEFAULT 0,
    "price" DOUBLE PRECISION NOT NULL,
    "paymentMethod" TEXT NOT NULL,

    CONSTRAINT "PagePurchaseOrder_pkey" PRIMARY KEY ("ppoId")
);

-- CreateTable
CREATE TABLE "PrintOrder" (
    "printOrderId" SERIAL NOT NULL,
    "attributes" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "poStatus" TEXT NOT NULL DEFAULT 'Pending',
    "numCopies" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,
    "docId" INTEGER NOT NULL,

    CONSTRAINT "PrintOrder_pkey" PRIMARY KEY ("printOrderId")
);

-- CreateTable
CREATE TABLE "Document" (
    "documentId" SERIAL NOT NULL,
    "docName" TEXT NOT NULL,
    "customerId" INTEGER NOT NULL,
    "printerId" INTEGER NOT NULL,
    "docQuantity" INTEGER NOT NULL,
    "docLink" TEXT,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("documentId")
);

-- CreateTable
CREATE TABLE "Contains" (
    "id" SERIAL NOT NULL,
    "documentId" INTEGER NOT NULL,
    "printOrderId" INTEGER NOT NULL,

    CONSTRAINT "Contains_pkey" PRIMARY KEY ("id")
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
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_spsoMemberId_fkey" FOREIGN KEY ("spsoMemberId") REFERENCES "SPSOMember"("sosoMemberId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Printer" ADD CONSTRAINT "Printer_spsomemberId_fkey" FOREIGN KEY ("spsomemberId") REFERENCES "SPSOMember"("sosoMemberId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PagePurchaseOrder" ADD CONSTRAINT "PagePurchaseOrder_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrintOrder" ADD CONSTRAINT "PrintOrder_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrintOrder" ADD CONSTRAINT "PrintOrder_docId_fkey" FOREIGN KEY ("docId") REFERENCES "Document"("documentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_printerId_fkey" FOREIGN KEY ("printerId") REFERENCES "Printer"("printerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contains" ADD CONSTRAINT "Contains_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("documentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contains" ADD CONSTRAINT "Contains_printOrderId_fkey" FOREIGN KEY ("printOrderId") REFERENCES "PrintOrder"("printOrderId") ON DELETE RESTRICT ON UPDATE CASCADE;
