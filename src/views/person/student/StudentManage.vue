<template>
  <page-header title="学生管理" />
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
  <a-card
    title="全部学生"
    style="margin: 24px"
  >
    <template #extra>
      <a-button
        type="primary"
        style="margin-right: 15px"
      >
        + 新建
      </a-button>
      <a-button type="primary">
        + 批量导入
      </a-button>
    </template>
    <a-alert
      style="margin-bottom: 15px"
      :message="`已选择${selectedNum}项`"
      type="info"
      show-icon
      @close="clearSelect"
    />
    <a-spin :spinning="spinning">
      <Table
        :table-height="300"
        :columns="columns"
        :data-source="dataSource"
        @selected-rows="selectedRows"
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
                  title="你确定要取消吗?"
                  @confirm="cancel(scope.record.key)"
                >
                  <a>取消</a>
                </a-popconfirm>
              </span>
              <span v-else>
                <a @click="onDetail(scope.record.key)">详情</a>
                <span class="fengefu">|</span>
                <a @click="onEdit(scope.record.key)">编辑</a>
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
</template>

<script lang="ts">
import { onMounted, defineComponent, ref } from 'vue'
import useTableOperation from '@/hooks/useTableOperation'

import PageHeader from '@/components/page-header/index.vue'
import Table from '@/components/table/index.vue'
import { useRouter } from 'vue-router'
interface dataType {
  key: string;
  name: string;
  evanum: string;
  area: string;
  stuid: number;
  time: string;
  increase: boolean;
}
const data: dataType[] = []
for (let i = 1; i < 50; i++) {
  data.push({
    key: `1231254543${i}`,
    name: `哎哎哎${i}`,
    evanum: `${i}万`,
    area: `福州校区${i}`,
    stuid: 1827181 + i,
    time: `2017-10-31 23:12:${i}`,
    increase: i % 2 === 0
  })
}
const columns = [
  {
    title: '学生ID',
    dataIndex: 'key'
  },
  {
    title: '姓名',
    dataIndex: 'name',
    slots: {
      customRender: 'name'
    }
  },
  {
    title: '测评次数',
    dataIndex: 'evanum',
    sorter: (a: { evanum: number }, b: { evanum: number }) =>
      a.evanum - b.evanum,
    slots: {
      customRender: 'evanum'
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
    title: '学号',
    dataIndex: 'stuid',
    slots: {
      customRender: 'stuid'
    }
  },
  {
    title: '所在校区',
    dataIndex: 'area',
    isEdit: true,
    slots: {
      customRender: 'area'
    }
  },
  // {
  //   title: '周涨幅',
  //   dataIndex: 'weeklyGains',
  //   filterMultiple: false,
  //   slots: {
  //     customRender: 'weeklyGains'
  //   },
  //   onFilter: (value: any, record: { weeklyGains: string | any[] }) =>
  //     record.weeklyGains.indexOf(value) === 0,
  //   sorter: (
  //     a: { weeklyGains: string | any[] },
  //     b: { weeklyGains: string | any[] }
  //   ) => a.weeklyGains.length - b.weeklyGains.length,
  //   sortDirections: ['descend', 'ascend']
  // },
  {
    title: '操作',
    dataIndex: 'operation',
    isSlot: 'true',
    slots: {
      customRender: 'operation'
    }
  }
]
export default defineComponent({
  name: 'StudentManage',
  components: {
    PageHeader,
    Table
  },
  setup() {
    const spinning = ref<boolean>(true)
    onMounted(() => {
      setTimeout(() => {
        spinning.value = false
      }, 500)
    })
    // 搜素

    const value = ref('')
    const onSearch = (searchValue: any) => {
      console.log('use value', searchValue)
      console.log('or use this.value', value.value)
    }
    const selectedNum = ref<number>(0)
    const selectedRows = (e) => {
      console.log('哈哈哈12313', selectedNum.value)

      selectedNum.value = e.length
    }
    const {
      dataSource,
      editableData,
      onEdit,
      onDelete,
      save,
      cancel
      // modalText,
      // visible,
      // confirmLoading,
      // handleCancel,
      // formRef
    } = useTableOperation(data)
    const router = useRouter()
    const onDetail = (key: any) => {
      router.push({
        path: '/student-record'
      })
    }
    const clearSelect = (e) => {
      console.log(e)
    }
    onMounted(() => {})
    return {
      value,
      dataSource,
      columns,
      editableData,
      onSearch,
      onEdit,
      onDetail,
      onDelete,
      save,
      cancel,
      selectedRows,
      selectedNum,
      clearSelect,
      spinning
    }
  }
})
</script>
<style lang="scss" scoped>
.search {
  margin: 24px;
  padding: 30px 40px;
  background: #ffffff;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .button {
    margin-left: 12px;
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
