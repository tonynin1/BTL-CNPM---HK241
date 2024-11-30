import { Test, TestingModule } from '@nestjs/testing';
import { PaymentOnsiteService } from './on-site.service';

describe('PaymentCustomerService', () => {
  let service: PaymentOnsiteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentOnsiteService],
    }).compile();

    service = module.get<PaymentOnsiteService>(PaymentOnsiteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
