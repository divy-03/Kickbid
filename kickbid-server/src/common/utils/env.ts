/** 
  Handles getting value from environment file for given variable name.
  Throws error if no value found in env file for given variable name
*/
import { logger } from "./logger.ts";

export function env(variable: string): string {
  const value = process.env[variable];
  if (!value) {
    logger.error(`Critical env variable ${variable} not defined`);
  }
  return value;
}
