<template>
    <ion-header translucent>
        <ion-toolbar color="primary">
            <ion-title><small>PERFIL DE ALUMNO</small></ion-title>
            <ion-buttons slot="end">
                <ion-button @click="closeModal()">CERRAR&nbsp;<i class="fas fa-chevron-down"></i></ion-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
        <ion-card color="primary" class="my-3">
            <ion-card-content>
                <ion-card-title color="primary" class="text-center">
                    {{ student.fname }} {{ student.lname }}
                </ion-card-title>

                <ion-card-subtitle color="medium" class="text-center">
                    {{ student.email }}
                </ion-card-subtitle>
            </ion-card-content>
        </ion-card>

        <div class="form-group">
            <label class="text-muted font-weight-bold text-uppercase"><i class="fas fa-envelope-open-text"></i>&nbsp;Correo</label>
            <input v-model="student.email" type="text" class="form-control" placeholder="0980980@uca.edu.sv">
            <div class="text-danger">{{ validation.firstError('student.email') }}</div>
        </div>

        <div class="form-group">
            <label class="text-muted"><i class="fas fa-university"></i>&nbsp;Facultad</label>
            <ion-select
                v-model="student.faculty"
                :value="student.faculty"
                placeholder="Seleccionar"
                cancel-text="Cancelar">
                    <ion-select-option 
                        v-for="item in faculties"
                        :key="item.idFacultad"
                        :value="item.idFacultad">
                            {{ item.nombre }}
                    </ion-select-option>
            </ion-select>
            <div class="text-danger">{{ validation.firstError('student.faculty') }}</div>
        </div>

        <div class="form-group">
            <label class="text-muted"><i class="fas fa-graduation-cap"></i>&nbsp;Carrera</label>
            <ion-select
                placeholder="Seleccionar"
                v-model="student.collegeCareer"
                :value="student.collegeCareer"
                cancel-text="Cancelar">
                    <ion-select-option
                        v-for="item in collegeCareers"
                        :key="item.idCarrera"
                        :value="item.idCarrera">                        
                            {{ item.nombre }}
                    </ion-select-option>
            </ion-select>
            <div class="text-danger">{{ validation.firstError('student.collegeCareer') }}</div>
        </div>

        <div class="form-group">
            <label class="text-muted"><i class="far fa-id-badge"></i>&nbsp;Perfil</label>
            <ion-select
                placeholder="Seleccionar"
                v-model="student.profile"
                :value="student.profile"
                cancel-text="Cancelar">
                    <ion-select-option
                        v-for="item in profiles"
                        :key="item.idPerfil"
                        :value="item.idPerfil">
                            {{ item.descripcion }}
                    </ion-select-option>
            </ion-select>
            <div class="text-danger">{{ validation.firstError('student.profile') }}</div>
        </div>

        <div class="form-group mt-4">
            <ion-button expand="block" color="primary" @click="updateStudent()">
                ACTUALIZAR
            </ion-button>
        </div>

        <div class="form-group">
            <ion-button expand="block" color="dark" @click="closeModal()">
                REGRESAR
            </ion-button>
        </div>
   </ion-content>
</template>

<script>
import SimpleVueValidator from 'simple-vue-validator';
const Validator = SimpleVueValidator.Validator;
import { modalController } from "@ionic/vue";

export default {
    mixins: [SimpleVueValidator.mixin],
    props: ['studentData'],
    data() {
        return {
            apiToken: '',
            student: {
                idUser: '',
                fname: '',
                lname: '',
                gender: 'F',
                rol : '',
                email: '',
                faculty: '',
                collegeCareer: '',
                profile: ''
            },
            faculties: [],
            collegeCareers: [],
            profiles: [],
        }
    },
    validators: {
        'student.email': function (value) {
            return Validator.value(value)
                .required('El carnet es obligatorio.')
                .maxLength(100, 'El carnet no debe contener más de 100 caracteres.');
        },
        'student.faculty': function (value) {
            return Validator.value(value).required('El campo facultad es obligatorio.');
        },
        'student.collegeCareer': function (value) {
            return Validator.value(value).required('El campo carrera es obligatorio.');
        },
        'student.profile': function (value) {
            return Validator.value(value).required('El campo perfil es obligatorio.');
        },
    },
    async created() {
        this.apiToken = this.getApiToken();
        await this.getAllFaculties();
        await this.getProfiles();
        this.setStudentData();
    },
    methods: {
        async getAllFaculties() {
            const API_ENDOINT = this.getAPIEndpoint();
            const request = await fetch(API_ENDOINT + '/getFacultades');
            const data = await request.json();

            if(request.status === 200) {
                this.faculties = data;
            } else {
                this.showErrorToast('Algo salio mal al cargar las facultades.');
            }
        },
        async getProfiles() {
            const API_ENDOINT = this.getAPIEndpoint();
            const request = await fetch(API_ENDOINT + '/admin/getPerfiles', {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Authorization': 'Bearer ' + this.apiToken
                }
            });
            const data = await request.json();

            if(request.status === 200) {
                this.profiles = data;
            } else {
                this.showErrorToast('Algo salió mal al cargar los perfiles.');
            }
        },
        async updateStudent() {
            const validation = await this.$validate();
            if(validation) {
                const API_ENDOINT = this.getAPIEndpoint();
                const request = await fetch(API_ENDOINT + `/admin/updateEstudiante`, {
                    method: "PUT",
                    body: JSON.stringify({
                        idUsuario: this.student.idUser,
                        correo: this.student.email,
                        facultad: this.student.faculty,
                        carrera: this.student.collegeCareer,
                        perfil: this.student.profile,
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        'Authorization': 'Bearer ' + this.apiToken
                    }
                })

                if(request.status === 200) {
                    this.showSuccessToast('Alumno actualizado exitosamente.');
                    location.reload();
                } else {
                    this.showErrorToast('Algo salió mal al actualizar el alumno.');
                }
            } else {
                this.FormValidationFailed();
            }
        },
        async closeModal() {
           await modalController.dismiss();
        },
        setStudentData() {
            if(this.studentData) {
                this.student.idUser = this.studentData.idUser;
                this.student.fname = this.studentData.nombres;
                this.student.lname = this.studentData.apellidos;
                this.student.gender = this.studentData.genero;
                this.student.rol = this.studentData.rol.idRol;
                this.student.email = this.studentData.correo;
                this.student.profile = this.studentData.perfil ? this.studentData.perfil.idPerfil : '';
                this.student.faculty = this.studentData.carrera ? this.studentData.carrera.facultad.idFacultad : '';
                this.student.collegeCareer = this.studentData.carrera ? this.studentData.carrera.idCarrera : '';
            }
        },
    },
    watch: {
        'student.faculty': async function() {
            if(this.student.faculty != null && this.student.faculty != '') {
                const API_ENDOINT = this.getAPIEndpoint();
                const request = await fetch(API_ENDOINT + `/getCarrerasPorFacultad/${this.student.faculty}`);
                const data = await request.json();

                if(request.status === 200) {
                    this.collegeCareers = data;
                } else {
                    this.showErrorToast('Algo salio mal al obtener las carreras.');
                }
            } else {
                this.collegeCareers = [];
            }
        }
    },
}
</script>