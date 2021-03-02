<template>
  <transition name="bounce">
    <div class="videoModal">
      <div class="dialog">
        <img class="topImg" src="@/assets/images/popbg_top.png" />
        <div class="videoBox">
          <video
            :src="video.video_url"
            controls
            autoplay
            webkit-playsinline="true"
            playsinline="true"
          ></video>
        </div>
        <img class="bottomImg" src="@/assets/images/popbg_bottom.png" />
        <div class="shareButton" @click="shareVideo">
          <img src="@/assets/images/pop_button.gif" />
        </div>
        <div class="closeModal" @click="hideModal">
          <img src="@/assets/images/close.png" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { Toast, Dialog } from 'vant'
export default {
  props: {
    video: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      show: true
    }
  },
  methods: {
    hideModal() {
      this.$emit('hideVideo')
      this.show = !this.show
    },
    shareVideo() {
      Toast.loading({
        duration: 0,
        message: '请稍等',
        forbidClick: true,
        loadingType: 'spinner'
      })
      var mode_share_url = this.video.mode_share_url
      var wx_share_url = this.video.wx_share_url
      var real_share = this.video.real_share
      this.$axios
        .post(
          'https://beta.wxj360.com/app/index.php?i=2&c=entry&m=crab_hot_video&do=douyin&op=index&&fn=upload_video&activity=4'
        )
        .then(res => {
          console.log(res)
          Toast.clear()
          const share = () => {
            if (res.data.share_url && res.data.share_url.length > 0) {
              alert(JSON.stringify(res.data))
              document.append('<iframe src="' + res.data.share_url + '" style="display:none"></iframe>')
              // alert(`${res.data.share_url}`)
              // window.location.href = res.data.share_url
              // alert('res.data.share_url::' + `${res.data.share_url}`)
              // window.location.href = 'https://www.163.com/'
            } else if (mode_share_url && mode_share_url.length > 0) {
              alert('mode_share_url::' + `${mode_share_url}`)
              // window.location.href = mode_share_url
              window.open('https://cq.qq.com', '_self')
              // alert(`${mode_share_url}`)
            } else {
              Toast.success('分享成功')
            }
          }

          if (wx_share_url && wx_share_url.length > 0) {
            alert('wx_share_url::' + `${wx_share_url}`)
            // window.location.href = wx_share_url
            window.location.href = 'https://www.sohu.com/'
            return
          } else {
            share()
          }
        })
        .catch(error => {
          Toast.clear()
          Dialog.alert({
            message: error
          }).then(() => {
            if (real_share && real_share > 0) window.location.href = real_share
            else return
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.videoModal {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: {
    color: rgba(0, 0, 0, 0.8);
  }

  .dialog {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 90%;
    min-height: 300px;
    margin-top: -30px;

    .topImg {
      position: static;
      z-index: 1;
    }

    .bottomImg {
      position: static;
      z-index: 1;
    }

    .videoBox {
      position: static;
      z-index: 0;
      width: 60%;
      height: auto;
      margin: {
        top: -50px;
        bottom: -50px;
      }

      video {
        max-width: 100%;
        min-height: 240px;
        background: rgba(0, 0, 0, 1);
        border-radius: 12px;
      }
    }

    .shareButton {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 30px;

      img {
        width: 50%;
      }
    }

    .closeModal {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 2;

      img {
        width: 40px;
      }
    }
  }
}

.bounce-enter-active {
  animation: bounce-in 0.3s;
}

.bounce-leave-active {
  animation: bounce-in 0.3s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
