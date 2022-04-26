<template>
	<div class="not-found">
		<h1>404</h1>
		<p>PAGE INTROUVABLE</p>

		<router-link :to="to" >Aller à la {{page}}</router-link>
	</div>
</template>

<script>
export default {
	name:'NotFound',
	data() {
		return {
			page: '',
			to: '',
			listPage:[
				{
					re: /shop-spa/,
					page: 'boutique Shop-SPA',
					to: '/shop-spa'
				},
				{
					re: /about/,
					page: 'page À Propos',
					to: '/about'
				}
			]
		}
	},
	beforeMount() {
		console.log('a');
		for (let i = 0; i < this.listPage.length; i++) {
			if(this.listPage[i].re.test(window.location.href)){
				this.page = this.listPage[i].page;
				this.to = this.listPage[i].to;
				break;
			}
		}
	},
	methods: {
		goBack(){
			window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
		},
	},
}
</script>

<style lang="less">
.not-found{
	padding: 30vh 0;
	text-align: center;
	font-size: 30px;
	font-weight: bold;
	a{
		font-size: 0.5em;
		text-decoration: none;
		font-weight: normal;
	}
}
</style>