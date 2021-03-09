<template>
  <div>
    <div style="padding: 20px 0"></div>
    <div class="lpMyWay">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span align="center">
            <h2>{{announcement.title}}</h2>
          </span>
          <span>
          <p style="float: right;padding: 3px 0; color: #2154FA">{{announcement.releaseTime}}</p>
          </span>
        </div>
        <div style="padding: 10px 0"></div>
        <div>
          <p style="align-items: center">
            {{announcement.description}}
          </p>
        </div>
        <div style="padding: 10px 0"></div>
        <div style="padding: 20px 0" align="center" v-if="authIf">
          <el-row>
            <el-button type="primary" @click="update1" round>修改公告</el-button>
            <el-button type="primary" @click="update2" round>置顶公告</el-button>
            <el-button type="warning" @click="delete2" round>删除公告</el-button>
          </el-row>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserAnnoDetail',
  data () {
    return {
      authIf: true,
      id: null,
      announcement: {}
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getOne()
    this.getAuth()
  },
  methods: {
    getOne () {
      this.postRequest('/announcement/getone', this.id).then(res => {
        this.announcement = res.data.announcement
      })
    },
    getAuth () {
      const auth = JSON.parse(window.sessionStorage.getItem('auth'))
      for (let i = 0; i < auth.length; i++) {
        if (auth[i].authority === '学生') {
          this.authIf = false
        }
      }
    },
    update1 () {
      this.$router.push({ path: '/user/annoUpdate', query: { id: this.id } })
    },
    update2 () {
      this.postRequest('/announcement/top', this.id).then(res => {
        this.$router.push('/anno/look')
      })
    },
    delete2 () {
      this.postRequest('/announcement/delete', this.id).then(res => {
        this.$router.push('/anno/look')
      })
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

  .box-card {
    width: 800px;
  }
</style>
