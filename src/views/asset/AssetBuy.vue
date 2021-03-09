<template>
  <div>
    <el-form :model="buy" :rules="rules" ref="buy" label-width="100px" class="demo-ruleForm">
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
      <el-row>
        <el-col :span="4">
          <el-button type="primary" @click="dialogFormVisible=true">添加已有资产</el-button>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="dialogFormVisible2=true">添加新资产</el-button>
        </el-col>
      </el-row>
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
        <el-table-column label="删除">
          <template slot-scope="scope">
            <el-link
              type="primary"
              @click="handleClickDelete(scope.row.productId,scope.row.product.price,scope.row.number)"
            >
              删除
            </el-link>
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
      <br>
      <el-row :gutter="20">
        <el-col :span="6" :offset="7">
          <el-form-item>
            <el-button type="primary" @click="submitForm('buy')">确认申购</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog
      title="添加现有资产"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="item" :rules="rules2" ref="item" label-width="100px" class="demo-ruleForm">
        <el-form-item label="名称" prop="productId">
          <el-select
            v-model="item.productId"
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            style="width: 150px"
            :loading="productList.loading"
          >
            <el-option
              v-for="item in productList.options"
              :key="item.value"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数量" prop="number">
          <el-input v-model="item.number"></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="6" :offset="3">
            <el-form-item>
              <el-button type="primary" @click="submitForm2('item')">确定</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="1">
            <el-form-item>
              <el-button type="primary" @click="resetForm('item')">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog
      title="添加新资产"
      :visible.sync="dialogFormVisible2"
    >
      <el-form :model="product" :rules="rules3" ref="product" label-width="100px" class="demo-ruleForm">
        <el-form-item label="名称" prop="name">
          <el-input v-model="product.name"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="product.price"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8080/api/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess">
            <img style="width: 170px;height: 170px" v-if="product.photo" :src="product.photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            type="textarea"
            :rows="3"
            v-model="product.description">
          </el-input>
        </el-form-item>
        <el-form-item label="类型" prop="productTypeId">
          <el-select v-model="product.productTypeId" clearable placeholder="请选择">
            <el-option
              v-for="item in productTypeList"
              :key="item.id"
              :label="item.type"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数量" prop="number">
          <el-input v-model="product.number"></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="6" :offset="3">
            <el-form-item>
              <el-button type="primary" @click="submitForm3('product')">确定</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="1">
            <el-form-item>
              <el-button type="primary" @click="resetForm('product')">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'AssetBuy',
  data () {
    return {
      dialogFormVisible: false,
      dialogFormVisible2: false,
      queryCondition: {
        current: 1,
        size: 10000,
        total: 0
      },
      productList: {
        options: [],
        list: [],
        loading: false
      },
      productTypeList: [],
      item: {
        productId: '',
        number: '',
        product: {}
      },
      product: {
        name: '',
        price: '',
        photo: '',
        description: '',
        stock: 0,
        total: 0,
        productTypeId: '',
        number: ''
      },
      buy: {
        buyTime: '',
        title: '',
        description: '',
        price: 0,
        status: 0,
        facultyBuyId: JSON.parse(window.sessionStorage.getItem('user')).id,
        itemList: []
      },
      rules: {
        title: [{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }],
        description: [{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }]
      },
      rules2: {
        productId: [{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }],
        number: [{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }]
      },
      rules3: {
        name: [{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }],
        price: [{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }],
        number: [{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }],
        productTypeId: [{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }]
      }
    }
  },
  created () {
    this.getAll()
    this.getAllType()
  },
  methods: {
    handleAvatarSuccess (res) {
      this.product.photo = '/api/file/' + res
    },
    getAllType () {
      this.getRequest('/product-type/getall').then(res => {
        this.productTypeList = res.data.productTypeList
      })
    },
    getAll () {
      this.postRequest('/product/getbycondition', this.queryCondition).then(res => {
        this.productList.list = res.data.productList.list
      })
    },
    remoteMethod (query) {
      if (query !== '') {
        this.productList.loading = true
        setTimeout(() => {
          this.productList.loading = false
          this.productList.options = this.productList.list.filter(item => {
            return (
              item.name.toLowerCase().indexOf(query.toLowerCase()) > -1
            )
          })
        }, 200)
      } else {
        this.productList.options = []
      }
    },
    handleClickDelete (val, price, number) {
      this.buy.itemList.forEach(function (item, index, arr) {
        if (item.productId === val) {
          arr.splice(index, 1)
        }
      })
      this.buy.price = this.buy.price - number * price
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.buy.buyTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
          this.postRequest('/buy/add', this.buy).then(res => {
            this.$router.push('/asset/history')
          })
        } else {
          return false
        }
      })
    },
    submitForm2 (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.postRequest('/product/getone', this.item.productId).then(res => {
            this.item.product = res.data.product
            var x = {
              productId: this.item.productId,
              number: this.item.number,
              product: res.data.product
            }
            this.buy.itemList.push(x)
            this.buy.price = this.buy.price + this.item.product.price * this.item.number
            this.dialogFormVisible = false
            this.item.productId = ''
            this.item.number = ''
          })
        } else {
          return false
        }
      })
    },
    submitForm3 (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.postRequest('/product/add', this.product).then(res => {
            this.item.productId = res.data.product.id
            this.item.number = this.product.number
            this.item.product = res.data.product
            var x = {
              productId: res.data.product.id,
              number: this.product.number,
              product: res.data.product
            }
            this.buy.itemList.push(x)
            this.buy.price = this.buy.price + this.item.product.price * this.item.number
            this.dialogFormVisible2 = false
            this.item.productId = ''
            this.item.number = ''
          })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
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
