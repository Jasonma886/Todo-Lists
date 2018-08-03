<template>
<div class="guide">
  <van-nav-bar :title="isRegistered ? 'Sign In' : 'Register'"/>
  <div v-if="!isRegistered" class="register">
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
        <van-field v-if="active === 0" v-model="regInfo.username" placeholder="设置用户名" />
        <van-field v-if="active === 1" v-model="regInfo.password1" placeholder="设置密码" />
        <van-field v-if="active === 2" v-model="regInfo.password2" placeholder="再次输入密码" />
      </van-cell-group>
    </div>
    <div class="button">
      <van-button size="small" v-if="active > 0" @click="active--">上一步</van-button>
      <van-button v-if="active!==3" type="primary" @click="active++">下一步</van-button>
      <van-button v-else @click="register">完成</van-button>
    </div>
  </div>
  <div class="sign-in" v-else>
    <div class="head-img"></div>
    <div><h3>{{userName}}</h3></div>
    <van-cell-group>
      <van-field v-model="logInfo.password" placeholder="输入密码" />
    </van-cell-group>
    <van-button @click="login">Sign In</van-button>
  </div>
</div>
</template>

<script>
import {loginDB} from '../plugins/forage'
import {mapActions, mapState} from 'vuex'
export default {
  name: 'guide',
  data () {
    return {
      isRegistered: false,
      active: 0,
      logInfo: {
        password: ''
      },
      regInfo: {
        username: '',
        password1: '',
        password2: ''
      }
    }
  },
  computed: {
    ...mapState([
      'userName'
    ])
  },
  methods: {
    ...mapActions([
      'signIn',
      'setName'
    ]),
    login () {
      let password = this.logInfo.password
      if (password) {
        loginDB.getItem('password').then(result => {
          if (result === password) {
            this.signIn()
            this.$router.push('/')
          } else {
            this.$toast('Wrong Password!Please try again!')
          }
        })
      } else {
        this.$toast('Please enter the Password')
      }
    },
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
      let {username, password1, password2} = this.regInfo
      if (username && password1 && password2 && password1 === password2) {
        this._register(username, password1)
      } else {
        this.$toast('Please make sure your information correct and commit again!')
      }
    }
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

<style lang="stylus" scoped>
.guide
  .register
    padding: 5px
    .step
      margin-bottom: 10px
    .field
      margin-bottom: 10px
  .sign-in
    .head-img
      width: 60px
      height: 60px
      border-radius 30px
      background-color: palegreen
</style>
