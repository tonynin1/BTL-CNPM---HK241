import { Test, TestingModule } from '@nestjs/testing';
import { PaymentOrderService } from './order.service';

describe('PaymentOrderService', () => {
  let service: PaymentOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentOrderService],
    }).compile();

    service = module.get<PaymentOrderService>(PaymentOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
