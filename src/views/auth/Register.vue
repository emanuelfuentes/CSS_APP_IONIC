<template>
<ion-content :fullscreen="true">
    <div class="container">
        <div class="row justify-content-center align-items-center" style="min-height: 100vh;">
            <div class="col-md-12 my-5" v-if="!processCompleted">
                <img src="/assets/img/css.png">

                <div class="form-group">
                    <ion-router-link class="d-block text-center" href="/login" color="medium">
                        ¿Ya tengo una cuenta?
                    </ion-router-link>
                </div>

                <div class="form-group">
                    <label class="text-muted"><i class="far fa-id-card"></i>&nbsp;Carnet</label>
                    <input v-model="user.carnet" type="text" class="form-control" placeholder="Ingrese su carnet">
                    <div class="text-danger">{{ validation.firstError('user.carnet') }}</div>
                </div>

                <div class="form-group">
                    <label class="text-muted"><i class="fas fa-align-center"></i>&nbsp;Nombres</label>
                    <input v-model="user.fname" type="text" class="form-control" placeholder="Ingrese sus nombres">
                    <div class="text-danger">{{ validation.firstError('user.fname') }}</div>
                </div>

                <div class="form-group">
                    <label class="text-muted"><i class="fas fa-align-center"></i>&nbsp;Apellidos</label>
                    <input v-model="user.lname" type="text" class="form-control" placeholder="Ingrese sus apellidos">
                    <div class="text-danger">{{ validation.firstError('user.lname') }}</div>
                </div>

                <div class="form-group">
                    <label class="text-muted"><i class="fas fa-female"></i><i class="fas fa-male"></i>&nbsp;Sexo/Género</label>
                    <ion-select placeholder="Seleccionar" v-model="user.gender">
                        <ion-select-option value="F">Femenino</ion-select-option>
                        <ion-select-option value="M">Masculino</ion-select-option>
                    </ion-select>
                    <div class="text-danger">{{ validation.firstError('user.gender') }}</div>
                </div>

                <div class="form-group">
                    <label class="text-muted"><i class="fas fa-university"></i>&nbsp;Facultad</label>
                    <ion-select
                        v-model="user.faculty"
                        placeholder="Seleccionar"
                        cancel-text="Cancelar">
                            <ion-select-option 
                                v-for="item in faculties"
                                :key="item.idFacultad"
                                :value="item.idFacultad">
                                    {{ item.nombre }}
                            </ion-select-option>
                    </ion-select>
                    <div class="text-danger">{{ validation.firstError('user.faculty') }}</div>
                </div>

                <div class="form-group">
                    <label class="text-muted"><i class="fas fa-graduation-cap"></i>&nbsp;Carrera</label>
                    <ion-select
                        placeholder="Seleccionar"
                        v-model="user.collegeCareer"
                        :disabled="isCollegeCareersDisabled"
                        cancel-text="Cancelar">
                            <ion-select-option
                                v-for="item in collegeCareers"
                                :key="item.idCarrera"
                                :value="item.idCarrera">
                                    {{ item.nombre }}
                            </ion-select-option>
                    </ion-select>
                    <div class="text-danger">{{ validation.firstError('user.collegeCareer') }}</div>
                </div>

                <div class="form-group mt-4">
                    <ion-button expand="block" @click="Register()">
                        CREAR CUENTA
                    </ion-button>
                    <br>
                    <ion-router-link class="d-block text-center" href="/forgot-password" color="medium">
                        ¿Olvidé mi contraseña?
                    </ion-router-link>
                </div>
            </div>
            <div class="col-md-12" v-else>
                <img src="/assets/img/success.svg" class="img-fluid">
                <h1 class="text-primary text-center font-weight-bolder">
                    Bienvenido Al Centro de Servicio Social
                </h1>
                <p class="text-muted text-center">
                    Se envió un correo a tu bandeja de entrada, favor verifica tu cuenta y completa el proceso de registro ahī.
                </p>
                <ion-button expand="block" href="/login">
                    REGRESAR
                </ion-button>
            </div>
        </div>
    </div>
</ion-content>
</template>


<script>
import SimpleVueValidator from 'simple-vue-validator';
const Validator = SimpleVueValidator.Validator;

export default {
    mixins: [SimpleVueValidator.mixin],
    data: function () {
        return {
            processCompleted: false,
            user: {
                carnet: '',
                fname: '',
                lname: '',
                gender: '',
                faculty: '',
                collegeCareer: '',
            },
            faculties: [],
            collegeCareers: []
        };
    },
    created() {
        this.getAllFaculties();
    },
    validators: {
        'user.carnet': function (value) {
            return Validator.value(value).required('El carnet es obligatorio.');
        },
        'user.fname': function (value) {
            return Validator.value(value)
                .required('El nombre es obligatorio.')
                .maxLength(150, 'El nombre no debe contener más de 150 caracteres.');
        },
        'user.lname': function (value) {
            return Validator.value(value)
                .required('El apellido es obligatorio.')
                .maxLength(150, 'El apellido no debe contener más de 150 caracteres.');
        },
        'user.gender': function (value) {
            return Validator.value(value).required('El sexo/género es obligatorio.');
        },
        'user.faculty': function (value) {
            return Validator.value(value).required('La facultad es obligatoria.');
        },
        'user.collegeCareer': function (value) {
            return Validator.value(value).required('El carrera es obligatoria.');
        },
    },
    methods: {
        async Register() {
            const validation = await this.$validate();
            if(validation) {
                let correo = this.user.carnet;
                if(!correo.includes('@')) {
                    correo = correo + '@uca.edu.sv';
                }

                const API_ENDOINT = this.getAPIEndpoint();
                const request = await fetch(API_ENDOINT + '/registro', {
                    method: "POST",
                    body: JSON.stringify({
                        correo: correo,
                        nombres: this.user.fname,
                        apellidos: this.user.lname,
                        genero: this.user.gender,
                        carrera: this.user.collegeCareer,
                    }),
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })

                if(request.status === 200) {
                    this.processCompleted = true;
                } else {
                    localStorage.removeItem('user');
                    this.showErrorToast('Ups! Algo salió mal.');
                }
            } else {
                this.FormValidationFailed();
            }
        },
        async getAllFaculties() {
            const API_ENDOINT = this.getAPIEndpoint();
            const request = await fetch(API_ENDOINT + `/getFacultades`);
            const data = await request.json();

            if(request.status === 200) {
                this.faculties = data;
            } else {
                this.showErrorToast('Algo salio mal al cargar las facultades.');
            }
        }
    },
    computed: {
        isCollegeCareersDisabled: function(){
            return this.collegeCareers.length > 0 ? false : true;
        }
    },
    watch: {
        'user.faculty': async function() {
            if(this.user.faculty != null && this.user.faculty != '') {
                const API_ENDOINT = this.getAPIEndpoint();
                const request = await fetch(API_ENDOINT + `/getCarrerasPorFacultad/${this.user.faculty}`);
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
