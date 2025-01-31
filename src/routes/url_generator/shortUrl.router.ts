import { Router } from "express";
import { shortUrlRepository } from "../../infrastructure/short_url/repository/shortUrl.repository";
import { shortURL } from "../../infrastructure/short_url/entities/shortUrl.entity";
import appDataSource from "../../infrastructure/_config/postgresDB/maindatasource";
import { ShortUrlController } from "../../controller/short_url/shor_url.controller";

export class shortUrlRouter {
  private static router: Router = Router();

  static getroutes(): Router {
    const shortUrlRepo = new shortUrlRepository(appDataSource, shortURL);
    const controller = new ShortUrlController(shortUrlRepo);
    this.router.post("/generateShortUrl", controller.addShortUrl);
    return this.router;
  }
}
