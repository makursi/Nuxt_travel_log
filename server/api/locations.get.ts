import { findLocations } from "~/lib/db/queries/location";
import defineAuthenticatedEventHandler from "~/utils/define-authenticated-evet-handler";

export default defineAuthenticatedEventHandler(async (event) => {
  //故意加延迟来观察加载状态（Loading Spinner）或骨架屏的效果。
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const result = await findLocations(event.context.user.id);
  return result;
});
