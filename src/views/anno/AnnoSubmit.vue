<template>
  <div>
    <div style="padding: 20px 0"></div>
    <div class="lpMyWay">
      <el-card class="box-card,lpMyWay">
        <div slot="header" class="clearfix">
          <span align="center">
            <h2>
              {{title}}
            </h2>
          </span>
        </div>
        <el-input
          type="text"
          placeholder="请输入公告标题"
          v-model="announcement.title"
          maxlength="45"
          show-word-limit
        >
        </el-input>
        <div style="margin: 20px 0;"></div>
        <el-input
          type="textarea"
          placeholder="请输入公告内容"
          v-model="announcement.description"
          maxlength="1000"
          show-word-limit
        >
        </el-input>
        <div style="padding: 20px 0" align="center">
          <el-row>
            <el-button type="primary" @click="submit1" round>发布公告</el-button>
            <el-button type="primary" @click="submit2" round>置顶发布</el-button>
            <el-button type="warning" @click="reset" round>重置</el-button>
          </el-row>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'AnnoSubmit',
  data () {
    return {
      user: JSON.parse(window.sessionStorage.getItem('user')),
      title: '添加校园公告',
      announcement: {
        title: '',
        description: '',
        facultyId: '',
        releaseTime: '',
        passedIf: '',
        deleteIf: '',
        topIf: ''
      }
    }
  },
  methods: {
    submit1 () {
      this.announcement.facultyId = this.user.id
      this.announcement.releaseTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      this.announcement.passedIf = 1
      this.announcement.deleteIf = 0
      this.announcement.topIf = 0
      this.add()
    },
    submit2 () {
      this.announcement.facultyId = this.user.id
      this.announcement.releaseTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      this.announcement.passedIf = 1
      this.announcement.deleteIf = 0
      this.announcement.topIf = 1
      this.add()
    },
    add () {
      if (!this.announcement.title) {
        this.$message.error('请输入标题')
        return
      }
      if (!this.announcement.description) {
        this.$message.error('请输入内容')
        return
      }
      if (this.announcement.title === '' || this.announcement.description === '') {
        this.$message.error('标题或内容不能为空')
      } else {
        this.postRequest('/announcement/add', this.announcement).then(res => {
          this.$router.push('/anno/look')
        })
      }
    },
    reset () {
      this.announcement.title = ''
      this.announcement.description = ''
    }
  }
}
</script>

<style scoped>
  .lpMyWay{
    align-items: center;
    width: 800px;
    box-shadow: 0 5px 20px #999;
    background-color: white;
    margin: 0 auto;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>
