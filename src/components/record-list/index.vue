<!--  -->
<template>
  <div class="body">
    <!-- <div class="eva-record">
      <div
        v-for="(item, index) in 3"
        :key="index"
        class="eva-record-item"
      >
        <div class="header" />
        <div class="item-info">
          <div class="item-right-top">
            林东东在
            <span> 云凤蝶精英小分队</span>
            新建项目
            <span>6月迭代</span>
          </div>
          <div class="item-right-bottom">
            <span>2 分钟前</span>
            <span>测评人：闫肃</span>
          </div>
        </div>
      </div>
    </div> -->
    <a-list>
      <a-list-item v-for="(item, index) in 6" :key="index">
        <a-list-item-meta>
          <template #avatar>
            <a-avatar
              size="small"
              src="https://s1.ax1x.com/2022/04/22/LR9is1.png"
            />
          </template>
          <template #title>
            <div class="item-right-top">
              {{ userInfo.realname }}在
              <span> 智力测评</span>
              新建题集
              <span>自制力测评</span>
            </div>
          </template>

          <template #description>
            <div class="item-right-bottom">
              <span>2 分钟前</span>
              <span>测评人：李华</span>
            </div>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </div>
</template>

<script lang="ts">
import { onMounted, defineComponent } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  name: "RecordList",
  components: {},
  setup() {
    const store = useStore();
    const userInfo = computed(() => {
      return store.getUserInfo;
    });
    onMounted(() => {});
    return {
      userInfo
    };
  },
});
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin";
.item-right-top {
  span {
    color: #3fa4ed;
  }
}
.item-right-bottom {
  span {
    @include sc(14px, rgba(0, 0, 0, 0.25));
    &:nth-of-type(2) {
      margin-left: 30px;
    }
  }
  span {
  }
}
.eva-record {
  padding-left: 10px;
  overflow: auto;
  width: 100%;
  .eva-record-item {
    display: flex;
    margin-top: 10px;
    border-bottom: 1px solid #e9e9e9;
    padding: 10px;
    .header {
      min-width: 32px;
      @include wh(32px, 32px);
      background: rgba(0, 0, 0, 1);
      border-radius: 50%;
    }
    .item-info {
      margin-left: 10px;
    }
  }
}
</style>
