<template>
  <div class="body">
    <div class="content">
      <div class="left">
        <a-menu
          v-model:selectedKeys="selectedKeys"
          style="width: 256px"
          :mode="mode"
          :theme="theme"
        >
          <a-menu-item key="1">
            模型维度编辑
          </a-menu-item>
        </a-menu>
      </div>
      <div class="right">
        <div class="title">
          模型维度编辑
        </div>
        <div class="infos">
          <div class="center">
            <div class="eva-name">
              <div class="name">
                维度选择
              </div>
              <div class="radio-group">
                <a-radio-group v-model:value="attribute">
                  <a-radio :value="0">
                    五维
                  </a-radio>
                  <a-radio :value="1">
                    六维
                  </a-radio>
                </a-radio-group>
              </div>
            </div>
            <div class="eva-name">
              <div class="name">
                第一维属性
              </div>
              <div class="input">
                <a-input
                  v-model:value.trim="oneAttribute"
                  placeholder="请输入第一维属性"
                />
              </div>
            </div>
            <div class="eva-name">
              <div class="name">
                第二维属性
              </div>
              <div class="input">
                <a-input
                  v-model:value.trim="twoAttribute"
                  placeholder="请输入第二维属性"
                />
              </div>
            </div>
            <div class="eva-name">
              <div class="name">
                第三维属性
              </div>
              <div class="input">
                <a-input
                  v-model:value.trim="threeAttribute"
                  placeholder="请输入第三维属性"
                />
              </div>
            </div>
            <div class="eva-name">
              <div class="name">
                第四维属性
              </div>
              <div class="input">
                <a-input
                  v-model:value.trim="fourAttribute"
                  placeholder="请输入第四维属性"
                />
              </div>
            </div>
            <div class="eva-name">
              <div class="name">
                第五维属性
              </div>
              <div class="input">
                <a-input
                  v-model:value.trim="fiveAttribute"
                  placeholder="请输入第五维属性"
                />
              </div>
            </div>
            <div
              v-if="attribute"
              class="eva-name"
            >
              <div class="name">
                第六维属性
              </div>
              <div class="input">
                <a-input
                  v-model:value.trim="sixAttribute"
                  placeholder="请输入第六维属性"
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
          <div class="r-r">
            <div class="header-info">
              <div class="name">
                预览模型
              </div>
              <div class="header" />
              <div class="model-dimension">
                <ModelDimension
                  :color-list="colorList"
                  :data="data"
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
                      <div class="data-title">
                        个人
                      </div>
                    </div>
                    <div class="num">
                      33
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
// import { UploadOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import ModelDimension from '@/components/model-dimension/index.vue'
function getBase64(img: Blob, callback: any) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

export default defineComponent({
  components: {
    // UploadOutlined,
    ModelDimension
  },
  setup() {
    const stateMenu = reactive({
      mode: 'inline',
      theme: 'light',
      selectedKeys: ['1']
    })
    const colorList = ref(['red', 'blue', 'yellow'])
    // 个人信息
    const personage = reactive({
      oneAttribute: '张克榕',
      twoAttribute: '男',
      threeAttribute: '1',
      fourAttribute: '123456',
      fiveAttribute: '123456',
      sixAttribute: '123456',
      attribute: 0
    })
    const data = [
      {
        value: [4200, 3000, 20000, 35000, 50000, 18000],
        itemStyle: {
          color: colorList.value[0]
        }
      },
      {
        value: [5000, 14000, 28000, 26000, 42000, 21000],
        itemStyle: {
          color: colorList.value[1]
        }
      },
      {
        value: [5000, 1600, 2600, 28000, 32000, 11000],
        itemStyle: {
          color: colorList.value[2]
        }
      }
    ]
    // 测评名称
    const evaName = ref('')

    // 测评介绍
    const evaDes = ref('')

    // 上传封面
    const imageList = ref([])
    const loading = ref(false)
    const imageUrl = ref('')

    const handleChange = (info: { file: { status: string; originFileObj: any } }) => {
      if (info.file.status === 'uploading') {
        loading.value = true
        return
      }

      if (info.file.status === 'done') {
        getBase64(info.file.originFileObj, (base64Url: string) => {
          imageUrl.value = base64Url
          loading.value = false
        })
      }

      if (info.file.status === 'error') {
        loading.value = false
        message.error('upload error')
      }
    }

    const beforeUpload = (file: { type: string; size: number }) => {
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png'

      if (!isJpgOrPng) {
        message.error('You can only upload JPG file!')
      }

      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isLt2M) {
        message.error('Image must smaller than 2MB!')
      }

      return isJpgOrPng && isLt2M
    }
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
    const stateValue = ref('')
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
      imageList,
      fileList,
      loading,
      imageUrl,
      evaName,
      evaDes,
      stateValue,
      colorList,
      data,
      handleChange,
      handleChangeFile,
      beforeUpload,
      updateInfo,
      focus,
      handleChangeState
    }
  }
})
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
      .title {
        @include sc(0.2rem, rgba(0, 0, 0, 0.85));
        font-weight: bold;
      }
      .infos {
        display: flex;
        .center {
          width: 500px;
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
              display: flex;
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
          .header-info {
            display: flex;
            flex-direction: column;
            .name {
              @include sc(16px, rgba(0, 0, 0, 0.85));
              font-weight: bold;
              margin-bottom: 10px;
            }
            .header {
              @include wh(500px, 1px);
              background: #e9e9e9;
            }
            .model-dimension {
              @include wh(500px, 500px);
              .model-data {
                width: 100%;
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
