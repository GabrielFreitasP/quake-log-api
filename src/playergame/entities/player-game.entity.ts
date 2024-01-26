import { Game } from '../../game/entities/game.entity';
import { Player } from '../../player/entities/player.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('players_games')
export class PlayerGame {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Player, (player) => player.playerGames)
  @JoinColumn({ name: 'player_id' })
  player: Player;

  @ManyToOne(() => Game, (game) => game.playerGames)
  @JoinColumn({ name: 'game_id' })
  game: Game;

  @Column({ default: 0 })
  score: number;
}
