<template>
    <div>
      <div class="block">
        <el-timeline>
          <el-timeline-item placement="top"
                            v-for="(feedback,index) in feedbackList"
                            :key="index"
          >
            <el-card>
              <el-form>
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="档口: ">
                      {{feedback.stall.name}}
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="菜品: ">
                      {{feedback.dishes.name}}
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="发表于: ">
                      {{feedback.feedbackTime}}
                    </el-form-item>
                  </el-col>
                  <el-col :span="2" :offset="2">
                    <el-link type="primary" style="margin-top: 10px" @click="toUpdate(feedback.id)">修改评价</el-link>
                  </el-col>
                  <el-col :span="2">
                    <el-link type="danger" style="margin-top: 10px" @click="delete2(feedback.id)">删除评价</el-link>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="评分: ">
                      <el-rate
                        style="margin-top: 11px"
                        v-model="feedback.score"
                        disabled
                        text-color="#ff9900"
                        show-text>
                      </el-rate>
                    </el-form-item>
                    <el-form-item label="评价: ">
                      {{feedback.feedback}}
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="图片">
                      <img style="width: 128px;height: 128px"  v-if="feedback.photo" :src="feedback.photo"
                           class="avatar">
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
</template>

<script>
export default {
  name: 'CantHistoryStudent',
  data () {
    return {
      queryCondition: {
        current: 1,
        size: 100000,
        total: 0,
        userId: JSON.parse(window.sessionStorage.getItem('user')).id
      },
      feedbackList: []
    }
  },
  created () {
    this.getAll()
  },
  methods: {
    getAll () {
      this.postRequest('/feedback/getbycondition', this.queryCondition).then(res => {
        this.feedbackList = res.data.feedbackList.list
      })
    },
    delete2 (id) {
      this.$confirm('是否删除评价?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.postRequest('/feedback/delete', id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    toUpdate (id) {
      this.$router.push({
        path: '/user/cantHistoryUpdate',
        query: { id: id }
      })
    }
  }
}
</script>

<style scoped>

</style>
