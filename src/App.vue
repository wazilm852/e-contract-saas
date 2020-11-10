<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      la_id: "",
      nowurl: "",
    }
  },
  created() {
    this.linktab();
  },
  methods: {
    linktab() {
      let goUrl = this.isMobile();
      if (goUrl === 1) {
        //移动端地址
        // location = "http://127.0.0.1:8043";
      } else {
        //PC地址
        // location = "http://" + this.nowurl + ".xihuanfang.com/activityinfo/" + this.la_id + ".html";
      }
    },
    isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      let goUrl = flag ? 1 : 0;
      return goUrl;
    },
  }
}
</script>>
<style lang="less">
@import "assets/style/reset.css";
html, body{
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
