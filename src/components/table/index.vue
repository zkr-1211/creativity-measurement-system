<template>
  <!-- 表格组件 -->
  <a-table
    :scroll="{ y: tableHeight }"
    :data-source="dataSource"
    :columns="columns"
    :pagination="pagination"
    :row-selection="isSelect ? rowSelection : null"
    :row-key="record => record.id"
    @change="change"
  >
    <template
      v-for="item in renderArr"
      #[item]="scope"
    >
      <slot
        :name="item"
        :scope="scope"
      />
    </template>
  </a-table>
</template>

<script lang="ts" setup>
// 把setup放在 script 标签里面,相当于 setup()语法糖, 具体可以看vue的官网
import { useSlots, ref } from 'vue'
// 如果要知道使用插槽的实例需要引入 useSlots

const props = defineProps({
  columns: {
    type: Array,
    default: () => []
  },
  dataSource: {
    type: Array,
    default: () => []
  },
  isSelect: {
    type: Boolean,
    default: true
  },
  tableHeight: {
    type: Number,
    default: () => 450
  },
  total: {
    type: Number,
    default: () => 450
  }
})
// defineProps是3.2中新的语法,不需要从 vue里面引入出来
const pagination = ref({
  showTotal: (total: any) => `共 ${props.total} 条数据`,
  defaultPageSize: 10,
  showSizeChanger: true,
  showQuickJumper: true,
  pageSizeOptions: ['2', '10', '15', '20']
})
const slots = useSlots()
// 插槽的实例

const renderArr = Object.keys(slots)
// 渲染的数据

const emit = defineEmits(['selectedRows', 'change'])
const change = (e:any) => {
  emit('change', e)
}
// 是否多选
const rowSelection = {
  onChange: (selectedRowKeys: any, selectedRows: any) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows
    )
    emit('selectedRows', selectedRows)
  },
  getCheckboxProps: (record: { name: string }) => ({
    disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name
  })
}
</script>
