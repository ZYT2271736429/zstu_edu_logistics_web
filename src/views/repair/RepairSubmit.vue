<template>
  <div>
    <el-form :model="repair" :rules="rules" ref="repair" label-width="100px" class="demo-ruleForm">
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
          <img v-if="repair.photo" :src="repair.photo" class="avatar">
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
                v-for="item in buildingsList"
                :key="item.number"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="宿舍号" prop="dormitory">
            <el-select v-model="repair.dormitory" placeholder="请选择">
              <el-option
                v-for="item in roomsList"
                :key="item.number"
                :label="item.number"
                :value="item.number">
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
            <el-button type="primary" @click="submitForm('repair')">申请报修</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <el-button type="primary" @click="resetForm('repair')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'RepairSubmit',
  data () {
    return {
      buildingId: 10,
      buildingsList: [],
      roomsList: [],
      repairTypeList: [],
      repair: {
        title: '',
        description: '',
        phone: '',
        floor: '',
        dormitory: '',
        reservationTime: '',
        photo: '',
        repairTypeId: '',
        submitTime: '',
        studentId: ''
      },
      rules: {
        title: [{ required: true, message: '不能为空', trigger: 'blur' }],
        description: [{ required: true, message: '不能为空', trigger: 'blur' }],
        floor: [{ required: true, message: '不能为空', trigger: 'blur' }],
        dormitory: [{ required: true, message: '不能为空', trigger: 'blur' }],
        repairTypeId: [{ required: true, message: '不能为空', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.getRooms()
    this.getBuildings()
    this.getRepairTypeList()
  },
  methods: {
    getRepairTypeList () {
      this.getRequest('/repair-type/getall').then(res => {
        this.repairTypeList = res.data.repairTypeList
      })
    },
    getBuildings () {
      this.getRequest('/buildings/getall').then(res => {
        this.buildingsList = res.data.buildingsList
      })
    },
    getRooms () {
      this.postRequest('/rooms/getbybuildingsid', this.buildingId).then(res => {
        this.roomsList = res.data.roomsList
      })
    },
    handleAvatarSuccess (res) {
      this.repair.photo = '/api/file/' + res
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.repair.submitTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
          this.repair.studentId = JSON.parse(window.sessionStorage.getItem('user')).id
          this.postRequest('/repair/add', this.repair).then(res => {
            this.$router.push({
              path: '/repair/status',
              query: { id: res.data.id }
            })
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
