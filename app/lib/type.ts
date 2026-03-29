// 定义h3 事件对象的上下文类型
import type { UserWithId } from "./auth";

declare module "h3" {
  type H3EventContext = {
    // 将id从类型中剥离, 然后联合类型更新id类型
    user?: UserWithId;
  };
}

export type LatLongItem = {
  lat: number;
  long: number;
};

export type MapPoint = {
  id: number;
  label: string;
} & LatLongItem;
