import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { SuccessResponseDto } from 'src/common/dto/response.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  async create(@Body() dto: CreatePaymentDto) {
    const payment = await this.paymentsService.create(dto);
    return new SuccessResponseDto('Payment created successfully', payment);
  }

  @Get()
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    const result = await this.paymentsService.findAll({ page, limit });
    return new SuccessResponseDto('Payments retrieved successfully', result);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const payment = await this.paymentsService.findOne(id);
    return new SuccessResponseDto('Payment retrieved successfully', payment);
  }
}
