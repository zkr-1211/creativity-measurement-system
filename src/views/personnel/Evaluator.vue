<!--  -->
<template>
  <page-header title="测评师" />
  <a-card
    title="人员列表"
    style="margin: 24px"
  >
    <template #extra>
      <a-button
        type="primary"
        @click="visible = true"
      >
        + 添加
      </a-button>
    </template>
    <a-spin :spinning="spinning">
      <Table
        :columns="columns"
        :data-source="dataSource"
      >
        <template
          v-for="item in columns"
          #[item.dataIndex]="{ scope }"
          :key="item.dataIndex"
        >
          <div v-if="!item.isSlot">
            <a-input
              v-if="editableData[scope.record.key] && item.isEdit"
              v-model:value="editableData[scope.record.key][item.dataIndex]"
              style="margin: -5px 0"
            />
            <template v-else>
              {{ scope.text }}
            </template>
          </div>
          <div v-else>
            <div class="editable-row-operations">
              <span v-if="editableData[scope.record.key]">
                <a @click="save(scope.record.key)">保存</a>
                <span class="fengefu">|</span>
                <a-popconfirm
                  title="Sure to cancel?"
                  @confirm="cancel(scope.record.key)"
                >
                  <a>取消</a>
                </a-popconfirm>
              </span>
              <span v-else>
                <a @click="onEdit(scope.record.key)">权限编辑</a>
                <span class="fengefu">|</span>
                <a-popconfirm
                  title="确认删除该项吗?"
                  @confirm="onDelete(scope.record.key)"
                >
                  <a>删除</a>
                </a-popconfirm>
              </span>
            </div>
          </div>
        </template>
      </Table>
    </a-spin>
  </a-card>

  <a-modal
    v-model:visible="visible"
    style="top: 200px"
    title="添加测评师"
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
import { defineComponent, reactive, UnwrapRef, toRaw, ref, onMounted } from 'vue'
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
import PageHeader from '@/components/page-header/index.vue'
import Table from '@/components/table/index.vue'
import useTableOperation from '@/hooks/useTableOperation'
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
    isEdit: true,
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
    isSlot: true,
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
    PageHeader,
    Table
  },
  setup() {
    const {
      dataSource,
      editableData,
      onEdit,
      onDelete,
      save,
      cancel,
      modalText,
      visible,
      confirmLoading,
      handleCancel,
      formRef
    } = useTableOperation(data)
    const spinning = ref<boolean>(true)
    onMounted(() => {
      setTimeout(() => {
        spinning.value = false
      }, 3000)
    })
    const handleOk = () => {
      formRef.value
        .validate()
        .then(() => {
          console.log('values', formState, toRaw(formState))
          modalText.value = 'The modal will be closed after two seconds'
          confirmLoading.value = true
          setTimeout(() => {
            visible.value = false
            confirmLoading.value = false
            formRef.value.resetFields()
          }, 2000)
        })
        .catch((error: ValidateErrorEntity<FormState>) => {
          console.log('error', error)
        })
    }
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
      dataSource,
      columns,
      editableData,
      onEdit,
      onDelete,
      save,
      cancel,
      visible,
      confirmLoading,
      handleOk,
      handleCancel,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      formState,
      rules,
      formRef,
      spinning
    }
  }
})
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin";
.top {
  @include faj();
  @include sc(16px, #000000);
  opacity: 0.85;
}
.editable-row-operations {
  .fengefu {
    margin-right: 8px;
    color: #e8e8e8;
  }
}
.editable-row-operations a {
  margin-right: 8px;
}
</style>
