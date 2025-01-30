export class AnalyticsRepositories {
  constructor(
    private readonly ackMessage = "<h1>Server Running</h1>"
  ) {}
  getAckMessage = (): string => {
    return this.ackMessage;
  };
}
