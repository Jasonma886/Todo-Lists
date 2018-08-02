<template>
  <div class="flutter">
    <van-icon name="add-o" @click="$router.push('/writing')" />
  </div>
</template>

<script>
export default {
  name: 'flutter'
}
</script>

<style lang="stylus" scoped>
.flutter {
  position: fixed;
  left: 20px;
  bottom: 50px;
  .van-icon {
    font-size: 30px;
  }
}
</style>
