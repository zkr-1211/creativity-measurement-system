<template>
  <div class="home">
    <!-- 第一部分 -->
    <FourItemCard />
    <!-- <four-item-card></four-item-card> -->
    <!-- 第二部分 -->
    <tendency-run />
    <!-- 第三部分 -->
    <div class="run-list">
      <runList-card class="box1">
        <template #header>
          <CaretUpOutlined style="font-size: 20px; margin-right: 15px" />
          <CaretDownOutlined style="font-size: 20px" />
        </template>

        <template #center>
          <div class="evaluation-row">
            <div class="evaluation-today">
              <div class="evaluation-today-title">
                今日增测评数
              </div>
              <div class="evaluation-today-num">
                12321 <span>17.1<CaretUpOutlined /></span>
              </div>
              <div class="slot">
                <chart-line4 />
              </div>
            </div>
            <div class="evaluation-today">
              <div class="evaluation-today-title">
                人均测评项目数
              </div>
              <div class="evaluation-today-num">
                2.7 <span>26.2<CaretDownOutlined /></span>
              </div>
              <div class="slot">
                <chart-line5 />
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
              {{ record.weeklyGains }}
              <CaretDownOutlined v-if="record.increase" />
              <CaretUpOutlined v-else />
            </template>
          </a-table>
        </template>
      </runList-card>
      <!--  -->
      <runList-card class="box2">
        <template #center>
          <div class="project-accounte">
            <project-accounte-chart title="开通测评项目占比" />
          </div>
        </template>
      </runList-card>
    </div>
    <!-- 第四部分 -->
    <div class="view-list">
      <runList-card class="box3 box">
        <template #center>
          <div
            v-for="(item, index) in 10"
            :key="index"
            class="view-list-item"
          >
            <div class="name-info">
              <div
                class="index"
                :class="[
                  index === 0 ? 'one' : '',
                  index === 2 ? 'three' : '',
                  index === 3 ? 'four' : '',
                  index === 1 ? 'two' : '',
                ]"
              >
                {{ index + 1 }}
              </div>
              <div class="title">
                心理健康
              </div>
            </div>
            <div class="progress">
              <a-progress
                :percent="50"
                :show-info="false"
                stroke-color="#3BA0FF"
                stroke-linecap="square"
              />
            </div>
            <div class="people">
              1234人
            </div>
          </div>
        </template>
      </runList-card>
      <!--  -->
      <runList-card class="box4 box">
        <template #center>
          <div
            v-for="(item, index) in 10"
            :key="index"
            class="view-list-item"
          >
            <div class="name-info">
              <div
                class="index"
                :class="[
                  index === 0 ? 'one' : '',
                  index === 1 ? 'two' : '',
                  index === 2 ? 'three' : '',
                  index === 3 ? 'four' : '',
                ]"
              >
                {{ index + 1 }}
              </div>
              <div class="title">
                心理健康
              </div>
            </div>
            <div class="progress">
              <a-progress
                :percent="50"
                :show-info="false"
                stroke-color="#3BA0FF"
                stroke-linecap="square"
              />
            </div>
            <div class="people">
              1234人
            </div>
          </div>
        </template>
      </runList-card>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, defineComponent, ref } from 'vue'
import { useStore } from '@/store'
import { storeToRefs } from 'pinia'

import {
  // ArrowUpOutlined,
  // ArrowDownOutlined,
  CaretUpOutlined,
  CaretDownOutlined
  // EllipsisOutlined,
  // DownOutlined
} from '@ant-design/icons-vue'
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN'
// import ChartLine from '@/components/chart-lint/index.vue'
import ChartLine4 from '@/components/chart-lint4/index.vue'
import ChartLine5 from '@/components/chart-lint5/index.vue'
import ProjectAccounteChart from '@/components/project-accounte-chart/index.vue'
import RunListCard from '@/components/run-list-card/index.vue'
// import CountTo from '@/components/vue-count-to/index.vue'
import TendencyRun from '@/components/tendency-run/index.vue'
import FourItemCard from '@/components/four-item-card/index.vue'

const columns = [
  // {
  //   title: '排名',
  //   dataIndex: 'key',
  //   sorter: (a: { key: number }, b: { key: number }) => a.key - b.key
  // },
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
    defaultSortOrder: 'descend'
    // sorter: (a: { userNum: number }, b: { userNum: number }) => a.userNum - b.userNum
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
const data = [
  {
    key: '1',
    evaluationName: 'John Brown',
    userNum: 32,
    weeklyGains: '120%',
    increase: true
  },
  {
    key: '2',
    evaluationName: 'Jim Green',
    userNum: 42,
    weeklyGains: '120%',
    increase: false
  },
  {
    key: '3',
    evaluationName: 'Joe Black',
    userNum: 32,
    weeklyGains: '120%',
    increase: true
  },
  {
    key: '4',
    evaluationName: 'Jim Red',
    userNum: 32,
    weeklyGains: '120%',
    increase: false
  }
]
export default defineComponent({
  name: 'HomePage',
  components: {
    // ChartLine,
    ChartLine4,
    ChartLine5,
    ProjectAccounteChart,
    RunListCard,
    // ArrowUpOutlined,
    // ArrowDownOutlined,
    CaretUpOutlined,
    CaretDownOutlined,
    // EllipsisOutlined,
    // DownOutlined,
    // CountTo,
    TendencyRun,
    FourItemCard
  },
  setup() {
    const current = ref(['evaluationNum'])
    const store = useStore()
    const storeRefs = storeToRefs(store)
    const { userInfo, token } = storeRefs
    store.$patch((state) => {
      state.userInfo = { name: 'ZHANG_KE_RONG', age: '22' }
      state.token = 'token-asgdfebdvvadfsdfgdfh'
    })
    onMounted(() => {
      console.log('userInfo', userInfo.value)
      console.log('token', token.value)
    })
    const onChange = (pagination: any, filters: any, sorter: any) => {
      console.log('params', pagination, filters, sorter)
    }
    return {
      locale,
      current,
      data,
      columns,
      onChange
    }
  }
})
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin";
.home {
  // width: 100%;
  // @include wh();
  margin: 24px;
  .run-list {
    display: flex;
    .box1 {
      width: 50%;
    }
    .box2 {
      width: 50%;
      margin-left: 0.24rem;
      overflow: hidden;
      .project-accounte {
        margin-top: 0.1rem;
      }
    }
    .evaluation-row {
      @include faj();
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
  }
  .view-list {
    margin-top: 0.24rem;
    display: flex;
    .box3 {
      width: 50%;
    }
    .box4 {
      width: 50%;
      margin-left: 0.24rem;
    }
    .box {
      width: 50%;
      .view-list-item {
        @include faj();
        height: 0.43rem;
        font-size: 0.16rem;
        .name-info {
          display: flex;
          @include tb(1.8rem);
          .one {
            color: #3ba0ff !important;
          }
          .two {
            color: #36cbcb !important;
          }
          .three {
            color: #4dcb73 !important;
          }
          .four {
            color: #fad337 !important;
          }
          .index {
            width: 0.2rem;
            font-weight: 600;
            color: #000000;
          }
          .title {
            margin-left: 0.1rem;
            color: rgba(0, 0, 0, 0.65);
          }
        }
        .progress {
          width: 60%;
        }
        .people {
          max-width: 0.8rem;
          color: rgba(0, 0, 0, 0.65);
        }
      }
    }
    .view-list-item {
      // display: flex;
      align-items: center;
    }
  }
}
</style>
