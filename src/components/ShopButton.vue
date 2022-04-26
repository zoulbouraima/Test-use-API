<template>
	<div class="shop-button" @click="getAction" >
		<button><span v-if="nameIcon"><font-awesome-icon :icon="namedIcon"/></span> {{label}}</button>
	</div>
</template>

<script>
import Icons from "@/assets/vendors/font-icons/main.js";
export default {
	props:{
		label: {
			type: String,
			required: true
		},
		nameIcon: String
	},
	data() {
		return {
			icons: Icons
		}
	},
	computed:{
		namedIcon: function(){
			return this.icons[this.nameIcon]
		}
	},
	methods: {
		getAction: function(){
			this.$emit('action')
		}
	},
}
</script>

<style lang="less">
.shop-button{
	text-align: center;
	//cursor: pointer;
	button {
		width: 100%;
		border: none;
		padding: 10px;
		color: #60749d;
		font-size: 0.8125rem;
		background-color: white;
		&:hover{
			background-color: @fpc !important;
		}
	}
}
</style>