import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1706240313136 implements MigrationInterface {
  name = 'InitialMigration1706240313136';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "files" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" integer NOT NULL, "field_name" character varying NOT NULL, "original_name" character varying NOT NULL, "mime_type" character varying NOT NULL, "size" integer NOT NULL, "destination" character varying NOT NULL, "file_name" character varying NOT NULL, "path" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "scores" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "score" integer NOT NULL DEFAULT '0', "player_id" uuid, "game_id" uuid, CONSTRAINT "PK_c36917e6f26293b91d04b8fd521" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "players" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_1b597c8eb2fadb72240d576fd0f" UNIQUE ("name"), CONSTRAINT "PK_de22b8fdeee0c33ab55ae71da3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "means_of_death" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tag" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_7979a594ef77af0f631e8d5a4ff" UNIQUE ("tag"), CONSTRAINT "PK_6c0f74f36c7fe2bda4a417429af" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "kills" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "game_id" uuid, "killer_id" uuid, "victim_id" uuid, "means_of_death_id" uuid, CONSTRAINT "PK_a942b5b49eb07d42cc127857da0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "games" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "total_kills" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "file_id" uuid, CONSTRAINT "PK_c9b16b62917b5595af982d66337" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "scores" ADD CONSTRAINT "FK_05c455d55e1db448a683f523c13" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "scores" ADD CONSTRAINT "FK_556372ad7a13fdae500775f8789" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "kills" ADD CONSTRAINT "FK_14860d3afd5d966624a55a214ab" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "kills" ADD CONSTRAINT "FK_0686d31c2067eda95a6b7e9c69b" FOREIGN KEY ("killer_id") REFERENCES "players"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "kills" ADD CONSTRAINT "FK_04eb7580587ddc845bef790b0da" FOREIGN KEY ("victim_id") REFERENCES "players"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "kills" ADD CONSTRAINT "FK_4c563b9116ad045fad0c90f8a3b" FOREIGN KEY ("means_of_death_id") REFERENCES "means_of_death"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "games" ADD CONSTRAINT "FK_ee5da6549ce71c7d49ba6d374d7" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "games" DROP CONSTRAINT "FK_ee5da6549ce71c7d49ba6d374d7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "kills" DROP CONSTRAINT "FK_4c563b9116ad045fad0c90f8a3b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "kills" DROP CONSTRAINT "FK_04eb7580587ddc845bef790b0da"`,
    );
    await queryRunner.query(
      `ALTER TABLE "kills" DROP CONSTRAINT "FK_0686d31c2067eda95a6b7e9c69b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "kills" DROP CONSTRAINT "FK_14860d3afd5d966624a55a214ab"`,
    );
    await queryRunner.query(
      `ALTER TABLE "scores" DROP CONSTRAINT "FK_556372ad7a13fdae500775f8789"`,
    );
    await queryRunner.query(
      `ALTER TABLE "scores" DROP CONSTRAINT "FK_05c455d55e1db448a683f523c13"`,
    );
    await queryRunner.query(`DROP TABLE "games"`);
    await queryRunner.query(`DROP TABLE "kills"`);
    await queryRunner.query(`DROP TABLE "means_of_death"`);
    await queryRunner.query(`DROP TABLE "players"`);
    await queryRunner.query(`DROP TABLE "scores"`);
    await queryRunner.query(`DROP TABLE "files"`);
  }
}
