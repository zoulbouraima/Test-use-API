<template>
	<div :class="theme">
		<div class="home-menu">
			<ul class="menu-list">
				<li class="menu-item" :class="layout" v-for="item in menus" :key="item.id">
					<a :href="item.link" :class="{active: isActive === item.id}" @click="toActive(item.id)">{{ item.name }}</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
  name: 'HomeMenu',
  data() {
	return {
		isActive: 0
	}
  },
  props: {
    menus: Array,
	theme: String,
	colorLink: String,
	layout:{
		type: String,
		default: 'paysage'
	}
  },
  methods: {
	toActive:function(id) {
		this.isActive = id;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.universel{
	margin: 0;
	padding: 0;
}
.home-menu{
	padding: 15px;
	ul.menu-list{
		list-style: none;
		.universel();
		.menu-item{
			padding: 0 10px;
			a{
				font-size: .8em;
				position: relative;
				&::after{
					content: "";
					display: inline-block;
					height: 2px;
					width: 0;
					position: absolute;
					bottom: -2px;
					left: 0;
					background-color: white;
					border-radius: 4px;
					transition: .6s;
				}
				&:hover{
					&:after{
						width: 100%;
					}
				}
			}
		}
	}
}
.paysage{
	display: inline-block;
}
.active{
	color: rgb(214, 214, 214) !important;
}
</style>
