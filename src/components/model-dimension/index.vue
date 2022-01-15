<template>
  <div>
    <div id="myChart" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  getCurrentInstance,
  ComponentInternalInstance,
  watch
} from 'vue'
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 引入柱状图图表，图表后缀都为 Chart
import {
  // BarChart,
  RadarChart,
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
  LegendComponent,
  GridComponentOption,
  // 数据集组件
  DatasetComponent,
  DatasetComponentOption,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent
} from 'echarts/components'
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'
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
  // BarChart,
  LegendComponent,
  LineChart,
  RadarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
])
export default defineComponent({
  name: 'MyChart',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    grade: {
      type: Array,
      default: () => [23.0, 42.9, 72.0, 77.2, 75.6]
    },
    indicator: {
      type: Array,
      default: () => [
        { name: '引用', max: 10000 },
        { name: '口碑', max: 16000 },
        { name: '热度', max: 38000 },
        { name: '贡献', max: 52000 },
        { name: '产量', max: 58000 },
        { name: '自信', max: 58000 }
      ]
    },
    colorList: {
      type: Array,
      default: () => ['red', 'blue', 'yellow']
    }
  },
  setup(props, { emit }) {
    let myChart
    function Init() {
      myChart = echarts.init(document.getElementById('myChart')!)
      // 基于准备好的dom，初始化echarts实例

      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          // data: ['Allocated Budget', 'Actual Spending']
        },
        radar: {
          // shape: 'circle',
          indicator: props.indicator,
          axisName: {
            formatter: '{value}',
            color: '#000000'
          }
        },
        series: [
          {
            tooltip: {
              trigger: 'item'
            },
            name: 'A Software',
            type: 'radar',
            data: props.data
          }
        ]
      })
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    }
    watch(() => props.indicator, () => {
      myChart && myChart.dispose()
      Init()
    })
    onMounted(() => {
      setTimeout(() => {
        Init()
      })
    })
  }
})
</script>
<style lang="scss" scoped>
#myChart {
  width: 100%;
  height: 4rem;
}
</style>
