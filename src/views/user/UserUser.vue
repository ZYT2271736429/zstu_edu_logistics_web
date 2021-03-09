<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover">
          <el-row >
            <el-col :span="24" class="prop-center">
              <el-upload
                class="avatar-uploader"
                action="http://localhost:8080/api/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess">
                <img style="width: 100px;height: 100px"  v-if="info.imageUrl" :src="info.imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="prop-center">
              <span>{{info.name}}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="prop-center" style="margin-top: 4px">
              <span style="font-size: .8em; color: gray;">{{this.auth}}</span>
            </el-col>
          </el-row>
          <el-row class="info">
            <el-col :span="24">
              <el-row :gutter="10">
                <el-col :span="2"><i class="el-icon-s-custom"></i></el-col>
                <el-col :span="22">{{info.jobNum}}</el-col>
              </el-row>

              <el-row :gutter="10">
                <el-col :span="2"><i class="el-icon-phone"></i></el-col>
                <el-col :span="22">{{info.phoneNum}}</el-col>
              </el-row>

              <el-row :gutter="10" >
                <el-col :span="2"><i class="el-icon-user-solid"></i></el-col>
                <el-col :span="22" >
                  <i v-if="info.gender == 0" style="color:#409eff " class="el-icon-male"></i>
                  <i v-if="info.gender == 1" style="color:#f33d91 " class="el-icon-female"></i>
                </el-col>
              </el-row>
              <el-divider></el-divider>
              <el-row>
                <el-col :span='2'>
                  <i class="el-icon-coordinate"></i>
                </el-col>
                <el-col :span='22'>
                  {{info.roomNo}} 房间
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </el-col>

      <el-col :span="16">
        <el-tabs value ="first">
          <el-tab-pane label="基本信息" name="first">
            <el-col :span="20">
              <el-form ref="form" :model="form" label-width="80px" size="small">
                <el-form-item label="姓名">
                  <el-input v-model="form.name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                  <el-radio-group v-model="form.gender">
                    <el-radio :label="0">男</el-radio>
                    <el-radio :label="1">女</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="学号">
                  <el-input v-model="form.jobNum" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                  <el-input v-model="form.phoneNum"></el-input>
                </el-form-item>
                <el-form-item label="班级">
                  <el-input v-model="form.class" :disabled="true">
<!--                    <template slot="append">房间</template>-->
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" size="small" @click="onSubmit">更新基本信息</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'UserUser',
  data () {
    return {
      auth: '',
      form: {
        name: '',
        gender: '',
        jobNum: '',
        phoneNum: '',
        class: ''
      },
      info: {
        imageUrl: '',
        name: '',
        gender: '',
        jobNum: '',
        phoneNum: '',
        roomNo: ''
      }
    }
  },
  created () {
    this.getInfo()
    this.getForm()
    this.getAuth()
  },
  methods: {
    getAuth () {
      const auth = JSON.parse(window.sessionStorage.getItem('auth'))
      for (let i = 0; i < auth.length; i++) {
        if (auth[i].authority === '学生') {
          this.auth = auth[i].authority
        } else if (auth[i].authority === '超级管理员') {
          this.auth = auth[i].authority
        } else {
          this.auth = '管理员'
        }
      }
    },
    getInfo () {
      this.info.imageUrl = JSON.parse(window.sessionStorage.getItem('user')).avatar
      this.info.name = JSON.parse(window.sessionStorage.getItem('user')).name
      this.info.jobNum = JSON.parse(window.sessionStorage.getItem('user')).username
      this.info.phoneNum = JSON.parse(window.sessionStorage.getItem('user')).phone
      this.info.gender = JSON.parse(window.sessionStorage.getItem('user')).gender
      this.info.roomNo = JSON.parse(window.sessionStorage.getItem('user')).buildingsName + ' - ' + JSON.parse(window.sessionStorage.getItem('user')).floorsName + ' - ' + JSON.parse(window.sessionStorage.getItem('user')).roomsName
    },
    getForm () {
      this.form.name = JSON.parse(window.sessionStorage.getItem('user')).name
      this.form.jobNum = JSON.parse(window.sessionStorage.getItem('user')).username
      this.form.phoneNum = JSON.parse(window.sessionStorage.getItem('user')).phone
      this.form.gender = JSON.parse(window.sessionStorage.getItem('user')).gender
      this.form.class = JSON.parse(window.sessionStorage.getItem('user')).college + ' - ' +
        JSON.parse(window.sessionStorage.getItem('user')).profession + ' - ' + JSON.parse(window.sessionStorage.getItem('user')).grade
    },
    handleAvatarSuccess (res) {
      this.info.imageUrl = '/api/file/' + res
    },
    onSubmit () {
      this.getRequest('/user/updateinfo?username=' + JSON.parse(window.sessionStorage.getItem('user')).username +
      '&phone=' + this.info.phoneNum + '&avatar=' + this.info.imageUrl).then(res => {
        this.$message('修改基本信息成功')
      })
    }
  }
}
</script>

<style scoped>
  .info {
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
    color: #555555;
  }
  .prop-center {
    display:flex;
    justify-content: center;
  }

  .upload-shadow{
    position: relative;
  }
  .upload-shadow:hover::after {
    content: '上传头像';
    width: 100px;
    height: 100px;
    background-color:#5b5959c7;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
