<template>
  <div class="body">
    <page-header />
    <!-- <div class="content-card">
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
          <div class="header" />
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
      <i />
      <i />
      <i />
      <i />
    </div> -->

    <a-list
      :data-source="data"
      :grid="{ gutter: 24, xxl: 5, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }"
      class="content-card"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <template v-if="item.id === 0">
            <router-link to="/organization/addorganization">
              <a-button
                class="new-btn"
                type="dashed"
              >
                <PlusOutlined />
                新增产品
              </a-button>
            </router-link>
          </template>
          <template v-else>
            <a-card :hoverable="true">
              <a-card-meta>
                <template #title>
                  测试学生
                </template>
                <template #avatar>
                  <a-avatar
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  />
                </template>
                <template #description>
                  测试学生的创造力水平测试学生的创造力水平
                </template>
              </a-card-meta>
              <template #actions>
                <a>操作一</a>
                <a>操作二</a>
              </template>
            </a-card>
          </template>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script lang="ts" setup>
import PageHeader from '@/components/page-header/index.vue'
import { PlusOutlined } from '@ant-design/icons-vue'
const data: any[] = []
for (let i = 0; i < 11; i++) {
  data.push({
    id: i,
    title: 'Alipay',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png'
  })
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin";
.new-btn {
  background-color: #fff;
  border-radius: 2px;
  width: 100%;
  height: 166px;
}
.body {
  .content-card {
    margin: 24px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .content-card > i {
      width: 3.58rem;
    }
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
  }
}
</style>
