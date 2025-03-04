export const AppConfiguration = () => ({
  environment: process.env.ENVIRONMENT || 'dev',
  port: Number(process.env.PORT) ?? 3000,
  dbName: process.env.DB_NAME || 'postgres',
  dbUser: process.env.DB_USER || 'postgres',
  dbPass: process.env.DB_PASS || 'postgres',
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: Number(process.env.DB_PORT) ?? 5432,
});
