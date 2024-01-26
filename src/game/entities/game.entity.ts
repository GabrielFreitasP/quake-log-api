import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { File } from '../../file/entities/file.entity';
import { Player } from '../../player/entities/player.entity';
import { Kill } from '../../kill/entities/kill.entity';
import { PlayerGame } from '../../playergame/entities/player-game.entity';

@Entity('games')
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => File, (file) => file.games)
  @JoinColumn()
  file: File;

  @Column()
  name: string;

  @Column({ type: 'int', default: 0 })
  totalKills: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Kill, (kill) => kill.game, { cascade: true })
  killFeed: Kill[];

  @OneToMany(() => PlayerGame, (playerGame) => playerGame.game, {
    cascade: true,
  })
  playerGames: PlayerGame[];

  players: Player[];

  @BeforeInsert()
  setTotalKill() {
    if (!this.killFeed) return 0;
    this.totalKills = this.killFeed.length;
  }

  static generateNameByNumber(number: number): string {
    return `Game ${number}`;
  }
}
