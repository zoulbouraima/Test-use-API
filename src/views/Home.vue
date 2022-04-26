<template>
  <div class="home">
    <HomeMenu/>
	<button @click="goBack()">Retour</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeMenu from "@/components/HomeMenu.vue";

export default {
	computed: {
		username(){
			return this.$route.params.id
		}
	},
	methods: {
		goBack(){
			window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
		}
	},
	name: "Home",
	components: {
	HomeMenu,
	},
};
</script>
