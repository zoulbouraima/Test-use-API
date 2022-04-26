<template>
	<div class="shop-spa-container">
		<header class="shop-spa-header">
			<div class="shop-spa-logo">
				<img :src="images.logo" alt="Logo" />
			</div>
			<div class="icon-shopping-cart" @click="displaySheet()">
				<span class="cart-badge" v-show='sumCountItems(addedItems) > 0' >{{sumCountItems(addedItems)}}</span>
				<font-awesome-icon :icon="icons.shoppingCart"/>
			</div>
		</header>
		<div class="shop-spa-body">
			<div class="cards-container">
				<div class="articles-list container-fluid row" v-if="articlesListDisplayed">
					<card-article v-for="article in articlesFilter" :to="pathName(article.name)" @access="getCurrentHref()" :key="article.name" :imageSrc="article.src" :articleName="article.name" :articleAmount="article.amount" :currency="currency" @actionCard="addToCart(article)" class="col-sm-6 col-md-3 col-lg-2"></card-article>
				</div>
				<div class="article-details">
					<router-view></router-view>
				</div>
			</div>
		</div>
		<div class="shop-spa-nav" :class="{'shop-sheet-displayed': !isDisplayed}">
			<shop-sheet @onClick="displaySheet()"></shop-sheet>
		</div>
		<div class="shop-spa-footer"><span>Copyright &copy; 2021-2022 <span class="name">ShopSPA</span>. Tous droits réservés </span></div>
	</div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import CardArticle from '../components/CardArticle.vue';
import ShopSheet from '../components/ShopSheet.vue';
export default {
	components:{
		CardArticle,
		ShopSheet
	},
	data() {
		return {
			re: /shop-spa\/products[a-z0-9-/]*/,
			isDisplayed : false,
			articlesListDisplayed : true,
			href: window.location.href
		}
	},
	computed:{
		...mapState(['images', 'icons']),
		...mapState('articles',  ['currency', 'addedItems', 'currentArticle']),
		...mapGetters('articles', ['articlesFilter']),
		...mapGetters({currentArticle: 'currentArticle'}),
	},
	watch: {
		
	},
	mounted: function(){
		if(this.re.test(this.href)) this.articlesListDisplayed = false;
	},
	updated: function(){
		this.href = window.location.href;
		if(this.re.test(this.href)){
			this.articlesListDisplayed = false;
		}else{
			this.articlesListDisplayed = true;
		}
	},
	methods:{
		...mapActions('articles', ['addToCart']),
		displaySheet: function(){
			this.isDisplayed =!this.isDisplayed;
			console.log(this.href)
		},
		sumCountItems: function(items){
			if(items.length != 0){
				return items.reduce(
					(accumulator, current) =>
					accumulator + current.count,
					0
				);
			}
			return 0;
		},
		pathName:function(name){
			name = name.toLowerCase().replaceAll(" ", "-");
			return "shop-spa/products/"+name;
		},
		getCurrentHref(){
			this.href = window.location.href;
			console.log(this.href)
		}
		
	}
}
</script>
<style lang="less">
	.shop-spa-container{
		position: relative;
		margin-top: 40px;
		.shop-spa-header {
			position: fixed;
			top: 46px;
			width: 100%;
			display: flex;
			justify-content: space-between;
			padding: 6px 30px;
			box-shadow: 0 0 4px rgba(121, 117, 119, 0.8);
			background-color: white;
			.shop-spa-logo{
				cursor:pointer;
				width: 30px;
				padding-top: 5px;
				img{
					width: 100%;
				}
			}
			.icon-shopping-cart{
				position: relative;
				padding-top: 5px;
				cursor: pointer;
				width: 40px;
				height: 40px;
				text-align: center;
				line-height: 2;
				font-size: 1.2em;
				color: @pc;
				&:hover {
					border-radius: 50%;
					background-color: @fpc;
				}
				.cart-badge {
					position: absolute;
					top: 2px;
					right: -2px;
					width: 16px;
					height: 16px;
					border-radius: 50%;
					text-align: center;
					font-size: 10px;
				}
			}
		}
		.shop-spa-footer{
			width: 100%;
			position: fixed;
			bottom: 0px;
			padding: 20px;
			background-color: white;
			text-align: center;
			font-size: 0.9em;
			box-shadow: 0 0 4px rgba(121, 117, 119, 0.8);
			.name{
				color: @pc;
				text-decoration: underline;
			}
		}
	}
	.shop-spa-body{
		background-color: #ececec;
		padding: 20px 0;
		margin-bottom: 55px;
	}
	.shop-spa-nav {
		position: fixed;
		top: 45px;
		background: rgba(158, 158, 158, 0.24);
		width: 100%;
		height: 100vh;
		transition: 0.6s;
	}
	.shop-sheet-displayed {
		transform: translateX(100%);
		transition: 0.6s;
	}
	
	.articles-list{
		margin: 0 !important;
	}
</style>