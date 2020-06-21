import * as dotenv from "dotenv";
import server from "./src/server";

dotenv.config();

server.listen(8000, () => {
  console.log(`Server is running in http://localhost:3000`);
});
