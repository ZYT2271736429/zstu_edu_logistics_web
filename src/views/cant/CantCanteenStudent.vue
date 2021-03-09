<template>
  <div>
    <el-form label-width="80px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="选择食堂">
            <el-select v-model="queryCondition.canteenId" clearable placeholder="请选择">
              <el-option
                v-for="item in canteenList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-form-item label="输入档口">
            <el-input v-model="queryCondition.stallName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4" :offset="2">
          <el-button type="primary" @click="getAll">搜索</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="stallList" border style="width: 100%">
      <el-table-column prop="canteen.name" label="食堂"></el-table-column>
      <el-table-column prop="canteen.head" label="食堂负责人"></el-table-column>
      <el-table-column prop="canteen.phone" label="食堂负责人电话"></el-table-column>
      <el-table-column label="档口">
        <template slot-scope="scope">
          <el-link
            type="primary"
            @click="handleClickUpdate(scope.row.id)"
          >
            {{ scope.row.name }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="head" label="档口负责人"></el-table-column>
      <el-table-column prop="phone" label="档口负责人电话"></el-table-column>
      <el-table-column prop="healthScore" label="卫生评分"></el-table-column>
      <el-table-column prop="feedbackScore" label="满意度评分"></el-table-column>
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
  name: 'CantCanteenStudent',
  data () {
    return {
      dialogFormVisible: false,
      queryCondition: {
        current: 1,
        size: 10,
        total: 0,
        canteenId: '',
        stallName: ''
      },
      stallList: [],
      canteenList: []
    }
  },
  created () {
    this.getAll()
    this.getAllCanteen()
  },
  methods: {
    getAllCanteen () {
      this.getRequest('/canteen/getall').then(res => {
        this.canteenList = res.data.canteenList
      })
    },
    getAll () {
      this.postRequest('/stall/getbycondition', this.queryCondition).then(res => {
        this.stallList = res.data.stallList.list
        this.queryCondition.total = res.data.stallList.total
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
        path: '/user/cantDetails',
        query: { id: id }
      })
    }
  }
}
</script>

<style scoped>

</style>
