<!--
 * @Description：
    拖放地图组件，默认尺寸
    接收属性参数：
    自定义事件：
      drag: 拖放完成事件
 * @Author: your name
 * @Date: 2019-08-29 13:38:27
 * @LastEditTime: 2019-11-04 14:01:07
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="m-map">
    <div class="search" v-if="placeSearch">
      <input type="text" placeholder="请输入关键字" v-model="searchKey">
      <button type="button" @click="handleSearch">搜索</button>
    </div>
    <div id="simple-container" class="map" @mousewheel.stop>正在加载数据 ...</div>
    <div id="simple-result" class="result" @mousewheel.stop></div>
  </div>
</template>

<script>
const MapKey = "da5fae8f5e10d86564f1c0803232c577";
const WebKey = "7edc3121a9685b616129406e5695ba7d";
const MapCityName = "深圳";
export default {
  data() {
    return {
      searchKey: "",
      placeSearch: null,
      dragStatus: false,
      AMapUI: null,
      AMap: null
    };
  },
  watch: {
    searchKey() {
      if (this.searchKey === "") {
        this.placeSearch.clear();
      }
    }
  },
  methods: {
    // 搜索
    handleSearch() {
      if (this.searchKey) {
        this.placeSearch.search(this.searchKey);
      }
    },
    // 初始化地图
    initMap() {
      // 加载PositionPicker，loadUI的路径参数为模块名中 'ui/' 之后的部分
      let AMapUI = (this.AMapUI = window.AMapUI);
      let AMap = (this.AMap = window.AMap);
      AMapUI.loadUI(["misc/PositionPicker"], PositionPicker => {
        let mapConfig = {
          zoom: 16,
          cityName: MapCityName
        };
        let map = new AMap.Map("simple-container", mapConfig);
        // 加载地图搜索插件
        AMap.service("AMap.PlaceSearch", () => {
          //构造地点查询类
          this.placeSearch = new AMap.PlaceSearch({
            pageSize: 5, // 单页显示结果条数
            pageIndex: 1, // 页码
            // city: "深圳", // 兴趣点城市
            citylimit: true, //是否强制限制在设置的城市内搜索
            map: map, // 展现结果的地图实例
            panel: "simple-result", // 结果列表将在此容器中进行展示。
            autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
          });
        });
        // 启用工具条
        AMap.plugin(["AMap.ToolBar"], function() {
          map.addControl(
            new AMap.ToolBar({
              position: "RB"
            })
          );
        });
        // 创建地图拖拽
        let positionPicker = new PositionPicker({
          mode: "dragMarker", // 设定为拖拽地图模式，可选'dragMap'、'dragMarker'(拖拽图标模式)，默认为'dragMap'
          map: map // 依赖地图对象
        });
        // 拖拽完成发送自定义 drag 事件
        positionPicker.on("success", positionResult => {
          // 过滤掉初始化地图后的第一次默认拖放
          if (!this.dragStatus) {
            this.dragStatus = true;
          } else {
            this.$emit("drag", positionResult);
          }
        });
        // 启动拖放
        positionPicker.start();
      });
    }
  },
  async created() {
    // 已载入高德地图API，则直接初始化地图
    if (window.AMap && window.AMapUI) {
      this.initMap();
      // 未载入高德地图API，则先载入API再初始化
    } else {
      await remoteLoad(`http://webapi.amap.com/maps?v=1.3&key=${MapKey}`);
      await remoteLoad("http://webapi.amap.com/ui/1.0/main.js");
      this.initMap();
    }
  }
};
</script>

<style lang='scss'scoped>
.m-map {
  min-width: 200px;
  min-height: 100px;
  position: relative;
  height: 720px;
  margin-bottom: 20px;
  &::after {
    content: "";
    display: block;
    clear: both;
  }
  .map {
    height: 100%;
    width: 60%;
    display: inline-block;
  }
  .search {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 1;
    input {
      width: 180px;
      border: 1px solid #ccc;
      line-height: 20px;
      padding: 5px;
      outline: none;
    }
    button {
      line-height: 26px;
      background: #fff;
      border: 1px solid #ccc;
      width: 50px;
      text-align: center;
    }
  }
  .result {
    width: 30%;
    float: right;
    max-height: 100%;
    overflow: auto;
    margin: 0 5% 10px 0;
  }
  .clr {
    clear: both;
  }
}
</style>
