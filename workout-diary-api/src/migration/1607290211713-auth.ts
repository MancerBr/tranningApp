import {MigrationInterface, QueryRunner} from "typeorm";

export class auth1607290211713 implements MigrationInterface {
    name = 'auth1607290211713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth" DROP COLUMN "expiresIn"`, undefined);
        await queryRunner.query(`ALTER TABLE "auth" ADD "expiresIn" bigint NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth" DROP COLUMN "expiresIn"`, undefined);
        await queryRunner.query(`ALTER TABLE "auth" ADD "expiresIn" integer NOT NULL`, undefined);
    }

}
