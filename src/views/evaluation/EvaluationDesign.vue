<!--  -->
<template>
  <div class="body">
    <page-header :title="`${courseInfo.course_name || '未选择课程'}：题集管理`">
      <template #right>
        <a-button type="primary" :loading="saveLoading" @click="onSave">
          保存
        </a-button>
        <a-button style="margin-left: 10px"> 取消 </a-button>
      </template>
    </page-header>
    <div ref="el" class="content">
      <a-row :gutter="24">
        <a-col :xs="24" :sm="24" :md="24" :xl="8">
          <a-card :loading="loading" title="题集与题目">
            <template #extra>
              <a-button type="primary" @click="aNewPhase">
                + 新建题集
              </a-button>
            </template>

            <div class="bottom-content">
              <a-collapse
                v-model:activeKey="activeKey"
                :bordered="false"
                accordion
              >
                <a-collapse-panel
                  v-for="(item, index) in questionsSetList"
                  :key="index"
                  :header="item.name"
                  @click="selectQuestionsSet(item.question_set_id)"
                >
                  <div
                    v-for="(q, questionsIndex) in questions"
                    :key="q.question_id"
                    class="item"
                    @click="selectQuestions(q,item.question_set_id)"
                  >
                    <div class="item-left">
                      <div class="index">0{{ questionsIndex + 1 }}：</div>
                      <div class="title">
                        {{ q.type == "RADIO" ? "单选" : "填空" }}
                        :{{ q.content }}
                      </div>
                    </div>
                    <div class="item-right" @click.stop>
                      <a-dropdown>
                        <a class="ant-dropdown-link" @click.prevent>
                          <Dot />
                        </a>
                        <template #overlay>
                          <a-menu>
                            <!-- <a-menu-item @click="updateQue(q)">
                              修改
                            </a-menu-item> -->
                            <a-menu-item @click="delQue(q.question_id)">
                              删除
                            </a-menu-item>
                          </a-menu>
                        </template>
                      </a-dropdown>
                    </div>
                  </div>
                  <div class="add-p" @click="newTopic(item)">+ 新增题目</div>

                  <template #extra>
                    <a-dropdown trigger="click" @click.stop>
                      <a class="ant-dropdown-link" @click.prevent>
                        <Dot />
                      </a>
                      <template #overlay>
                        <a-menu>
                          <a-menu-item @click="updateQueSet(item)">
                            修改
                          </a-menu-item>
                          <a-menu-item @click="detQueSet(item.question_set_id)">
                            删除
                          </a-menu-item>
                        </a-menu>
                      </template>
                    </a-dropdown>
                  </template>
                </a-collapse-panel>
              </a-collapse>
            </div>
          </a-card>
        </a-col>
        <a-col :xs="24" :sm="24" :md="24" :xl="16">
          <a-card
            :loading="loading"
            :title="`题集： 编辑区（${editAreaTitle || '暂未选择题集...'}）`"
          >
            <div class="bottom-content-right">
              <div class="bottom-content-right">
                <div style="display: flex; align-items: center">
                  <div class="eva-des">
                    <div class="des">题目内容:</div>
                    <div class="txarea">
                      <a-textarea
                        v-model:value="proContent"
                        placeholder="请输入题目内容"
                        :rows="4"
                      />
                    </div>
                  </div>
                  <div class="upload">
                    <a-upload
                      v-model:file-list="fileList"
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      list-type="picture-card"
                      @preview="handlePreview"
                    >
                      <div v-if="fileList.length < 8">
                        <plus-outlined />
                        <div class="ant-upload-text">Upload</div>
                      </div>
                    </a-upload>
                    <a-modal
                      :visible="previewVisible"
                      :footer="null"
                      @cancel="handleCancel"
                    >
                      <img
                        alt="example"
                        style="width: 100%"
                        :src="previewImage"
                      />
                    </a-modal>
                  </div>
                </div>
                <div style="display: flex; align-items: center">
                  <div class="eva-des">
                    <div class="des">答案解析:</div>
                    <div class="txarea">
                      <a-textarea
                        v-model:value="answerKey"
                        placeholder="请输入答案解析"
                        :rows="4"
                      />
                    </div>
                  </div>
                  <div class="upload">
                    <a-upload
                      v-model:file-list="fileList"
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      list-type="picture-card"
                      @preview="handlePreview"
                    >
                      <div v-if="fileList.length < 8">
                        <plus-outlined />
                        <div class="ant-upload-text">Upload</div>
                      </div>
                    </a-upload>
                    <a-modal
                      :visible="previewVisible"
                      :footer="null"
                      @cancel="handleCancel"
                    >
                      <img
                        alt="example"
                        style="width: 100%"
                        :src="previewImage"
                      />
                    </a-modal>
                  </div>
                </div>
              </div>
              <div class="pay-radio-group">
                <div class="name">题型选择:</div>
                <a-radio-group v-model:value="isSelect">
                  <a-radio :value="1"> 选择 </a-radio>
                  <a-radio :value="2"> 填空 </a-radio>
                </a-radio-group>
              </div>
              <div
                class="pay-radio-group"
                style="display: flex; align-items: center"
                v-if="question_id != null"
              >
                <span> 测评维度: </span>
                <a-select
                  ref="select"
                  v-model:value="evaValue"
                  @focus="focus"
                  @change="handleEvaChange"
                  :options="evaOptions"
                  style="width: 130px; margin-left: 10px"
                >
                </a-select>
              </div>
              <!-- <div
                class="pay-radio-group"
                style="display: flex; align-items: center"
                v-if="isSelect != 1"
              >
                <span> 批改方式: </span>
                <a-select
                  ref="select"
                  v-model:value="value"
                  style="width: 130px; margin-left: 10px"
                  @focus="focus"
                  @change="handleChange"
                >
                  <a-select-option value="0">手动批改</a-select-option>
                  <a-select-option value="1">自动批改</a-select-option>
                </a-select>
              </div> -->
              <div
                class="pay-radio-group"
                style="display: flex; align-items: center"
                v-if="isSelect == 1"
              >
                <span> 选项设置: </span>
                <a-select
                  ref="select"
                  v-model:value="opi_random"
                  style="width: 130px; margin-left: 10px"
                  @focus="focus"
                  @change="handleChange"
                >
                  <a-select-option value="0">选项不随机</a-select-option>
                  <a-select-option value="1">选项随机</a-select-option>
                </a-select>
              </div>

              <div
                class="pay-radio-group"
                style="display: flex; align-items: center"
              >
                <span> 设置得分: </span>
                <a-input
                  style="width: 130px; margin-left: 10px"
                  v-model:value.number="score"
                  oninput="if(isNaN(value)) { value=value.replace(/^\.+|[^\d.]/g,'')}"
                  placeholder="请输入得分"
                  :rows="4"
                />
              </div>

              <div class="se-edit">选项编辑</div>
              <div
                v-for="(optItem, optIndex) in options"
                :key="optIndex"
                class="item"
              >
                <a-row :gutter="24">
                  <a-col :xs="24" :sm="24" :md="14" :xl="13">
                    <div class="left-content">
                      <div
                        class="eva-des"
                        style="display: flex; align-items: center"
                      >
                        <div class="des">选项1:</div>
                        <div class="txarea" v-if="isSelect == 1">
                          <a-input
                            style="margin-left: 10px"
                            v-model:value="optItem.value"
                            placeholder="请输入选项内容"
                            :rows="4"
                          />
                        </div>

                        <div class="txarea" v-else>
                          <a-textarea
                            style="margin-left: 10px"
                            v-model:value="optItem.answer"
                            placeholder="请输入填空答案"
                            :rows="4"
                          />
                        </div>
                      </div>

                      <div
                        style="
                          display: flex;
                          align-items: center;
                          margin-top: 10px;
                        "
                      >
                        <span> 设置得分: </span>
                        <a-input
                          style="width: 130px; margin-left: 5px"
                          v-model:value.number="optItem.score"
                          oninput="if(isNaN(value)) { value=value.replace(/^\.+|[^\d.]/g,'')}"
                          placeholder="请输入得分"
                          :rows="4"
                        />
                      </div>
                      <a-checkbox
                        v-model:checked="optItem.is_answer"
                        style="margin: 10px 0"
                        v-if="isSelect == 1"
                      >
                        <span> 是否为正确答案 </span>
                      </a-checkbox>
                      <a-checkbox
                        v-else
                        v-model:checked="optItem.is_include_str"
                        style="margin: 10px 0"
                      >
                        <span> 包含答案即可得分 </span>
                      </a-checkbox>
                      <br />
                      <a-checkbox
                        v-if="isSelect == 2"
                        v-model:checked="optItem.is_ignore_case"
                        style="margin: 10px 0"
                      >
                        <span> 忽略大小写 </span>
                      </a-checkbox>
                      <div class="upload">
                        <a-upload
                          v-model:file-list="optItem.imgList"
                          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                          list-type="picture-card"
                          @preview="handlePreview"
                        >
                          <div v-if="fileList.length < 8">
                            <plus-outlined />
                            <div class="ant-upload-text">上传图片</div>
                          </div>
                        </a-upload>
                        <a-modal
                          :visible="previewVisible"
                          :footer="null"
                          @cancel="handleCancel"
                        >
                          <img
                            alt="example"
                            style="width: 100%"
                            :src="previewImage"
                          />
                        </a-modal>
                      </div>
                    </div>
                  </a-col>

                  <a-col :xs="24" :sm="24" :md="10" :xl="11">
                    <div style="display: flex; justify-content: space-between">
                      <div style="display: flex">
                        <!-- <div class="text" style="margin-right: 20px">
                          对应得分维度：
                        </div>
                        <div class="score">
                          <a-select
                            ref="select"
                            v-model:value="value"
                            style="width: 120px"
                            @focus="focus"
                            @change="handleChange"
                            :options="evaOptions"
                          >
                          </a-select> -->
                        <!-- <div
                            v-for="(item, index) in optItem.score"
                            :key="index"
                            class="select-item"
                          >
                            {{ item.title }} :
                            <a-input-number
                              id="inputNumber"
                              v-model:value="item.value"
                              style="width: 160px"
                              :min="1"
                              :max="100"
                            />
                          </div> -->
                        <!-- </div> -->
                      </div>

                      <a-popconfirm
                        title="确定删除该选项吗？"
                        ok-text="删除"
                        cancel-text="取消"
                        @confirm="delOption(optItem.question_option_id)"
                      >
                        <div class="delete">删除</div>
                      </a-popconfirm>
                    </div>
                  </a-col>
                </a-row>
              </div>
              <div class="add-s" @click="addOption">+ 新增选项</div>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <!--新建/修改题集 -->
    <a-modal
      v-model:visible="visible"
      style="top: 200px"
      title="新建题集"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        :label-col="{ span: 4 }"
      >
        <a-form-item label="题集名称" name="name">
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item label="时间限制" name="time_limit">
          <a-input
            v-model:value="formState.time_limit"
            disabled
            placeholder="无时间限制"
          />
        </a-form-item>
        <a-form-item label="自动批改" name="is_auto_correct">
          <a-checkbox v-model:checked.boolen="formState.is_auto_correct">
          </a-checkbox>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup name="EvaluationDesign">
