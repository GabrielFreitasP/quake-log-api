import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = module.get<AppService>(AppService);
  });

  describe('getApiStatus', () => {
    it('should return the API status', () => {
      const apiStatus = appService.getApiStatus();

      expect(apiStatus).toEqual({ status: 'OK' });
    });
  });
});
