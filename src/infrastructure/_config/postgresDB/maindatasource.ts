import { DataSource } from "typeorm";

const appDataSource = new DataSource({
  type: "postgres",
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT || "5432"),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: false,
  ssl: process.env.STAGE === "local" ? true : undefined,
  logging: false,
  entities: [
    process.env.STAGE === "local"
      ? "src/infrastructure/**/entities/**/*.ts"
      : "dist/infrastructure/**/entities/**/*.js",
  ],
  migrations: [
    process.env.STAGE === "local"
      ? "src/infrastructure/_config/postgresDB/migration/**/*.ts"
      : "dist/infrastructure/_config/postgresDB/migration/**/*.ts",
  ],
});

export default appDataSource;
