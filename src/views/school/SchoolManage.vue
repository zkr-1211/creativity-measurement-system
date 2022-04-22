<!--  -->
<template>
  <div class="body">
    <page-header title="校区管理" />
    <a-card title="校区列表" style="margin: 24px">
      <template #extra>
        <a-button type="primary" @click="addPersonnel"> + 添加 </a-button>
      </template>
      <a-spin :spinning="spinning">
        <Table :columns="columns" :data-source="dataList" @change="change">
          <template
            v-for="item in columns"
            :key="item.dataIndex"
            #[item.dataIndex]="{ scope }"
          >
            <div v-if="!item.isSlot">
              <a-input
                v-if="editableData[scope.record.area] && item.isEdit"
                v-model:value="editableData[scope.record.area][item.dataIndex]"
                style="margin: -5px 0"
              />
              <template v-else>
                {{ scope.text }}
              </template>
            </div>
            <div v-else>
              <div class="editable-row-operations">
                <span v-if="editableData[scope.record.area]">
                  <a @click="save(scope.record.area)">保存</a>
                  <span class="fengefu">|</span>
                  <a-popconfirm
                    title="Sure to cancel?"
                    @confirm="cancel(scope.record.area)"
                  >
                    <a>取消</a>
                  </a-popconfirm>
                </span>
                <span v-else>
                  <a @click="onEdit(scope.record)">权限编辑</a>
                  <span class="fengefu">|</span>
                  <a @click="onDelete(scope.record)">删除</a>
                </span>
              </div>
            </div>
          </template>
        </Table>
      </a-spin>
    </a-card>
    <!--添加/编辑成员 -->
    <a-modal
      v-model:visible="visible"
      style="top: 200px"
      :title="title"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        :labelCol="{ span: 4 }"
      >
        <a-form-item label="校区名称" name="name">
          <a-input v-model:value="formState.name" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup name="IsAdministrator">
import useTableOperation from "@/hooks/useTableOperation";
import { getTable } from "@/api";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { Modal } from "ant-design-vue";
import { createVNode } from "vue";
import { ValidateErrorEntity } from "ant-design-vue/es/form/interface";
import { message } from "ant-design-vue";

interface dataType {
  area: string;
  name: string;
  inCampus: string;
  time: string;
  increase: boolean;
}
interface FormState {
  name: string;
}
const columns = [
  {
    title: "校区ID",
    dataIndex: "ID",
    wareath: 200,
    // sorter: (a: { area: number }, b: { area: number }) => a.area - b.area
  },
  {
    title: "校区名称",
    dataIndex: "name",
    wareath: 200,
    isEdit: true,
    slots: {
      customRender: "name",
    },
  },
  {
    title: "添加时间",
    dataIndex: "time",
    defaultSortOrder: "descend",
    wareath: 200,

    sorter: (a, b) => {
      const aTime = new Date(a.time).getTime();
      const bTime = new Date(b.time).getTime();
      return aTime - bTime;
    },
    slots: {
      customRender: "time",
    },
  },
  {
    title: "操作",
    dataIndex: "operation",
    wareath: 200,
    isSlot: true,
    fixed: "right",
    slots: {
      customRender: "operation",
    },
  },
];
const dataList = ref<dataType[]>([]);
const { dataSource, editableData, save, cancel, confirmLoading } =
  useTableOperation(dataList);
const spinning = ref<boolean>(true);
onMounted(() => {
  __getTable();
});
const query = reactive({ pageSize: 100, pageNum: 1 });
const change = (e) => {
  query.pageNum = e.current;
  console.log(e);
};
async function __getTable() {
  const { data } = await getTable(query);
  console.log(data);

  dataList.value = data.list;
  spinning.value = false;
}
const visible = ref<boolean>(false);
const formRef = ref();
const title = ref<string>("");
// 添加
const addPersonnel = () => {
  reset();
  title.value = "添加校区信息";
  addFlag.value = true;
  visible.value = true;
};
// 编辑
const onEdit = (key: any) => {
  reset();
  title.value = "编辑校区信息";
  addFlag.value = false;
  visible.value = true;
  formState.name = key.name;
};
const handleCancel = () => {
  reset();
};
function reset() {
  formState.name = "";
  formRef.value?.resetFields();
}
// 删除
const onDelete = (key: any) => {
  Modal.confirm({
    title: () => `你确定删除“${key.name}”吗?`,
    icon: () => createVNode(ExclamationCircleOutlined),
    content: () => "删除后将无法恢复",
    centered: true,
    okText: () => "确定",
    okType: "danger",
    cancelText: () => "取消",
    onOk() {
      // 调用删除接口
      dataSource.value = dataSource.value.filter(
        (item) => item.area !== key.area
      );
    },
    onCancel() {
      console.log("Cancel");
    },
  });
};
const addFlag = ref<boolean>(false);
const handleOk = () => {
  formRef.value
    .validate()
    .then(() => {
      if (addFlag.value) {
        // 添加
            confirmLoading.value = true;
        visible.value = false;
        confirmLoading.value = false;
        formRef.value.resetFields();
        message.success("添加成功");
      } else {
        // 编辑
        visible.value = false;
        message.success("编辑成功");
      }
  
    })
    .catch((error: ValidateErrorEntity<FormState>) => {
      console.log("error", error);
    });
};
const formState = reactive<FormState>({
  name: "",
});
const rules = {
  name: [
    { required: true, message: "请输入校区名称", trigger: "blur" },
    { min: 3, max: 5, message: "长度3到5个字符", trigger: "blur" },
  ],
  area: [{ required: true, message: "请输入身份", trigger: "blur" }],
};
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
