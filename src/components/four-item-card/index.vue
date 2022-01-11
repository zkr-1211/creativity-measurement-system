<!--  -->
<template>
  <div class="body">
    <div class="top-total">
      <a-row :gutter="24">
        <a-col
          :xs="24"
          :sm="24"
          :md="12"
          :xl="6"
        >
          <evaluation-card :loading="loading">
            <div class="link-relative-ratio">
              <div class="relative-ratio">
                周同比
                <span>12%</span>
                <CaretUpOutlined />
              </div>
              <div class="relative-ratio">
                日环比
                <span>12%</span>
                <CaretDownOutlined />
              </div>
            </div>
          </evaluation-card>
        </a-col>
        <a-col
          :xs="24"
          :sm="24"
          :md="12"
          :xl="6"
        >
          <!--  -->
          <evaluation-card
            :loading="loading"
          >
            <chart-line1 />
          </evaluation-card>
        </a-col>
        <!--  -->
        <a-col
          :xs="24"
          :sm="24"
          :md="12"
          :xl="6"
        >
          <evaluation-card
            :loading="loading"
          >
            <chart-line2 />
          </evaluation-card>
        </a-col>
        <!--  -->
        <a-col
          :xs="24"
          :sm="24"
          :md="12"
          :xl="6"
        >
          <evaluation-card
            :loading="loading"
          >
            <div class="progress">
              <a-progress
                :percent="50"
                :show-info="false"
                stroke-color="#13C2C2"
              />
            </div>
          </evaluation-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons-vue'
import ChartLine1 from '@/components/chart-lint1/index.vue'
import ChartLine2 from '@/components/chart-lint2/index.vue'
import EvaluationCard from '@/views/home/components/EvaluationCard.vue'

const loading = ref<boolean>(true)
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 3000)
})
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin";
.top-total {
  // @include faj();
  .link-relative-ratio {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    height: 0.4rem;
    font-size: 0.17rem;
    .relative-ratio {
      color: rgba(0, 0, 0, 0.65);
      span {
        margin-left: 0.05rem;
        color: #000000;
      }
    }
  }
  .progress {
    display: flex;
    align-items: flex-end;
    @include wh(100%, 0.4rem);
  }
}
</style>
