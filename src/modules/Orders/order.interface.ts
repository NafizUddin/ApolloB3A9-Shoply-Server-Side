export type TOrder = {
  customerId: string;
  vendorId: string;
  transactionId: string;
  totalPrice: number;
  coupon: string;
  paymentStatus: 'PAID' | 'UNPAID';
  orderDetails: {
    productId: string;
    quantity: number;
    pricePerUnit: number;
  }[];
};
