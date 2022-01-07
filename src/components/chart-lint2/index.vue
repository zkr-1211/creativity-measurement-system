<template>
  <div>
    <div id="myChart2" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted
  // getCurrentInstance,
  // ComponentInternalInstance
} from 'vue'
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 引入柱状图图表，图表后缀都为 Chart
import {
  // BarChart,
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption
  // LineChart,
  // LineSeriesOption,
} from 'echarts/charts'
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  // TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  // TooltipComponent,
  TooltipComponentOption,
  // GridComponent,
  GridComponentOption,
  // 数据集组件
  // DatasetComponent,
  DatasetComponentOption
  // 内置数据转换器组件 (filter, sort)
  // TransformComponent
} from 'echarts/components'
// 标签自动布局，全局过渡动画等特性
// import { LabelLayout, UniversalTransition } from "echarts/features";
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
  // TitleComponent,
  // TooltipComponent,
  // GridComponent,
  // DatasetComponent,
  // TransformComponent,
  // BarChart,
  // LabelLayout,
  // UniversalTransition,
  CanvasRenderer
])
export default defineComponent({
  name: 'MyChart2',
  props: {
    date: {
      type: Array,
      default: () => ['1月', '2月', '3月', '4月']
    },
    grade: {
      type: Array,
      default: () => [23.0, 42.9, 72.0, 77.2, 75.6]
    }
  },
  setup(props, { emit }) {
    function Init() {
      // 基于准备好的dom，初始化echarts实例
      // const myChart2 = globalProperties.$echarts.init(
      //   document.getElementById("myChart2")
      // );
      const myChart2 = echarts.init(document.getElementById('myChart2')!)
      const option: ECOption = {
        // 添加横线滚动条
        xAxis: {
          show: false,
          type: 'category'
        },
        yAxis: {
          show: false,
          type: 'value'
        },
        series: [
          {
            data: [
              120, 200, 150, 80, 70, 110, 130, 120, 250, 150, 80, 70, 110, 130,
              120, 200, 150, 80
            ],
            type: 'bar',
            itemStyle: {
              color: '#1890FF'
            }
          }
        ],
        grid: <any>{
          x: 0,
          y: 0,
          x2: 0,
          y2: 0
        }
      }
      // 绘制图表
      myChart2.setOption(option)
      window.addEventListener('resize', () => {
        myChart2.resize()
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
#myChart2 {
  width: 100%;
  // width: 100%;
  height: 0.4rem;
}
</style>
