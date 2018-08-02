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

  </div>
</div>
</template>

<script>
import {loginDB} from '../plugins/forage'
import {mapActions} from 'vuex'
export default {
  name: 'guide',
  data () {
    return {
      isRegistered: false,
      active: 0,
      regInfo: {
        username: '',
        password1: '',
        password2: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'signIn'
    ]),
    login () {
      this.signIn()
      this.$router.push('/')
      // let {username, password} = this.loginInfo
      // if (username && password) {
      //   loginDB.getItem(username).then(data => {
      //     if (data) {
      //       if (data.password === password) {
      //         this.signIn()
      //         this.$router.push('/')
      //       } else {
      //         this.$toast('The username or password is not correct, please try again!')
      //       }
      //     } else {
      //       this.$toast('This username is not existed!')
      //     }
      //   }).catch(() => {
      //     this.$toast('Sign in failed. Please try again!')
      //   })
      // }
    },
    _register (name, psw) {
      Promise.all([
        loginDB.setItem('username', name),
        loginDB.setItem('password', psw),
        loginDB.setItem('createTime', +new Date())
      ]).then(results => {
        if (results) {
          this.signIn()
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
        } else {
          vm.isRegistered = false
        }
      }).catch(err => {
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
</style>
