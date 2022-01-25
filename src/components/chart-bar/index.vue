<template>
  <div>
    <div id="myChart3" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  watch
  // getCurrentInstance,
  // ComponentInternalInstance
} from 'vue'
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 引入柱状图图表，图表后缀都为 Chart
import {
  BarChart,
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
import { useStore } from '@/store'
// 标签自动布局，全局过渡动画等特性
// import { LabelLayout, UniversalTransition } from "echarts/features";
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
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
  // TitleComponent,
  // TooltipComponent,
  // GridComponent,
  // DatasetComponent,
  // TransformComponent,
  BarChart
  // LabelLayout,
  // UniversalTransition,
  // CanvasRenderer,
])
export default defineComponent({
  name: 'MyChart3',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { emit }) {
    // const { appContext: { config: { globalProperties }}} = getCurrentInstance() as ComponentInternalInstance;
    // const { appContext  } = getCurrentInstance()
    // console.log("globalProperties.$echarts=====",echarts);

    function Init() {
      // 基于准备好的dom，初始化echarts实例
      // const myChart3 = globalProperties.$echarts.init(
      //   document.getElementById("myChart3")
      // );
      const myChart3 = echarts.init(document.getElementById('myChart3')!)

      const option: ECOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        title: {
          text: '测评人数趋势'
        },
        xAxis: <any>{
          type: 'category',
          axisLine: {
            show: false
          },
          axisTick: <object>{
            alignWithLabel: true,
            lineStyle: {
              color: '#E8E8E8',
              marginTop: '20px'
            }
          },
          data: props.data.datay
        },
        yAxis: [
          {
            type: 'value',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: <any>[
          {
            data: props.data.datax,
            name: 'asdasfa',
            type: 'bar',
            barWidth: '32px',
            itemStyle: {
              color: '#1890FF'
            }
          }
        ],
        grid: <any>{
          x: 30,
          // y: 0,
          x2: 0
          // y2: 0
        }
      }
      myChart3.setOption(option)

      // 绘制图表
      window.addEventListener('resize', () => {
        myChart3.resize()
      })
      const store = useStore()
      watch(
        () => store.collapsed,
        () => {
          // myChart3 && myChart3.dispose()
          // Init()
          myChart3.resize()
        },
        {
          immediate: true
        }
      )
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
#myChart3 {
  width: 95%;
  height: 3.8rem;
}
</style>
