import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiration: process.env.JWT_EXPIRATION,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  jwtRefreshExpiration: process.env.JWT_REFRESH_EXPIRATION,
  jwtCookieName: process.env.JWT_COOKIE_NAME,
  nodeEnv: process.env.NODE_ENV,
  bcryptSalt: process.env.BCRYPT_SALT,
  defaultPassword: process.env.DEFAULT_PASSWORD,
  email: process.env.MAIL_USER,
  password: process.env.MAIL_PASSWORD,
  host: process.env.MAIL_HOST,
  mailport: process.env.MAIL_PORT,
  secure: process.env.MAIL_SECURE,
  resetUiUrl: process.env.RESET_UI_URL,
  cloudName: process.env.CLOUD_NAME,
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
  superAdminPassword: process.env.SUPER_ADMIN_PASSWORD,
  sp_endpoint: process.env.SP_ENDPOINT,
  sp_username: process.env.SP_USERNAME,
  sp_password: process.env.SP_PASSWORD,
  sp_prefix: process.env.SP_PREFIX,
  sp_return_url: process.env.SP_RETURN_URL,
};
