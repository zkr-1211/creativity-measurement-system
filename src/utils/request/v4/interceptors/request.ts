import { AxiosRequestConfig } from "axios";
import { useStore } from "@/store";
export default (axios) => {
  axios.interceptors.request.use(
    (config) => {
      switch (config.url) {
        case "/api/four_item":
          config.baseURL = "";
          break;
        case "/api/get_list":
          config.baseURL = "";
          break;
        case "/api/tendency_run":
          config.baseURL = "";
          break;
        case "/api/table":
          config.baseURL = "";
          break;
      }
      const store = useStore();
      const token = store.getToken;
      const appSource = import.meta.env.VITE_APP_SOURCE || "shu.ke";
      if (appSource) {
        config.headers["app-source"] = appSource;
      }
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      console.log(`请求出现错误: ${error}`);
      throw error;
    }
  );
};
