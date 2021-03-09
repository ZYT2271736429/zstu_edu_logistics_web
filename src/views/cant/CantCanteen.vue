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
          <el-col :span="4" :offset="1">
            <el-button type="primary" @click="dialogFormVisible=true">新增档口</el-button>
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
        <el-table-column label="修改档口">
          <template slot-scope="scope">
            <el-link
              type="primary"
              @click="handleClickUpdate2(scope.row.id)"
            >
              修改
            </el-link>
          </template>
        </el-table-column>
        <el-table-column label="删除档口">
          <template slot-scope="scope">
            <el-link
              type="primary"
              @click="handleClickUpdate3(scope.row.id)"
            >
              删除
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
      <el-dialog
        title="新增档口"
        :visible.sync="dialogFormVisible"
      >
        <el-form :model="stall" :rules="rules" ref="stall" label-width="100px" class="demo-ruleForm">
          <el-form-item label="选择食堂" prop="canteenId">
            <el-select v-model="stall.canteenId" clearable placeholder="请选择">
              <el-option
                v-for="item in canteenList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="档口名称" prop="name">
            <el-input v-model="stall.name"></el-input>
          </el-form-item>
          <el-form-item label="档口负责人" prop="head">
            <el-input v-model="stall.head"></el-input>
          </el-form-item>
          <el-form-item label="负责人电话" prop="phone">
            <el-input v-model="stall.phone"></el-input>
          </el-form-item>
          <el-form-item label="档口图片" prop="photo">
            <el-upload
              class="avatar-uploader"
              action="http://localhost:8080/api/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess">
              <img style="width: 170px;height: 170px" v-if="stall.photo" :src="stall.photo" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-row :gutter="20">
            <el-col :span="6" :offset="3">
              <el-form-item>
                <el-button type="primary" @click="submitForm('stall')">确定</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="1">
              <el-form-item>
                <el-button type="primary" @click="resetForm('stall')">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
      <el-dialog
        title="修改档口信息"
        :visible.sync="dialogFormVisible2"
      >
        <el-form :model="stall2" :rules="rules2" ref="stall2" label-width="100px" class="demo-ruleForm">
          <el-form-item label="选择食堂" prop="canteenId">
            <el-select v-model="stall2.canteenId" clearable placeholder="请选择">
              <el-option
                v-for="item in canteenList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="档口名称" prop="name">
            <el-input v-model="stall2.name"></el-input>
          </el-form-item>
          <el-form-item label="档口负责人" prop="head">
            <el-input v-model="stall2.head"></el-input>
          </el-form-item>
          <el-form-item label="负责人电话" prop="phone">
            <el-input v-model="stall2.phone"></el-input>
          </el-form-item>
          <el-form-item label="档口图片" prop="photo">
            <el-upload
              class="avatar-uploader"
              action="http://localhost:8080/api/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess2">
              <img style="width: 170px;height: 170px" v-if="stall2.photo" :src="stall2.photo" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-row :gutter="20">
            <el-col :span="6" :offset="3">
              <el-form-item>
                <el-button type="primary" @click="submitForm2('stall2')">确定</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="1">
              <el-form-item>
                <el-button type="primary" @click="dialogFormVisible2=false">取消</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'CantCanteen',
  data () {
    return {
      dialogFormVisible: false,
      dialogFormVisible2: false,
      queryCondition: {
        current: 1,
        size: 10,
        total: 0,
        canteenId: '',
        stallName: ''
      },
      stallList: [],
      canteenList: [],
      stall: {
        name: '',
        head: '',
        phone: '',
        canteenId: '',
        photo: ''
      },
      stall2: {},
      rules: {
        name: [{ required: true, message: '不能为空', trigger: 'blur' }],
        head: [{ required: true, message: '不能为空', trigger: 'blur' }],
        phone: [{ required: true, message: '不能为空', trigger: 'blur' }],
        photo: [{ required: true, message: '不能为空', trigger: 'blur' }],
        canteenId: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      rules2: {
        name: [{ required: true, message: '不能为空', trigger: 'blur' }],
        head: [{ required: true, message: '不能为空', trigger: 'blur' }],
        phone: [{ required: true, message: '不能为空', trigger: 'blur' }],
        photo: [{ required: true, message: '不能为空', trigger: 'blur' }],
        canteenId: [{ required: true, message: '不能为空', trigger: 'blur' }]
      }
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
    handleAvatarSuccess (res) {
      this.stall.photo = '/api/file/' + res
    },
    handleAvatarSuccess2 (res) {
      this.stall2.photo = '/api/file/' + res
    },
    handleSizeChange (val) {
      this.queryCondition.size = val
      this.getAll()
    },
    handleCurrentChange (val) {
      this.queryCondition.current = val
      this.getAll()
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.postRequest('/stall/add', this.stall).then(res => {
            this.dialogFormVisible = false
            this.getAll()
          })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.stall.phone = ''
    },
    submitForm2 (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.postRequest('/stall/update', this.stall2).then(res => {
            this.dialogFormVisible2 = false
            this.getAll()
          })
        } else {
          return false
        }
      })
    },
    handleClickUpdate2 (id) {
      this.dialogFormVisible2 = true
      this.postRequest('/stall/getone', id).then(res => {
        this.stall2 = res.data.stall
      })
    },
    handleClickUpdate3 (id) {
      this.$confirm('是否删除此档口?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.postRequest('/stall/delete', id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getAll()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
