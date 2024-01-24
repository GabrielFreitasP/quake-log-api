import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Game } from '../../game/entities/game.entity';
import { Kill } from '../../kill/entities/kill.entity';

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'name' })
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @ManyToMany(() => Game, (game) => game.players)
  games: Game[];

  @OneToMany(() => Kill, (kill) => kill.killer)
  kills: Kill[];

  @OneToMany(() => Kill, (kill) => kill.victim)
  deaths: Kill[];
}
