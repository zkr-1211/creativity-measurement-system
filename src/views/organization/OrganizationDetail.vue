<!--  -->
<template>
  <div class="body">
    <page-header title="">
      <div class="eva-record-item">
        <div class="header" />
        <div class="item-info">
          <div class="item-right-top">
            哈哈哈
          </div>
          <div class="item-right-bottom">
            <span>学校简介：位于的一高校</span>
          </div>
        </div>
      </div>
      <template #right>
        <a-button type="primary">
          新建测评
        </a-button>
      </template>
    </page-header>

    <div class="main">
      <div class="top">
        <a-row :gutter="24">
          <a-col
            :xs="24"
            :sm="24"
            :md="24"
            :xl="17"
            :style="{ marginBottom: '24px' }"
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
                <a-list
                  :grid="{
                    gutter: 24,
                    xxl: 3,
                    xl: 3,
                    lg: 3,
                    md: 2,
                    sm: 2,
                    xs: 1,
                  }"
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
                        <a-card-meta>
                          <template #title>
                            <span style="font-weight: bold">
                              {{ item.title }}
                            </span>
                          </template>
                          <template #description>
                            <div class="des">
                              <div class="text">
                                开通日期：
                              </div>
                              <div class="time">
                                2020.03.03
                              </div>
                            </div>
                          </template>
                        </a-card-meta>
                        <template #actions>
                          <a>取消开通</a>
                          <router-link to="/organization/orgevaluation-detail">
                            查看详情
                          </router-link>
                        </template>
                      </a-card>
                    </a-list-item>
                  </template>
                </a-list>
              </div>
              <p v-else-if="noTitleKey === 'app'">
                访问量
              </p>
              <template #tabBarExtraContent>
                <div class="tabs-right">
                  全部项目
                </div>
              </template>
            </a-card>
          </a-col>
          <a-col
            :xs="24"
            :sm="24"
            :md="24"
            :xl="7"
            :style="{ marginBottom: '24px' }"
          >
            <a-card
              title="管理"
              :loading="loading"
            >
              <div
                v-for="(item, index) in manageList"
                :key="index"
                class="item"
                @click="toManage(index)"
              >
                <div class="item-left">
                  <div class="img" />
                  <div class="name">
                    {{ item.name }}管理
                  </div>
                </div>
                <div class="item-right">
                  <div class="num">
                    {{ item.num }}
                  </div>
                  <div class="icon">
                    <RightOutlined />
                  </div>
                </div>
              </div>
              <template #tabBarExtraContent>
                <div class="tabs-right">
                  全部项目
                </div>
              </template>
            </a-card>
          </a-col>
        </a-row>
      </div>
      <div class="bottom">
        <a-row :gutter="24">
          <a-col
            :xs="24"
            :sm="24"
            :md="24"
            :xl="17"
            :style="{ marginBottom: '24px' }"
          >
            <a-card
              title="动态"
              :loading="loading"
            >
              <RecordList />
            </a-card>
          </a-col>
          <a-col
            :xs="24"
            :sm="24"
            :md="24"
            :xl="7"
            :style="{ marginBottom: '24px' }"
          >
            <a-card
              title="动态"
              :loading="loading"
            >
              <RecordList />
            </a-card>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RightOutlined } from '@ant-design/icons-vue'
import { onMounted, ref } from 'vue'
import PageHeader from '@/components/page-header/index.vue'
import RecordList from '@/components/record-list/index.vue'
import { useRouter } from 'vue-router'

const loading = ref<boolean>(true)
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 500)
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
for (let i = 1; i < 4; i++) {
  data.push({
    id: i.toString(),
    name: `类目 ${i}`,
    title: '创造力测评'
  })
}
const manageList = ref([
  {
    name: '校区',
    num: '12'
  },
  {
    name: '班级',
    num: '20'
  },
  {
    name: '学生',
    num: '6'
  },
  {
    name: '教师',
    num: '3'
  },
  {
    name: '校区管理员',
    num: '1'
  }
])
const router = useRouter()
const toManage = (index) => {
  switch (index) {
    case 0:
      router.push({ path: '/school-manage' })
      break
    case 1:
      router.push({ path: '/class-manage' })
      break
    case 2:
      router.push({ path: '/student-manage' })
      break
    case 3:
      router.push({ path: '/teacher-manage' })
      break
    case 4:
      router.push({ path: '/school-administrator' })
      break
  }
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
.body {

  .card-items {
    height: 300px;
    overflow: auto;
  }
  .eva-record-item {
    display: flex;
    .header {
      @include wh(72px, 72px);
      background: rgba(0, 0, 0, 1);
      border-radius: 50%;
    }
    .item-info {
      @include faj(none, space-around);
      flex-direction: column;
      margin-left: 10px;
      @include sc(20px, rgba(0, 0, 0, 1));
      .item-right-bottom {
        span {
          @include sc(14px, rgba(0, 0, 0, 0.25));
        }
      }
    }
  }
  .main {
    margin: 24px;
    .top {
      .des {
        @include faj();
        @include sc(0.14rem, rgba(0, 0, 0, 0.45));
      }
      .info {
        cursor: pointer;
        @include faj(center, center);
        @include wh(100%, 42px);
        background: #fafafa;
        border: 1px solid #e9e9e9;
        border-radius: 0px 0px 2px 2px;
        @include sc(13px, rgba(0, 0, 0, 0.45));
      }
      .tabs-right {
        @include sc(14px, #1890ff);
      }
      .item {
        cursor: pointer;
        @include faj(center);
        height: 65px;
        &:hover {
          opacity: 0.95;
          color: #1890ff;
        }
        .item-left {
          @include faj(center);
          .img {
            @include wh(32px, 32px);
            background: #e0f0ff;
            border-radius: 50%;
          }
          .name {
            font-weight: bold;
            margin-left: 10px;
          }
        }
        .item-right {
          @include faj(center);
          .num {
            margin-right: 10px;
            @include sc(14px, #8c8c8c);
          }
          .icon {
            @include sc(16px, #8c8c8c);
          }
        }
      }
    }
    .bottom {
      .tabs-right {
        @include sc(14px, #1890ff);
      }
    }
  }
}
</style>
