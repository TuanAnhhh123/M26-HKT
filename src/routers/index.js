
import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';
import ManagerUser from '@/views/ManagerUser.vue';
import ManagerProduct from '@/views/ManagerProduct.vue'
const routes =[
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
      },
      {
        path: '/manager-user',
        name: 'ManagerUser',
        component: ManagerUser,
      },
      {
        path: '/manager-product',
        name: 'ManagerProduct',
        component: ManagerProduct,
      },
      {
        path: '/:pathMatch(.*)*',
        redirect: '/',
      },
];
const router = createRouter({
    history:createWebHistory(),
    routes,
});

export default router;