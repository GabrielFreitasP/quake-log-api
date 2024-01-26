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

  @Column({ name: 'mime_type' })
  mimetype: string;

  @Column({ type: 'int' })
  size: number;

  @Column()
  destination: string;

  @Column({ name: 'file_name' })
  filename: string;

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

  fromMulterFile(
    file: Express.Multer.File,
    status: FileStatusEnum = FileStatusEnum.CREATED,
  ) {
    const fileEntity = new File();
    fileEntity.status = status;
    fileEntity.fieldName = file.fieldname;
    fileEntity.originalName = file.originalname;
    fileEntity.mimetype = file.mimetype;
    fileEntity.size = file.size;
    fileEntity.destination = file.destination;
    fileEntity.filename = file.filename;
    fileEntity.path = file.path;
    return fileEntity;
  }
}
