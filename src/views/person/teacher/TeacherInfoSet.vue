<template>
  <div class="body">
    <div class="content">
      <div class="left">
        <a-menu
          v-model:selectedKeys="selectedKeys"
          :mode="mode"
          :theme="theme"
        >
          <a-menu-item key="1">
            基本设置
          </a-menu-item>
        </a-menu>
      </div>
      <div class="right">
        <div class="title">
          基本设置
        </div>
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
                  <div class="name">
                    姓名
                  </div>
                  <div class="input">
                    <a-input
                      v-model:value.trim="userName"
                      placeholder="请输入姓名"
                    />
                  </div>
                </div>
                <div class="eva-name">
                  <div class="name">
                    性别
                  </div>
                  <div class="input">
                    <a-select
                      ref="select"
                      v-model:value.trim="sex"
                      style="width: 160px"
                      @focus="focus"
                      @change="handleChangeState"
                    >
                      <a-select-option value="jack">
                        Jack
                      </a-select-option>
                    </a-select>
                  </div>
                </div>
                <div class="eva-name">
                  <div class="name">
                    工号
                  </div>
                  <div class="input">
                    <a-input
                      v-model:value.trim="jobId"
                      placeholder="请输入工号"
                    />
                  </div>
                </div>
                <div class="eva-name">
                  <div class="name">
                    身份证
                  </div>
                  <div class="input">
                    <a-input
                      v-model:value.trim="ID"
                      placeholder="请输入身份证"
                    />
                  </div>
                </div>
                <div class="eva-name">
                  <div class="name">
                    手机号
                  </div>
                  <div class="input">
                    <a-input
                      v-model:value.trim="phoneNum"
                      placeholder="请输入手机号"
                    />
                  </div>
                </div>
                <div
                  class="button"
                  @click="updateInfo"
                >
                  <a-button type="primary">
                    更新基本信息
                  </a-button>
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
                  <div class="name">
                    头像
                  </div>
                  <div class="header" />
                  <a-upload
                    v-model:file-list="fileList"
                    class="upload"
                    name="file"
                    :multiple="true"
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    @change="handleChangeFile"
                  >
                    <a-button>
                      <upload-outlined />
                      上传文件
                    </a-button>
                  </a-upload>
                </div>
              </div>
            </a-col>
          </a-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
export default defineComponent({
  components: {
    UploadOutlined
  },
  setup() {
    const stateMenu = reactive({
      mode: 'inline',
      theme: 'light',
      selectedKeys: ['1']
    })
    // 个人信息
    const personage = reactive({
      userName: '张老师',
      sex: '男',
      jobId: '123456',
      ID: '123456',
      phoneNum: '123456'
    })
    // 测评名称
    const evaName = ref('')

    // 测评介绍
    const evaDes = ref('')

    // 上传文件
    const fileList = ref([])
    const handleChangeFile = (infoFile: { file: { status: string; name: any }; fileList: any }) => {
      if (infoFile.file.status !== 'uploading') {
        console.log(infoFile.file, infoFile.fileList)
      }

      if (infoFile.file.status === 'done') {
        message.success(`${infoFile.file.name} file uploaded successfully`)
      } else if (infoFile.file.status === 'error') {
        message.error(`${infoFile.file.name} file upload failed.`)
      }
    }
    // 更新基本信息
    const updateInfo = () => {
      const params = {
        evaName: evaName.value,
        evaDes: evaDes.value
      }
      console.log(params)
    }
    // 状态选择框
    const focus = () => {
      console.log('focus')
    }

    const handleChangeState = (value: any) => {
      console.log(`selected ${value}`)
    }
    // 表格
    return {
      ...toRefs(stateMenu),
      ...toRefs(personage),
      handleChangeFile,
      updateInfo,
      focus,
      handleChangeState,
      fileList
    }
  }
})
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin";
.body {
  .content {
    margin: 24px;
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
        // display: flex;
        .center {
          .eva-name {
            margin-top: 0.24rem;
            .name {
              @include sc(0.14rem, rgba(0, 0, 0, 0.85));
            }
            .input {
              margin-top: 0.08rem;
              width: 2.1rem;
            }
            .region {
              margin-top: 0.08rem;
              display: flex;
              flex-wrap: wrap;
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
            display: flex;
            align-items: center;
            flex-direction: column;
            .header {
              margin: 15px 0;
              @include wh(144px, 144px);
              background: rgba(0, 0, 0, 1);
              @include borderRadius(50%);
            }
            .upload {
              // margin: 20px auto;
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
