export class CreatePaymentDto {
  orderId: string;
  amount: number;
  method: string;  // 'credit_card', 'cash', 'online'
}
