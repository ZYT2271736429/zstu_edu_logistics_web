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
      <el-form label-width="100px" class="demo-ruleForm" disabled>
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
      <br v-if="repair.repairStatus!==3">
      <el-tag type="success" v-if="repair.repairStatus!==3">报修处理</el-tag>
      <br v-if="repair.repairStatus!==3">
      <el-form v-if="repair.repairStatus!==3" :model="repair" :rules="rules" ref="repair" label-width="100px"
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
            <el-form-item label="维修员" prop="repairmanId">
              <el-select v-model="repair.repairmanId" placeholder="请选择"  @change="getRepairmanPhone(repair.repairmanId)">
                <el-option
                  v-for="item in repairmanList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
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
              <el-button type="primary" @click="submitForm('repair')">报修处理</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-switch
        v-if="repair.repairStatus!==3"
        v-model="repairStatusIf"
        active-text="报修是否完成"
      >
      </el-switch>
      <br v-if="repairStatusIf==true">
      <el-form v-if="repairStatusIf==true" :model="repair" :rules="rules2" ref="repair" label-width="100px"
               class="demo-ruleForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="维修时间" prop="repairTime">
              <el-date-picker
                v-model="repair.repairTime"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="维修结果" prop="result">
              <el-input
                type="textarea"
                :rows="3"
                v-model="repair.result">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6" :offset="6">
            <el-form-item>
              <el-button type="primary" @click="submitForm2('repair')">维修完成</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <br v-if="repairStatusIf==true">
      <el-tag type="success" v-if="repair.repairStatus===3">报修结果</el-tag>
      <br v-if="repair.repairStatus===3">
      <br v-if="repair.repairStatus===3">
      <el-form v-if="repair.repairStatus===3" label-width="100px" class="demo-ruleForm" disabled>
        <el-row>
          <el-col :span="6">
            <el-form-item label="维修时间">
              <el-input v-model="repair.repairTime"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="维修人">
              <el-input v-model="repair.repairman.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="维修结果" prop="result">
              <el-input
                type="textarea"
                :rows="3"
                v-model="repair.result">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="评分">
          <el-rate
            style="margin-top: 11px"
            v-model="repair.score"
            disabled
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
      </el-form>
    </div>
</template>

<script>
export default {
  name: 'UserRepairUpdate',
  data () {
    return {
      repairStatusIf: false,
      repairmanList: [],
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
        repairman: {
          phone: ''
        },
        studentId: '',
        user: ''
      },
      rules: {
        reservationTime: [{ required: true, message: '不能为空', trigger: 'blur' }],
        repairmanId: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      rules2: {
        repairTime: [{ required: true, message: '不能为空', trigger: 'blur' }],
        result: [{ required: true, message: '不能为空', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.repair.id = this.$route.query.id
    this.getOne()
    this.getRepairmanList()
  },
  methods: {
    getOne () {
      this.postRequest('/repair/getone', this.repair.id).then(res => {
        this.repair = res.data.repair
        if (this.repair.repairman == null) {
          this.repair.repairman = {
            phone: ''
          }
        }
      })
    },
    getRepairmanList () {
      this.getRequest('/repairman/getall').then(res => {
        this.repairmanList = res.data.repairmanList
      })
    },
    getRepairmanPhone (repairmanId) {
      this.postRequest('/repairman/getone', repairmanId).then(res => {
        this.repair.repairman = res.data.repairman
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.repair.repairStatus = 2
          this.postRequest('/repair/update', this.repair).then(res => {
            this.$router.push('/repair/undone')
          })
        } else {
          return false
        }
      })
    },
    submitForm2 (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.repair.repairStatus = 3
          this.postRequest('/repair/update', this.repair).then(res => {
            this.$router.push('/repair/history')
          })
        } else {
          return false
        }
      })
    },
    resetForm () {
      this.repair.repairmanId = ''
    }

  }
}
</script>

<style scoped>

</style>
