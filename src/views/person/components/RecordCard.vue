<!--  -->
<template>
  <a-card
    :loading="loading"
    :tab-list="tabListNoTitle"
    :active-tab-key="noTitleKey"
    @tab-change="(key) => onTabChange(key, 'noTitleKey')"
  >
    <div
      v-if="noTitleKey === 'tab1'"
      class="content"
    >
      <RecordList />
    </div>
    <div v-else-if="noTitleKey === 'tab2'">
      <a-list
        :grid="{ gutter: 24, xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }"
        :data-source="data"
      >
        <template #renderItem="{ item }">
          <a-list-item>
            <a-card>
              <template #cover>
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                >
              </template>
              <a-card-meta :title="item.title">
                d
              </a-card-meta>
              <div class="item-content">
                <div class="des">
                  <div class="">
                    测评次数：
                  </div>
                  <div class="">
                    1次
                  </div>
                </div>
                <div class="info">
                  <div class="num">
                    开始时间：
                  </div>
                  <div class="imgs">
                    2022.03.03 16:30
                  </div>
                </div>
              </div>
            </a-card>
          </a-list-item>
        </template>
      </a-list>
    </div>
  </a-card>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import RecordList from '@/components/record-list/index.vue'
const loading = ref<boolean>(true)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 500)
})
const tabListNoTitle = [
  {
    key: 'tab1',
    tab: '测评记录'
  },
  {
    key: 'tab2',
    tab: '已参与测评'
  }
]
const data: any[] = []
for (let i = 1; i < 21; i++) {
  data.push({
    id: i.toString(),
    name: `类目 ${i}`,
    title: '创造力测评'
  })
}
const key = ref('tab1')
const noTitleKey = ref('tab1')
const onTabChange = (value: string, type: string) => {
  console.log(value, type)
  if (type === 'key') {
    key.value = value
  } else if (type === 'noTitleKey') {
    noTitleKey.value = value
  }
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
