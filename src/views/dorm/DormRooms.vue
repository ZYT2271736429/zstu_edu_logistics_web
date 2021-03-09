<template>
  <div id="RoomInfo" class="page-wrapper">
    <!-- 宿舍基础信息 -->
    <h1 class="main-title">
      宿舍基础信息
    </h1>
    <div class="wrapper main-card selector-wrapper">
      <GroupSelector :selectorData="selectorData" />
      <el-button
        type="primary"
        round
        @click="handleSearchRoom"
        :disabled="selectorData.roomId === null"
      >检索宿舍</el-button
      >
    </div>
    <div class="wrapper">
      <PanelGroup :roomInfo="roomInfo" />
    </div>
    <!-- 宿舍基础信息 -->

    <!-- 宿舍成员 -->
    <h1 class="main-title">宿舍成员</h1>
    <div class="wrapper main-card">
      <StudentsTable :table-data="students" />
    </div>
    <!-- 宿舍成员 -->

    <!-- 宿舍分配 -->
    <h1 class="main-title">添加成员</h1>
    <div class="wrapper">
      <div class="main-card form-wrapper">
        <el-row>
          <el-col :span="18" :offset="1">
            <StudentSearcher v-model="searchContent" />
          </el-col>
          <el-col :span="2" :offset="1">
            <div class="btn-wrapper">
              <el-button type="primary" @click="addStudent(searchContent)">添加成员</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
<!--    <h1 class="main-title">宿舍评价</h1>
    <div class="wrapper">
      <div class="main-card form-wrapper">
        <el-form :model="evaluateForm" ref="evaluateForm" label-width="100px">
          <el-form-item label="宿舍评价" prop="note" required>
            <el-input type="textarea" v-model="evaluateForm.note"></el-input>
          </el-form-item>
          <el-form-item label="评分" prop="score" required>
            <el-input-number
              v-model="evaluateForm.score"
              controls-position="right"
              :min="1"
              :max="100"
            ></el-input-number>
          </el-form-item>
        </el-form>
        <div class="btn-wrapper">
          <el-button type="primary" @click="handleSubmit">发表评分</el-button>
        </div>
      </div>
      <Evaluates
        :evaluatesData="evaluatesData"
        @afterDel="fetchRoomInfo(roomInfo.id)"
      ></Evaluates>
    </div>-->
    <!-- 宿舍分配 -->
  </div>
</template>

<script>
import GroupSelector from '@/components/GroupSelector'
import PanelGroup from './components/PanelGroup'
import StudentsTable from './components/StudentsTable'
import StudentSearcher from './components/StudentSearcher'
/* import GroupSelector from '@/components/GroupSelector'
import PanelGroup from './components/PanelGroup'
import StudentsTable from './components/StudentsTable'
import Evaluates from '../dashboard/student/components/Evaluates'

import { getEvaluates, addEvaluate } from '@/api/evaluate' */
export default {
  name: 'DormRoms',
  components: {
    GroupSelector,
    PanelGroup,
    StudentsTable,
    StudentSearcher
    /*    GroupSelector,
    PanelGroup,
    StudentsTable,
    Evaluates */
  },
  data () {
    return {
      searchContent: '',
      roomInfo: {},
      buildingInfo: {},
      floorInfo: {},
      students: [],
      selectorData: {
        buildingId: null,
        floorId: null,
        roomId: null
      },
      evaluatesData: [],
      evaluateForm: {
        note: '',
        score: 60
      }
    }
  },
  watch: {
    '$route.query.roomId': function (newVal) {
      if (newVal && this.$route.path === '/dorm/rooms') {
        this.fetchRoomInfo(newVal)
      }
    }
  },
  mounted () {
    const roomId = this.$route.query.roomId
    if (roomId) {
      this.fetchRoomInfo(roomId)
    }
  },
  methods: {
    async fetchRoomInfo (roomId) {
      const roomInfo = (await this.postRequest('/rooms/getroominfo', roomId)).data.rooms
      this.roomInfo = roomInfo
      this.buildingInfo = roomInfo.buildings
      this.students = roomInfo.userList
      /*      const evaluates = (await getEvaluates({ roomId: roomInfo.id })).data
        .evaluates
      this.evaluatesData = evaluates */
    },
    handleSearchRoom () {
      this.$router.push({
        path: '/dorm/rooms',
        query: { roomId: this.selectorData.roomId }
      })
    },
    addStudent (val) {
      if (this.students.length + 1 >= this.roomInfo.peoplenum) {
        this.$alert('此宿舍已经满员', '入住失败', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              center: true,
              message: `action: ${action}`
            })
          }
        })
      } else {
        this.getRequest('/user/adddorm?username=' + val + '&dormId=' + this.roomInfo.id).then(res => {
          this.$message('添加成员成功')
        })
      }
    }
    /*   handleSubmit () {
      /!* this.$refs.evaluateForm.validate(result => {
        if (result) {
          addEvaluate({
            note: this.evaluateForm.note,
            score: this.evaluateForm.score,
            roomId: this.roomInfo.id
          }).then(() => {
            this.$message.success('发布成功')
            this.fetchRoomInfo(this.roomInfo.id)
          })
        } else {
          this.$message.error('请填充完整信息')
        }
      }) *!/
    } */
  }
}
</script>

<style lang="scss" scoped>
  .main-title {
    margin: 0;
    border-left: 5px solid rgba($color: #000000, $alpha: 0.7);
    padding-left: 10px;
  }
  #RoomInfo {
    > .wrapper {
      margin: 40px 0;
    }
    .selector-wrapper {
      display: flex;
      justify-content: space-between;
    }
    .form-wrapper {
      margin-bottom: 40px;
      .btn-wrapper {
        display: flex;
        flex-direction: row-reverse;
      }
    }
  }
</style>
