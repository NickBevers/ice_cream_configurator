import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './pages/HomePage.vue';
import ConfiguratorPage from './pages/ConfiguratorPage.vue';
import ConfirmationPageVue from './pages/ConfirmationPage.vue';


export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomePage,
        },
        {
            path: '/configurator',
            name: 'Configurator',
            component: ConfiguratorPage,
        },
        {
            path: '/confirmation',
            name: 'Confirmation',
            component: ConfirmationPageVue,
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/',
        }
    ]
})
