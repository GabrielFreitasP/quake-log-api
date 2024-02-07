import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from './file.service';
import { File } from './entities/file.entity';
import { LoggerService } from '../commons/logger/logger.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { FileStatusEnum } from './enums/file-status.enum';
import { KillService } from '../kill/kill.service';
import { MeansOfDeathService } from '../meansofdeath/means-of-death.service';
import { PlayerService } from '../player/player.service';
import { ScoreService } from '../score/score.service';
import { getQueueToken } from '@nestjs/bull';
import { ConfigurationService } from '../commons/config/configuration.service';
import { NotFoundException } from '@nestjs/common';

describe('FileService', () => {
  let fileService: FileService;
  let fileRepository: Repository<File>;

  const mockFile: File = {
    id: faker.string.uuid(),
    status: FileStatusEnum.DONE,
    fieldName: faker.system.fileName(),
    originalName: faker.system.fileName(),
    mimetype: faker.system.mimeType(),
    size: 100,
    destination: faker.system.filePath(),
    filename: faker.system.fileName(),
    path: faker.system.filePath(),
    createdAt: faker.date.soon(),
    updatedAt: faker.date.soon(),
    deletedAt: faker.date.soon(),
    games: [],
    fromMulterFile: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FileService,
        {
          provide: getRepositoryToken(File),
          useClass: Repository,
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: getQueueToken('file-queue'),
          useValue: {},
        },
        {
          provide: LoggerService,
          useValue: {},
        },
        {
          provide: ConfigurationService,
          useValue: {},
        },
        {
          provide: KillService,
          useValue: {},
        },
        {
          provide: MeansOfDeathService,
          useValue: {},
        },
        {
          provide: PlayerService,
          useValue: {},
        },
        {
          provide: ScoreService,
          useValue: {},
        },
      ],
    }).compile();

    fileService = module.get<FileService>(FileService);
    fileRepository = module.get<Repository<File>>(getRepositoryToken(File));
  });

  describe('findAll', () => {
    it('should find all files successfully end return empty array', async () => {
      jest.spyOn(fileRepository, 'find').mockResolvedValueOnce([]);

      const result = await fileService.findAll();
      expect(result.length).toBe(0);
      expect(result).toEqual([]);
      expect(fileRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should find all files successfully end return files array', async () => {
      jest.spyOn(fileRepository, 'find').mockResolvedValueOnce([mockFile]);

      const result = await fileService.findAll();
      expect(result.length).toBe(1);
      expect(result[0]).toEqual(mockFile);
      expect(fileRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw Exception when find fails', async () => {
      const mockError = new Error('Any error');

      jest.spyOn(fileRepository, 'find').mockRejectedValueOnce(mockError);

      const promise = fileService.findAll();
      await expect(promise).rejects.toThrow(mockError);
      expect(fileRepository.find).toHaveBeenCalledTimes(1);
    });
  });
});
