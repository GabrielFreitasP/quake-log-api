import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateKilAndMeansOfDeathTables1706065918810 implements MigrationInterface {
    name = 'CreateKilAndMeansOfDeathTables1706065918810'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "players" DROP CONSTRAINT "FK_cef52931b331b4ec107a220fb5d"`);
        await queryRunner.query(`CREATE TABLE "means_of_death" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tag" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_6c0f74f36c7fe2bda4a417429af" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "kills" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "game_id" uuid, "killer_id" uuid, "victim_id" uuid, "means_of_death_id" uuid, CONSTRAINT "PK_a942b5b49eb07d42cc127857da0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "players" DROP COLUMN "game_id"`);
        await queryRunner.query(`ALTER TABLE "games" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "games" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "games" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "players" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "players" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "players" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "kills" ADD CONSTRAINT "FK_14860d3afd5d966624a55a214ab" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "kills" ADD CONSTRAINT "FK_0686d31c2067eda95a6b7e9c69b" FOREIGN KEY ("killer_id") REFERENCES "players"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "kills" ADD CONSTRAINT "FK_04eb7580587ddc845bef790b0da" FOREIGN KEY ("victim_id") REFERENCES "players"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "kills" ADD CONSTRAINT "FK_4c563b9116ad045fad0c90f8a3b" FOREIGN KEY ("means_of_death_id") REFERENCES "means_of_death"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "kills" DROP CONSTRAINT "FK_4c563b9116ad045fad0c90f8a3b"`);
        await queryRunner.query(`ALTER TABLE "kills" DROP CONSTRAINT "FK_04eb7580587ddc845bef790b0da"`);
        await queryRunner.query(`ALTER TABLE "kills" DROP CONSTRAINT "FK_0686d31c2067eda95a6b7e9c69b"`);
        await queryRunner.query(`ALTER TABLE "kills" DROP CONSTRAINT "FK_14860d3afd5d966624a55a214ab"`);
        await queryRunner.query(`ALTER TABLE "players" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "players" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "players" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "games" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "games" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "games" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "players" ADD "game_id" uuid`);
        await queryRunner.query(`DROP TABLE "kills"`);
        await queryRunner.query(`DROP TABLE "means_of_death"`);
        await queryRunner.query(`ALTER TABLE "players" ADD CONSTRAINT "FK_cef52931b331b4ec107a220fb5d" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
