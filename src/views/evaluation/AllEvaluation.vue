<!--  -->
<template>
  <div class="body">
    <page-header title="全部测评">
      <template #right>
        <a-button type="primary" @click="add"> 新建测评 </a-button>
      </template>
    </page-header>

    <div class="main-content">
      <a-card>
        <div class="search-info">
          <!-- <div class="tags">
            <div class="tags-text">标签类目：</div>
            <div class="tags-content">
              <div
                v-for="(item, index) in tagList"
                :key="item.course_id"
                class="tags-item"
                :class="selectTagId === item.course_id ? 'tags-active' : ''"
                @click="selectTag(item.course_id)"
              >
                <span v-if="index == 0">全部</span>
                <span v-else>类目{{ index }}</span>
              </div>
            </div>
          </div> -->
          <div class="other-select">
            <div class="other-text">其他选项：</div>
            <div class="other-right">
              <div class="select-item">
                <div class="select-level">
                  学校：
                  <a-select
                    ref="select"
                    v-model:value="learningPeriod"
                    @focus="focus"
                    @change="handleChange"
                    style="width: 220px"
                  >
                    <a-select-option value="1"> 阳光学院 </a-select-option>
                  </a-select>
                </div>
                <!-- <div class="participate-num">
                  参与人数：
                  <a-select
                    ref="select"
                    v-model:value="participation"
                    @focus="focus"
                    @change="handleChange"
                    style="width: 220px"
                  >
                    <a-select-option value="jack"> Jack </a-select-option>
                    <a-select-option value="lucy"> Lucy </a-select-option>
                    <a-select-option value="Yiminghe">
                      yiminghe
                    </a-select-option>
                  </a-select>
                </div> -->
              </div>
              <div class="search">
                <a-input-search
                  v-model:value="value"
                  placeholder="请输入"
                  @search="onSearch"
                />
              </div>
            </div>
          </div>
        </div>
      </a-card>
      <a-spin :spinning="spinning">
        <a-list
          style="margin-top: 24px"
          :grid="{ gutter: 24, xxl: 5, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }"
          :data-source="data"
        >
          <template #renderItem="{ item,index }">
            <a-list-item>
              <a-card @click="toDetail(item)">
                <template #cover>
                  <img
                    alt="example"
                    :src="index % 2 === 0
                            ? 'https://s1.ax1x.com/2022/04/19/LBrTG4.png'
                            : 'https://s1.ax1x.com/2022/04/19/LBsgYD.png'"
                  />
                </template>
                <a-card-meta>
                  <template #title>
                    <span style="font-weight: bold">
                      {{ item.course_name }}
                    </span>
                  </template>
                  <template #description>
                    {{ item.describe || "暂无描述" }}
                  </template>
                </a-card-meta>
                <div class="info">
                  <div class="num">14679人参与测评</div>
                  <div class="imgs">
                    <div v-for="(item, index) in 4" :key="index" class="img" />
                  </div>
                </div>
              </a-card>
            </a-list-item>
          </template>
        </a-list>
      </a-spin>
    </div>
    <!--添加测评 -->
    <a-modal
      v-model:visible="visible"
      style="top: 200px"
      :title="title"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        :labelCol="{ span: 4 }"
      >
        <a-form-item label="测评名称" name="course_name">
          <a-input v-model:value="formState.course_name" />
        </a-form-item>
        <a-form-item label="测评描述" name="describe">
          <a-input v-model:value="formState.describe" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup name="AllEvaluation">
import { getCourseList, createCourse } from "@/api/course";
import { useStore } from "@/store";

