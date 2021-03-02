<template>
  <div
    v-wechat-title="videoInfo.title"
    class="templateWrapper scrollbar"
    :style="offsetBottom"
  >
    <img src="~@/assets/images/backgrount_top.gif" />
    <img src="~@/assets/images/backgrount_top_center.png" />
    <img src="~@/assets/images/backgrount_bottom_center.png" />
    <img src="~@/assets/images/backgrount_bottom.png" />
    <div ref="shareButton" class="shareButton" @click="showVideo">
      <img src="~@/assets/images/button.png" />
    </div>

    <!-- 弹出转发视频  -->
    <Modal
      v-if="showModal"
      :video="videoInfo"
      :merchant-id="videoInfo.merchant"
      @hideVideo="hideVideo"
    ></Modal>
  </div>
</template>

<script>
import Modal from './components/videoModal'
export default {
  name: 'Restaurant',
  components: {
    Modal
  },
  data() {
    return {
      offsetBottom: {
        paddingBottom: null + 'px'
      },
      showModal: false,
      videoInfo: {},
      urlInfo: {}
    }
  },
  mounted() {
    this.urlInfo.hostname = window.location.origin
    setTimeout(() => {
      this.getShareButtonHeight()
    }, 50)
    this.urlParams()
    this.getVideoInfo()
  },
  methods: {
    getShareButtonHeight() {
      const buttonHeight = this.$refs.shareButton.clientHeight
      this.offsetBottom.paddingBottom = buttonHeight - 16 + 'px'
      console.log(this.offsetBottom.paddingBottom)
    },

    showVideo() {
      this.showModal = true
    },

    hideVideo() {
      this.showModal = false
    },
    getVideoInfo() {
      console.group('链接参数')
      console.log(this.urlInfo.params)
      console.groupEnd()
      this.$axios
        .get(
          this.urlInfo.hostname +
            '/app/index.php?i=' +
            this.urlInfo.params.i +
            '&c=entry&m=crab_hot_video&do=douyin&op=index&&fn=index_ajax&ay=' +
            this.urlInfo.params.ay
          // 'http://59.111.92.15:7300/mock/603487721a0076bdc530c436/tiktok/getVideoInfo'
        )
        .then(res => {
          console.group('视频信息')
          this.videoInfo = res.data
          console.log(this.videoInfo)
          console.groupEnd()
        })
    },

    urlParams() {
      var url = window.location.href
      console.log(url)
      url = url.substr(url.indexOf('?') + 1)
      var params = {}
      var groups = url.split('&')
      for (var index in groups) {
        var group = groups[index]
        if (typeof group === 'string') {
          var keyVal = group.split('=')
          if (keyVal.length === 1) {
            params[keyVal[0]] = ''
          } else if (keyVal.length === 2) {
            params[keyVal[0]] = keyVal[1]
          }
        }
      }
      this.urlInfo.params = params
      return params
    }
  }
}
</script>

<style lang="scss" scoped>
.shareButton {
  position: fixed;
  bottom: 0;
}
</style>
