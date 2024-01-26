import { Game } from '../entities/game.entity';
import { File } from '../../file/entities/file.entity';

export const BuildGame = (fileEntity: File) => {
  const game = new Game();
  game.file = fileEntity;
  game.scores = [];
  game.kills = [];
  return game;
};
