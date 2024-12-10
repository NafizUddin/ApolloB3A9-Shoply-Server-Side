/*
  Warnings:

  - You are about to drop the column `createdAt` on the `coupons` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `coupons` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "coupons" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ALTER COLUMN "startDate" SET DEFAULT CURRENT_TIMESTAMP;
