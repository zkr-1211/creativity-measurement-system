<template>
  <div>
    <div id="myChart" />
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
  BarChart,
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  // LineChart,
  LineSeriesOption
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
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
// import { CanvasRenderer } from "echarts/renderers";
// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
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
  BarChart,
  // LabelLayout,
  // UniversalTransition,
  // CanvasRenderer,
  LegendComponent
])
export default defineComponent({
  name: 'ChartLine',
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
    // const { appContext: { config: { globalProperties }}} = getCurrentInstance() as ComponentInternalInstance
    function Init() {
      // 基于准备好的dom，初始化echarts实例
      // const myChart = globalProperties.$echarts.init(document.getElementById('myChart'))
      const myChart = echarts.init(document.getElementById('myChart')!)
      // 绘制图表
      const option: ECOption = {
        // 添加横线滚动条
        dataZoom: {
          start: 0, // 默认为0
          end: 50, // 默认为100
          type: 'slider',
          show: true,
          xAxisIndex: [0],
          handleSize: 0, // 滑动条的 左右2个滑动条的大小
          height: 8, // 组件高度
          //   top:50,
          left: 90, // 左边的距离
          right: 90, // 右边的距离
          bottom: 20, // 右边的距离
          handleColor: '#000', // h滑动图标的颜色
          backgroundColor: '#FAFAFA',
          fillerColor: '#5592FE',
          handleStyle: {
            borderColor: '#FAFAFA',
            borderWidth: '1',
            shadowBlur: 2,
            background: '#FAFAFA',
            shadowColor: '#FAFAFA'
          }
        },
        tooltip: {
          // trigger: 'axis',
          // axisPointer: {
          //     type: 'cross',
          //     crossStyle: {
          //         color: '#999'
          //     }
          // }
        },
        // toolbox: {
        //     feature: {
        //         dataView: {show: true, readOnly: false},
        //         magicType: {show: true, type: ['line', 'bar']},
        //         restore: {show: true},
        //         saveAsImage: {show: true}
        //     }
        // },
        legend: {
          data: ['访问量', '学习时长'],
          left: '50'
        },
        xAxis: [
          {
            type: 'category',
            data: <string[]>props.date,
            axisPointer: {
              type: 'shadow'
            },
            axisLine: {
              // y轴
              show: false
            },
            axisTick: {
              // y轴刻度线
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            min: 0,
            max: 100,
            interval: 20,
            offset: 0,
            axisLabel: {
              formatter: '{value}'
            },
            axisLine: {
              // y轴
              show: false
            },
            axisTick: {
              // y轴刻度线
              show: false
            }
          },
          {
            type: 'value',
            min: 0,
            max: 100,
            interval: 20,
            offset: 0,
            axisLabel: {
              formatter: '{value} min'
            },
            axisLine: {
              // y轴
              show: false
            },
            axisTick: {
              // y轴刻度线
              show: false
            }
          }
        ],
        series: [
          {
            name: '访问量',
            type: 'bar',
            barWidth: 20,
            data: <number[]>props.grade,
            barGap: '0',
            itemStyle: <never>{
              normal: {
                color: '#5592FE',
                label: {
                  //   show: true,
                  //   position: "top",
                }
              }
            }
          },
          {
            name: '学习时长',
            type: 'bar',
            barWidth: 20,
            data: [23.0, 42.9, 72.0, 77.2, 75.6],
            barGap: '0',
            itemStyle: <never>{
              normal: {
                color: '#FFBC13'
                // label: {
                //   //   show: true,
                //   //   position: "bottom",
                // }
              }
            }
          }
        ]
      }
      myChart.setOption({ option })
      window.addEventListener('resize', () => {
        myChart.resize()
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
#myChart {
  width: 100%;
  // width: 100%;
  height: 0.6rem;
}
</style>
