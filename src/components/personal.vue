<template>
  <div class="personal">
    <div class="avatar">
      <div class="circle"></div>
      <div><h4>{{userName}}</h4></div>
    </div>
    <van-cell-group>
      <van-cell title="修改昵称" is-link @click="showUserName = true" />
      <van-cell title="修改密码" @click="showPassword = true" is-link />
      <van-cell title="清除数据" is-link @click="clearData" />
    </van-cell-group>
    <van-button class="exit-btn" size="large" type="danger" @click="exit">退出登录</van-button>
    <!--修改密码弹窗-->
    <van-dialog
      v-model="showPassword"
      show-cancel-button
      @confirm="confirmPassword"
    >
      <van-field
        v-model="password.old"
        type="password"
        label="旧密码"
        placeholder="请输入密码"
      />
      <van-field
        v-model="password.new1"
        type="password"
        label="新密码"
        placeholder="请输入新密码"
      />
      <van-field
        v-model="password.new2"
        type="password"
        label="再次输入密码"
        placeholder="确认新密码"
      />
    </van-dialog>
    <!--更改用户名弹窗-->
    <van-dialog
      v-model="showUserName"
      show-cancel-button
      @confirm="changeUserName"
    >
      <van-field
        v-model="newName"
        label="新名字"
        placeholder="请输入新的名字"
      />
    </van-dialog>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import {loginDB, listsDB} from '../plugins/forage'
export default {
  name: 'personal',
  data () {
    return {
      showPassword: false,
      password: {
        old: '',
        new1: '',
        new2: ''
      },
      showUserName: false,
      newName: ''
    }
  },
  computed: {
    ...mapState([
      'userName'
    ])
  },
  methods: {
    ...mapActions([
      'setName',
      'signIn'
    ]),
    confirmPassword () {
      let {old, new1, new2} = this.password
      let flag = old && new1 && new2 && old !== new1 && new1 === new2
      if (flag) {
        loginDB.getItem('password').then(result => {
          if (result === old) {
            loginDB.setItem('password', new1).then(res => {
              this.$toast('Have been changed!')
              this.password = {
                old: '',
                new1: '',
                new2: ''
              }
            })
          } else {
            this.$toast('Wrong password!Please try again!')
          }
        })
      } else {
        this.$toast('Sorry. It\'s not correct!')
      }
    },
    changeUserName () {
      loginDB.setItem('username', this.newName).then(result => {
        if (result) {
          this.setName(this.newName)
          this.$toast('Change success!!!')
        }
      })
    },
    clearData () {
      this.$dialog.confirm({
        title: '',
        message: '确定清除所有数据吗？'
      }).then(result => {
        listsDB.clear().then(() => {
          this.$toast('Everything is cleared!!!')
        })
      })
    },
    exit () {
      this.signIn(false)
      this.$router.push('/guide')
    }
  }
}
</script>

<style lang="stylus" scoped>
.personal {
  .avatar {
    text-align: center
    display: table;
    height: 160px
    width: 100%;
    vertical-align: middle;
    .circle {
      width: 60px
      height: 60px
      margin: 15px auto;
      border-radius 30px
      background-color: palegreen
    }
  }
  .exit-btn {
    margin: 10px auto
    display: block
    width: 90%
  }
}
</style>
