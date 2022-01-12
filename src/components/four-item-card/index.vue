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
          :style="{ marginBottom: '24px' }"
        >
          <chart-card
            :loading="loading"
            title="啊手动阀实打实的"
            :total="15524"
          >
            <template #action>
              <a-tooltip title="asdasdasd">
                <ExclamationCircleOutlined />
              </a-tooltip>
            </template>

            <div>
              <trend
                flag="up"
                style="margin-right: 16px"
                term="周同比"
                :percentage="12"
              />
              <trend
                flag="down"
                term="日同比"
                :percentage="12"
                :type="false"
              />
            </div>
            <template #footer>
              地方萨芬撒旦士大夫
            </template>
          </chart-card>
        </a-col>
        <a-col
          :xs="24"
          :sm="24"
          :md="12"
          :xl="6"
          :style="{ marginBottom: '24px' }"
        >
          <!--  -->
          <chart-card
            :loading="loading"
            title="啊手动阀实打实的"
            :total="15524"
          >
            <template #action>
              <a-tooltip title="asdasdasd">
                <ExclamationCircleOutlined />
              </a-tooltip>
            </template>

            <div>
              <chart-line1 />
            </div>
            <template #footer>
              访问量 <span>60%</span>
            </template>
          </chart-card>
        </a-col>
        <!--  -->
        <a-col
          :xs="24"
          :sm="24"
          :md="12"
          :xl="6"
          :style="{ marginBottom: '24px' }"
        >
          <chart-card
            :loading="loading"
            title="啊手动阀实打实的"
            :total="15524"
          >
            <template #action>
              <a-tooltip title="asdasdasd">
                <ExclamationCircleOutlined />
              </a-tooltip>
            </template>

            <div>
              <chart-line2 />
            </div>
            <template #footer>
              地方萨芬撒旦士大夫
            </template>
          </chart-card>
          <!-- <evaluation-card
            :loading="loading"
          >
            <chart-line2 />
          </evaluation-card> -->
        </a-col>
        <!--  -->
        <a-col
          :xs="24"
          :sm="24"
          :md="12"
          :xl="6"
          :style="{ marginBottom: '24px' }"
        >
          <chart-card
            :loading="loading"
            title="啊手动阀实打实的"
            total="5655"
          >
            <template #action>
              <a-tooltip title="asdasdasd">
                <ExclamationCircleOutlined />
              </a-tooltip>
            </template>

            <div>
              <mini-progress
                color="rgb(19, 194, 194)"
                :target="80"
                :percentage="78"
                height="8px"
              />
            </div>
            <template #footer>
              地方萨芬撒旦士大夫
            </template>
          </chart-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import ChartLine1 from '@/components/chart-lint1/index.vue'
import ChartLine2 from '@/components/chart-lint2/index.vue'
import MiniProgress from '@/components/mini-progress/index.vue'
import ChartCard from '@/components/chart-card/index.vue'
import Trend from '@/components/trend/index.vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
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
