// 导入Better Auth核心
import type { User } from "better-auth";
import { betterAuth } from "better-auth";

// 导入drizzle 适配器->让Better Auth 能读写你的数据库
import { drizzleAdapter } from "better-auth/adapters/drizzle";

// 导入中间件
import { createAuthMiddleware } from "better-auth/api";
// 导入数据库实例
import db from "../lib/db/index"; // your drizzle instance
import env from "./env";

export type UserWithId = Omit<User, "id"> & { id: number };

// 创建auth实例,这是 整个项目认证系统的根，所有登录、会话、用户信息都来自这里.
export const auth = betterAuth({
  // 自定义接口-/api/auth/get-session
  // 功能：
  // 获取当前登录态（session + user）
  // 未登录返回 null
  // 已登录返回用户信息
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/get-session") {
        if (!ctx.context.session) {
          return ctx.json({
            session: null,
            user: null,
          });
        }
        return ctx.json(ctx.context.session);
      }
    }),
  },

  //  数据库连接
  // 把 Better Auth 连接到你的 Turso 数据库（SQLite）
  // 所有用户、会话、账号数据都会自动存在你的表中
  database: drizzleAdapter(db, {
    provider: "sqlite", // or "mysql", "sqlite"
  }),
  user: {
    fields: {
      email: "email_address",
    },
  },
  advanced: {
    database: {
      generateId: false, // "serial" for auto-incrementing numeric IDs
    },
  },

  // 开启github 等登录
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },
});
