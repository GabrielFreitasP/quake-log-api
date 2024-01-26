import { PlayerKillsDto } from '../../kill/dto/player-kills.dto';

export class GameByFileDto {
  totalKills: number;
  players: string[];
  kills: PlayerKillsDto;
}
