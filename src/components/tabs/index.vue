<template>
  <div class="tabs">
    <div class="content">
      <!-- <a-tabs
        type="editable-card"
      >
        <a-tab-pane
          v-for="(item, index) in tabs"
          :key="item.name"
          :tab="item.title"
          closable
          @click="handleOpenContext($event, item, index)"
        >
          {{ item.title }}
        </a-tab-pane>
      </a-tabs> -->
      <a-tag
        v-for="(item, index) in tabs"
        :key="item.name"
        :closable="item.name !== 'HomePage'"
        :color="currentRouteName === item.name ? '#108ee9' : ''"
        style="max-height: 22px;"
        @close="handleClose(tabs[tabIndex], index)"
        @click="(e) => handleOpenContext(e, item, index)"
      >
        <router-link
          :to="{
            name: item.name,
            params: item.params,
            query: item.query,
          }"
        >
          {{ item.title }}
        </router-link>
      </a-tag>
    </div>
    <div style="color: rgb(81, 152, 218); font-weight: bold; cursor: pointer">
      <a-dropdown :trigger="['click']">
        <a
          style="margin-right: 10px; color: rgb(81, 152, 218)"
          class="ant-dropdown-link"
          @click.prevent
        >
          更多
          <DownOutlined />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item
              v-if="tabs[tabIndex].name !== 'HomePage'"
              key="0"
            >
              <li @click="handleClose(tabs[tabIndex], tabIndex)">
                关闭
              </li>
            </a-menu-item>
            <a-menu-item key="1">
              <li @click="handleCloseOther">
                关闭其他
              </li>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="3">
              <li @click="handleCloseAll">
                关闭所有
              </li>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <span @click="reload">
        刷新
        <RedoOutlined class="reload" />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, computed, ref, inject } from 'vue'
import { useTabsStore, ITabsItem } from '@/store/tabs'
import { useRoute, useRouter } from 'vue-router'
import { RedoOutlined, DownOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  name: 'MyTabs',
  components: { RedoOutlined, DownOutlined },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useTabsStore()
    const tabs = computed(() => {
      return store.tabs
    })
    const tabIndex = computed(() => {
      return store.tabIndex
    })
    // 右键菜单的位置
    const onRefresh = inject<Function>('reload')
    const reload = () => {
      onRefresh && onRefresh()
    }
    // 监听路由改变 若tabs中不存在当前路由，则增加路由
    watch(
      () => route.name,
      () => {
        // 获取当前路由所在tabs的下标
        const index = tabs.value.findIndex((item) => {
          return item.name === route.name
        })
        console.log(route.name, index)

        // 不存在则增加路由到tabs
        index < 0 && store.handleAddRoute(route)
      },
      {
        immediate: true
      }
    )
    const currentRouteName = computed(() => {
      return route.name
    })
    const handleCloseOther = () => {
      // 如果当前路由与右击页签路由不一致，则跳转至右击页签的路由
      currentContextIndex.value = tabIndex.value
      if (
        currentRouteName.value !== tabs.value[currentContextIndex.value].name
      ) {
        router.push({
          name: tabs.value[currentContextIndex.value].name,
          query: tabs.value[currentContextIndex.value].query,
          params: tabs.value[currentContextIndex.value].params
        })
      }
      store.handleCloseOther(currentContextIndex.value)
    }
    const handleCloseAll = () => {
      router.push({
        name: 'Home'
      })
      store.handleCloseAll()
    }
    const handleClose = (item: ITabsItem, index: number) => {
      console.log('12312312312312')

      store.handleClose(index)
      // 如果关闭的是当前路由，则跳转到tabs的最后一个路由
      const isCurrentRoute = item.name === currentRouteName.value
      isCurrentRoute &&
        router.push({
          name: tabs.value[tabs.value.length - 1].name,
          query: tabs.value[tabs.value.length - 1].query,
          params: tabs.value[tabs.value.length - 1].params
        })
    }
    const contentVisible = ref(false)
    const currentContextIndex = ref(0)
    const handleOpenContext = (e: any, item: ITabsItem, index: number) => {
      console.log(item)

      router.push({
        name: item.name,
        params: item.params,
        query: item.query
      })
      store.tabIndex = index
      contentVisible.value = true
    }
    watch(contentVisible, (val: boolean) => {
      const _fn = () => {
        contentVisible.value = false
      }
      if (val) {
        window.addEventListener('click', _fn)
      } else {
        window.removeEventListener('click', _fn)
      }
    })
    return {
      tabs,
      currentRouteName,
      handleClose,
      handleOpenContext,
      currentContextIndex,
      handleCloseOther,
      handleCloseAll,
      reload,
      tabIndex
    }
  }
})
</script>

<style lang="scss" scoped>
// /* 滚动条宽度 */
// ::-webkit-scrollbar {
//   height: 5px;
// }
/* 滚动条的滑块 */
::-webkit-scrollbar-thumb {
  background-color: rgb(81, 152, 218);
  border-radius: 3px;
}
.tabs {
  display: flex;
  justify-content: space-between;
  .content {
    max-width: 90%;
    display: flex;
    flex-wrap: nowrap;
    max-height: 30px;
    overflow-x: hidden;
    overflow-y: hidden;
  }
  .reload {
    // min-width: 200px;
    -webkit-animation: myRotate 1s linear;
    animation: myRotate 1s linear;
  }
}
@-webkit-keyframes myRotate {
  0% {
    -webkit-transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes myRotate {
  0% {
    -webkit-transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
.context-menu {
  position: fixed;
  width: 100px;
  left: 0;
  top: 0;
  background: #fff;
  z-index: 2;
  text-align: center;
  border: 1px solid #606266;
  border-bottom: none;
  padding: 0;
  li {
    height: 30px;
    cursor: pointer;
    line-height: 30px;
    border-bottom: 1px solid #606266;
    list-style: none;
  }
}
</style>
