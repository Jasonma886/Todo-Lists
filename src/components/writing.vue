<template>
  <div class="writing">
    <van-nav-bar
      title="添加项目"
      left-text="返回"
      right-text="保存"
      left-arrow
      @click-left="$router.back()"
      @click-right="save"
    />
    <van-cell-group>
      <van-field
        v-model="content"
        type="textarea"
        placeholder="写些什么...."
        rows="25"
      />
    </van-cell-group>
  </div>
</template>

<script>
import { listsDB } from '../plugins/forage'
export default {
  name: 'writing',
  data () {
    return {
      content: '',
      title: ''
    }
  },
  methods: {
    save () {
      let time = +new Date()
      listsDB.setItem(time, {
        time,
        content: this.content,
        title: this.title
      }).then(result => {
        if (result) {
          this.$toast('Saved success!')
          setTimeout(() => {
            this.$router.back()
          }, 500)
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .writing {
    background-image: url(../assets/diary.png)
    background-size: cover
    background-repeat: no-repeat
    height: 100vh;
    overflow: scroll;
  }
</style>
<style lang="stylus">
  .writing
    .van-cell-group
      background-color: transparent
      .van-cell
        background-color: transparent
</style>