import { PlusOutlined } from "@ant-design/icons-vue";
import { ValidateErrorEntity } from "ant-design-vue/es/form/interface";
import { getDimensions, setDimensions } from "@/api/dimensions";
import {
  getQuestionsSetList,
  createQuestionsSet,
  updateQuestionsSet,
  delQuestionsSet,
  detailQuestionsSet,
} from "@/api/questionsset";
import {
  createQuestions,
  delQuestions,
  detailQuestions,
  updateQuestions,
  delOptions
} from "@/api/questions";
import { message, Modal } from "ant-design-vue";
import { useStore } from "@/store";

function getBase64(file: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
const store = useStore();
const courseInfo = computed(() => {
  return store.getCourseInfo;
});
const course_id = courseInfo.value.course_id;
interface FormState {
  name: string;
  time_limit: any;
  is_auto_correct: boolean;
}
const proContent = ref("sdfsdfd");
const score = ref(100);
const opi_random = ref("选项不随机");
const selectContent = ref("");
const isSelect = ref(1);
const activeKey = ref([""]);
const loading = ref<boolean>(true);
onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 500);
});
const formRef = ref();
const addFlag = ref<boolean>(false);
const confirmLoading = ref<boolean>(false);
const visible = ref<boolean>(false);
const visibleTitle = ref<boolean>(false);
const formState = reactive<FormState>({
  name: "",
  time_limit: undefined,
  // titleName: "",
  // time_limit:null,
  is_auto_correct: true,
});
const rules = {
  name: [
    { required: true, message: "请输入阶段名称", trigger: "blur" },
    { min: 1, max: 15, message: "长度15个字符以内", trigger: "blur" },
  ],
  titleName: [
    { required: true, message: "请输入题目名称", trigger: "blur" },
    { min: 1, max: 15, message: "长度15个字符以内", trigger: "blur" },
  ],
};
const questionsSetList = ref([]);
const evaOptions = ref<any>([]);
function getList() {
  let query = {
    course_id: course_id,
  };
  getQuestionsSetList(query)
    .then((res) => {
      questionsSetList.value = res.data;
      console.log(res.data);
    })
    .catch((err) => {});

  getDimensions(query).then((res) => {
    // evaOptions.value = res.data.list;
    // 将res.data.list以value和labbel的形式存入evaOptions
    res.data.list.forEach((item) => {
      evaOptions.value.push({
        value: item.dimension_id,
        label: item.name,
      });
    });
  });
}
// 测评维度id
const evaValue = ref<any>();
const value = ref<any>();
function handleEvaChange(value: any) {
  evaValue.value = value;
  let dimensions = {
    courseId: course_id,
    question_dimensions: [
      {
        question_id: question_id.value,
        dimension_id: evaValue.value,
      },
    ],
  };
  setDimensions(dimensions)
    .then(() => {})
    .catch((err) => {});
}
const focus = () => {
  console.log("focus");
};
const questions = ref<any>([]);
const selectQuestionsSet = (id: number) => {
  detailQuestionsSet(id).then((res) => {
    console.log(res.data);
    questions.value = res.data.questions;
  });
};
function detQueSet(id: number) {
  Modal.confirm({
    title: () => "你确定删除该题集吗？",
    content: () => "删除后不可撤回",
    okText: () => "确定",
    okType: "danger",
    cancelText: () => "取消",
    onOk() {
      delQuestionsSet(id)
        .then((res) => {
          getList();
          message.success("删除成功");
        })
        .catch((err) => {
          message.error("删除失败");
        });
    },
    onCancel() {
      console.log("Cancel");
    },
  });
}
function delQue(id: number) {
  Modal.confirm({
    title: () => "你确定删除该题集吗？",
    content: () => "删除后不可撤回",
    okText: () => "确定",
    okType: "danger",
    cancelText: () => "取消",
    onOk() {
      delQuestions(id)
        .then((res) => {
          getList();
          questions.value.forEach((item) => {
            if (item.question_id === id) {
              questions.value.splice(questions.value.indexOf(item), 1);
            }
          });
          message.success("删除成功");
        })
        .catch((err) => {
          message.error("删除失败");
        });
    },
    onCancel() {
      console.log("Cancel");
    },
  });
}

