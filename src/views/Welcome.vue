<template>
  <div>
    <div class="test">Bienvenue monsieur {{ username }}</div>
	<div class="test">Le hash {{ $route.hash }}</div>
  </div>
</template>

<script>

export default {
	name: "Welcome",
	computed: {
		username(){
			return this.$route.params.name[0].toUpperCase()+this.$route.params.name.slice(1)
		}
	},
};
</script>