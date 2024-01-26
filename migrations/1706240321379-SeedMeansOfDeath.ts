import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedMeansOfDeath1706240321379 implements MigrationInterface {
  name = 'SeedMeansOfDeath1706240321379';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const meansOfDeathData = [
      { tag: 'MOD_UNKNOWN', description: 'unknown cause of death' },
      { tag: 'MOD_SHOTGUN', description: 'the Shotgun weapon' },
      { tag: 'MOD_GAUNTLET', description: 'the Gauntlet weapon' },
      { tag: 'MOD_MACHINEGUN', description: 'the Machinegun weapon' },
      { tag: 'MOD_GRENADE', description: 'the Grenade' },
      { tag: 'MOD_GRENADE_SPLASH', description: 'the Grenade' },
      { tag: 'MOD_ROCKET', description: 'the Rocket weapon' },
      { tag: 'MOD_ROCKET_SPLASH', description: 'the Rocket weapon' },
      { tag: 'MOD_PLASMA', description: 'the Plasma weapon' },
      { tag: 'MOD_PLASMA_SPLASH', description: 'the Plasma weapon' },
      { tag: 'MOD_RAILGUN', description: 'the Railgun weapon' },
      { tag: 'MOD_LIGHTNING', description: 'the Lightning weapon' },
      { tag: 'MOD_BFG', description: 'the BFG weapon' },
      { tag: 'MOD_BFG_SPLASH', description: 'the BFG weapon' },
      { tag: 'MOD_WATER', description: 'he drowned in water' },
      { tag: 'MOD_SLIME', description: 'he drowned in slime' },
      { tag: 'MOD_LAVA', description: 'he burned in lava' },
      { tag: 'MOD_CRUSH', description: 'he was crushed by an object' },
      { tag: 'MOD_TELEFRAG', description: 'the teleport' },
      {
        tag: 'MOD_FALLING',
        description: 'he fallen from a significant height',
      },
      { tag: 'MOD_SUICIDE', description: 'he committed suicide' },
      { tag: 'MOD_TARGET_LASER', description: 'the Laser weapon' },
      {
        tag: 'MOD_TRIGGER_HURT',
        description: 'he was wounded and fell from a height enough to kill him',
      },
      { tag: 'MOD_NAIL', description: 'the Nailgun weapon' },
      { tag: 'MOD_CHAINGUN', description: 'the Chaingun weapon' },
      { tag: 'MOD_PROXIMITY_MINE', description: 'a proximity mine' },
      { tag: 'MOD_KAMIKAZE', description: 'a Kamikaze-style suicide attack' },
      { tag: 'MOD_JUICED', description: 'a temporarily powered up' },
      { tag: 'MOD_GRAPPLE', description: 'the Grapple weapon' },
    ];

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('means_of_death')
      .values(meansOfDeathData)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const meansOfDeathTags = [
      'MOD_UNKNOWN',
      'MOD_SHOTGUN',
      'MOD_GAUNTLET',
      'MOD_MACHINEGUN',
      'MOD_GRENADE',
      'MOD_GRENADE_SPLASH',
      'MOD_ROCKET',
      'MOD_ROCKET_SPLASH',
      'MOD_PLASMA',
      'MOD_PLASMA_SPLASH',
      'MOD_RAILGUN',
      'MOD_LIGHTNING',
      'MOD_BFG',
      'MOD_BFG_SPLASH',
      'MOD_WATER',
      'MOD_SLIME',
      'MOD_LAVA',
      'MOD_CRUSH',
      'MOD_TELEFRAG',
      'MOD_FALLING',
      'MOD_SUICIDE',
      'MOD_TARGET_LASER',
      'MOD_TRIGGER_HURT',
      'MOD_NAIL',
      'MOD_CHAINGUN',
      'MOD_PROXIMITY_MINE',
      'MOD_KAMIKAZE',
      'MOD_JUICED',
      'MOD_GRAPPLE',
    ];

    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('means_of_death')
      .where('tag IN (:...meansOfDeathTags)', { meansOfDeathTags })
      .execute();
  }
}
