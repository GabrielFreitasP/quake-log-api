import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { File } from './entities/file.entity';
import { FileService } from './file.service';

import configuration from '../commons/config/configuration';

@Processor(configuration().files.queueName)
export class FileConsumer {
  constructor(private readonly filesService: FileService) {}

  @Process(configuration().files.jobName)
  async processFiles(job: Job<File>) {
    const { data } = job;
    await this.filesService.processFile(data);
  }
}
