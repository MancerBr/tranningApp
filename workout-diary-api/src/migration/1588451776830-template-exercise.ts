import {MigrationInterface, QueryRunner} from "typeorm";

export class templateExercise1588451776830 implements MigrationInterface {
    name = 'templateExercise1588451776830'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "template_exercise" ADD "steps" integer NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "template_exercise" DROP COLUMN "steps"`, undefined);
    }

}
