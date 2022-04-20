<template>
    <ion-content :fullscreen="true">
        <div class="container">
            <div class="row justify-content-center align-items-center" style="min-height: 100vh;">
                <div class="col">
                    <img src="/assets/img/css.png">

                    <div class="form-group">
                        <ion-router-link class="d-block text-center" href="/register" color="medium">
                            ¿Aún no tengo una cuenta?
                        </ion-router-link>
                    </div>

                    <div class="form-group">
                        <label class="text-muted"><i class="far fa-id-card"></i>&nbsp;Carnet</label>
                        <input v-model="user.carnet" type="text" class="form-control" placeholder="Ingrese su carnet">
                        <div class="text-danger">{{ validation.firstError('user.carnet') }}</div>
                    </div>

                    <div class="form-group mt-4">
                        <label class="text-muted"><i class="fas fa-unlock-alt"></i>&nbsp;Contraseña</label>
                        <input v-model="user.password" type="password" class="form-control" placeholder="Ingrese su contraseña">
                        <div class="text-danger">{{ validation.firstError('user.password') }}</div>
                    </div>

                    <div class="form-group mt-4">
                        <ion-button @click="Login()" expand="block">
                            INICIAR SESIÓN
                        </ion-button>
                        <br>
                        <ion-router-link class="d-block text-center" href="/forgot-password" color="medium">
                            ¿Olvidé mi contraseña?
                        </ion-router-link>
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
                carnet: null,
                password: null,
            }
        };
    },
    validators: {
        'user.carnet': function (value) {
            return Validator.value(value)
                .required('El carnet es obligatorio.')
                .maxLength(100, 'El carnet no debe contener más de 100 caracteres.');
        },
        'user.password': function (value) {
            return Validator.value(value)
                .required('El campo contraseña es obligatorio.')
                .minLength(8, 'La contraseña debe contener al menos 8 caracteres.');
        },
    },
    methods: {
        async Login() {
            const validation = await this.$validate();
            if(validation) {
                let correo = this.user.carnet;
                if(!correo.includes('@')) {
                    correo = correo + '@uca.edu.sv';
                }

                const API_ENDOINT = this.getAPIEndpoint();
                const request = await fetch(API_ENDOINT + '/login', {
                    method: "POST",
                    body: JSON.stringify({
                        correo: correo,
                        password: this.user.password
                    }),
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })

                const data = await request.json();

                if(request.status === 200) {
                    localStorage.setItem('user', JSON.stringify(data));
                    this.$router.push('/home');
                } else {
                    localStorage.removeItem('user');
                    this.showErrorToast('Correo o contraseña incorrecta.');
                }
            } else {
                this.FormValidationFailed();
            }
        }
    },
}
</script>

