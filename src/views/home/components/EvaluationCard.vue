<template>
  <div class="body">
    <div class="evaluation-total">
      <div class="evaluation-top">
        <div class="evaluation-top-total">
          测评总人数
        </div>
        <div class="evaluation-top-tip">
          <ExclamationCircleOutlined />
        </div>
      </div>

      <a-skeleton
        active
        :loading="loading"
      >
        <div class="evaluation-num">
          <count-to
            :start-val="0"
            :end-val="2017"
            :duration="3000"
          />
        </div>
        <div class="slot">
          <slot />
        </div>
        <div class="evaluation-bottom">
          日均测评数：
          <span>123123</span>
        </div>
      </a-skeleton>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted, defineComponent, defineAsyncComponent } from 'vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
const CountTo = defineAsyncComponent(() => import('@/components/vue-count-to/index.vue'))

// import CountTo from '@/components/vue-count-to/index.vue'
export default defineComponent({
  name: 'EvaluationCard',
  components: {
    CountTo,
    ExclamationCircleOutlined
  },
  props: {
    loading: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const data = reactive({})
    onMounted(() => {})
    const refData = toRefs(data)
    return {
      ...refData
    }
  }
})
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin";
.body {
  overflow: hidden;
  .evaluation-total {
    @include wh(100%, 1.88rem);
    @include borderRadius(0.02rem);
    padding: 0.2rem;
    background: #ffffff;
    color: #333333;
    margin-bottom: 0.24rem;
    .evaluation-top {
      @include faj();
      .evaluation-top-total {
        @include sc(0.14rem, rgba(0, 0, 0, 0.45));
      }
    }
    .evaluation-num {
      max-height: 0.3rem;
      @include sc(0.3rem, rgba(0, 0, 0, 0.85));
    }
    .slot {
      @include wh(100%, 0.4rem);
      margin-bottom: 0.2rem;
      margin-top: 0.15rem;
      overflow: hidden;
      white-space: nowrap;
    }
    .evaluation-bottom {
      white-space: nowrap;
      border-top: 0.01rem solid #e8e8e8;
      padding: 0.1rem;
      @include sc(0.14rem, rgba(0, 0, 0, 0.65));
      span {
        color: #000000;
      }
    }
  }
}
</style>
