import { connectDB } from "./config/database.config";
import env from "./env";
import { log } from "./logger";
import { createServer } from "./server";
import appRoute from "./modules/app.route";

const port = env.PORT || 8080;

async function bootstrap() {
  await connectDB();
  const server = createServer();

  appRoute(server);

  server.listen(port, () => {
    log.info(`api running on ${port}`);
    console.log(`api running on http://localhost:${port}`);
  });
}
bootstrap();
