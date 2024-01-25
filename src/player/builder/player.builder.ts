import { Game } from '../../game/entities/game.entity';
import { Player } from '../entities/player.entity';

export class PlayerBuilder {
  static buildPlayer(game: Game, name: string) {
    const player = new Player();
    player.games = [game];
    player.name = name;
    return player;
  }
}
