<template>
  <a-card
    :loading="loading"
    title="题目数据"
    style="margin-top: 24px"
  >
    <template #extra>
      <a-select
        ref="select"
        v-model:value="value1"
        style="width: 150px"
        @focus="focus"
        @change="handleChange"
      >
        <a-select-option value="jack">
          Jack
        </a-select-option>
        <a-select-option value="lucy">
          Lucy
        </a-select-option>
        <a-select-option value="Yiminghe">
          yiminghe
        </a-select-option>
      </a-select>
      <a-select
        ref="select"
        v-model:value="value1"
        style="width: 150px; margin-left: 15px"
        @focus="focus"
        @change="handleChange"
      >
        <a-select-option value="jack">
          Jack
        </a-select-option>
        <a-select-option value="lucy">
          Lucy
        </a-select-option>
        <a-select-option value="Yiminghe">
          yiminghe
        </a-select-option>
      </a-select>
      <a-select
        ref="select"
        v-model:value="value1"
        style="width: 150px; margin-left: 15px"
        @focus="focus"
        @change="handleChange"
      >
        <a-select-option value="jack">
          Jack
        </a-select-option>
        <a-select-option value="lucy">
          Lucy
        </a-select-option>
        <a-select-option value="Yiminghe">
          yiminghe
        </a-select-option>
      </a-select>
      <a-select
        ref="select"
        v-model:value="value1"
        style="width: 150px; margin-left: 15px"
        @focus="focus"
        @change="handleChange"
      >
        <a-select-option value="jack">
          Jack
        </a-select-option>
        <a-select-option value="lucy">
          Lucy
        </a-select-option>
        <a-select-option value="Yiminghe">
          yiminghe
        </a-select-option>
      </a-select>
    </template>
    <div class="bottom">
      <a-row :gutter="24">
        <a-col
          :xs="24"
          :sm="24"
          :md="24"
          :xl="12"
        >
          <div class="left">
            <div class="title">
              题目:你有想过自己未来要做什么么？
            </div>
            <div
              v-for="(item, index) in 6"
              :key="index"
              class="item"
            >
              选项A:没有
            </div>
          </div>
        </a-col>
        <a-col
          :xs="24"
          :sm="24"
          :md="24"
          :xl="12"
        >
          <div class="right">
            <ProjectAccounteChart />
          </div>
        </a-col>
      </a-row>
    </div>
  </a-card>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import ProjectAccounteChart from '@/components/project-accounte-chart/index.vue'
const handleChange = () => {}
const value1 = ref()
function focus() {}
const loading = ref<boolean>(true)
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 500)
})
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin";
.bottom {
  padding: 30px;
  .title {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.85);
    margin-bottom: 30px;
    font-weight: bold;
  }
  .item {
    height: 42px;
    font-size: 16px;
    color: #595959;
  }
}
</style>
