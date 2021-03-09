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
            <el-button type="primary" @click="update" round>修改公告</el-button>
          </el-row>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserAnnoUpdate',
  data () {
    return {
      user: JSON.parse(window.sessionStorage.getItem('user')),
      title: '修改校园公告',
      announcement: {
      }
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getOne()
  },
  methods: {
    getOne () {
      this.postRequest('/announcement/getone', this.id).then(res => {
        this.announcement = res.data.announcement
      })
    },
    update () {
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
        this.postRequest('/announcement/update', this.announcement).then(res => {
          this.$router.push('/anno/look')
        })
      }
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
