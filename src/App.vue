<script setup lang="ts">
import { provide, ref, nextTick } from 'vue'
// 配置为中文
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import moment from 'moment'
import 'moment/dist/locale/zh-cn'
moment.locale('zh-cn')
// 路由刷新
const isRouterAlive = ref<boolean>(true)
const onRefresh = () => {
  isRouterAlive.value = false
  nextTick(() => {
    isRouterAlive.value = true
  })
}
provide('reload', onRefresh)
</script>

<template>
  <a-config-provider :locale="zhCN">
    <router-view
      v-if="isRouterAlive"
      v-slot="{ Component }"
    >
      <suspense>
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </suspense>
    </router-view>
  </a-config-provider>
</template>

<style>
@import "assets/css/main.css";
</style>
