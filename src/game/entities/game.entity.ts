import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { File } from '../../file/entities/file.entity';
import { Player } from '../../player/entities/player.entity';
import { Kill } from '../../kill/entities/kill.entity';

@Entity('games')
export class Game {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @ManyToOne(() => File, (file) => file.games)
  @JoinColumn({ name: 'file_id' })
  file: File;

  @Column({ name: 'name' })
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @ManyToMany(() => Player, (player) => player.games)
  players: Player[];

  @OneToMany(() => Kill, (kill) => kill.game)
  killFeed: Kill[];

  static generateNameByFile(file: File): string {
    return `Game ${file.games.length + 1}`;
  }
}
