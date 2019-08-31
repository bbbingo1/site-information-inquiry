<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-28 19:45:12
 * @LastEditTime: 2019-08-29 17:37:32
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <header id='b-header'>
      <div class="container">
        <nav class="navbar">
          <ul>
            <li v-for="(menu,index) in $router.options.routes" v-if="menu.menuShow" :key="index" @click="routerLink(index,menu.path)">
              <a :class="menuIndex === index ? 'active' :''">{{menu.showName}}</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      menuIndex: global.currentPath.data[0]
    };
  },
  methods: {
    //路由跳转
    routerLink(index, path) {
      this.$router.push(path);
      this.menuIndex = index;
      global.currentPath.data = [index]; //给menuIndex赋值点击的路由下标
    }
  },
  created() {
    let that = this;
    Object.defineProperty(global.currentPath, "data", {
      get() {
        return this._data;
      },
      set(val) {
        if (Array.isArray(val)) {
          this._data = val;
          that.menuIndex = val[0]; //模拟监听，当global.currentPath.data被调用set时更改导航栏高亮
          return val;
        }
      }
    });
  }
};
</script>

<style scoped lang='scss'>
#b-header {
  background-color: #0091ea;
  width: 100%;
}
@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}
@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }
}
.navbar {
  & {
    padding: 20px 0;
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 0.5rem 1rem;
  }
  ul {
    & {
      width: 100%;
      margin-right: auto !important;
      padding-left: 0;
      margin-bottom: 0;
      list-style: none;
      margin-left: 100px;
    }
    li {
      & {
        list-style: none;
        display: inline-block;
        font-size: 17px;
        line-height: 1.59;
        margin-right: 4px;
      }
      a {
        color: #fefeff;
        display: block;
        font-size: 16px;
        font-weight: 700;
        text-transform: uppercase;
        padding: 9px 18px;
        border-radius: 15px;
        -webkit-transition: all 0.5s;
        -o-transition: all 0.5s;
        transition: all 0.5s;
        text-decoration: none;
        cursor: pointer;
      }
      a:hover {
        background-color: #fff;
        color: #0091ea !important;
      }
    }
  }
}
@media (min-width: 992px) {
  .navbar {
    -ms-flex-direction: row;
    flex-direction: row;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    -ms-flex-pack: start;
    justify-content: flex-start;
  }
}
</style>

