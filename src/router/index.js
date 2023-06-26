import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import News_read from '../views/newspages/News_read.vue'
import Admin from '../views/newspages/Admin.vue'
import News_add from '../views/newspages/News_add.vue'
import Topic_add from '../views/newspages/Topic_add.vue'
import Topic_modify from '../views/newspages/Topic_modify.vue'
import News_modify from '../views/newspages/News_modify.vue'
import User_Role from '../views/newspages/User_Role.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/newsRead',
      name: 'newsRead',
      component: News_read
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/addNews',
      name: 'addNews',
      component: News_add
    },
    {
      path: '/addTopic',
      name: 'addTopic',
      component: Topic_add
    },
    {
      path: '/editTopic',
      name: 'editTopic',
      component: Topic_modify
    },
    {
      path: '/editNews',
      name: 'editNews',
      component: News_modify
    },{
      path: '/editUsers',
      name: 'editUsers',
      component: User_Role
    }
  ]
})

export default router
