import {MigrationInterface, QueryRunner} from "typeorm";

export class auth1589208095471 implements MigrationInterface {
    name = 'auth1589208095471'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth" DROP COLUMN "expiresIn"`, undefined);
        await queryRunner.query(`ALTER TABLE "auth" ADD "expiresIn" integer NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth" DROP COLUMN "expiresIn"`, undefined);
        await queryRunner.query(`ALTER TABLE "auth" ADD "expiresIn" TIMESTAMP NOT NULL`, undefined);
    }

}
