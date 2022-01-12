<!--  -->
<template>
  <div class="home">
    <a-row :gutter="24">
      <a-col
        :xs="24"
        :sm="24"
        :md="24"
        :xl="7"
        :style="{marginBottom:'24px'}"
      >
        <a-card
          :loading="loading"
        >
          <Infos />
        </a-card>
      </a-col>
      <a-col
        :xs="24"
        :sm="24"
        :md="24"
        :xl="17"
      >
        <a-card
          :loading="loading"
          :tab-list="tabListNoTitle"
          :active-tab-key="noTitleKey"
          @tab-change="(key) => onTabChange(key, 'noTitleKey')"
        >
          <div
            v-if="noTitleKey === 'article'"
            class="content"
          >
            <RecordList />
          </div>
          <div v-else-if="noTitleKey === 'app'">
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
            <!-- <CardItem>
          <div class="item-content">
            <div class="title">
              创造力测评
            </div>
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
        </CardItem> -->
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
// import CardItem from '@/components/card-item/index.vue'
import RecordList from '@/components/record-list/index.vue'
import Infos from './components/Infos.vue'
const loading = ref<boolean>(true)
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 3000)
})
const tabListNoTitle = [
  {
    key: 'article',
    tab: '测评人数'
  },
  {
    key: 'app',
    tab: '访问量'
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
const noTitleKey = ref('article')
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
