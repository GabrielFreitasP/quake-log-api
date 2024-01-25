import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Game } from '../../game/entities/game.entity';
import { Player } from '../../player/entities/player.entity';
import { MeansOfDeath } from '../../meansofdeath/entities/means-of-death.entity';

@Entity('kills')
export class Kill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Game, (game) => game.players)
  @JoinColumn()
  game: Game;

  @ManyToOne(() => Player, (player) => player.kills)
  @JoinColumn()
  killer: Player;

  @ManyToOne(() => Player, (player) => player.deaths)
  @JoinColumn()
  victim: Player;

  @ManyToOne(() => MeansOfDeath, (meansOfDeath) => meansOfDeath.killFeed)
  @JoinColumn()
  meansOfDeath: MeansOfDeath;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
