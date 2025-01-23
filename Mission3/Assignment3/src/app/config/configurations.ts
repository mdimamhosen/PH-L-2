import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export const configurations = {
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
};
