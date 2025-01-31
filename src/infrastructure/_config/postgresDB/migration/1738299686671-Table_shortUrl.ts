import { MigrationInterface, QueryRunner } from "typeorm";

export class TableShortUrl1738299686671 implements MigrationInterface {
    name = 'TableShortUrl1738299686671'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shortUrl" ("urlId" uuid NOT NULL DEFAULT uuid_generate_v4(), "longUrl" text NOT NULL, "shortUrl" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4cf5a7b595f1d0960541541eac1" PRIMARY KEY ("urlId"))`);
        await queryRunner.query(`CREATE INDEX "ShortUrl_IDX" ON "shortUrl" ("shortUrl") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."ShortUrl_IDX"`);
        await queryRunner.query(`DROP TABLE "shortUrl"`);
    }

}
