import 'dotenv/config';

const PORT = process.env.PORT ?? 8000;
const NODE_ENV = process.env.NODE_ENV
const APP_URL = NODE_ENV === 'production' ? process.env.APP_URL : `http://localhost:${PORT}`
const WHITELIST = process.env.WHITELIST || [];
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const ACCESS_TOKEN_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES;
const RESFRESH_TOKEN_SECRET = process.env.RESFRESH_TOKEN_SECRET;
const RESFRESH_TOKEN_EXPIRES = process.env.RESFRESH_TOKEN_EXPIRES;
const MAIL_SERVICE = process.env.MAIL_SERVICE;
const MAIL_PORT = process.env.MAIL_PORT;
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASS = process.env.MAIL_PASS;
export {
  APP_URL,
  PORT,
  WHITELIST,
  MONGO_URI,
  NODE_ENV,
  JWT_SECRET,
  JWT_EXPIRES,
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRES,
  RESFRESH_TOKEN_SECRET,
  RESFRESH_TOKEN_EXPIRES,
  MAIL_SERVICE,
  MAIL_PORT,
  MAIL_USER,
  MAIL_PASS,
}