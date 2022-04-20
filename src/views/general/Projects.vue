<template>
<ion-page>
	<ion-content>
		<ion-toolbar>
			<ion-segment :value="view">

				<ion-segment-button value="all" @click="view = 'all';" v-if="userRol === 1">
					<ion-label>
						<small>Todos</small>
					</ion-label>
					<ion-icon :icon="rocket"></ion-icon>
				</ion-segment-button>

				<ion-segment-button value="history" @click="view = 'history';" v-if="userRol === 1">
					<ion-label><small>Historial</small></ion-label>
					<ion-icon :icon="timer"></ion-icon>
				</ion-segment-button>

				<ion-segment-button value="add" @click="view = 'add';" v-if="userRol === 1">
					<ion-label><small>Nuevo</small></ion-label>
					<ion-icon :icon="add"></ion-icon>
				</ion-segment-button>


				<ion-segment-button value="available" @click="view = 'available';" v-if="userRol === 2">
					<ion-label>
						<small>Disponibles</small>
					</ion-label>
					<ion-icon :icon="rocket"></ion-icon>
				</ion-segment-button>

				<ion-segment-button value="applied" @click="view = 'applied';" v-if="userRol === 2">
					<ion-label><small>Aplicados</small></ion-label>
					<ion-icon :icon="checkmarkDone"></ion-icon>
				</ion-segment-button>

			</ion-segment>
		</ion-toolbar>

		<!-- ADMIN -->
		<list-all-projects v-if="view === 'all'"/>
		<list-projects-history v-if="view === 'history'"/>
		<create-project v-if="view === 'add'"/>

		<!-- STUDENTS -->
		<list-available-projects 
			v-if="view === 'available'"
			:applyPermission="applyPermission"/>

		<list-applied-projects 
			v-if="view === 'applied'"
			:applyPermission="applyPermission"/>

	</ion-content>
</ion-page>
</template>

<script>
import ListAllProjects from '../../components/projects/ListAllProjects.vue';
import ListProjectsHistory from '../../components/projects/ListProjectsHistory.vue';
import CreateProject from '../../components/projects/CreateProject.vue';

import ListAvailableProjects from '../../components/projects/ListAvailableProjects.vue';
import ListAppliedProjects from '../../components/projects/ListAppliedProjects.vue';


import { rocket, checkmarkDone, logOut, timer, add } from 'ionicons/icons';

export default {
	components: {
		ListAllProjects,
		ListProjectsHistory,
		CreateProject,

		ListAvailableProjects,
		ListAppliedProjects,
	},
	data() {
		return {
			applyPermission: false,
			apiToken: '',
			userRol: '',
			view: '',
			rocket,
			checkmarkDone,
			logOut,
			timer,
			add
		}
	},
	created() {
		this.userRol = this.getUserRolId();
		this.apiToken = this.getApiToken();
		this.getApplyPermission();

		if(this.userRol === 1) {
			this.view = 'all';
		} else {
			this.view = 'available';
		}
	},
	methods: {
		async getApplyPermission() {
			const API_ENDOINT = this.getAPIEndpoint();
			const request = await fetch(API_ENDOINT + '/getPermisoAplicar', {
				headers: {
					"Content-type": "application/json; charset=UTF-8",
					'Authorization': 'Bearer ' + this.apiToken
				}
			});

			if(request.status === 200) {
				this.applyPermission = true;
			} else {
				this.showErrorToast('No puede aplicar a otro proyecto este día. Inténtelo mañana nuevamente.');
			}
		},

	},
}
</script>