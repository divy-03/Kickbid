import express, { type Express } from "express";
import { createServer, Server as HTTPServer } from "http";
import cookieParser from "cookie-parser";
import { logger } from "@common/utils/logger";
import routes from "@src/routes";
import errorHandler from "@common/middlewares/errorHandler";
import validationErrorHandler from "@common/middlewares/validationErrorHandler";
import cors from "cors";

class App {
  app: Express;
  server: HTTPServer;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
  }

  async start(): Promise<HTTPServer> {

    // Cors configuration - MUST BE AT TOP
    const allowedOrigins = [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:3000",
      "http://127.0.0.1:3000"
    ];

    this.app.use(
      cors({
        origin: allowedOrigins,
        credentials: true, // Important for cookies and auth headers access
        methods: ["GET", "POST", "DELETE", "OPTIONS", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization", "X-Session-Id"]
      })
    );

    // Then register other middlewares
    this.middlewares();

    // Routes
    this.routes();

    // Validation middleware
    this.app.use(validationErrorHandler);

    // Global error middleware
    this.app.use(errorHandler);

    logger.info("Kickbid server starting... enabling routing and middleware then continuing...");

    return this.server;
  }

  routes(): void {
    this.app.use(routes);
  }

  middlewares(): void {
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }
}

export default new App();
