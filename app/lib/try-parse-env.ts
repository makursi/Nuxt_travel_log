//  核心作用是：安全地验证环境变量（如 process.env）是否符合指定的 Zod Schema，并在验证失败时提供清晰、友好的错误提示。

import type { ZodObject, ZodRawShape } from "zod";

import { ZodError } from "zod";

export default function tryParseEnv<T extends ZodRawShape>(
  EnvSchema: ZodObject<T>,
  buildEnv: Record<string, string | undefined> = process.env,
) {
  try {
    EnvSchema.parse(buildEnv);
  } catch (error) {
    if (error instanceof ZodError) {
      let message = "Missing required values in .env:\n";
      error.issues.forEach((issue) => {
        message += `${issue.path[0]}\n`;
      });
      const e = new Error(message);
      e.stack = "";
      throw e;
    } else {
      console.error(error);
    }
  }
}
