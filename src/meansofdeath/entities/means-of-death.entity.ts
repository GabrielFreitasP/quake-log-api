import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Kill } from '../../kill/entities/kill.entity';

@Entity('means_of_death')
export class MeansOfDeath {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  tag: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Kill, (kill) => kill.meansOfDeath)
  killFeed: Kill[];
}
