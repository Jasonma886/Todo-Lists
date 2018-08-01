<template>
  <div>
    <van-button @click="get">get DB</van-button>
    <ul>
      <li v-for="item in todoLists" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
import { listsDB as forage } from '../plugins/forage'
export default {
  name: 'index',
  data () {
    return {
      todoLists: []
    }
  },
  mounted () {
  },
  methods: {
    get () {
      forage.iterate((value, key, number) => {
        if (value) {
          this.todoLists.push(value)
        }
      }).then(data => {
        console.log(data)
      })
    }
  }
}
</script>

<style lang="" scoped>

</style>
