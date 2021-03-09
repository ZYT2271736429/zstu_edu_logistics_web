<template>
  <div>
    <el-table :data="buyList" border style="width: 100%">
      <el-table-column prop="id" label="编号">
        <template slot-scope="scope">
          <el-link
            type="primary"
            @click="handleClickDetail(scope.row.id)"
          >
            {{ scope.row.id }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="buyTime" label="申购时间"></el-table-column>
      <el-table-column prop="title" label="申购内容"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column prop="facultyBuy.name" label="申购人"></el-table-column>
      <el-table-column prop="facultyBuy.phone" label="申购人电话"></el-table-column>
      <el-table-column label="审核">
        <template slot-scope="scope">
          <el-link type="primary" @click="handleClickTrue(scope.row)">
            通过
          </el-link>
          <el-divider direction="vertical"></el-divider>
          <el-link type="danger" @click="handleClickFalse(scope.row)">
            拒绝
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
import moment from 'moment'

export default {
  name: 'AssetStatus',
  data () {
    return {
      queryCondition: {
        current: 1,
        size: 10,
        total: 0,
        status: false,
        statusIfOne: true
      },
      buyList: [],
      buy: {}
    }
  },
  created () {
    this.getAll()
  },
  methods: {
    getAll () {
      this.postRequest('/buy/getbycondition', this.queryCondition).then(res => {
        this.buyList = res.data.buyList.list
        this.queryCondition.total = res.data.buyList.total
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
    handleClickTrue (val) {
      this.$confirm('是否确认通过审核?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        val.status = 1
        val.completeTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        val.facultyDealId = JSON.parse(window.sessionStorage.getItem('user')).id
        this.buy = val
        this.postRequest('/buy/pass', this.buy).then(res => {
          this.$message({
            type: 'success',
            message: '审核成功!'
          })
          this.getAll()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    handleClickFalse (val) {
      this.$confirm('是否确认拒绝审核?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        val.status = 2
        val.completeTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        val.facultyDealId = JSON.parse(window.sessionStorage.getItem('user')).id
        this.buy = val
        this.postRequest('/buy/refuse', this.buy).then(res => {
          this.$message({
            type: 'success',
            message: '审核成功!'
          })
          this.getAll()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    handleClickDetail (id) {
      this.$router.push({ path: '/user/assetDetail', query: { id: id } })
    }
  }
}

</script>

<style scoped>

</style>
