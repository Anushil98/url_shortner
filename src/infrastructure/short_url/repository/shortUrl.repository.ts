import { DataSource, EntityTarget, Repository } from "typeorm";
import { shortURL } from "../entities/shortUrl.entity";

export class shortUrlRepository extends Repository<shortURL> {
  constructor(dataSource: DataSource, targetEntity: EntityTarget<shortURL>) {
    super(targetEntity, dataSource.manager);
  }

  async addShortUrl(
    longUrl: string,
    generatedShortUrl: string
  ): Promise<shortURL> {
    try {
      const newShortUrl = new shortURL();
      newShortUrl.longUrl = longUrl;
      newShortUrl.shortUrl = generatedShortUrl;

      const savedData = await this.save(newShortUrl);
      return savedData;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
