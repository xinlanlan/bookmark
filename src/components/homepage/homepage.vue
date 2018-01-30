<template>
  <div class="homepage">
    <div class="footer" @click.stop>
      <div v-if="item.status"
           @click="_getFunc(item.configId, index)"
           v-for="(item, index) in menu"
           :class="{active: funcActive[index]}"
           class="footer-item"
           ref="footerItem"
      >
        <div class="icon" :class="[menuIcon[item.name]]"></div>
        <div class="text">{{item.name}}</div>
        <ul class="func" v-if="funcActive[index] && func[index]">
          <li v-if="cell.status"
              v-for="cell in func[index]"
              @click.stop="goNextPage(cell.detail)"
              class="func-item"
          >{{cell.name}}</li>
        </ul>
      </div>
      <!--<div class="footer-item">
        <div class="icon position active"></div>
        <div class="text">职位</div>
        <ul class="func">
          <li class="func-item">每周大事</li>
          <li class="func-item">职位说明书</li>
        </ul>
      </div>
      <div class="footer-item">
        <div class="icon read"></div>
        <div class="text">阅读</div>
      </div>
      <div class="footer-item">
        <div class="icon test"></div>
        <div class="text">考试</div>
      </div>
      <div class="footer-item">
        <div class="icon personal"></div>
        <div class="text">个人中心</div>
      </div>-->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {ERR_OK} from 'api/config'
  import {getMenu} from './page'
  const FIRSTCONFIGID = 0
  const PERSONALPAGE = 3

  export default {
    data() {
      return {
        menu: [],
        func: [],
        funcActive: [false, false, false, false],
        menuIcon: {
          '职位': 'position',
          '阅读': 'read',
          '考试': 'test',
          '个人中心': 'personal'
        }
      }
    },
    created() {
      this._getMenu(FIRSTCONFIGID)
      document.addEventListener('click', (e) => {
        for (let i = 0; i < this.funcActive.length; i++) {
          this.funcActive.splice(i, 1, false)
        }
      })
    },
    methods: {
      goNextPage(url) {
        let type = url.split('=')[1]
        url = url.slice(url.lastIndexOf('/'), url.lastIndexOf('.'))
        let obj = null

        if (type) {
          obj = {path: url, query: {type: type}}
        } else {
          obj = {path: url}
        }
        this.$router.push(obj)
      },
      _getFunc(configId, index) {
        // 如果点击的是个人中心
        if (index === PERSONALPAGE) {
          this.$router.push({
            path: '/personal'
          })
          return
        }

        // 点击菜单改变激活状态颜色
        for (let i = 0; i < this.funcActive.length; i++) {
          if (i === index) {
            this.funcActive.splice(index, 1, !this.funcActive[index])
          } else {
            this.funcActive.splice(i, 1, false)
          }
        }

        // 获取二级菜单
        if (!this.func[index]) {
          getMenu(configId).then((res) => {
            if (res.code === ERR_OK) {
              this.func.splice(index, 0, res.list)
            }
          })
        }
      },
      _getMenu(configId) {
        // 获取一级菜单
        getMenu(configId).then((res) => {
          if (res.code === ERR_OK) {
            this.menu = res.list
            this.func.length = res.list.length
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .homepage
    position: relative
    width: 100%
    height: 100%
    background: url("./homepage.png") no-repeat
    background-size: 100% 100%
  .footer
    position: absolute
    display: flex
    width: 100%
    height: 100px
    left: 0
    bottom: 0
    background-color: #fff
    .footer-item
      position: relative
      flex: 1
      text-align: center
      cursor: pointer
      .text
        line-height: 34px
        font-size: 24px
      .icon
        width: 50px
        height: 50px
        margin: 5px auto
        &.position
          background: url("homepageIcon.png") no-repeat
          background-position: -18px -84px
        &.read
          background: url("homepageIcon.png") no-repeat
          background-position: -113px -83px
        &.test
          background: url("homepageIcon.png") no-repeat
          background-position: -291px -84px
        &.personal
          background: url("homepageIcon.png") no-repeat
          background-position: -380px -83px
      &.active
        .position
          background-position: -18px -5px
      &.active
        .read
          background-position: -113px -5px
      &.active
        .test
          background-position: -291px -5px
      &.active
        .personal
          background-position: -380px -5px
      .func
        position: absolute
        width: 100%
        bottom: 115px
        left: 0
        border-radius: 8px
        box-shadow: 0 0 16px rgba(0,0,0,.5)
        background-color: #fff
        &:before,&:after
          position: absolute
          left: 50%
          content: ''
          overflow: hidden
          pointer-events: none
          background-color: #fff
        &:before
          width: 14px
          height: 14px
          margin-left: -7px
          bottom: -7px
          transform: rotate(45deg)
          box-shadow: 0 0 16px rgba(0,0,0,.5)
        &:after
          width: 50px
          height: 20px
          bottom: 0
          margin-left: -25px
        .func-item
          height: 70px
          line-height: 70px
          border-bottom: 1px solid #e7e7e7
          &:last-child
            border-bottom: none
</style>
