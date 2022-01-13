<template>
  <div class="body">
    <page-header />
    <div class="content-main">
      <div class="search">
        <div class="input-search">
          <a-input-search
            v-model:value="value"
            placeholder="请输入"
            style="width: 260px"
            @search="onSearch"
          />
        </div>
        <a-button class="button">
          重置
        </a-button>
        <a-button
          class="button"
          type="primary"
        >
          查询
        </a-button>
      </div>
      <div class="table">
        <div class="table-top">
          <div class="table-top-text">
            全部学生
          </div>
          <div class="table-top-button">
            <a-button
              class="button"
              type="primary"
            >
              + 新建
            </a-button>
            <a-button
              class="button"
              type="primary"
            >
              + 批量导入
            </a-button>
          </div>
        </div>
        <div class="table-tip">
          <a-alert
            message="Informational Notes"
            type="info"
            show-icon
            closable
          >
            <!-- <template #description>
                <span style="color: red">Success</span>
            </template> -->
          </a-alert>
        </div>
        <div class="table-table">
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
                  <a @click="onDetail(record.key)">详情</a>
                  <span class="fengefu">|</span>
                  <a @click="onEdit(record.key)">编辑</a>
                  <span class="fengefu">|</span>
                  <a @click="onDelete(record.key)">删除</a>
                </span>
              </div>
            </template>
          </a-table>
        </div>
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
    sorter: (a: { userNum: number }, b: { userNum: number }) =>
      a.userNum - b.userNum,
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
    onFilter: (value: any, record: { weeklyGains: string | any[] }) =>
      record.weeklyGains.indexOf(value) === 0,
    sorter: (
      a: { weeklyGains: string | any[] },
      b: { weeklyGains: string | any[] }
    ) => a.weeklyGains.length - b.weeklyGains.length,
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
  name: 'SearchTable',
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
    const onDelete = (key: any) => {}
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
.body {
  .content-main {
    padding: 24px;
    .search {
      padding: 40px;
      width: 100%;
      height: 100px;
      background: #ffffff;
      border-radius: 3px;
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .button {
        margin-left: 12px;
      }
    }
    .table {
      width: 100%;
      height: 100%;
      background: #ffffff;
      opacity: 1;
      border-radius: 3px;
      padding: 25px 40px 25px 40px;
      .table-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .table-top-text {
          font-size: 20px;
          color: #000000;
          opacity: 0.85;
          font-weight: bold;
        }
        .table-top-button {
          .button {
            margin-left: 12px;
          }
        }
      }
      .table-tip {
        margin-top: 20px;
      }
      .table-table {
        margin-top: 20px;
        margin-bottom: 20px;
      }
      .pagination {
        text-align: right;
      }
    }
  }
}
.editable-row-operations .fengefu {
  margin-right: 8px;
  color: #e8e8e8;
}
.editable-row-operations a {
  margin-right: 8px;
}
</style>
