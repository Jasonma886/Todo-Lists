<template>
  <div id="app">
    <div class="first-open upper-part"></div>
    <div class="first-open down-part"></div>
    <router-view name="head"></router-view>
    <transition name="van-fade">
      <router-view/>
    </transition>
    <nav-bar></nav-bar>
  </div>
</template>

<script>
import NavBar from './base/nav-bar'
export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style lang="stylus">
@keyframes move-up {
  from {
    top: 0
    display: block
  }
  to {
    top: -50%
    display: none
  }
}

@keyframes move-down {
  from {
    bottom 0
    display: block
  }
  to {
    bottom -50%
    display: none
  }
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  height: 100vh;
  background-color: #E6CDF7;
  .first-open {
    position: absolute
    width: 100%
    height: 50%
    background-size: cover;
    background-repeat: no-repeat;
    z-index: 999
  }
  .upper-part {
    top 0
    background-image: url(./assets/up.png)
    animation move-up 2s forwards
  }
  .down-part {
    bottom 0
    background-image: url(./assets/down.png)
    animation move-down 2s forwards
  }
}
</style>
