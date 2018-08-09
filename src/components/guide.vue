<template>
<div class="guide">
  <van-nav-bar :title="isRegistered ? 'Sign In' : 'Register'"/>
  <component :is="componentInstance"></component>
</div>
</template>

<script>
import {loginDB} from '../plugins/forage'
import {mapActions} from 'vuex'
export default {
  name: 'guide',
  data () {
    return {
      isRegistered: false
    }
  },
  computed: {
    componentInstance () {
      let compName = this.isRegistered ? 'login' : 'register'
      return () => import(`./${compName}`)
    }
  },
  methods: {
    ...mapActions([
      'setName'
    ])
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      loginDB.getItem('username').then(result => {
        if (result) {
          vm.isRegistered = true
          vm.setName(result)
        } else {
          vm.isRegistered = false
        }
      }).catch(() => {
        vm.isRegistered = false
      })
    })
  }
}
</script>
