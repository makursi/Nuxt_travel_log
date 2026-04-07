import { drizzle } from "drizzle-orm/libsql";
import env from "../env";
import * as schema from "./schema";

// 配置数据库的实例, 然后导出使用
//  相当于导出 env.ts 中的默认值
//  取消别名路径, 方便使用better auth 的生成数据库表schema文件

import "dotenv/config";

const db = drizzle({
  connection: {
    url: env.TURSO_DATABASE_URL,
    authToken:
      env.NODE_ENV === "development" ? undefined : env.TURSO_AUTH_TOKEN,
  },
  schema,
});

export default db;