const learningPeriod = ref("");
const participation = ref("");
const data: any = ref([]);
for (let i = 1; i < 5; i++) {
  data.value.push({
    id: i.toString(),
    name: `类目 ${i}`,
    title: "创造力测评",
  });
}
const visible = ref(false);
const confirmLoading = ref(false);
const formRef = ref();
const title = ref("");
const addFlag = ref<boolean>(false);
const handleOk = () => {
  formRef.value
    .validate()
    .then(() => {
      if (addFlag.value) {
        let data = {
          name: formState.course_name,
          describe: formState.describe,
          type: "testing",
        };
        confirmLoading.value = true;
        createCourse(data).then((res) => {
          getList();
          formRef.value.resetFields();
          confirmLoading.value = false;
          visible.value = false;
        });
        // 添加
      } else {
        // 编辑
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
};
const formState = reactive({
  course_name: "",
  describe: "",
});
const rules = {
  course_name: [
    { required: true, message: "请输入课程名称", trigger: "blur" },
    { min: 1, max: 20, message: "长度1到20个字符", trigger: "blur" },
  ],
};

const handleCancel = () => {
  reset();
};
function reset() {
  formState.course_name = "";
  formState.describe = "";
  formRef.value?.resetFields();
}

const spinning = ref<boolean>(true);
function add() {
  visible.value = true;
  title.value = "新建测评";
  addFlag.value = true;
}
function getList() {
  let query = {
    type: "testing",
  };
  spinning.value = true;
  getCourseList(query).then((res) => {
    spinning.value = false;
    data.value = res.data.list;
  });
}
onMounted(() => {
  spinning.value = false;
});
const tagList = ref(data);
const focus = () => {
  console.log("focus");
};
// 选择的标签id
const selectTagId = ref("1");
const selectTag = (id: string) => {
  selectTagId.value = id;
};
// 搜索
const value = ref("");
const onSearch = (searchValue: any) => {
  if (searchValue) {
    // 搜索列表
    const searchList = data.value.filter((item: any) => {
      return item.course_name.indexOf(searchValue) > -1;
    });
    data.value = searchList;
  } else {
    getList();
  }
};
// 选择框改变时
const handleChange = (value: any) => {
  console.log(`selected ${value}`);
};
const store = useStore();
const router = useRouter();
function toDetail(data) {
  store.setCourseInfo(data);
  router.push({
    path: "/evaluation/evaluation-detail",
    query: {
      // data: JSON.stringify(data),
      id: data.course_id,
    },
  });
}
getList();
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin";
.body {
  .main-content {
    margin: 24px;
    color: rgba(0, 0, 0, 0.85);
    .search-info {
      @include borderRadius(0.02rem);
      background: #ffffff;
      padding: 15px;
      font-size: 14px;
      .tags {
        border-bottom: 1px solid #e8e8e8;
        line-height: 30px;
        display: flex;
        .tags-text {
          width: 100px;
          text-align: center;
          white-space: nowrap;
          color: rgba(0, 0, 0, 0.85);
        }
        .tags-content {
          display: flex;
          flex-wrap: wrap;
          min-height: 80px;
          .tags-active {
            color: #fff !important;
            background: #1890ff;
          }
          .tags-item {
            cursor: pointer;
            color: rgba(0, 0, 0, 0.65);
            @include faj(center, center);
            margin-left: 10px;
            @include wh(0.77rem, 0.29rem);
            @include borderRadius(0.03rem);
          }
        }
      }
      .other-select {
        margin-top: 30px;
        display: flex;
        align-items: center;
        .other-text {
          width: 100px;
          text-align: center;
          white-space: nowrap;
          color: rgba(0, 0, 0, 0.85);
        }
        .other-right {
          @include faj();
          flex-wrap: wrap;

          width: 100%;
          .select-item {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            .select-level {
              margin-left: 30px;
            }
            .participate-num {
              margin-left: 30px;
            }
          }
        }
      }
    }
    .item-content {
      padding: 12px 24px 12px 24px;
      .title {
        font-weight: bold;
        @include sc(0.17rem, rgba(0, 0, 0, 0.85));
      }
      .des {
        margin-top: 5px;
        @include sc(0.14rem, rgba(0, 0, 0, 0.45));
      }
    }
  }
}
.info {
  @include faj();
  margin-top: 20px;
  .num {
    @include sc(0.12rem, rgba(0, 0, 0, 0.45));
  }
  .imgs {
    display: flex;
    position: relative;
    .img {
      @include wh(0.2rem, 0.2rem);
      @include borderRadius(50%);
      position: absolute;
      right: 0;
      bottom: -10px;
    }
    .img:nth-of-type(1) {
      right: 10px;
      background-image: url(https://s1.ax1x.com/2022/04/19/LBOxTf.png);
      background-size: cover;
    }
    .img:nth-of-type(2) {
      right: 25px;
      background: rgb(203, 212, 76);
      background-image: url(https://s1.ax1x.com/2022/04/19/LBOv0P.png);
      background-size: cover;
    }
    .img:nth-of-type(3) {
      right: 40px;
      background-color: rgb(58, 58, 155);
      background-image: url(https://s1.ax1x.com/2022/04/19/LBXSk8.png);
      background-size: cover;
    }
    .img:nth-of-type(4) {
      right: 55px;
      background-color: rgb(175, 199, 150);
      background-image: url(https://s1.ax1x.com/2022/04/19/LBOOOI.png);
      background-size: cover;
    }
  }
}
</style>
