<template>
  <div class="home">
    <van-nav-bar
      left-text="返回"
      right-text=""
      left-arrow
      @click-left="$router.back()"
      @click-right="$toast('hi')"
    />
    <van-cell-swipe v-for="item in todoLists" :key="item.id" :right-width="65">
      <van-cell-group>
        <van-cell :title="item.content" :value="stamp2Time(item.time)" @click="$router.push('/dairy/' + item.time)" />
      </van-cell-group>
      <span slot="right">删除</span>
    </van-cell-swipe>
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
      listTitles: []
    }
  },
  components: {
    Flutter
  },
  mounted () {
  },
  methods: {
    stamp2Time,
    get () {
      listsDB.iterate((value, key, number) => {
        if (value) {
          this.todoLists.push(value)
        }
      }).then(data => {
        console.log(data)
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    let arr = []
    listsDB.iterate((value, key, number) => {
      if (value) {
        arr.push(value)
      }
    }).then(data => {
      next(vm => {
        vm.todoLists = arr
      })
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
</style>
