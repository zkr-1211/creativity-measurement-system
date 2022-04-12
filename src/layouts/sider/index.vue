<template>
  <a-layout-sider
    v-model:collapsed="collapsed"
    width="256px"
  >
    <!-- 树课测评系统 -->
    <span v-if="!collapsed"> 树课测评系统 </span>
    <span v-else> Icon </span>
    <a-menu
      v-model:selectedKeys="selectedKeys"
      :open-keys="openKeys"
      mode="inline"
      :theme="theme"
    >
      <a-menu-item key="HomePage">
        <template #icon>
          <MailOutlined />
        </template>
        <router-link to="/homepage">
          首页
        </router-link>
      </a-menu-item>
      <a-sub-menu key="evaluation">
        <template #icon>
          <AppstoreOutlined />
        </template>
        <template #title>
          测评管理
        </template>
        <a-menu-item key="allevaluation">
          <router-link to="/evaluation/allevaluation">
            全部测评
          </router-link>
        </a-menu-item>
        <a-menu-item key="design">
          <router-link to="/evaluation/design">
            测评设计
          </router-link>
        </a-menu-item>
      </a-sub-menu>

      <a-menu-item key="organization">
        <template #icon>
          <CalendarOutlined />
        </template>
        <router-link to="/organization">
          机构/学校
        </router-link>
      </a-menu-item>

      <a-sub-menu key="sub2">
        <template #icon>
          <SettingOutlined />
        </template>
        <template #title>
          个人页
        </template>
       <a-menu-item key="administrator">
          <router-link to="/personnelmanage/administrator">
            个人中心
          </router-link>
        </a-menu-item>
      </a-sub-menu>

      <a-sub-menu key="personnel">
        <template #icon>
          <SettingOutlined />
        </template>
        <template #title>
          人员管理
        </template>
        <a-menu-item key="administrator">
          <router-link to="/personnelmanage/administrator">
            管理员
          </router-link>
        </a-menu-item>
        <a-menu-item key="evaluator">
          <router-link to="/personnelmanage/evaluator">
            测评师
          </router-link>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<script lang="ts" setup>
import { reactive, toRefs, watch, computed } from 'vue'
// import SidebarMenu from './SidebarMenuConfig.js'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'

import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined
} from '@ant-design/icons-vue'
const state = reactive({
  mode: 'inline',
  theme: 'dark',
  openKeys: <string[]>[],
  selectedKeys: ['HomePage']
})
const { theme, openKeys, selectedKeys } = toRefs(state)
const route = useRoute()
const store = useStore()
const collapsed = computed(() => {
  return store.getCollapsed
})
watch(
  () => route.name,
  () => {
    const sub = route.matched[0].meta.id
    const name = route.name
    // const isPush = state.openKeys.every((item) => {
    //   return item !== sub
    // })
    // sub && isPush && state.openKeys.push(String(sub))
    state.openKeys = [String(sub)]
    state.selectedKeys = [String(name)]
  },
  {
    immediate: true
  }
)
watch(
  () => collapsed.value,
  (newVal, oldVal) => {
    store.setCollapsed(newVal)
  },
  {
    immediate: true
  }
)
window.onresize = () => {
  const ddw = document.documentElement.clientWidth
  if (ddw < 1200) {
    store.setCollapsed(true)
  }
}
// const changeMode = (checked: string) => {
//   state.mode = checked ? 'vertical' : 'inline'
// }

// const changeTheme = (checked: string) => {
//   state.theme = checked ? 'dark' : 'light'
// }
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin";

#components-layout-demo-basic {
  @include wh(100vw, 100vh);
  overflow: hidden;
}
#components-layout-demo-basic .ant-layout-header {
  background: #ffffff;
  z-index: 999;
  @include wh(100%, 0.48rem);
  box-shadow: 0px 1px 4px rgba(0, 21, 41, 0.12);
  @include faj();
  flex-direction: row-reverse;
}
#components-layout-demo-basic .ant-layout-sider {
  height: 100vh;
  background: dark;
  line-height: 0.6rem;
  text-align: center;
  @include sc(0.2rem, #fff);
}
#components-layout-demo-basic > .ant-layout {
  margin-bottom: 0.48rem;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
</style>
