// 1. 权限控制（核心）
//     只允许已登录用户访问 /dashboard 相关页面
//     未登录用户自动拦截，无法进入任何业务页面
//     保护私密数据，防止未授权访问
// 中间件自动运行,路由守卫
import { auth } from "~/lib/auth";
// defineEventHandler 是 H3/Nitro 的函数，用于定义一个处理 HTTP 请求的处理器
export default defineEventHandler(async (event) => {
  // event 是H3 框架中的核心对象，代表当前的 HTTP 请求事件。
  // event.path 是当前请求的路径，event.method 是请求的 HTTP 方法。
  // 这里使用 startsWith 检查路径是否以 "/dashboard" 开头，
  //
  // 【步骤 1: 获取会话】
  // 调用 auth 库的 API，从 request headers (通常是 Cookie 或 Authorization header) 中提取会话信息
  const session = await auth.api.getSession({
    headers: event.headers,
  });

  // 【步骤 2: 挂载用户信息到上下文】 (关键点)
  // 如果会话存在且包含用户信息，将其赋值给 event.context.user
  // 意义：将“当前是谁在访问”这个信息，绑定到当前这次请求上。
  // 后续的任何代码（如 API 路由、其他中间件）只要拿到这个 event 对象，
  // 就可以通过 event.context.user 直接知道当前登录用户是谁，无需再次解析 Cookie。
  event.context.user = session?.user;
  if (event.path.startsWith("/dashboard")) {
    if (!session?.user) {
      await sendRedirect(event, "/", 302);
    }
  }
});
