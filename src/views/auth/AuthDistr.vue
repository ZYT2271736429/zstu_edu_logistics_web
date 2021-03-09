<template>
  <div>
    <input class="file" name="file" type="file" @change="update22"/>
    <el-form label-width="80px">
      <el-row>
        <el-col :span="6">
          <el-select v-model="queryCondition.roleId" clearable placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.role"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="getByRoleId">按权限搜索</el-button>
        </el-col>
        <el-col :span="6">
          <el-select
            v-model="queryCondition.userId"
            filterable
            remote
            reserve-keyword
            clearable
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            style="width: 150px"
            :loading="loading"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="getByUserId">按用户搜索</el-button>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-button type="primary" icon="el-icon-edit" @click="dialogFormVisible=true">授权</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="userRoleList" border style="width: 100%">
      <el-table-column prop="role.role" label="权限"></el-table-column>
      <el-table-column prop="user.name" label="用户"></el-table-column>
      <el-table-column prop="user.phone" label="联系方式"></el-table-column>
      <el-table-column label="维修状态">
        <template slot-scope="scope">
            <el-link
              type="primary"
              @click="handleClickUpdate(scope.row.id)"
            >
              取消授权
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
      title="添加用户权限"
      :visible.sync="dialogFormVisible"
    >
      <el-form label-width="100px" class="demo-ruleForm">
        <el-form-item label="选择用户">
          <el-select
            v-model="userRole.userId"
            @change="changeUserRole"
            filterable
            remote
            clearable
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            style="width: 150px"
            :loading="loading"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-transfer v-if="userRole.userId!=''" v-model="userRole.roleIdList" :data="data2"></el-transfer>
        <el-row :gutter="20">
          <el-col :span="6" :offset="3">
            <el-form-item>
              <el-button type="primary" @click="submitForm">确定</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="1">
            <el-form-item>
              <el-button type="primary" @click="dialogFormVisible=false">取消</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AuthDistr',
  computed: {
    data2 () {
      const data = []
      // const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都']
      this.roleList.forEach((role, index) => {
        data.push({
          label: role.role,
          key: role.id
        })
      })
      return data
    }
  },
  data () {
    return {
      // cities: ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'],
      queryCondition: {
        current: 1,
        size: 10,
        total: 0,
        userId: '',
        roleId: ''
      },
      userRoleList: [],
      userList: [],
      options: [],
      loading: false,
      roleList: [],
      dialogFormVisible: false,
      userRole: {
        userId: '',
        roleIdList: []
      }
    }
  },
  created () {
    this.getAll()
    this.getUserList()
    this.getRoleList()
  },
  methods: {
    getAll () {
      this.postRequest('/user-role/getbycondition', this.queryCondition).then(res => {
        this.userRoleList = res.data.userRoleList.list
        this.queryCondition.total = res.data.userRoleList.total
      })
    },
    getByRoleId () {
      this.queryCondition.userId = ''
      this.postRequest('/user-role/getbycondition', this.queryCondition).then(res => {
        this.userRoleList = res.data.userRoleList.list
        this.queryCondition.total = res.data.userRoleList.total
      })
    },
    getByUserId () {
      this.queryCondition.roleId = ''
      this.postRequest('/user-role/getbycondition', this.queryCondition).then(res => {
        this.userRoleList = res.data.userRoleList.list
        this.queryCondition.total = res.data.userRoleList.total
      })
    },
    getUserList () {
      this.getRequest('/user/getnostudent', this.queryCondition).then(res => {
        this.userList = res.data.userList
        console.log(this.userList)
      })
    },
    getRoleList () {
      this.getRequest('/role/getall', this.queryCondition).then(res => {
        this.roleList = res.data.roleList
        console.log(this.roleList)
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
      if (id === 1) {
        this.$message({
          type: 'error',
          message: '不允许取消授权!'
        })
        return
      }
      this.$confirm('是否确认取消授权?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.postRequest('/user-role/deletebyid', id).then(res => {
          this.$message({
            type: 'success',
            message: '取消授权成功!'
          })
          this.getAll()
        })
      }).catch(() => {
      })
    },
    remoteMethod (query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.options = this.userList.filter(item => {
            return (
              item.name.toLowerCase().indexOf(query.toLowerCase()) > -1
            )
          })
        }, 200)
      } else {
        this.options = []
      }
    },
    changeUserRole () {
      if (this.userRole.userId !== '') {
        const query = {
          current: 1,
          size: 10000,
          userId: this.userRole.userId
        }
        this.postRequest('/user-role/getbycondition', query).then(res => {
          for (let i = 0; i < res.data.userRoleList.list.length; i++) {
            this.userRole.roleIdList.push(res.data.userRoleList.list[i].roleId)
          }
        })
      }
    },
    submitForm () {
      this.postRequest('/user-role/add', this.userRole).then(res => {
      })
      this.$message('授权成功')
      this.dialogFormVisible = false
    },
    update22 (e) {
      const file = e.target.files[0]
      const param = new FormData() // 创建form对象
      param.append('file', file)// 通过append向form对象添加数据
      console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      } // 添加请求头
      this.postRequest('http://localhost:8080/student2Controller/get', param, config)
        .then(response => {
          console.log(response)
        })
    }
  }
}
</script>

<style scoped>

</style>
