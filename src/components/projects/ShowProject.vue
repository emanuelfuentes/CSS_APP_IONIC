<template>
	<ion-card class="my-3">
		<ion-item color="primary">
			<ion-label>
				<ion-card-subtitle style="color:white;">
					{{ project.name }}
				</ion-card-subtitle>
			</ion-label>

			<ion-buttons slot="end">
				<ion-button v-if="project.status === 1" @click="presentActionSheet">
					<ion-icon :icon="ellipsisHorizontal"></ion-icon>
				</ion-button>
			</ion-buttons>
		</ion-item>
		<ion-card-content>
			<p>
				<ion-badge color="primary" class="mr-1">
					<small>{{ project.spaces_act }}/{{ project.spaces }} CUPOS</small>
				</ion-badge>
				<ion-badge :color="project.status === 1 ? 'primary' : 'medium'" class="mr-1">
					<small>{{ project.status === 1 ? 'ACTIVO' : 'INACTIVO'}}</small>
				</ion-badge>
			</p>
			<p>
				{{ project.description }}
			</p>
			<ion-button @click="openModal" color="primary" fill="clear" size="small" class="mt-2" expand="block">
				Ver Detalles
				<ion-icon :icon="chevronDown"></ion-icon>
			</ion-button>
		</ion-card-content>
	</ion-card>
</template>

