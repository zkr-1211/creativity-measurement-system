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
        <a-card
          :loading="loading"
          style="width: 70%"
          :tab-list="tabListNoTitle"
          :active-tab-key="noTitleKey"
          @tab-change="(key) => onTabChange(key, 'noTitleKey')"
        >
          <div
            v-if="noTitleKey === 'article'"
            class="content"
          >
            <CardItem>
              <div class="item-content">
                <div class="title">
                  创造力测评
                </div>
                <div class="des">
                  <div class="text">
                    开通日期：
                  </div>
                  <div class="time">
                    2020.03.03
                  </div>
                </div>
              </div>
              <div class="info">
                取消开通
              </div>
            </CardItem>
          </div>
          <p v-else-if="noTitleKey === 'app'">
            访问量
          </p>
          <template #extra>
            <div class="tabs-right">
              全部项目
            </div>
          </template>
        </a-card>
        <a-card
          title="管理"
          :loading="loading"
          style="width: 30%; margin-left: 24px"
        >
          <div
            v-for="(item, index) in 5"
            :key="index"
            class="item"
          >
            <div class="item-left">
              <div class="img" />
              <div class="name">
                校区管理
              </div>
            </div>
            <div class="item-right">
              <div class="num">
                16个
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
      </div>
      <div class="bottom">
        <a-card
          title="动态"
          :loading="loading"
          style="width: 70%"
        >
          <RecordList />
        </a-card>
        <a-card
          title="动态"
          :loading="loading"
          style="width: 30%; margin-left: 24px"
        >
          <RecordList />
        </a-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RightOutlined } from '@ant-design/icons-vue'
import { onMounted, ref } from 'vue'
import PageHeader from '@/components/page-header/index.vue'
import CardItem from '@/components/card-item/index.vue'
import RecordList from '@/components/record-list/index.vue'

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
      display: flex;
      .item-content {
        padding: 12px 24px 0 24px;
        .title {
          font-weight: bold;
          @include sc(0.17rem, rgba(0, 0, 0, 0.85));
        }
        .des {
          @include faj();
          margin-top: 15px;
          @include sc(0.14rem, rgba(0, 0, 0, 0.45));
        }
      }
      .info {
        cursor: pointer;
        @include faj(center, center);
        @include wh(100%, 42px);
        margin-top: 10px;
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
      display: flex;
      margin-top: 24px;
      .tabs-right {
        @include sc(14px, #1890ff);
      }
    }
  }
}
</style>
