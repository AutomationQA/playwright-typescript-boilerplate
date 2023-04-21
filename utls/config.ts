import dotenv from "dotenv";

// Define the expected environment variable types
interface EnvVars {
  S3_BUCKET: string;
  SECRET_KEY: string;
  LOG_LEVEL: string;
  SETUP_USERNAME: string;
  SETUP_USERPASSWORD: string;
  USER_SESSION_TIMEOUT_MS: number;
  TEST_TIMEOUT_MS: number;
  EXPECT_TIMEOUT_MS: number;
}

// Class for encapsulating environment variables
export class Config {
  private envVars: EnvVars;

  constructor() {
    // Load environment variables from .env file
    dotenv.config();

    // Assign environment variables to class properties
    this.envVars = {
      S3_BUCKET: process.env.S3_BUCKET || "",
      SECRET_KEY: process.env.SECRET_KEY || "",
      LOG_LEVEL: process.env.LOG_LEVEL || "info",
      SETUP_USERNAME: process.env.SETUP_USERNAME || "",
      SETUP_USERPASSWORD: process.env.SETUP_USERPASSWORD || "",
      USER_SESSION_TIMEOUT_MS: Number(process.env.USER_SESSION_TIMEOUT_MS) || 0,
      TEST_TIMEOUT_MS: Number(process.env.TEST_TIMEOUT_MS) || 0,
      EXPECT_TIMEOUT_MS: Number(process.env.EXPECT_TIMEOUT_MS) || 0,
    };
  }

  // Getter methods for accessing environment variables
  get s3Bucket(): string {
    return this.envVars.S3_BUCKET;
  }

  get secretKey(): string {
    return this.envVars.SECRET_KEY;
  }

  get logLevel(): string {
    return this.envVars.LOG_LEVEL;
  }

  get setupUsername(): string {
    return this.envVars.SETUP_USERNAME;
  }

  get setupUserPassword(): string {
    return this.envVars.SETUP_USERPASSWORD;
  }

  get userSessionTimeoutMs(): number {
    return this.envVars.USER_SESSION_TIMEOUT_MS;
  }

  get testTimeoutMs(): number {
    return this.envVars.TEST_TIMEOUT_MS;
  }

  get expectTimeoutMs(): number {
    return this.envVars.EXPECT_TIMEOUT_MS;
  }
}
