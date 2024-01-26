import { FileStatusEnum } from '../enums/file-status.enum';
import { File } from '../entities/file.entity';

export class FileResponseDto {
  constructor(partial?: Partial<FileResponseDto>) {
    if (partial) Object.assign(this, partial);
  }

  id: string;

  status: FileStatusEnum;

  createdAt: Date;

  fromEntity({ id, status, createdAt }: File) {
    return new FileResponseDto({ id, status, createdAt });
  }
}
