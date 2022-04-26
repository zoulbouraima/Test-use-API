<template>
	<div class="shop-amount">
		<span class="shop-amount-label">Total:</span>
		<span class="shop-amount-value">{{amount}} {{currency}}</span>
	</div>
</template>

<script>
export default {
	props:{
		amount: Number,
		currency: String
	},
}
</script>

<style lang="less">
	.shop-amount{
		display: flex;
		padding: 10px;
		justify-content: space-between;
		color: @pc;
		.shop-amount-label{
			font-size: .7em;
			padding-top: 7px;
		}
		.shop-amount-value{
			font-size: 1.2em;
			font-weight: bold;
		}
	}
</style>