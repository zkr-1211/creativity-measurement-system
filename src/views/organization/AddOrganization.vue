<template>
  <div class="body">
    <page-header />
    <a-card class="card">
      <div class="content">
        <a-form
          v-if="true"
          :model="formState"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-item label="学校名称">
            <a-input
              v-model:value="formState.schoolName"
              class="input-width"
            />
          </a-form-item>
          <a-form-item label="学校简介（选填）">
            <a-textarea
              v-model:value="formState.schoolDesc"
              type="textarea"
              class="input-width"
              :auto-size="{ minRows: 5, maxRows: 10 }"
            />
          </a-form-item>
          <a-form-item label="所在省市">
            <a-select
              v-model:value="formState.province"
              class="select-width"
              placeholder="please select your zone"
            >
              <a-select-option value="shanghai">
                Zone one
              </a-select-option>
              <a-select-option value="beijing">
                Zone two
              </a-select-option>
            </a-select>
            <a-select
              v-model:value="formState.city"
              class="select-width"
              placeholder="please select your zone"
            >
              <a-select-option value="shanghai">
                Zone one
              </a-select-option>
              <a-select-option value="beijing">
                Zone two
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="详细地址">
            <a-textarea
              v-model:value="formState.address"
              class="input-width"
              type="textarea"
              :auto-size="{ minRows: 5, maxRows: 10 }"
            />
          </a-form-item>
          <a-form-item label="校区超级管理员姓名">
            <a-input
              v-model:value="formState.superName"
              class="input-width"
            />
          </a-form-item>
          <a-form-item label="校区超级管理员手机号">
            <a-input
              v-model:value="formState.superPhone"
              class="input-width"
            />
          </a-form-item>
          <a-form-item
            :wrapper-col="{ span: 14, offset: 4 }"
            class="button"
          >
            <a-button
              type="primary"
              @click="onSubmit"
            >
              创建
            </a-button>
            <a-button style="margin-left: 10px">
              重置
            </a-button>
          </a-form-item>
        </a-form>
        <div
          v-else
          class="create-success"
        >
          <div class="icon" />
          <div class="title">
            创建成功
          </div>
          <div class="tip">
            预计两小时内到账
          </div>
          <div class="button1">
            <a-button
              type="primary"
              @click="onSubmit"
            >
              回到起始页
            </a-button>
            <a-button style="margin-left: 10px">
              查看详情
            </a-button>
          </div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent, toRaw } from 'vue'
import PageHeader from '@/components/page-header/index.vue'

export default defineComponent({
  name: 'AddOrganization',
  components: { PageHeader },
  setup() {
    const formState = reactive({
      schoolName: '',
      schoolDesc: '',
      superName: '',
      superPhone: '',
      province: undefined,
      city: undefined,
      address: ''
    })

    const onSubmit = () => {
      console.log('submit!', toRaw(formState))
    }

    return {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 14
      },
      formState,
      onSubmit
    }
  }
})
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin";
.body {
  .card {
    position: relative;
    margin: 16px 24px 32px 24px;
    background: #ffffff;
    border-radius: 2px;
    .content {
      padding-top: 25px;
      margin-left: 25%;
      .input-width {
        max-width: 368px;
      }
      .select-width {
        width: 120px;
        &:nth-of-type(2) {
          margin-left: 20px;
        }
      }
      .button {
        margin-top: 70px;
      }
      .create-success {
        @include center();
        @include faj(center, center);
        flex-direction: column;
        .icon {
          @include wh(72px, 72px);
          background: #74c041;
          @include borderRadius(50%);
        }
        .title {
          @include sc(24px, rgba(0, 0, 0, 0.85));
          margin-top: 10px;
        }
        .tip {
          margin-top: 10px;
          @include wh(112px, 20px);
          @include sc(14px, rgba(0, 0, 0, 0.43));
        }
        .button1 {
          margin-top: 20px;
        }
      }
    }
  }
}
</style>
