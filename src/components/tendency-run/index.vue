<!--  -->
<template>
  <div class="body">
    <div class="tendency-run">
      <div class="tendency-run-header">
        <!--  -->
        <a-tabs
          v-model:activeKey="activeKey"
          class="a-tabs"
        >
          <a-tab-pane
            key="1"
            tab="测评人数"
          >
            <div class="content">
              <div class="evaluation-trend-chart">
                <chart-line3 />
              </div>
              <div class="organization-run">
                <div class="organization-title">
                  机构测评人数排名
                </div>
                <div
                  v-for="(item, index) in 7"
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
                      工专路三号店
                    </div>
                  </div>
                  <div class="run-num">
                    <count-to
                      :start-val="0"
                      :end-val="2017"
                      :duration="1000"
                    />
                  </div>
                </div>
              </div>
            </div>
          </a-tab-pane>
          <a-tab-pane
            key="2"
            tab="访问量"
          />
          <template #tabBarExtraContent>
            <div class="tabbar-right">
              <div class="select-day">
                <span
                  v-for="(item) in dateList"
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
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, defineComponent, ref, reactive } from 'vue'
import ChartLine3 from '@/components/chart-lint3/index.vue'
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN'
import CountTo from '@/components/vue-count-to/index.vue'

export default defineComponent({
  name: 'TendencyRun',
  components: { ChartLine3, CountTo },
  setup() {
    onMounted(() => {
    })
    const activeKey = ref('1')
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
    const selectDay = id => {
      activeDate.value = id
    }
    return {
      pickerValue,
      locale,
      dateList,
      activeKey,
      activeDate,
      selectDay
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/css/mixin';
 .tendency-run {
    @include wh(100%, 4.1rem);
    @include borderRadius(0.03rem);
    background: #ffffff;
    margin-bottom: 0.24rem;
    .tendency-run-header {
      @include wh(100%, 0.68rem);
      position: relative;
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
      .a-tabs {
        padding-left: 0.2rem;
        padding-right: 0.2rem;
      }
    }
    .content {
      padding: 0.1rem;
      display: flex;
      width: 100%;
      .evaluation-trend-chart {
        flex: 1;
      }
      .organization-run {
        width: 3.5rem;
        font-size: 0.14rem;
        color: rgba(0, 0, 0, 0.65);
        margin-left: 0.2rem;
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
  }
</style>
