import { drizzle } from "drizzle-orm/tursodatabase/database";
import * as schema from "~/lib/db/schema";

//  相当于导出 env.ts 中的默认值
//  取消别名路径, 方便使用better auth 的生成数据库表schema文件
import env from "../env";

import "dotenv/config";

const db = drizzle({
  connection: {
    path: env.DB_FILE_NAME,
  },
  schema,
});

export default db;
