import {MigrationInterface, QueryRunner} from "typeorm";

export class auth1589144769839 implements MigrationInterface {
    name = 'auth1589144769839'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "auth" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" uuid NOT NULL, CONSTRAINT "PK_7e416cf6172bc5aec04244f6459" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "auth_session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deviceId" character varying NOT NULL, "authId" uuid, CONSTRAINT "PK_19354ed146424a728c1112a8cbf" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "auth_session" ADD CONSTRAINT "FK_4b74522fc0dea0563f0d7329ad1" FOREIGN KEY ("authId") REFERENCES "auth"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth_session" DROP CONSTRAINT "FK_4b74522fc0dea0563f0d7329ad1"`, undefined);
        await queryRunner.query(`DROP TABLE "auth_session"`, undefined);
        await queryRunner.query(`DROP TABLE "auth"`, undefined);
    }

}
