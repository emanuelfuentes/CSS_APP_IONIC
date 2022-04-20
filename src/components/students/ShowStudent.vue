<template>
    <ion-item @click="openModal()">
        <ion-avatar slot="start">
            <img v-if="student.gender === 'M'" src="/assets/img/male-avatar.jpg" class="img-fluid">
            <img v-else src="/assets/img/female-avatar.jpg" class="img-fluid">
        </ion-avatar>

        <ion-label>
            <h2 class="text-uppercase">{{ student.fname }} {{ student.lname }}</h2>
            <p>
                {{ student.email }}
                <br>
                <small class="text-muted">{{ student.collegeCareer }} - {{ student.faculty }}</small>
            </p>
        </ion-label>

        <ion-buttons>
            <ion-button>
                <ion-icon :icon="chevronDown"></ion-icon>
            </ion-button>
        </ion-buttons>
    </ion-item>
</template>


<script>
    import { modalController } from '@ionic/vue';
    import ShowStudentDetails from './ShowStudentDetails.vue'
    import { chevronDown } from 'ionicons/icons';

    export default {
        props: ['studentData'],
        data() {
            return {
                student: {
					fname: '',
					lname: '',
					gender: '',
					email: '',
					faculty: '',
					collegeCareer: '',
					profile: ''
				},
                chevronDown,
            }
        },
        created() {
            this.setStudentData();
		},
        methods: {
            async openModal() {
                const modal = await modalController
                    .create({
                        component: ShowStudentDetails,
                        componentProps: {
                            studentData: this.studentData
                        },
                    })
                return modal.present();
            },
            setStudentData() {
                if(this.studentData) {
                    this.student.fname = this.studentData.nombres;
                    this.student.lname = this.studentData.apellidos;
                    this.student.gender = this.studentData.genero;
                    this.student.rol = this.studentData.rol ? this.studentData.rol.idRol : '';
                    this.student.email = this.studentData.correo;

                    this.student.profile = this.studentData.perfil ? this.studentData.perfil.descripcion : '';
                    this.student.faculty = this.studentData.carrera ? this.studentData.carrera.facultad.nombre : '';
                    this.student.collegeCareer = this.studentData.carrera ? this.studentData.carrera.nombre : '';
                }
			},
        }
    }
</script>