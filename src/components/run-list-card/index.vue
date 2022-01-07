<template>
  <div class="body">
    <div class="run-list-card">
      <div class="header">
        <div class="title">
          测评项目参与排行
        </div>
        <div class="right-content">
          <slot name="header" />
          <EllipsisOutlined style="font-size:20px;margin-left:15px;" />
        </div>
      </div>
      <div class="center">
        <slot name="center" />
      </div>
      <div class="footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, defineComponent } from 'vue'
import { EllipsisOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  name: 'RunListCard',
  components: {
    EllipsisOutlined
  },
  setup() {
    onMounted(() => {})
    return {}
  }
})
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin";
.run-list-card {
  @include wh(100%, 5.55rem);
  @include borderRadius(0.03rem);
  background: #ffffff;
  color: #333333;
  display: flex;
  flex-direction: column;
  .header {
    @include faj();
    @include wh(100%, 0.68rem);
    border-bottom: 0.01rem solid #e8e8e8;
    padding: 0.32rem;
    .right-content{
    @include faj();
    }
    .title {
      @include sc(0.16rem, rgba(0, 0, 0, 0.85));
      font-weight: bold;
    }
  }
  .center {
    padding: 0.32rem;
    flex: 1;
  }
  .footer {
    padding: 0.32rem;
    @include wh(100%, 0.5rem);
    padding-top: 0.1rem;
    text-align: right;
  }
}
</style>
