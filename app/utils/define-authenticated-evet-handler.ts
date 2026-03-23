import type { H3Event, H3EventContext } from "h3";
import type { UserWithId } from "~/lib/auth";

type AuthenticatedH3Event = H3Event & {
  context: H3EventContext & {
    user: UserWithId;
  };
};
export default function defineAuthenticatedEventHandler<T>(
  handler: (event: AuthenticatedH3Event) => T,
) {
  return defineEventHandler(async (event) => {
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

    return handler(event as AuthenticatedH3Event);
  });
}
