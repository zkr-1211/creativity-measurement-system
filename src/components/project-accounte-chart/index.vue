<template>
  <div class="body">
    <div id="ProjectAccounte" />
    <div class="info">
      <div
        v-for="(item, index) in 5"
        :key="index"
        class="info-item"
      >
        <div class="info-item-left">
          <span
            :class="[
              index === 0 ? 'a' : '',
              index === 1 ? 'b' : '',
              index === 2 ? 'c' : '',
              index === 3 ? 'd' : '',
              index === 4 ? 'e' : '',
              index === 5 ? 'f' : '',
            ]"
          />
          <span>AAA </span>
          <span>| </span>
          <span>36%</span>
        </div>
        <div class="info-item-right">
          390个
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 引入柱状图图表，图表后缀都为 Chart
import {
  // BarChart,
  PieChart,
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineChart
  // LineSeriesOption,
} from 'echarts/charts'
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  // 数据集组件
  DatasetComponent,
  DatasetComponentOption,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent,
  LegendComponent
} from 'echarts/components'
// 标签自动布局，全局过渡动画等特性
// import { LabelLayout, UniversalTransition } from "echarts/features";
// // 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
// import { CanvasRenderer } from "echarts/renderers";
// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  // | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>;
// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  PieChart,
  LineChart,
  // LabelLayout,
  // UniversalTransition,
  // CanvasRenderer,
  LegendComponent
])
export default defineComponent({
  name: 'ProjectAccounte',
  props: {
    date: {
      type: Array,
      default: () => ['1月', '2月', '3月', '4月']
    },
    title: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    function Init() {
      // 基于准备好的dom，初始化echarts实例
      const ProjectAccounte = echarts.init(
        document.getElementById('ProjectAccounte')!
      )

      // 绘制图表
      ProjectAccounte.setOption({
        color: [
          '#975FE5',
          '#F2637B',
          '#FBD437',
          '#4ECB73',
          '#36CBCB',
          '#3AA1FF'
        ],
        title: {
          text: props.title
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          show: false,
          orient: 'horization',
          itemGap: 14,
          top: '40%',
          left: 230
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['50%', '70%'],
            // center: ['20%', '70%'],
            center: [120, 180],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 0,
              borderColor: '#fff',
              borderWidth: 5
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              normal: {
                show: true,
                position: 'center'
                // formatter: function() {
                //   return props.date
                // }
              },
              label: {
                show: true,
                fontSize: '25',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: `Search Engine` },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ]
          }
        ],
        grid: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 0
        }
      })
      window.addEventListener('resize', () => {
        ProjectAccounte.resize()
      })
    }
    onMounted(() => {
      setTimeout(() => {
        Init()
      })
    })
  }
})
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin";

.body {
  position: relative;
}
.info {
  position: absolute;
  left: 3.2rem;
  top: 28%;
  @media screen and (max-width: 1550px) and (min-width: 1200px){
    left: 2.7rem !important;
  }
   @media screen and (max-width: 1200px) {
    left: 5rem !important;
  }
   @media screen and (max-width: 800px) {
    left: 3rem !important;
  }
  .info-item {
    display: flex;
    align-items: center;
    right: 0;
    height: 0.4rem;
    &-left {
      @include sc(0.18rem, rgba(0, 0, 0, 0.45));
      span:nth-of-type(1) {
        @include wh(0.1rem, 0.1rem);
        @include borderRadius(50%);
        display: inline-block;
        margin-right: 0.1rem;
      }
      span:nth-of-type(2) {
        display: inline-block;
        min-width: 0.56rem;
        height: 0.2rem;
        font-family: PingFangSC-Regular;
        color: rgba(0, 0, 0, 0.65);
      }
      span:nth-of-type(4) {
        margin-left: 0.05rem;
      }
    }
    &-right {
      @include sc(0.18rem, rgba(0, 0, 0, 0.65));
      margin-left: 30px;
      font-weight: bold;
      white-space: nowrap;
    }
  }
}
#ProjectAccounte {
  @include wh(100%, 300px);
}
.a {
  background: #975fe5;
}
.b {
  background: #f2637b;
}
.c {
  background: #fbd437;
}
.d {
  background: #4ecb73;
}
.e {
  background: #36cbcb;
}
.f {
  background: #3aa1ff;
}
</style>
