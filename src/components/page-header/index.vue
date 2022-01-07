<template>
  <div class="body">
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240);background:#fff;"
      :title="title"
      :breadcrumb="{ routes }"
    >
      <slot />
      <div class="a-page-header-slot">
        <router-link to="/evaluation/evaluationset">
          <slot name="right" />
          <!-- <a-button type="primary">新建测评</a-button> -->
        </router-link>
      </div>
    </a-page-header>
  </div>
</template>

<script lang="ts">
import { onMounted, defineComponent } from 'vue'
const routes = [
  {
    path: 'index',
    breadcrumbName: '首页'
  },
  {
    path: 'first',
    breadcrumbName: '详情页'
  },
  {
    path: 'second',
    breadcrumbName: '基础详情页'
  }
]
export default defineComponent({
  name: 'PageHeader',
  props: {
    title: {
      type: String,
      default: '基础详情页'
    }
  },
  setup() {
    onMounted(() => {})
    return {
      routes
    }
  }
})
</script>
<style lang="scss" scoped>
.a-page-header {
  background: #ffffff;
  position: relative;
  &-slot {
    position: absolute;
    right: 0.3rem;
    top: 0.5rem;
  }
}
</style>
