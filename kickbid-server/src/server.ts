import App from "@src/App";
import { env } from "@common/utils/env";
import { logger } from "@common/utils/logger"

async function start(): Promise<void> {
  const server = await App.start();

  server.listen(env("PORT"), () => {
    logger.info(`Server started on port: ${env("PORT")}`);
  })
}

start();
