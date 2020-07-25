import { Entity, Column, OneToMany, Index } from 'typeorm';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { BaseEntity } from '../core/entitys/base.entity';
import { Training } from '../training/training.entity';
import { Template } from '../template/template.entity';

@Entity()
export class User extends BaseEntity {

  @Column({ type: 'varchar', length: 500 })
  name!: string;

  @Column({ type: 'varchar', length: 500 })
  @Index({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({ type: 'varchar' })
  @IsNotEmpty()
  password: string;

  @IsString()
  deviceId: string;

  @OneToMany(type => Template, template => template.user)
  templates!: Template[];

  @OneToMany(type => Training, training => training.user)
  trainings!: Training[];
}
