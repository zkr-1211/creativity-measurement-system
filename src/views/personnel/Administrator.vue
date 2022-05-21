<!--  -->
<template>
  <div class="body">
    <page-header title="管理员" />
    <a-card title="人员列表" style="margin: 24px">
      <template #extra>
        <a-button type="primary" @click="addPersonnel"> + 添加 </a-button>
      </template>
      <a-spin :spinning="spinning">
        <Table
          :columns="columns"
          :data-source="dataList"
          @change="change"
          :total="total"
        >
          <template
            v-for="item in columns"
            :key="item.dataIndex"
            #[item.dataIndex]="{ scope }"
          >
            <div v-if="!item.isSlot">
              <a-input
                v-if="editableData[scope.record.id] && item.isEdit"
                v-model:value="editableData[scope.record.id][item.dataIndex]"
                style="margin: -5px 0"
              />
              <template v-else>
                {{ scope.text }}
              </template>
            </div>
            <div v-else>
              <div class="editable-row-operations">
                <span v-if="editableData[scope.record.id]">
                  <a @click="save(scope.record.id)">保存</a>
                  <span class="fengefu">|</span>
                  <a-popconfirm
                    title="Sure to cancel?"
                    @confirm="cancel(scope.record.id)"
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
        :labelCol="{ span: 3 }"
      >
        <!-- <a-form-item label="姓名" name="name">
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item label="身份" name="ID">
          <a-input v-model:value="formState.ID" />
        </a-form-item> -->
        <a-form-item label="手机号" name="phone" v-if="addFlag">
          <a-input v-model:value="formState.phone" />
        </a-form-item>
        <div v-for="item in permissions" v-else :key="item.permission_id" style="margin-top: 10px;"> 
          <a-checkbox v-model:checked="item.selected">{{
            item.display_name
          }}</a-checkbox>
        </div>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup name="IsAdministrator">
import { ValidateErrorEntity } from "ant-design-vue/es/form/interface";
import useTableOperation from "@/hooks/useTableOperation";
import { getTable } from "@/api";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { Modal, message } from "ant-design-vue";
import {
  getCourseTeam,
  addTeamMembers,
  editCourseTeam,
  deleteTeamMembers,
  editTeamMembersPermissions,
} from "@/api/team";
import { createVNode } from "vue";
const checked = ref(false);
interface dataType {
  id: string;
  ID: string;
  name: string;
  phone: string;
  createNum: string;
  time: string;
  increase: boolean;
  permissions: string[];
}
interface FormState {
  name: string;
  ID: string | undefined;
  phone: string | undefined;
}
const columns = [
  {
    title: "管理员ID",
    dataIndex: "external_id",
    width: 200,
    // sorter: (a: { id: number }, b: { id: number }) => a.id - b.id
  },
  {
    title: "姓名",
    dataIndex: "realname",
    width: 200,

    slots: {
      customRender: "realname",
    },
  },
  {
    title: "身份",
    dataIndex: "display_identity",
    isEdit: true,
    width: 200,
    slots: {
      customRender: "display_identity",
    },
  },
  // {
  //   title: "添加时间",
  //   dataIndex: "time",
  //   defaultSortOrder: "descend",
  //   width: 200,

  //   sorter: (a, b) => {
  //     const aTime = new Date(a.time).getTime();
  //     const bTime = new Date(b.time).getTime();
  //     return aTime - bTime;
  //   },
  //   slots: {
  //     customRender: "time",
  //   },
  // },
  {
    title: "手机号",
    dataIndex: "phone",
    width: 200,

    slots: {
      customRender: "phone",
    },
  },
  // {
  //   title: "创建测评数",
  //   width: 200,

  //   dataIndex: "createNum",
  //   slots: {
  //     customRender: "createNum",
  //   },
  // },
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
    title: "操作",
    dataIndex: "operation",
    width: 200,
    isSlot: true,
    fixed: "right",
    slots: {
      customRender: "operation",
    },
  },
];
// const data: dataType[] = []
// for (let i = 1; i < 50; i++) {
//   data.push({
//     id: `1231254543${i}`,
//     ID: `测评师${i}`,
//     name: `John Brown${i}`,
//     phone: `12353434634${i}`,
//     createNum: `${i}`,
//     time: `2017-10-31 23:12:${i}`,
//     increase: true
//   })
// }
const permissions = ref<any>([]);
const dataList = ref<dataType[]>([]);
const { dataSource, editableData, save, cancel, confirmLoading } =
  useTableOperation(dataList);
