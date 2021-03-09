<template>
  <div>
    <el-row>
      <el-col :span="4" :offset="18">
        <h4 style="margin-top: 2px">只查看审核通过</h4>
      </el-col>
      <el-col :span="2">
        <el-switch
          v-model="statusIf"
          active-color="#13ce66"
          inactive-color="#000000">
        </el-switch>
      </el-col>
    </el-row>
    <el-table :data="buyList" border style="width: 100%">
      <el-table-column label="编号">
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
      <el-table-column prop="facultyDeal.name" label="审核人"></el-table-column>
      <el-table-column prop="facultyDeal.phone" label="审核人电话"></el-table-column>
      <el-table-column prop="completeTime" label="审核时间"></el-table-column>
      <el-table-column label="申购状态">
        <template slot-scope="scope">
            {{ scope.row.status === 0 ? '待审核' : scope.row.status === 1 ? '通过' : '未通过'}}
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
  name: 'AssetHistory',
  data () {
    return {
      statusIf: false,
      queryCondition: {
        current: 1,
        size: 10,
        total: 0,
        status: false,
        statusIfOne: false
      },
      buyList: []
    }
  },
  created () {
    this.getAll()
  },
  watch: {
    statusIf: {
      immediate: true,
      handler (statusIf) {
        this.queryCondition.status = statusIf
        this.getAll()
      }
    }
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
    handleClickDetail (id) {
      this.$router.push({ path: '/user/assetDetail', query: { id: id } })
    }
  }
}

</script>

<style scoped>

</style>
