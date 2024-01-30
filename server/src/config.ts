import 'dotenv/config';

export const config = {
  environment: process.env.NODE_ENV,
  mysqlUser: process.env.MYSQL_USER,
  mysqlPass: process.env.MYSQL_PASSWORD,
  mysqlDb: process.env.MYSQL_DATABASE,
  mysqlPort: process.env.MYSQL_PORT
};
