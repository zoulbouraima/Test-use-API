<template>
	<div class="card-article" >
		<div class="content-card">
			<router-link :to='to'>
				<div class="article" @click="goAccess">
					<div class="article-view" :style="'background-image: url('+imageSrc+');'"></div>
					<div class="article-name">{{articleName}}</div>
					<div class="article-amount">{{articleAmount}} {{currency}}</div>
				</div>
			</router-link>
			<!-- <div class="d-flex justify-content-center mb-3">
				<b-spinner label="Loading..."></b-spinner>
			</div> -->
			<shop-button label="ADD TO CART" nameIcon="shoppingCart" @action='getAction' />
		</div>
	</div>
</template>
<script>
import ShopButton from "./ShopButton.vue";
export default {
	components:{ShopButton,},
	props: {
		imageSrc: String,
		articleName: String,
		articleAmount: Number,
		currency: String,
		to: String
	},
	methods: {
		getAction: function(){
			this.$emit('actionCard')
		},
		goAccess: function(){
			this.$emit('access')
		}
	},
}
</script>
<style lang="less">
	
	.card-article {
		padding-top: 10px;
		padding-bottom: 10px;
		.content-card{
			background-color: white;
			padding: 10px;
			border-radius: 3px;
			box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
			a{
				text-decoration: none;
				color: #000;
				&:hover{
					color: #000 !important;
				}
			}
		}
		.article {
			cursor: pointer;
			.article-view {
				background-size: auto 100%;
				background-repeat: no-repeat;
				background-position: center;
				width: 100%;
				height: 190px;
				margin-bottom: 10px;
			}
			.article-name {
				height: 37px;
				font-size: .9em;
				text-align: center;
			}
			.article-amount {
				text-align: center;
				font-weight: bold;
			}
		}
	}

</style>