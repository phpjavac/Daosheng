import { defineComponent } from "@vue/runtime-dom";
import { RouteRecordRaw, RouteMeta } from "vue-router";

declare type Recordable<T = any> = Record<string, T>;

export type Component<T extends any = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import("*.vue")>)
  | (() => Promise<T>);

type RoleType = "admin" | "teacher" | "student";

export interface APPRouteMeta extends RouteMeta {
  role: RoleType[];
}
// @ts-ignore
export interface AppRouterRecordRaw extends Omit<RouteRecordRaw, "meta"> {
  name: string;
  meta: APPRouteMeta;
  component?: Component | string;
  components?: Component;
  children?: AppRouterRecordRaw[];
  fullpath?: string;
  props?: Recordable;
}