<script>
	import ShowProjectDetails from './ShowProjectDetails.vue';
	import {
		actionSheetController,
		alertController,
		modalController
	} from '@ionic/vue';
	import {
		ellipsisHorizontal,
		personRemove,
		personAdd,
		close,
		create,
		heart,
		addCircle,
		trash,
		chevronDown
	} from 'ionicons/icons';

	export default {
		props: ['projectData', 'applyPermission', 'showUnapply'],
		data: function () {
			return {
				userId: '',
				userRol: '',
				apiToken: '',
				project: {
					id: '',
					name: '',
					status: '',
					counterpart: '',
					spaces: '',
					// eslint-disable-next-line
					spaces_act: '',
					description: '',
					owner: '',
					startDate: '',
					endDate: '',
					schedule: '',
					hoursType: '',
					ownerEmail: '',
				},
				projectOptions: [],
				ellipsisHorizontal,
				close,
				personRemove,
				personAdd,
				heart,
				create,
				addCircle,
				trash,
				chevronDown,
			};
		},
		async created() {
			this.setProjectData();
			this.apiToken = this.getApiToken();
			this.userId = this.getUserId();
			this.userRol = this.getUserRolId();
		},
		methods: {
			setProjectData() {
				this.project.id = this.projectData.idProyecto;
				this.project.name = this.projectData.nombre;
				this.project.status = this.projectData.estado;
				this.project.counterpart = this.projectData.contraparte;
				this.project.spaces = this.projectData.cupos;
				// eslint-disable-next-line
				this.project.spaces_act = this.projectData.cupos_act;
				this.project.description = this.projectData.descripcion;
				this.project.owner = this.projectData.encargado;
				this.project.startDate = this.projectData.fecha_inicio;
				this.project.endDate = this.projectData.fecha_fin;
				this.project.schedule = this.projectData.horario;
				this.project.hoursType = this.projectData.tipo_horas;
				this.project.ownerEmail = this.projectData.correo_encargado;
			},
			async presentActionSheet() {

				if (this.userRol === 1) {
					this.projectOptions = [{
							text: this.project.status === 1 ? 'Desactivar' : 'Activar',
							icon: trash,
							role: 'changeStatus',
						},
						{
							text: 'Editar',
							icon: create,
							role: 'details',
						},
						{
							text: 'Agregar Alumno',
							icon: addCircle,
							role: 'addStudent',
						},
						{
							text: 'Cancelar',
							icon: close,
							role: 'cancel'
						},
					];
				} else {

					if (this.showUnapply) {
						this.projectOptions = [{
								text: 'Desaplicar',
								icon: personRemove,
								role: 'unapply',
							},
							{
								text: 'Ver Detalles',
								icon: create,
								role: 'details',
							},
							{
								text: 'Cancelar',
								icon: close,
								role: 'cancel'
							},
						];
					} else {
						this.projectOptions = [{
								text: 'Aplicar',
								icon: personAdd,
								role: 'apply'
							},
							{
								text: 'Ver Detalles',
								icon: create,
								role: 'details',
							},
							{
								text: 'Cancelar',
								icon: close,
								role: 'cancel'
							},
						];
					}

				}

				const actionSheet = await actionSheetController
					.create({
						header: 'Opciones de Proyecto',
						buttons: this.projectOptions,
					});
				await actionSheet.present();

				const {
					role
				} = await actionSheet.onDidDismiss();

				switch (role) {
					case 'changeStatus':
						this.changeProjectStatus();
						break;
					case 'details':
						this.openModal();
						break;

					case 'addStudent':
						this.addStudent();
						break;

					case 'apply':
						this.applyToProject();
						break;

					case 'unapply':
						this.unapplyToProject();
						break;
				}
			},
			async changeProjectStatus() {
				const estado = !this.project.status;
				const API_ENDOINT = this.getAPIEndpoint();
				const request = await fetch(API_ENDOINT + '/admin/updateEstadoProyecto', {
					method: "PUT",
					body: JSON.stringify({
						idProyecto: this.project.id,
						estado: estado
					}),
					headers: {
						"Content-type": "application/json; charset=UTF-8",
						'Authorization': 'Bearer ' + this.apiToken
					}
				})

				if (request.status === 200) {
					this.showSuccessToast('Proyecto actualizado exitosamente.');
					this.$emit('dataUpdated');
					// location.reload();
				} else {
					this.showErrorToast('Algo salió mal al actualizar el proyecto.');
				}
			},
			async addStudent() {
				const action = await alertController
					.create({
						header: 'Agregar alumno',
						inputs: [ { name: 'carnet', type: 'number', placeholder: 'Ingrese carnet del alumno' } ],
						buttons: [
							{ text: 'Cancelar', role: 'cancel', cssClass: 'secondary' },
							{ 
								text: 'Ok',
								role: 'add',
								handler: (data) => {
									this.addStudentToProject(data.carnet);
								},
							},
						],
					});
				return action.present();
			},
			async addStudentToProject(carnet) {
				const API_ENDOINT = this.getAPIEndpoint();
				const request = await fetch(API_ENDOINT + `/admin/postApplyStudent`, {
					method: "POST",
					body: JSON.stringify({
						idProyecto: this.project.id,
						carnet: carnet,
						estado: 1
					}),
					headers: {
						"Content-type": "application/json; charset=UTF-8",
						'Authorization': 'Bearer ' + this.apiToken
					}
				})

				if (request.status === 200) {
					this.showSuccessToast('Alumno agregado exitosamente.');
					this.$emit('dataUpdated');
					location.reload();
				} else {
					this.showErrorToast('Algo salió mal al agregar el alumno.');
				}
			},
			async applyToProject() {
				if (this.applyPermission) {
					const API_ENDOINT = this.getAPIEndpoint();
					const request = await fetch(API_ENDOINT + `/postAplicarProyecto`, {
						method: "POST",
						body: JSON.stringify({
							idProyecto: this.project.id,
							idUser: this.userId,
							estado: 0
						}),
						headers: {
							"Content-type": "application/json; charset=UTF-8",
							'Authorization': 'Bearer ' + this.apiToken
						}
					})

					if (request.status === 200) {
						this.showSuccessToast('Solicitud enviada exitosamente.');
						this.$emit('dataUpdated');
						// location.reload();
					} else {
						this.showErrorToast('Algo salió mal al enviar la solicitud.');
					}
				} else {
					this.showErrorToast('No puede aplicar a otro proyecto este día. Inténtelo mañana nuevamente.');
				}
			},
			async unapplyToProject() {
				const API_ENDOINT = this.getAPIEndpoint();
				const request = await fetch(API_ENDOINT + `/postDesaplicarProyecto`, {
					method: "POST",
					body: JSON.stringify({
						idProyecto: this.project.id,
						idUser: this.userId,
						estado: 0
					}),
					headers: {
						"Content-type": "application/json; charset=UTF-8",
						'Authorization': 'Bearer ' + this.apiToken
					}
				})

				if (request.status === 200) {
					this.showSuccessToast('Solicitud enviada exitosamente.');
					this.$emit('dataUpdated');
					location.reload();
				} else {
					this.showErrorToast('Algo salió mal al enviar la solicitud.');
				}
			},
			async openModal() {
				const modal = await modalController
					.create({
						component: ShowProjectDetails,
						componentProps: {
							projectData: this.projectData
						},
					});
				modal.onDidDismiss().then(() => {
					this.$emit('dataUpdated');
				});
				return await modal.present();
			},
		}
	}
</script>