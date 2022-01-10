/* eslint-disable vue/v-on-event-hyphenation */
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
            @open-change="onOpenChange"
          >
            <a-menu-item key="HomePage">
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
              <a-menu-item key="AllEvaluation">
                <router-link to="/evaluation/allevaluation">
                  全部测评
                </router-link>
              </a-menu-item>
              <a-menu-item key="EvaluationManage">
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
                审批管理
              </template>
              <a-menu-item key="7">
                Option 7
              </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub4">
              <template #icon>
                <SettingOutlined />
              </template>
              <template #title>
                人员管理
              </template>
              <a-menu-item key="Administrator">
                <router-link to="/personnelmanage/administrator">
                  管理员
                </router-link>
              </a-menu-item>
              <a-menu-item key="personagePage">
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
            @openChange="onOpenChange"
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
        <Header />
        <!-- 内容部分 -->
        <a-layout-content>
          <div class="Tabs">
            <Tabs />
          </div>
          <div class="content">
            <router-view v-slot="{ Component }">
              <keep-alive>
                <transition
                  name="scale"
                  mode="out-in"
                >
                  <component :is="Component" />
                </transition>
              </keep-alive>
            </router-view>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, watch } from 'vue'
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined
} from '@ant-design/icons-vue'
import { useRoute } from 'vue-router'
import Tabs from '@/components/tabs/index.vue'
import Header from '@/layouts/header/index.vue'
export default defineComponent({
  name: 'MyHome',
  components: {
    MailOutlined,
    CalendarOutlined,
    AppstoreOutlined,
    SettingOutlined,
    Tabs,
    Header
  },

  setup(props, context) {
    const state = reactive({
      mode: 'inline',
      theme: 'dark',
      rootSubmenuKeys: ['sub1', 'sub2', 'sub4'],
      openKeys: ['sub1'],
      selectedKeys: ['HomePage']
    })
    // const selectedKeys = ref<string[]>(['HomePage'])
    const route = useRoute()
    const onOpenChange = (openKeys: string[]) => {
      const latestOpenKey = openKeys.find(
        (key) => state.openKeys.indexOf(key) === -1
      )
      if (state.rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
        state.openKeys = openKeys
      } else {
        state.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    }
    watch(
      () => route.name,
      () => {
        const name = route.name
        state.selectedKeys = [String(name)]
      },
      {
        immediate: true
      }
    )

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
      collapsed,
      onOpenChange
    }
  }
})
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin";
.Tabs {
  position: fixed;
  top: 48px;
  width: calc(100% - 256px);
  z-index: 9;
  background-color: #fff;
  border-bottom: 3px solid rgb(84, 133, 224);
  padding: 10px;
}
.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

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
#components-layout-demo-basic .ant-layout-content {
  position: relative;
  margin-top: 42px;
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
