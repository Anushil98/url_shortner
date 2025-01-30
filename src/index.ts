import express, { Request, Response } from "express";
import { AnalyticsRouter } from "./routes/analytics/analytics.router";

const app = express();
app.use(express.json());

app.use(AnalyticsRouter.getroutes());

// Fallback url
app.use("*", (_req: Request, res: Response) => {
  res.status(404).redirect("/heartbeat");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server Successfully Running at http://localhost:${port}`);
});
