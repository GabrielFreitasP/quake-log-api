import { Injectable } from '@nestjs/common';
import { Game } from '../game/entities/game.entity';
import { Kill } from '../kill/entities/kill.entity';
import { Player } from '../player/entities/player.entity';
import { PlayerGameBuilder } from './builder/player-game.builder';
import { PlayerGame } from './entities/player-game.entity';

@Injectable()
export class PlayerGameService {
  constructor() {}

  setScoreByKill(game: Game, { killer, victim }: Kill) {
    if (!game.playerGames || game.playerGames.length === 0) {
      game.playerGames = [];
    }

    let playerGame: PlayerGame;
    if (killer.isWorld) {
      playerGame = this.findPlayerGame(game, victim);
      if (playerGame && playerGame.score > 0) {
        playerGame.score--;
        return;
      }

      playerGame = PlayerGameBuilder.buildPlayerGame(game, victim, 0);
      game.playerGames.push(playerGame);
      return;
    }

    playerGame = this.findPlayerGame(game, killer);
    if (playerGame) {
      playerGame.score++;
      return;
    }

    playerGame = PlayerGameBuilder.buildPlayerGame(game, killer, 1);
    game.playerGames.push(playerGame);
  }

  findPlayerGame(game: Game, { id }: Player) {
    return game.playerGames.find(({ player }) => player.id == id);
  }
}
