<template>
  <div class="body">
    <page-header title="">
      <div class="eva-record-item">
        <div class="header">
          <img src="https://s1.ax1x.com/2022/04/19/LBrTG4.png" alt="" />
        </div>
        <div class="item-info">
          <div class="item-right-top">
            <div class="text">{{ courseInfo.course_name }}</div>
            <div class="tag">{{ courseInfo.course_name }}</div>
          </div>
          <div class="item-right-bottom">
            <span>简介：{{ courseInfo.describe }}</span>
          </div>
        </div>
      </div>
      <template #right>
        <a-button type="primary" @click="setTheEdit" style="margin-right: 20px">
          设置编辑
        </a-button>
        <a-button type="primary" @click="closeEva"> 删除测评 </a-button>
      </template>
    </page-header>
    <div class="content">
      <FourItemCard />
      <div class="spet">
        <a-row :gutter="24">
          <a-col :xs="24" :sm="24" :md="24" :xl="12">
            <a-card :loading="loading">
              <div class="left">
                <div class="left-content">
                  <div class="title">第一步</div>
                  <div class="text">模型维度</div>
                  <div class="button">
                    <a-button type="primary" @click="editDimension">
                      维度编辑
                    </a-button>
                  </div>
                </div>
                <div class="icon">
                  <img src="https://s1.ax1x.com/2022/04/19/LBLgqP.png" alt="" />
                </div>
              </div>
            </a-card>
          </a-col>
          <a-col :xs="24" :sm="24" :md="24" :xl="12">
            <a-card :loading="loading">
              <div class="left right">
                <div class="left-content">
                  <div class="title">第二步</div>
                  <div class="text">测评题目与阶段</div>
                  <div class="button">
                    <a-button type="primary" @click="editProblem">
                      编辑
                    </a-button>
                  </div>
                </div>
                <div class="icon">
                  <img src="https://s1.ax1x.com/2022/04/19/LBLOaT.png" alt="" />
                </div>
              </div>
            </a-card>
          </a-col>
        </a-row>
      </div>

      <TendencyRun>
        <span style="margin-left: 20px">学校：</span>
        <a-select
          ref="select"
          v-model:value="value1"
          style="width: 100px"
          @focus="focus"
          @change="handleChange"
        >
          <a-select-option value="jack"> Jack </a-select-option>
          <a-select-option value="lucy"> Lucy </a-select-option>
          <a-select-option value="Yiminghe"> yiminghe </a-select-option>
        </a-select>
      </TendencyRun>
      <ProblemData style="margin-top: 20px" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { message, Modal } from "ant-design-vue";
import { deleteCourse } from "@/api/course";
import { useStore } from "@/store";
const router = useRouter();
const handleChange = () => {};
const value1 = ref(0);
const loading = ref<boolean>(true);
function focus() {}
const route = useRoute();
const id = route.query.id;
const store = useStore();
const courseInfo = computed(() => {
  return store.getCourseInfo;
});

async function closeEva() {
  Modal.confirm({
    title: () => "你确定删除该测评吗？",
    content: () => "删除后不可撤回",
    okText: () => "确定",
    okType: "danger",
    cancelText: () => "取消",
    onOk() {
      deleteCourse(courseInfo.value.course_id).then((res) => {
        message.success("删除成功");
        router
          .replace({
            path: "/evaluation/allevaluation",
          })
          .catch((err) => {
            message.error(err);
          });
      });
    },
    onCancel() {
      console.log("Cancel");
    },
  });
}
function setTheEdit() {
  router.push({
    path: "/evaluation/evaluationset",
    query: {
      id: id,
    },
  });
}
function editDimension() {
  router.push({
    path: "/evaluation/model-dimension-edit",
    query: {
      id: id,
    },
  });
}
function editProblem() {
  router.push({
    path: "/evaluation/design",
    query: {
      id: courseInfo.value.course_id,
    },
  });
}
onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 500);
});
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin";
.body {
  .content {
    .spet {
      margin-bottom: 24px;
      .left {
        background: #ffffff;
        border-radius: 2px;
        padding: 30px;
        @include faj();
        .left-content {
          margin-left: 30px;
          .title {
            font-weight: 600;
            @include sc(16px, rgba(0, 0, 0, 0.85));
          }
          .text {
            font-weight: 600;
            @include sc(24px, rgba(0, 0, 0, 0.85));
          }
          .button {
            margin-top: 20px;
          }
        }
        .icon {
          @include wh(106px, 101px);
          background: #1e7ffe;
          margin-right: 30px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
.content {
  margin: 24px;
}
.eva-record-item {
  display: flex;
  .header {
    @include wh(152px, 72px);
    background: rgba(0, 0, 0, 1);
    border: #bbbbbb solid 2px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .item-info {
    @include faj(none, space-around);
    flex-direction: column;
    margin-left: 20px;
    @include sc(20px, rgba(0, 0, 0, 1));
    .item-right-top {
      display: flex;

      div {
        margin-right: 10px;
      }
      .tag {
        border: 1px solid #d9d9d9;
        padding: 4px;
        font-size: 12px;
        display: flex;
        align-items: center;
        border-radius: 2px;
        background: rgba(245, 245, 245, 0.39);
      }
    }
    .item-right-bottom {
      max-width: 800px;
      line-height: 20px;
      @include tbm(2);

      span {
        @include sc(14px, rgba(0, 0, 0, 0.25));
      }
    }
  }
}
</style>
