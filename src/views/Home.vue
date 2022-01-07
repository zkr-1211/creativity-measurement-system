<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-sider
        v-model:collapsed="collapsed"
        width="256px"
        collapsible
      >
        <!-- 树课测评系统 -->
        <template v-if="true">
          树课测评系统
          <a-menu
            v-model:openKeys="openKeys"
            v-model:selectedKeys="selectedKeys"
            mode="inline"
            :theme="theme"
          >
            <a-menu-item key="1">
              <template #icon>
                <MailOutlined />
              </template>
              <router-link to="/homepage">
                首页
              </router-link>
            </a-menu-item>

            <a-sub-menu key="sub1">
              <template #icon>
                <AppstoreOutlined />
              </template>
              <template #title>
                测评管理
              </template>
              <a-menu-item key="2">
                <router-link to="/evaluation/allevaluation">
                  全部测评
                </router-link>
              </a-menu-item>
              <a-menu-item key="3">
                <router-link to="/evaluation/design">
                  测评设计
                </router-link>
              </a-menu-item>
            </a-sub-menu>
            <a-menu-item key="4">
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
                审批管理
              </template>
              <a-menu-item key="7">
                Option 7
              </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub3">
              <template #icon>
                <SettingOutlined />
              </template>
              <template #title>
                人员管理
              </template>
              <a-menu-item key="8">
                <router-link to="/personnelmanage/administrator">
                  管理员
                </router-link>
              </a-menu-item>
              <a-menu-item key="9">
                <router-link to="/personage-page">
                  测评师
                </router-link>
              </a-menu-item>
            </a-sub-menu>
          </a-menu>
        </template>
        <!--  学生/教师管理平台 -->
        <template v-else>
          学生/教师管理平台
          <a-menu
            v-model:openKeys="openKeys"
            v-model:selectedKeys="selectedKeys"
            style="width: 256px"
            :mode="mode"
            :theme="theme"
          >
            <a-sub-menu key="sub1">
              <template #icon>
                <AppstoreOutlined />
              </template>
              <template #title>
                仪表盘
              </template>
              <a-menu-item key="1">
                全部测评
              </a-menu-item>
            </a-sub-menu>

            <a-sub-menu key="sub2">
              <template #icon>
                <AppstoreOutlined />
              </template>
              <template #title>
                表单页
              </template>
              <a-menu-item key="2">
                测评设计
              </a-menu-item>
            </a-sub-menu>
            <!-- <a-menu-item key="4">
              <template #icon>
                <CalendarOutlined />
              </template>
              机构/学校
            </a-menu-item> -->
            <a-sub-menu key="sub3">
              <template #icon>
                <SettingOutlined />
              </template>
              <template #title>
                列表页
              </template>
              <a-sub-menu
                key="sub1-2"
                title="搜索列表"
              >
                <a-menu-item key="5">
                  Option 5
                </a-menu-item>
                <a-menu-item key="6">
                  Option 6
                </a-menu-item>
              </a-sub-menu>
              <a-menu-item key="7">
                查询表格
              </a-menu-item>
              <a-menu-item key="7">
                标准列表
              </a-menu-item>
              <a-menu-item key="7">
                卡片列表
              </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub4">
              <template #icon>
                <SettingOutlined />
              </template>
              <template #title>
                详情页
              </template>
              <a-menu-item key="8">
                Option 8
              </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub5">
              <template #icon>
                <SettingOutlined />
              </template>
              <template #title>
                结果页
              </template>
              <a-menu-item key="8">
                Option 8
              </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub6">
              <template #icon>
                <SettingOutlined />
              </template>
              <template #title>
                异常页
              </template>
              <a-menu-item key="8">
                Option 8
              </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub7">
              <template #icon>
                <SettingOutlined />
              </template>
              <template #title>
                个人页
              </template>
              <a-menu-item key="8">
                Option 8
              </a-menu-item>
            </a-sub-menu>
          </a-menu>
        </template>
      </a-layout-sider>
      <!-- 右半部分 -->
      <a-layout>
        <!-- 头部 -->
        <a-layout-header>
          <div class="header">
            <div class="user">
              <div class="user-serach">
                <img
                  src=""
                  alt=""
                >
              </div>
              <div class="user-message">
                <img
                  src=""
                  alt=""
                >
              </div>
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
              <div class="user-state" />
            </div>
          </div>
        </a-layout-header>
        <!-- 内容部分 -->
        <a-layout-content>
          <div class="content">
            <router-view v-slot="{ Component }">
              <keep-alive>
                <component :is="Component" />
              </keep-alive>
            </router-view>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined
} from '@ant-design/icons-vue'
export default defineComponent({
  name: 'MyHome',
  components: {
    MailOutlined,
    CalendarOutlined,
    AppstoreOutlined,
    SettingOutlined
  },

  setup(props, context) {
    const state = reactive({
      mode: 'inline',
      theme: 'dark',
      selectedKeys: ['1'],
      openKeys: ['sub1']
    })
    const collapsed = ref<boolean>(false)
    window.onresize = () => {
      const ddw = document.documentElement.clientWidth
      collapsed.value = ddw < 1200
    }
    const changeMode = (checked: string) => {
      state.mode = checked ? 'vertical' : 'inline'
    }

    const changeTheme = (checked: string) => {
      state.theme = checked ? 'dark' : 'light'
    }

    return {
      ...toRefs(state),
      changeMode,
      changeTheme,
      collapsed
    }
  }
})
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
  .user {
    @include faj();
    &-serach {
      @include borderRadius(50%);
      @include wh(0.14rem, 0.14rem);
      background: rgba(0, 0, 0, 1);
      img {
      }
    }
    &-message {
      @include borderRadius(50%);
      margin-left: 0.35rem;
      @include wh(0.14rem, 0.14rem);
      background: rgb(145, 38, 38);
      img {
      }
    }
    &-info {
      margin-left: 0.35rem;
      @include faj();
      .user-header {
        display: flex;
        @include wh(0.34rem, 0.34rem);
        background: #aad315;
        @include borderRadius(50%);
        img {
          display: none;
        }
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
  // }
}
#components-layout-demo-basic .ant-layout-sider {
  height: 100vh;
  background: dark;
  line-height: 0.6rem;
  text-align: center;
  @include sc(0.2rem, #fff);
}
#components-layout-demo-basic .ant-layout-content {
  overflow: overlay;
  flex: none;
  color: #fff;
  @include wh(100%, 95vh);
  // margin: 32px 0 32px 24px;
  .content {
    min-width: 1166px;
  }
}
#components-layout-demo-basic > .ant-layout {
  margin-bottom: 0.48rem;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
</style>
