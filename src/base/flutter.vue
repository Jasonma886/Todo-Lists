<template>
  <div class="flutter">
    <van-icon name="add-o" @click="showIcon = !showIcon" />
    <div class="icon-group" v-if="showIcon">
      <van-icon class="test" name="edit"></van-icon>
      <van-icon class="test" name="edit"></van-icon>
      <van-icon class="test" name="edit"></van-icon>
      <van-icon class="test" name="edit"></van-icon>
      <van-icon class="test" name="edit"></van-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'flutter',
  data () {
    return {
      showIcon: false
    }
  }
}
</script>

<style lang="stylus" scoped>
@keyframes rotate {
  from {
    transform rotate(0)
  }
  to {
    transform: rotate(360deg)
  }
}
@keyframes showing {
  from {
    width: 0
  }
  to {
    width: 180px
  }
}
.flutter {
  position: fixed;
  left: 20px;
  bottom: 50px;
  .van-icon {
    font-size: 30px
  }
  .icon-group {
    display: inline-block
    animation showing 1.5s backwards
  }
  .test {
    animation rotate 1.5s backwards
  }
}
</style>
