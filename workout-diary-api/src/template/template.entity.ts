import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from '../core/entitys/base.entity';
import { User } from '../user/user.entity';
import { TemplateExercise } from './template-exercise.entity';

@Entity()
export class Template extends BaseEntity {

  @Column({ type: String })
  name: string;

  @ManyToOne(type => User, user => user.templates)
  user: User;

  @OneToMany(type => TemplateExercise, templateExercise => templateExercise.templates)
  templateExercise: TemplateExercise[];

}
