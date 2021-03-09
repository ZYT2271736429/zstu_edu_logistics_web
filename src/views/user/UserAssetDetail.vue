<template>
  <div>
    <el-form label-width="100px" class="demo-ruleForm" disabled>
      <el-form-item label="申购标题" prop="title">
        <el-input v-model="buy.title"></el-input>
      </el-form-item>
      <el-form-item label="详细描述" prop="description">
        <el-input
          type="textarea"
          :rows="3"
          v-model="buy.description">
        </el-input>
      </el-form-item>
    </el-form>
      <br>
      <el-table :data="buy.itemList" border style="width: 100%">
        <el-table-column prop="product.id" label="物品编号"></el-table-column>
        <el-table-column prop="product.name" label="物品名称"></el-table-column>
        <el-table-column prop="product.price" label="物品单价"></el-table-column>
        <el-table-column prop="number" label="申购数量"></el-table-column>
        <el-table-column label="总计">
          <template slot-scope="scope">
            {{ scope.row.product.price*scope.row.number}}
          </template>
        </el-table-column>
      </el-table>
      <br>
      <el-row>
        <el-col :span="1">
          <el-tag type="success">总价</el-tag>
        </el-col>
        <el-col :span="3">
          <div style="margin-top: 5px;margin-left: 15px">
            {{buy.price}}
          </div>
        </el-col>
      </el-row>
  </div>
</template>

<script>

export default {
  name: 'UserAssetDetail',
  data () {
    return {
      id: '',
      buy: {}
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getOne()
  },
  methods: {
    getOne () {
      this.postRequest('/buy/getone', this.id).then(res => {
        this.buy = res.data.buy
      })
    }
  }

}
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
