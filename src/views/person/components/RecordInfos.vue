<template>
  <a-card :loading="loading" :bordered="false">
    <div class="person-info">
      <div class="header">
        <img src="https://s1.ax1x.com/2022/04/22/LR9is1.png" alt="" />
      </div>
      <div class="name">
        {{ person.name }}
      </div>
    </div>
    <div class="infos">
      <div v-for="(item, index) in infoList" :key="index" class="infos-item">
        <span>{{ item.label }}：</span>
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div class="button">
      <a-button type="primary" @click="toSet"> 编辑设置 </a-button>
      <!-- <a-button class="dbutton"> 删除档案 </a-button> -->
    </div>
  </a-card>
</template>

<script lang="ts" setup>
import { onMounted, ref, PropType } from "vue";
import { useRouter } from "vue-router";
interface propsType {
  name: string;
  avatar: string;
}
const infoList = [
  {
    label: "姓名",
    name: "张老师",
  },
  {
    label: "年龄",
    name: "23",
  },
  {
    label: "性别",
    name: "男",
  },
  {
    label: "学校",
    name: "阳光学院",
  },
  {
    label: "手机号",
    name: "15846255645",
  },
];
const props = defineProps({
  person: {
    type: Object as PropType<propsType>,
    default: () => {},
  },
  infoList: {
    type: Array as any,
    default: () => [],
  },
  isStu: {
    type: Boolean,
    default: () => null,
  },
});
const loading = ref<boolean>(true);
onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 500);
});
const router = useRouter();
function toSet() {
  if (props.isStu) {
    router.push({ path: "/studentinfo-set" });
  } else {
    router.push({ path: "/teacherinfo-set" });
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin";

.person-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  .header {
    background: rgba(0, 0, 0, 1);
    @include wh(106px, 106px);
    @include borderRadius(50%);
    img {
      @include wh(100%, 100%);
      @include borderRadius(50%);
    }
  }
  .name {
    margin-top: 12px;
  }
}
.infos {
  margin-top: 12px;
  .infos-item {
    @include faj();
    @include wh(_, 40px);
    span {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
    }
  }
}
.button {
  text-align: center;
  margin-top: 132px;
  .dbutton {
    margin-left: 15px;
  }
}
</style>
