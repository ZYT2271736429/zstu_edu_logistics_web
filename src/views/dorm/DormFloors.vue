<template>
  <div id="FloorManage" class="page-wrapper">
    <h1 class="main-title">楼层管理</h1>
    <div class="selector-wrapper main-card wrapper">
      <GroupSelector v-model="selectorData" />
      <el-button
        type="primary"
        round
        :disabled="selectorData.buildingId === null"
        @click="handleSubmitClick"
      >获取数据</el-button
      >
    </div>
    <h1 class="main-title">楼层信息</h1>
    <div class="list-wrapper">
      <div class="main-card" v-if="floorsData.length === 0">
        请选择宿舍楼
      </div>
      <FloorInfoCard
        v-for="floor in floorsData"
        :key="floor.id"
        :floor-info="floor"
        :cleaners-data="cleanersData"
      />
    </div>
  </div>
</template>

<script>
import GroupSelector from '@/components/GroupSelector'
import FloorInfoCard from './components/FloorInfoCard'
export default {
  name: 'DormFloors',
  components: {
    GroupSelector,
    FloorInfoCard
  },
  data () {
    return {
      selectorData: {
        buildingId: null
      },
      floorsData: [],
      cleanersData: []
    }
  },
  created () {
    if (this.$route.query.id != null) {
      this.selectorData.buildingId = this.$route.query.id
      this.handleSubmitClick()
    }
  },
  methods: {
    handleSubmitClick () {
      this.getRequest('/floors/getbybuildingsid?buildingsId=' + this.selectorData.buildingId).then(res => {
        this.floorsData = res.data.floorsList
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    margin: 40px 0;
  }

  .selector-wrapper {
    display: flex;
    justify-content: space-between;
  }

  .list-wrapper {
    margin-top: 40px;
  }
  .main-title {
    margin: 0;
    border-left: 5px solid rgba($color: #000000, $alpha: 0.7);
    padding-left: 10px;
  }
  .main-card {
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
    overflow: hidden;
  }
  .page-wrapper {
    padding: 50px 60px 0px;
  }
</style>
