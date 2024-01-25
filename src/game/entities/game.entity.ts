import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => File, (file) => file.games)
  @JoinColumn()
  file: File;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToMany(() => Player, (player) => player.games)
  @JoinTable({
    name: 'games_players',
    joinColumn: { name: 'game_id' },
    inverseJoinColumn: { name: 'player_id' },
  })
  players: Player[];

  @OneToMany(() => Kill, (kill) => kill.game, { cascade: true })
  killFeed: Kill[];

  static generateNameByNumber(number: number): string {
    return `Game ${number}`;
  }
}
