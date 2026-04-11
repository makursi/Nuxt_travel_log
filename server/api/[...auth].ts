import { auth } from "~/lib/auth"; // import your auth config

// 创建API路由
//  github auth服务端
export default defineEventHandler((event) => {
  return auth.handler(toWebRequest(event));
});
