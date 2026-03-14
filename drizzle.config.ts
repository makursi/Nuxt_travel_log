import { defineConfig } from "drizzle-kit";
//  导入环境变量
import env from "./app/lib/env";
import "dotenv/config";

export default defineConfig({
  out: "./app/lib/migrations",
  //  在drizzle中统一使用schema文件
  schema: "./app/lib/db/schema/index.ts",
  dialect: "sqlite",
  casing: "snake_case",
  dbCredentials: {
    url: env.DB_FILE_NAME,
  },
});
