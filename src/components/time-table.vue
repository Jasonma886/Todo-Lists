<template>
  <div class="time-table">
    <van-nav-bar title="标题" left-text="返回" left-arrow @click-right="commit">
      <van-icon name="upgrade" slot="right" />
    </van-nav-bar>
    <div class="content" style="">
      <div class="table left-part">
        <div class="table-row">
          <div class="table-cell">TIME</div>
        </div>
        <ul class="table-row" v-for="index in timesList" :key="index.id">
          <li class="table-cell">{{index.value}}</li>
        </ul>
      </div>
      <div class="right-part">
        <div class="table">
          <ul class="table-row">
            <li class="table-cell" v-for="j in datesList" :key="j.id">
              <div class="table-head">{{j.value}}</div>
            </li>
          </ul>
          <ul class="table-row" v-for="(index,i) in tableItems" :key="index.id">
            <li class="table-cell" v-for="(value, j) in index" :key="j">
              <button class="icon-button" v-if="value !== -2" @click="changeStatus(i, j)">
                <van-icon v-if="value === -1" name="checked" color="red"></van-icon>
                <van-icon v-else-if="value === 1" name="checked" color="green"></van-icon>
                <van-icon v-else-if="value === 0" name="checked" color="gray"></van-icon>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {timesList, datesList} from '../utils/time'
import {doneDB} from '../plugins/forage'

export default {
  name: 'TimeTable',
  data () {
    return {
      timesList,
      datesList,
      doneList: {},
      tableItems: []
    }
  },
  computed: {
  },
  mounted () {
    let arr = {}
    doneDB.iterate((value, key, number) => {
      if (key) {
        arr[key] = value
      }
    }).then(result => {
      this.doneList = JSON.parse(JSON.stringify(arr))
      this.init()
    })
  },
  methods: {
    init () {
      let now = +new Date()
      let arr = this.timesList.map(value => {
        let {stamp} = value
        let temp = this.datesList.map(item => {
          let stamp2 = item.stamp
          if (now < stamp + item.stamp) {
            return -2
          }
          if (this.doneList[stamp2]) {
            return this.doneList[stamp2][stamp]
          }
          return 0
        })
        return temp
      })
      this.tableItems = arr
    },
    commit () {
      this.datesList.forEach((value, index) => {
        if (value.changed) {
          let temp = {}
          this.timesList.forEach((value2, index2) => {
            temp[value2.stamp] = this.tableItems[index2][index]
          })
          doneDB.setItem(value.stamp, temp).then(result => {
            this.$toast('DONE!!!')
          })
        }
      })
    },
    changeStatus (i, j) {
      let result = 0
      this.datesList[j].changed = true
      if (this.tableItems[i][j] === -1) {
        result = 0
      } else if (this.tableItems[i][j] === 0) {
        result = 1
      } else {
        result = -1
      }
      this.$set(this.tableItems[i], j, result)
    }
  },
  beforeRouteEnter (to, from, next) {
    next()
  }
}
</script>

<style lang="stylus" scoped>
.time-table {
  .content {
    height: 85vh
    overflow: auto
    margin: auto;
    width: 96%;
    .table {
      display: table
      float: left
      .table-head {
        width: 64px
      }
      .table-column {
        display: table-column;
        &:nth-child(2n+1) {
          background-color: #e9e9e9
        }
        &:nth-child(2n) {
          background-color: #fff
        }
        .table-cell {
          display: table-cell
          height: 30px;
          vertical-align: middle;
        }
      }
      .table-row {
        display: table-row
        &:nth-child(2n+1) {
          background-color: #e9e9e9
        }
        &:nth-child(2n) {
          background-color: #fff
        }
        .table-cell {
          display: table-cell
          height: 30px;
          vertical-align: middle;
        }
      }
    }
    .icon-button {
      height: 30px
      background-color: transparent
      border: none
    }
    .left-part {
      width: 13%
      border-right 1px solid #ddd
    }
    .right-part {
      float: left
      width: 86%
      overflow auto
    }
  }
}
</style>
