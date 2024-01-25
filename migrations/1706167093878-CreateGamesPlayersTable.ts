import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGamesPlayersTable1706167093878 implements MigrationInterface {
    name = 'CreateGamesPlayersTable1706167093878'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "games_players" ("game_id" uuid NOT NULL, "player_id" uuid NOT NULL, CONSTRAINT "PK_5330dac94e3155cd0ac71b22d9b" PRIMARY KEY ("game_id", "player_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4baddb0af5536bec97f61b55ab" ON "games_players" ("game_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_3d8ed177149f6e31f299d17c1a" ON "games_players" ("player_id") `);
        await queryRunner.query(`ALTER TABLE "means_of_death" ADD CONSTRAINT "UQ_7979a594ef77af0f631e8d5a4ff" UNIQUE ("tag")`);
        await queryRunner.query(`ALTER TABLE "players" ADD CONSTRAINT "UQ_1b597c8eb2fadb72240d576fd0f" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "games_players" ADD CONSTRAINT "FK_4baddb0af5536bec97f61b55ab1" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "games_players" ADD CONSTRAINT "FK_3d8ed177149f6e31f299d17c1a4" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "games_players" DROP CONSTRAINT "FK_3d8ed177149f6e31f299d17c1a4"`);
        await queryRunner.query(`ALTER TABLE "games_players" DROP CONSTRAINT "FK_4baddb0af5536bec97f61b55ab1"`);
        await queryRunner.query(`ALTER TABLE "players" DROP CONSTRAINT "UQ_1b597c8eb2fadb72240d576fd0f"`);
        await queryRunner.query(`ALTER TABLE "means_of_death" DROP CONSTRAINT "UQ_7979a594ef77af0f631e8d5a4ff"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3d8ed177149f6e31f299d17c1a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4baddb0af5536bec97f61b55ab"`);
        await queryRunner.query(`DROP TABLE "games_players"`);
    }

}
