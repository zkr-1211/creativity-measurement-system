<template>
  <a-card
    :loading="loading"
    title="测评访问榜单"
    style="width: 100%"
  >
    <div
      v-for="(item, index) in 10"
      :key="index"
      class="view-list-item"
    >
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
          心理健康
        </div>
      </div>
      <div class="progress">
        <a-progress
          :percent="50"
          :show-info="false"
          stroke-color="#3BA0FF"
          stroke-linecap="square"
        />
      </div>
      <div class="people">
        1234人
      </div>
    </div>
  </a-card>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
const loading = ref<boolean>(true)
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 3000)
})
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
      color: rgba(0, 0, 0, 0.65);
    }
  }
  .progress {
    width: 60%;
  }
  .people {
    max-width: 0.8rem;
    color: rgba(0, 0, 0, 0.65);
  }
}
</style>
