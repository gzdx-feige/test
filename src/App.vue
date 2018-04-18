<template>
  <div id="app">
    <!-- <keep-alive><router-view/></keep-alive> -->
    <router-view/>
    <!-- 呼出菜单按钮 -->
    <div class="iconfont menu-button" @click="menuShowChange">&#xe63c;</div>
    <!-- 菜单 -->
    <transition name="menu">
      <el-menu
        :default-active="currentRoute"
        class="el-menu-vertical-demo main-menu"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        v-show="menuShow"
        :style="{height:$store.state.height+'px'}">
        <el-menu-item index="index" @click="routerTo('/index')">
          <i class="el-icon-menu"></i>
          <span slot="title">去抽奖</span>
        </el-menu-item>
        <el-menu-item index="results" @click="routerTo('/results')">
          <i class="el-icon-document"></i>
          <span slot="title">抽奖结果</span>
        </el-menu-item>
        <el-menu-item index="setting" @click="routerTo('/setting')">
          <i class="el-icon-setting"></i>
          <span slot="title">抽奖设置</span>
        </el-menu-item>
      </el-menu>
    </transition>
    <!-- 菜单呼出时的遮罩层 -->
    <transition name="menu-mask">
      <div class="menu-mask" v-if="menuShow" @click="menuShowChange"></div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  data: function () {
    return {
      menuShow: false,
      currentRoute: 'index'
    }
  },
  created(){
    this.currentRoute = this.$router.currentRoute.name;
  },
  methods: {
    //控制菜单展示关闭
    menuShowChange() {
      this.menuShow = !this.menuShow;
    },
    //路由跳转
    routerTo(path) {
      this.$router.replace(path);
    }
  }
};
</script>

<style>
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html {
  font-size: 10px;
  background: url('./assets/images/body_bg.jpg') top center repeat;
}
body, p, h2 {
  margin: 0;
  padding: 0;
}
/* iconfont 在线图标 */
@font-face {
  font-family: 'iconfont';  /* project id 632364 */
  src: url('//at.alicdn.com/t/font_632364_rm5ylnppqarlik9.eot');
  src: url('//at.alicdn.com/t/font_632364_rm5ylnppqarlik9.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_632364_rm5ylnppqarlik9.woff') format('woff'),
  url('//at.alicdn.com/t/font_632364_rm5ylnppqarlik9.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_632364_rm5ylnppqarlik9.svg#iconfont') format('svg');
}

.iconfont{
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}

/* 左上角菜单按钮 */
.menu-button {
  position: fixed;
  top: 2rem;
  left: 2rem;
  /* background: #fff; */
  color: #bbbbbb;
  cursor: pointer;
  font-size: 2.5rem;
}

/* 菜单 */
.main-menu {
  width: 16rem;
  position: fixed;
  top: 0;
  border-right: none;
  z-index: 3000;
}

/* 菜单展开关闭动画 */
.menu-enter-active, .menu-leave-active {
  transition: left .5s;
}
.menu-enter, .menu-leave-to {
  left: -16rem;
}
.menu-enter-to, .menu-leave {
  left: 0;
}

/* 菜单呼出时的遮罩层 */
.menu-mask {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: #000000;
  opacity: 0.4;
  z-index: 2000;
}

/* 遮罩层动画 */
.menu-mask-enter-active, .menu-mask-leave-active {
  transition: opacity .5s;
}
.menu-mask-enter, .menu-mask-leave-to {
  opacity: 0;
}
.menu-mask-enter-to, .menu-mask-leave {
  opacity: 0.4;
}
</style>
