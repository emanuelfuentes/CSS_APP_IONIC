<template>
<ion-page>
	<ion-header translucent>
		<ion-toolbar class="py-3">
			<img src="/assets/img/css_horizontal.jpg" style="margin-left: 20px;max-height:50px;text-align:center;" />

			<ion-buttons slot="end">
				<ion-button @click="signout()">
					<ion-icon color="primary" :icon="logOut"/>
				</ion-button>
			</ion-buttons>
		</ion-toolbar>
	</ion-header>

	<ion-content>
		<ion-tabs>
			<ion-router-outlet></ion-router-outlet>

			<ion-tab-bar class="py-2">
				<ion-tab-button tab="projects" href="/home/projects" v-if="userRol != ''">
					<ion-icon :icon="rocket" />
					<ion-label>Proyectos</ion-label>
				</ion-tab-button>

				<ion-tab-button tab="students" href="/home/students" v-if="userRol === 1">
					<ion-icon :icon="school"/>
					<ion-label>Estudiantes</ion-label>
				</ion-tab-button>

				<ion-tab-button tab="reminder" href="/home/reminder" v-if="userRol === 2">
					<ion-icon :icon="newspaper" />
					<ion-label>Recordatorio</ion-label>
				</ion-tab-button>

				<ion-tab-button tab="profile" href="/home/profile" v-if="userRol != ''">
					<ion-icon :icon="person" />
					<ion-label>Perfil</ion-label>
				</ion-tab-button>
			</ion-tab-bar>
		</ion-tabs>
	</ion-content>
</ion-page>
</template>

<script>
	import {
		ellipsisHorizontal,
		rocket,
		newspaper,
		person,
		school,
		logOut
	} from 'ionicons/icons';

	export default {
		name: 'Tabs',
		data() {
			return {
				userRol: '',
				ellipsisHorizontal,
				rocket,
				newspaper,
				person,
				school,
				logOut
			}
		},
		created() {
			this.userRol = this.getUserRolId();
		},
	}
</script>