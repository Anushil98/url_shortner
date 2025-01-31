import express, { Request, Response } from "express";
import { AnalyticsRouter } from "./routes/analytics/analytics.router";
import { shortUrlRouter } from "./routes/url_generator/shortUrl.router";
import appDataSource from "./infrastructure/_config/postgresDB/maindatasource";

const app = express();
app.use(express.json());

app.use(AnalyticsRouter.getroutes());
app.use(shortUrlRouter.getroutes());

// Fallback url
app.use("*", (_req: Request, res: Response) => {
  res.status(404).redirect("/heartbeat");
});

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  console.log(`Server Successfully Running at http://localhost:${port}`);

  // db connection
  try {
    await appDataSource.initialize();
    console.log("Postgres Sb connected");
  } catch (err) {
    console.error("Error connecting to postgres", err);
    console.log("Shuting dowwn Server");
    process.exit(1);
  }
});
