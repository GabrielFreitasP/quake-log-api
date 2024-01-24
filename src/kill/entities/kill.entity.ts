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
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @ManyToOne(() => Game, (game) => game.players)
  @JoinColumn({ name: 'game_id' })
  game: Game;

  @ManyToOne(() => Player, (player) => player.kills)
  @JoinColumn({ name: 'killer_id' })
  killer: Player;

  @ManyToOne(() => Player, (player) => player.deaths)
  @JoinColumn({ name: 'victim_id' })
  victim: Player;

  @ManyToOne(() => MeansOfDeath, (meansOfDeath) => meansOfDeath.killFeed)
  @JoinColumn({ name: 'means_of_death_id' })
  meansOfDeath: MeansOfDeath;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
