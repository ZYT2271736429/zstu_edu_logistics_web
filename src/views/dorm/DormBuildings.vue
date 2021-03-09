<template>
  <div id="building-manage" class="page-wrapper">
    <!-- 顶部表单 -->
    <h1 class="main-title">创建宿舍楼</h1>
    <div class="wrapper">
      <BuildingAddForm @submitSuccess="getBuildings"></BuildingAddForm>
    </div>

    <!-- 宿舍卡片 -->
    <h1 class="main-title">宿舍楼一览</h1>
    <div class="wrapper">
      <el-row :gutter="30">
        <el-col
          v-for="(building, index) in buildings"
          :key="building.id"
          :sm="8"
        >
          <div class="room-card main-card" @click="toFloors(building.id)">
            <div class="title">NO.{{ index + 1 }} {{ building.name }}</div>
            <div class="building-info">
              楼层数：<span>{{ building.floorCount }}</span>
            </div>
            <div class="building-info">
              房间数：<span>{{ building.roomCount }}</span>
            </div>
            <div class="building-info">
              学生数：<span>{{ building.studentCount }}</span>
            </div>
            <div class="btn-wrapper">
              <el-tooltip
                effect="dark"
                content="删除宿舍楼"
                placement="bottom-start"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="handleDelete(building)"
                ></el-button>
              </el-tooltip>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 宿舍卡片 -->

  </div>
</template>

<script>
import BuildingAddForm from './components/BuildingAddForm'
export default {
  name: 'DormBuildings',
  components: {
    BuildingAddForm
  },
  data () {
    return {
      buildings: []
    }
  },
  created () {
    this.getBuildings()
  },
  methods: {
    toFloors (id) {
      this.$router.push({
        path: '/dorm/floors',
        query: { id: id }
      })
    },
    getBuildings () {
      this.getRequest('/buildings/getall').then(res => {
        this.buildings = res.data.buildingsList
      })
    },
    handleDelete (building) {
      this.$confirm(`确认要删除 “${building.name}” 宿舍吗`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.postRequest('/buildings/delete', building.id).then(res => {
          this.$message({ type: 'success', message: '删除成功！' })
          this.getBuildings()
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    margin: 40px 0;
  }
  .room-card {
    overflow: visible;
    margin-bottom: 30px;
    position: relative;
    .title {
      margin: -20px;
      margin-bottom: 20px;
      padding: 20px;
      background-color: #1890ff;
      font-size: 20px;
      color: #ffffff;
      font-weight: bold;
      border-radius: 5px 5px 0 0;
    }
    .building-info {
      margin: 10px 0;
      span {
        font-weight: bold;
      }
    }
    .btn-wrapper {
      position: absolute;
      right: 20px;
      top: 40px;
      .el-button {
        box-shadow: 0 0 5px rgba($color: #000000, $alpha: 0.2);
      }
    }
  }
  .main-card {
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
    overflow: hidden;
  }
  .main-title {
    margin: 0;
    border-left: 5px solid rgba($color: #000000, $alpha: 0.7);
    padding-left: 10px;
  }
</style>
