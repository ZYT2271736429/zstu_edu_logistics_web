<template>
  <div>
    <div class="block">
      <el-timeline>
        <el-timeline-item timestamp="档口详情" placement="top">
          <el-card>
            <el-form>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="档口名称: ">
                    {{stall.name}}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="档口负责人: ">
                    {{stall.head}}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="档口负责人电话: ">
                    {{stall.phone}}
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-link type="primary" style="margin-top: 10px" @click="dialogFormVisible3=true" v-if="authIf">新增菜品</el-link>
                </el-col>
                <el-col :span="3">
                  <el-link type="primary" style="margin-top: 10px" @click="dialogFormVisible2=true" v-if="authIf">上传卫生检测信息</el-link>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="档口图片">
                    <img style="width: 170px;height: 170px" v-if="stall.photo" :src="stall.photo" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="卫生检测状况">
                    <img style="width: 170px;height: 170px" v-if="stall.healthPhoto" :src="stall.healthPhoto"
                         class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="档口评分: ">
                    <el-rate
                      v-model="stall.feedbackScore"
                      disabled
                      show-score
                      text-color="#ff9900"
                      style="margin-top: 11px">
                    </el-rate>
                  </el-form-item>
                  <el-form-item label="卫生评分: ">
                    <el-rate
                      v-model="stall.healthScore"
                      disabled
                      show-score
                      text-color="#ff9900"
                      style="margin-top: 11px">
                    </el-rate>
                  </el-form-item>
                  <el-form-item label="卫生检测时间: ">
                    {{stall.collectionTime}}
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
    <div v-for="(dishes,index) in dishesList"
         :key="index">
      <el-card>
        <el-form style="margin-bottom: 0px">
          <el-row>
            <el-col :span="6">
              <el-form-item label="菜品: ">
                {{dishes.name}}
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="价格: ">
                {{dishes.price}}
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="评分: ">
                <el-rate
                  v-model="dishes.score"
                  disabled
                  show-score
                  text-color="#ff9900"
                  style="margin-top: 11px">
                </el-rate>
              </el-form-item>
            </el-col>
            <el-col :span="2" :offset="2">
              <el-link type="primary" style="margin-top: 10px" @click="update2(dishes.id)" v-if="authIf">修改菜品</el-link>
            </el-col>
            <el-col :span="2">
              <el-link type="danger" style="margin-top: 10px" @click="delete2(dishes.id)" v-if="authIf">删除菜品</el-link>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="图片">
                <img style="width: 128px;height: 128px" v-if="dishes.photo" :src="dishes.photo"
                     class="avatar">
              </el-form-item>
            </el-col>
            <el-col :span="12" style="margin-top: 40px">
              <el-popover
                placement="bottom"
                width="400"
                trigger="click">
                <div v-for="(feedback,index) in feedbackList"
                     :key="index">
                  <el-card>
                    <el-form style="margin-bottom: 0px">
                      <el-row>
                        <el-col :span="11">
                          <el-form-item label="姓名: ">
                            {{feedback.user.name}}
                          </el-form-item>
                        </el-col>
                        <el-col :span="13">
                          <el-form-item label="时间: ">
                            {{feedback.feedbackTime}}
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="图片">
                            <img style="width: 128px;height: 128px" v-if="feedback.photo" :src="feedback.photo"
                                 class="avatar">
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="评分: ">
                            <el-rate
                              v-model="feedback.score"
                              disabled
                              show-score
                              text-color="#ff9900"
                              style="margin-top: 11px">
                            </el-rate>
                          </el-form-item>
                          <el-form-item label="评价">
                            {{feedback.feedback}}
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-form>
                  </el-card>
                </div>
                <el-button slot="reference" @click="getFeedbackList(dishes.id)">查看菜品评价</el-button>
              </el-popover>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <br>
    </div>
    <el-dialog
      title="修改菜品信息"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="dishes" :rules="rules" ref="dishes" label-width="100px" class="demo-ruleForm">
        <el-form-item label="菜品名称" prop="name">
          <el-input v-model="dishes.name"></el-input>
        </el-form-item>
        <el-form-item label="菜品价格" prop="price">
          <el-input v-model="dishes.price"></el-input>
        </el-form-item>
        <el-form-item label="菜品图片" prop="photo">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8080/api/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess">
            <img v-if="dishes.photo" :src="dishes.photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="6" :offset="3">
            <el-form-item>
              <el-button type="primary" @click="submitForm2('dishes')">确定</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="1">
            <el-form-item>
              <el-button type="primary" @click="dialogFormVisible=false">取消</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog
      title="档口卫生检测"
      :visible.sync="dialogFormVisible2"
    >
      <el-form :model="health" :rules="rules2" ref="health" label-width="100px" class="demo-ruleForm">
        <el-form-item label="采集图片" prop="healthPhoto">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8080/api/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess2">
            <img v-if="health.healthPhoto" :src="health.healthPhoto" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="卫生评分" prop="healthScore">
          <el-rate
            style="margin-top: 11px"
            v-model="health.healthScore"
            text-color="#ff9900"
            show-text>
          </el-rate>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="6" :offset="3">
            <el-form-item>
              <el-button type="primary" @click="submitForm('health')">确定</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="1">
            <el-form-item>
              <el-button type="primary" @click="dialogFormVisible2=false">取消</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog
      title="新增菜品"
      :visible.sync="dialogFormVisible3"
    >
      <el-form :model="dishes2" :rules="rules3" ref="dishes2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="菜品名称" prop="name">
          <el-input v-model="dishes2.name"></el-input>
        </el-form-item>
        <el-form-item label="菜品价格" prop="price">
          <el-input v-model="dishes2.price"></el-input>
        </el-form-item>
        <el-form-item label="菜品图片" prop="photo">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8080/api/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess3">
            <img v-if="dishes2.photo" :src="dishes2.photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="6" :offset="3">
            <el-form-item>
              <el-button type="primary" @click="submitForm3('dishes2')">确定</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="1">
            <el-form-item>
              <el-button type="primary" @click="dialogFormVisible3=false">取消</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>

