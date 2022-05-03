<script setup lang="ts">
// 配置为中文
import { useRouterReload } from "@/hooks/useRouterReload";
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/dist/locale/zh-cn";
import util from "@/libs/util";
import { GetDetails } from "@/api/get.detail";
import { useStore } from "@/store";
moment.locale("zh-cn");
// 路由刷新
const { isRouterAlive } = useRouterReload();
const store = useStore();
if (util.cookies.getAll()[import.meta.env.VITE_APP_TOKEN_KEY]) {
  GetDetails()
    .then(async (res) => {
      util.cookies.set("uuid", res[0].id);
      // 设置 pinia 用户信息
      await store.setUserInfo(res[0]);
    })
    .catch((err) => {
      console.log("err:", err);
    });
}
</script>

<template>
  <a-config-provider :locale="zhCN">
    <router-view v-if="isRouterAlive" v-slot="{ Component }">
      <!-- <suspense> -->
      <!-- <keep-alive> -->
      <component :is="Component" />
      <!-- </keep-alive> -->
      <!-- </suspense> -->
    </router-view>
  </a-config-provider>
</template>

<style>
@import "assets/css/main.css";
</style>
