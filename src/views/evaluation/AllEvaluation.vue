<!--  -->
<template>
  <div class="body">
    <page-header />
    <div class="main-content">
      <a-card>
        <div class="search-info">
          <div class="tags">
            <div class="tags-text">
              标签类目：
            </div>
            <div class="tags-content">
              <div
                v-for="item in tagList"
                :key="item.id"
                class="tags-item"
                :class="selectTagId === item.id ? 'tags-active' : ''"
                @click="selectTag(item.id)"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
          <div class="other-select">
            <div class="other-text">
              其他选项：
            </div>
            <div class="other-right">
              <div class="select-item">
                <div class="select-level">
                  学段：
                  <a-select
                    ref="select"
                    v-model:value="value1"
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
                </div>
                <div class="participate-num">
                  参与人数：
                  <a-select
                    ref="select"
                    v-model:value="value1"
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
                </div>
              </div>
              <div class="search">
                <a-input-search
                  v-model:value="value"
                  placeholder="请输入"
                  @search="onSearch"
                />
              </div>
            </div>
          </div>
        </div>
      </a-card>
      <a-spin :spinning="spinning">
        <a-list
          style="margin-top: 24px"
          :grid="{ gutter: 24, xxl: 5, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }"
          :data-source="data"
        >
          <template #renderItem="{ item }">
            <a-list-item>
              <router-link to="/evaluation/evaluation-detail">
                <a-card>
                  <template #cover>
                    <img
                      alt="example"
                      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    >
                  </template>
                  <a-card-meta :title="item.title">
                    <template #description>
                      测试学生的创造力水平测试学生的创造力水平
                    </template>
                  </a-card-meta>
                  <div class="info">
                    <div class="num">
                      14679人参与测评
                    </div>
                    <div class="imgs">
                      <div
                        v-for="(item, index) in 4"
                        :key="index"
                        class="img"
                      />
                    </div>
                  </div>
                </a-card>
              </router-link>
            </a-list-item>
          </template>
        </a-list>
      </a-spin>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, defineComponent, ref } from 'vue'
import PageHeader from '@/components/page-header/index.vue'
// import CardItem from '@/components/card-item/index.vue'
const data: any[] = []
for (let i = 1; i < 21; i++) {
  data.push({
    id: i.toString(),
    name: `类目 ${i}`,
    title: '创造力测评'
  })
}
export default defineComponent({
  name: 'AllEvaluation',
  components: {
    PageHeader
    // CardItem
  },
  setup() {
    const spinning = ref<boolean>(true)
    onMounted(() => {
      setTimeout(() => {
        spinning.value = false
      }, 500)
    })
    const tagList = ref(data)
    const focus = () => {
      console.log('focus')
    }
    // 选择的标签id
    const selectTagId = ref('1')
    const selectTag = (id: string) => {
      selectTagId.value = id
    }
    // 搜索
    const value = ref('')
    const onSearch = (searchValue: any) => {
      console.log('use value', searchValue)
      console.log('or use this.value', value.value)
    }
    // 选择框改变时
    const handleChange = (value: any) => {
      console.log(`selected ${value}`)
    }

    onMounted(() => {})
    return {
      value1: ref('lucy'),
      value,
      tagList,
      selectTagId,
      onSearch,
      focus,
      handleChange,
      selectTag,
      data,
      spinning
    }
  }
})
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin";
.body {
  .main-content {
    margin: 24px;
    color: rgba(0, 0, 0, 0.85);
    .search-info {
      @include borderRadius(0.02rem);
      background: #ffffff;
      padding: 15px;
      font-size: 14px;
      .tags {
        border-bottom: 1px solid #e8e8e8;
        line-height: 30px;
        display: flex;
        .tags-text {
          width: 100px;
          text-align: center;
          white-space: nowrap;
          color: rgba(0, 0, 0, 0.85);
        }
        .tags-content {
          display: flex;
          flex-wrap: wrap;
          width: 1100px;
          min-height: 80px;
          .tags-active {
            color: #fff !important;
            background: #1890ff;
          }
          .tags-item {
            cursor: pointer;
            color: rgba(0, 0, 0, 0.65);
            @include faj(center, center);
            margin-left: 10px;
            @include wh(0.77rem, 0.29rem);
            @include borderRadius(0.03rem);
          }
        }
      }
      .other-select {
        margin-top: 30px;
        display: flex;
        align-items: center;
        .other-text {
          width: 100px;
          text-align: center;
          white-space: nowrap;
          color: rgba(0, 0, 0, 0.85);
        }
        .other-right {
          @include faj();
          flex-wrap: wrap;

          width: 100%;
          .select-item {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            .select-level {
              margin-left: 30px;
            }
            .participate-num {
              margin-left: 30px;
            }
          }
        }
      }
    }
    .item-content {
      padding: 12px 24px 12px 24px;
      .title {
        font-weight: bold;
        @include sc(0.17rem, rgba(0, 0, 0, 0.85));
      }
      .des {
        margin-top: 5px;
        @include sc(0.14rem, rgba(0, 0, 0, 0.45));
      }
    }
  }
}
.info {
  @include faj();
  margin-top: 5px;
  .num {
    @include sc(0.12rem, rgba(0, 0, 0, 0.45));
  }
  .imgs {
    display: flex;
    position: relative;
    .img {
      @include wh(0.2rem, 0.2rem);
      @include borderRadius(50%);
      position: absolute;
      right: 0;
      bottom: -10px;
    }
    .img:nth-of-type(1) {
      right: 10px;
      background: red;
    }
    .img:nth-of-type(2) {
      right: 25px;
      background: black;
    }
    .img:nth-of-type(3) {
      right: 40px;
      background-color: blue;
    }
    .img:nth-of-type(4) {
      right: 55px;
      background-color: chartreuse;
    }
  }
}
</style>
