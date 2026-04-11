import type { InsertLocation } from "../schema";
import { and, eq } from "drizzle-orm";

import { customAlphabet } from "nanoid";

import db from "..";
import { location } from "../schema";

const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 5);

// findFirst() Drizzle ORM Relational API 的核心方法
// 参数：接收一个配置对象 { where?, with?, orderBy?, columns? }。

// eq() 条件构建函数
// 参数：接收两个参数 (column, value)。
// column: 数据库表中的列名。
// value: 要匹配的值。
//
//
// and() 逻辑组合函数。
// 接收任意数量的条件表达式
// and(condition1, condition2)

// 定义该函数的作用:幂等性检查 (Idempotency Check) / 防重,在执行 INSERT 之前，先调用此函数。
// console.log("Available tables in db.query:", Object.keys(db.query));
export async function findLocation(slug: string, userId: number) {
  return db.query.location.findFirst({
    where: and(eq(location.slug, slug), eq(location.userId, userId)),
    with: {
      locationLogs: {
        orderBy(fields, operators) {
          return operators.desc(fields.startedAt);
        },
      },
    },
  });
}
//  直接查找地点
export async function findLocations(userId: number) {
  return db.query.location.findMany({
    where: eq(location.userId, userId),
  });
}

//  通过名称查找地点
export async function findLocationByName(
  existing: InsertLocation,
  userId: number,
) {
  return await db.query.location.findFirst({
    where: and(eq(location.name, existing.name), eq(location.userId, userId)),
  });
}

// 通过slug查找地点
export async function findLocationBySlug(slug: string) {
  return await db.query.location.findFirst({
    where: eq(location.slug, slug),
  });
}

// 查找唯一slug
export async function findUniqueSlug(slug: string) {
  let existing = !!(await findLocationBySlug(slug));

  while (existing) {
    const id = nanoid();
    const idSlug = `${slug}` + `-${id}`;
    // 重新查询数据库
    // !! 双重否定,第一个 !：将值转为布尔并取反,第二个 !：再次取反，得到原始的布尔真值
    existing = !!(await findLocationBySlug(idSlug));
    if (!existing) {
      return idSlug;
    }
  }
  return slug;
}

// 定义插入query 函数

export async function insertLocation(
  insertable: InsertLocation,
  slug: string,
  userId: number,
) {
  const [created] = await db
    .insert(location)
    .values({
      ...insertable,
      slug,
      userId,
    })
    // 这告诉数据库在执行 INSERT 等执行数据库的操作后，返回新插入行的完整数据（而不仅仅是受影响的行数）。如果不加这个，通常只能拿到 { changes: 1 } 之类的信息。
    .returning();

  return created;
}

export async function updateLocationBySlug(
  updates: InsertLocation,
  slug: string,
  userId: number,
) {
  const [updated] = await db
    .update(location)
    .set(updates)
    .where(and(eq(location.slug, slug), eq(location.userId, userId)))
    .returning();
  return updated;
}

export async function removeLocationBySlug(slug: string, userId: number) {
  const [removed] = await db
    .delete(location)
    .where(and(eq(location.slug, slug), eq(location.userId, userId)))
    .returning();
  return removed;
}
