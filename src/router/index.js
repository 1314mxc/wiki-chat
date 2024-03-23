import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/views/Index.vue'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
// import ImageGallery from '@/views/ImageGallery.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login', // 登陆
    name: 'login',
    component: Login
  },
  {
    path: '/index', // 知识库
    name: 'index',
    component: Index,
    children: [
      {
        path: '/home', // 知识库
        name: 'home',
        component: Home
      },
      {
        path: '/editor', // 编辑器, Editor.vue是编辑器页面，home中的那个板块只用来展示
        name: 'editor',
        hidden: true,
        // component: ImageGallery
        component: () => import('@/views/Editor.vue')
      },
      {
        path: '/imageGallery', // 聊天
        name: 'imageGallery',
        // component: ImageGallery
        component: () => import('@/views/ImageGallery.vue')
      },
      {
        path: '/message', // 消息
        name: 'message',
        // component: ImageGallery
        component: () => import('@/views/Message.vue')
      },
      {
        path: '/fileload', // 文件
        name: 'fileload',
        // component: ImageGallery
        component: () => import('@/views/Fileload.vue')
      },
      {
        path: '/setting', // 配置中心
        name: 'setting',
        // component: ImageGallery
        component: () => import('@/views/Setting.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router