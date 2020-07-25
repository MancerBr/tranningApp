import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from '../core/entitys/base.entity';
import { Training } from '../training/training.entity';
import { ExerciseProcess } from './exercise-process/exercise-process.entity';

@Entity()
export class Exercise extends BaseEntity {

  @Column({ type: String })
  name: string;

  @Column({ type: String })
  state: string;

  @Column('timestamptz', { nullable: true })
  startData: Date;

  @Column('timestamptz', { nullable: true })
  endData: Date;

  @ManyToOne(type => Training, training => training.exercises)
  training: Training;

  @OneToMany(type => ExerciseProcess, exerciseProcess => exerciseProcess.exercise)
  exerciseProcess: ExerciseProcess[];

}
