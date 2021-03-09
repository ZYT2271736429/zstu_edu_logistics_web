<template>
    <div>
      <el-form :model="feedback" :rules="rules" ref="feedback" label-width="100px" class="demo-ruleForm">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="档口" prop="stallId">
              <el-cascader
                v-model="feedback.stallId"
                :options="stallList"
                @change="handleChange"
                clearable
                :props="props"></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜品" prop="dishesId">
              <el-select v-model="feedback.dishesId" placeholder="请选择">
                <el-option
                  v-for="item in dishesList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="图片">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8080/api/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess">
            <img v-if="feedback.photo" :src="feedback.photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="评价" prop="feedback">
          <el-input
            type="textarea"
            :rows="3"
            v-model="feedback.feedback">
          </el-input>
        </el-form-item>
        <el-form-item label="评分">
          <el-rate
            style="margin-top: 11px"
            v-model="feedback.score"
            text-color="#ff9900"
            show-text>
          </el-rate>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="6" :offset="6">
            <el-form-item>
              <el-button type="primary" @click="submitForm('feedback')">提交评价</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-button type="primary" @click="resetForm('feedback')">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'CantFeedback',
  data () {
    return {
      props: {
        emitPath: false
      },
      stallList: [],
      dishesList: [],
      feedback: {
        stallId: '',
        dishesId: '',
        score: 0,
        feedback: '',
        photo: '',
        feedback_time: '',
        student_id: ''
      },
      rules: {
        stallId: [{ required: true, message: '不能为空', trigger: 'blur' }],
        dishesId: [{ required: true, message: '不能为空', trigger: 'blur' }],
        score: [{ required: true, message: '不能为空', trigger: 'blur' }],
        feedback: [{ required: true, message: '不能为空', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.getCascader()
  },
  methods: {
    handleAvatarSuccess (res) {
      this.feedback.photo = '/api/file/' + res
    },
    getCascader () {
      this.getRequest('/stall/getcascader').then(res => {
        this.stallList = res.data.stallList
      })
    },
    handleChange (value) {
      this.feedback.dishesId = ''
      if (value !== null) {
        value = Number(value)
        this.postRequest('/dishes/getall', value).then(res => {
          this.dishesList = res.data.dishesList
        })
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.feedback.feedbackTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
          this.feedback.studentId = JSON.parse(window.sessionStorage.getItem('user')).id
          this.postRequest('/feedback/add', this.feedback).then(res => {
            this.$message.success('提交评价成功')
            this.$router.push('/cant/historyStudent')
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
