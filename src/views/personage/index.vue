<!--  -->
<template>
  <div class="home">
    <a-row :gutter="24">
      <a-col
        :xs="24"
        :sm="24"
        :md="24"
        :xl="7"
        :style="{ marginBottom: '24px' }"
      >
        <RecordInfos :person="userInfo" :info-list="infoList" is-stu />
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :xl="17">
        <RecordCard />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { getTasksList } from "@/api/tasks";
import RecordInfos from "./components/RecordInfos.vue";
import RecordCard from "./components/RecordCard.vue";
import { useStore } from "@/store";
const store = useStore();
const userInfo = computed(() => {
  return store.getUserInfo;
});
const person = reactive({
  name: "张老师",
  avatar: "https://s1.ax1x.com/2022/04/22/LR9is1.png",
});
function getList() {
  let query = {
    question_set_id: 23,
    uid: 3956,
  };
  getTasksList(query).then((res) => {
    console.log(res);
  });
}
// 遍历对象形式生成infoList数组
const infoList = Object.keys(userInfo.value).map((key) => {
  if (key === "name") {
    person.name = userInfo.value[key];
  }
  return {
    lable: key,
    value: userInfo.value[key],
  };
});

const loading = ref<boolean>(true);

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 500);
});
const data: any[] = [];
for (let i = 1; i < 1; i++) {
  data.push({
    id: i.toString(),
    name: `类目 ${i}`,
    title: "创造力测评",
  });
}
getList()
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin";
.home {
  margin: 24px;
  .item-content {
    .title {
      font-weight: bold;
      @include sc(0.17rem, rgba(0, 0, 0, 0.85));
    }
    .des {
      @include faj();
      margin-top: 15px;
      @include sc(0.14rem, rgba(0, 0, 0, 0.45));
    }
    .info {
      @include faj();
      margin-top: 10px;
      .num {
        @include sc(0.12rem, rgba(0, 0, 0, 0.45));
      }
      .imgs {
        display: flex;
        color: rgba(0, 0, 0, 0.45);
      }
    }
  }
}
</style>
