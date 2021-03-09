<template>
  <!--登录表单的容器-->
  <div class="login_container">
    <!--登录区域-->
    <div class="login_box">
      <!--头像-->
      <div class="avatar_box">
        <img src="../assets/img/timg.gif">
      </div>
      <!--表单-->
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="0px" class="login_form"  v-loading="loading"
               element-loading-text="正在加载中"
               element-loading-spinner="el-icon-loading"
               element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入学号" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入密码" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item prop="verifyCode">
          <div class="verifyCode_box">
            <el-input v-model="loginForm.verifyCode" placeholder="请输入手机验证码" prefix-icon="el-icon-mobile" class="verifyCode"></el-input>
            <img src="../assets/img/msFXK1.gif" alt="" class="verifyCode_img">
          </div>
        </el-form-item>
        <el-form-item class="login_btn">
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loading: false,
      loginForm: {
        username: '2017329621184',
        password: '123456',
        verifyCode: '123456'
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ],
        verifyCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /* 验证吗在视频007, 5:16可以做 */
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          /* push可以回退 */
          /* replace不可以回退 */
          this.postRequest('/login', this.loginForm).then(res => {
            if (res) {
              this.loading = false
              // 存储用户token
              const tokenStr = res.data.token
              window.sessionStorage.setItem('tokenStr', tokenStr)
              const user = res.data.user
              // sessionStorage只能存字符串
              window.sessionStorage.setItem('user', JSON.stringify(user))
              const auth = res.data.auth
              window.sessionStorage.setItem('auth', JSON.stringify(auth))
              this.$router.replace('/home')
            }
          })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
  .login_container {
    height: 100%;
    background-color: aquamarine;
  }

  .login_box {
    width: 450px;
    height: 380px;
    background-color: #FFFFFF;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .avatar_box{
      width: 130px;
      height: 130px;
      border: 1px solid #EEEEEE;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      margin: -65px auto;
      background-color: #FFFFFF;

      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #EEEEEE;
      }
    }

    .login_form{
      position: absolute;
      bottom: 0px;
      width: 100%;
      padding: 0px 20px;
      box-sizing: border-box;

      .login_btn{
        display: flex;
        justify-content: flex-end;
      }

      .verifyCode_box{
        display: flex;
        .verifyCode{
          width: 70%;
          justify-content: left;
        }

        .verifyCode_img{
          width: 30%;
          height: 45px;
          justify-content: flex-end;
        }
      }
    }
  }
</style>
