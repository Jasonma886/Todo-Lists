<template>
  <div class="home">
    <van-nav-bar
      left-text="返回"
      right-text=""
      left-arrow
      @click-left="$router.back()"
      @click-right="$toast('hi')"
    />
    <van-pull-refresh v-model="isLoading" @refresh="refreshList">
      <van-cell-swipe v-for="item in todoLists" :key="item.id" :right-width="65">
        <van-cell-group>
          <van-cell :title="item.content" :value="stamp2Time(item.time)" @click="$router.push('/dairy/' + item.time)" />
        </van-cell-group>
        <span slot="right" @click="deleteItem(item)">删除</span>
      </van-cell-swipe>
    </van-pull-refresh>
    <Flutter></Flutter>
  </div>
</template>

<script>
import { listsDB } from '../plugins/forage'
import Flutter from '../base/flutter'
import {stamp2Time} from '../utils/time'
export default {
  name: 'index',
  data () {
    return {
      todoLists: [],
      listTitles: [],
      isLoading: false
    }
  },
  components: {
    Flutter
  },
  mounted () {
  },
  methods: {
    stamp2Time,
    // 删除项目
    deleteItem (item) {
      let {key} = item
      listsDB.removeItem(key).then(() => {
        this.$toast('Done!!!')
        this.refreshList()
      }).catch(err => {
        this.$toast(err)
      })
    },
    refreshList () {
      let arr = []
      listsDB.iterate((value, key, number) => {
        if (value) {
          Object.assign(value, {key})
          arr.push(value)
        }
      }).then(data => {
        this.todoLists = arr
        setTimeout(() => {
          this.isLoading = false
        }, 800)
      }).catch(() => {
        setTimeout(() => {
          this.isLoading = false
        }, 800)
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.refreshList()
    })
  }
}
</script>

<style lang="stylus" scoped>
.home
  text-align: left
</style>
<style lang="stylus">
  .home
    .van-cell__value
      color: #666
      font-size: 12px
    .van-cell__title
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    .van-pull-refresh
      height: 85vh
</style>

<style>
  .van-cell-swipe__right {
    right: 0;
    -webkit-transform: translate3d(100%,0,0);
    transform: translate3d(100%,0,0);
    color: #FFFFFF;
    font-size: 15px;
    width: 65px;
    height: 44px;
    display: inline-block;
    text-align: center;
    line-height: 44px;
    background-color: #F44;
  }
</style>
