import { Router } from "express";
import { AnalyticsController } from "../../controller/analytics/heartbeat.controller";
import { AnalyticsRepositories } from "../../repositories/analytics/analytics.repositories";

export class AnalyticsRouter {
  private static router: Router = Router();

  static getroutes(): Router {
    const analyticsRepo = new AnalyticsRepositories();
    const controller = new AnalyticsController(analyticsRepo);
    this.router.get("/heartbeat", controller.mainserver_heartbeat_controller);

    return this.router;
  }
}
