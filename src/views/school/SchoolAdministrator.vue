<!--  -->
<template>
  <div class="body">
    <page-header title="校区管理员" />
    <a-card
      title="管理人员列表"
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
  </div>
</template>

<script lang="ts">
import { onMounted, defineComponent, ref } from 'vue'
import useTableOperation from '@/hooks/useTableOperation'

import PageHeader from '@/components/page-header/index.vue'
import Table from '@/components/table/index.vue'
interface dataType {
  key: string;
  ID: string;
  name: string;
  phone: string;
  createNum: string;
  time: string;
  increase: boolean;
}
const columns = [
  {
    title: '管理员ID',
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
