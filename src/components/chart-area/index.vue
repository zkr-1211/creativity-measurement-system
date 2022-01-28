<template>
  <div>
    <div id="myChart1" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  watch
  // getCurrentInstance,
  // ComponentInternalInstance
} from 'vue'
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 引入柱状图图表，图表后缀都为 Chart
import {
// BarChart,
// // 系列类型的定义后缀都为 SeriesOption
// BarSeriesOption,
// LineChart
// LineSeriesOption,
} from 'echarts/charts'
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  // TitleComponent,
  // // 组件类型的定义后缀都为 ComponentOption
  // TitleComponentOption,
  // TooltipComponent,
  // TooltipComponentOption,
  // GridComponent,
  GridComponentOption,
  // 数据集组件
  // DatasetComponent,
  DatasetComponentOption
  // 内置数据转换器组件 (filter, sort)
  // TransformComponent
} from 'echarts/components'
import { useStore } from '@/store'
// 标签自动布局，全局过渡动画等特性
// import { LabelLayout, UniversalTransition } from "echarts/features";
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
// import { CanvasRenderer } from "echarts/renderers";
// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  // | BarSeriesOption
  // | LineSeriesOption
  // | TitleComponentOption
  // | TooltipComponentOption
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
  // LineChart,
  // LabelLayout,
  // UniversalTransition,
  // CanvasRenderer,
])
export default defineComponent({
  name: 'MyChart1',
  props: {
    data: {
      type: Array,
      default: () => [210, 222, 532, 641, 220, 232, 421, 610, 222, 232, 641, 220, 232]
    }
  },
  setup(props, { emit }) {
    // const {
    //   appContext: {
    //     config: { globalProperties },
    //   },
    // } = getCurrentInstance() as ComponentInternalInstance;
    // const { appContext  } = getCurrentInstance()
    // console.log('globalProperties.$echarts=====',appContext)
    let myChart1
    function Init() {
      // 基于准备好的dom，初始化echarts实例
      myChart1 = echarts.init(document.getElementById('myChart1')!)

      const option: ECOption = {
        xAxis: {
          show: false,
          type: 'category',
          boundaryGap: false
        },
        yAxis: {
          show: false,
          type: 'value',
          splitLine: {
            show: false
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        series: <any>[
          {
            data: props.data,
            name: 'Fake Data',
            type: 'line',
            symbol: 'none',
            itemStyle: {
              color: '#8543E0'
            },
            areaStyle: {
              color: '#8543E0'
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
      myChart1.setOption(option)
      window.addEventListener('resize', () => {
        myChart1.resize()
      })
    }
    const store = useStore()
    watch(() => store.collapsed, () => {
      setTimeout(() => {
        myChart1.resize()
      }, 150)
    })
    onBeforeUnmount(() => {
      myChart1.dispose()
    })
    onMounted(() => {
      Init()
    })
  }
})
</script>
<style lang="scss" scoped>
#myChart1 {
  width: 100%;
  height: 0.4rem;
}
</style>
