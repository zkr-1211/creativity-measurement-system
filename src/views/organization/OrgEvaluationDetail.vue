<template>
  <div class="body">
    <page-header title="">
      <div class="eva-record-item">
        <div class="header" />
        <div class="item-info">
          <div class="item-right-top">
            <div class="text">创造力测评</div>
          </div>
          <div class="item-right-bottom">
            <span
              >简介:创造力，是人类特有的一种综合性本领。创造力是指产生新思想，发现和创造新事物的能力。它是成功地完成某种创造性活动所必需的心理品质。它是知识、智力、能力及优良的个性品质等复杂多因素综合优化构成的。
            </span>
          </div>
        </div>
      </div>
      <template #right>
        <a-button type="primary" @click="setTheEdit"> 关闭测评 </a-button>
      </template>
    </page-header>
    <div class="content">
      <FourItemCard :infoList="infoList"/>
      <TendencyRun>
        <span style="margin-left: 20px">学校：</span>
        <a-select
          ref="select"
          v-model:value="value"
          style="width: 100px"
          @focus="focus"
          @change="handleChange"
        >
          <a-select-option value="jack"> Jack </a-select-option>
          <a-select-option value="lucy"> Lucy </a-select-option>
          <a-select-option value="Yiminghe"> yiminghe </a-select-option>
        </a-select>
      </TendencyRun>
      <ProblemData />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "@/store";
const router = useRouter();
const route = useRoute();
const store = useStore();
const orgInfo = computed(() => {
  return store.getOrgInfo;
});
const id = route.query.id;
const handleChange = () => {};
const value = ref();
function focus() {}
const infoList = ref([
  {
    title: "本校测评总人数",
    footerDes: "日均测评数123",
  },
  {
    title: "本校访问量",
    footerDes: "日访问量3453",
  },
  {
    title: "开通校区数",
    footerDes: "校区平均测评数234234",
  },
  {
    title: "测评项目数",
    footerDes: "今年新增123",
  },
])
function setTheEdit() {
  router.push({
    path: "/evaluation/evaluationset",
    query: {
      id: id,
    },
  });
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin";
.content {
  margin: 24px;
}
.eva-record-item {
  display: flex;
  .header {
    min-width: 152px;
    @include wh(152px, 72px);
    background: rgba(0, 0, 0, 1);
  }
  .item-info {
    @include faj(none, space-around);
    flex-direction: column;
    margin-left: 20px;
    @include sc(20px, rgba(0, 0, 0, 1));
    .item-right-top {
      display: flex;

      div {
        margin-right: 10px;
      }
      .tag {
        border: 1px solid #d9d9d9;
        padding: 4px;
        font-size: 12px;
        display: flex;
        align-items: center;
        border-radius: 2px;
        background: rgba(245, 245, 245, 0.39);
      }
    }
    .item-right-bottom {
      margin-top: 5px;
      line-height: 20px;
      @include tbm(2);
      span {
        @include sc(14px, rgba(0, 0, 0, 0.25));
      }
    }
  }
}
</style>
