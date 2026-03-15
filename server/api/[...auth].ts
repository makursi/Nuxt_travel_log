import { auth } from "~/lib/auth"; // import your auth config

//  github auth服务端
export default defineEventHandler((event) => {
  return auth.handler(toWebRequest(event));
});
