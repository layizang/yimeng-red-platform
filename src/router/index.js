import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/Layout.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      { path: 'home', name: 'home', component: () => import('../views/Home.vue'), meta: { title: '首页' } },
      { path: 'sandbox', name: 'sandbox', component: () => import('../views/Sandbox.vue'), meta: { title: '战役沙盘' } },
      { path: 'personage', name: 'personage', component: () => import('../views/Personage.vue'), meta: { title: '人物志' } },
      { path: 'ai', name: 'ai', component: () => import('../views/AiAssistant.vue'), meta: { title: 'AI 讲解员' } },
      { path: 'panorama', name: 'panorama', component: () => import('../views/Panorama.vue'), meta: { title: '全景云游' } },
      { path: 'course', name: 'course', component: () => import('../views/Course.vue'), meta: { title: '红色课堂' } }
    ]
  },
  { path: '/login', name: 'login', component: () => import('../views/Login.vue'), meta: { title: '登录' } },
  { path: '/:pathMatch(.*)*', redirect: '/home' }
]

const router = createRouter({
  // 必须跟随 Vite 的 base，否则部署到 GitHub Pages 子路径后首屏路由会跳飞
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.afterEach((to) => {
  document.title = to.meta.title
    ? `${to.meta.title} · 孟良崮战役红色信息平台`
    : '孟良崮战役红色信息平台'
})

export default router
