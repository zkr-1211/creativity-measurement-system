<!--  -->
<template>
  <a-card
    :loading="loading"
    style="width: 100%"
    :tab-list="tabListNoTitle"
    :active-tab-key="noTitleKey"
    @tab-change="(key) => onTabChange(key, 'noTitleKey')"
  >
    <div
      v-if="noTitleKey === 'article'"
      class="content"
    >
      <a-row :gutter="24">
        <a-col
          :xs="24"
          :sm="24"
          :md="24"
          :xl="18"
          :style="{ marginBottom: '24px' }"
        >
          <div class="evaluation-trend-chart">
            <chart-bar :data="list[0]?.data" />
          </div>
        </a-col>

        <a-col
          :xs="24"
          :sm="24"
          :md="24"
          :xl="6"
          :style="{ marginBottom: '24px' }"
        >
          <div class="organization-run">
            <div class="organization-title">
              机构测评人数排名
            </div>
            <div
              v-for="(item, index) in list[1].list"
              :key="index"
              class="organization-item"
            >
              <div class="organization-item-left">
                <div
                  class="index"
                  :class="index <= 2 ? 'isThree' : ''"
                >
                  {{ index + 1 }}
                </div>
                <div class="organization-name">
                  {{ item.title }}
                </div>
              </div>
              <div class="run-num">
                <count-to
                  :start-val="0"
                  :end-val="item.conut"
                  :duration="1000"
                />
              </div>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
    <p v-else-if="noTitleKey === 'app'">
      访问量
    </p>
    <template #tabBarExtraContent>
      <div class="tabbar-right">
        <div class="select-day">
          <span
            v-for="item in dateList"
            :key="item.id"
            :class="activeDate === item.id ? 'activeDate' : ''"
            @click="selectDay(item.id)"
          >{{ item.name }}</span>
        </div>
        <div class="range-picker">
          <a-range-picker
            v-model:value="pickerValue"
            :locale="locale"
          />
        </div>
        <slot />
      </div>
    </template>
  </a-card>
</template>

<script lang="ts">
import { onMounted, defineComponent, ref, reactive, defineAsyncComponent } from 'vue'
const ChartBar = defineAsyncComponent(() => import('@/components/chart-bar/index.vue'))

// import ChartBar from '@/components/chart-bar/index.vue'
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN'
import CountTo from '@/components/vue-count-to/index.vue'
import { getTendencyRun } from '@/api'

export default defineComponent({
  name: 'TendencyRun',
  components: { ChartBar, CountTo },
  setup() {
    const SkeletonParagraphProps = reactive({
      rows: 10
    })
    const loading = ref<boolean>(true)
    onMounted(() => {
      __getTendencyRun()
    })
    const list:any = ref([])
    async function __getTendencyRun() {
      try {
        const { data } = await getTendencyRun()
        list.value = data.list
        console.log('123123', list.value)
        loading.value = false
      } catch (error) {}
    }

    const tabListNoTitle = [
      {
        key: 'article',
        tab: '测评人数'
      },
      {
        key: 'app',
        tab: '访问量'
      }
    ]
    const key = ref('tab1')
    const noTitleKey = ref('article')
    const onTabChange = (value: string, type: string) => {
      console.log(value, type)
      if (type === 'key') {
        key.value = value
      } else if (type === 'noTitleKey') {
        noTitleKey.value = value
      }
    }
    const pickerValue = ref([])
    const dateList = reactive([
      {
        id: 0,
        name: '今日'
      },
      {
        id: 1,
        name: '本周'
      },
      {
        id: 2,
        name: '本月'
      },
      {
        id: 3,
        name: '全年'
      }
    ])
    const activeDate = ref(0)
    // 点击选择日期
    const selectDay = (id) => {
      activeDate.value = id
    }
    return {
      pickerValue,
      locale,
      dateList,
      activeDate,
      selectDay,
      noTitleKey,
      SkeletonParagraphProps,
      loading,
      tabListNoTitle,
      onTabChange,
      list
    }
  }
})
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin";
.tabbar-right {
  display: flex;
  align-items: center;
  .select-day {
    .activeDate {
      color: #1890ff !important;
    }
    span {
      cursor: pointer;
      margin-right: 0.3rem;
      font-size: 0.14rem;
      color: rgba(0, 0, 0, 0.65);
    }
  }
}
.content {
  width: 100%;
  .evaluation-trend-chart {
    flex: 1;
  }
  .organization-run {
    font-size: 0.14rem;
    color: rgba(0, 0, 0, 0.65);
    .organization-title {
      font-size: 0.16rem;
      font-weight: bold;
      color: rgba(0, 0, 0, 0.85);
      margin-bottom: 0.1rem;
    }
    .organization-item {
      @include faj();
      @include wh(100%, 0.42rem);
      .isThree {
        @include borderRadius(50%);
        background: #314659 !important;
        color: #fff;
      }
      .organization-item-left {
        display: flex;
        align-items: center;
        .index {
          background: #f0f2f5;
          @include wh(0.2rem, 0.2rem);
          @include borderRadius(50%);
          @include faj(center, center);
        }
        .organization-name {
          margin-left: 0.3rem;
          width: 1.4rem;
          text-align: left;
        }
      }
    }
  }
}
</style>
