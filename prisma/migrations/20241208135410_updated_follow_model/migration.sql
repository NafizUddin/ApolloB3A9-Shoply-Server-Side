/*
  Warnings:

  - A unique constraint covering the columns `[customerId,vendorId]` on the table `followers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "followers_customerId_vendorId_key" ON "followers"("customerId", "vendorId");
