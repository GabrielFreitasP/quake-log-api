export class KillsByPlayersDto {
  totalKills: number;
  players: string[];
  kills: Record<string, number>;
}
