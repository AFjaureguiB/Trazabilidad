"use strict";

import * as url from "url";
import path from "node:path";
import dotenv from "dotenv";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const envFilePath = path.resolve(__dirname, ".env");

dotenv.config({ path: envFilePath });

/** Server port */
export const SERVER_PORT = process.env.SERVER_PORT;

/** Server host */
export const SERVER_HOST = process.env.SERVER_HOST;

/** Database INFO */
export const DB_URL = process.env.DB_URL;
export const DB_PORT = process.env.DB_PORT;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;

/** Access token secret */
export const ACCESS_JWT_SECRET = process.env.ACCESS_JWT_SECRET;
/** Refresh token secret */
export const REFRESH_JWT_SECRET = process.env.REFRESH_JWT_SECRET;
