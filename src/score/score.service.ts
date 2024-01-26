import { Injectable } from '@nestjs/common';
import { Game } from '../game/entities/game.entity';
import { Kill } from '../kill/entities/kill.entity';
import { Player } from '../player/entities/player.entity';
import { BuildScore } from './builder/score.builder';
import { Score } from './entities/score.entity';

@Injectable()
export class ScoreService {
  constructor() {}

  setScoreByKill(game: Game, { killer, victim }: Kill) {
    if (!game.scores) game.scores = [];

    let score: Score;
    if (killer.isWorld) {
      score = this.findScoreOnGame(game, victim);
      if (!score) {
        score = BuildScore(game, victim, 0);
        game.scores.push(score);
        return;
      }

      if (score.score > 0) {
        score.score--;
        return;
      }

      return;
    }

    score = this.findScoreOnGame(game, killer);
    if (!score) {
      score = BuildScore(game, killer, 1);
      game.scores.push(score);
      return;
    }

    score.score++;
  }

  private findScoreOnGame(game: Game, { id }: Player) {
    return game.scores.find(({ player }) => player.id == id);
  }
}
