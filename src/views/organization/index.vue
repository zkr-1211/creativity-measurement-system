<template>
  <div class="body">
    <page-header title="机构/学校" />
    <a-spin :spinning="spinning">
      <a-list
        :data-source="data"
        :grid="{ gutter: 24, xxl: 5, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }"
        class="content-card"
      >
        <template #renderItem="{ item, index }">
          <a-list-item>
            <template v-if="index === 0">
              <router-link to="/organization/addorganization">
                <a-button class="new-btn" type="dashed">
                  <PlusOutlined />
                  新增机构/学校
                </a-button>
              </router-link>
            </template>
            <template v-else>
              <a-card :hoverable="true">
                <a-card-meta>
                  <template #title>
                    <span style="font-weight: bold">
                      {{ item.course_name }}
                    </span>
                  </template>
                  <template #avatar>
                    <a-avatar
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    />
                  </template>
                  <template #description>
                    <div style="height: 45px;">
                    {{ item.describe || "暂无简介" }}
                    </div>
                  </template>
                </a-card-meta>
                <template #actions>
                  <router-link to="/organization/detail">
                    <a>详情与管理</a>
                  </router-link>
                  <a @click="delOrg(item)">删除机构</a>
                </template>
              </a-card>
            </template>
          </a-list-item>
        </template>
      </a-list>
    </a-spin>
  </div>
</template>

<script lang="ts" setup>
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { createVNode } from "vue";
import { getCourseList, deleteCourse } from "@/api/course";
import { Modal, message } from "ant-design-vue";
const data = ref<any>([]);
// for (let i = 0; i < 15; i++) {
//   data.value.push({
//     id: i,
//     title: `Alipay${i}`,
//     avatar:
//       "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
//   });
// }
const spinning = ref<boolean>(true);
onMounted(() => {
  setTimeout(() => {
    spinning.value = false;
  }, 500);
});
function delOrg(item) {
  Modal.confirm({
    title: () => `你确定删除“${item.course_name}”吗?`,
    icon: () => createVNode(ExclamationCircleOutlined),
    content: () => "删除后将无法恢复",
    centered: true,
    okText: () => "确定",
    okType: "danger",
    cancelText: () => "取消",
    onOk() {
      // 调用删除接口
      deleteCourse(item.course_id)
        .then((res) => {
          message.success("删除成功");
          getList();
        })
        .catch((err) => {
          message.error("删除失败");
        });
    },
    onCancel() {
      console.log("Cancel");
    },
  });
}
function getList() {
  let query = {
    type: "course",
  };
  spinning.value = true;
  getCourseList(query).then((res) => {
    spinning.value = false;
    data.value = res.data.list;
  });
}
getList();
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin";
.new-btn {
  background-color: #fff;
  border-radius: 2px;
  width: 100%;
  height: 166px;
}
.body {
  .content-card {
    margin: 24px;
    .content-card > i {
      width: 3.58rem;
    }
    .add-org {
      cursor: pointer;
      @include wh(3.78rem, 1.84rem);
      @include borderRadius(0.03rem);
      @include sc(0.18rem, #1890ff);
      background: #ffffff;
      border: 1px dashed #1890ff;
      line-height: 1.84rem;
      text-align: center;
    }
  }
}
</style>
