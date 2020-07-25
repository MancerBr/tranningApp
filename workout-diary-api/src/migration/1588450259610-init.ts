import {MigrationInterface, QueryRunner} from "typeorm";

export class init1588450259610 implements MigrationInterface {
    name = 'init1588450259610'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "template_exercise" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "templatesId" uuid, CONSTRAINT "PK_1b58b57eacada45ea7158190adf" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "template" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_fbae2ac36bd9b5e1e793b957b7f" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "training" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "state" character varying NOT NULL, "startData" TIMESTAMP WITH TIME ZONE, "endData" TIMESTAMP WITH TIME ZONE, "userId" uuid, CONSTRAINT "PK_c436c96be3adf1aa439ef471427" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "exercise" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "state" character varying NOT NULL, "startData" TIMESTAMP WITH TIME ZONE, "endData" TIMESTAMP WITH TIME ZONE, "trainingId" uuid, CONSTRAINT "PK_a0f107e3a2ef2742c1e91d97c14" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "exercise_process" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "step" integer NOT NULL, "weight" integer NOT NULL, "count" integer NOT NULL, "startData" TIMESTAMP WITH TIME ZONE, "endData" TIMESTAMP WITH TIME ZONE, "exerciseId" uuid, CONSTRAINT "PK_69d0184740d9d461f7118bc5162" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying(500) NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying(500) NOT NULL`, undefined);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `, undefined);
        await queryRunner.query(`ALTER TABLE "template_exercise" ADD CONSTRAINT "FK_60acc6b4de956093103ffe26061" FOREIGN KEY ("templatesId") REFERENCES "template"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "template" ADD CONSTRAINT "FK_5e718539594d02a4c75ddc1ca56" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "training" ADD CONSTRAINT "FK_b3a3040656df21433bb88f1e568" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "exercise" ADD CONSTRAINT "FK_3a59955df2241a5f479b0830977" FOREIGN KEY ("trainingId") REFERENCES "training"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "exercise_process" ADD CONSTRAINT "FK_f70c2284008c908aa30fbde7ca8" FOREIGN KEY ("exerciseId") REFERENCES "exercise"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exercise_process" DROP CONSTRAINT "FK_f70c2284008c908aa30fbde7ca8"`, undefined);
        await queryRunner.query(`ALTER TABLE "exercise" DROP CONSTRAINT "FK_3a59955df2241a5f479b0830977"`, undefined);
        await queryRunner.query(`ALTER TABLE "training" DROP CONSTRAINT "FK_b3a3040656df21433bb88f1e568"`, undefined);
        await queryRunner.query(`ALTER TABLE "template" DROP CONSTRAINT "FK_5e718539594d02a4c75ddc1ca56"`, undefined);
        await queryRunner.query(`ALTER TABLE "template_exercise" DROP CONSTRAINT "FK_60acc6b4de956093103ffe26061"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_e12875dfb3b1d92d7d7c5377e2"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`, undefined);
        await queryRunner.query(`DROP TABLE "exercise_process"`, undefined);
        await queryRunner.query(`DROP TABLE "exercise"`, undefined);
        await queryRunner.query(`DROP TABLE "training"`, undefined);
        await queryRunner.query(`DROP TABLE "template"`, undefined);
        await queryRunner.query(`DROP TABLE "template_exercise"`, undefined);
    }

}
