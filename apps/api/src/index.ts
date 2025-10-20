import { connectDB } from "./config/database.config";
import env from "./env";
import { NotFoundException } from "./lib/exception";
import { log } from "./logger";
import errorHandler from "./middleware/error-handler";
import appRoute from "./modules/app.route";
import { createServer } from "./server";

const port = env.PORT || 8080;

async function bootstrap() {
  // database initialization
  await connectDB();

  // server initialization
  const server = createServer();

  // our main application route
  appRoute(server);

  // catch all route which is not handled by other routes
  server.use(() => {
    throw new NotFoundException("Resource not found");
  });

  // this will handle custom exception
  server.use(errorHandler);

  server.listen(port, () => {
    log.info(`api running on ${port}`);
    // eslint-disable-next-line no-console
    console.info(`api running on http://localhost:${port}`);
  });
}
bootstrap();
