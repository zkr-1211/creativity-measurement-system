<!--  -->
<template>
  <div class="body">
    <page-header title="设计测评题目与阶段">
      <template #right>
        <a-button type="primary">
          保存
        </a-button>
        <a-button style="margin-left:10px;">
          取消
        </a-button>
      </template>
    </page-header>
    <div class="content">
      <div class="left">
        <HeaderItem title="题目与阶段">
          <a-button type="primary">
            + 新建测评
          </a-button>
        </HeaderItem>
        <div class="bottom-content">
          <a-collapse
            v-model:activeKey="activeKey"
            :bordered="false"
          >
            <a-collapse-panel
              v-for="(item, index) in 3"
              :key="index"
              :header="`阶段${index + 1}`"
            >
              <div
                v-for="(item, index1) in 3"
                :key="index1"
                class="item"
              >
                <div class="item-left">
                  <div class="index">
                    0{{ index + 1 }}：
                  </div>
                  <div class="title">
                    第一题
                  </div>
                </div>
                <div class="item-right">
                  <Dot />
                </div>
              </div>
              <template #extra>
                <Dot />
              </template>
            </a-collapse-panel>
          </a-collapse>
          <div class="add-p">
            + 新增题目
          </div>
        </div>
      </div>
      <div class="right">
        <HeaderItem title="编辑区（第一阶段第一题）" />
        <div class="bottom-content">
          <div class="eva-des">
            <div class="des">
              题目内容:
            </div>
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
                <div class="ant-upload-text">
                  Upload
                </div>
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
              >
            </a-modal>
          </div>
          <div class="pay-radio-group">
            <div class="name">
              题型选择:
            </div>
            <a-radio-group v-model:value="isSelect">
              <a-radio :value="1">
                选择
              </a-radio>
              <a-radio :value="2">
                填空
              </a-radio>
            </a-radio-group>
          </div>
          <div class="se-edit">
            选项编辑
          </div>
          <div class="item">
            <div class="left-content">
              <div class="eva-des">
                <div class="des">
                  选项1:
                </div>
                <div class="txarea">
                  <a-textarea
                    v-model:value="selectContent"
                    placeholder="请输入题目内容"
                    :rows="4"
                    style="width:250px;"
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
                    <div class="ant-upload-text">
                      Upload
                    </div>
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
                  >
                </a-modal>
              </div>
            </div>
            <div class="text">
              对应得分维度：
            </div>
            <div class="score">
              <div
                v-for="(item,index) in 6"
                :key="index"
                class="select-item"
              >
                创造力：
                <a-select
                  style="width: 160px"
                >
                  <a-select-option value="jack">
                    Jack
                  </a-select-option>
                  <a-select-option value="lucy">
                    Lucy
                  </a-select-option>
                  <a-select-option value="Yiminghe">
                    yiminghe
                  </a-select-option>
                </a-select>
              </div>
            </div>

            <div class="delete">
              删除
            </div>
          </div>
          <div class="add-s">
            + 新增选项
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, defineComponent, ref } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import PageHeader from '@/components/page-header/index.vue'
import HeaderItem from '@/components/header-item/index.vue'
import Dot from '@/components/dot/index.vue'
function getBase64(file: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = () => resolve(reader.result)

    reader.onerror = error => reject(error)
  })
}
export default defineComponent({
  name: 'EvaluationDesign',
  components: { PageHeader, HeaderItem, Dot, PlusOutlined },
  setup() {
    const proContent = ref('')
    const selectContent = ref('')
    const isSelect = ref(1)

    const activeKey = ref(['0'])
    onMounted(() => {})
    const previewVisible = ref(false)
    const previewImage = ref('')
    const fileList = ref<string[]>([])

    const handleCancel = () => {
      previewVisible.value = false
    }

    const handlePreview = async(file: { url: any; preview: unknown; originFileObj: any }) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }

      previewImage.value = file.url || file.preview
      previewVisible.value = true
    }
    const handleChange = ({ fileList: newFileList }) => {
      fileList.value = newFileList
    }
    return {
      activeKey,
      previewVisible,
      previewImage,
      fileList,
      proContent,
      selectContent,
      isSelect,
      handleCancel,
      handlePreview,
      handleChange
    }
  }
})
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
.body {
  .content {
    margin: 24px;
    display: flex;
    .left {
      @include wh(25%, 840px);
      background: #ffffff;
      opacity: 1;
      border-radius: 2px;
      .bottom-content {
        padding: 20px;
        .item {
          @include faj();
          height: 48px;
          .item-left {
            @include faj();
            .index {
              @include sc(14px, #2065e0);
            }
            .title {
              @include sc(14px, #666666);
            }
          }
        }
        .add-p {
          cursor: pointer;
          @include faj(center, center);
          @include sc(14px, #666666);
          @include wh(280px, 32px);
          margin: 30px auto;
          border: 1px dashed #d9d9d9;
          border-radius: 4px;
        }
      }
    }
    .right {
      margin-left: 24px;
      width: 75%;
      background: #ffffff;
      .bottom-content {
        padding: 20px;
        .eva-des {
          margin-left: 30px;
          display: flex;
          .des {
            @include sc(0.14rem, rgba(0, 0, 0, 0.85));
          }
          .txarea {
            margin-left: 15px;
            width: 280px;
          }
        }
        .upload {
          margin: 30px 0px 0px 100px;
        }
        .pay-radio-group {
          margin-left: 30px;
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
          position: relative;
          margin-top: 30px;
          display: flex;
          color: #333333;
          .text {
            margin-left: 25px;
            margin-top: 5px;
          }
          .score {
            display: flex;
            flex-direction: column;
            .select-item {
              margin-bottom: 20px;
            }
          }

          .delete {
            cursor: pointer;
            margin-top: 5px;
            position: absolute;
            right: 30px;
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
  }
}
</style>
