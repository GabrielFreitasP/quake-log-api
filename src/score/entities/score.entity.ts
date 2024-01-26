import { Game } from '../../game/entities/game.entity';
import { Player } from '../../player/entities/player.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('scores')
export class Score {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Player, (player) => player.scores)
  @JoinColumn({ name: 'player_id' })
  player: Player;

  @ManyToOne(() => Game, (game) => game.scores)
  @JoinColumn({ name: 'game_id' })
  game: Game;

  @Column({ default: 0 })
  score: number;
}
