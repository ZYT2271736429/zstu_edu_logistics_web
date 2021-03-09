<template>
  <div class="FloorInfoCard main-card">
    <div class="title">楼层：{{ floorInfo.layer }}层</div>
    <div class="info">
      <div class="left">
      <!--  <router-link
          class="room-itme"
          :class="{
            empty: room.studentCount === 0,
            full: room.studentCount >= room.peopleNum
          }"
          v-for="room in floorInfo.roomsList"
          :key="room.id"
          tag="div"
          :to="{ name: '/dorm/DormRooms', query: { roomId: room.id } }"
        >
          {{ room.number }}
        </router-link>-->
        <div
          class="room-itme"
          :class="{
            empty: room.studentCount === 0,
            full: room.studentCount >= room.peopleNum
          }"
          v-for="room in floorInfo.roomsList"
          :key="room.id"
          @click="pushto(room.id)"
        >
          {{ room.number }}
        </div>
      </div>
      <div class="right">
        <div class="cleaner" @click="dialogVisible = true">
          <div class="title">保洁人员</div>
          <div class="cleaner-name">
            无
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FloorInfoCard',
  data () {
    return {
      dialogVisible: false
    }
  },
  props: {
    floorInfo: {
      type: Object,
      default: () => ({
        id: null,
        layer: null,
        buildingId: null,
        roomsList: []
      })
    },
    cleanersData: {
      type: Array,
      default: () => []
    }
  },
  mounted () {
  },
  methods: {
    pushto (id) {
      this.$router.push({
        path: '/dorm/rooms',
        query: { roomId: id }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.FloorInfoCard {
  margin-bottom: 20px;
  > .title {
    border-bottom: 2px solid rgba($color: #000000, $alpha: 0.1);
    padding: 20px;
    margin: -20px;
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: bold;
  }
  .info {
    display: flex;
    align-items: flex-start;
    .left {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      margin: -10px;
      .room-itme {
        width: 80px;
        margin: 10px;
        background-color: #1890ff;
        color: #ffffff;
        border-radius: 5px;
        text-align: center;
        cursor: pointer;
        transition: all ease 0.5s;
        border: 1px solid rgba($color: #000000, $alpha: 0.12);
        line-height: 40px;
        height: 40px;
        &:hover {
          transform: scale(1.1);
          box-shadow: 0 5px 7px rgba(0, 0, 0, 0.2);
        }
      }
      .room-itme.empty {
        background-color: rgba($color: #000000, $alpha: 0.1);
        color: rgba($color: #000000, $alpha: 0.8);
      }
      .room-itme.full {
        background-color: #ff4949;
        color: #ffffff;
      }
    }
    .right {
      .cleaner {
        width: 170px;
        height: 170px;
        border: 1px solid rgba($color: #000000, $alpha: 0.2);
        padding: 20px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        cursor: pointer;
        transition: all ease 0.2s;
        .title {
          margin-bottom: 20px;
          margin-top: -20px;
        }
        .cleaner-name {
          font-size: 22px;
          font-weight: bold;
        }
        &:hover {
          background-color: #1890ff;
          color: #ffffff;
        }
      }
    }
  }
  .dialog-body {
    .el-select {
      width: 100%;
    }
  }
}
</style>
