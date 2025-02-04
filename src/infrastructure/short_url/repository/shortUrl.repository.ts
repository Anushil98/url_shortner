import { DataSource, EntityTarget, Repository } from "typeorm";
import { shortURL } from "../entities/shortUrl.entity";
import crypto from "crypto";

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

  async isUrlPresent(shortUrl: string): Promise<shortURL | null> {
    try {
      const url = await this.findOne({ where: { shortUrl } });
      return url;
    } catch (err: any) {
      console.error(err.message);
      throw new Error("Error in short url existence checking");
    }
  }

  generateRandomShortCode = (length = 6): string => {
    const characters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters[Math.floor(Math.random() * characters.length)];
    }
    return result;
  };

  async generateUrl(longUrl: string): Promise<string> {
    try {
      let hash = crypto
        .createHash("sha256")
        .update(longUrl)
        .digest("base64url");

      for (let i = 0; i < 5; i++) {
        // Retry up to 5 times
        const shortCode = hash.slice(i * 6, i * 6 + 6); // Take a different 6-char slice each time

        // Check if the short code already exists
        const isShortUrlTaken = await this.isUrlPresent(shortCode);

        if (Boolean(isShortUrlTaken) === false) {
          return shortCode;
        }

        if (isShortUrlTaken?.longUrl === longUrl) {
          // The URL is the same, return existing short code
          return shortCode;
        }

        // Collision detected, try the next slice
      }

      // Fallback: Generate a random string as a last resort
      return this.generateRandomShortCode();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async getLongUrl(shortUrl: string): Promise<string | undefined> {
    try {
      const url = await this.findOne({ where: { shortUrl } });
      return url?.longUrl;
    } catch (err: any) {
      console.error(err.message);
      throw new Error("Error in short url existence checking");
    }
  }
}
