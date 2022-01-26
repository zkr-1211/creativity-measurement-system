<template>
  <a-card
    :loading="loading"
    title="测评项目参与排行"
    style="width: 100%"
  >
    <template #extra>
      <CaretUpOutlined style="font-size: 20px; margin-right: 15px" />
      <CaretDownOutlined style="font-size: 20px; margin-right: 15px" />
      <EllipsisOutlined style="font-size: 20px" />
    </template>
    <div class="evaluation-row">
      <div class="evaluation-today">
        <div class="evaluation-today-title">
          今日增测评数
        </div>
        <div class="evaluation-today-num">
          12321 <span><trend
            flag="up"
            style="margin-right: 16px"
            :percentage="17.8"
          /></span>
        </div>
        <div class="slot">
          <ChartAreaRank1 />
        </div>
      </div>
      <div class="evaluation-today">
        <div class="evaluation-today-title">
          人均测评项目数
        </div>
        <div class="evaluation-today-num">
          2.7 <span><trend
            flag="up"
            style="margin-right: 16px"
            :percentage="26.2"
            :type="false"
          /></span>
        </div>
        <div class="slot">
          <ChartAreaRank2 />
        </div>
      </div>
    </div>
    <a-table
      :columns="columns"
      :data-source="data"
      :pagination="{ pageSize: 4 }"
      @change="onChange"
    >
      <template #evaluationName="{ text }">
        <a>{{ text }}</a>
      </template>
      <template #weeklyGains="{ record }">
        <!-- {{ record.weeklyGains }} -->
        <trend
          flag="up"
          style="margin-right: 16px"
          :percentage="`${record.weeklyGains}%`"
          :type="record.increase"
        />
      </template>
    </a-table>
  </a-card>
</template>

<script lang="ts" setup>
// import ChartAreaRank1 from '@/components/chart-area-rank1/index.vue'
// import ChartAreaRank2 from '@/components/chart-area-rank2/index.vue'
import { CaretUpOutlined, CaretDownOutlined, EllipsisOutlined } from '@ant-design/icons-vue'
import { ref, onMounted, defineAsyncComponent } from 'vue'
import Trend from '@/components/trend/index.vue'
const ChartAreaRank1 = defineAsyncComponent(() => import('@/components/chart-area-rank1/index.vue'))
const ChartAreaRank2 = defineAsyncComponent(() => import('@/components/chart-area-rank2/index.vue'))
// const Trend = defineAsyncComponent(() => import('@/components/trend/index.vue'))

const columns = [
  {
    title: '排名',
    dataIndex: 'key'
  },
  {
    title: '测评名称',
    dataIndex: 'evaluationName',
    slots: {
      customRender: 'evaluationName'
    }
  },
  {
    title: '用户数',
    dataIndex: 'userNum',
    defaultSortOrder: 'descend',
    sorter: (a: { userNum: number }, b: { userNum: number }) => a.userNum - b.userNum

  },
  {
    title: '周涨幅',
    dataIndex: 'weeklyGains',
    filterMultiple: false,
    slots: {
      customRender: 'weeklyGains'
    },
    // onFilter: (value: any, record: { weeklyGains: string | any[] }) => record.weeklyGains.indexOf(value) === 0,
    sorter: (
      a: { weeklyGains: string | any[] },
      b: { weeklyGains: string | any[] }
    ) => a.weeklyGains.length - b.weeklyGains.length,
    sortDirections: ['descend', 'ascend']
  }
]
interface dataType {
  key: string;
  evaluationName: string;
  weeklyGains: string;
  userNum: string;
  increase: boolean;
}
const data:dataType[] = []
for (let i = 1; i < 50; i++) {
  data.push(
    {
      key: `${i}`,
      evaluationName: `John Brown${i}`,
      userNum: `${i}`,
      weeklyGains: `${i}`,
      increase: i % 2 === 0
    }
  )
}
const onChange = (pagination: any, filters: any, sorter: any) => {
  console.log('params', pagination, filters, sorter)
}
const loading = ref<boolean>(true)
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 500)
})
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin";
.evaluation-row {
  @include faj();
  flex-wrap: wrap;
  width: 100%;
  // margin-bottom: 0.24rem;
  .evaluation-today {
    overflow: hidden;
    height: 1.2rem;
    &-title {
      @include sc(0.14rem, rgba(0, 0, 0, 0.45));
    }
    &-num {
      font-weight: bold;
      @include sc(0.24rem, rgba(0, 0, 0, 0.85));
      span {
        margin-left: 0.2rem;
        @include sc(0.14rem, rgba(0, 0, 0, 0.45));
      }
    }
    .slot {
      width: 3rem;
    }
  }
}
</style>
