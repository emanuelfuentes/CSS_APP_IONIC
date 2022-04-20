<template>
    <ion-content :fullscreen="true">
        <div class="container">
            <div class="row justify-content-center align-items-center" style="min-height: 100vh;">
                <div class="col">
                    <img src="/assets/img/css.png">

                    <div class="form-group">
                        <p class="d-block text-primary text-center">
                            Se envió un código a su correo, favor verificar su bandeja de entrada.
                        </p>
                    </div>

                    <div class="form-group">
                        <label>Código</label>
                        <input v-model="code" type="text" class="form-control" placeholder="Ingrese el código de verificación">
                        <div class="text-danger">{{ validation.firstError('code') }}</div>
                    </div>

                    <div class="form-group">
                        <label>Contraseña</label>
                        <input v-model="password" type="password" class="form-control" placeholder="Ingrese su clave">
                        <div class="text-danger">{{ validation.firstError('password') }}</div>
                    </div>

                    <div class="form-group">
                        <label>Confirmar Contraseña</label>
                        <input v-model="repeat" type="password" class="form-control" placeholder="Confirmar clave">
                        <div class="text-danger font-weight-bold">{{ validation.firstError('repeat') }}</div>
                    </div>

                    <div class="form-group mt-3">
                        <ion-button expand="block" @click="ResetPassword()">
                            CAMBIAR CLAVE
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
            code: '',
            password: '',
            repeat: '',
        };
    },
    validators: {
        'code': function (value) {
            return Validator.value(value)
                .required('El código es obligatorio.')
                .minLength(5, 'El código contiene al ménos de 5 caracteres.');
        },
        'password': function (value) {
            return Validator.value(value)
                .required('El contraseña es obligatoria.')
                .minLength(8, 'La contraseña debe contener al menos 8 caracteres.');
        },
        'repeat, password': function (repeat, password) {
            return Validator.value(repeat)
                .required('Favor confirmar su contraseña.')
                .match(password, 'La confirmación de contraseña no coincide.');
        }
    },
    methods: {
        async ResetPassword() {
            const validation = await this.$validate();
            if(validation) {
                const API_ENDOINT = this.getAPIEndpoint();
                const request = await fetch(API_ENDOINT + '/cambiar-clave', {
                    method: "POST",
                    body: JSON.stringify({
                        token: this.code,
                        clave: this.password,
                        // eslint-disable-next-line
                        confirmar_clave: this.repeat
                    }),
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })

                if(request.status === 200) {
                    window.location = '/login';
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