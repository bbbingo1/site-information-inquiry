<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 01:10:53
 * @LastEditTime: 2019-09-01 16:33:37
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div id="login">
    <div class="login_box">
      <div class="qrcode">
        <div id="wx_qrcode"></div>
        <div v-show="!isNeedRefresh" class="">
          <p class="sub_title">使用企业微信扫码登录</p>
          <!-- vIf: showPrivacyTips -->
          <p class="sub_desc v-scope" v-if="showPrivacyTips">需要配合手机使用</p><!-- end vIf: showPrivacyTips -->
        </div>
        <!-- <div v-show="isNeedRefresh" class="v-hide">
          <div class="refresh_qrcode_mask">
            <i class="icon-refresh" v-class="{rotateLoading: isRotateLoading}" v-click="refreshQrcode()"></i>
          </div>
          <p class="refresh_tips" v-if="isNeedRefresh">二维码失效，点击刷新</p>
        </div> -->
      </div>

    </div>
  </div>
</template>

<script>
import remoteLoad from "@/utils/remoteLoad.js";

export default {
  name: "login",
  data() {
    return {
      isNeedRefresh: false,
      showPrivacyTips: true
    };
  },
  methods: {
    initCode() {
      var obj = new WxLogin({
        id: "wx_qrcode",
        appid: "wx79915908529d16ad",
        scope: "snsapi_login",
        redirect_uri:
          "http%3A%2F%2Flaws.genesysinfo.net%3A8090%2F%23%2Floginsuccess",
        state: "",
        style: "black",
        href: ""
      });
    }
  },
  created() {
    global.currentPath.data = [3];
  },
  async mounted() {
    if (window.WxLogin && window.WxLogin) {
      this.initCode();
      // 未载入高德地图API，则先载入API再初始化
    } else {
      await remoteLoad(
        "http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"
      );
      this.initCode();
    }
  }
};
</script>

<style scoped lang='less'>
.login {
  height: 100%;
  min-width: 860px;
  min-height: 700px;
  overflow: auto;
  position: relative;
}
.login_box {
  & {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -190px;
    margin-top: -270px;
    border-radius: 4px;
    -moz-border-radius: 4px;
    -webkit-border-radius: 4px;
    background-color: #fff;
    width: 380px;
    height: 540px;
    box-shadow: 0 2px 10px #999;
    -moz-box-shadow: #999 0 2px 10px;
    -webkit-box-shadow: #999 0 2px 10px;
  }
  .qrcode {
    & {
      position: relative;
      text-align: center;
    }
    .img {
      display: block;
      width: 270px;
      height: 270px;
      margin: 42px auto 12px;
    }
    .sub_title {
      text-align: center;
      font-size: 20px;
      color: #353535;
      margin-bottom: 23px;
    }
    .sub_desc {
      text-align: center;
      color: #a3a3a3;
      font-size: 15px;
      padding: 0 40px;
      line-height: 1.8;
    }
    .refresh_qrcode_mask {
      & {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 270px;
      }
      .refresh_tips {
        color: #353535;
      }
    }
  }
}
</style>
