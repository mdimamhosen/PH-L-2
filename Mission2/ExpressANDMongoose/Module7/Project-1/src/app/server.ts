import { Server } from "http";
import app from "./app";

const port = 3000;

let server: Server;

async function bootstrap() {
  server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}
bootstrap();
