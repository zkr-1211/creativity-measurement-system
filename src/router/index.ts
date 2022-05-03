import { createRouter, createWebHistory } from "vue-router";
// import { useStore } from '@/store'
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import routes from "./routes";
import { NextLoading } from "@/utils/loading";
import { getRootDomain } from "@/plugin/getRootDomain";
import util from "@/libs/util.js";
import VueCookies from "vue-cookies";
const router = createRouter({
  history: createWebHistory(),
  routes,
});
/**
 * 路由拦截
 * 权限验证
 */

const cookies = VueCookies;
NextLoading.start();
router.beforeEach((to, from, next) => {
  const query = Object.assign({}, to.query);
  if (query["token"]) {
    const token = query["token"];
    delete query["token"];
    router
      .replace({
        query,
      })
      .catch((e) => e);
    cookies.set(
      import.meta.env.VITE_APP_TOKEN_KEY,
      token,
      "7d",
      "/",
      getRootDomain()
    );
  }
  // 进度条
  // 验证当前路由所有的匹配中是否需要有登录验证的
  // if (to.matched.some(r => r.meta.auth)) {
  // 这里暂时将cookie里是否存有token作为验证是否登录的条件
  // 请根据自身业务需要修改
  const token =
    util.cookies.getAll()[import.meta.env.VITE_APP_TOKEN_KEY] ||
    "43b1dd78675cd6f9f7ff9b80dd54fe23a1aee0195200e842069980647242452f";
  next();
  if (token && token !== "undefined") {
    next();
  } else {
    // 没有登录的时候跳转到登录界面
    // 携带上登陆成功之后需要跳转的页面完整路径
    window.location.href = `${
      import.meta.env.VITE_APP_SSO_CENTER
    }?action=login&redirect_uri=${encodeURIComponent(window.location.href)}`;
    NProgress.done();
  }
  // } else {
  // 不需要身份校验 直接通过
  // next()
  // }
});

router.afterEach((to) => {
  NextLoading.done();
});
export default router;
