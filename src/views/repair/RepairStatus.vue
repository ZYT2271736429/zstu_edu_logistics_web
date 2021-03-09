<template>
    <div>
      <el-steps :active="repair.repairStatus" align-center finish-status="success">
        <el-step title="待处理"></el-step>
        <el-step title="处理中"></el-step>
        <el-step title="已完成"></el-step>
      </el-steps>
      <br>
      <el-tag type="success">报修内容</el-tag>
      <br>
      <br>
      <el-form v-if="repair.repairStatus!==1" label-width="100px" class="demo-ruleForm" disabled>
        <el-form-item label="报修单号" >
          <el-input v-model="repair.orderN"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="10">
            <el-form-item label="报修内容" >
              <el-input v-model="repair.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="报修类型">
              <el-input v-model="repair.repairType.type"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="预约时间">
              <el-input v-model="repair.reservationTime"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="详细描述">
          <el-input
            type="textarea"
            :rows="3"
            v-model="repair.description">
          </el-input>
        </el-form-item>
        <el-form-item label="维修图片">
          <img style="width: 178px;height: 178px"  v-if="repair.photo" :src="repair.photo" class="avatar">
        </el-form-item>
        <el-row>
          <el-col :span="6">
            <el-form-item label="报修人">
              <el-input v-model="repair.user.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系电话">
              <el-input v-model="repair.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="楼号">
              <el-input v-model="repair.floor"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="宿舍号">
              <el-input v-model="repair.dormitory"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-form v-if="repair.repairStatus===1" :model="repair" :rules="rules" ref="repair" label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="报修内容" prop="title">
          <el-input v-model="repair.title"></el-input>
        </el-form-item>
        <el-form-item label="报修类型" prop="repairTypeId">
          <el-select v-model="repair.repairTypeId" placeholder="请选择">
            <el-option
              v-for="item in repairTypeList"
              :key="item.id"
              :label="item.type"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详细描述" prop="description">
          <el-input
            type="textarea"
            :rows="3"
            v-model="repair.description">
          </el-input>
        </el-form-item>
        <el-form-item label="维修图片">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8080/api/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess">
            <img style="width: 178px;height: 178px" v-if="repair.photo" :src="repair.photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="repair.phone"></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="楼号" prop="floor">
              <el-select v-model="repair.floor" placeholder="请选择">
                <el-option
                  v-for="item in floorList"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="宿舍号" prop="dormitory">
              <el-select v-model="repair.dormitory" placeholder="请选择">
                <el-option
                  v-for="item in dormitoryList"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="预约时间">
          <el-date-picker
            v-model="repair.reservationTime"
            type="datetime"
            format="yyyy-MM-dd HH:mm"
            value-format="yyyy-MM-dd HH:mm"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="6" :offset="6">
            <el-form-item>
              <el-button type="primary" @click="submitForm('repair')">修改报修信息</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <br v-if="repair.repairStatus===2">
      <el-tag type="success" v-if="repair.repairStatus===2">报修处理</el-tag>
      <br v-if="repair.repairStatus===2">
      <br v-if="repair.repairStatus===2">
      <el-form v-if="repair.repairStatus===2" :model="repair" :rules="rules2" ref="repair" label-width="100px"
               class="demo-ruleForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="预约时间" prop="reservationTime">
              <el-date-picker
                v-model="repair.reservationTime"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="维修员">
              <el-input v-model="repair.repairman.name" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="维修员电话">
              <el-input v-model="repair.repairman.phone" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6" :offset="6">
            <el-form-item>
              <el-button type="primary" @click="submitForm2('repair')">修改预约时间</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <br v-if="repair.repairStatus===3">
      <el-tag type="success" v-if="repair.repairStatus===3">维修结果</el-tag>
      <br v-if="repair.repairStatus===3">
      <br v-if="repair.repairStatus===3">
      <el-form v-if="repair.repairStatus===3" :model="repair" label-width="100px"
               class="demo-ruleForm">
        <el-row>
          <el-col :span="6">
            <el-form-item label="维修时间">
              <el-input v-model="repair.repairTime" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="维修人">
              <el-input v-model="repair.repairman.name" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="维修结果" prop="result">
              <el-input
                type="textarea"
                :rows="3"
                v-model="repair.result"
                :disabled="true">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="评分">
          <el-rate
            style="margin-top: 11px"
            v-model="repair.score"
            text-color="#ff9900"
            show-text>
          </el-rate>
        </el-form-item>
        <el-form-item label="评价与反馈">
          <el-input
            type="textarea"
            :rows="3"
            v-model="repair.feedback">
          </el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="6" :offset="6">
            <el-form-item>
              <el-button v-if="repair.score===0 && repair.feedback===null" type="primary"
                         @click="submitForm3">提交评价与反馈
              </el-button>
              <el-button v-if="repair.score!==0 || repair.feedback!==null" type="primary"
                         @click="submitForm4">修改评价与反馈
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
</template>

