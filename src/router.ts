import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './pages/HomePage.vue';
import AboutPage from './pages/AboutPage.vue';
import ConfiguratorPage from './pages/ConfiguratorPage.vue';


export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomePage,
        },
        {
            path: '/about',
            name: 'About',
            component: AboutPage,
        },
        {
            path: '/configurator',
            name: 'Configurator',
            component: ConfiguratorPage,
        }
    ]
})
