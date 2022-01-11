import { defineStore } from 'pinia'
// import piniaPluginPersist from 'pinia-plugin-persist'

// const store = createPinia()
// store.use(piniaPluginPersist)

export const useStore = defineStore('store', {
  state: () => ({
    userInfo: {},
    token: ''
  }),
  getters: {
    getToken: (state) => {
      if (!state.token) {
        const getCookieToken = window.localStorage.getItem('token')
        if (!getCookieToken) {
          return null
        }
        state.token = getCookieToken
      }
      return state.token
    },
    getUserInfo: (state) => {
      return state.userInfo
    },
    clearToken(state) {
      state.token = ''
      // clearToken(state);
    },
    clearUserInfo(state) {
      state.userInfo = {}
    }
  },
  actions: {
    logout() {
      this.$patch({
        token: '',
        userInfo: {}
      })
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