import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FileStatusEnum } from '../enums/file-status.enum';
import { Game } from '../../game/entities/game.entity';

@Entity('files')
export class File {
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

  @OneToMany(() => Game, (game) => game.file)
  games: Game[];
}
