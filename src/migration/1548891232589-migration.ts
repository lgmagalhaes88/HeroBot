import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1548891232589 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("DROP TABLE IF EXISTS heroclass CASCADE;");
    await queryRunner.query("DROP TABLE IF EXISTS equip CASCADE;");
    await queryRunner.query("DROP TABLE IF EXISTS adventure CASCADE;");
    await queryRunner.query("DROP TABLE IF EXISTS monster CASCADE;");
    await queryRunner.query("DROP TABLE IF EXISTS playstatus CASCADE;");
    await queryRunner.query("DROP TABLE IF EXISTS inventory_equip CASCADE;");
    await queryRunner.query("DROP TABLE IF EXISTS inventory_potion CASCADE;");
    await queryRunner.query("DROP TABLE IF EXISTS hero CASCADE;");
    await queryRunner.query("DROP TABLE IF EXISTS weapon CASCADE;");
    await queryRunner.query("DROP TABLE IF EXISTS shield CASCADE;");
    await queryRunner.query("DROP TABLE IF EXISTS equip CASCADE;");
    await queryRunner.query("DROP TABLE IF EXISTS potion CASCADE;");
    await queryRunner.query("DROP TABLE IF EXISTS proficience CASCADE;");
    await queryRunner.query("DROP TABLE IF EXISTS play_status CASCADE;");

    await queryRunner.query(
      "CREATE TABLE heroclass (" +
        "    id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY," +
        "    name CHARACTER(30) NOT NULL," +
        "    damageBuff INTEGER NOT NULL," +
        "    shieldBuff INTEGER NOT NULL," +
        "    hpBuff INTEGER NOT NULL," +
        "    goldBuff INTEGER NOT NULL," +
        "    expBuff INTEGER NOT NULL," +
        "    attackSpeedBuff INTEGER NOT NULL" +
        ");"
    );

    await queryRunner.query(
      "CREATE TABLE equip(" +
        "id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY," +
        "name CHARACTER(30) NOT NULL," +
        "level INTEGER NOT NULL," +
        "type CHARACTER(20) NOT NULL," +
        "defence INTEGER," +
        "damage INTEGER," +
        "price INTEGER NOT NULL" +
        "sellprice INTEGER NOT NULL" +
        ");"
    );

    await queryRunner.query(
      "CREATE TABLE proficience (" +
        "   id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY," +
        "    level INTEGER NOT NULL," +
        "    xp INTEGER NOT NULL," +
        "    levelMaxXp INTEGER NOT NULL" +
        ");"
    );

    await queryRunner.query(
      "CREATE TABLE monster (" +
        "    id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY," +
        "    name CHARACTER(30) NOT NULL," +
        "    level INTEGER NOT NULL," +
        "    damage INTEGER NOT NULL," +
        "    hp INTEGER NOT NULL," +
        "    defence INTEGER NOT NULL," +
        "    givedxp INTEGER NOT NULL," +
        "    givedgold INTEGER NOT NULL," +
        "    equipDropChance INTEGER NOT NULL," +
        "    idEquipDrop BIGINT," +
        "    FOREIGN KEY (idEquipDrop) REFERENCES Equip(id)" +
        ");"
    );

    await queryRunner.query(
      "CREATE TABLE potion (" +
        "    id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY," +
        "    name CHARACTER(50) NOT NULL," +
        "    price INTEGER NOT NULL," +
        "    hpheal INTEGER NOT NULL" +
        ");"
    );

    await queryRunner.query(
      "CREATE TABLE adventure (" +
        "    id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY," +
        "    level INTEGER NOT NULL," +
        "    name CHARACTER(40) NOT NULL," +
        "    idMonster BIGINT NOT NULL," +
        "    FOREIGN KEY(idMonster) REFERENCES monster(id)" +
        ");"
    );

    await queryRunner.query(
      "CREATE TABLE play_status (" +
        "    id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY," +
        "    task CHARACTER(30)," +
        "    gold INTEGER NOT NULL," +
        "    monsterskilled INTEGER NOT NULL DEFAULT 0," +
        "    exp INTEGER NOT NULL DEFAULT 0," +
        "    timeStarted INTEGER NOT NULL DEFAULT 0," +
        "    idadventure BIGINT NULL," +
        "    FOREIGN KEY (idadventure) REFERENCES adventure(id)" +
        ");"
    );

    await queryRunner.query(
      "CREATE TABLE hero (" +
        "    id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY," +
        "    name CHARACTER(30) NOT NULL," +
        "    level INTEGER NOT NULL," +
        "    hpTotal INTEGER NOT NULL," +
        "    hpActual INTEGER NOT NULL," +
        "    xp INTEGER NOT NULL," +
        "    levelMaxXp INTEGER NOT NULL," +
        "    gold INTEGER NOT NULL," +
        "    deaths INTEGER NOT NULL," +
        "    monstersKilled INTEGER NOT NULL," +
        "    idShield BIGINT," +
        "    idWeapon BIGINT," +
        "    idPlayStatus BIGINT," +
        "    idDamageProficience BIGINT," +
        "    idDefenceProficience BIGINT," +
        "    idHeroClass BIGINT," +
        "    FOREIGN KEY(idShield) REFERENCES equip(id)," +
        "    FOREIGN KEY(idWeapon) REFERENCES equip(id)," +
        "    FOREIGN KEY(idPlayStatus) REFERENCES play_status(id)," +
        "    FOREIGN KEY(idDamageProficience) REFERENCES proficience(id)," +
        "    FOREIGN KEY(idDefenceProficience) REFERENCES proficience(id)," +
        "    FOREIGN KEY(idHeroClass) REFERENCES heroclass(id)" +
        ");"
    );

    await queryRunner.query(
      "CREATE TABLE inventory_potion (" +
        "    id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY," +
        "    idhero BIGINT," +
        "    amount INTEGER NOT NULL," +
        "    idpotion BIGINT," +
        "    FOREIGN KEY(idpotion) REFERENCES potion(id)," +
        "    FOREIGN KEY(idhero) REFERENCES hero(id)" +
        ");"
    );

    await queryRunner.query(
      "CREATE TABLE inventory_equip (" +
        "    id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY," +
        "    idhero BIGINT," +
        "    equiped BOOLEAN NOT NULL," +
        "    idequip BIGINT," +
        "    FOREIGN KEY(idequip) REFERENCES equip(id)," +
        "    FOREIGN KEY(idhero) REFERENCES hero(id)" +
        ");"
    );

    await queryRunner.query(
      'CREATE TABLE "Aventure_Monsters"' +
        '"MonsterId" BIGINT' +
        '"AdventureId" BIGINT' +
        'FOREIGN KEY("monsterId") REFERENCES "Monster"' +
        'FOREIGN KEY("monsterId") REFERENCES "Adventure"'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
