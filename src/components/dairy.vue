<template>
  <div class="dairy">
    <van-nav-bar
      title="查看项目"
      left-text="返回"
      :right-text="buttonText"
      left-arrow
      @click-left="$router.back()"
    >
      <div slot="right">
        <van-icon name="edit" v-if="isEditing" @click="editing"></van-icon>
        <van-icon name="passed" color="green" v-else @click="saving"></van-icon>
      </div>
    </van-nav-bar>
    <van-cell-group>
      <van-field
        v-model="listInfo.content"
        type="textarea"
        :disabled="isEditing"
        placeholder="写些什么...."
        rows="25"
      />
    </van-cell-group>
    <div v-if="isModified" class="update-notice">
      <span class="content">上次修改时间： {{stamp2Time(listInfo.updateTime)}}</span>
    </div>
  </div>
</template>

<script>
import {listsDB} from '../plugins/forage'
import {stamp2Time} from '../utils/time'
export default {
  name: 'dairy',
  data () {
    return {
      contents: '',
      listInfo: {},
      isEditing: true,
      listID: '',
      buttonText: '编辑',
      isModified: false //  是否修改过
    }
  },
  methods: {
    stamp2Time,
    editing () {
      this.buttonText = '保存'
      this.isEditing = false
    },
    saving () {
      this.isEditing = true
      this.listInfo.updateTime = +new Date()
      listsDB.setItem(this.listID, this.listInfo).then(result => {
        if (result) {
          this.$toast('DONE!')
          this.$router.back()
        }
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    let key = to.params.value
    next(vm => {
      vm.listID = key
      listsDB.getItem(key).then(result => {
        if (result) {
          vm.listInfo = result
          if (result.updateTime) {
            vm.isModified = true
          }
        }
      })
    })
  }
}
</script>

<style lang="stylus" scoped>
  .dairy
    background-image: url(../assets/diary.png)
    background-size: cover
    background-repeat: no-repeat
    height: 100vh;
    overflow: scroll;
    .update-notice
      position: absolute
      bottom: 30px
      width: 100vw
      left: 50%
      margin-left: -50%
      font-size: 12px
      .content
        background-color: rgba(150,150,150,0.7)
        display: inline-block
        padding: 3px 8px
        border-radius 8px
</style>
<style lang="stylus">
  .dairy
    .van-cell-group
      background-color: transparent
      .van-cell
        background-color: transparent
</style>
