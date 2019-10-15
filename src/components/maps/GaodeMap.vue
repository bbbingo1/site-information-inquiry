<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-06 21:25:37
<<<<<<< HEAD
<<<<<<< HEAD
 * @LastEditTime: 2019-10-16 01:11:34
=======
 * @LastEditTime: 2019-10-11 23:06:21
>>>>>>> 406e4c98191736cd7a7ce999e6329e0f9a17aa2c
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="m-map">
    <div class="search">
      <div style="display: inline-block; padding:10px;40px">
        <el-input size="small" id="locationInput" :value="Number(departureValue.lng).toFixed(3)+','+Number(departureValue.lat).toFixed(3)+';'+Number(destinationValue.lng).toFixed(3)+','+Number(destinationValue.lat).toFixed(3)" disabled></el-input>
      </div>
      <div style="display: inline-block; padding:10px;40px">
        <el-input size="small" id="targetInput" v-model="destinationModel" placeholder="请输入目的地"></el-input>
      </div>
      <div style="display: inline-block; padding-right:10px;">
        <el-button type="primary" icon="el-icon-search" @click="searchItems('test')">测量距离</el-button>
      </div>
      <div style="display: inline-block;">
        <el-button type="info" icon="el-icon-search" @click="searchItems('traffic')">查看交通</el-button>
      </div>
    </div>
    <div class="m-container">
      <div id="js-container" class="map" @mousewheel.stop>正在加载地图 ...</div>
      <div id="js-panel" @mousewheel.stop></div>
    </div>
    <div class="m-result">
      <div id="js-result" class="result" @mousewheel.stop></div>
      <slot name="pagination"></slot>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import remoteLoad from "@/utils/remoteLoad.js";
