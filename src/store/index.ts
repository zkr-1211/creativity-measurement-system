import { defineStore } from "pinia";
import util from "@/libs/util.js";
import { GetDetails } from "@/api/get.detail";
// import piniaPluginPersist from 'pinia-plugin-persist'
// const store = createPinia()
// store.use(piniaPluginPersist)
interface UserState {
  userInfo: object;
  token: string;
  collapsed: boolean;
  courseInfo: any;
  orgInfo: any;
  studentInfo: any;
  teacherInfo: any;
}

export const useStore = defineStore("store", {
  state: (): UserState => ({
    userInfo: {},
    token: "",
    collapsed: false,
    courseInfo: {},
    orgInfo: {},
    studentInfo: {},
    teacherInfo: {},
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
    getOrgInfo(): any {
      return this.orgInfo;
    },
    getStudentInfo(): any {
      return this.studentInfo;
    },
    getTeacherInfo(): any {
      return this.teacherInfo;
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
    },
    setOrgInfo(info: any | null) {
      this.orgInfo = info || {};
    },
    setStudentInfo(info: any | null) {
      this.studentInfo = info || {};
    },
    setTeacherInfo(info: any | null) {
      this.teacherInfo = info || {};
    },
    setCollapsed(collapsed: boolean) {
      this.collapsed = collapsed || false;
    },
    // ??????
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
    // async login(token) {
    //   // console.log('token:', token)
    //   // ?????? cookie ???????????? uuid ??? token ?????? cookie
    //   // ??????????????????????????????????????????????????????
    //   // uuid ??????????????????????????? ??????????????????????????? ?????????????????? ????????????
    //   // token ?????????????????????????????? ?????????????????????????????? token
    //   // ???????????? token ???????????????????????????????????????

    //   util.cookies.set("token", token);
    //   await GetDetails()
    //     .then(async (res) => {
    //       // console.log('console', res)
    //       util.cookies.set("uuid", res[0].id);
    //       this.userInfo = res[0];
    //       // ?????? vuex ????????????
    //       // await dispatch(
    //       //   "d2admin/user/set",
    //       //   {
    //       //     name: res[0].realname + "??????",
    //       //   },
    //       //   {
    //       //     root: true,
    //       //   }
    //       // );
    //       // ?????????????????????????????????????????????????????????
    //     })
    //     .catch((err) => {
    //       console.log("err:", err);
    //       // reject(err)npm
    //     });
    // },
  },
  // ??????????????????
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
