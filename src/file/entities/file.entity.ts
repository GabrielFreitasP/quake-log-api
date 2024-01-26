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
import { IsUUID } from 'class-validator';

@Entity('files')
export class File {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column()
  status: FileStatusEnum;

  @Column()
  fieldName: string;

  @Column()
  originalName: string;

  @Column()
  mimeType: string;

  @Column({ type: 'int' })
  size: number;

  @Column()
  destination: string;

  @Column()
  fileName: string;

  @Column()
  path: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Game, (game) => game.file, { cascade: true })
  games: Game[];
}
