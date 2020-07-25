import {MigrationInterface, QueryRunner} from "typeorm";

export class auth1589207941942 implements MigrationInterface {
    name = 'auth1589207941942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth" ADD "sessionId" uuid NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "auth" ADD "expiresIn" TIMESTAMP NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth" DROP COLUMN "expiresIn"`, undefined);
        await queryRunner.query(`ALTER TABLE "auth" DROP COLUMN "sessionId"`, undefined);
    }

}
