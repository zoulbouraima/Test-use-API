<template>
  <div id="app" :data-theme="$store.state.mode">
    <div id="header">
      <div class="nav">
        <router-link v-for="item in menus" :key="item.id" :to="item.link">
          {{ item.name }}
        </router-link>
      </div>
      <div class="theme-icon" :class="{'theme-icon-actived': isDisplay}" @click="displaySetterTheme()">
        <font-awesome-icon :icon="icons.fillDrip"/>
      </div>
    </div>
    <div class="component-setter-theme" :class="{'setter-theme-displayed': isDisplay}">
      <SetterTheme :itemColors="$store.state.themes" @childDefine="getMode" />
    </div>
    <router-view />
  </div>
</template>

<script>
import SetterTheme from "./components/SetterTheme.vue";
import Icons from "./assets/vendors/font-icons/main.js";
export default {
  data() {
    return {
      isDisplay: false,
      icons: Icons,
      menus: [
        {
          id: 0,
          name: "Accueil",
          link: "/",
        },
        {
          id: 1,
          name: "Shop SPA",
          link: "/shop-spa",
        },
        {
          id: 2,
          name: "À propos",
          link: "/about",
        },
      ],
    };
  },
  mounted(){
    this.$store.state.mode = localStorage.getItem('modeLocal')
  },
  beforeCreate() {
    console.log(Date());
  },
  created() {
    console.log(`${this.menus[0].name} est créé`);
  },
  components: {
    SetterTheme,
  },
  methods: {
    getMode: function(data){
      this.$store.state.mode = data
      localStorage.setItem('modeLocal', this.$store.state.mode)
    },
    displaySetterTheme: function(){
      this.isDisplay = !this.isDisplay
    }
  },
};
</script>

<style lang="less">
@pc: var(--primary-color);
body {
  margin: 0;
}
ul{
  margin: 0 !important;
  padding: 10px !important;
}
* {
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  padding-top: 48px;
}

#header {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 10px 15px;
  background-color: @pc;
  display: flex;
  justify-content: space-between;
  z-index: 99;
  .nav{
    line-height: 1.8;
    a {
      text-decoration: none;
      font-size: 0.8em;
      color: #fff;
      margin: 0 5px;
      position: relative;
      &::after {
        content: "";
        display: inline-block;
        width: 0;
        height: 1px;
        background-color: #fff;
        position: absolute;
        left: 0;
        bottom: -3px;
        transition: 0.6s;
      }
      &:hover {
        &::after {
          width: 100%;
        }
      }

      &.router-link-exact-active {
        &::after {
          width: 100%;
        }
      }
    }
  }
  .theme-icon{
    cursor: pointer;
    width: 25px;
    height: 25px;
    text-align: center;
    line-height: 1.9;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.2);
    color: @pc;
  }
  .theme-icon-actived{
    color: #fff !important;
  }
}
.component-setter-theme {
  right: 0;
  position: fixed;
  z-index: 9;
  width: 250px;
  transition: 0.2s;
  transform: translateY(-200px);
}
.setter-theme-displayed{
  transform: translateY(-5px) !important;
}


</style>
