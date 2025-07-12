import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { SuccessResponseDto } from 'src/common/dto/response.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() dto: CreateOrderDto) {
    const order = await this.ordersService.create(dto);
    if (!order) {
      return { message: 'Failed to create order' };  // Devuelve mensaje en caso de fallo
    }
    return new SuccessResponseDto('Order created successfully', order);
  }

  @Get()
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    const result = await this.ordersService.findAll({ page, limit });
    if (!result) {
      return { message: 'Could not retrieve orders' };  // Devuelve mensaje si no se encuentran pedidos
    }
    return new SuccessResponseDto('Orders retrieved successfully', result);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const order = await this.ordersService.findOne(id);
    if (!order) {
      return { message: 'Order not found' };  // Devuelve mensaje si no se encuentra el pedido
    }
    return new SuccessResponseDto('Order retrieved successfully', order);
  }
}
