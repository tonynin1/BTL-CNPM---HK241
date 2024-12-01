import { Test, TestingModule } from '@nestjs/testing';
import { OnSiteAccountService } from './on-site.service';

describe('OnSiteService', () => {
  let service: OnSiteAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OnSiteAccountService],
    }).compile();

    service = module.get<OnSiteAccountService>(OnSiteAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
