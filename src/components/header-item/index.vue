<!--  -->
<template>
  <div class="body">
    <div class="top-header">
      <div class="left">
        {{ title }}
      </div>
      <div class="right">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, defineComponent } from 'vue'
export default defineComponent({
  name: 'HeaderItem',
  components: {},
  props: {
    title: {
      type: String,
      default: '默认标题'
    }
  },
  setup() {
    onMounted(() => {})
    return {}
  }
})
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin";
.top-header {
  @include faj();
  padding-left: 30px;
  padding-right: 30px;
  @include wh(100%, 51px);
  line-height: 51px;
  @include sc(16px, rgba(0, 0, 0, 0.85));
  font-weight: bold;
  border-bottom: 1px solid #e9e9e9;
}
</style>
