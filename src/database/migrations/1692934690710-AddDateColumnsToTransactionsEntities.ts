import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDateColumnsToTransactionsEntities1692934690710 implements MigrationInterface {
    name = 'AddDateColumnsToTransactionsEntities1692934690710'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "aula"."users" ("id" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "cpf" integer NOT NULL, "age" integer NOT NULL, "created_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "aula"."transactions" ("id" character varying NOT NULL, "title" character varying NOT NULL, "value" integer NOT NULL, "estabelecimento" character varying(60), "type" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" character varying NOT NULL, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "aula"."transactions" ADD CONSTRAINT "FK_e9acc6efa76de013e8c1553ed2b" FOREIGN KEY ("user_id") REFERENCES "aula"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aula"."transactions" DROP CONSTRAINT "FK_e9acc6efa76de013e8c1553ed2b"`);
        await queryRunner.query(`DROP TABLE "aula"."transactions"`);
        await queryRunner.query(`DROP TABLE "aula"."users"`);
    }

}
