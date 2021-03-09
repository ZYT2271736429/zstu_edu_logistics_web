<template>
  <div>
    <el-steps :space="800" :active="complaint.status" finish-status="success" align-center>
      <el-step title="处理中"></el-step>
      <el-step title="已完成"></el-step>
    </el-steps>
    <br>
    <div  align="center">
      <el-card class="box-card" align="left">
        <div slot="header" class="clearfix">
          <span>投诉详情</span>
          <el-button v-if="complaint.status===1" style="float: right; padding: 3px 0" type="text"
                     @click="dialogFormVisible=true">处理完成
          </el-button>
        </div>
        <div class="text item">
          <el-form label-width="100px" class="demo-ruleForm" disabled>
            <el-form-item label="投诉时间">
              {{complaint.complaintTime}}
            </el-form-item>
            <el-form-item label="投诉内容">
              {{complaint.title}}
            </el-form-item>
            <el-form-item label="投诉档口">
              {{complaint.stall.name}}
            </el-form-item>
            <el-form-item label="投诉人姓名">
              {{complaint.name}}
            </el-form-item>
            <el-form-item label="投诉人电话">
              {{complaint.phone}}
            </el-form-item>
            <el-form-item label="详细描述">
              {{complaint.description}}
            </el-form-item>
            <el-form-item label="图片">
              <img style="width: 300px;height: 300px;" v-if="complaint.photo" :src="complaint.photo" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-form-item>
            <el-form-item v-if="complaint.status===2" label="处理时间">
              {{complaint.dealTime}}
            </el-form-item>
            <el-form-item v-if="complaint.status===2" label="处理人">
              {{complaint.user.name}}
            </el-form-item>
            <el-form-item v-if="complaint.status===2" label="处理人电话">
              {{complaint.user.phone}}
            </el-form-item>
            <el-form-item v-if="complaint.status===2" label="处理结果">
              {{complaint.deal}}
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
    <el-dialog
      title="请输入处理结果"
      :visible.sync="dialogFormVisible"
    >
        <el-input v-model="complaint.deal"></el-input>
        <el-button style="margin-left: 45%;margin-top: 25px" type="primary" @click="submitForm">确定</el-button>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'UseCantComplaintDetail',
  data () {
    return {
      dialogFormVisible: false,
      complaint: {
        status: 1,
        dealTime: '',
        deal: '',
        userId: '',
        stall: {
          name: ''
        },
        user: {
          name: '',
          phone: ''
        }
      }
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getOne()
  },
  methods: {
    getOne () {
      this.postRequest('/complaint/getone', this.id).then(res => {
        this.complaint = res.data.complaint
      })
    },
    submitForm () {
      this.complaint.status = 2
      this.complaint.userId = JSON.parse(window.sessionStorage.getItem('user')).id
      this.complaint.dealTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      this.postRequest('/complaint/update', this.complaint).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>
