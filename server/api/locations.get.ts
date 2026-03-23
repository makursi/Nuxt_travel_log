import { findLocations } from "~/lib/db/queries/location";
import defineAuthenticatedEventHandler from "~/utils/define-authenticated-evet-handler";

export default defineAuthenticatedEventHandler(async (event) => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  const result = await findLocations(event.context.user.id);
  return result;
});
