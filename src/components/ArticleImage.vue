<template>
	<div class="card-article-image" :style="'background-image: url('+source+');'" @click="getPosition(e)">
		<img :src="source" class="image"/>
	</div>
</template>
<script>
export default {
	props: {
		source: String
	},
	mounted() {
		document.addEventListener('mousemove', this.logPosition);
	},
	methods: {
		logPosition: function(e){
			var X = e.clientX, Y = e.clientY;
			var cardArticle = document.getElementsByClassName('card-article-image')[0];
			var cardArticleBounding = cardArticle.getBoundingClientRect();
			var cardArticleTop = cardArticleBounding.top;
			var cardArticleRight = cardArticleBounding.right;
			var cardArticleBottom = cardArticleBounding.bottom;
			var cardArticleLeft = cardArticleBounding.left;
			var img = document.getElementsByClassName("image")[0];
			if( X>=cardArticleLeft && X<=cardArticleRight && Y>=cardArticleTop && Y<=cardArticleBottom){
				img.style.opacity = 0;
				cardArticle.style.backgroundPosition = (-X+cardArticleLeft) + "px " + (-Y+cardArticleTop) + "px";
				console.log('Client X/Y : ' + e.clientX + ', ' + e.clientY)
			}else{
				img.style.removeProperty("opacity");
			}
		}
	},

}
</script>
<style lang="less">
	.card-article-image{
		overflow: hidden;
		width: max-content;
		background-size: 200%;
		background-repeat: no-repeat;
		background-position: center;
		img{
			max-height: 500px;
			display: block;
			background-color: whitesmoke;
		}
	}
</style>