<template>
  <div>
    <el-table :data="repairList" border style="width: 100%">
      <el-table-column label="报修单号">
        <template slot-scope="scope">
          <el-link
            type="primary"
            @click="handleClickUpdate(scope.row.id)"
          >
            {{ scope.row.orderN }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="submitTime" label="报修时间" width="95"></el-table-column>
      <el-table-column prop="title" label="报修内容"></el-table-column>
      <el-table-column prop="repairType.type" label="故障类型"></el-table-column>
      <el-table-column prop="floor" label="报修楼宇"></el-table-column>
      <el-table-column prop="dormitory" label="报修宿舍"></el-table-column>
      <el-table-column prop="user.name" label="报修人"></el-table-column>
      <el-table-column prop="phone" label="报修电话"></el-table-column>
      <el-table-column prop="reservationTime" label="预约时间"></el-table-column>
      <el-table-column prop="repairman.name" label="维修人"></el-table-column>
      <el-table-column prop="repairman.phone" label="维修人电话"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handleClickUpdate(scope.row.id)"
          >
            修改
          </el-button>
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
  name: 'RepairUndone',
  data () {
    return {
      queryCondition: {
        current: 1,
        size: 10,
        total: 0
      },
      repairList: []
    }
  },
  created () {
    this.getUndone()
  },
  methods: {
    getUndone () {
      this.postRequest('/repair/getundone', this.queryCondition).then(res => {
        this.repairList = res.data.repairList.list
        this.queryCondition.total = res.data.repairList.total
      })
    },
    handleSizeChange (val) {
      this.queryCondition.size = val
      this.getUndone()
    },
    handleCurrentChange (val) {
      this.queryCondition.current = val
      this.getUndone()
    },
    handleClickUpdate (id) {
      this.$router.push({ path: '/user/repairUpdate', query: { id: id } })
    }
  }
}
</script>

<style scoped>

</style>
