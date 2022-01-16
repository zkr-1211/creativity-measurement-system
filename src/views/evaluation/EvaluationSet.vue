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
          <a-menu-item key="2">
            公开设置
          </a-menu-item>
          <a-menu-item key="3">
            开通付费设置
          </a-menu-item>
        </a-menu>
      </div>
      <div class="right">
        <template v-if="selectedKeys[0] === '1'">
          <div class="title">
            基本设置
          </div>
          <div class="eva-name">
            <div class="name">
              测评名称
            </div>
            <div class="input">
              <a-input
                v-model:value.trim="evaName"
                placeholder="请输入测评名称"
              />
            </div>
          </div>
          <div class="eva-des">
            <div class="des">
              测评介绍
            </div>
            <div class="txarea">
              <a-textarea
                v-model:value="evaDes"
                placeholder="请输入测评介绍"
                :rows="4"
              />
            </div>
          </div>
          <div class="eva-tag">
            <div class="name">
              测评标签
            </div>
            <div class="input">
              <a-input
                v-model:value.trim="evaTag"
                placeholder="请输入测评标签"
              />
            </div>
            <div class="tags">
              <template
                v-for="(tag, index) in tags"
                :key="tag"
              >
                <a-tooltip
                  v-if="tag.length > 20"
                  :title="tag"
                >
                  <a-tag
                    :closable="index !== 0"
                    @close="handleClose(tag)"
                  >
                    {{ `${tag.slice(0, 20)}...` }}
                  </a-tag>
                </a-tooltip>
                <a-tag
                  v-else
                  :closable="index !== 0"
                  @close="handleClose(tag)"
                >
                  {{ tag }}
                </a-tag>
              </template>
              <a-input
                v-if="inputVisible"
                ref="inputRef"
                v-model:value.trim="inputValue"
                type="text"
                size="small"
                :style="{ width: '78px' }"
                @blur="handleInputConfirm"
                @keyup.enter="handleInputConfirm"
              />
              <a-tag
                v-else
                style="background: #fff; border-style: dashed"
                @click="showInput"
              >
                <plus-outlined />
              </a-tag>
            </div>
          </div>
          <div class="cover-set">
            <div class="name">
              封面设置
            </div>
            <a-upload
              v-model:file-list="imageList"
              name="avatar"
              list-type="picture-card"
              class="avatar-uploader"
              :show-upload-list="false"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              :before-upload="beforeUpload"
              @change="handleChange"
            >
              <img
                v-if="imageUrl"
                :src="imageUrl"
                alt="avatar"
              >
              <div v-else>
                <loading-outlined v-if="loading" />
                <plus-outlined v-else />
                <div class="ant-upload-text">
                  上传封面
                </div>
              </div>
            </a-upload>
            <a-upload
              v-model:file-list="fileList"
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
          <div
            class="button"
            @click="updateInfo"
          >
            <a-button type="primary">
              更新基本信息
            </a-button>
          </div>
        </template>
        <template v-else-if="selectedKeys[0] === '2'">
          <div class="title">
            公开设置
          </div>
          <div class="publicity-name">
            <div class="name">
              公开方式
            </div>
            <div class="radio-group">
              <a-radio-group v-model:value="publicValue">
                <a-radio :value="1">
                  公开
                </a-radio>
                <a-radio :value="2">
                  部分公开
                </a-radio>
                <a-radio :value="3">
                  不公开
                </a-radio>
              </a-radio-group>
            </div>
          </div>
          <div class="set-eye-org">
            <div class="text">
              设置可见机构/学校
            </div>
            <div class="set-eye-org-right">
              <div class="state-select">
                <span>状态：</span>
                <a-select
                  ref="select"
                  v-model:value.trim="stateValue"
                  @focus="focus"
                  @change="handleChangeState"
                >
                  <a-select-option value="jack">
                    Jack
                  </a-select-option>
                </a-select>
              </div>
              <div class="set-button">
                <a-button
                  type="primary"
                  class="but-e"
                >
                  设为可见
                </a-button>
                <a-button type="primary">
                  取消可见
                </a-button>
              </div>
            </div>
          </div>
          <div class="table">
            <a-spin :spinning="spinning">
              <a-table
                :row-selection="{
                  selectedRowKeys: selectedRowKeys,
                  onChange: onSelectChange,
                }"
                :columns="columns"
                :data-source="dataSource"
                :loading="loading"
                :page-size="1"
                :pagination="pagination"
              >
                <template #bodyCell="{ column, text }">
                  <template v-if="column.dataIndex === 'key'">
                    {{ text.first }} {{ text.last }}
                  </template>
                </template>
              </a-table>
            </a-spin>
          </div>
          <div class="save">
            <a-button type="primary">
              保存
            </a-button>
          </div>
        </template>
        <template v-else-if="selectedKeys[0] === '3'">
          <div class="title">
            开通付费设置
          </div>
          <div class="pay-radio-group">
            <div class="name">
              是否付费
            </div>
            <a-radio-group v-model:value="isPay">
              <a-radio :value="1">
                免费
              </a-radio>
              <a-radio :value="2">
                付费
              </a-radio>
            </a-radio-group>
          </div>
          <div
            v-show="isPay == 2"
            class="pay-name"
          >
            <div class="name">
              付费金额
            </div>
            <div class="input">
              <a-input
                v-model:value.trim="money"
                placeholder="请输入金额"
              />
              <span>元</span>
            </div>
          </div>
          <div class="save">
            <a-button type="primary">
              保存
            </a-button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  nextTick,
  ref,
  computed,
  onMounted
} from 'vue'
import {
  PlusOutlined,
  UploadOutlined,
  LoadingOutlined
} from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
function getBase64(img: Blob, callback: any) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
const dataSource = [
  {
    key: `1`,
    orgName: `阿里巴巴1`,
    state: `1`
  },
  {
    key: `1`,
    orgName: `阿里巴巴1`,
    state: `1`
  },
  {
    key: `1`,
    orgName: `阿里巴巴1`,
    state: `1`
  },
  {
    key: `1`,
    orgName: `阿里巴巴1`,
    state: `1`
  },
  {
    key: `1`,
    orgName: `阿里巴巴1`,
    state: `1`
  }
]
for (let i: any; i < 10; i++) {
  dataSource.push({
    key: `${i}`,
    orgName: `阿里巴巴${i}`,
    state: `${i}`
  })
}
const columns = [
  {
    title: '机构ID',
    dataIndex: 'key',
    sorter: true,
    width: '40%'
  },
  {
    title: '机构名称',
    dataIndex: 'orgName',
    width: '40%'
  },
  {
    title: '状态',
    dataIndex: 'state',
    filters: [
      {
        text: '可见',
        value: 'isLook'
      },
      {
        text: '不可见',
        value: 'isNoLook'
      }
    ]
  }
]

