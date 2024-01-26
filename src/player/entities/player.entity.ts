import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Kill } from '../../kill/entities/kill.entity';
import { Score } from '../../score/entities/score.entity';

const WORLD_PLAYER_NAME = '<world>';

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Kill, (kill) => kill.killer)
  kills: Kill[];

  @OneToMany(() => Kill, (kill) => kill.victim)
  deaths: Kill[];

  @OneToMany(() => Score, (score) => score.player)
  scores: Score[];

  get isWorld() {
    return this.name === WORLD_PLAYER_NAME;
  }
}
