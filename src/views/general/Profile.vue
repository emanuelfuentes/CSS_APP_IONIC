<template>
<ion-page>
	<ion-content fullscreen>
		<img v-if="user.gender === 'M'" src="/assets/img/male-avatar.jpg" class="img-fluid d-block w-50 my-3 mx-auto">
		<img v-else src="/assets/img/female-avatar.jpg" class="img-fluid d-block w-50 my-3 mx-auto">

		<ion-card color="primary" class="mt-3">
			<ion-card-content>
				<ion-card-title color="primary" class="text-center font-weight-bolder">
					{{ user.fname }} {{ user.lname }}
				</ion-card-title>

				<div class="d-block text-center mt-2 font-weight-light">
					<ion-badge v-if="user.rol === 1" class="text-center mx-1" color="dark"><small>ADMIN</small></ion-badge>
					<ion-badge v-if="user.rol === 2" class="text-center mx-1" color="dark"><small>ESTUDIANTE</small></ion-badge>

					<ion-badge class="text-center mx-1" color="dark"><small>VERIFICADO</small></ion-badge>
					
				</div>
			</ion-card-content>
		</ion-card>

		<ion-card class="mt-3">
			<ion-card-content>

				<ion-item>
					<ion-label class="text-center">
						<p class="text-muted text-uppercase">
							{{ user.email }}
						</p>
						<small class="d-block text-muted font-weight-light text-uppercase">
							<i class="fas fa-envelope-open-text"></i>&nbsp;Correo
						</small>
					</ion-label>
				</ion-item>

				<ion-item v-if="user.rol === 2">
					<ion-label class="text-center">
						<p class="text-muted text-uppercase">
							{{ user.faculty }}
						</p>
						<small class="d-block text-muted font-weight-light text-uppercase">
							<i class="fas fa-university"></i>&nbsp;Facultad
						</small>
					</ion-label>
				</ion-item>


				<ion-item v-if="user.rol === 2">
					<ion-label class="text-center">
						<p class="text-muted text-uppercase">
							{{ user.collegeCareer }}
						</p>
						<small class="d-block text-muted font-weight-light text-uppercase">
							<i class="fas fa-graduation-cap"></i>&nbsp;Carrera
						</small>
					</ion-label>
				</ion-item>


				<ion-item v-if="user.rol === 2">
					<ion-label class="text-center">
						<p class="text-muted text-uppercase">
							{{ user.profile }}
						</p>
						<small class="d-block text-muted font-weight-light text-uppercase">
							<i class="far fa-id-badge"></i>&nbsp;Perfil
						</small>
					</ion-label>
				</ion-item>

				<ion-button expand="block" color="primary" @click="signout()">
					<ion-icon name="bag-add-outline"></ion-icon>CERRAR SESIÓN
				</ion-button>

			</ion-card-content>
		</ion-card>
	</ion-content>
</ion-page>
</template>

<script>
	export default {
		data: function () {
			return {
				user: {
					fname: '',
					lname: '',
					gender: 'F',
					rol : '',
					email: '',
					faculty: '',
					collegeCareer: '',
					profile: ''
				}
			}
		},
		created() {
			this.setUser();
		},
		methods: {
			async setUser() {
				const data = await this.getAuthenticatedUser(); 

				if(data.user) {
					this.user.fname = data.user.nombres;
					this.user.lname = data.user.apellidos;
					this.user.gender = data.user.genero;
					this.user.rol = data.user.rol.idRol;
					this.user.email = data.user.correo;
					this.user.profile = data.user.perfil ? data.user.perfil.descripcion : '';
					this.user.faculty = data.user.carrera ? data.user.carrera.facultad.nombre : '';
					this.user.collegeCareer = data.user.carrera ? data.user.carrera.nombre : '';
				}
			}
		}
	}
</script>