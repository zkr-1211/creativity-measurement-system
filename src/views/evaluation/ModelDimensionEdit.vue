<template>
  <div class="body">
    <div class="content">
      <div class="left">
        <a-menu v-model:selectedKeys="selectedKeys" :mode="mode" :theme="theme">
          <a-menu-item key="1"> 模型维度编辑 </a-menu-item>
        </a-menu>
      </div>
      <div class="right">
        <div class="title">模型维度编辑</div>
        <div class="infos">
          <a-row :gutter="24">
            <a-col
              :xs="24"
              :sm="24"
              :md="24"
              :xl="12"
              :style="{ marginBottom: '24px' }"
            >
              <div class="center">
                <div class="eva-name">
                  <div class="name">维度选择</div>
                  <div class="radio-group">
                    <a-radio-group
                      v-model:value="attribute"
                      @change="radioChange"
                    >
                      <a-radio :value="0"> 五维 </a-radio>
                      <a-radio :value="1"> 六维 </a-radio>
                    </a-radio-group>
                  </div>
                </div>
                <div class="eva-name">
                  <div class="name">第一维属性</div>
                  <div class="input">
                    <a-input
                      v-model:value.trim="oneAttribute"
                      placeholder="请输入第一维属性"
                      :maxlength="10"
                    />
                  </div>
                </div>
                <div class="eva-name">
                  <div class="name">第二维属性</div>
                  <div class="input">
                    <a-input
                      v-model:value.trim="twoAttribute"
                      placeholder="请输入第二维属性"
                      :maxlength="10"
                    />
                  </div>
                </div>
                <div class="eva-name">
                  <div class="name">第三维属性</div>
                  <div class="input">
                    <a-input
                      v-model:value.trim="threeAttribute"
                      placeholder="请输入第三维属性"
                      :maxlength="10"
                    />
                  </div>
                </div>
                <div class="eva-name">
                  <div class="name">第四维属性</div>
                  <div class="input">
                    <a-input
                      v-model:value.trim="fourAttribute"
                      placeholder="请输入第四维属性"
                      :maxlength="10"
                    />
                  </div>
                </div>
                <div class="eva-name">
                  <div class="name">第五维属性</div>
                  <div class="input">
                    <a-input
                      v-model:value.trim="fiveAttribute"
                      placeholder="请输入第五维属性"
                      :maxlength="10"
                    />
                  </div>
                </div>
                <div v-if="attribute" class="eva-name">
                  <div class="name">第六维属性</div>
                  <div class="input">
                    <a-input
                      v-model:value.trim="sixAttribute"
                      placeholder="请输入第六维属性"
                      :maxlength="10"
                    />
                  </div>
                </div>
                <div class="button" @click="updateInfo">
                  <a-button type="primary"> 更新基本信息 </a-button>
                </div>
              </div>
            </a-col>
            <a-col
              :xs="24"
              :sm="24"
              :md="24"
              :xl="12"
              :style="{ marginBottom: '24px' }"
            >
              <div class="r-r">
                <div class="header-info">
                  <div class="name">预览模型</div>
                  <div class="header" />
                  <div class="model-dimension">
                    <ModelDimension
                      :color-list="colorList"
                      :data="data"
                      :indicator="indicator"
                    />
                    <div class="model-data">
                      <div
                        v-for="(item, index) in 3"
                        :key="index"
                        class="model-data-item"
                      >
                        <div class="top">
                          <div
                            class="border"
                            :style="`background-color:${colorList[index]}`"
                          />
                          <div class="data-title">个人</div>
                        </div>
                        <div class="num">33</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a-col>
          </a-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="ModelDimensionEdit">
import { message } from "ant-design-vue";
import { getDimensions, updateDimensions } from "@/api/dimensions";
function getBase64(img: Blob, callback: any) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
const route = useRoute();
const id = route.query.id;
const stateMenu = reactive({
  mode: "inline",
  theme: "light",
  selectedKeys: ["1"],
});
const colorList = ref(["#1890FF", "#2FC25B", "#FACC14"]);
// 个人信息
const personage = reactive({
  oneAttribute: "创造力",
  twoAttribute: "情商",
  threeAttribute: "智商",
  fourAttribute: "领导力",
  fiveAttribute: "观察力",
  sixAttribute: "人格",
});
const attribute = ref(0);
const data = [
  {
    value: [4200, 3000, 20000, 35000, 50000, 18000],
    itemStyle: {
      color: colorList.value[0],
    },
  },
  {
    value: [5000, 14000, 28000, 26000, 42000, 21000],
    itemStyle: {
      color: colorList.value[1],
    },
  },
  {
    value: [5000, 1600, 2600, 28000, 32000, 11000],
    itemStyle: {
      color: colorList.value[2],
    },
  },
];

