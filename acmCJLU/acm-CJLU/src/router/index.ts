import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/Login.vue')
    },
    {
      path: '/',
      name: 'layout',
      component: () => import('../components/Layout.vue'),
      children: [
        {
          path:'/user',
          name:'user',
          component:() => import('../views/user.vue')
        },
        {
          path: '',
          name: 'home',
          component: () => import('../views/Home.vue')
        },
        {
          path: 'problem',
          name: 'problem',
          component: () => import('../views/Problem.vue')
        },
        {
          path: 'status',
          name: 'status',
          component: () => import('../views/Status.vue')
        },
        {
          path: 'ranking',
          name: 'ranking',
          component: () => import('../views/Ranking.vue')
        },
        {
          path: 'competition',
          name: 'competition',
          component: () => import('../views/Competiton.vue')
        },
        {
          path: 'helpissue',
          name: 'helpissue',
          component: () => import('../views/Help_issue.vue')
        },
        {
          path: 'helpusual',
          name: 'helpusual',
          component: () => import('../views/Help_usual.vue')
        },
        {
          path: 'problemdetail/:id',
          name: 'problemdetail',
          component: () => import('../views/problemdetail.vue')
        },
      {
        path: 'competitiondetail/:id',
        name: 'competitiondetail',
        component: () => import('../views/Competitondetail.vue')
      }
      ]
    }
  ],
})

export default router
