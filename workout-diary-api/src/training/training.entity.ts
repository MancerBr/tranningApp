import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from '../core/entitys/base.entity';
import { User } from '../user/user.entity';
import { Exercise } from '../exercise/exercise.entity';

@Entity()
export class Training extends BaseEntity {

  @Column({ type: String })
  name: string;

  @Column({ type: String })
  state: string;

  @Column('timestamptz', { nullable: true })
  startData: Date;

  @Column('timestamptz', { nullable: true })
  endData: Date;

  @ManyToOne(type => User, user => user.trainings)
  user: User;

  @OneToMany(type => Exercise, exercise => exercise.training)
  exercises: Exercise[];
}
