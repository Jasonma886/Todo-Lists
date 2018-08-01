<template>
  <div class="login">
    <van-tabs swipeable>
      <van-tab title="Sign in">
        <van-cell-group>
          <van-field
            v-model="loginInfo.username"
            required
            clearable
            label="用户名"
            placeholder="请输入用户名"
            @click-icon="loginInfo.username=''"
          />

          <van-field
            v-model="loginInfo.password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            required
          />
          <van-button type="primary" @click="login">Sign in</van-button>
        </van-cell-group>
      </van-tab>
      <van-tab title="Register">
        <van-cell-group>
          <van-field
            v-model="registerInfo.username"
            required
            clearable
            label="用户名"
            placeholder="请输入用户名"
            @click-icon="registerInfo.username=''"
          />
          <van-field
            v-model="registerInfo.password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            required
          />
          <van-button type="default" @click="register">Register</van-button>
        </van-cell-group>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {loginDB} from '../plugins/forage'
export default {
  name: 'login',
  data () {
    return {
      loginInfo: {
        username: '',
        password: ''
      },
      registerInfo: {
        username: '',
        password: '',
        password2: ''
      }
    }
  },
  methods: {
    login () {
      let {username, password} = this.loginInfo
      if (username && password) {
        loginDB.getItem(username).then(data => {
          if (data) {
            if (data.password === password) {
              this.$router.push('/')
            } else {
              this.$toast('The username or password is not corrected, please try again!')
            }
          } else {
            this.$toast('This username is not existed!')
          }
        }).catch(() => {
          this.$toast('Sign in failed. Please try again!')
        })
      }
    },
    _register () {
      let {username, password} = this.registerInfo
      let now = +new Date()
      let info = {
        username,
        password,
        createTime: now
      }
      loginDB.setItem(username, info).then(res => {
        if (res) {
          this.$toast('Register success!')
        }
      })
    },
    register () {
      loginDB.keys().then(keys => {
        if (keys && keys.length > 0) {
          if (keys.includes(this.registerInfo.username)) {
            this.$toast('This username has been used! please try another username!')
          } else {
            this._register()
          }
        } else {
          this._register()
        }
      })
    }
  }
}
</script>

<style lang="" scoped>

</style>
