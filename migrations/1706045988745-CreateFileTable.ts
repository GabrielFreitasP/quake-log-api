import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFileTable1706045988745 implements MigrationInterface {
    name = 'CreateFileTable1706045988745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "files" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" integer NOT NULL, "field_name" character varying NOT NULL, "original_name" character varying NOT NULL, "mime_type" character varying NOT NULL, "size" integer NOT NULL, "destination" character varying NOT NULL, "file_name" character varying NOT NULL, "path" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "files"`);
    }

}
