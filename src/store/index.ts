import { defineStore } from "pinia";
import util from "@/libs/util.js";
// import { GetDetails } from "@/api/get.detail";
// import piniaPluginPersist from 'pinia-plugin-persist'
// const store = createPinia()
// store.use(piniaPluginPersist)
interface UserState {
  userInfo: object;
  token: string;
  collapsed: boolean;
  courseInfo: any;
}

export const useStore = defineStore("store", {
  state: (): UserState => ({
    userInfo: {},
    token: "b3fd3f5fcc697eef62e5313bf99c6b88872a5ee09a7824987d07c1577e5d7c40",
    collapsed: false,
    courseInfo: {},
  }),
  getters: {
    getToken(): string {
      if (!this.token) {
        const getCookieToken = window.localStorage.getItem("token");
        if (!getCookieToken) {
          return "";
        }
        this.token = getCookieToken;
      }
      return this.token;
    },
    getUserInfo(): object {
      return this.userInfo;
    },
    getCollapsed(): boolean {
      return this.collapsed;
    },
    getCourseInfo(): any {
      return this.courseInfo;
    },
  },
  actions: {
    logout() {
      this.$patch({
        token: "",
        userInfo: {},
      });
    },
    clearToken() {
      this.token = "";
    },
    clearUserInfo() {
      this.userInfo = {};
    },
    setToken(token: string | undefined) {
      this.token = token || "";
    },
    setUserInfo(info: object | null) {
      this.userInfo = info || {};
    },
    setCourseInfo(info: any | null) {
      this.courseInfo = info || {};
      console.log("courseInfo", this.courseInfo);
    },
    setCollapsed(collapsed: boolean) {
      this.collapsed = collapsed || false;
    },
    // 登入
    // login(user, password) {
    //   return apiLogin(user, password).then(res => {
    //     if (res.code === 200) {
    //       this.$patch({
    //         userInfo: res.data,
    //         token: res.token
    //       })
    //     }
    //     return res
    //   })
    // },

    /**
     * @param {string} user
     * @param {string} password
     */
    async login(token) {
      // console.log('token:', token)
      // 设置 cookie 一定要存 uuid 和 token 两个 cookie
      // 整个系统依赖这两个数据进行校验和存储
      // uuid 是用户身份唯一标识 用户注册的时候确定 并且不可改变 不可重复
      // token 代表用户当前登录状态 建议在网络请求中携带 token
      // 如有必要 token 需要定时更新，默认保存一天

      util.cookies.set("token", token);
      await GetDetails()
        .then(async (res) => {
          // console.log('console', res)
          util.cookies.set("uuid", res[0].id);
          this.userInfo = res[0];
          // 设置 vuex 用户信息
          // await dispatch(
          //   "d2admin/user/set",
          //   {
          //     name: res[0].realname + "老师",
          //   },
          //   {
          //     root: true,
          //   }
          // );
          // 用户登录后从持久化数据加载一系列的设置
        })
        .catch((err) => {
          console.log("err:", err);
          // reject(err)npm
        });
    },
  },
  // 开启数据缓存
  // persist: {
  //   enabled: true,
  //   strategies: [
  //     {
  //       key: 'my_user',
  //       storage: localStorage,
  //       paths: ['token', 'userInfo']
  //     }
  //   ]
  // }
});
// function clearToken(state) {
//   state.token = '';
//   // localStorage.removeItem('token');
//   Vue.$cookies.remove(`${import.meta.env.VUE_APP_SOURCE}.token`, '/', rootDomain);
// }
