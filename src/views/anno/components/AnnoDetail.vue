<template>
  <el-dialog
    :visible.sync="visible"
    :show="show"
    title="公告详情"
    width="80%"
    center
    @close="OnClose()"
  >
    <div style="padding: 20px 0"></div>
    <div class="lpMyWay">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span align="center">
            <h2>{{announcement.title}}</h2>
          </span>
          <p style="float: right;padding: 3px 0; color: #2154FA">{{announcement.releaseTime}}</p>
        </div>
        <div style="padding: 10px 0"></div>
        <div>
          <p style="align-items: center">
            {{announcement.description}}
          </p>
        </div>
        <div style="padding: 10px 0"></div>
      </el-card>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'AnnoDetail',
  props: {
    show: { type: Boolean, default: false }, // 组件是否显示
    id: { default: null } // 传入的故障ID
  },
  data () {
    return {
      visible: this.show,
      announcement: {}
    }
  },
  watch: {
    show: {
      immediate: true,
      async handler () {
        this.visible = this.show
        if (this.visible === true) {
          this.getOne()
        }
      }
    }
  },
  methods: {
    getOne () {
      this.postRequest('/announcement/getone', this.id).then(res => {
        this.announcement = res.data.announcement
      })
    },
    OnClose () {
      this.$emit('update:show', false)
    }
  }
}
</script>

<style scoped>
  .lpMyWay{
    align-items: center;
    width: 800px;
    box-shadow: 0 5px 20px #999;
    background-color: white;
    margin: 0 auto;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 800px;
  }
</style>
