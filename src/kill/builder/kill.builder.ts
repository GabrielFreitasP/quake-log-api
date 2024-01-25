import { Kill } from '../entities/kill.entity';
import { Game } from '../../game/entities/game.entity';
import { Player } from '../../player/entities/player.entity';
import { MeansOfDeath } from '../../meansofdeath/entities/means-of-death.entity';

export class KillBuilder {
  static buildKill(
    game: Game,
    killer: Player,
    victim: Player,
    meansOfDeath: MeansOfDeath,
  ) {
    const createdAt = new Date();
    const updatedAt = createdAt;

    const kill = new Kill();
    kill.game = game;
    kill.killer = killer;
    kill.victim = victim;
    kill.meansOfDeath = meansOfDeath;
    kill.createdAt = createdAt;
    kill.updatedAt = updatedAt;

    return kill;
  }
}
