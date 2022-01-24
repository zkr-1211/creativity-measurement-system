<template>
  <a-layout-header>
    <div class="left">
      <div
        style="margin-right: 24px; cursor: pointer;"
        @click="change"
      >
        <MenuFoldOutlined v-if="!collapsed" />
        <MenuUnfoldOutlined v-else />
      </div>

      <!-- <i
        :class="['vitecaidan', defaultData.iconfont, collapse ? 'collapse' : '']"
        :style="{ color: themeColor }"
        @click="handleCollapse"
      /> -->
      <a-breadcrumb separator="/">
        <!-- <transition-group name="list"> -->
        <a-breadcrumb-item
          v-for="(item, index) in matched"
          :key="index"
          :to="{ path: item.path }"
        >
          {{ item.meta.title }}
          <template
            v-if="item.children && item.children.length"
            #overlay
          >
            <a-menu>
              <a-menu-item
                v-for="each in item.children"
                :key="each.name"
                :to="item.redirect || item.path"
              >
                <router-link
                  :to="each.redirect || each.path"
                  class="router-link"
                >
                  {{ each.meta.title }}
                </router-link>
              </a-menu-item>
            </a-menu>
          </template>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="user">
      <a-tooltip placement="bottom">
        <template #title>
          <span>搜索</span>
        </template>
        <ZoomInOutlined :style="{ fontSize: '20px' }" />
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template #title>
          <span>消息</span>
        </template>
        <BellOutlined :style="{ fontSize: '20px', marginLeft: '20px' }" />
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template #title>
          <span>{{ !isFullScree ? "全屏" : "退出全屏" }}</span>
        </template>
        <FullscreenOutlined
          v-if="!isFullScree"
          :style="{ fontSize: '20px', marginLeft: '20px' }"
          @click="FullScree"
        />
        <FullscreenExitOutlined
          v-else
          :style="{ fontSize: '20px', marginLeft: '20px' }"
          @click="FullScree"
        />
      </a-tooltip>
      <a-dropdown>
        <template #overlay>
          <a-menu>
            <a-menu-item key="1">
              <UserOutlined />
              个人信息
            </a-menu-item>
            <a-menu-item key="2">
              <LogoutOutlined />
              退出登入
            </a-menu-item>
          </a-menu>
        </template>
        <div class="user-info">
          <div class="user-header">
            <img
              src=""
              alt=""
            >
          </div>
          <div class="user-name">
            用户名
          </div>
        </div>
      </a-dropdown>
      <div class="user-state" />
    </div>
  </a-layout-header>
  <div class="Tabs">
    <Tabs />
  </div>
</template>

<script lang="ts" setup>
import Tabs from '@/components/tabs/index.vue'

import {
  ZoomInOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons-vue'
import { useFullscreen } from '@vueuse/core'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import { computed } from 'vue'

import { ref } from 'vue'
const { enter, exit } = useFullscreen()
const route = useRoute()
let matched:any = []
matched = computed(() => {
  let arr = route.matched
  // if (arr[0].path !== '/') {
  arr = route.matched
  // }
  return arr.filter(item => item.meta?.title)
})
// console.log('matched', matched)

const store = useStore()
const collapsed = computed(() => {
  return store.getCollapsed
})
const change = () => {
  store.collapsed = !store.collapsed
}
const isFullScree = ref(false)
const FullScree = () => {
  !isFullScree.value && enter()
  isFullScree.value && exit()
  isFullScree.value = !isFullScree.value
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin";
.ant-layout-header {
  height: 64px;
  padding: 0 50px 0 20px;
  color: rgba(0, 0, 0, 0.85);
  line-height: 64px;
  background: #001529;
}
.Tabs {
  z-index: 9;
  background-color: #fff;
  border-bottom: 3px solid rgb(84, 133, 224);
  padding: 10px;
  max-height: 40px;
  overflow: hidden;
}
#components-layout-demo-basic .ant-layout-header {
  background: #ffffff;
  z-index: 999;
  @include wh(100%, 48px);
  box-shadow: 0px 1px 4px rgba(0, 21, 41, 0.12);
  @include faj();
  // flex-direction: row-reverse
}
.left {
  display: flex;
  align-items: center
}
.user {
  @include faj;
  &-info {
    height: 48px;
    overflow: hidden;
    padding: 0px 10px;
    cursor: pointer;
    &:hover {
      background-color: rgb(233, 233, 233);
    }
    margin-left: 0.2rem;
    @include faj();
    .user-header {
      display: flex;
      @include wh(0.34rem, 0.34rem);
      background: #aad315;
      @include borderRadius(50%);
    }
    .user-name {
      margin-left: 0.12rem;
      white-space: nowrap;
    }
  }
  &-state {
    margin-left: 0.15rem;
    @include wh(0.14rem, 0.14rem);
    background: rgba(0, 0, 0, 0.65);
    @include borderRadius(50%);
  }
}
</style>
