<template>
  <a-card
    :loading="loading"
    title="机构开通测评项目"
    style="height: 100%;"
  >
    <project-accounte-chart title="开通测评项目占比" />
  </a-card>
</template>

<script lang="ts" setup>
import ProjectAccounteChart from '@/components/project-accounte-chart/index.vue'
import { ref, onMounted, defineAsyncComponent } from 'vue'
const loading = ref<boolean>(true)
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 500)
})
</script>
<style lang="scss" scoped>
</style>
