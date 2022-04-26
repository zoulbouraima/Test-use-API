<template>
  <div class="about">
	<div class="container-components-root">
		<div v-for="item in links" :key="item.name"><router-link tag="li" :to="{ path: item.to, query: { plan: 'private' }}" replace><a>{{item.name}}</a></router-link></div>
	</div>
	<div class="container-components">
		<router-view></router-view>
	</div>
  </div>
</template>

<script>
// import Welcome from 'Welcome.vue';
import ABOUT_DATA from '../datas/about';
export default {
	data() {
		return ABOUT_DATA
	},
}
</script>

<style lang="less">
	.about{
		display: flex;
		.container-components-root{
			height: 94vh;
			width: 30%;
			padding: 10px;
			min-width: 100px;
			background-color: var(--primary-color);
			a{
				color: white;
				text-decoration: none;
			}
		}
		.container-components{
			width: 70%;
		}
	}
</style>