<template>
  <div class="body">
    <page-header title="">
      <div class="eva-record-item">
        <div class="header" />
        <div class="item-info">
          <div class="item-right-top">
            阿萨法术
          </div>
          <div class="item-right-bottom">
            <span>简介：手动阀手动阀豆腐干豆腐干大范甘迪的风格的风格的风格的风格的地方古典风格的风格</span>
          </div>
        </div>
      </div>
      <template #right>
        <a-button type="primary">
          设置编辑
        </a-button>
      </template>
    </page-header>
    <div class="content">
      <FourItemCard />
      <TendencyRun>
        <span style="margin-left: 20px">学校：</span>
        <a-select
          ref="select"
          v-model:value="value1"
          style="width: 100px"
          @focus="focus"
          @change="handleChange"
        >
          <a-select-option value="jack">
            Jack
          </a-select-option>
          <a-select-option value="lucy">
            Lucy
          </a-select-option>
          <a-select-option value="Yiminghe">
            yiminghe
          </a-select-option>
        </a-select>
      </TendencyRun>

      <ProblemData />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import PageHeader from '@/components/page-header/index.vue'
import FourItemCard from '@/components/four-item-card/index.vue'
import TendencyRun from '@/components/tendency-run/index.vue'
import ProblemData from '@/components/problem-data/index.vue'
const handleChange = () => {}
const value1 = ref()
function focus() {}
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
