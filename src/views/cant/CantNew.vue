<template>
  <div>
    <el-table :data="complaintList" border style="width: 100%">
      <el-table-column prop="complaintTime" label="投诉时间"></el-table-column>
      <el-table-column prop="stall.name" label="档口名称"></el-table-column>
      <el-table-column prop="title" label="投诉内容"></el-table-column>
      <el-table-column prop="name" label="投诉人"></el-table-column>
      <el-table-column prop="phone" label="投诉人电话"></el-table-column>
      <el-table-column label="处理">
        <template slot-scope="scope">
          <el-link
            type="primary"
            @click="handleClickUpdate(scope.row.id)"
          >
            去处理
          </el-link>
        </template>
      </el-table-column>
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
  name: 'CantNew',
  data () {
    return {
      queryCondition: {
        current: 1,
        size: 10,
        total: 0,
        status: 1
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
