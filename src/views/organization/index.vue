<template>
  <div class="body">
    <page-header title="机构/学校" />
    <a-spin :spinning="spinning">
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
                  新增机构/学校
                </a-button>
              </router-link>
            </template>
            <template v-else>
              <a-card :hoverable="true">
                <a-card-meta>
                  <template #title>
                    <span style="font-weight: bold">
                      {{ item.title }}
                    </span>
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
                  <router-link to="/organization/detail">
                    <a>详情与管理</a>
                  </router-link>
                  <a>删除机构</a>
                </template>
              </a-card>
            </template>
          </a-list-item>
        </template>
      </a-list>
    </a-spin>
  </div>
</template>

<script lang="ts" setup>
import PageHeader from '@/components/page-header/index.vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { onMounted, ref } from 'vue'
const data: any[] = []
for (let i = 0; i < 11; i++) {
  data.push({
    id: i,
    title: 'Alipay',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png'
  })
}
const spinning = ref<boolean>(true)
onMounted(() => {
  setTimeout(() => {
    spinning.value = false
  }, 500)
})
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
