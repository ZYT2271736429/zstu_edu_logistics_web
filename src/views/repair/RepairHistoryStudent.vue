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
        <el-table-column prop="reservationTime" label="预约时间"></el-table-column>
        <el-table-column prop="repairman.name" label="维修人"></el-table-column>
        <el-table-column prop="repairman.phone" label="维修人电话"></el-table-column>
        <el-table-column prop="repairTime" label="维修时间"></el-table-column>
        <el-table-column label="维修状态">
          <template slot-scope="scope">
            <div v-if="scope.row.repairStatus === 3">
              {{ '已完成' }}
            </div>
            <div v-else>
              <el-link
                type="primary"
                @click="handleClickUpdate(scope.row.id)"
              >
                {{ scope.row.repairStatus === 1 ? '待处理' : '处理中' }}
              </el-link>
            </div>
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
  name: 'RepairHistoryStudent',
  data () {
    return {
      queryCondition: {
        current: 1,
        size: 10,
        total: 0,
        userId: JSON.parse(window.sessionStorage.getItem('user')).id
      },
      repairList: []
    }
  },
  created () {
    this.getAll()
  },
  methods: {
    getAll () {
      this.postRequest('/repair/getstudentall', this.queryCondition).then(res => {
        this.repairList = res.data.repairList.list
        this.queryCondition.total = res.data.repairList.total
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
        path: '/repair/status',
        query: { id: id }
      })
    }
  }
}
</script>

<style scoped>

</style>
