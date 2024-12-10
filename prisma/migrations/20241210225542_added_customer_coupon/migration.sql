-- CreateTable
CREATE TABLE "customer_coupons" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "couponId" TEXT NOT NULL,
    "redeemedAt" TIMESTAMP(3),
    "isRedeemed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "customer_coupons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customer_coupons_customerId_couponId_key" ON "customer_coupons"("customerId", "couponId");

-- AddForeignKey
ALTER TABLE "customer_coupons" ADD CONSTRAINT "customer_coupons_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_coupons" ADD CONSTRAINT "customer_coupons_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "coupons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
