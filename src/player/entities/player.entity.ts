import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Game } from '../../game/entities/game.entity';

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'name' })
  name: string;

  @ManyToOne(() => Game, (game) => game.players)
  @JoinColumn({ name: 'game_id' })
  game: Game;
}
