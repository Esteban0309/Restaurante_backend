export class CreateOrderDto {
  customerName: string;
  items: { name: string; quantity: number; price: number }[];  // Ahora `name` está directamente incluido
  totalAmount: number;
}
