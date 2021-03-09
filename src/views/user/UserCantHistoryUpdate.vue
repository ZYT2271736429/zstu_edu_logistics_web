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
            <el-button type="primary" @click="submitForm('feedback')">修改评价</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <el-button type="primary" @click="toHistoryStudent">取消修改</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'UserCantHistoryUpdateStudent',
  data () {
    return {
      props: {
        emitPath: false
      },
      stallList: [],
      dishesList: [],
      feedback: {},
      rules: {
        stallId: [{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }],
        dishesId: [{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }],
        score: [{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }],
        feedback: [{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }]
      }
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getOne()
    this.getCascader()
  },
  methods: {
    getOne () {
      this.postRequest('/feedback/getone', this.id).then(res => {
        this.feedback = res.data.feedback
      })
    },
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
          this.postRequest('/feedback/update', this.feedback).then(res => {
            this.$message.success('评价修改成功')
            this.$router.push('/cant/historyStudent')
          })
        } else {
          return false
        }
      })
    },
    toHistoryStudent () {
      this.$router.push('/cant/historyStudent')
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
