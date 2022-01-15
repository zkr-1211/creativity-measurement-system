<!--  -->
<template>
  <page-header title="管理员" />
  <div class="card">
    <div class="top">
      <div class="top-left">
        人员列表
      </div>
      <div class="top-right">
        <a-button
          type="primary"
          @click="visible = true"
        >
          +添加
        </a-button>
      </div>
    </div>
    <div class="table">
      <a-table
        :scroll="{ y: 450 }"
        :row-selection="rowSelection"
        :columns="columns"
        :data-source="dataSource"
        :pagination="pagination"
      >
        <template #name="{ text }">
          <a>{{ text }}</a>
        </template>
        <template #ID="{ record }">
          {{ record.ID }}
        </template>
        <template
          v-for="col in ['ID']"
          #[col]="{ text, record }"
          :key="col"
        >
          <div>
            <a-input
              v-if="editableData[record.key]"
              v-model:value="editableData[record.key][col]"
              style="margin: -5px 0"
            />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template #operation="{ record }">
          <div class="editable-row-operations">
            <span v-if="editableData[record.key]">
              <a @click="save(record.key)">保存</a>
              <span class="fengefu">|</span>
              <a-popconfirm
                title="Sure to cancel?"
                @confirm="cancel(record.key)"
              >
                <a>取消</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a @click="onEdit(record.key)">权限编辑</a>
              <span class="fengefu">|</span>
              <a-popconfirm
                title="确认删除该项吗?"
                @confirm="onDelete(record.key)"
              >
                <a>删除</a>
              </a-popconfirm>
            </span>
          </div>
        </template>
      </a-table>
    </div>
  </div>
  <a-modal
    v-model:visible="visible"
    style="top: 200px"
    title="添加管理员"
    :confirm-loading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item
        ref="name"
        label="姓名"
        name="name"
      >
        <a-input v-model:value="formState.name" />
      </a-form-item>
      <a-form-item
        ref="ID"
        label="身份"
        name="ID"
      >
        <a-input v-model:value="formState.ID" />
      </a-form-item>
      <a-form-item
        ref="phone"
        label="手机号"
        name="phone"
      >
        <a-input v-model:value="formState.phone" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, UnwrapRef } from 'vue'
import { cloneDeep } from 'lodash-es'
import PageHeader from '@/components/page-header/index.vue'
interface dataType {
  key: string;
  ID: string;
  name: string;
  phone: string;
  createNum: string;
  time: string;
  increase: boolean;
}
interface FormState {
  name: string;
  ID: string | undefined;
  phone: number | undefined;
}
const columns = [
  {
    title: '管理员ID',
    dataIndex: 'key'
    // sorter: (a: { key: number }, b: { key: number }) => a.key - b.key
  },
  {
    title: '姓名',
    dataIndex: 'name',
    slots: {
      customRender: 'name'
    }
  },
  {
    title: '身份',
    dataIndex: 'ID',
    slots: {
      customRender: 'ID'
    }
  },
  {
    title: '添加时间',
    dataIndex: 'time',
    defaultSortOrder: 'descend',
    sorter: (a, b) => {
      const aTime = new Date(a.time).getTime()
      const bTime = new Date(b.time).getTime()
      return aTime - bTime
    },
    slots: {
      customRender: 'time'
    }
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    slots: {
      customRender: 'phone'
    }
  },
  {
    title: '创建测评数',
    dataIndex: 'createNum',
    slots: {
      customRender: 'createNum'
    }
  },
  // {
  //   title: '周涨幅',
  //   dataIndex: 'weeklyGains',
  //   filterMultiple: false,
  //   slots: {
  //     customRender: 'weeklyGains'
  //   },
  //   onFilter: (value: any, record: { weeklyGains: string | any[] }) => record.weeklyGains.indexOf(value) === 0,
  //   sorter: (a: { weeklyGains: string | any[] }, b: { weeklyGains: string | any[] }) => a.weeklyGains.length - b.weeklyGains.length,
  //   sortDirections: ['descend', 'ascend']
  // },
  {
    title: '操作',
    dataIndex: 'operation',
    slots: {
      customRender: 'operation'
    }
  }
]
const data: dataType[] = []
for (let i = 1; i < 50; i++) {
  data.push({
    key: `1231254543${i}`,
    ID: `测评师${i}`,
    name: `John Brown${i}`,
    phone: `12353434634${i}`,
    createNum: `${i}`,
    time: `2017-10-31 23:12:${i}`,
    increase: true
  })
}
export default defineComponent({
  name: 'IsAdministrator',
  components: {
    PageHeader
  },
  setup() {
    // 搜素
    const value = ref('')
    const onSearch = (searchValue: any) => {
      console.log('use value', searchValue)
      console.log('or use this.value', value.value)
    }
    // 表格以及分页部分
    const tableState = reactive({
      pagination: {
        showTotal: (total: any) => `共 ${total} 条数据`,
        defaultPageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['2', '10', '15', '20']
      }
    })
    const rowSelection = {
      onChange: (selectedRowKeys: any, selectedRows: any) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          'selectedRows: ',
          selectedRows
        )
      },
      getCheckboxProps: (record: { name: string }) => ({
        disabled: record.name === 'Disabled User',
        // Column configuration not to be checked
        name: record.name
      })
    }
    const dataSource = ref(data)
    const editableData: any = reactive({})
    const onDetail = (key: any) => {
      console.log('onDetail', key)
    }
    const onEdit = (key: string) => {
      editableData[key] = cloneDeep(
        dataSource.value.filter((item) => key === item.key)[0]
      )
    }
    const onDelete = (key: string) => {
      dataSource.value = dataSource.value.filter((item) => item.key !== key)
    }
    const save = (key: string) => {
      Object.assign(
        dataSource.value.filter((item) => key === item.key)[0],
        editableData[key]
      )
      delete editableData[key]
    }
    const cancel = (key: string | number) => {
      delete editableData[key]
    }

    const modalText = ref<string>('Content of the modal')
    const visible = ref<boolean>(false)
    const confirmLoading = ref<boolean>(false)

    const showModal = () => {
      visible.value = true
    }
    const handleOk = () => {
      modalText.value = 'The modal will be closed after two seconds'
      confirmLoading.value = true
      setTimeout(() => {
        visible.value = false
        confirmLoading.value = false
        formRef.value.resetFields()
      }, 2000)
    }
    const handleCancel = () => {
      formRef.value.resetFields()
    }
    const formRef = ref()
    const formState: UnwrapRef<FormState> = reactive({
      name: '',
      phone: undefined,
      ID: ''
    })
    const rules = {
      name: [
        { required: true, message: '请输入姓名', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
      ],
      ID: [{ required: true, message: '请输入身份', trigger: 'blur' }],
      phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
    }
    return {
      ...toRefs(tableState),
      value,
      dataSource,
      columns,
      rowSelection,
      editingKey: '',
      editableData,
      onSearch,
      onEdit,
      onDetail,
      onDelete,
      save,
      cancel,
      modalText,
      visible,
      confirmLoading,
      showModal,
      handleOk,
      handleCancel,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: '',
      formState,
      rules,
      formRef
    }
  }
})
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin";
.card {
  margin: 16px 24px 32px 24px;
  background: #ffffff;
  padding: 20px 30px;
  .top {
    @include faj();
    @include sc(16px, #000000);
    opacity: 0.85;
  }
  .table {
    margin-top: 20px;
    .editable-row-operations {
      .fengefu {
        margin-right: 8px;
        color: #e8e8e8;
      }
    }
    .editable-row-operations a {
      margin-right: 8px;
    }
  }
}
</style>
