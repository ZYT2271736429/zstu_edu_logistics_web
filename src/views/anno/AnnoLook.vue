<template>
  <div>
    <div class="block">
      <el-timeline>
        <el-timeline-item timestamp="置顶公告" placement="top">
          <div @click="announcementDetail(announcementTop.id)">
            <el-card>
              <h4>{{announcementTop.title}}</h4>
              <p> 发布于 {{announcementTop.releaseTime}}</p>
            </el-card>
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>
    <div class="block">
      <el-timeline>
        <el-timeline-item placement="top"
                          v-for="(announcement,index) in announcementList"
                          :key="index"
        >
          <div @click="announcementDetail(announcement.id)">
            <el-card>
              <h4>{{announcement.title}}</h4>
              <p> 发布于 {{announcement.releaseTime}}</p>
            </el-card>
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnnoLook',
  data () {
    return {
      announcementList: {},
      announcementTop: {}
    }
  },
  methods: {
    getAll () {
      this.getRequest('/announcement/getall').then(res => {
        this.announcementList = res.data.announcementList
      })
    },
    announcementDetail (id) {
      this.$router.push({ path: '/user/annoDetail', query: { id: id } })
    },
    getTop () {
      this.getRequest('/announcement/gettop').then(res => {
        this.announcementTop = res.data.announcementTop
      })
    }
  },
  created () {
    this.getAll()
    this.getTop()
  }
}
</script>

<style scoped>

</style>
