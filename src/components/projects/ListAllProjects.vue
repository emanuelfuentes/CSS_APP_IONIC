<template>
<div>
    <div v-if="projects.length > 0">
        <show-project 
            v-for="project in projects"
            :key="project.idProyecto"
            :project-data="project"
            :show-unapply="false"
            v-on:dataUpdated="getAllProjects()">
        </show-project>
    </div>

    <div class="container" v-else>
        <div class="row justify-content-center align-items-center">
            <div class="col">
                <img src="/assets/img/success.svg" class="img-fluid d-block mx-auto mt-5" style="width:50%;">
                <h1 class="text-primary text-center font-weight-bolder">
                    Hmmm
                </h1>
                <p class="text-muted text-center">
                    Parece ser que no se encontraron registros.
                </p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    import ShowProject from './ShowProject.vue'

	export default {
		components: {
			ShowProject
		},
        data: function () {
            return {
                apiToken: '',
                projects: []
            };
        },
        async created() {
            this.apiToken = await this.getApiToken();
            this.getAllProjects();
        },
        methods: {
            async getAllProjects() {
                const API_ENDOINT = this.getAPIEndpoint();
                const request = await fetch(API_ENDOINT + '/admin/getTodosLosProyectos', {
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        'Authorization': 'Bearer ' + this.apiToken
                    }
                });

                const data = await request.json();

                if(request.status === 200) {
                    this.projects = data;
                } else {
                    this.showErrorToast('Ups! Algo salió mal.');
                }
            },

        },
	}
</script>