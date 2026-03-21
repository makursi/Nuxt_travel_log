import db from "~/lib/db";
import { InsertLocationSchema, location } from "~/lib/db/schema";

//  导入数据库进行数据插入

//  定义提交表单的api
export default defineEventHandler(async (event) => {
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

  const [created] = await db
    .insert(location)
    .values({
      ...result.data,
      userId: event.context.user.id,
      slug: result.data.name.replaceAll(" ", "-").toLowerCase(),
    })
    .returning();
  return created;
});
