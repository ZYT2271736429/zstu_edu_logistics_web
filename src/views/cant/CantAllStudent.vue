<template>
  <div>
    <el-table :data="complaintList" border style="width: 100%">
      <el-table-column prop="complaintTime" label="投诉时间"></el-table-column>
      <el-table-column prop="stall.name" label="档口名称"></el-table-column>
      <el-table-column label="投诉内容">
        <template slot-scope="scope">
          <el-link
            type="primary"
            @click="handleClickUpdate(scope.row.id)"
          >
            {{ scope.row.title }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column label="投诉状态">
        <template slot-scope="scope">
            {{ scope.row.status===1 ? '处理中':'已完成' }}
        </template>
      </el-table-column>
      <el-table-column prop="user.name" label="处理人"></el-table-column>
      <el-table-column prop="user.phone" label="处理人电话"></el-table-column>
      <el-table-column prop="dealTime" label="处理时间"></el-table-column>
    </el-table>
    <br>
    <span style="text-align: center">
      <el-pagination
        :current-page="queryCondition.current"
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="queryCondition.size"
        :total="queryCondition.total"
        background
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></el-pagination>
    </span>
  </div>
</template>

<script>
export default {
  name: 'CantAllStudent',
  data () {
    return {
      queryCondition: {
        current: 1,
        size: 10,
        total: 0,
        userId: JSON.parse(window.sessionStorage.getItem('user')).id
      },
      complaintList: []
    }
  },
  created () {
    this.getAll()
  },
  methods: {
    getAll () {
      this.postRequest('/complaint/getbycondition', this.queryCondition).then(res => {
        this.complaintList = res.data.complaintList.list
        this.queryCondition.total = res.data.complaintList.total
      })
    },
    handleSizeChange (val) {
      this.queryCondition.size = val
      this.getAll()
    },
    handleCurrentChange (val) {
      this.queryCondition.current = val
      this.getAll()
    },
    handleClickUpdate (id) {
      this.$router.push({
        path: '/user/cantComplaintDetail',
        query: { id: id }
      })
    }
  }
}
</script>

<style scoped>

</style>
