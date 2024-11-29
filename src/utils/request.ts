import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import router from '@/router';
import { useAuthStore } from '@/stores/auth' // 导入 Pinia store

// 创建 Axios 实例
const instance: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 7000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 获取 token
    const authStore = useAuthStore()
    const token = authStore.getToken // 从 Pinia 获取 token

    if (token) {
      // 如果 token 存在，则添加
      config.headers['token'] = `${token}`
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 在这里移除了隐藏加载提示的代码
    return response.data;
  },
  (error) => {
    // 处理错误
    if (error.code === 'ECONNABORTED') {
      console.error('请求超时，请重试！');
      return Promise.reject(error);
    }

    if (error.response && error.response.status === 401) {
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

export default instance;
