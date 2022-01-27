<template>
  <a-layout-content>
    <div
      ref="el"
      class="content"
    >
      <router-view v-slot="{ Component }">
        <transition
          name="fadeRouter"
          mode="out-in"
        >
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </a-layout-content>
</template>

<script lang="ts" setup>
import { useFullscreen } from '@vueuse/core'
import { ref, getCurrentInstance, onUnmounted } from 'vue'
const el = ref<HTMLElement | null>(null)
const { toggle } = useFullscreen(el)
const { proxy }:any = getCurrentInstance()
proxy.$emitter.on('onFullScree', e => { toggle() })
onUnmounted(() => {
  proxy.$emitter.off('onFullScree')
})
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin";
.ant-layout-content {
  overflow: overlay;
  -moz-overflow-y: scroll;
  flex: none;
  color: #fff;
  @include wh(100%, 90vh);
  .content {
    background-color: #f5f5f5;
    overflow-y: auto;
    overflow-x: hidden;
    // min-width: 1166px;
  }
}

</style>
