<!--  -->
<template>
  <page-header title="班级管理" />
  <a-card
    title="班级列表"
    style="margin: 24px"
  >
    <template #extra>
      <a-button type="primary">
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
</template>

<script lang="ts">
import { onMounted, defineComponent, ref } from 'vue'
import PageHeader from '@/components/page-header/index.vue'
import Table from '@/components/table/index.vue'
import useTableOperation from '@/hooks/useTableOperation'

interface dataType {
  key: string;
  area: string;
  name: string;
  time: string;
}
const columns = [
  {
    title: '班级ID',
    dataIndex: 'key'
  },
  {
    title: '班级名称',
    dataIndex: 'name',
    slots: {
      customRender: 'name'
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
    area: `福州校区${i}`,
    name: `2018级${i}班`,
    time: `2017-10-31 23:12:${i}`
  })
}
export default defineComponent({
  name: 'SchoolAdministrator',
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
    onMounted(() => {})
    return {
      dataSource,
      columns,
      editableData,
      onEdit,
      onDelete,
      save,
      cancel,
      spinning
    }
  }
})
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin";
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
