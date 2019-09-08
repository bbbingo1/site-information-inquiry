<template>
  <!-- 64px 是 element-ui 的左侧菜单 collapse 时定的 -->
  <div class="main" :class="{'main-hide-text': isCollapse}">
    <div class="sidebar-menu" :style="{width: isCollapse?'64px':'200px', overflow: isCollapse ? 'visible' : 'auto'}">
      <shrinkable-menu :isCollapse="isCollapse">
        <!-- TODO 后续替换成 LOGO 内容 -->
        <div slot="top" class="logo">
          <div v-show="isCollapse" class="min-logo">
            <i class="fa fa-envelope fa-3x" style="width: 56px;height: 56px;color: #409EFF"></i>
          </div>
          <div v-show="!isCollapse" class="max-logo">
            <i class="fa fa-envelope fa-3x" style="width: 56px;height: 56px;color: #409EFF"></i>
            <span class="name">CMS</span>
          </div>
        </div>
      </shrinkable-menu>
    </div>
    <div class="header" :style="{paddingLeft: isCollapse?'64px':'200px'}">
      <div class="main-header">
        <hamBurger :isCollapse="isCollapse"></hamBurger>
        <breadCrumbs :levelList="levelList"></breadCrumbs>
      </div>
    </div>
    <div class="page-content" @DOMMouseScroll="handleScroll" @mousewheel="handleScroll" ref="scrollCon" :style="{left: isCollapse?'64px':'200px'}">
      <div class="single-page" ref="scrollBody" :style="{top: pageBodyTop + 'px'}">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import shrinkableMenu from "./memus/ShrinkableMenu";
import hamBurger from "./header/HamBurger";
import breadCrumbs from "./header/BreadCrumbs";

export default {
  name: "Main",
  components: {
    shrinkableMenu,
    hamBurger,
    breadCrumbs
  },
  computed: {
    isCollapse() {
      return this.$store.state.isCollapse;
    },
    levelList() {
      return this.$store.state.levelList;
    }
  },
  methods: {
    handleScroll(event) {
      const type = event.type;
      let delta = 0;
      let top = -10;
      if (type === "DOMMouseScroll" || type === "mousewheel") {
        delta = event.wheelDelta ? event.wheelDelta : -(event.detail || 0) * 40;
      }
      if (delta > 0) {
        top = Math.min(0, this.pageBodyTop + delta);
      } else if (
        this.$refs.scrollCon.offsetHeight - 50 <
        this.$refs.scrollBody.offsetHeight
      ) {
        if (
          this.pageBodyTop <
          -(
            this.$refs.scrollBody.offsetHeight -
            this.$refs.scrollCon.offsetHeight +
            50
          )
        ) {
          top = this.pageBodyTop;
        } else {
          top = Math.max(
            this.pageBodyTop + delta,
            this.$refs.scrollCon.offsetHeight -
              this.$refs.scrollBody.offsetHeight
          );
        }
      } else {
        this.pageBodyTop = -10;
      }
      this.pageBodyTop = top;
    }
  },
  data() {
    return {
      userName: "",
      pageBodyTop: -10,
      isFullScreen: false
    };
  }
};
</script>
<style lang="scss" scoped>
//Main
.main {
  background-color: #fff;
  position: absolute;
  width: 100%;
  height: 100%;
  .sidebar-menu {
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 21;
    transition: width 0.3s;
    background-color: #304156;
    .logo {
      padding: 8px 0;
      text-align: center;
      .max-logo {
        width: 161.5px;
        height: 44px;
        .name {
          font-size: 28px;
          color: #409eff;
        }
      }
      .min-logo {
        width: 44px;
        height: 44px;
      }
    }
  }
  .header {
    box-sizing: border-box;
    position: fixed;
    display: block;
    padding-left: 200px;
    width: 100%;
    height: 60px;
    //height: 100px;
    z-index: 20;
    box-shadow: 0 2px 1px 1px rgba(100, 100, 100, 0.1);
    transition: padding 0.3s;
    .main-header {
      height: 60px;
      background: #fff;
      box-shadow: 0 2px 1px 1px rgba(100, 100, 100, 0.1);
      position: relative;
      z-index: 11;
    }
  }
  .page-content {
    left: 200px;
    position: absolute;
    top: 50px;
    right: 0;
    bottom: 0;
    overflow: hidden;
    background-color: #f0f0f0;
    z-index: 1;
    transition: left 0.3s;
    .single-page {
      position: absolute;
      overflow: visible;
      left: 0;
      background-color: #fff;
      width: 100%;
      padding: 20px 10px;
    }
  }
}
</style>
