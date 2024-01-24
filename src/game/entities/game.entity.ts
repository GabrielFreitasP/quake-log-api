import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { File } from '../../file/entities/file.entity';
import { Player } from '../../player/entities/player.entity';

@Entity('games')
export class Game {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'name' })
  name: string;

  @ManyToOne(() => File, (file) => file.games)
  @JoinColumn({ name: 'file_id' })
  file: File;

  @OneToMany(() => Player, (player) => player.game)
  players: Player[];
}
