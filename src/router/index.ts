import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

// AUTH PAGE COMPONENTS
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import ForgotPassword from '../views/auth/ForgotPassword.vue'
import ResetPassword from '../views/auth/ResetPassword.vue'

// HOME PAGE
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [

	{ path: '/:catchAll(.*)', redirect: 'login' },
	{ path: '', redirect: '/login' },

	// AUTH VIEWS
	{
		path: '/login',
		name: 'login',
		meta: { module: 'auth' },
		component: Login
	},
	{
		path: '/register',
		name: 'register',
		meta: { module: 'auth' },
		component: Register
	},
	{
		path: '/forgot-password',
		name: 'forgot-password',
		meta: { module: 'auth' },
		component: ForgotPassword
	},
	{
		path: '/reset-password',
		name: 'reset-password',
		meta: { module: 'auth' },
		component: ResetPassword
	},


	// GENERAL VIEWS
	{
		path: '/home',
		meta: { module: 'app' },
		component: Home,
		children: [
			{
				path: '',
				redirect: '/home/projects'
			},
			{
				path: 'projects',
				name: 'app',
				component: () => import('@/views/general/Projects.vue')
			},
			{
				path: 'students',
				component: () => import('@/views/general/Students.vue')
			},
			{
				path: 'reminder',
				component: () => import('@/views/general/Reminder.vue')
			},
			{
				path: 'profile',
				component: () => import('@/views/general/Profile.vue')
			}
		]
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})


router.beforeEach((to, from, next) => {
	const storageUser = localStorage.getItem('user');
	const user = storageUser ? JSON.parse(storageUser) : '';
	const module = to.meta.module;
	const userIsAuthenticated = user != '' ? true : false;

	switch(module) {
		case 'auth':
			if(userIsAuthenticated) {
				next({ name: 'app' });
			} else {
				next();
			}
			break;

		case 'app':
			if(userIsAuthenticated) {
				next();
			} else {
				next({ name: 'login' });
			}
			break;
	}
});

export default router;