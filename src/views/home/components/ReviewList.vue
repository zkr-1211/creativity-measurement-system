<template>
  <a-card :loading="loading" :title="props.title" style="width: 100%">
    <div v-for="(item, index) in list" :key="index" class="view-list-item">
      <div class="name-info">
        <div
          class="index"
          :class="[
            index === 0 ? 'one' : '',
            index === 2 ? 'three' : '',
            index === 3 ? 'four' : '',
            index === 1 ? 'two' : '',
          ]"
        >
          {{ index + 1 }}
        </div>
        <div class="title">
          {{ item.title }}
        </div>
      </div>
      <div class="progress">
        <a-progress
          :percent="item.percent"
          :show-info="false"
          stroke-color="#3BA0FF"
          stroke-linecap="square"
        />
      </div>
      <div class="people">
        {{ item.num }}
      </div>
    </div>
  </a-card>
</template>

<script lang="ts" setup>
import { getReviewList } from "@/api";
const props = defineProps({
  title: {
    type: String,
    default: "测评访问榜单",
  },
});
interface listType {
  title: string;
  percent: number;
  num: number;
}
const loading = ref<boolean>(true);
onMounted(() => {
  __getReviewList();
});
const list = ref<listType[]>([]);
async function __getReviewList() {
  try {
    const { data } = await getReviewList();
    list.value = data.list;
    loading.value = false;
  } catch (error) {}
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin";
.view-list-item {
  @include faj();
  height: 0.43rem;
  font-size: 0.16rem;
  .name-info {
    display: flex;
    @include tb(1.8rem);
    .one {
      color: #3ba0ff !important;
    }
    .two {
      color: #36cbcb !important;
    }
    .three {
      color: #4dcb73 !important;
    }
    .four {
      color: #fad337 !important;
    }
    .index {
      width: 0.2rem;
      font-weight: 600;
      color: #000000;
    }
    .title {
      margin-left: 0.1rem;
      width: 120px;
      color: rgba(0, 0, 0, 0.65);
      @include tb(120px);
    }
  }
  .progress {
    margin: 0 30px;
    flex: 1;
  }
  .people {
    max-width: 0.8rem;
    color: rgba(0, 0, 0, 0.65);
  }
}
</style>
