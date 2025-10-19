import { connectDB } from "./config/database.config";
import env from "./env";
import { log } from "./logger";
import { createServer } from "./server";
import appRoute from "./modules/app.route";
import errorHandler from "./middleware/error-handler";
import { NotFoundException } from "./lib/exception/http-exception";

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
    console.log(`api running on http://localhost:${port}`);
  });
}
bootstrap();
