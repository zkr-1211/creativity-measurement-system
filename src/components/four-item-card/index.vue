<!--  -->
<template>
  <div class="body">
    <div class="top-total">
      <a-row :gutter="24">
        <a-col
          :xs="24"
          :sm="24"
          :md="12"
          :xl="6"
          :style="{ marginBottom: '24px' }"
        >
          <chart-card
            :loading="loading"
            :title="infoList[0].title"
            :total="list[0]?.count"
          >
            <template #action>
              <a-tooltip title="暂无描述信息">
                <ExclamationCircleOutlined />
              </a-tooltip>
            </template>

            <div style="display: flex; justify-content: space-between">
              <trend
                flag="up"
                style="margin-right: 16px"
                term="周同比"
                :percentage="list[0]?.up"
              />
              <trend
                flag="down"
                term="日同比"
                :percentage="list[0]?.down"
                :type="false"
              />
            </div>
            <template #footer>
              {{ infoList[0].footerDes }}
            </template>
          </chart-card>
        </a-col>
        <a-col
          :xs="24"
          :sm="24"
          :md="12"
          :xl="6"
          :style="{ marginBottom: '24px' }"
        >
          <!--  -->
          <chart-card
            :loading="loading"
            :title="infoList[1].title"
            :total="list[1]?.count"
          >
            <template #action>
              <a-tooltip title="暂无描述信息">
                <ExclamationCircleOutlined />
              </a-tooltip>
            </template>

            <div>
              <chart-area :data="list[1]?.data" />
            </div>
            <template #footer>
              {{ infoList[1].footerDes }}
              <!-- <span>60%</span> -->
            </template>
          </chart-card>
        </a-col>
        <!--  -->
        <a-col
          :xs="24"
          :sm="24"
          :md="12"
          :xl="6"
          :style="{ marginBottom: '24px' }"
        >
          <chart-card
            :loading="loading"
            :title="infoList[2].title"
            :total="list[2]?.count"
          >
            <template #action>
              <a-tooltip title="暂无描述信息">
                <ExclamationCircleOutlined />
              </a-tooltip>
            </template>

            <div>
              <chart-mbar :data="list[2]?.data" />
            </div>
            <template #footer>
              {{ infoList[2].footerDes }}
            </template>
          </chart-card>
        </a-col>
        <a-col
          :xs="24"
          :sm="24"
          :md="12"
          :xl="6"
          :style="{ marginBottom: '24px' }"
        >
          <chart-card
            :loading="loading"
            :title="infoList[3].title"
            :total="list[3]?.count"
          >
            <template #action>
              <a-tooltip title="暂无描述信息">
                <ExclamationCircleOutlined />
              </a-tooltip>
            </template>

            <div>
              <mini-progress
                color="rgb(19, 194, 194)"
                :target="80"
                :percentage="list[3]?.percent"
                height="8px"
              />
            </div>
            <template #footer>
              {{ infoList[3].footerDes }}
            </template>
          </chart-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, PropType } from "vue";
import ChartArea from "@/components/chart-area/index.vue";
import ChartMbar from "@/components/chart-mbar/index.vue";
import MiniProgress from "@/components/mini-progress/index.vue";
import ChartCard from "@/components/chart-card/index.vue";
import Trend from "@/components/trend/index.vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { getFourItem } from "@/api";
interface listType {
  title: string;
  footerDes: string;
}
defineProps({
  infoList: {
    type: Array as PropType<listType[]>,
    default: () => [
      {
        title: "测评总人数",
        footerDes: "日均测评数543",
      },
      {
        title: "访问量",
        footerDes: "日访问量3453",
      },
      {
        title: "参与机构数",
        footerDes: "机构平均开通测评数74",
      },
      {
        title: "测评项目数",
        footerDes: "今年新增55",
      },
    ],
  },
});
const loading = ref<boolean>(true);
onMounted(() => {
  __getFourItem();
});
const list: any = ref([]);
async function __getFourItem() {
  const { data } = await getFourItem();
  list.value = data.list;
  console.log(data);
  loading.value = false;
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin";
.top-total {
  // @include faj();
  .link-relative-ratio {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    height: 0.4rem;
    font-size: 0.17rem;
    .relative-ratio {
      color: rgba(0, 0, 0, 0.65);
      span {
        margin-left: 0.05rem;
        color: #000000;
      }
    }
  }
  .progress {
    display: flex;
    align-items: flex-end;
    @include wh(100%, 0.4rem);
  }
}
</style>
