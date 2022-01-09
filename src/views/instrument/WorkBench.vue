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
      <div class="spet">
        <div class="left">
          <div class="left-content">
            <div class="title">
              第一步
            </div>
            <div class="text">
              模型维度
            </div>
            <div class="button">
              <a-button type="primary">
                维度编辑
              </a-button>
            </div>
          </div>
          <div class="icon" />
        </div>
        <div class="left right">
          <div class="left-content">
            <div class="title">
              第二步
            </div>
            <div class="text">
              测评题目与阶段
            </div>
            <div class="button">
              <a-button type="primary">
                编辑
              </a-button>
            </div>
          </div>
          <div class="icon" />
        </div>
      </div>

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
      <div class="problem-data">
        <HeaderItem title="题目数据">
          <a-select
            ref="select"
            v-model:value="value1"
            style="width: 150px"
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
          <a-select
            ref="select"
            v-model:value="value1"
            style="width: 150px; margin-left: 15px"
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
          <a-select
            ref="select"
            v-model:value="value1"
            style="width: 150px; margin-left: 15px"
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
          <a-select
            ref="select"
            v-model:value="value1"
            style="width: 150px; margin-left: 15px"
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
        </HeaderItem>
        <div class="bottom">
          <div class="left">
            <div class="title">
              题目:你有想过自己未来要做什么么？
            </div>
            <div
              v-for="(item, index) in 6"
              :key="index"
              class="item"
            >
              选项A:没有
            </div>
          </div>
          <div class="right">
            <ProjectAccounteChart />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import PageHeader from '@/components/page-header/index.vue'
import FourItemCard from '@/components/four-item-card/index.vue'
import TendencyRun from '@/components/tendency-run/index.vue'
import HeaderItem from '@/components/header-item/index.vue'
import ProjectAccounteChart from '@/components/project-accounte-chart/index.vue'
const handleChange = () => {}
const value1 = ref(0)
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin";
.body {
  .content {
    .spet {
      @include faj();
      margin-bottom: 24px;
      .right {
        margin-left: 24px;
      }
      .left {
        @include wh(50%, 188px);
        background: #ffffff;
        border-radius: 2px;
        padding: 30px;
        @include faj();
        .left-content {
          margin-left: 30px;
          .title {
            font-weight: 600;
            @include sc(16px, rgba(0, 0, 0, 0.85));
          }
          .text {
            font-weight: 600;
            @include sc(24px, rgba(0, 0, 0, 0.85));
          }
          .button {
            margin-top: 20px;
          }
        }
        .icon {
          @include wh(106px, 101px);
          background: #1e7ffe;
          margin-right: 30px;
        }
      }
    }
    .problem-data {
      @include wh(100%, 450px);
      background: #ffffff;
      border-radius: 2px;
      .bottom {
        display: flex;
        padding: 30px;
        .left {
          width: 50%;
          color: #000000;
          .title {
            font-size: 16px;
            color: rgba(0, 0, 0, 0.85);
            margin-bottom: 30px;
            font-weight: bold;
          }
          .item {
            height: 42px;
            font-size: 16px;
            color: #595959;
          }
        }
        .right {
          width: 50%;
        }
      }
    }
  }
}
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
