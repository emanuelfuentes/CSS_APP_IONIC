<template>
    <ion-header translucent>
        <ion-toolbar color="primary">
            <ion-title><small>PROYECTO</small></ion-title>
            <ion-buttons slot="end">
                <ion-button @click="closeModal()">CERRAR&nbsp;<i class="fas fa-chevron-down"></i></ion-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>

    <ion-content>

        <ion-segment :value="view">

            <ion-segment-button value="general" @click="view = 'general';">
                <ion-label>
                    <small>General</small>
                </ion-label>
                <ion-icon :icon="list"></ion-icon>
            </ion-segment-button>

            <ion-segment-button value="students" @click="view = 'students';">
                <ion-label><small>Estudiantes</small></ion-label>
                <ion-icon :icon="people"></ion-icon>
            </ion-segment-button>
        </ion-segment>

        <ion-card class="my-3" color="light" v-if="view === 'general'">
            <ion-card-content>
                <div class="form-group py-3 border-top border-bottom">
                    <h2 class="text-center text-muted font-weight-bold">
                        Información del Proyecto
                    </h2>
                </div>

                <div class="form-group">
                    <label class="text-muted font-weight-bold text-uppercase"><i
                            class="fas fa-align-center"></i>&nbsp;Nombre</label>
                    <input v-model="project.name" type="text" class="form-control" placeholder="Nombre del Proyecto"
                        :disabled="disableInput">
                    <div class="text-danger">{{ validation.firstError('project.name') }}</div>
                </div>

                <div class="form-group">
                    <label class="text-muted font-weight-bold text-uppercase"><i
                            class="far fa-user"></i>&nbsp;Encargado</label>
                    <input v-model="project.owner" type="text" class="form-control" placeholder="Encargado del Proyecto"
                        :disabled="disableInput">
                    <div class="text-danger">{{ validation.firstError('project.owner') }}</div>
                </div>

                <div class="form-group">
                    <label class="text-muted font-weight-bold text-uppercase"><i
                            class="fas fa-envelope-open-text"></i>&nbsp;Correo</label>
                    <input v-model="project.ownerEmail" type="text" class="form-control"
                        placeholder="Correo del Encargado" :disabled="disableInput">
                    <div class="text-danger">{{ validation.firstError('project.ownerEmail') }}</div>
                </div>

                <div class="form-group">
                    <label class="text-muted font-weight-bold text-uppercase"><i
                            class="fas fa-people-arrows"></i>&nbsp;Cupos</label>
                    <input v-model="project.spaces" type="number" class="form-control" placeholder="Numero de cupos"
                        :disabled="disableInput">
                    <div class="text-danger">{{ validation.firstError('project.spaces') }}</div>
                </div>

                <div class="form-group">
                    <label class="text-muted font-weight-bold text-uppercase"><i
                            class="fas fa-people-arrows"></i>&nbsp;Tipo de
                        Horas</label>
                    <ion-select placeholder="Seleccionar" v-model="project.hoursType" cancel-text="Cancelar">
                        <ion-select-option value="Internas">Internas</ion-select-option>
                        <ion-select-option value="Externas">Externas</ion-select-option>
                    </ion-select>
                    <div class="text-danger">{{ validation.firstError('project.hoursType') }}</div>
                </div>

                <div class="form-group">
                    <label class="text-muted font-weight-bold text-uppercase"><i
                            class="fas fa-people-arrows"></i>&nbsp;Horario</label>
                    <input v-model="project.schedule" type="text" class="form-control" placeholder="Horario"
                        :disabled="disableInput">
                    <div class="text-danger">{{ validation.firstError('project.schedule') }}</div>
                </div>

                <div class="form-group">
                    <label class="text-muted font-weight-bold text-uppercase"><i
                            class="fas fa-align-center"></i>&nbsp;Descripción</label>
                    <textarea v-model="project.description" class="form-control" placeholder="Descripcion"
                        :disabled="disableInput"></textarea>
                    <div class="text-danger">{{ validation.firstError('project.description') }}</div>
                </div>

                <div class="form-group">
                    <label class="text-muted font-weight-bold text-uppercase"><i
                            class="fas fa-align-center"></i>&nbsp;Contraparte</label>
                    <input v-model="project.counterpart" type="text" class="form-control" placeholder="Contraparte"
                        :disabled="disableInput">
                    <div class="text-danger">{{ validation.firstError('project.counterpart') }}</div>
                </div>


                <div class="form-group">
                    <label class="text-muted font-weight-bold text-uppercase"><i
                            class="far fa-calendar-alt"></i>&nbsp;Fecha de
                        Inicio</label>
                    <ion-datetime v-model="project.startDate" display-format="YYYY/MM/DD" picker-format="DD/MM/YYYY"
                        :disabled="disableInput"></ion-datetime>
                    <div class="text-danger">{{ validation.firstError('project.startDate') }}</div>
                </div>

                <div class="form-group">
                    <label class="text-muted font-weight-bold text-uppercase"><i
                            class="far fa-calendar-alt"></i>&nbsp;Fecha de
                        Finalización</label>
                    <ion-datetime v-model="project.endDate" display-format="YYYY/MM/DD" picker-format="DD/MM/YYYY"
                        :disabled="disableInput">
                    </ion-datetime>
                    <div class="text-danger">{{ validation.firstError('project.endDate') }}</div>
                </div>

                <div class="form-group" v-if="userRol === 1">
                    <label class="text-muted font-weight-bold text-uppercase"><i
                            class="fas fa-graduation-cap"></i>&nbsp;Carreras</label>
                    <ion-select v-model="project.careers" placeholder="Seleccionar" cancel-text="Cancelar" multiple>
                        <ion-select-option v-for="item in collegeCareers" :key="item.idCarrera" :value="item.idCarrera">
                            {{ item.nombre }}
                        </ion-select-option>
                    </ion-select>
                    <div class="text-danger">{{ validation.firstError('project.careers') }}</div>
                </div>

                <div class="form-group mt-4" v-if="!disableInput">
                    <ion-button expand="block" color="primary" @click="updateProject()">
                        ACTUALIZAR
                    </ion-button>
                </div>
                <div class="form-group">
                    <ion-button expand="block" color="dark" @click="closeModal()">
                        REGRESAR
                    </ion-button>
                </div>
            </ion-card-content>
        </ion-card>


        <ion-card class="my-3" color="light" v-if="view === 'students'">
            <ion-card-content v-if="project.students.length > 0">
                <div class="form-group py-2 border-top border-bottom">
                    <h6 class="text-center text-muted font-weight-bold">
                        Solicitudes de Estudiantes
                    </h6>
                </div>

                <div v-for="student in project.students" :key="student.idUser">
                    <ion-item v-if="student.pivot.estado === 1 || userRol === 1">
                        <ion-label>
                            <h6 class="text-primary text-uppercase">{{ student.nombres }} {{ student.apellidos }}</h6>
                            <small>
                                {{ student.correo }}
                                <br>
                                <small class="text-muted">{{ student.carrera.nombre }} -
                                    {{ student.carrera.facultad.nombre }}</small>
                            </small>
                        </ion-label>

                        <ion-buttons v-if="userRol === 1 && student.pivot.estado === 0">
                            <ion-button color="success" @click="sendApplicationRequest(student, 'accept')">
                                <ion-icon :icon="checkmark"></ion-icon>
                            </ion-button>
                            <ion-button color="danger" @click="sendApplicationRequest(student, 'deny')">
                                <ion-icon :icon="closeCircle"></ion-icon>
                            </ion-button>
                        </ion-buttons>

                        <ion-badge v-else-if="student.pivot.estado === 0" color="medium">
                            <small>PENDIENTE</small>
                        </ion-badge>

                        <ion-badge v-else-if="student.pivot.estado === 1" color="primary">
                            <small>ACEPTADO</small>
                        </ion-badge>

                        <ion-badge v-else-if="student.pivot.estado === 2" color="dark">
                            <small>RECHAZADO</small>
                        </ion-badge>
                    </ion-item>
                </div>

                <ion-button class="mt-3" expand="block" color="dark" @click="closeModal()">
                    REGRESAR
                </ion-button>
            </ion-card-content>
            
            <ion-card-content v-else>
                <img src="/assets/img/success.svg" class="img-fluid d-block mx-auto mt-5" style="width:50%;">
                <h1 class="text-primary text-center font-weight-bolder">
                    Hmmm
                </h1>
                <p class="text-muted text-center">
                    Parece ser que no se encontraron registros.
                </p>
            </ion-card-content>
        </ion-card>

    </ion-content>
