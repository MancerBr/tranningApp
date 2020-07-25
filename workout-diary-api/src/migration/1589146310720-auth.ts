import {MigrationInterface, QueryRunner} from "typeorm";

export class auth1589146310720 implements MigrationInterface {
    name = 'auth1589146310720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth" ADD "deviceId" character varying NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth" DROP COLUMN "deviceId"`, undefined);
    }

}
