<template>
  <div id="UserInfo" class="page-wrapper">
    <!-- 选择器 -->
    <h1 class="main-title">选择学生</h1>
    <div class="wrapper">
      <el-tabs type="border-card">
        <el-tab-pane label="级联选择">
          <GroupSelector :selectorData="selectorData" />
          <el-button
            type="primary"
            @click="fetchUserInfoById('id', selectorData.userId)"
          >搜索</el-button
          >
        </el-tab-pane>
        <el-tab-pane label="按学号搜索">
          <StudentSearcher v-model="searchContent" />
          <el-button
            type="primary"
            @click="fetchUserInfo('account', searchContent)"
          >搜索</el-button
          >
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 选择器 -->

    <h1 class="main-title">详细信息</h1>
    <div class="wrapper userInfo-wrapper" v-if="studentInfo.id">
      <el-row :gutter="20" class="top">
        <el-col :md="12">
          <div class="userInfo-card">
            <div class="title">用户信息</div>
            <hr />
            <div class="info-item">
              <label style="color:#606266;">姓名: </label>
              <span>{{ studentInfo.name }}</span>
            </div>
            <div class="info-item">
              <label style="color:#606266;">学号: </label>
              <span>{{ studentInfo.username }}</span>
            </div>
            <div class="info-item">
              <label style="color:#606266;">手机号: </label>
              <span>{{ studentInfo.phone }}</span>
            </div>
            <div class="info-item">
              <label style="color:#606266;">入学时间: </label>
              <span>{{studentInfo.admissionTime}}</span>
            </div>
          </div>
        </el-col>
        <el-col :md="12">
          <div class="roomInfo-card" v-if="studentInfo.roomId">
            <PanelGroupUser :userInfo="studentInfo" />
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="no-data-tips main-card wrapper" v-else>请选择用户</div>
  </div>
</template>

<script>
import GroupSelector from '@/components/GroupSelector'
import StudentSearcher from './components/StudentSearcher'
import PanelGroupUser from './components/PanelGroupUser'
export default {
  name: 'DormUser',
  components: {
    GroupSelector,
    StudentSearcher,
    PanelGroupUser
  },
  data () {
    return {
      selectorData: {
        buildingId: null,
        floorId: null,
        roomId: null,
        userId: null
      },
      searchContent: '',
      studentInfo: {}
    }
  },
  methods: {
    fetchUserInfoById (type, value) {
      if (value == null) {
        return
      }
      this.getRequest('/user/getuserinfobyid?id=' + value).then(res => {
        this.studentInfo = res.data.user
      })
    },
    fetchUserInfo (type, value) {
      if (value === '') {
        return
      }
      this.getRequest('/user/getuserinfobyusername?username=' + value).then(res => {
        this.studentInfo = res.data.user
      })
    }
  },
  mounted () {
    if (this.$route.query.userId) {
      this.fetchUserInfoById('id', this.$route.query.userId)
    }
  }
}
</script>

<style lang="scss" scoped>
  .main-card {
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
    overflow: hidden;
  }
  .no-data-tips {
    font-weight: bold;
    text-align: center;
    color: rgba($color: #000000, $alpha: 0.3);
  }
  .wrapper {
    margin: 40px 0;
  }
  .el-tab-pane {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  >>> .el-tabs__content {
    padding: 40px 20px;
    width: 100%;
  }

  .userInfo-wrapper {
    .top {
      .roomInfo-card {
        background-color: #fff;
        padding: 30px;
      }
      .userInfo-card {
        background-color: #fff;
        padding: 30px;
        height: 223px;
        box-sizing: content-box;
        .title {
          font-weight: bold;
          color: #1890ff;
          font-size: 22px;
          margin-bottom: 20px;
        }
        .info-item {
          margin: 20px 0;
        }
        :nth-child(3) {
          margin-top: 40px;
        }
      }
    }
    .bottom {
      .process-item {
        span {
          display: block;
          margin: 10px 0;
        }
      }
      :first-child span {
        margin-top: 0px;
      }
    }
  }
  .main-title {
    margin: 0;
    border-left: 5px solid rgba($color: #000000, $alpha: 0.7);
    padding-left: 10px;
  }
</style>