<script>
export default {
  name: 'RepairStatus',
  data () {
    return {
      floorList: [],
      dormitoryList: [],
      repairTypeList: [],
      repair: {
        id: '',
        description: '',
        dormitory: '',
        feedback: '',
        floor: '',
        orderN: '',
        phone: '',
        photo: '',
        repairStatus: 0,
        repairTime: '',
        repairTypeId: '',
        reservationTime: '',
        result: '',
        score: '',
        submitTime: '',
        title: '',
        repairType: {
          id: '',
          type: ''
        },
        repairmanId: '',
        repairman: {},
        studentId: '',
        user: ''
      },
      rules: {
        title: [{ required: true, message: '不能为空', trigger: 'blur' }],
        description: [{ required: true, message: '不能为空', trigger: 'blur' }],
        floor: [{ required: true, message: '不能为空', trigger: 'blur' }],
        dormitory: [{ required: true, message: '不能为空', trigger: 'blur' }],
        repairTypeId: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      rules2: {
        reservationTime: [{ required: true, message: '不能为空', trigger: 'blur' }]
      }
    }
  },
  created () {
    const x = this.$route.query.id
    if (x == null) {
      this.status()
    } else {
      this.repair.id = x
      this.getOne()
    }
    this.getFloor()
    this.getDormitory()
    this.getRepairTypeList()
  },
  methods: {
    status () {
      this.postRequest('/repair/status', JSON.parse(window.sessionStorage.getItem('user')).id).then(res => {
        this.repair = res.data.repair
      })
    },
    getOne () {
      this.postRequest('/repair/getone', this.repair.id).then(res => {
        this.repair = res.data.repair
      })
    },
    getRepairTypeList () {
      this.getRequest('/repair-type/getall').then(res => {
        this.repairTypeList = res.data.repairTypeList
      })
    },
    getFloor () {
      this.getRequest('/dorm/getfloor').then(res => {
        this.floorList = res.data.floorList
      })
    },
    getDormitory () {
      this.getRequest('/dorm/getdormitory').then(res => {
        this.dormitoryList = res.data.dormitoryList
      })
    },
    handleAvatarSuccess (res) {
      this.repair.photo = '/api/file/' + res
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.postRequest('/repair/update', this.repair).then(res => {
            this.$message.success('修改报修信息成功')
          })
        } else {
          return false
        }
      })
    },
    submitForm2 (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.postRequest('/repair/update', this.repair).then(res => {
            this.$message.success('修改预约时间成功')
          })
        } else {
          return false
        }
      })
    },
    submitForm3 () {
      this.postRequest('/repair/update', this.repair).then(res => {
        this.$message.success('提交维修评价成功')
      })
    },
    submitForm4 () {
      this.postRequest('/repair/update', this.repair).then(res => {
        this.$message.success('修改维修评价成功')
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>

</style>
