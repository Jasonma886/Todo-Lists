<template>
  <div name="van-slide-bottom">
    <van-button @click="get">get DB</van-button>
    <van-list
      v-model="loading"
      :finished="finished"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item" :title="item + ''" />
    </van-list>
    <Flutter></Flutter>
  </div>
</template>

<script>
import { listsDB } from '../plugins/forage'
import Flutter from '../base/flutter'
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
    listsDB.keys().then(keys => {
      next(vm => {
        vm.listTitles = keys
      })
    })
  }
}
</script>

<style lang="" scoped>

</style>
