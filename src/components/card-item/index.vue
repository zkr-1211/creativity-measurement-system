<!--  -->
<template>
  <div class="body">
    <div class="content">
      <div
        v-for="(item, index) in 20"
        :key="index"
        class="content-item"
      >
        <div class="item-img" />
        <div class="item-bottom-info">
          <slot />
        </div>
      </div>
      <i />
      <i />
      <i />
      <i />
      <i />
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, defineComponent } from 'vue'
export default defineComponent({
  name: 'CardItem',
  components: {},
  setup() {
    onMounted(() => {})
    return {}
  }
})
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin";
.content > i {
  width: 300px;
}
.content {
  // overflow: auto;
  width: 100%;
  flex-wrap: wrap;
  @include faj();
  // height: 650px;
  /* 和列表一样的宽度和margin值 */
  // justify-content: flex-start;
  // grid-template-columns: repeat(auto-fill, 300px);
  // grid-gap: 32px;
  &-item {
    @include wh(300px, 294px);
    @include borderRadius(3px);
    background: #ffffff;
    border: 1px solid #e9e9e9;
    margin-top: 20px;
    .item-img {
      height: 166px;
      background: #1890ff;
    }
  }
}
</style>
