export default defineEventHandler(async (event) => {
  // event 是H3 框架中的核心对象，代表当前的 HTTP 请求事件。
  // event.path 是当前请求的路径，event.method 是请求的 HTTP 方法。
  // 这里使用 startsWith 检查路径是否以 "/dashboard" 开头，
  if (event.path.startsWith("/dashboard")) {
    const session = await auth.api.getSession({
      headers: event.headers,
    });

    if (!session?.user) {
      await sendRedirect(event, "/", 302);
    }
  }
});
