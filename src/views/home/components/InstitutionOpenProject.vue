<template>
  <a-card
    :loading="loading"
    title="测评访问榜单"
    style="height: 100%;"
  >
    <project-accounte-chart title="机构开通测评项目" />
  </a-card>
</template>

<script lang="ts" setup>
import ProjectAccounteChart from '@/components/project-accounte-chart/index.vue'
import { ref, onMounted, defineAsyncComponent } from 'vue'
// const ProjectAccounteChart = defineAsyncComponent(() => import('@/components/project-accounte-chart/index.vue'))
const loading = ref<boolean>(true)
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 500)
})
</script>
<style lang="scss" scoped>
</style>
