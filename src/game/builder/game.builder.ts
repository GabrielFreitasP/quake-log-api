import { Game } from '../entities/game.entity';
import { File } from '../../file/entities/file.entity';

export class GameBuilder {
  static buildGame(fileEntity: File, gameNumber: number) {
    const game = new Game();
    game.file = fileEntity;
    game.name = Game.generateNameByNumber(gameNumber);
    game.players = [];
    game.killFeed = [];
    return game;
  }
}
