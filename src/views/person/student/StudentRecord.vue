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
        <RecordInfos
          :person="person"
          :info-list="infoList"
          is-stu
        />
      </a-col>
      <a-col
        :xs="24"
        :sm="24"
        :md="24"
        :xl="17"
      >
        <RecordCard />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import RecordInfos from '../components/RecordInfos.vue'
import RecordCard from '../components/RecordCard.vue'
const person = {
  name: '我是学生'
}

const infoList: any[] = []
for (let i = 1; i < 10; i++) {
  infoList.push({
    lable: `姓名${i}`,
    value: `类目${i}`
  })
}
const loading = ref<boolean>(true)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 500)
})
const data: any[] = []
for (let i = 1; i < 21; i++) {
  data.push({
    id: i.toString(),
    name: `类目 ${i}`,
    title: '创造力测评'
  })
}
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
