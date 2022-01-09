<template>
  <div class="home">
    <!-- 第一部分 -->
    <FourItemCard />
    <!-- 第二部分 -->
    <tendency-run />
    <!-- 第三部分 -->
    <div class="run-list">
      <ParticipationRun />
      <InstitutionOpenProject />
    </div>
    <!-- 第四部分 -->
    <div class="view-list">
      <ReviewList />
      <ReviewList style="margin-left: 24px;" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '@/store'
import TendencyRun from '@/components/tendency-run/index.vue'
import FourItemCard from '@/components/four-item-card/index.vue'
import ParticipationRun from './components/ParticipationRun.vue'
import ReviewList from './components/ReviewList.vue'
import InstitutionOpenProject from './components/InstitutionOpenProject.vue'
const store = useStore()
store.$patch((state) => {
  state.userInfo = { name: 'ZHANG_KE_RONG', age: '22' }
  state.token = 'token-asgdfebdvvadfsdfgdfh'
})
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin";
.home {
  margin: 24px;
  .run-list {
    margin-top: 0.24rem;
    display: flex;
    justify-content: space-between;
  }
  .view-list {
    width: 100%;
    margin-top: 0.24rem;
    display: flex;
  }
}
</style>