// 上传封面
const imageList = ref([]);
const loading = ref(false);
const imageUrl = ref("");
function getList() {
  getDimensions({
    course_id: id,
  })
    .then((res) => {
      let data = res.data.list;
      personage.oneAttribute = data[0].name;
      personage.twoAttribute = data[1].name;
      personage.threeAttribute = data[2].name;
      personage.fourAttribute = data[3].name;
      personage.fiveAttribute = data[4].name;
      personage.sixAttribute = data[5].name;
      attribute.value = data.dimension_num == 5 ? 0 : 1;
    })
    .catch((err) => {
      message.error(err.message);
    });
}
const handleChange = (info: {
  file: { status: string; originFileObj: any };
}) => {
  if (info.file.status === "uploading") {
    loading.value = true;
    return;
  }

  if (info.file.status === "done") {
    getBase64(info.file.originFileObj, (base64Url: string) => {
      imageUrl.value = base64Url;
      loading.value = false;
    });
  }

  if (info.file.status === "error") {
    loading.value = false;
    message.error("upload error");
  }
};

const beforeUpload = (file: { type: string; size: number }) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

  if (!isJpgOrPng) {
    message.error("You can only upload JPG file!");
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }

  return isJpgOrPng && isLt2M;
};
// 上传文件
const fileList = ref([]);
const handleChangeFile = (infoFile: {
  file: { status: string; name: any };
  fileList: any;
}) => {
  if (infoFile.file.status !== "uploading") {
    console.log(infoFile.file, infoFile.fileList);
  }

  if (infoFile.file.status === "done") {
    message.success(`${infoFile.file.name} file uploaded successfully`);
  } else if (infoFile.file.status === "error") {
    message.error(`${infoFile.file.name} file upload failed.`);
  }
};
function indicatorList() {
  if (attribute.value === 0) {
    indicator.value = [
      { name: personage.oneAttribute, max: 10000 },
      { name: personage.twoAttribute, max: 16000 },
      { name: personage.threeAttribute, max: 38000 },
      { name: personage.fourAttribute, max: 52000 },
      { name: personage.fiveAttribute, max: 58000 },
    ];
  } else {
    indicator.value = [
      { name: personage.oneAttribute, max: 10000 },
      { name: personage.twoAttribute, max: 16000 },
      { name: personage.threeAttribute, max: 38000 },
      { name: personage.fourAttribute, max: 52000 },
      { name: personage.fiveAttribute, max: 58000 },
      { name: personage.sixAttribute, max: 58000 },
    ];
  }
  console.log(personage);
}
const indicator = ref<any>([]);
const radioChange = () => {
  indicatorList();
};
onMounted(() => {
  updateInfo();
});
// 更新基本信息
const updateInfo = () => {
  // 循环personage对象并push到testing_dimensions数组中
  const testing_dimensions: any = [];
  for (const key in personage) {
    if (personage.hasOwnProperty(key)) {
      const element = personage[key];
      if (element !== "") {
        testing_dimensions.push(element);
      }
    }
  }
  let data = {
    courseId: id,
    testing_dimensions: testing_dimensions,
  };
  updateDimensions({
    course_id: id,
  })
    .then((res) => {
      if (res.code === 0) {
        message.success("更新成功");
      } else {
        message.error(res.message);
      }
    })
    .catch((err) => {
      message.error(err.message);
    });
  indicatorList();
};
// 状态选择框
const stateValue = ref("");
const focus = () => {
  console.log("focus");
};

const handleChangeState = (value: any) => {
  console.log(`selected ${value}`);
};
const { mode, theme, selectedKeys } = toRefs(stateMenu);
const {
  oneAttribute,
  twoAttribute,
  threeAttribute,
  fourAttribute,
  fiveAttribute,
  sixAttribute,
} = toRefs(personage);
getList();
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin";
.body {
  .content {
    padding: 24px 40px 24px 0px;
    background-color: #fff;
    display: flex;
    .left {
      @include wh(256px, 100%);
    }
    .right {
      color: #000;
      padding-left: 30px;
      width: 100%;
      .title {
        @include sc(0.2rem, rgba(0, 0, 0, 0.85));
        font-weight: bold;
      }
      .infos {
        .center {
          .eva-name {
            margin-top: 0.24rem;
            .name {
              @include sc(0.14rem, rgba(0, 0, 0, 0.85));
              margin-bottom: 0.08rem;
            }
            .input {
              width: 2.1rem;
            }
            .region {
              margin-top: 0.08rem;
              .select {
                margin-left: 8px;
              }
            }
          }
          .button {
            margin-top: 1rem;
          }
        }
        .r-r {
          margin-top: 20px;
          display: flex;

          .header-info {
            .name {
              @include sc(16px, rgba(0, 0, 0, 0.85));
              font-weight: bold;
              margin-bottom: 10px;
            }
            .header {
              @include wh(300px, 1px);
              background: #e9e9e9;
            }
            .model-dimension {
              .model-data {
                @include faj(center, center);
                .model-data-item {
                  width: 100px;
                  border-right: 1px solid #e9e9e9;
                  @include faj(center, center);
                  flex-direction: column;
                  &:last-child {
                    border-right: none;
                  }
                  .top {
                    @include faj(center, none);
                    .border {
                      @include wh(6px, 6px);
                      @include borderRadius(50%);
                    }
                    .data-title {
                      margin-left: 10px;
                      @include sc(14px, rgba(0, 0, 0, 0.45));
                    }
                  }
                  .num {
                    font-weight: bold;
                    margin-left: 10px;
                    @include sc(24px, rgba(0, 0, 0, 0.85));
                  }
                }
              }
            }
          }
        }
      }
      .save {
        margin-top: 70px;
      }
    }
  }
}
</style>
