import { toastController } from '@ionic/vue';

const mixin = {
    methods: {
        getAPIEndpoint() {
            return 'https://uca.edu.sv/servicio-social/proyectos/public/api';
        },
        getAuthenticatedUser() {
            const storedUser = localStorage.getItem('user');
            return storedUser ? JSON.parse(storedUser) : '';
        },
        getApiToken() {
            const storedUser = localStorage.getItem('user');
            const user = storedUser ? JSON.parse(storedUser).user : '';

            return user ? user.api_token : '';
        },
        getUserId() {
            const storedUser = localStorage.getItem('user');
            const user = storedUser ? JSON.parse(storedUser).user : '';

            return user ? user.idUser : '';
        },
        getUserRolId() {
            const storedUser = localStorage.getItem('user');
            const user = storedUser ? JSON.parse(storedUser).user : '';

            return user ? user.idRol : '';
        },
        signout() {
            localStorage.removeItem('user');
            location.reload();
        },




        async showSuccessToast(message: string) {
            const toast = await toastController
                .create({
                    message: message,
                    duration: 2000,
                    color: 'dark'
                })
            return toast.present();
        },
        async showErrorToast(message: string) {
            const toast = await toastController
                .create({
                    message: message,
                    duration: 2000,
                    color: 'danger'
                })
            return toast.present();
        },
        async FormValidationFailed() {
            const toast = await toastController
            .create({
                message: '¡Ups! No se ha completado toda la información',
                duration: 2000,
                color: 'dark'
            })
            return toast.present();
        }
    }
}

export default mixin;