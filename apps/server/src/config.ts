import 'dotenv/config';

export const config = {
  environment: getEnv('NODE_ENV'),
  appPort: Number(getEnv('APP_PORT')),
  logLevel: getEnv('LOG_LEVEL'),

  mysqlUser: getEnv('MYSQL_USER'),
  mysqlPass: getEnv('MYSQL_PASSWORD'),
  mysqlDb: getEnv('MYSQL_DATABASE'),
  mysqlPort: Number(getEnv('MYSQL_PORT')),

  fileSizeLimitKb: Number(getEnv('FILE_SIZE_LIMIT_KB')),
};

function getEnv(name: string) {
  if (!process.env[name]) {
    console.error(`Environment variable: ${name} must be set`);
    process.exit(1);
  }
  return process.env[name];
}
