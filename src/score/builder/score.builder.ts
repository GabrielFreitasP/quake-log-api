import { Game } from '../../game/entities/game.entity';
import { Player } from '../../player/entities/player.entity';
import { Score } from '../entities/score.entity';

export const BuildScore = (game: Game, player: Player, score: number) => {
  const scoreEntity = new Score();
  scoreEntity.player = player;
  scoreEntity.game = game;
  scoreEntity.score = score;
  return scoreEntity;
};
