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
import { IsUUID } from 'class-validator';

@Entity('kills')
export class Kill {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @ManyToOne(() => Game, (game) => game.kills)
  @JoinColumn()
  game: Game;

  @ManyToOne(() => Player, (player) => player.kills, { eager: true })
  @JoinColumn()
  killer: Player;

  @ManyToOne(() => Player, (player) => player.deaths, { eager: true })
  @JoinColumn()
  victim: Player;

  @ManyToOne(() => MeansOfDeath, (meansOfDeath) => meansOfDeath.kills)
  @JoinColumn()
  meansOfDeath: MeansOfDeath;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  toText() {
    return this.killer.isWorld
      ? `The player "${this.victim.name}" died because ${this.meansOfDeath.description}.`
      : `The player "${this.killer.name}" killed the player "${this.victim.name}" using ${this.meansOfDeath.description}.`;
  }
}
