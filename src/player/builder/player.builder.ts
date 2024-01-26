import { Player } from '../entities/player.entity';

export const BuildPlayer = (name: string) => {
  const player = new Player();
  player.name = name;
  return player;
};
