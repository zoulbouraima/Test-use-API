<template>
	<div class="details">
		<div class="important-details">
			<h1 class="article-name">{{name}}</h1>
			<h1 class="article-amount">{{amount}}{{currency}}</h1>
		</div>
		<div class="variation-article">
			<span class="title-color">Color</span>
			<ul class="list-variant">
				<li class="variant-selector" >
					<div class="variant-color" :class="{'color-actived': iActive == initialColor}" :style="'background-color: '+ initialColor" @click="change(initialColor)"></div>
				</li>
				<li class="variant-selector" v-for="(item, index) in itemColors" :key="index" @click="change(item)">
					<div class="variant-color" :style="'background-color: '+ item" :class="{'color-actived': iActive == item}"></div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	props:{
		name: String,
		amount: Number,
		currency: String,
		initialColor: String,
		itemColors: Array
	},
	data() {
		return {
			iActive: this.initialColor
		}
	},
	methods: {
		change:function(i){
			if(this.iActive != i){
				this.$emit('action', i);
				this.iActive = i;
				console.log('test');
				this.$router.push({path:'', query:{color: i.replace("#", "")}});
			}
		}
	},
}
</script>

<style lang="less">
	.title-color{
		color: #7d7d7d;
	}
	.color-actived{
		&:before{
			border-color: #3e3e3e !important;
		}
	}
	.important-details{
		display: flex;
		justify-content: space-between;
		h1 {
			font-size: 2em;
		}
	}
	.variation-article{
		padding: 15px 0;
		.list-variant{
			margin: 0;
			padding: 0 !important;
			.variant-selector{
				margin-right: 15px;
				list-style: none;
				display: inline-block;
				.variant-color{
					position: relative;
					width: 20px;
					height: 20px;
					border-radius: 50%;
					border: 2px solid whitesmoke;
					&:before{
						content: '';
						display: block;
						position: absolute;
						width: 24px;
						height: 24px;
						top: -4px;
						left: -4px;
						border-radius: 50%;
						border: 3px solid #b7b7b7;
					}
					
				}
			}
		}
	}
</style>