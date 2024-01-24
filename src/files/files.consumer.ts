import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { FileEntity } from './entities/file.entity';
import { FilesService } from './files.service';

import configuration from '../commons/config/configuration';

@Processor(configuration().files.queueName)
export class FilesConsumer {
  constructor(private readonly filesService: FilesService) {}

  @Process(configuration().files.jobName)
  async processFiles(job: Job<FileEntity>) {
    const { data } = job;
    await this.filesService.processFile(data);
  }
}
