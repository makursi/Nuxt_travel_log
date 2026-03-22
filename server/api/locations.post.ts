import { and, eq } from "drizzle-orm";
// 导入nanoid
import { customAlphabet } from "nanoid";
// 导入slug

import slugify from "slug";

// 导入数据库实例
import db from "~/lib/db/index";

import { InsertLocationSchema, location } from "~/lib/db/schema";

//  导入数据库进行数据插入

//  定义提交表单的api
export default defineEventHandler(async (event) => {
  // 用户session上下文验证
  if (!event.context.user) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      }),
    );
  }
  const result = await readValidatedBody(event, InsertLocationSchema.safeParse);

  if (!result.success) {
    const statusMessage = result.error.issues
      .map(issue => `${issue.path.join("")}: ${issue.message}`)
      .join(";");

    const data = result.error.issues.reduce(
      (errors, issue) => {
        errors[issue.path.join("")] = issue.message;
        return errors;
      },
      {} as Record<string, string>,
    );
    return sendError(
      event,
      createError({
        statusCode: 422,
        statusMessage,
        data,
      }),
    );
  }

  //  处理slug的生成, 使用slug库和 nanoid 生成对浏览器 url 友好的地址, 因为用户可能只分享同一个地点一次, 所以要行slug + id = idSlug的生成
  // 查询数据库, 检查slug 是否存在,如果存在就添加上nanoid 如果不存在 就单插入一个位置

  const existinglocation = await db.query.location.findFrist({
    where: and(
      eq(location.name, result.data.name),
      eq(location.userId, result.data.name),
    ),
  });

  if (existinglocation) {
    return sendError(
      event,
      createError({
        statusCode: 422,
        statusMessage: "a location with this name already exists",
      }),
    );
  }
  let slug = slugify(result.data.name);
  let existing = !!(await db.query.location.findFirst({
    where: eq(location.slug, slug),
  }));
  // 无法使用findFirst方法

  const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 5);
  // 防止数据库id发生冲突
  while (existing) {
    const id = nanoid();
    const idSlug = `${slug}` + `-${id}`;
    // 重新查询数据库
    existing = !!(await db.query.location.findFirst({
      where: eq(location.slug, slug),
    }));
    if (!existing) {
      slug = idSlug;
    }
  }
  // 自定义错误处理信息
  // 数据库异步操作使用await
  // Drizzle 的返回格式: Drizzle 的 .all() 或隐式执行通常返回一个数组，即使只插入了一行数据，格式也是 [ { id: 1, name: 'Task' } ]。
  //  const [created] = await db 是数组结构, 取数组的第一个元素
  //  return created 将新数据对象返回给调用者
  try {
    const [created] = await db
      .insert(location)
      .values({
        ...result.data,
        userId: event.context.user.id,
        slug,
      })
      // 这告诉数据库在执行 INSERT 等执行数据库的操作后，返回新插入行的完整数据（而不仅仅是受影响的行数）。如果不加这个，通常只能拿到 { changes: 1 } 之类的信息。
      .returning();
    return created;
  }
  catch (e) {
    const error = e as any;
    const errmsg = String(error.message || error);

    console.error("Database Error:", errmsg);

    // 2. 判断是否是唯一性约束冲突
    if (errmsg.includes("UNIQUE constraint failed")) {
      const match = errmsg.match(/UNIQUE constraint failed: (.+)/);
      let friendlyMessage = "该记录已存在，请检查输入。";

      if (match && match[1]) {
        const conflictDetails = match[1];
        // 简单判断是名字冲突还是其他
        if (conflictDetails.includes("name")) {
          friendlyMessage = "该地点名称已存在，请使用其他名称。";
        }
        else if (conflictDetails.includes("slug")) {
          friendlyMessage = "该地点链接标识 (slug) 已存在。";
        }
        else {
          friendlyMessage = "数据重复，无法创建。";
        }
      }

      return sendError(
        event,
        createError({
          statusCode: 409,
          // 通用状态信息
          statusMessage: "Validation Error",
          data: {
            code: "UNIQUE_CONSTRAINT",
            message: friendlyMessage, // 这里放给用户看的友好提示
          },
        }),
      );
    }
    throw error;
  }

  // 模块末尾
});