const question_set_id = ref();
// 更新题集
function updateQueSet(item: any) {
  formState.name = item.name;
  formState.is_auto_correct = item.is_auto_correct;
  formState.time_limit = item.time_limit;
  visible.value = true;
  addFlag.value = false;
  question_set_id.value = item.question_set_id;
}

const handleChange = (value: any) => {
  console.log(`selected ${value}`);
  // evaValue.value = value;
};
const handleOk = () => {
  console.log("点击了确定");

  formRef.value
    .validate()
    .then(() => {
      if (addFlag.value) {
        let query = {
          course_id: course_id,
        };
        confirmLoading.value = true;
        createQuestionsSet(query, formState)
          .then((res) => {
            console.log(res.data);
            visible.value = false;
            confirmLoading.value = false;
            formRef.value.resetFields();
            getList();
            message.success("添加成功");
          })
          .catch((err) => {
            visible.value = false;
            confirmLoading.value = false;
          });
        // 添加
      } else {
        // 编辑
        confirmLoading.value = true;
        updateQuestionsSet(question_set_id.value, formState)
          .then((res) => {
            visible.value = false;
            confirmLoading.value = false;
            formRef.value.resetFields();

            getList();
            message.success("修改成功");
          })
          .catch((err) => {
            visible.value = false;
            confirmLoading.value = false;
          });
      }
    })
    .catch((error: ValidateErrorEntity<FormState>) => {
      console.log("error", error);
    });
};
// 新建阶段
function aNewPhase() {
  addFlag.value = true;
  reset();
  visible.value = true;
}
// 新建题目
function newTopic(item) {
  question_set_id.value = item.question_set_id;
  editAreaTitle.value = item.name;
  message.info("在右侧编辑题目!");
}
function reset() {
  formState.name = "";
  // formState.titleName = "";
  formRef.value?.resetFields();
}
const previewVisible = ref(false);
const previewImage = ref("");
const fileList = ref<string[]>([]);

