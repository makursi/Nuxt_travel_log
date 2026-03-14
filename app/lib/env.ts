import { z } from "zod";
import tryParseEnv from "./try-parse-env";

const EnvSchema = z.object({
  NODE_ENV: z.string(),
  DB_FILE_NAME: z.string(),
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.string(),
});

// 导出推断出的静态类型
export type EnvSchema = z.infer<typeof EnvSchema>;

tryParseEnv(EnvSchema);
export default EnvSchema.parse(process.env);
