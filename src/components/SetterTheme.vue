<template>
  <div class="setter-theme">
    <div class="title">Set Theme</div>
    <div class="content">
      <div class="container-toggle">
        <span class="toggle-text">Dark Mode</span>
        <div class="wrapper">
          <div
            class="toggle"
            @click="activeDarkMode()"
            :class="{
              'active-dark-mode': darked,
            }"
          >
            <span></span>
          </div>
        </div>
      </div>
      <div class="container-theme-selector">
        <span>Themes Selector</span>
        <div class="block-theme-color">
          <div
            class="theme-color"
            v-for="item in itemColors"
            :key="item.name"
            :class="{ 'theme-actived': classActive == item.name && !darked}"
          >
            <span
              :data-theme="item.name"
              v-on:click="activeTheme(item.name)"
            ></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      classActive: "default",
      darked: false,
      save: "",
    };
  },
  mounted(){
    this.classActive = localStorage.classActive;
    this.darked      = localStorage.darked == 'true' ? true : false;
  },
  props: {
    itemColors: Array,
    mode: String
  },
  methods: {
    emitToParent: function(data){
      this.$emit('childDefine', data)
    },
    activeTheme: function (name) {
      
      for (let i = 0; i < this.itemColors.length; i++) {
        
        if (this.itemColors[i].name == name) {
          //console.log("le test est ... "+i)
          this.classActive = name;
          // Client-side storage
          localStorage.classActive = this.classActive;
          break;
        }
      }
      if(!this.darked)this.emitToParent(localStorage.classActive);
    },
    activeDarkMode: function () {
      this.darked = !this.darked;
      //Client-side storage
      localStorage.darked = this.darked;

      if(localStorage.darked === "true"){
        this.emitToParent("dark");
      }else{
        this.emitToParent(localStorage.classActive)
      }
    },
  },
};
</script>
<style lang="less" scoped>
.borderB1px {
  border-bottom: 1px solid #fff;
}
.setter-theme {
  background-color: #000;
  color: #fff;
  box-shadow: 0 0 8px 0 @fpc;

  .title {
    padding: 10px;
    font-weight: bold;
    .borderB1px();
  }
  .content {
    padding: 15px;
  }
  .container-toggle {
    display: flex;
    justify-content: space-between;
    padding-bottom: 15px;
    .borderB1px();
    .toggle-text {
      font-size: 12px;
      color: white;
    }
    .wrapper {
      .toggle {
        height: 16px;
        width: 30px;
        cursor: pointer;
        background: #c7c7c7;
        border-radius: 10px;
        position: relative;
        box-shadow: inset 0px 0px 2px 2px #ffffff42;
        span {
          height: 12px;
          width: 12px;
          display: inline-block;
          position: absolute;
          top: 2px;
          left: 3px;
          background-color: #888;
          border-radius: 50%;
          transition: 0.1s;
          transform: translateX(0);
        }
      }
    }
  }
  .container-theme-selector {
    padding-top: 15px;
    .block-theme-color {
      display: flex;
      justify-content: space-around;
      margin-top: 10px;
      .theme-color {
        position: relative;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        padding: 2px;
        cursor: pointer;
        span {
          display: inline-block;
          width: 25px;
          height: 25px;
          border-radius: 50%;
          background-color: var(--primary-color);
          border: 2px solid rgba(162, 162, 162, 0.9);
        }
      }
      .theme-actived {
        span{
          border-color: #fff !important;
        }
        &:after {
          content: "";
          position: absolute;
          top: 1px;
          right: 1px;
          border-radius: 50%;
          width: 10px;
          height: 10px;
          background-color: #07b7b7;
        }
      }
    }
  }
  .active-dark-mode {
    span {
      transform: translateX(12px) !important;
      background-color: black !important;
    }
  }
}
</style>