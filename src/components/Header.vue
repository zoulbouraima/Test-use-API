<template>
	<div>
		<div id="nav">
			<div class="button-emberger"></div>
			<router-link v-for="item in menus" :key="item.id" :to="item.link">
				{{ item.name }}
			</router-link>
		</div>
		<div class="button-shop"></div>
	</div>
</template>