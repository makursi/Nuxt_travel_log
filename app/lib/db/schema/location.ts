import type { z } from "zod";
import { int, real, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";

// 用于插入操作的输入数据类型验证规则,createInsertSchema 函数
// 从 drizzle-orm@1.0.0-beta.15 版本开始， drizzle-zod 已被弃用，Drizzle ORM 本身提供了第一类的模式生成支持
// 由于drizzle-zod的弃用, 导致 drizzle-zod 无法再处理schema 中的对数据的约束操作 ,报错: field.min() is not a function
import { createInsertSchema } from "drizzle-orm/zod";

import { user } from "./auth";

export const location = sqliteTable(
  "location",
  {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    slug: text("slug").notNull().unique(),
    description: text(),
    lat: real().notNull(),
    long: real().notNull(),
    userId: int("user_id")
      .notNull()
      //  references 是用来建立 外键约束 (Foreign Key Constraint) 的关键字。
      // 作用是“建立两个表之间的强关联，并保证数据的逻辑正确性”,无references时,会产生孤儿数据。

      // 定义级联行为 (Cascade Actions)
      // onDelete: "cascade" (级联删除)：如果用户A被删除,数据库会自动立刻把用户A所有的地点记录全部删掉
      // onDelete: "set null",onDelete: "restrict"等模式
      .references(() => user.id, { onDelete: "cascade" }),
    //  (创建时间):记录这条地点数据第一次被创建的时间点
    //  用途：
    // 按时间顺序展示旅行日志（“最新的旅行”）。
    // 统计用户是什么时候开始记录这个地点的。

    createdAt: int("created_at")
      .notNull()
      .$default(() => new Date()),
    // (更新时间)
    // 记录这条数据最后一次被修改的时间点。
    // 用途：
    // 判断数据是否过时。
    // 实现“最后编辑于 5 分钟前”这样的提示。
    updatedAt: int("updated_at")
      .notNull()
      .$default(() => new Date()),
  },
  // 定义复合唯一约束（Composite Unique Constraint）
  // 普通的 .unique() 是单列的（比如 slug 不能重复）。
  // 而这里的逻辑是：“对于同一个用户 (userId)，地点名称 (name) 不能重复。”
  // 业务逻辑需求：在一个用户的旅行日志里，他可能不想重复记录同一个地方两次（避免数据冗余）。
  t => [unique().on(t.name, t.userId)],
);

// 定义了一个名为 InsertLocationSchema 的 Zod Schema
// 专门用于验证和解析插入（INSERT） location 表数据时的输入对象。
export const InsertLocation = createInsertSchema(location, {
  // field 是一个已经包含了基础类型（如 z.string() 或 z.number()）的 Zod 实例，链式调用 .min(), .max() 是在此基础上增加约束。
  // 针对特定字段覆盖默认的验证规则,
  name: (field) => {
    return field.min(1).max(100);
  },
  description: (field) => {
    return field.max(1000);
  },
  lat: (field) => {
    return field.min(-90).max(90);
  },
  long: (field) => {
    return field.min(-180).max(180);
  },

  // 显式剔除字段,用于从 Schema 中移除指定的键。
}).omit({
  id: true,
  userId: true,
  slug: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertLocation = z.infer<typeof InsertLocation>;
