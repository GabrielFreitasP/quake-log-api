import { Game } from '../entities/game.entity';
import { KillsByPlayersDto } from '../dto/kills-by-players.dto';

export const GameEntityToKillsByPlayersDto = ({ totalKills, scores }: Game) => {
  const killsByPlayers = new KillsByPlayersDto();
  killsByPlayers.totalKills = totalKills;
  killsByPlayers.players = scores.map(({ player }) => player.name);
  killsByPlayers.kills = {};
  scores.forEach(({ player, score }) => {
    killsByPlayers.kills[player.name] = score;
  });
  return killsByPlayers;
};
