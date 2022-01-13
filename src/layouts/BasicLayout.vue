<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <Sider />
      <a-layout>
        <Header />
        <Content />
      </a-layout>
    </a-layout>
  </div>
</template>

<script lang="ts" setup>
import Header from '@/layouts/header/index.vue'
import Content from '@/layouts/content/index.vue'
import Sider from '@/layouts/sider/index.vue'
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin";
#components-layout-demo-basic {
  @include wh(100vw, 100vh);
  overflow: hidden;
}
</style>