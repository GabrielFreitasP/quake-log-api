import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FileStatusEnum } from '../enums/file-status.enum';

@Entity('files')
export class FileEntity {
  @PrimaryGeneratedColumn('uuid', { name: '' })
  id: string;

  @Column({ name: 'status' })
  status: FileStatusEnum;

  @Column({ name: 'field_name' })
  fieldName: string;

  @Column({ name: 'original_name' })
  originalName: string;

  @Column({ name: 'mime_type' })
  mimeType: string;

  @Column({ name: 'size' })
  size: number;

  @Column({ name: 'destination' })
  destination: string;

  @Column({ name: 'file_name' })
  fileName: string;

  @Column({ name: 'path' })
  path: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
