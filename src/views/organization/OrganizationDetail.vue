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
    <div class="content">
      <div class="top">
        <div class="top-left">
          <a-tabs
            v-model:activeKey="activeKey"
            class="a-tabs"
          >
            <a-tab-pane
              key="1"
              tab="已开通测评"
            >
              <div class="card-items">
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
            </a-tab-pane>
            <a-tab-pane
              key="2"
              tab="可开通测评"
            />
            <template #tabBarExtraContent>
              <div class="tabs-right">
                全部项目
              </div>
            </template>
          </a-tabs>
        </div>
        <div class="top-right">
          <div class="top-header">
            管理
          </div>
          <div class="top-content">
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
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="bottom-left">
          <div class="bottom-header">
            动态
          </div>
          <div class="bottom-list">
            <RecordList />
          </div>
        </div>
        <div class="bottom-right" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { RightOutlined } from '@ant-design/icons-vue'
import { onMounted, defineComponent, ref } from 'vue'
import PageHeader from '@/components/page-header/index.vue'
import CardItem from '@/components/card-item/index.vue'
import RecordList from '@/components/record-list/index.vue'

export default defineComponent({
  name: 'OrganizationDetail',
  components: { PageHeader, CardItem, RightOutlined, RecordList },
  setup() {
    onMounted(() => {})
    const activeKey = ref('1')

    return { activeKey }
  }
})
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
  .content {
    margin: 24px;
    .top {
      display: flex;
      .top-left {
        padding: 5px 24px 24px 24px;
        width: 70%;
        height: 380px;
        background: #ffffff;
        border-radius: 2px;
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
      }
      .top-right {
        margin-left: 24px;
        width: 30%;
        height: 380px;
        background: #ffffff;
        border-radius: 2px;
        .top-header {
          @include wh(100%, 50px);
          line-height: 50px;
          padding: 0px 24px 0px 24px;
          border-bottom: 1px solid #e9e9e9;
          font-weight: bold;
          @include sc(16px, rgba(0, 0, 0, 0.85));
        }
        .top-content {
          padding: 5px 20px 20px 20px;
          @include sc(16px, rgba(0, 0, 0, 0.85));
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
      }
    }
    .bottom {
      display: flex;
      margin-top: 24px;
      .bottom-left {
        width: 70%;
        height: 544px;
        background: #ffffff;
        border-radius: 2px;
        @include sc(16px, rgba(0, 0, 0, 0.85));
        .bottom-list {
          padding: 10px;
        }
        .bottom-header {
          @include wh(100%, 50px);
          line-height: 50px;
          padding: 0px 24px 0px 24px;
          border-bottom: 1px solid #e9e9e9;
          font-weight: bold;
          @include sc(16px, rgba(0, 0, 0, 0.85));
        }
      }
      .bottom-right {
        margin-left: 24px;
        width: 30%;
        height: 353px;
        background: #ffffff;
        border-radius: 2px;
      }
    }
  }
}
</style>
