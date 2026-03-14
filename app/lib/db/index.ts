import { drizzle } from "drizzle-orm/tursodatabase/database";
import * as schema from "~/lib/db/schema";

//  相当于导出 env.ts 中的默认值
import env from "~/lib/env";

import "dotenv/config";

const db = drizzle({
  connection: {
    path: env.DB_FILE_NAME,
  },
  schema,
});

export default db;
