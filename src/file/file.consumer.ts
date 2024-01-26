import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { File } from './entities/file.entity';
import { FileService } from './file.service';
import { LoggerService } from '../commons/logger/logger.service';

import configuration from '../commons/config/configuration';

@Processor(configuration().files.queueName)
export class FileConsumer {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly filesService: FileService,
  ) {}

  @Process(configuration().files.jobName)
  async processFiles(job: Job<File>) {
    const { data } = job;

    this.loggerService.debug(`Starting processing file: ${data.id}`);

    try {
      await this.filesService.processFile(data);
      this.loggerService.debug(`File processed successfully: ${data.id}`);
    } catch (error) {
      this.loggerService.error(
        `Error processing file (${data.id}): ${error.message}`,
      );

      throw error;
    }
  }
}