</template>

<script>
    import SimpleVueValidator from 'simple-vue-validator';
    const Validator = SimpleVueValidator.Validator;
    import {
        modalController
    } from "@ionic/vue";
    import {
        checkmark,
        closeCircle,
        list,
        people
    } from 'ionicons/icons';

    export default {
        mixins: [SimpleVueValidator.mixin],
        data() {
            return {
                apiToken: '',
                userRol: '',
                view: 'general',
                collegeCareers: [],
                project: {
                    id: '',
                    name: '',
                    status: '',
                    counterpart: '',
                    // eslint-disable-next-line
                    spacesAct: '',
                    spaces: '',
                    description: '',
                    owner: '',
                    startDate: '',
                    endDate: '',
                    schedule: '',
                    hoursType: '',
                    ownerEmail: '',
                    careers: [],
                    students: [],
                },
                checkmark,
                closeCircle,
                list,
                people
            };
        },
        props: ['projectData'],
        created() {
            this.apiToken = this.getApiToken();
            this.userRol = this.getUserRolId();
            if (this.userRol === 1) {
                this.getAllCollegeCareers();
            }
            this.setProjectData();
        },
        validators: {
            'project.name': function (value) {
                return Validator.value(value).required('El nombre es obligatorio.');
            },
            'project.counterpart': function (value) {
                return Validator.value(value).required('El campo contraparte es obligatorio.');
            },
            'project.spaces': function (value) {
                return Validator.value(value).required('El campo cupos es obligatorio.');
            },
            'project.description': function (value) {
                return Validator.value(value).required('El campo descripción es obligatorio.');
            },
            'project.owner': function (value) {
                return Validator.value(value).required('El campo encargado es obligatorio.');
            },
            'project.startDate': function (value) {
                return Validator.value(value).required('El campo fecha de inicio es obligatorio.');
            },
            'project.endDate': function (value) {
                return Validator.value(value).required('El campo fecha de finalización es obligatorio.');
            },
            'project.schedule': function (value) {
                return Validator.value(value).required('El campo horario es obligatorio.');
            },
            'project.hoursType': function (value) {
                return Validator.value(value).required('El campo tipo de horas es obligatorio.');
            },
            'project.ownerEmail': function (value) {
                return Validator
                    .value(value).required('El campo correo del encargado es obligatorio.')
                    .maxLength(100, 'El correo no debe contener más 100 caracteres.')
                    .email('Ingrese un correo valido.');
            },
        },
        methods: {
            async updateProject() {
                const validation = await this.$validate();
                if (validation) {
                    const API_ENDOINT = this.getAPIEndpoint();
                    const selectedCareers = [];

                    if (this.userRol === 1) {
                        this.project.careers.forEach(element => {
                            const career = [];
                            career[0] = element;
                            career[1] = 0;
                            career[2] = 6;
                            selectedCareers.push(career);
                        });
                    }

                    const request = await fetch(API_ENDOINT + '/admin/putUpdateProyecto', {
                        method: "PUT",
                        // eslint-disable-next-line
                        body: JSON.stringify({
                            idProyecto: this.project.id,
                            nombre: this.project.name,
                            contraparte: this.project.counterpart,
                            cupos: this.project.spaces,
                            descripcion: this.project.description,
                            encargado: this.project.owner,
                            // eslint-disable-next-line
                            fecha_inicio: this.project.startDate,
                            // eslint-disable-next-line
                            fecha_fin: this.project.endDate,
                            horario: this.project.schedule,
                            // eslint-disable-next-line
                            tipo_horas: this.project.hoursType,
                            // eslint-disable-next-line
                            correo_encargado: this.project.ownerEmail,
                            carreraPerfil: selectedCareers
                        }),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8",
                            'Authorization': 'Bearer ' + this.apiToken
                        }
                    })

                    if (request.status === 200) {
                        this.showSuccessToast('Proyecto actualizado exitosamente.');
                        this.closeModal();
                        this.$emit('dataUpdated');
                        location.reload();
                    } else {
                        this.showErrorToast('Algo salió mal al actualizar el proyecto.');
                    }
                } else {
                    this.FormValidationFailed();
                }
            },
            async sendApplicationRequest(student, status) {
                const API_ENDOINT = this.getAPIEndpoint();

                const request = await fetch(API_ENDOINT + '/admin/putAplicarEnProyecto', {
                    method: "PUT",
                    // eslint-disable-next-line
                    body: JSON.stringify({
                        idProyecto: this.project.id,
                        idUser: student.idUser,
                        estado: status === 'accept' ? 1 : 2 
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        'Authorization': 'Bearer ' + this.apiToken
                    }
                })

                if (request.status === 200) {
                    this.showSuccessToast('Estado de alumno en el proyecto Actualizado.');
                    this.closeModal();
                    this.$emit('dataUpdated');
                    // location.reload();
                } else {
                    this.showErrorToast('Algo salió mal al actualizar el proyecto.');
                }
            },
            async getAllCollegeCareers() {
                const API_ENDOINT = this.getAPIEndpoint();
                const request = await fetch(API_ENDOINT + "/getCarreras");

                const data = await request.json();

                if (request.status === 200) {
                    this.collegeCareers = data;
                } else {
                    this.showErrorToast('Algo salió mal al obtener las carreras.');
                }
            },
            setProjectData() {
                this.project.id = this.projectData.idProyecto;
                this.project.name = this.projectData.nombre;
                this.project.status = this.projectData.estado;
                this.project.counterpart = this.projectData.contraparte;
                // eslint-disable-next-line
                this.project.spacesAct = this.projectData.cupos_act;
                this.project.spaces = this.projectData.cupos;
                this.project.description = this.projectData.descripcion;
                this.project.owner = this.projectData.encargado;
                // eslint-disable-next-line
                this.project.startDate = this.projectData.fecha_inicio;
                // eslint-disable-next-line
                this.project.endDate = this.projectData.fecha_fin;
                this.project.schedule = this.projectData.horario;
                this.project.hoursType = this.projectData.tipo_horas;
                // eslint-disable-next-line
                this.project.ownerEmail = this.projectData.correo_encargado;

                if (this.userRol === 1 && this.projectData.carreras) {
                    const careerIds = [];
                    this.projectData.carreras.forEach(element => {
                        careerIds.push(element.idCarrera);
                    });
                    this.project.careers = careerIds;
                }

                console.log(this.projectData.estudiantes)
                if (this.projectData.estudiantes) {
                    this.project.students = this.projectData.estudiantes;
                }
            },
            async closeModal() {
                await modalController.dismiss();
            }
        },
        computed: {
            disableInput: function () {
                return this.userRol !== 1;
            }
        }
    }
</script>