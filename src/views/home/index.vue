<template>
  <div class="home">
    <!-- 第一部分 -->
    <FourItemCard />
    <!-- <FourItemCard class="animated fadeInUpBig" /> -->
    <!-- 第二部分 -->
    <tendency-run :style="{ marginBottom: '24px' }" />
    <!-- <tendency-run class="animated fadeInUpBig delay-1s" /> -->
    <!-- 第三部分 -->
    <div>
      <!-- <div class="run-list animated fadeInUpBig delay-2s"> -->
      <a-row :gutter="24">
        <a-col
          :xs="24"
          :sm="24"
          :md="24"
          :xl="12"
          :style="{ marginBottom: '24px' }"
        >
          <ParticipationRun />
        </a-col>
        <a-col
          :xs="24"
          :sm="24"
          :md="24"
          :xl="12"
          :style="{ marginBottom: '24px' }"
        >
          <InstitutionOpenProject />
        </a-col>
      </a-row>
    </div>
    <!-- 第四部分 -->
    <div>
      <!-- <div class="view-list animated fadeInUpBig delay-3s"> -->
      <a-row :gutter="24">
        <a-col
          :xs="24"
          :sm="24"
          :md="24"
          :xl="12"
          :style="{ marginBottom: '24px' }"
        >
          <ReviewList title="测评访问榜单"/>
        </a-col>
        <a-col
          :xs="24"
          :sm="24"
          :md="24"
          :xl="12"
        >
          <ReviewList title="测评开通榜单"/>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '@/store'
import ParticipationRun from './components/ParticipationRun.vue'
import ReviewList from './components/ReviewList.vue'
import InstitutionOpenProject from './components/InstitutionOpenProject.vue'
const store = useStore()
const route = useRoute()
console.log(route.matched)
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
  }
}
</style>
