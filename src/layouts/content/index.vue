<template>
  <a-layout-content>
    <div class="Tabs">
      <Tabs />
    </div>
    <div class="content">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <transition
            name="scale"
            mode="out-in"
          >
            <component :is="Component" />
          </transition>
        </keep-alive>
      </router-view>
    </div>
  </a-layout-content>
</template>

<script lang="ts" setup>
import Tabs from '@/components/tabs/index.vue'
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin";
.ant-layout-content {
  position: relative;
  margin-top: 42px;
  overflow: overlay;
  flex: none;
  color: #fff;
  @include wh(100%, 90vh);
  // margin: 32px 0 32px 24px;
  .content {
    min-width: 1166px;
  }
}
.Tabs {
  position: fixed;
  top: 46px;
  width: calc(100% - 256px);
  z-index: 9;
  background-color: #fff;
  border-bottom: 3px solid rgb(84, 133, 224);
  padding: 10px;
  @media screen and (max-width: 1200px) {
    width: calc(100% - 80px) !important;
  }
}
.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
