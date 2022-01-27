<template>
  <div class="body">
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240); background: #fff"
      :title="title"
      :breadcrumb="{ routes }"
    >
      <slot />
      <div class="a-page-header-slot">
        <slot name="right" />
      </div>
    </a-page-header>
  </div>
</template>

<script lang="ts">
import { onMounted, defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'

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
    console.log('routes', route?.matched)

    const routes = ref<routeType[]>([])
    route?.matched.forEach(item => {
      if (item.meta?.title) {
        routes.value.push(
          {
            path: ``,
            // path: `${item.path}`,
            breadcrumbName: `${item.meta.title}`
          }
        )
      }
    })

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
