import { defineStore } from 'pinia'
// import piniaPluginPersist from 'pinia-plugin-persist'
// const store = createPinia()
// store.use(piniaPluginPersist)
interface UserState {
  userInfo: object;
  token: string;
  collapsed: boolean;
  courseInfo: any;
}

export const useStore = defineStore('store', {
  state: (): UserState => ({
    userInfo: {},
    token: 'b3fd3f5fcc697eef62e5313bf99c6b88872a5ee09a7824987d07c1577e5d7c40',
    collapsed: false,
    courseInfo: {}
  }),
  getters: {
    getToken(): string {
      if (!this.token) {
        const getCookieToken = window.localStorage.getItem('token')
        if (!getCookieToken) {
          return ''
        }
        this.token = getCookieToken
      }
      return this.token
    },
    getUserInfo(): object {
      return this.userInfo
    },
    getCollapsed(): boolean {
      return this.collapsed
    },
    getCourseInfo(): any {
      return this.courseInfo
    }
  },
  actions: {
    logout() {
      this.$patch({
        token: '',
        userInfo: {}
      })
    },
    clearToken() {
      this.token = ''
    },
    clearUserInfo() {
      this.userInfo = {}
    },
    setToken(token: string | undefined) {
      this.token = token || ''
    },
    setUserInfo(info: object | null) {
      this.userInfo = info || {}
    },
    setCourseInfo(info: any | null) {
      this.courseInfo = info || {}
      console.log('courseInfo', this.courseInfo);
    },
    setCollapsed(collapsed: boolean) {
      this.collapsed = collapsed || false
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
    // async login(user, password) {
    //   const token = await apiLogin(user, password);
    //   this.$patch({
    //     userInfo: userInfo,
    //     token,
    //   });
    // },
  }
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
})
// function clearToken(state) {
//   state.token = '';
//   // localStorage.removeItem('token');
//   Vue.$cookies.remove(`${process.env.VUE_APP_SOURCE}.token`, '/', rootDomain);
// }
