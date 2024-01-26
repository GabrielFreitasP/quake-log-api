import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterFileStatusColumn1706287864603 implements MigrationInterface {
  name = 'AlterFileStatusColumn1706287864603';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "status"`);
    await queryRunner.query(
      `ALTER TABLE "files" ADD "status" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "status"`);
    await queryRunner.query(
      `ALTER TABLE "files" ADD "status" integer NOT NULL`,
    );
  }
}
