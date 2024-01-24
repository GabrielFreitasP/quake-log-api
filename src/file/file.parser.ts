import { LogTagEnum } from './enums/log-tag.enum';
import { Game } from '../game/entities/game.entity';
import { File } from './entities/file.entity';
import { Player } from '../player/entities/player.entity';
import { MeansOfDeath } from '../meansofdeath/entities/means-of-death.entity';
import { Kill } from '../kill/entities/kill.entity';

export class FileParser {
  private currentGame: Game;

  constructor(
    private readonly file: File,
    private readonly meansOfDeath: MeansOfDeath[],
    private readonly lines: string[],
  ) {}

  getFile() {
    return this.file;
  }

  populateFileGames() {
    this.file.games = [];

    this.lines.forEach((line) => {
      if (line.includes(LogTagEnum.INIT_GAME + ':')) {
        this.startGame();
      } else if (line.includes(LogTagEnum.CLIENT_USER_INFO_CHANGED + ':')) {
        this.populateGamePlayers(line);
      } else if (line.includes(LogTagEnum.KILL + ':')) {
        this.populateGameKillFeed(line);
      }
    });
  }

  private startGame() {
    this.currentGame = new Game();
    this.currentGame.file = this.file;
    this.currentGame.name = Game.generateNameByFile(this.file);
    this.currentGame.players = [];
    this.currentGame.killFeed = [];

    this.file.games.push(this.currentGame);
  }

  private populateGamePlayers(line: string) {
    if (!this.currentGame) return;

    const playerName = FileParser.getPlayerNameOnGame(line);
    if (!playerName || this.findPlayerByName(playerName)) return;

    const newPlayer = new Player();
    newPlayer.name = playerName;

    this.currentGame.players.push(newPlayer);
  }

  private populateGameKillFeed(line: string) {
    if (!this.currentGame) return;

    const { killerName, victimName, meansOfDeathTag } =
      FileParser.getKillFeedData(line);

    if (!killerName || !victimName || !meansOfDeathTag) return;

    const killer = new Player();
    killer.name = killerName;

    const victim = new Player();
    victim.name = victimName;

    const mensOfDeath = this.getMeansOfDeathByTag(meansOfDeathTag);
    console.log(`mensOfDeath: ${mensOfDeath}`);
    if (!mensOfDeath) return;

    const newKill = new Kill();
    newKill.game = this.currentGame;
    newKill.killer = killer;
    newKill.victim = victim;
    newKill.meansOfDeath = mensOfDeath;

    this.currentGame.killFeed.push(newKill);
  }

  private getMeansOfDeathByTag(tag: string): MeansOfDeath {
    return this.meansOfDeath.find((meansOfDeath) => meansOfDeath.tag === tag);
  }

  private findPlayerByName(playerName: string) {
    return this.currentGame.players.some(
      (player) => player.name === playerName,
    );
  }

  private static getPlayerNameOnGame(line: string) {
    const regexPattern = new RegExp(
      `(\\d+:\\d+) ${LogTagEnum.CLIENT_USER_INFO_CHANGED}: (\\d+) n\\\\([^\\\\]+)\\\\t`,
    );
    const matchResult = line.match(regexPattern);

    if (matchResult !== null) {
      const [, , , playerName] = matchResult;
      return playerName;
    }

    return null;
  }

  private static getKillFeedData(line: string) {
    const regexPattern = new RegExp(
      `(\\d+:\\d+) ${LogTagEnum.KILL}: (\\d+) (\\d+) (\\d+): (.+) ${LogTagEnum.KILLED} (.+) ${LogTagEnum.BY} (.+)`,
    );
    const matchResult = line.match(regexPattern);

    if (matchResult !== null) {
      const [, , , , , killerName, victimName, meansOfDeathTag] = matchResult;
      return { killerName, victimName, meansOfDeathTag };
    }

    return null;
  }
}
