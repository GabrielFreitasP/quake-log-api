import * as AWS from 'aws-sdk';
import { ConfigurationService } from '../config/configuration.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class S3Service {
  private readonly s3: AWS.S3;

  constructor(configurationService: ConfigurationService) {
    this.s3 = new AWS.S3({
      accessKeyId: configurationService.s3AccessKeyId,
      secretAccessKey: configurationService.s3SecretAccessKey,
      endpoint: `${configurationService.s3Host}:${configurationService.s3Port}`,
      s3ForcePathStyle: configurationService.s3ForcePathStyle,
      signatureVersion: configurationService.s3SignatureVersion,
    });
  }

  get(): AWS.S3 {
    return this.s3;
  }
}
