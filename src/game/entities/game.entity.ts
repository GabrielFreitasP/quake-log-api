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
import { Score } from '../../score/entities/score.entity';
import { BuildScore } from '../../score/builder/score.builder';
import { IsUUID } from 'class-validator';

@Entity('games')
export class Game {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @ManyToOne(() => File, (file) => file.games)
  @JoinColumn()
  file: File;

  @Column({ type: 'int', default: 0 })
  totalKills: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Kill, (kill) => kill.game, { cascade: true })
  kills: Kill[];

  @OneToMany(() => Score, (scores) => scores.game, {
    cascade: true,
  })
  scores: Score[];

  get players() {
    return this.scores?.map((score) => score.player);
  }

  addPlayer(player: Player) {
    if (!this.scores) this.scores = [];
    this.scores.push(BuildScore(this, player, 0));
  }

  @BeforeInsert()
  setTotalKill() {
    if (!this.kills) return 0;
    this.totalKills = this.kills.length;
  }

  static buildNameByIndex(index: number) {
    return `game${index + 1}`;
  }
}
