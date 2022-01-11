<template>
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
</template>

<script lang='ts' setup>
</script>
<style lang="scss" scoped>
@import '@/assets/css/mixin';
 .left {
    padding: 20px;
    @include wh(100%, 726px);
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
        margin-left: 15px;
      }
    }
  }
</style>
