<!--  -->
<template>
  <div class="home">
    <div class="left">
      <div class="person-info">
        <div class="header" />
        <div class="name">
          张克榕
        </div>
      </div>
      <div class="infos">
        <div
          v-for="(item, index) in 7"
          :key="index"
          class="infos-item"
        >
          <span>性别：</span>
          <span>sdf5646546565</span>
        </div>
      </div>
      <div class="button">
        <router-link to="/personage-set">
          <a-button type="primary">
            编辑设置
          </a-button>
        </router-link>
        <a-button class="dbutton">
          删除档案
        </a-button>
      </div>
    </div>
    <div class="right">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane
          key="1"
          tab="测评记录"
        >
          <RecordList />
        </a-tab-pane>
        <a-tab-pane
          key="2"
          tab="已参与测评"
          force-render
        >
          <CardItem>
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
          </CardItem>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, defineComponent, ref } from 'vue'
import CardItem from '@/components/card-item/index.vue'
import RecordList from '@/components/record-list/index.vue'

export default defineComponent({
  name: 'PersonagePage',
  components: { CardItem, RecordList },
  setup() {
    const activeKey = ref('1')
    onMounted(() => {})
    return {
      activeKey
    }
  }
})
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin";
.home {
  display: flex;
  margin: 24px 24px 24px 24px;
  .left {
    padding: 40px;
    @include wh(30%, 726px);
    background: #ffffff;
    border-radius: 2px;
    color: black;
    .person-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      .header {
        background: rgba(0, 0, 0, 1);
        @include wh(106px, 106px);
        @include borderRadius(50%);
      }
      .name {
        margin-top: 12px;
      }
    }
    .infos {
      margin-top: 12px;
      .infos-item {
        @include faj();
        @include wh(_, 40px);
        span {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.65);
        }
      }
    }
    .button {
      text-align: center;
      margin-top: 132px;
      .dbutton {
        margin-left: 20px;
      }
    }
  }
  .right {
    padding: 15px;
    margin-left: 24px;
    @include wh(70%, 810px);
    background: #ffffff;
    border-radius: 2px;
    .item-content {
      padding: 12px 24px 12px 24px;
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
}
</style>
