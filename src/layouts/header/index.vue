<template>
  <a-layout-header>
    <div class="header">
      <div class="user">
        <div class="user-serach">
          <img
            src=""
            alt=""
          >
        </div>
        <div class="user-message">
          <img
            src=""
            alt=""
          >
        </div>
        <div class="user-info">
          <div class="user-header">
            <img
              src=""
              alt=""
            >
          </div>
          <div class="user-name">
            用户名
          </div>
        </div>
        <div class="user-state" />
      </div>
    </div>
  </a-layout-header>
</template>

<script lang='ts' setup>
</script>
<style lang="scss" scoped>
@import '@/assets/css/mixin';
#components-layout-demo-basic .ant-layout-header {
  background: #ffffff;
  z-index: 999;
  @include wh(100%, 0.48rem);
  box-shadow: 0px 1px 4px rgba(0, 21, 41, 0.12);
  @include faj();
  flex-direction: row-reverse;
}
  .user {
    @include faj();
    &-serach {
      @include borderRadius(50%);
      @include wh(0.14rem, 0.14rem);
      background: rgba(0, 0, 0, 1);
      img {
      }
    }
    &-message {
      @include borderRadius(50%);
      margin-left: 0.35rem;
      @include wh(0.14rem, 0.14rem);
      background: rgb(145, 38, 38);
      img {
      }
    }
    &-info {
      margin-left: 0.35rem;
      @include faj();
      .user-header {
        display: flex;
        @include wh(0.34rem, 0.34rem);
        background: #aad315;
        @include borderRadius(50%);
        img {
          display: none;
        }
      }
      .user-name {
        margin-left: 0.12rem;
        white-space: nowrap;
      }
    }
    &-state {
      margin-left: 0.15rem;
      @include wh(0.14rem, 0.14rem);
      background: rgba(0, 0, 0, 0.65);
      @include borderRadius(50%);
    }
  }
</style>
