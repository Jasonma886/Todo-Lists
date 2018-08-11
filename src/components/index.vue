<template>
  <div class="home">
    <van-nav-bar
      left-text="返回"
      right-text=""
      left-arrow
      @click-left="$router.back()"
      @click-right="$toast('hi')"
    />
    <!--this.refreshList(this.start, this.end)-->
    <!--<van-pull-refresh>-->
      <van-list v-model="isScrollToEnd" @load="onLoad" :finished="finished">
        <van-cell-swipe v-for="item in todoLists" :key="item.key" :right-width="65">
          <van-cell-group>
            <van-cell :title="item.content" :value="stamp2Time(item.time)" @click="$router.push('/dairy/' + item.time)" />
          </van-cell-group>
          <span slot="right" @click="deleteItem(item)">删除</span>
        </van-cell-swipe>
      </van-list>
    <!--</van-pull-refresh>-->
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
      start: 0,
      end: 10,
      finished: false,
      isLoading: false, // 是否触发下拉刷新
      isScrollToEnd: false // 是否滚动到底部
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
    refreshList (start = 0, end = 10) {
      let arr = []
      listsDB.iterate((value, key, number) => {
        if (value && number > start && number <= end) {
          Object.assign(value, {key})
          arr.push(value)
        } else if (number > end) {
          return arr
        }
      }).then(data => {
        if (!data) {
          data = arr
          this.finished = true
        }
        this.todoLists.push(...data)
        this.start = start + 10
        this.end = end + 10
        this.isScrollToEnd = false
        setTimeout(() => {
          this.isLoading = false
        }, 800)
      }).catch(() => {
        setTimeout(() => {
          this.isLoading = false
        }, 800)
      })
    },
    // 滚动至底部触发
    onLoad () {
      this.$toast('touch the bottom.')
      this.refreshList(this.start, this.end)
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // vm.refreshList()
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
    .van-list
      overflow: auto
      height: 55vh
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
