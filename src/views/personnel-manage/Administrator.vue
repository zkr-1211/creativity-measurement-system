<!--  -->
<template>
  <div class="body">
    <page-header />
    <div class="card">
      <div class="top">
        <div class="top-left">
          人员列表
        </div>
        <div class="top-right">
          <a-button type="primary">
            +添加
          </a-button>
        </div>
      </div>
      <div class="table">
        <a-table
          :scroll="{ y: 340 }"
          :row-selection="rowSelection"
          :columns="columns"
          :data-source="dataSource"
          :pagination="pagination"
        >
          <template #evaluationName="{ text }">
            <a>{{ text }}</a>
          </template>
          <template #weeklyGains="{ record }">
            {{ record.weeklyGains }}
          </template>
          <template
            v-for="col in ['evaluationName', 'userNum', 'weeklyGains']"
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
                <a @click="onDelete(record.key)">删除</a>
              </span>
            </div>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, defineComponent, ref, reactive, toRefs } from 'vue'
import { cloneDeep } from 'lodash-es'
import PageHeader from '@/components/page-header/index.vue'
const columns = [
  {
    title: '排名',
    dataIndex: 'key',
    sorter: (a: { key: number }, b: { key: number }) => a.key - b.key
  },
  {
    title: '测评名称',
    dataIndex: 'evaluationName',
    slots: {
      customRender: 'evaluationName'
    }
  },
  {
    title: '用户数',
    dataIndex: 'userNum',
    defaultSortOrder: 'descend',
    sorter: (a: { userNum: number }, b: { userNum: number }) => a.userNum - b.userNum,
    slots: {
      customRender: 'userNum'
    }
  },
  {
    title: '周涨幅',
    dataIndex: 'weeklyGains',
    filterMultiple: false,
    slots: {
      customRender: 'weeklyGains'
    },
    onFilter: (value: any, record: { weeklyGains: string | any[] }) => record.weeklyGains.indexOf(value) === 0,
    sorter: (a: { weeklyGains: string | any[] }, b: { weeklyGains: string | any[] }) => a.weeklyGains.length - b.weeklyGains.length,
    sortDirections: ['descend', 'ascend']
  },
  {
    title: '操作',
    dataIndex: 'operation',
    slots: {
      customRender: 'operation'
    }
  }
]
const data = [
  {
    key: '1',
    evaluationName: 'John Brown',
    userNum: '32',
    weeklyGains: '120%',
    increase: true
  },
  {
    key: '2',
    evaluationName: 'Jim Green',
    userNum: '32',
    weeklyGains: '120%',
    increase: false
  },
  {
    key: '3',
    evaluationName: 'Joe Black',
    userNum: '32',
    weeklyGains: '120%',
    increase: true
  },
  {
    key: '4',
    evaluationName: 'Jim Red',
    userNum: '32',
    weeklyGains: '120%',
    increase: false
  },
  {
    key: '11',
    evaluationName: 'Jim Green',
    userNum: '42',
    weeklyGains: '120%',
    increase: false
  },
  {
    key: '5',
    evaluationName: 'Joe Black',
    userNum: '32',
    weeklyGains: '120%',
    increase: true
  },
  {
    key: '6',
    evaluationName: 'Jim Red',
    userNum: '32',
    weeklyGains: '120%',
    increase: false
  },
  {
    key: '7',
    evaluationName: 'Jim Green',
    userNum: '32',
    weeklyGains: '120%',
    increase: false
  },
  {
    key: '8',
    evaluationName: 'Joe Black',
    userNum: '32',
    weeklyGains: '120%',
    increase: true
  },
  {
    key: '9',
    evaluationName: 'Jim Red',
    userNum: '32',
    weeklyGains: '120%',
    increase: false
  }
]
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
        defaultPageSize: 5,
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
    const editableData:any = reactive({})
    const onDetail = (key: any) => {
      console.log('onDetail', key)
    }
    const onEdit = (key: string) => {
      editableData[key] = cloneDeep(
        dataSource.value.filter(item => key === item.key)[0]
      )
    }
    const onDelete = (key: any) => {}
    const save = (key: string) => {
      Object.assign(
        dataSource.value.filter(item => key === item.key)[0],
        editableData[key]
      )
      delete editableData[key]
    }
    const cancel = (key: string | number) => {
      delete editableData[key]
    }
    onMounted(() => {})
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
      cancel
    }
  }
})
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin";
.body {
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
}
</style>
