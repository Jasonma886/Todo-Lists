<template>
  <div class="flutter">
    <van-icon name="add-o" @click="showIcon = !showIcon" />
    <div class="icon-group" v-if="showIcon">
      <div class="icon-inner">
        <div class="icon-div hot">
          <van-icon class="spinner" name="add-o"></van-icon>
        </div>
        <div class="icon-div warm">
          <van-icon class="spinner" name="edit"></van-icon>
        </div>
        <div class="icon-div cold">
          <van-icon class="spinner" name="passed"></van-icon>
        </div>
        <div class="icon-div green">
          <van-icon class="spinner" name="gift"></van-icon>
        </div>
        <div class="icon-div red">
          <van-icon class="spinner" name="close" @click="closeIcon"></van-icon>
        </div>
      </div>
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
  },
  methods: {
    closeIcon () {
      let group = document.getElementsByClassName('icon-group')[0]
      group.className = 'icon-group icon-group-alternet'
      this.showIcon = !this.showIcon
      setTimeout(() => {
        // group.className = 'icon-group'
      }, 1500)
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
    overflow: hidden
    animation showing 1s backwards
    &.icon-group-alternet {
      animation showing 1s backwards alternate
    }
    .icon-inner {
      width: 180px
      .icon-div {
        display: inline-block
        width: 30px
        height: 30px
        border-radius 15px
        text-align: center
        &.hot {
          background-color: #ff9a0e;
        }
        &.cold {
          background-color: #399ae6;
        }
        &.warm {
          background-color: #a34cc3;
        }
        &.green {
          background-color: #22ac38;
        }
        &.red {
          background-color: #dd127b;
        }
        .van-icon {
          font-size: 18px
          line-height: 30px
          color: white
        }
      }
    }
  }
  .spinner {
    animation rotate 1.5s backwards alternate
  }
}
</style>
