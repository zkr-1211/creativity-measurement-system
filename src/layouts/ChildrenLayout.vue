<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <Content />
    </a-layout>
  </div>
</template>

<script lang="ts" setup>
import Content from '@/layouts/content/index.vue'
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin";
#components-layout-demo-basic {
  @include wh(100%, 100vh);
  overflow: hidden;
}
</style>