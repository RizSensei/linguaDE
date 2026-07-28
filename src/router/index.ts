import { createRouter, createWebHistory } from 'vue-router';
import Hero from '../views/Hero.vue';
import ThemeDetail from '../components/ThemeDetail.vue';
import NotFound from '../components/NotFound.vue';
import { hasThemeRoute } from '../services/dataService';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Hero', component: Hero },
    {
      path: '/:themePath',
      name: 'ThemeDetail',
      component: ThemeDetail,
      beforeEnter: (to) => hasThemeRoute(to.path) || { name: 'NotFound' },
    },
    { path: '/404', name: 'NotFound', component: NotFound },
    { path: '/:pathMatch(.*)*', redirect: { name: 'NotFound' } },
  ],
});

export default router;
