import { GameByFileDto } from '../../game/dto/game-by-file.dto';

export interface FindGamesDto {
  [gameName: string]: GameByFileDto;
}