const handleCancel = () => {
  previewVisible.value = false;
};

const handlePreview = async (file: {
  url: any;
  preview: unknown;
  originFileObj: any;
}) => {
  if (!file.url && !file.preview) {
    file.preview = await getBase64(file.originFileObj);
  }
  previewImage.value = file.url || file.preview;
  previewVisible.value = true;
};

// const handleChange = ({ fileList: newFileList }) => {
//   fileList.value = newFileList;
// };
const options = ref<any>([]);
const addOption = () => {
  if (isSelect.value == 1) {
    options.value.push({
      // name: "",// 选项名称，例如A、B这类，为空则系统自动生成选项
      value: "asdfsdf",
      // resource_id: undefined,// 该选项的文件资源ID，与文本内容二选一，优先展示文件资源
      score: undefined,
      sort: 0,
      is_answer: false,
    });
  } else {
    options.value.push({
      resource_id: undefined,
      score: undefined,
      sort: 0,
      answer: "",
      is_ignore_case: true,
      is_include_str: false,
      // answer_res: undefined,该空的答案文件ID
    });
  }
};
const delOption = (question_option_id) => {
  delOptions(question_option_id)
    .then((res) => {
      detailQuestions(question_set_id.value);
      getList();
      message.success("删除成功");
    })
    .catch((err) => {
      message.error("删除失败");
    });
  // options.value.splice(index, 1);
};
const answerKey = ref<any>("sdfsdfdsfsdf");
const saveLoading = ref(false);
const { proxy }: any = getCurrentInstance();
const onSave = (index) => {
        selectQuestionsSet(question_set_id.value);
  let data = {};
  if (addFlag.value) {
    if (isSelect.value == 1) {
      data = {
        type: "RADIO",
        content: proContent.value,
        content_resource_id: [],
        // "answer": null,
        // "answer_res": null,
        // "answer_key_res": [],
        answer_key: answerKey.value,
        score: score.value,
        is_partial_score: false,
        opi_random: opi_random.value ? false : true,
        opi_select_num: 1,
        options: options.value,
      };
    } else {
      data = {
        type: "FILL_BLANK",
        content: proContent.value,
        content_resource_id: [],
        // "answer": null,
        // "answer_res": null,
        // "answer_key_res": [],
        answer_key: answerKey.value,
        score: undefined,
        is_partial_score: false,
        blanks: options.value,
      };
    }
    let query = {
      question_set_id: question_set_id.value,
    };
    createQuestions(query, data)
      .then((res) => {
        console.log(res.data);
        getList();
        selectQuestionsSet(question_set_id.value);
        message.success("添加成功");
        saveLoading.value = false;
      })
      .catch((err) => {
        message.error("添加失败", err);
        saveLoading.value = false;
      });
  } else {
    if (isSelect.value == 1) {
      data = {
        content: proContent.value,
        answer_key: answerKey.value,
      };
    } else {
      data = {
        "content": proContent.value,
        "answer_key": answerKey.value,
        "score": score.value,
        "is_partial_score": false,
      };
    }
    updateQuestions(question_id.value, data)
      .then((res) => {
        // getList();
        message.success("修改成功");
        saveLoading.value = false;
      })
      .catch((err) => {
        message.error("修改失败", err);
        saveLoading.value = false;
      });
  }
};
const editAreaTitle = ref("");
const question_id = ref();
// 选择题目
function selectQuestions(item, id) {
  question_set_id.value = id;
  question_id.value = item.question_id;
  detailQuestions(item.question_id).then((res) => {
    isSelect.value = item.type == "RADIO" ? 1 : 2;
    answerKey.value = res.data.answer_key;
    opi_random.value = res.data.opi_random ? "选项随机" : "选项不随机";
    proContent.value = res.data.content;
    if (item.type == "RADIO") {
      options.value = res.data.options;
    } else {
      options.value = res.data.blanks;
    }
    addFlag.value = false;
  });
  // proContent.value = item.des;
  // isSelect.value = item.queType;
  // options.value = item.questionsItem;
  // editAreaTitle.value = item.title;
}
getList();
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin";
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.content {
  margin: 24px;
  .bottom-content {
    .item {
      @include faj();
      height: 48px;
      cursor: pointer;

      .item-left {
        @include faj();
        .index {
          @include sc(14px, #2065e0);
        }
        .title {
          @include tbm(1);
          @include sc(14px, #666666);
        }
      }
    }
    .add-p {
      cursor: pointer;
      @include faj(center, center);
      @include sc(14px, #666666);
      // @include wh(280px, 32px);
      margin: 30px auto;
      border: 1px dashed #d9d9d9;
      border-radius: 4px;
    }
  }
  .bottom-content-right {
    padding: 0px 10px;
    align-items: center;
    flex-wrap: wrap;
    .eva-des {
      display: flex;
      .des {
        white-space: nowrap;
        @include sc(0.14rem, rgba(0, 0, 0, 0.85));
      }
      .txarea {
        margin-left: 15px;
        width: 280px;
      }
    }
    .upload {
      display: flex;
      margin-left: 10px;
      margin-top: 10px;
      .ant-upload-picture-card-wrapper {
        display: flex;
      }
    }
    .pay-radio-group {
      margin-left: 10px;
      display: flex;
      margin-top: 24px;
      .name {
        margin-right: 15px;
        @include sc(0.14rem, rgba(0, 0, 0, 0.85));
      }
    }
    .se-edit {
      @include wh(100%, 42px);
      background: #f6f6f8;
      border-radius: 4px 4px 0px 0px;
      @include sc(14px, #333333);
      line-height: 42px;
      margin-top: 30px;
      padding-left: 30px;
    }
    .item {
      padding: 30px;
      margin: 20px 0;
      background-color: #fafafc;
      position: relative;
      color: #333333;
      .text {
        margin-top: 5px;
      }
      .score {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .select-item {
          margin-bottom: 20px;
        }
      }

      .delete {
        white-space: nowrap;
        cursor: pointer;
        margin-top: 5px;
        margin-left: 15px;
        height: 100%;
        @include sc(14px, #1890ff);
      }
    }
    .add-s {
      cursor: pointer;
      @include faj(center, center);
      @include wh(100%, 32px);
      margin-top: 15px;
      border: 1px dashed #d9d9d9;
      border-radius: 4px;
      @include sc(14px, #666666);
    }
  }
}
</style>
