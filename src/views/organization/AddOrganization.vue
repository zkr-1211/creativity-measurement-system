<template>
  <div class="body">
    <page-header title="新建机构/学校" />
    <a-card class="card">
      <a-form
        ref="formRef"
        :model="formState"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :rules="rules"
      >
        <a-form-item label="学校名称" name="course_name">
          <a-input
            v-model:value="formState.course_name"
            placeholder="请输入学校名称"
            class="input-width"
            :maxlength="20"
          />
        </a-form-item>
        <a-form-item label="学校简介（选填）" name="describe">
          <a-textarea
            v-model:value="formState.describe"
            placeholder="请输入学校简介"
            type="textarea"
            class="input-width"
            :maxlength="255"
            showCount
            :auto-size="{ minRows: 5, maxRows: 10 }"
          />
        </a-form-item>

        <a-form-item label="所在省市" name="area">
          <a-cascader
            v-model:value="formState.area"
            :field-names="{
              label: 'label',
              value: 'code',
              children: 'children',
            }"
            :options="options"
            placeholder="请选择区域"
            @change="change"
          />
        </a-form-item>
        <a-form-item label="详细地址" name="address">
          <a-textarea
            v-model:value="formState.address"
            placeholder="请输入详细地址"
            class="input-width"
            type="textarea"
            showCount
            :maxlength="100"
            :auto-size="{ minRows: 5, maxRows: 10 }"
          />
        </a-form-item>
        <a-form-item label="校区超级管理员姓名" name="superName">
          <a-input
            v-model:value="formState.superName"
            placeholder="请输入超级管理员姓名"
            :maxlength="10"
            class="input-width"
          />
        </a-form-item>
        <a-form-item label="校区超级管理员手机号" name="superPhone">
          <a-input
            v-model:value="formState.superPhone"
            placeholder="请输入超级管理员手机号"
            class="input-width"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 10, offset: 10 }" class="button">
          <a-button type="primary" @click="onSubmit"> 保存 </a-button>
          <a-button style="margin-left: 10px" @click="resetForm">
            重置
          </a-button>
        </a-form-item>
      </a-form>
      <!-- <a-result v-if="!finish" status="success" title="创建成功">
        <template #extra>
          <router-link to="/organization">
            <a-button key="console" type="primary"> 回到起始页 </a-button>
          </router-link>
          <a-button key="buy"> 查看详情 </a-button>
        </template>
      </a-result> -->
    </a-card>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent, UnwrapRef, ref, onActivated } from "vue";
import PageHeader from "@/components/page-header/index.vue";
import { createCourse, editCourse } from "@/api/course";
import { useStore } from "@/store";
import map from "@/assets/js/map";
import { ValidateErrorEntity } from "ant-design-vue/es/form/interface";
import { message } from "ant-design-vue";
import router from "@/router";

interface FormState {
  course_name: string;
  describe: string;
  superName: string;
  superPhone: number | undefined;
  address: string;
  area: string[];
}
interface Option {
  code: string;
  value: string;
  label: string;
  disabled?: boolean;
  children?: Option[];
  [key: string]: any;
}

const options: Option[] = map;
export default defineComponent({
  name: "AddOrganization",
  components: { PageHeader },
  setup() {
    const formRef = ref();
    const formState: UnwrapRef<FormState> = reactive({
      // schoolName: "",
      // schoolDesc: "",
      superName: "",
      superPhone: undefined,
      address: "",
      area: [],
      course_name: "",
      describe: "",
    });
    const rules = {
      course_name: [
        {
          required: true,
          message: "学校名不能为空",
          trigger: "blur",
        },
      ],
      describe: [
        {
          message: "请输入学校简介",
          trigger: "blur",
        },
      ],
      superName: [
        {
          message: "请输入校区管理员姓名",
          trigger: "blur",
        },
      ],
      address: [
        {
          message: "地址不能为空",
          trigger: "blur",
        },
      ],
      area: [
        {
          type: "array",
          message: "请选择所在省市",
          trigger: "blur",
        },
      ],
      type: [
        {
          type: "array",
          message: "Please select at least one activity type",
          trigger: "change",
        },
      ],
      resource: [
        {
          message: "请输入校区管理员姓名",
          trigger: "change",
        },
      ],
      superPhone: [
        {
          message: "请输入正确的校区管理员手机号",
          trigger: "blur",
          pattern: "^1[3456789]\\d{9}$",
        },
      ],
    };
    const resetForm = () => {
      // console.log(formRef.value)
      formRef.value.resetFields();
    };
    const change = (e) => {
      // console.log(e, formState.area);
    };
    // const finish = ref(true);
    onActivated(() => {
      // 被包裹组件被激活的状态下触发
    });
    const route = useRoute();
    const store = useStore();
    const { id } = route.query;
    const orgInfo = computed(() => {
      return store.getOrgInfo;
    });
    if (id) {
      formState.course_name = orgInfo.value.course_name;
      formState.describe = orgInfo.value.describe;
    }
    const onSubmit = () => {
      formRef.value.validate().then(() => {
        if (id) {
          let data = {
            name: formState.course_name,
            describe: formState.describe,
            type: "course",
          };
          editCourse(id, data).then(() => {
            formRef.value.resetFields();
            message.success("编辑成功");
            router.replace("/organization");
          });
        } else {
          // 调用创建接口
          let data = {
            name: formState.course_name,
            describe: formState.describe,
            type: "course",
          };
          createCourse(data)
            .then((res) => {
              formRef.value.resetFields();
              message.success("创建成功");
              router.replace("/organization");
            })
            .catch((err) => {
              // message.error(err.message);
            });
        }
      });
    };

    return {
      labelCol: {
        span: 10,
      },
      wrapperCol: {
        span: 7,
      },
      formState,
      onSubmit,
      rules,
      resetForm,
      formRef,
      options,
      change,
    };
  },
});
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
