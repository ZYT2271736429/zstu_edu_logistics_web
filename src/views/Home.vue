<template>
  <div>
    <el-container>
      <el-header class="homeHeader">
        <div class="title">浙理工后勤信息管理系统</div>
        <div>
          <!--<el-button icon="el-icon-bell" type="text" style="margin-right: 8px;color: #000000;" size="normal"></el-button>-->
          <el-dropdown class="userInfo" @command="commandHandler">
                  <span class="el-dropdown-link">
                    {{user.name}}<i><img :src="user.avatar" alt=""></i>
                  </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="userInfo">个人中心</el-dropdown-item>
              <el-dropdown-item command="setting">修改密码</el-dropdown-item>
              <el-dropdown-item command="logout" divided>注销登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu router unique-opened>
<!--            <el-submenu :index="index+''" v-for="(item,index) in routes" v-if="!item.hidden" :key="index">-->
            <el-submenu :index="index+''" v-for="(item,index) in routes" :key="index">
              <template slot="title">
                <i style="color: #409eff;margin-right: 5px" :class="item.iconCls"></i>
                <span>{{item.name}}</span>
              </template>
              <el-menu-item :index="child.path" v-for="(child,indexj) in item.children" :key="indexj">
                {{child.name}}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path!='/home'">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="homeWelcome" v-if="this.$router.currentRoute.path=='/home'">
            欢迎来到浙江理工大学后勤信息管理系统！
          </div>
          <router-view class="homeRouterView"/>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog
      title="修改密码"
      :visible.sync="showDialog"
      width="30%"
      @close="handleClose"
    >

      <el-form ref="form" :model="form" label-width="80px" size="mini" :rules="rules">
        <el-form-item label="旧密码"  prop="pwd">
          <el-input v-model="form.pwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码"  prop="newPwd">
          <el-input v-model="form.newPwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码"  prop="confirm">
          <el-input v-model="form.confirm" type="password"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
      <el-button @click="showDialog = false" size="small">取 消</el-button>
      <el-button type="primary" size="small" @click="submitForm('form')">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      user: JSON.parse(window.sessionStorage.getItem('user')),
      showDialog: false,
      form: {
        pwd: '',
        newPwd: '',
        confirm: ''
      },
      rules: {
        pwd: { required: true, message: '请输入旧密码', trigger: 'blur' },
        newPwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, trigger: 'blur' }],
        confirm: { required: true, message: '请确认新密码', trigger: 'blur' }
      }
    }
  },
  computed: {
    routes () {
      return this.$store.state.routes
    }
    /* user () {
      return this.$store.state.currentHr
    } */
  },
  methods: {
    commandHandler (cmd) {
      if (cmd === 'logout') {
        this.$confirm('此操作将注销登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.getRequest('/logout')
          window.sessionStorage.removeItem('user')
          window.sessionStorage.removeItem('tokenStr')
          window.sessionStorage.removeItem('auth')
          this.$store.commit('initRoutes', [])
          this.$router.replace('/')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      } else if (cmd === 'userInfo') {
        this.$router.push('/user/user')
      } else if (cmd === 'setting') {
        this.showDialog = true
      }
    },
    handleClose () {
      this.form = {
        pwd: '',
        newPwd: '',
        confirm: ''
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.newPwd === '') {
            this.$message('请输入新密码')
            return false
          } else if (this.form.newPwd.length < 6) {
            this.$message('密码最少为6位')
            return false
          } else if (this.form.newPwd === this.form.pwd) {
            this.$message('新密码不能与旧密码相同')
            return false
          } else if (this.form.confirm === '') {
            this.$message('请输入确认密码')
            return false
          } else if (this.form.confirm !== this.form.newPwd) {
            this.$message('两次输入密码不一致')
            return false
          } else {
            this.getRequest('/user/updatepassword?username=' +
              JSON.parse(window.sessionStorage.getItem('user')).username + '&oldpwd=' + this.form.pwd + '&newpwd=' +
              this.form.confirm).then((response) => {
              this.$message({
                message: '修改成功，请重新登录',
                type: 'success'
              })
              this.$router.replace({ path: '/login' })
              window.sessionStorage.removeItem('user')
              window.sessionStorage.removeItem('tokenStr')
              window.sessionStorage.removeItem('auth')
            })
          }
        } else {
          return false
        }
      })
      /* this.getRequest('/user/updatepassword?username=' +
        JSON.parse(window.sessionStorage.getItem('user')).username + '&oldpwa=' + this.form.pwd + '&newpwd=' +
        this.form.confirm).then((response) => {
        this.$message({
          message: '修改成功，请重新登录',
          type: 'success'
        })
        this.$router.replace({ path: '/login' })
        window.sessionStorage.removeItem('user')
        window.sessionStorage.removeItem('tokenStr')
        window.sessionStorage.removeItem('auth')
      }).catch((error) => {
        this.$message({
          message: error.response.data,
          type: 'error'
        })
      }) */
    }
  }
}
</script>

<style>
    .homeRouterView {
        margin-top: 10px;
    }

    .homeWelcome {
        text-align: center;
        font-size: 30px;
        font-family: 华文行楷;
        color: #409eff;
        padding-top: 50px;
    }

    .homeHeader {
        background-color: #409eff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 15px;
        box-sizing: border-box;
    }

    .homeHeader .title {
        font-size: 30px;
        font-family: 华文行楷;
        color: #ffffff
    }

    .homeHeader .userInfo {
        cursor: pointer;
    }

    .el-dropdown-link img {
        width: 48px;
        height: 48px;
        border-radius: 24px;
        margin-left: 8px;
    }

    .el-dropdown-link {
        display: flex;
        align-items: center;
    }
</style>