export default defineComponent({
  components: {
    PlusOutlined,
    UploadOutlined,
    LoadingOutlined
  },
  setup() {
    const stateMenu = reactive({
      mode: 'inline',
      theme: 'light',
      selectedKeys: ['2']
    })
    // 测评名称
    const evaName = ref('')

    // 测评介绍
    const evaDes = ref('')

    // 公开
    const publicValue = ref(1)

    // 标签
    const inputRef = ref()
    const evaTag = ref('')
    const state = reactive({
      tags: ['Tag 1', 'Tag 2', 'Tag 3'],
      inputVisible: false,
      inputValue: ''
    })
    const handleClose = (removedTag: string) => {
      const tags = state.tags.filter((tag) => tag !== removedTag)
      console.log(tags)
      state.tags = tags
    }

    const showInput = () => {
      state.inputVisible = true
      nextTick(() => {
        inputRef.value.focus()
      })
    }

    const handleInputConfirm = () => {
      const inputValue = state.inputValue
      let tags = state.tags

      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue]
      }

      console.log(tags)
      Object.assign(state, {
        tags,
        inputVisible: false,
        inputValue: ''
      })
    }
    // 上传封面
    const imageList = ref([])
    const loading = ref(false)
    const imageUrl = ref('')

    const handleChange = (info: {
      file: { status: string; originFileObj: Blob };
    }) => {
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
    const handleChangeFile = (infoFile: {
      file: { status: string; name: any };
      fileList: any;
    }) => {
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
        evaDes: evaDes.value,
        evaTag: evaTag.value
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
    const tableLoading = ref(false)
    const tableState = reactive({
      pagination: {
        showTotal: (total: any) => `共 ${total} 条数据`,
        defaultPageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['2', '10', '15', '20']
      },
      selectedRowKeys: [],
      // Check here to configure the default column
      loading: false
    })
    const hasSelected = computed(() => tableState.selectedRowKeys.length > 0)

    const start = () => {
      tableState.loading = true // ajax request after empty completing

      setTimeout(() => {
        tableState.loading = false
        tableState.selectedRowKeys = []
      }, 1000)
    }

    const onSelectChange = (selectedRowKeys: never[]) => {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      tableState.selectedRowKeys = selectedRowKeys
    }
    // 开通付费设置
    const isPay = ref(1)
    const money = ref('')
    const spinning = ref<boolean>(true)
    onMounted(() => {
      setTimeout(() => {
        spinning.value = false
      }, 500)
    })
    return {
      ...toRefs(state),
      ...toRefs(stateMenu),
      ...toRefs(tableState),
      handleClose,
      showInput,
      handleInputConfirm,
      inputRef,
      imageList,
      fileList,
      loading,
      tableLoading,
      imageUrl,
      evaName,
      evaDes,
      evaTag,
      publicValue,
      stateValue,
      handleChange,
      handleChangeFile,
      beforeUpload,
      updateInfo,
      focus,
      handleChangeState,
      dataSource,
      // pagination,
      columns,
      tableState,
      hasSelected,
      onSelectChange,
      start,
      isPay,
      money,
      spinning
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
      width: 256px;
      height: 100%;
    }
    .right {
      color: #000;
      padding-left: 30px;
      width: 100%;
      .title {
        @include sc(0.2rem, rgba(0, 0, 0, 0.85));
        font-weight: bold;
      }
      .eva-name {
        margin-top: 0.24rem;
        .name {
          @include sc(0.14rem, rgba(0, 0, 0, 0.85));
        }
        .input {
          margin-top: 0.08rem;
          max-width: 3.1rem;
        }
      }
      .eva-des {
        margin-top: 0.24rem;
        .des {
          @include sc(0.14rem, rgba(0, 0, 0, 0.85));
        }
        .txarea {
          margin-top: 0.08rem;
          max-width: 4.68rem;
        }
      }
      .eva-tag {
        margin-top: 0.24rem;
        .name {
          @include sc(0.14rem, rgba(0, 0, 0, 0.85));
        }
        .input {
          margin-top: 0.08rem;
          max-width: 4.68rem;
        }
        .tags {
          margin-top: 0.08rem;
        }
      }
      .cover-set {
        margin-top: 0.32rem;
        .name {
          @include sc(0.14rem, rgba(0, 0, 0, 0.85));
        }
        img {
        }
        div {
          .ant-upload-text {
          }
        }
        .avatar-uploader {
          margin-top: 0.08rem;
        }
        .upload-file {
        }
      }
      .button {
        margin-top: 1rem;
      }
      .publicity-name {
        margin-top: 0.24rem;

        .name {
          @include sc(0.14rem, rgba(0, 0, 0, 0.85));
        }
        .radio-group {
          margin-top: 0.08rem;
        }
      }
      .set-eye-org {
        @include faj();
        margin-top: 0.24rem;

        .text {
          font-size: 16px;
          color: #000000;
          opacity: 0.85;
        }
        .set-eye-org-right {
          @include faj();
          .state-select {
            margin-right: 40px;
            span {
            }
          }
          .set-button {
            .but-e {
              margin-right: 8px;
            }
          }
        }
      }
      .table {
        margin-top: 21px;
      }
      .save {
        margin-top: 70px;
      }
      .pay-radio-group {
        margin-top: 24px;
        .name {
          margin-bottom: 8px;
          @include sc(0.14rem, rgba(0, 0, 0, 0.85));
        }
      }
      .pay-name {
        margin-top: 24px;
        .name {
          @include sc(0.14rem, rgba(0, 0, 0, 0.85));
        }
        .input {
          margin-top: 8px;
          max-width: 1.68rem;
          @include faj();
          span {
            margin-left: 10px;
          }
        }
      }
    }
  }
}
</style>
