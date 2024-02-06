import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  describe('getApiStatus', () => {
    it('should return the API status', () => {
      const apiStatus = { status: 'OK' };

      jest.spyOn(appService, 'getApiStatus').mockReturnValue(apiStatus);

      expect(appController.getApiStatus()).toEqual(apiStatus);
    });
  });
});
