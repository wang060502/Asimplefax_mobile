import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'  // 导入 Pinia store

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/home/index.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: () => import('@/views/home/home.vue')
        },
        {
          path: '/classify',
          component: () => import('@/views/home/classify.vue')
        },
        {
          path: '/userinfo',
          component: () => import('@/views/home/user.vue')
        },
        {
          path:'/recharge',
          component:()=>import('@/views/home/recharge.vue')
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/login/index.vue')
    },
    {
      path:'/register',
      component:()=>import('@/views/login/register.vue')
    },
    {
      path:'/playpage/:id',
      component:()=>import('@/views/Playpage/index.vue')
    },
    {
      path:'/search',
      component:()=>import('@/views/home/search.vue')
    }
  ]
})

// 设置全局路由守卫
router.beforeEach((to, from, next) => {
  // 获取 Pinia 中的 authStore 和 token
  const authStore = useAuthStore()
  const token = authStore.getToken

  // 如果访问的是需要权限的页面，并且没有 token，则跳转到登录页
  if (to.path === '/userinfo' && !token) {
    return next('/login')  // 没有 token 跳转到登录页面
  }

  // 允许访问其他页面
  next()
})

export default router
