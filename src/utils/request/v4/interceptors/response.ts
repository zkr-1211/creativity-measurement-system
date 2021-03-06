import {
  AuthException,
  PermissionException,
  SystemException,
  UserException,
} from "@/utils/request/exception";
import { AxiosResponse } from "axios";
import { useRouter } from "vue-router";
import { useStore } from "@/store";
import { message } from "ant-design-vue";
async function errorHandler(res) {
  if (!res.status) {
    throw new Error("网络连接失败，请稍后再试");
  }
  switch (res.status) {
    case 401: {
      if (res.data?.errcode === "AUTH_REQUIRE_REALNAME_VERIFY") {
        throw new UserException(
          "您还未完成身份认证，请现在完成认证后再次尝试",
          res.data?.errcode
        );
      }
      const store = useStore();
      if (!store.getToken) {
        throw new AuthException("登录过期，请重新登录", res);
      }
      store.logout();
      const router = useRouter();

      // 当前路由不在主页时, 弹出过期提示框
      // console.log(router)

      if (router.currentRoute?.value?.name !== "HomePage") {
        await message.error("登录过期，请重新登录");
        router
          .replace({
            name: "HomePage",
          })
          .catch((e) => e);
      }
      throw new AuthException("登录过期，请重新登录", res);
    }
    case 400: {
      throw new UserException(
        res.data?.message || "发生未知错误，请稍后再试",
        res.data?.errcode
      );
    }
    case 403: {
      throw new PermissionException(
        res.data?.message || "您没有权限访问该页面",
        res.data?.errcode
      );
    }
    case 413: {
      throw new UserException("传输内容超过最大限制", res.data.errcode);
    }
    case 502:
    case 404: {
      throw new SystemException(
        `服务器开小差了，请稍后再试[${res.status}]`,
        res.data?.errcode
      );
    }
    default: {
      throw new SystemException("发生未知错误，请稍后再试", res.data.errcode);
    }
  }
}

export default (axios) => {
  axios.interceptors.response.use(
    async (res: AxiosResponse) => {
      if (res?.status >= 200 && res?.status < 300) {
        return res?.data || {};
      } else {
        await errorHandler(res);
      }
    },
    async (error) => {
      if (!error?.response) {
        throw new Error("网络连接失败，请稍后再试");
      }
      await errorHandler(error.response);
    }
  );
};
