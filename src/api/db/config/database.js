import { config } from "dotenv";

config();

export default {
  development: {
    use_env_variable: "DEV_DATABASE_URL",
    dialect: "postgres",
    seederStorage: "sequelize",
    seederStorageTableName: "seeders",
    migrationStorageTableName: "migrations",
  },
  test: {
    use_env_variable: "TEST_DATABASE_URL",
    dialect: "postgres",
    seederStorage: "sequelize",
    seederStorageTableName: "seeders",
    migrationStorageTableName: "migrations",
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    seederStorage: "sequelize",
    seederStorageTableName: "seeders",
    migrationStorageTableName: "migrations",
  },
};
