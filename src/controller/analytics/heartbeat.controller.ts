import { NextFunction, Request, Response } from "express";
import { AnalyticsRepositories } from "../../infrastructure/analytics/analytics.repositories";

export class AnalyticsController {
  constructor(private readonly analyticsrepository: AnalyticsRepositories) {}

  mainserver_heartbeat_controller = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const ackMessage = this.analyticsrepository.getAckMessage();
    res.status(200).send(ackMessage);
    return;
  };
}
