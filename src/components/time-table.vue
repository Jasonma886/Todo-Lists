<template>
  <div class="time-table">
    <van-nav-bar title="标题" left-text="返回" left-arrow>
      <van-icon name="search" slot="right" />
    </van-nav-bar>
    <div class="content" style="">
      <div class="table left-part">
        <div class="table-row">
          <div class="table-cell">TIME</div>
        </div>
        <ul class="table-row" v-for="index in timesList" :key="index">
          <li class="table-cell">{{index}}</li>
        </ul>
      </div>
      <div class="right-part">
        <div class="table">
          <ul class="table-row">
            <li class="table-cell" v-for="j in datesList" :key="j.id">
              <div class="table-head">{{j}}</div>
            </li>
          </ul>
          <ul class="table-row" v-for="index in timesList.length" :key="index">
            <li class="table-cell" v-for="j in datesList.length" :key="j">{{j}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {timesList, datesList} from '../utils/time'
export default {
  name: 'TimeTable',
  data () {
    return {
      timesList,
      datesList: datesList()
    }
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
