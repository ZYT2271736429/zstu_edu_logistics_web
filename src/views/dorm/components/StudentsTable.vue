<template>
  <div class="StudentTable">
    <el-table :data="tableData" style="width: 100%" :stripe="true">
      <el-table-column label="姓名">
        <template slot-scope="scope">
          <a @click="gotoUserDetail(scope.row.id)">{{ scope.row.name }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="学号"></el-table-column>
      <el-table-column prop="phone" label="电话号"></el-table-column>
      <el-table-column label="入住时间">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{scope.row.roomTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="办理退宿">
        <template slot-scope="scope">
          <el-link
            type="primary"
            @click="handleClickUpdate(scope.row.id,scope.row.roomId)"
          >
            退宿
          </el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'StudentTable',
  data () {
    return {
      vIf: true
    }
  },
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleClickUpdate (id, roomId) {
      this.$confirm('是否确认办理退宿?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.postRequest('/user/deletedorm', id).then(res => {
          this.$message({
            type: 'success',
            message: '办理退宿成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消办理'
        })
      })
    },
    gotoUserDetail (id) {
      this.$router.push({ path: '/dorm/user', query: { userId: id } })
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  color: #1890ff;
}
</style>
