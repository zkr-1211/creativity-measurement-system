<template>
  <div class="body">
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240);background:#fff;"
      title="基础详情页"
    >
      <!-- :breadcrumb="{ routes }" -->
      <div class="a-page-header-slot">
        <a-button type="primary">
          新建测评
        </a-button>
      </div>
    </a-page-header>
  </div>
</template>

<script lang="ts">
import { onMounted, defineComponent } from 'vue'
export default defineComponent({
  name: 'DetailPage',
  setup() {
    onMounted(() => {})
    return {}
  }
})
</script>
<style lang="scss" scoped>
.a-page-header {
  background: #ffffff;
  position: relative;
  width: 80%;
  &-slot {
    position: absolute;
    right: 0.3rem;
    top: 0.5rem;
  }
}</style>