const spinning = ref<boolean>(true);
onMounted(() => {
  __getTable();
});
const teamId = ref();
function getList() {
  getCourseTeam(105).then((res) => {
    dataList.value = res.data.members;
    dataList.value[0].time = res.data.created_at;
    teamId.value = res.data.team_id;
    spinning.value = false;
    total.value = res.data.members.length;
  });
}
const query = reactive({ pageSize: 100, pageNum: 1 });
const change = (e) => {
  query.pageNum = e.current;
  console.log(e);
};
const total = ref<number>(0);
async function __getTable() {
  const { data } = await getTable(query);
  // dataList.value = data.list;
  spinning.value = false;
  // total.value = data.total;
}
const visible = ref<boolean>(false);
const formRef = ref();
const title = ref<string>("");

// 添加
const addPersonnel = () => {
  reset();
  title.value = "添加管理员";
  addFlag.value = true;
  visible.value = true;
};
// 编辑
const uid = ref();
const onEdit = (key: any) => {
  reset();
  title.value = "编辑管理员";
  addFlag.value = false;
  visible.value = true;
  formState.phone = `${key.phone}`;
  permissions.value = key.permissions;
  uid.value = key.uid;
  console.log(key, "key");
};
const handleCancel = () => {
  reset();
};
function reset() {
  formState.phone = "";
  formRef.value?.resetFields();
}
// 删除
const onDelete = (key: any) => {
  Modal.confirm({
    title: () => `你确定删除“${key.realname}”吗?`,
    icon: () => createVNode(ExclamationCircleOutlined),
    content: () => "删除后将无法恢复",
    centered: true,
    okText: () => "确定",
    okType: "danger",
    cancelText: () => "取消",
    onOk() {
      // 调用删除接口
      let data = {
        uid: key.uid,
      };
      deleteTeamMembers(teamId.value, data)
        .then((res) => {
          message.success("删除成功");
          getList();
        })
        .catch((err) => {
          message.error("删除失败");
        });
      // dataSource.value = dataSource.value.filter((item) => item.id !== key.id);
      // message.success("删除成功");
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
        let data = {
          phone: formState.phone,
          identity: "ADMIN",
        };
        confirmLoading.value = true;
        addTeamMembers(teamId.value, data)
          .then((res) => {
            message.success("添加成功");
            visible.value = false;
            confirmLoading.value = false;
            formRef.value.resetFields();
            getList();
          })
          .catch((err) => {
            visible.value = false;
            confirmLoading.value = false;
            message.error(err.message);
          });
        // 添加
      } else {
        // permissions循环选出selected和permission_id
        let perList = <any>[];
        permissions.value.forEach((item) => {
          perList.push({
            permission_id: item.permission_id,
            selected: item.selected,
          });
        });
        let data = {
          uid: uid.value,
          identity: "ADMIN",
          permissions: perList,
        };
        confirmLoading.value = true;
        editTeamMembersPermissions(teamId.value, data)
          .then((res) => {
            message.success("修改成功");
            visible.value = false;
            confirmLoading.value = false;
            formRef.value.resetFields();
            getList();
          })
          .catch((err) => {
            visible.value = false;
            confirmLoading.value = false;
            message.error(err.message);
          });
        // 编辑
      }
    })
    .catch((error: ValidateErrorEntity<FormState>) => {
      console.log("error", error);
    });
};
const formState = reactive<FormState>({
  name: "",
  phone: "",
  ID: "",
});
const rules = {
  name: [
    { required: true, message: "请输入姓名", trigger: "blur" },
    { min: 3, max: 5, message: "长度3到5个字符", trigger: "blur" },
  ],
  ID: [{ required: true, message: "请输入身份", trigger: "blur" }],
  phone: [
    {
      required: true,
      message: "请输入正确的手机号",
      trigger: "blur",
      pattern: /^1[3456789]\d{9}$/,
    },
  ],
};
getList();
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
