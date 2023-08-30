import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableAddress1692935877440 implements MigrationInterface {
    name = 'CreateTableAddress1692935877440'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "aula"."address" ("id" uuid NOT NULL, "street" character varying NOT NULL, "number" integer NOT NULL, "zip_code" character varying(9) NOT NULL, "city" character varying NOT NULL, "user_id" character varying, CONSTRAINT "REL_35cd6c3fafec0bb5d072e24ea2" UNIQUE ("user_id"), CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "aula"."address" ADD CONSTRAINT "FK_35cd6c3fafec0bb5d072e24ea20" FOREIGN KEY ("user_id") REFERENCES "aula"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aula"."address" DROP CONSTRAINT "FK_35cd6c3fafec0bb5d072e24ea20"`);
        await queryRunner.query(`DROP TABLE "aula"."address"`);
    }

}
