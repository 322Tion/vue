<template>

<el-container class="home-container">
<!-- 头部区域 -->
  <el-header>
    <div>
    <img src="../assets/logo.png" alt="none" class="header-img">
    <span>电商管理后台</span>
    </div>
  <el-button type="info" @click="logout">退出</el-button>
  </el-header>
<!-- 页面主体区域 -->
  <el-container>
<!-- 侧边栏 -->
    <el-aside :width="isCollapse ? '64px' : '200px'">
      <div class="toggle-button" @click="toggleCollapse">|||</div>
<!-- 一级菜单 -->
      <el-menu
            background-color="#313743"
            text-color="#fff"
            active-text-color="#3b96fc"
            unique-opened="true"
            :collapse="isCollapse"
            :collapse-transition="false"
            :router="true"
            :default-active="activePath">
            <!-- 列表保持高亮:
             1、在父级动态获取属性
             2、绑定点击事件，获取动态属性
             3、给事件保存激活状态
             4、保存激活的链接地址-->
            <!-- 数值与空字符串拼接得到一个字符串 -->
            <el-submenu :index="item.id+''"
            v-for="item in menulist"
            :key="item.id">
              <template slot="title">
                <!-- 图标 -->
                <i :class="iconsObj[item.id]"></i>
                <span>{{item.authName}}</span>
              </template>
<!-- 二级菜单 -->
                <el-menu-item :index="'/' + subItem.path"
                v-for="subItem in item.children"
                :key="subItem.id"
                @click="saveNavState('/' + subItem.path)">
                  <template slot="title">
                <!-- 图标 -->
                    <i class="el-icon-menu"></i>
                    <span>{{subItem.authName}}</span>
                </template>
                </el-menu-item>
              </el-submenu>
          </el-menu>
    </el-aside>
<!-- 右侧主体区域 -->
    <el-main>
    <router-view></router-view>
    </el-main>
  </el-container>
</el-container>

</template>

<script>
export default {
  data () {
    return {
      // 左侧菜单数据
      menulist: [],
      iconsObj: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      },
      // 是否折叠
      isCollapse: false,
      // 被激活的链接地址
      activePath: ''
    }
  },
  // 获取左侧列表菜单
  created () {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  // 退出功能
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 异步获取所有菜单
    async getMenuList () {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist = res.data
      console.log(res)
    },
    // 点击按钮，菜单折叠与展开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang='less' scoped>
.home-container {
  height: 100%
}
.el-header {
  background-color: #363d40;
  display: flex;
  justify-content:space-between;
  padding-left: 0;
  align-items: center;
  color: #eee;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
  .header-img {
  width: 50px;
  height: 30px;
  }
}

.el-aside {
  background-color: #313743;
  .el-menu {
    border-right: 0;
  }
  i {
    padding-right: 10px;
  }
}

.el-main {
  background-color: #eaedf1;
}

.toggle-button {
  background-color: #4A5064;
  font-size: 10px;
  line-height: 24px;
  color: #eee;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
