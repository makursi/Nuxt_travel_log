// 高阶函数封装的服务端鉴权中间件
// 所有需要登录才能访问的 API，必须先经过它检查用户是否登录，没登录直接返回 401 错误，登录了才允许继续执行。

// H3Event,UserWithId:服务端请求事件对象(req,res),UserWithId
import type { H3Event, H3EventContext } from "h3";
import type { UserWithId } from "~/lib/auth";

// 经过这个鉴权后的请求,event.context.user 一定存在

// 后面写代码就不会报错"user可能为空"
type AuthenticatedH3Event = H3Event & {
  // 类型合并
  context: H3EventContext & {
    user: UserWithId;
  };
};

// 接收一个真正的业务处理函数
// 返回一个新的包装函数
// 作用:所有接口先执行鉴权,鉴权通过后才执行业务代码
// 封装高阶函数
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

    // 鉴权通过 -> 执行业务逻辑
    return handler(event as AuthenticatedH3Event);
  });
}
