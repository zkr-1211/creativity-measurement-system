<template>
  <div class="body">
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240); background: #fff"
      :title="title"
      :breadcrumb="{ routes }"
      @click="aaa"
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
import { onMounted, defineComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface routeType {
  path:string,
  breadcrumbName:string
}
export default defineComponent({
  name: 'PageHeader',
  props: {
    title: {
      type: String,
      default: '基础详情页'
    }
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const aaa = () => {
      router.push({ path: '/404' })
    }
    const routes = ref<routeType[]>([])
    route?.matched.forEach(item => {
      routes.value.push(
        {
          path: `${item.path}`,
          breadcrumbName: `${item.meta.title || '首页'}`
        }
      )
    })

    onMounted(() => {})
    return {
      routes,
      aaa
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
