import { provide, ref, nextTick } from 'vue'
export function useRouterReload() {
  const isRouterAlive = ref<boolean>(true)
  const onRefresh = () => {
    isRouterAlive.value = false
    nextTick(() => {
      isRouterAlive.value = true
    })
  }
  provide('reload', onRefresh)
  return {
    isRouterAlive
  }
}