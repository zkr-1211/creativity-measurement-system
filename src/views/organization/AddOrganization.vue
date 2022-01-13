<template>
  <div class="body">
    <page-header />
    <a-card class="card">
      <a-form
        v-if="finish"
        ref="formRef"
        :model="formState"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :rules="rules"
      >
        <a-form-item
          label="学校名称"
          name="schoolName"
        >
          <a-input
            v-model:value="formState.schoolName"
            class="input-width"
          />
        </a-form-item>
        <a-form-item
          label="学校简介（选填）"
          name="schoolDesc"
        >
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
        <a-form-item
          label="详细地址"
          name="address"
        >
          <a-textarea
            v-model:value="formState.address"
            class="input-width"
            type="textarea"
            :auto-size="{ minRows: 5, maxRows: 10 }"
          />
        </a-form-item>
        <a-form-item
          label="校区超级管理员姓名"
          name="superName"
        >
          <a-input
            v-model:value="formState.superName"
            class="input-width"
          />
        </a-form-item>
        <a-form-item
          label="校区超级管理员手机号"
          name="superPhone"
        >
          <a-input
            v-model:value="formState.superPhone"
            class="input-width"
          />
        </a-form-item>
        <a-form-item
          :wrapper-col="{ span: 10, offset: 10 }"
          class="button"
        >
          <a-button
            type="primary"
            @click="onSubmit"
          >
            创建
          </a-button>
          <a-button
            style="margin-left: 10px"
            @click="resetForm"
          >
            重置
          </a-button>
        </a-form-item>
      </a-form>
      <a-result
        v-if="!finish"
        status="success"
        title="创建成功"
        sub-title="哈哈哈哈哈哈哈"
      >
        <template #extra>
          <router-link to="/organization">
            <a-button
              key="console"
              type="primary"
            >
              回到起始页
            </a-button>
          </router-link>
          <a-button key="buy">
            查看详情
          </a-button>
        </template>
      </a-result>
    </a-card>
  </div>
</template>

<script lang="ts">
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
import { reactive, defineComponent, toRaw, UnwrapRef, ref, onActivated } from 'vue'
import PageHeader from '@/components/page-header/index.vue'
interface FormState {
  schoolName: string;
  schoolDesc: string;
  superName: string;
  superPhone: number;
  province: string;
  address: string;
  city: string;
}
export default defineComponent({
  name: 'AddOrganization',
  components: { PageHeader },
  setup() {
    const formRef = ref()
    const formState: UnwrapRef<FormState> = reactive({
      schoolName: '',
      schoolDesc: '',
      superName: '',
      superPhone: 0,
      province: '',
      city: '',
      address: ''
    })
    const rules = {
      schoolName: [
        {
          required: true,
          message: 'Please input Activity name',
          trigger: 'blur'
        },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
      ],
      schoolDesc: [
        {
          required: true,
          message: 'Please input Activity name',
          trigger: 'blur'
        },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
      ],
      superName: [
        {
          required: true,
          message: 'Please input Activity name',
          trigger: 'blur'
        },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
      ],
      address: [
        {
          required: true,
          message: 'Please input Activity name',
          trigger: 'blur'
        },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
      ],
      province: [
        {
          required: true,
          message: 'Please input Activity name',
          trigger: 'blur'
        },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
      ],
      region: [
        {
          required: true,
          message: 'Please select Activity zone',
          trigger: 'change'
        }
      ],
      type: [
        {
          type: 'array',
          required: true,
          message: 'Please select at least one activity type',
          trigger: 'change'
        }
      ],
      resource: [
        {
          required: true,
          message: 'Please select activity resource',
          trigger: 'change'
        }
      ],
      superPhone: [
        {
          required: true,
          message: 'Please input activity form',
          trigger: 'blur'
        }
      ]
    }
    const resetForm = () => {
      // console.log(formRef.value)

      formRef.value.resetFields()
    }
    const finish = ref(true)
    onActivated(() => { // 被包裹组件被激活的状态下触发
      finish.value = true
    })

    const onSubmit = () => {
      finish.value = false
      // formRef.value
      //   .validate()
      //   .then(() => {
      //     console.log('values', formState, toRaw(formState))
      //   })
      //   .catch((error: ValidateErrorEntity<FormState>) => {
      //     console.log('error', error)
      //   })
    }

    return {
      labelCol: {
        span: 10
      },
      wrapperCol: {
        span: 7
      },
      formState,
      onSubmit,
      rules,
      resetForm,
      formRef,
      finish
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
        max-width: 68px;
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
    }
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
</style>
