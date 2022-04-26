<template>
	<div class="card-add-cart-and-selector">
		<div class="selector-article-number">
			<select name="" id="" v-model="selected">
				<option v-for="(item, index) in collection" :key='index' :value="item">{{item}}</option>
			</select>
		</div>
		<div class="container-button">
			<button class="button-add-card" @click="sum()">Add to cart</button>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			
		}
	},
	props: {
		collection: Array,
		amount: Number,
		selected: String,
	},
	methods: {
		sum: function(){
			console.log(Number(this.selected)*Number(this.amount))
		}
	},
}
</script>
<style lang="less">
	.card-add-cart-and-selector {
		display: flex;
		.selector-article-number {
			flex-grow: 2;
			select {
				padding: 10px 20px 6px 2px;
				border: 1px solid #9c9c9c6e;
				background-color: transparent;
				font-size: 0.9em;
				height: 100%;
				border-radius: 2px;
			}
		}
		.container-button {
			flex-grow: 10;
			text-align: center;
			.button-add-card {
				padding: 6px 80px;
				background-color: var(--primary-color);
				color: white;
				border: none;
			}
		}
	}
 
</style>