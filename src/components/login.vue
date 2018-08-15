<template>
  <div class="sign-in">
    <div class="head-img"></div>
    <div><h3>{{userName}}</h3></div>
    <van-cell-group>
      <van-field v-model="password" type="password" placeholder="输入密码" />
    </van-cell-group>
    <van-button class="sign-btn" @click="login">Sign In</van-button>
  </div>
</template>

<script>
import {loginDB} from '../plugins/forage'
import {mapActions, mapState} from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      password: ''
    }
  },
  computed: {
    ...mapState([
      'userName'
    ])
  },
  methods: {
    ...mapActions([
      'signIn'
    ]),
    login () {
      let password = this.password
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
    }
  }
}
</script>

<style lang="stylus" scoped>
  .sign-in
    text-align: center
    .head-img
      width: 60px
      height: 60px
      margin: 15px auto;
      border-radius 30px
      background-color: palegreen
    .sign-btn
      margin-top: 10px
      width: 50%
</style>
