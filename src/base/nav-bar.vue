<template>
  <van-tabbar v-model="active" @change="$toast('change')">
    <van-tabbar-item icon="wap-home" to="/"></van-tabbar-item>
    <van-tabbar-item icon="chat" to="/timeTable"></van-tabbar-item>
    <van-tabbar-item icon="records"></van-tabbar-item>
    <van-tabbar-item icon="gold-coin"></van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang="" scoped>

</style>
