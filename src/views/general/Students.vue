<template>
<ion-page>
	<ion-content fullscreen>
		<list-students v-if="userRol === 1"></list-students>
	</ion-content>
</ion-page>
</template>

<script>
import ListStudents from '../../components/students/ListStudents.vue';

export default {
	components: {
		ListStudents
	},
	data() {
		return {
			userRol: ''
		}
	},
	created() {
		this.userRol = this.getUserRolId();
	}
}
</script>