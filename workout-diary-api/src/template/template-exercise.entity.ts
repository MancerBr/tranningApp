import { Entity, Column, ManyToOne } from 'typeorm';

import { BaseEntity } from '../core/entitys/base.entity';
import { Template } from './template.entity';

@Entity()
export class TemplateExercise extends BaseEntity {

  @Column({ type: String })
  name: string;

  @Column({ type: Number })
  steps: number;

  @ManyToOne(type => Template, template => template.templateExercise)
  templates: Template;

}
