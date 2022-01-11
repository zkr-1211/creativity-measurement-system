<script setup lang="ts">
import { provide, ref, nextTick } from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
const locale = ref(zhCN)
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
  <a-config-provider :locale="locale">
    <router-view
      v-if="isRouterAlive"
      v-slot="{ Component }"
    >
      <transition
        name="fade"
        mode="out-in"
      >
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </a-config-provider>
</template>

<style>
@import "assets/css/main.css";
</style>
