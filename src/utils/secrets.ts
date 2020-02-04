import dotenv from "dotenv";
import logger from "./logger";
import fs from "fs";

if (fs.existsSync(".env")) {
  logger.debug("Using .env file to supply config environment variables");
  dotenv.config({ path: ".env" });
} else {
  logger.debug(
    "Using .env.development file to supply config environment variables"
  );
  dotenv.config({ path: ".env.development" }); // you can delete this after you create your own .env file!
}

export const SESSION_SECRET = process.env["JWT_SECRET"];

const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === "production";

export const MONGO_URI = prod
  ? process.env["MONGODB_URI"]
  : process.env["MONGODB_URI"];

if (!MONGO_URI) {
  if (prod) {
    logger.error(
      "No mongo connection string. Set MONGO_URI environment variable."
    );
  } else {
    logger.error(
      "No mongo connection string. Set MONGODB_URI_LOCAL environment variable."
    );
  }
  process.exit(1);
}
