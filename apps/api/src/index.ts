import env from "./env";
import { log } from "./logger";
import { createServer } from "./server";

const port = env.PORT || 8080;
const server = createServer();

server.listen(port, () => {
  log.info(`api running on ${port}`);
  console.log(`api running on http://localhost:${port}`);
});
