import { Entity, Column } from 'typeorm';

import { BaseEntity } from '../core/entitys/base.entity';

@Entity()
export class Auth extends BaseEntity {

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid' })
  sessionId: string;

  @Column({ type: 'varchar' })
  deviceId: string;

  @Column({ type: 'bigint'})
  expiresIn: number;

}
