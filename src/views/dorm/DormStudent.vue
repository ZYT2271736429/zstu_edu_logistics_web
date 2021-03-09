<template>
  <div id="student-info">
    <h1 class="main-title">宿舍概览</h1>
    <div class="wrapper">
      <PanelGroupStudent :userInfo="studentInfo"/>
    </div>
    <h1 class="main-title">当前入住</h1>
    <div class="wrapper">
      <StudentList :studentsData="studentsData"></StudentList>
    </div>
  </div>
</template>

<script>
import PanelGroupStudent from './components/PanelGroupStudent'
import StudentList from './components/StudentList'
/* import PanelGroup from './components/PanelGroup'
  import StudentList from './components/StudentList'
  import Evaluates from './components/Evaluates'
  import { getStudents } from '@/api/user'
  import { getEvaluates } from '@/api/evaluate' */
export default {
  name: 'DormStudent',
  components: {
    PanelGroupStudent,
    StudentList
    /*    PanelGroup,
      StudentList,
      Evaluates */
  },
  data () {
    return {
      studentInfo: {},
      studentsData: []
    }
  },
  created () {
    this.fetchUserInfoById()
  },
  computed: {
    name () {
      return JSON.parse(window.sessionStorage.getItem('user')).name
    }
  },
  mounted () {
    this.getStudents()
    /* getStudents({ roomId: this.$store.getters.room.id }).then(res => {
        this.studentsData = res.data.users
      })
      getEvaluates({ roomId: this.$store.getters.room.id }).then(res => {
        this.evaluatesData = res.data.evaluates
      }) */
  },
  methods: {
    fetchUserInfoById () {
      if (JSON.parse(window.sessionStorage.getItem('user')).roomId == null) {
        return
      }
      this.getRequest('/user/getuserinfobyid?id=' + JSON.parse(window.sessionStorage.getItem('user')).id).then(res => {
        this.studentInfo = res.data.user
      })
    },
    getStudents () {
      if (JSON.parse(window.sessionStorage.getItem('user')).roomId == null) {
        return
      }
      this.getRequest('/user/getbyroomsid?roomsId=' + JSON.parse(window.sessionStorage.getItem('user')).roomId).then(res => {
        this.studentsData = res.data.userList
      })
    }

  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    margin: 40px 0;
  }
  .main-title {
    margin: 0;
    border-left: 5px solid rgba($color: #000000, $alpha: 0.7);
    padding-left: 10px;
  }
</style>
