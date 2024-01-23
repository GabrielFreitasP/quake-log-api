import { Column, Entity, PrimaryColumn } from 'typeorm';
import { FileStatusEnum } from '../enums/file-status.enum';

@Entity('file')
export class FileEntity {
  @PrimaryColumn({ generated: 'uuid' })
  id: string;

  @Column()
  status: FileStatusEnum;

  @Column()
  fieldName: string;

  @Column()
  originalName: string;

  @Column()
  mimeType: string;

  @Column()
  size: number;

  @Column()
  destination: string;

  @Column()
  fileName: string;

  @Column()
  path: string;
}
