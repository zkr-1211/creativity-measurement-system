import { RouteRecordRaw } from 'vue-router'

export interface AppRouteMetaConfig {
  title?: string; // 页面标题，通常必选。
  icon?: string; //  图标，一般配合菜单使用。
  auth?: boolean; //  是否需要登录权限。
  ignoreAuth?: boolean; // 是否忽略权限。
  roles?: []; // 可以访问的角色
  keepAlive?: boolean; // 是否开启页面缓存
  hideMenu?: boolean; // 有些路由我们并不想在菜单中显示，比如某些编辑页面。
  order?: number; // 菜单排序。
  frameUrl?: string; // 嵌套外链。
}

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  meta?: AppRouteMetaConfig;
}
