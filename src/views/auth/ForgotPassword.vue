<template>
    <ion-content :fullscreen="true">
        <div class="container">
            <div class="row justify-content-center align-items-center" style="min-height: 100vh;">
                <div class="col">
                    <img src="/assets/img/css.png">

                    <div class="form-group mt-3">
                        <label class="text-muted"><i class="far fa-id-card"></i>&nbsp;Carnet</label>
                        <input v-model="user.carnet" type="text" class="form-control" placeholder="Ingrese su carnet">
                        <div class="text-danger">{{ validation.firstError('user.carnet') }}</div>
                    </div>

                    <div class="form-group mt-3">
                        <ion-button expand="block" @click="ForgotPassword()">
                            RESTAURAR CLAVE
                        </ion-button>
                    </div>

                    <div class="form-group mt-3">
                        <ion-button color="dark" expand="block" href="/login">
                            REGRESAR
                        </ion-button>
                    </div>
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
            user: {
                carnet: null
            }
        };
    },
    validators: {
        'user.carnet': function (value) {
            return Validator.value(value)
                .required('El carnet es obligatorio.')
                .maxLength(100, 'El carnet no debe contener más de 100 caracteres.');
        }
    },
    methods: {
        async ForgotPassword() {
            const validation = await this.$validate();
            if(validation) {
                const API_ENDOINT = this.getAPIEndpoint();
                let correo = this.user.carnet;
                if(!correo.includes('@')) {
                    correo = correo + '@uca.edu.sv';
                }
                const request = await fetch(API_ENDOINT + '/olvide-clave', {
                    method: "POST",
                    body: JSON.stringify({
                        correo: correo
                    }),
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })

                if(request.status === 200) {
                    window.location = '/reset-password';
                } else {
                    this.showErrorToast('Ups! Algo salió mal.');
                }
            } else {
                this.FormValidationFailed();
            }
        }
    },
}
</script>