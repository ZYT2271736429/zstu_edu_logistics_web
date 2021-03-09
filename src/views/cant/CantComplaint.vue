<template>
  <div>
    <el-form :model="complaint" :rules="rules" ref="complaint" label-width="100px" class="demo-ruleForm">
      <el-form-item label="投诉内容" prop="title">
        <el-input v-model="complaint.title"></el-input>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="档口" prop="stallId">
            <el-cascader
              v-model="complaint.stallId"
              :options="stallList"
              clearable
              :props="props"></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="complaint.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系方式" prop="phone">
            <el-input v-model="complaint.phone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="详细描述" prop="description">
        <el-input
          type="textarea"
          v-model="complaint.description"
          maxlength="1000"
          show-word-limit
        >
        </el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8080/api/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess">
          <img v-if="complaint.photo" :src="complaint.photo" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="6" :offset="6">
          <el-form-item>
            <el-button type="primary" @click="submitForm('complaint')">提交投诉</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <el-button type="primary" @click="resetForm('complaint')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'CantComplaint',
  data () {
    return {
      props: {
        emitPath: false
      },
      stallList: [],
      complaint: {
        name: '',
        phone: '',
        title: '',
        description: '',
        photo: '',
        complaintTime: '',
        status: 1,
        studentId: '',
        stallId: ''
      },
      rules: {
        name: [{ required: true, message: '不能为空', trigger: 'blur' }],
        phone: [{ required: true, message: '不能为空', trigger: 'blur' }],
        title: [{ required: true, message: '不能为空', trigger: 'blur' }],
        description: [{ required: true, message: '不能为空', trigger: 'blur' }],
        stallId: [{ required: true, message: '不能为空', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.getCascader()
  },
  methods: {
    handleAvatarSuccess (res) {
      this.complaint.photo = '/api/file/' + res
    },
    getCascader () {
      this.getRequest('/stall/getcascader').then(res => {
        this.stallList = res.data.stallList
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.complaint.complaintTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
          this.complaint.studentId = JSON.parse(window.sessionStorage.getItem('user')).id
          this.postRequest('/complaint/add', this.complaint).then(res => {
            this.$message.success('投诉成功')
            this.$router.push('/cant/allStudent')
          })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.feedback.photo = ''
    }
  }
}
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