import { getTrafficInfo } from "@/api/gaodeMap.js";
const MapKey = "da5fae8f5e10d86564f1c0803232c577";
const WebKey = "7edc3121a9685b616129406e5695ba7d";
const MapCityName = "深圳";
let map;
export default {
  props: {
    lat: String, //中心纬度
    lng: String, //中心精度
    listMsg: Array
  },
  data() {
    return {
      AMapUI: null,
      AMap: null,
      listenObj: { tag: true }, //仿照watch利用对象访问器属性监听listMsg数据变更
      //trafficItems|以下
      // showTrafficSearch: false,
      departureData: "",
      destinationModel: "",
      departureValue: { lng: 0, lat: 0 }, //起点经纬度
      destinationValue: { lng: 0, lat: 0 }, //终点经纬度
      independentMarkerItem: {
        placeSearch: null, //地点查询实例
        markers: [], //存放查询生成的标注点
        line: null,
        text: null
      }
    };
  },
  computed: {
    msg() {
      return this.$store.getters.indexSearchResults;
    }
  },
  watch: {
    listMsg(val) {
      this.listenObj.tag = this.listenObj.tag ? false : true;
    }
  },
  methods: {
    // 初始化地图
    initMap() {
      // 加载MarkerList，loadUI的路径参数为模块名中 'ui/' 之后的部分
      let AMapUI = (this.AMapUI = window.AMapUI);
      let AMap = (this.AMap = window.AMap);
      let that = this;
      //地图加载
      AMapUI.loadUI(
        ["misc/MarkerList", "overlay/SimpleMarker", "overlay/SimpleInfoWindow"],
        (MarkerList, SimpleMarker, SimpleInfoWindow) => {
          var defaultIconStyle = "red", //默认的图标样式
            hoverIconStyle = "green", //鼠标hover时的样式
            selectedIconStyle = "purple"; //选中时的图标样式
          let mapConfig = {
            zoom: 16,
            cityName: MapCityName
          };
          if (this.lat && this.lng) {
            mapConfig.center = [this.lng, this.lat];
          }
          //创建全局地图实例
          window.map = new AMap.Map("js-container", mapConfig);
          //创建一个标注列表实例
          let markerList = new MarkerList({
            map: window.map, //关联的map对象
            listContainer: "js-result", //列表的dom容器的节点或者id, 用于放置getListElement返回的内容
            getDataId: (dataItem, index) => {
              //返回数据项id
              return dataItem.id;
            },
            getPosition: dataItem => {
              //返回数据项的经纬度，AMap.LngLat实例或者经纬度数组
              // return dataItem.position;
              return [dataItem.location.lng, dataItem.location.lat];
            },
            getInfoWindow: function(dataItem, context, recycledInfoWindow) {
              // var tpl = "<p><%- dataItem.id %>：<%- dataItem.desc %><p>";
              //MarkerList.utils.template支持underscore语法的模板
              // var content = MarkerList.utils.template(tpl, {
              //   dataItem: dataItem,
              //   dataIndex: context.index
              // });
              if (recycledInfoWindow) {
                //存在可回收利用的infoWindow, 直接setContent返回
                // recycledInfoWindow.setContent(content);
                recycledInfoWindow.setInfoTitle(dataItem.name);
                recycledInfoWindow.setInfoBody(dataItem.id);
                return recycledInfoWindow;
              }
              //返回一个新的InfoWindow
              return new SimpleInfoWindow({
                infoTitle: dataItem.name,
                infoBody: dataItem.id,
                offset: new AMap.Pixel(0, -23)
              });
            },
            //显示地图标注点
            getMarker: (dataItem, context, recycledMarker) => {
              let content =
                  "标注: " +
                  String.fromCharCode("A".charCodeAt(0) + context.index),
                label = {
                  offset: new AMap.Pixel(16, 18),
                  content: content
                };
              if (recycledMarker) {
                //存在可回收利用的marker,直接setLabel返回
                recycledMarker.setLabel(label);
                return recycledMarker;
              }
              //返回一个新的Marker
              return new AMap.Marker({
                label: label
              });
            },
            //显示列表元素
            getListElement: (data, context, recycledListElement) => {
              var label = String.fromCharCode(
                "A".charCodeAt(0) + context.index
              );
              var innerString = "";
              Object.keys(data).forEach((item, index) => {
                // if (item != "location" && item != "name" && item != "pic" && item != "id") {
                if (data[item].value && data[item].label) {
                  innerString +=
                    '    <div class="poi-info">' +
                    '        <span class="poi-label">' +
                    data[item].label +
                    "：" +
                    "        </span>" +
                    '    <span class="poi-value">' +
                    data[item].value +
                    "        </span>" +
                    "    </div>";
                  data[item];
                }
              });
              var tpl =
                '<div class="poi-imgbox">' +
                '    <span class="poi-img" style="background-image:url(<%- data.pic %>)"></span>' +
                "</div>" +
                '<div class="poi-info-left">' +
                '    <h3 class="poi-title">' +
                "        <%- dataIndex %>. <%- data.name %>" +
                "    </h3>" +
                '    <div class="poi-info">' +
                '        <span class="poi-type">' +
                "            <%= data.type %>" +
                "        </span>" +
                '        <p class="poi-addr"><%- data.address.value %></p>' +
                "    </div>" +
                innerString +
                "</div>" +
                '<div class="clear"></div>';
              var content = MarkerList.utils.template(tpl, {
                data: data,
                dataIndex: label
              });
              if (recycledListElement) {
                //存在可回收利用的listElement, 直接更新内容返回
                recycledListElement.innerHTML = content;
                return recycledListElement;
              }
              //返回一段html，MarkerList将利用此html构建一个新的dom节点
              return "<li class='poibox'>" + content + "</li>";
            }
          });

          //监听列表/标注选中改变
          markerList.on("selectedChanged", function(event, info) {});
          //监听Marker和ListElement上的点击，详见markerEvents，listElementEvents
          markerList.on("markerClick listElementClick", (event, record) => {
            // this.showTrafficSearch = true;
            this.departureData = record.data;
            this.departureValue = {
              lng: record.data.location.lng,
              lat: record.data.location.lat
            };
          });

          // //清除数据
          // markerList.render([]);
          // //绘制数据
          markerList.render(that.listMsg);
          Object.defineProperty(that.listenObj, "tag", {
            get() {
              return this._tag;
            },
            set(val) {
              this._tag = val;
              markerList.render(that.listMsg);
              // that.showTrafficSearch = false; //显示交通查询等相关项
              return val;
            }
          });
          // //绘制数据
          // eventBus.$on("refreshData", function() {
          //   if (that.listMsg) {
          //     markerList.render(that.listMsg);
          //   }
          // });
        }
      );
      if (document.getElementById("targetInput")) {
        //自动补全搜索（目的地）
        window.AMap.service(["AMap.Autocomplete"], function() {
          console.log(document.getElementById("targetInput"));
          var autoOptions = {
            // city: "深圳", //城市，默认全国
            input: "targetInput" //使用联想输入的input的id
          };
          let autocomplete = new AMap.Autocomplete(autoOptions);
          window.AMap.event.addListener(autocomplete, "select", e => {
            //搜索目的地
            that.searchPanel(e.poi.name);
          });
        });
      }
    },
    /**
     * @description:选定目的地后执行测量距离及查询交通状况等操作
     * @param {String}
     * @return:
     */
    searchItems(type = "test") {
      if (
        this.destinationValue.lat &&
        this.destinationValue.lng &&
        this.departureValue.lat &&
        this.departureValue.lng
      ) {
        //创建一个icon
        var startIcon = new AMap.Icon({
          // 图标尺寸
          size: new AMap.Size(25, 34),
          // 图标的取图地址
          image:
            "http://a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png",
          // 图标所用图片大小
          imageSize: new AMap.Size(135, 40),
          // 图标取图偏移量
          imageOffset: new AMap.Pixel(-9, -3)
        });
        // 创建一个 icon
        var endIcon = new AMap.Icon({
          size: new AMap.Size(25, 34),
          image:
            "http://a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png",
          imageSize: new AMap.Size(135, 40),
          imageOffset: new AMap.Pixel(-95, -3)
        });
        //移除之前的标注
        window.map.remove(this.independentMarkerItem.markers);

        // 新增两个标注点
        var m1 = new AMap.Marker({
          map: window.map,
          draggable: true,
          position: new AMap.LngLat(
            this.departureValue.lng,
            this.departureValue.lat
          ),
          icon: startIcon,
          offset: new AMap.Pixel(-13, -30),
          zIndex: 140
        });
        var m2 = new AMap.Marker({
          map: window.map,
          draggable: true,
          position: new AMap.LngLat(
            this.destinationValue.lng,
            this.destinationValue.lat
          ),
          icon: endIcon,
          offset: new AMap.Pixel(-13, -30),
          zIndex: 140
        });
        //把两个标注记录到data中，便于下次移除
        this.independentMarkerItem.markers.push(m1, m2);
        window.map.setFitView();

        if (type == "test") {
          //查询距离
          this.computeDis.call(this, m1, m2);
          m1.on("dragging", this.computeDis.bind(this, m1, m2));
          m2.on("dragging", this.computeDis.bind(this, m1, m2));
        } else if (type == "traffic") {
          let rectangle =
            Number(this.departureValue.lng) +
            "," +
            Number(this.departureValue.lat) +
            ";" +
            Number(this.destinationValue.lng) +
            "," +
            Number(this.destinationValue.lat);
          // rectangle = '116.351147,39.966309;116.357134,39.968727'
          getTrafficInfo(WebKey, rectangle)
            .then(response => {
              console.log(response);
            })
            .catch(error => console.log(error));
        }
      } else {
        this.$message({
          type: "warning",
          message: "请先选择一个起始地点!"
        });
      }
    },
    /**
     * @description: 生成目的地查询列表并触发执行后续操作
     * @param {String}
     * @return:
     */
    searchPanel(content) {
      AMap.service(["AMap.PlaceSearch"], () => {
        if (!this.independentMarkerItem.placeSearch) {
          //构造地点查询类
          this.independentMarkerItem.placeSearch = new AMap.PlaceSearch({
            pageSize: 5, // 单页显示结果条数
            pageIndex: 1, // 页码
            // city: "深圳", // 兴趣点城市
            citylimit: true, //是否强制限制在设置的城市内搜索
            map: window.map, // 展现结果的地图实例
            panel: "js-panel", // 结果列表将在此容器中进行展示。
            autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
          });
          AMap.event.addListener(
            this.independentMarkerItem.placeSearch,
            "selectChanged",
            e => {
              this.destinationValue.lat = e.selected.data.location.lat;
              this.destinationValue.lng = e.selected.data.location.lng;
            }
          );
        }
        //关键字查询
        this.independentMarkerItem.placeSearch.search(content);
      });
    },
    /**
     * @description: 传入两个参数，都是marker构造生成的实例//测量两点距离的函数
     * @param {AMap.Marker,AMap.Marker}
     * @return: null
     */
    computeDis(m1, m2) {
      var p1 = m1.getPosition();
      var p2 = m2.getPosition();
      var textPos = p1.divideBy(2).add(p2.divideBy(2));
      var distance = Math.round(p1.distance(p2));
      var path = [p1, p2];
      if (!this.independentMarkerItem.line) {
        this.independentMarkerItem.line = new AMap.Polyline({
          map: window.map,
          strokeColor: "#80d8ff",
          isOutline: true,
          outlineColor: "white",
          path: path
        });
      }
      this.independentMarkerItem.line.setPath(path);
      if (!this.independentMarkerItem.text) {
        console.log(distance);
        this.independentMarkerItem.text = new AMap.Text({
          text: "两点相距" + distance + "米",
          position: textPos,
          map: window.map,
          style: {
            "background-color": "#29b6f6",
            "border-color": "#e1f5fe",
            "font-size": "16px"
          }
        });
      }
      console.log(distance);
      this.independentMarkerItem.text.setText("两点相距" + distance + "米");
      this.independentMarkerItem.text.setPosition(textPos);
    }
  },
  async created() {
    // 已载入高德地图API，则直接初始化地图
    if (window.AMap && window.AMapUI) {
      this.initMap();
      // 未载入高德地图API，则先载入API再初始化
    } else {
      await remoteLoad(`http://webapi.amap.com/maps?v=1.4.15&key=${MapKey}`);
      await remoteLoad("http://webapi.amap.com/ui/1.0/main.js");
      this.initMap();
    }
  },
  mounted() {
    if (window.AMap.service) {
      //自动补全搜索（目的地）
      window.AMap.service(["AMap.Autocomplete"], function() {
        var autoOptions = {
          // city: "深圳", //城市，默认全国
          input: "targetInput" //使用联想输入的input的id
        };
        let autocomplete = new AMap.Autocomplete(autoOptions);
        window.AMap.event.addListener(autocomplete, "select", e => {
          //搜索目的地
          that.searchPanel(e.poi.name);
        });
      });
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/styles/markerMap.scss";
</style>
<style lang="scss" scoped>
.m-map {
  min-width: 500px;
  min-height: 300px;
  position: relative;
  width: 100%;
  height: 720px;
  margin-bottom: 20px;
  .m-container {
    position: relative;
    padding: 20px;
    width: 70%;
    height: 100%;
    box-sizing: border-box;
    float: left;
  }
  #js-panel {
    position: absolute;
    background-color: white;
    max-height: 80%;
    overflow-y: auto;
    top: 10%;
    left: 2%;
    width: 24%;
    opacity: 0.9;
    // border: 1px solid #ccc;
    border-radius: 2px;
  }
  .map {
    display: inline-block;
    width: 100%;
    height: 100%;
    border: 1px solid #ebebeb;
  }
  .search {
    position: absolute;
    top: 20px;
    left: 20px;
    // width: 285px;
    z-index: 1;
    input {
      width: 180px;
      border: 1px solid #ccc;
      line-height: 20px;
      padding: 5px;
      outline: none;
    }
  }
  .m-result {
    width: 29%;
    height: 100%;
    box-sizing: border-box;
    padding: 20px;
    display: inline-block;
  }
  .result {
    display: inline-block;
    width: 100%;
    height: 92%;
    overflow: auto;
    border: 1px solid #ebebeb;
    margin-bottom: 2%;
  }
}
.m-map::after {
  content: "";
  display: block;
  clear: both;
}
.clr {
  clear: both;
}
</style>