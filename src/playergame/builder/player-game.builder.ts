import { Game } from '../../game/entities/game.entity';
import { Player } from '../../player/entities/player.entity';
import { PlayerGame } from '../entities/player-game.entity';

export class PlayerGameBuilder {
  static buildPlayerGame(game: Game, player: Player, score: number) {
    const playerGame = new PlayerGame();
    playerGame.player = player;
    playerGame.game = game;
    playerGame.score = score;
    return playerGame;
  }
}
