<template>
  <a-layout-content>
    <div
      ref="el"
      class="content"
    >
      <router-view v-slot="{ Component, route }">
        <transition
          name="scale"
          mode="out-in"
        >
          <div :key="route.name">
            <suspense>
              <keep-alive>
                <component :is="Component" />
              </keep-alive>
            </suspense>
          </div>
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
proxy.$mybus.on('onFullScree', e => { toggle() })
onUnmounted(() => {
  proxy.$mybus.off('onFullScree')
})
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin";
.ant-layout-content {
  overflow: overlay;
  overflow-y: scroll;
  flex: none;
  color: #fff;
  @include wh(100%, 90vh);
  .content {
    overflow: hidden;
    background-color: #f5f5f5;
    overflow: auto;
    // min-width: 1166px;
  }
}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.4s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(1.5);
}
</style>
