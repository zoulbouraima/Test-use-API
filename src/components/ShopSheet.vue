<template>
	<div class="shop-sheet">
		<div class="shop-sheet-container">
			<div class="shop-sheet-header">
				<div class="sheet-title"><span><font-awesome-icon :icon="icons.shoppingCart" /></span> Items selected</div>
				<span class="button-return" @click="onClick()"><font-awesome-icon :icon="icons.chevronRight" /></span>
			</div>
			<div class="sheet-body">
				<ul class="sheet-items-list">
					<li class="article" v-for="(item, index) in addedItems" :key='index'>
						<div class="article-image" :style="'background-image: url('+item.src+');'"></div>
						<div class="article-infos">
							<div class="article-name">{{item.name}}</div>
							<div class="article-index">
								<div class="article-quantity">
									<label>Quantity</label>
									<input v-model.number="item.count" min="1" type="number" @input="updateItem(index, $event)">
								</div>
								<div class="article-amount">{{ item.subTotalAmount }} {{currency}}</div>
							</div>
						</div>
						<div class="delete-article"><font-awesome-icon :icon="icons.times" @click="deleteArticle(index)" /></div>
					</li>
				</ul>
				<div class="sheet-no-items" v-if="addedItems.length == 0">
					<span class="icons-empty">
						<font-awesome-icon :icon="icons.shoppingCart" />
						<span class="times"><font-awesome-icon :icon="icons.times" /></span>
					</span>
					<span class="message-empty">Empty cart</span>
				</div>
			</div>
			<div class="sheet-footer" v-show="addedItems.length != 0">
				<shop-amount :amount="sumTotalAmount(addedItems)" :currency="currency"/>
			</div>
			<button @click='viewAddedItems()'>View added items</button>
		</div>
	</div>
</template>

<script>
import Icons from "@/assets/vendors/font-icons/main.js";
import ShopAmount from "./ShopAmount.vue";
import { mapState } from 'vuex';
export default {
	data() {
		return {
			icons: Icons,
			count: 0,
			amount: 0
		}
	},
	computed:{
		...mapState('articles', ['currency', 'countItem', 'addedItems']),
		totalAmountSetter: {
			get: function(){
				return this.totalAmount
			},
			set: function(){
				this.totalAmount = this.addedItems.reduce(
					(accumulator, current) =>
					accumulator + current.count*current.amount,
					0
				);
			}
		},
	},
	components:{ShopAmount},
	methods: {
		
		onClick:function(){
			this.$emit('onClick');
		},
		sumTotalAmount(items){
			console.log(this.totalAmountSetter)
			return items.reduce(
				(accumulator, current) =>
				accumulator + current.count*current.amount,
				0
			);
			//return this.totalAmount
		},
		viewAddedItems(){
			console.log(this.addedItems);
		},
		deleteArticle: function(index){
			this.addedItems[index].count= 0;
			this.addedItems.splice(index, 1);
		},
		updateItem(index, event){
			var object = this.addedItems[index];
			object["count"] = Number(event.target.value);
			object["subTotalAmount"] = event.target.value * object["amount"];
			console.log(object);
			this.addedItems.splice(index, 1, object);
		}
	},
}
</script>

<style lang="less" scoped>
.shop-sheet{
	position: absolute;
    right: 0;
    width: 300px;
    background-color: white;
    height: 100%;
	box-shadow: 0px 0px 8px 0px;
}
.shop-sheet-header {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    color: @pc;
	.button-return {
		width: 25px;
		height: 25px;
		line-height: 1.9;
		text-align: center;
		border-radius: 50%;
		cursor: pointer;
		&:hover{
			color: white !important;
			background-color: @fpc;
		}
	}
}

.article{
	display: flex;
	justify-content: space-between;
	margin: 10px 0;
    padding: 10px 5px;
    border-radius: 5px;
    background-color: white;
    box-shadow: 0 0 5px rgba(0, 0, 0, .35);
	.article-infos{
		padding: 0 10px;
		
		.article-name{
			width: 150px;
			padding: 10px 0;
			font-size: 0.9em;
			height: 60px;
		}
		.article-index{
			display: flex;
			justify-content: space-between;
			.article-quantity {
				label{
					display: block;
					font-size: 00.5em;
					color: @pc;
				}
				input{
					border: none;
					width: 50px;
					border-bottom: 1px solid @pc;
					height: 20px;
					font-size: .8em;
					&:focus {
						outline: none;
						border-bottom-width: 2px !important;
					}
				}
			}
			.article-amount{
				padding-top: 10px;
			}
		}
	}
	.delete-article {
		line-height: 7;
		svg{
			cursor: pointer;
		}
	}
	.article-image{
		background-size: auto 100%;
		background-repeat: no-repeat;
		background-position: center;
		width: 80px;
		height: 100px;
	}
}
.sheet-body{
	border-top: 2px solid whitesmoke;
	border-bottom: 2px solid whitesmoke;
	.sheet-no-items {
		text-align: center;
		padding: 20px;
		color: rgba(47, 47, 47, 0.6);
		font-weight: bold;
		.icons-empty {
			font-size: 5em;
			position: relative;
			.times {
				position: absolute;
				font-size: 0.5em;
				top: -4px;
				left: 40px;
				color: rgba(245, 245, 245, 0.8);
			}
		}
		.message-empty{
			display: block;
		}
	}
	.sheet-items-list{
		max-height: 70vh;
		overflow: auto;
	}
}
</style>