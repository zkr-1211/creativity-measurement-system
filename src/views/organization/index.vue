<template>
  <div class="body">
    <page-header />
    <div class="content-card">
      <div class="add-org">
        <router-link to="/organization/addorganization">
          + 新增机构
        </router-link>
      </div>
      <div
        v-for="(item, index) in 4"
        :key="index"
        class="content-item"
      >
        <div class="item-top">
          <div class="header">
            <!-- <img src="" alt="" /> -->
          </div>
          <div class="item-infos">
            <div class="title">
              凤蝶
            </div>
            <router-link to="/organization/detail">
              <div class="des">
                测试学生的创造力水平测力水平测试学生的创造力水平测力水平
              </div>
            </router-link>
          </div>
        </div>
        <div class="item-bottom-info">
          <div class="info">
            <div class="num">
              操作一
            </div>
            <div class="imgs">
              |
            </div>
            <div class="num">
              操作二
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, defineComponent } from 'vue'
import PageHeader from '@/components/page-header/index.vue'

export default defineComponent({
  name: 'MyOrganization',
  components: {
    PageHeader
  },
  setup() {
    onMounted(() => {})
    return {}
  }
})
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin";
.body {
  .content-card {
        margin: 24px;

    display: grid;
    justify-content: space-between;
    grid-template-columns: repeat(auto-fill, 3.78rem);
    grid-gap: 32px;
    .add-org {
      cursor: pointer;
      @include wh(3.78rem, 1.84rem);
      @include borderRadius(0.03rem);
      @include sc(0.18rem, #1890ff);
      background: #ffffff;
      border: 1px dashed #1890ff;
      line-height: 1.84rem;
      text-align: center;
    }
    .content-item {
      height: 1.84rem;
      background: #ffffff;
      border: 1px solid #e9e9e9;
      @include borderRadius(0.03rem);
      .item-top {
        @include wh(100%, 1.36rem);
        padding: 25px;
        @include faj(none);
        .header {
          height: 48px;
          min-width: 48px;
          background: #1890ff;
          @include borderRadius(50%);
          img {
            @include wh(0.64rem, 0.64rem);
          }
        }
        .item-infos {
          margin-left: 22px;
          .title {
            font-weight: bold;
            @include sc(0.16rem, rgba(0, 0, 0, 0.85));
          }
          .des {
            @include tbm(3);
            @include sc(0.14rem, rgba(0, 0, 0, 0.45));
            margin-top: 20px;
          }
        }
      }
      .item-bottom-info {
        padding: 0px 70px 0px 70px;
        line-height: 28px;
        @include wh(100%, 0.48rem);
        background: #e9e9e9;
        color: #000;
        border: 1px solid #dddcdc;
        .info {
          @include faj();
          margin-top: 10px;
          .num {
            @include sc(0.14rem, rgba(0, 0, 0, 0.45));
            cursor: pointer;
            &:hover {
              color: #108ee9;
            }
          }
          .imgs {
            color: #b9b9b9;
          }
        }
      }
    }
  }
}
</style>
