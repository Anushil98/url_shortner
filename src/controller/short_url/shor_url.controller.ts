import { NextFunction, Request, Response } from "express";
import { shortUrlRepository } from "../../infrastructure/short_url/repository/shortUrl.repository";

export class ShortUrlController {
  constructor(private readonly shortUrlRepository: shortUrlRepository) {}

  addShortUrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { longUrl } = req.body;
      // short url generator
      const generatedShortUrl = longUrl;
      const savedUrl = await this.shortUrlRepository.addShortUrl(
        longUrl,
        generatedShortUrl
      );
      res.status(200).json({ shortUrl: savedUrl.shortUrl });
      return;
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error!");
      return;
    }
  };
}
