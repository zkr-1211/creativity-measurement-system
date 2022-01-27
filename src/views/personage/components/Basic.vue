<template>
  <div class="body">
    <div class="title">
      基本设置
    </div>
    <div class="infos">
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
            班级
          </div>
          <div class="input">
            <a-input
              v-model:value.trim="sclass"
              placeholder="请输入班级"
            />
          </div>
        </div>

        <div class="eva-name">
          <div class="name">
            学号
          </div>
          <div class="input">
            <a-input
              v-model:value.trim="stuId"
              placeholder="请输入学号"
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

        <div class="eva-name">
          <div class="name">
            所在省市
          </div>
          <div class="region">
            <a-select
              ref="select"
              v-model:value.trim="province"

              @focus="focus"
              @change="handleChangeState"
            >
              <a-select-option value="jack">
                Jack
              </a-select-option>
            </a-select>
            <a-select
              ref="select"
              v-model:value.trim="city"
              class="select"

              @focus="focus"
              @change="handleChangeState"
            >
              <a-select-option value="jack">
                Jack
              </a-select-option>
            </a-select>
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
    </div>
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
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
function getBase64(img: Blob, callback: any) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default defineComponent({
  components: {
    UploadOutlined
  },
  setup() {
    // 个人信息
    const personage = reactive({
      userName: '张克榕',
      sex: '男',
      sclass: '1',
      stuId: '123456',
      ID: '123456',
      phoneNum: '123456',
      province: '福建',
      city: '福州',
      // 监护人信息
      guardianName: '阿斯顿',
      guardiansex: '女',
      guardianPhoneNum: '1254788'
    })
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
      ...toRefs(personage),
      imageList,
      fileList,
      loading,
      imageUrl,
      evaName,
      evaDes,
      stateValue,
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

   .title {
        @include sc(0.2rem, rgba(0, 0, 0, 0.85));
        font-weight: bold;
      }
      .infos {
        .center {
          // width: 500px;
          .eva-name {
            margin-top: 0.24rem;
            .name {
              @include sc(0.14rem, rgba(0, 0, 0, 0.85));
            }
            .input {
              margin-top: 0.08rem;
              min-width: 2rem;
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
          .header-info {
            display: flex;
            flex-direction: column;
            .header {
              @include wh(144px, 144px);
              background: rgba(0, 0, 0, 1);
              @include borderRadius(50%);
            }
            .upload {
              margin: 20px auto;
            }
          }
        }
      }
</style>
