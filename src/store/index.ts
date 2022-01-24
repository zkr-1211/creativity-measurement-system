import { defineStore } from 'pinia'
// import piniaPluginPersist from 'pinia-plugin-persist'

// const store = createPinia()
// store.use(piniaPluginPersist)
interface UserState {
  userInfo: object;
  token: string;
  collapsed: boolean;
}

export const useStore = defineStore('store', {
  state: (): UserState => ({
    userInfo: {},
    token: '',
    collapsed: false
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
    setCollapsed(collapsed: boolean) {
      this.collapsed = collapsed || false
    }
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
