<template>
  <div class="body">
    <div id="ProjectAccounte" />
    <div class="info">
      <div v-for="(item, index) in 5" :key="index" class="info-item">
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
          <span v-show="index === 0">心健康测评</span>
          <span v-show="index === 1">创造力测评</span>
          <span v-show="index === 2">同理心测评</span>
          <span v-show="index === 3">自制力测评</span>
          <span v-show="index === 4">逻辑力测评</span>
          <span> | </span>
          <span>36%</span>
        </div>
        <div class="info-item-right">390个</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, watch } from "vue";
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from "echarts/core";
// 引入柱状图图表，图表后缀都为 Chart
import {
  // BarChart,
  PieChart,
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineChart,
  // LineSeriesOption,
} from "echarts/charts";
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
  LegendComponent,
} from "echarts/components";
import { useStore } from "@/store";
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
  LegendComponent,
]);
export default defineComponent({
  name: "ProjectAccounte",
  props: {
    date: {
      type: Array,
      default: () => ["1月", "2月", "3月", "4月"],
    },
    title: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    // 基于准备好的dom，初始化echarts实例
    let ProjectAccounte;
    function Init() {
      ProjectAccounte = echarts.init(
        document.getElementById("ProjectAccounte")!
      );
      // 绘制图表
      ProjectAccounte.setOption({
        color: [
          "#975FE5",
          "#F2637B",
          "#FBD437",
          "#4ECB73",
          "#36CBCB",
          "#3AA1FF",
        ],
        title: {
          text: props.title,
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          show: false,
          orient: "horization",
          itemGap: 14,
          top: "40%",
          left: 230,
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["50%", "70%"],
            // center: ['20%', '70%'],
            center: [280, 170],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 0,
              borderColor: "#fff",
              borderWidth: 5,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              normal: {
                show: true,
                position: "center",
                // formatter: function() {
                //   return props.date
                // }
              },
              label: {
                show: true,
                fontSize: "25",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: `心健康测评` },
              { value: 735, name: "创造力测评" },
              { value: 580, name: "同理心测评" },
              { value: 484, name: "自制力测评" },
              { value: 300, name: "逻辑力测评" },
            ],
          },
        ],
        grid: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 0,
        },
      });
    }
    window.addEventListener("resize", () => {
      ProjectAccounte.resize();
    });
    const store = useStore();
    watch(
      () => store.collapsed,
      () => {
        setTimeout(() => {
          ProjectAccounte.resize();
        }, 150);
      }
    );
    onBeforeUnmount(() => {
      ProjectAccounte.dispose();
    });
    onMounted(() => {
      Init();
    });
  },
});
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin";

.body {
  position: relative;
}
.info {
  position: absolute;
  left: 4.5rem;
  top: 28%;
  @media screen and (max-width: 1550px) and (min-width: 1200px) {
    left: 0.1rem !important;
  }
  @media screen and (max-width: 1200px) {
    left: 6rem !important;
  }
  @media screen and (max-width: 800px) {
    left: 0rem !important;
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
