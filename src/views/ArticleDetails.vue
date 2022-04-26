<template>
	<div class="article-details-container">
		<div class="container-left">
			<ArticleImage :source="src"></ArticleImage>
		</div>
		<div class="container-right">
			<Details :currency="currency" :name="article.name" :amount="article.amount" :itemColors="article.others_color" :initialColor="article.color" @action="choiceColor"></Details>
			<AddCartAndSelector :collection='numbers' :amount="article.amount" :selected=""></AddCartAndSelector>
		</div>
		
	</div>
</template>

<script>
import Details from '../components/Details.vue';
import AddCartAndSelector from '../components/AddCartAndSelector.vue';
import ArticleImage from '../components/ArticleImage.vue';
import { mapGetters, mapState } from 'vuex';
export default {
	data() {
		return {
			article: {},
			numbers: ["1", "2", "3", "4", "5", "10", "15"],
			src: ""
		}
	},
	computed:{
		...mapState('articles', ['items','addedItems', 'currency', 'currentArticle']),
		...mapGetters('articles', ['articlesFilter'])
	},
	beforeMount: function(){
		var path = window.location.pathname;
		console.log(this.articlesFilter);
		for(let index = 0; index < this.articlesFilter.length; index++) {
			const element = this.articlesFilter[index];
			console.log('it is the article name '+ path.search(element.name.toLowerCase().replaceAll(" ", "-")));
			if(path.search(element.name.toLowerCase().replaceAll(" ", "-")) > 0){
				this.article = element;
				this.$router.push({path:'', query: {color: element.color.replace("#", "")}})
				this.src = this.article.src;
				/* for(let)
				if(this.addedItems[]) */
				this.count = this.addedItems
				console.log(this.article)
				break;
			}
		}
	},
	components:{
		Details, AddCartAndSelector, ArticleImage
	},
	methods: {
		choiceColor: function(activeColor){
			for(let index = 0; index < this.items.length; index++){
				console.log(activeColor)
				if(this.items[index].name == this.article.name && this.items[index].color == activeColor){
					this.src = this.items[index].src;
					break;
				}
			}
		}
	},

}
</script>

<style lang="less">
	.article-details-container {
		display: flex;
		justify-content: space-around;
		padding: 10px 30px;
		.container-right {
			flex-grow: 1;
			padding: 10px 20px;
		}
	}
</style>