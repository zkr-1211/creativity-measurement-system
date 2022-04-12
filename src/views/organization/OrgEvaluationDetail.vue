<template>
  <div class="body">
    <page-header title="">
      <div class="eva-record-item">
        <div class="header" />
        <div class="item-info">
          <div class="item-right-top">
            <div class="text">阿萨法术</div>
            <div class="tag">蚂蚁金服</div>
          </div>
          <div class="item-right-bottom">
            <span
              >简介：手动阀手动阀豆腐干豆腐干大范甘迪的风格的风格的风格的风格的地方古典风格的风格</span
            >
          </div>
        </div>
      </div>
      <template #right>
        <a-button type="primary" @click="setTheEdit"> 设置编辑 </a-button>
      </template>
    </page-header>
    <div class="content">
      <FourItemCard />
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
const router = useRouter();
const route = useRoute();
const id = route.query.id;
const handleChange = () => {};
const value = ref();
function focus() {}
function setTheEdit() {
  router.push({ path: "/evaluation/evaluationset",
    query: {
      id: id
    }
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
      max-width: 800px;
      line-height: 20px;
      @include tbm(2);
      span {
        @include sc(14px, rgba(0, 0, 0, 0.25));
      }
    }
  }
}
</style>
