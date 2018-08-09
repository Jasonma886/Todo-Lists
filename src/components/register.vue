<template>
  <div class="register">
    <div class="step">
      <van-steps :active="active">
        <van-step>设置用户名</van-step>
        <van-step>设置密码</van-step>
        <van-step>再次输入密码</van-step>
        <van-step>注册完成</van-step>
      </van-steps>
    </div>
    <div class="field">
      <van-cell-group>
        <van-field v-if="active === 0" v-model="username" placeholder="设置用户名" />
        <van-field v-if="active === 1" v-model="password1" placeholder="设置密码" />
        <van-field v-if="active === 2" v-model="password2" placeholder="再次输入密码" />
      </van-cell-group>
    </div>
    <div class="button">
      <van-button size="small" v-if="active > 0" @click="active--">上一步</van-button>
      <van-button v-if="active!==3" type="primary" @click="active++">下一步</van-button>
      <van-button v-else @click="register">完成</van-button>
    </div>
  </div>
</template>

<script>
import {loginDB} from '../plugins/forage'
import {mapActions} from 'vuex'
export default {
  name: 'register',
  data () {
    return {
      active: 0,
      username: '',
      password1: '',
      password2: ''
    }
  },
  methods: {
    ...mapActions([
      'signIn',
      'setName'
    ]),
    _register (name, psw) {
      Promise.all([
        loginDB.setItem('username', name),
        loginDB.setItem('password', psw),
        loginDB.setItem('createTime', +new Date())
      ]).then(results => {
        if (results) {
          this.signIn()
          this.setName(name)
          this.$toast('Register success!')
          setTimeout(() => {
            this.$router.push('/')
          }, 500)
        }
      })
    },
    register () {
      let {username, password1, password2} = this
      if (username && password1 && password2 && password1 === password2) {
        this._register(username, password1)
      } else {
        this.$toast('Please make sure your information correct and commit again!')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .register
    padding: 5px
    .step
      margin-bottom: 10px
    .field
      margin-bottom: 10px
</style>
