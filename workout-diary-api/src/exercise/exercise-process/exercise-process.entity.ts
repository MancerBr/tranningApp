import { Entity, Column, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../core/entitys/base.entity';
import { Exercise } from '../exercise.entity';

@Entity()
export class ExerciseProcess extends BaseEntity {

  @Column({ type: Number })
  step: number;

  @Column({ type: Number })
  weight: number;

  @Column({ type: Number })
  count: number;

  @Column('timestamptz', { nullable: true })
  startData: Date;

  @Column('timestamptz', { nullable: true })
  endData: Date;

  @ManyToOne(type => Exercise, exercise => exercise.exerciseProcess)
  exercise: Exercise;

}