import moment from 'moment'

export default {
  name: 'UserCantDetails',
  data () {
    return {
      authIf: true,
      id: '',
      stall: {},
      health: {
        id: '',
        healthPhoto: '',
        healthScore: 0,
        collectionTime: ''
      },
      dishes: {},
      dishes2: {
        name: '',
        price: '',
        photo: '',
        stallId: ''
      },
      dishesList: [],
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      rules: {
        name: [{ required: true, message: '不能为空', trigger: 'blur' }],
        price: [{ required: true, message: '不能为空', trigger: 'blur' }],
        photo: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      rules2: {
        healthPhoto: [{ required: true, message: '不能为空', trigger: 'blur' }],
        healthScore: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      rules3: {
        name: [{ required: true, message: '不能为空', trigger: 'blur' }],
        price: [{ required: true, message: '不能为空', trigger: 'blur' }],
        photo: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      queryCondition: {
        current: 1,
        size: 100000,
        total: 0,
        dishesId: ''
      },
      feedbackList: []
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getOne()
    this.getAuth()
  },
  methods: {
    getAuth () {
      const auth = JSON.parse(window.sessionStorage.getItem('auth'))
      for (let i = 0; i < auth.length; i++) {
        if (auth[i].authority === '学生') {
          this.authIf = false
        }
      }
    },
    getOne () {
      this.postRequest('/stall/getone', this.id).then(res => {
        this.stall = res.data.stall
        this.dishesList = res.data.stall.dishesList
      })
    },
    handleAvatarSuccess (res) {
      this.dishes.photo = '/api/file/' + res
    },
    handleAvatarSuccess2 (res) {
      this.health.healthPhoto = '/api/file/' + res
    },
    handleAvatarSuccess3 (res) {
      this.dishes2.photo = '/api/file/' + res
    },
    getFeedbackList (id) {
      this.queryCondition.dishesId = id
      this.postRequest('/feedback/getbycondition', this.queryCondition).then(res => {
        this.feedbackList = res.data.feedbackList.list
      })
    },
    update2 (id) {
      this.dialogFormVisible = true
      this.postRequest('/dishes/getone', id).then(res => {
        this.dishes = res.data.dishes
      })
    },
    delete2 (id) {
      this.$confirm('确认删除菜品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.postRequest('/dishes/delete', id).then(res => {
          this.$message({
            type: 'success',
            message: '菜品删除成功!'
          })
          this.getOne()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        this.health.id = this.stall.id
        this.health.collectionTime = moment(new Date()).format('YYYY-MM-DD HH:mm')
        console.log(this.health)
        if (valid) {
          this.postRequest('/stall/updatehealth', this.health).then(res => {
            this.$message.success('卫生状况上传成功')
            this.dialogFormVisible2 = false
            this.getOne()
          })
        } else {
          return false
        }
      })
    },
    submitForm2 (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.postRequest('/dishes/update', this.dishes).then(res => {
            this.$message.success('修改菜品信息成功')
            this.dialogFormVisible = false
            this.getOne()
          })
        } else {
          return false
        }
      })
    },
    submitForm3 (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dishes2.stallId = this.id
          this.postRequest('/dishes/add', this.dishes2).then(res => {
            this.$message.success('新增菜品成功')
            this.dialogFormVisible3 = false
            this.getOne()
          })
        } else {
          return false
        }
      })
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
