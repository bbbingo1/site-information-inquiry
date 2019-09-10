<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-06 21:25:37
 * @LastEditTime: 2019-09-09 13:44:26
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="m-map">
    <!-- <div class="search">
      <input type="text" id="pickerInput" placeholder="请输入关键字">
    </div> -->
    <div class="m-container">
      <div id="js-container" class="map">正在加载数据 ...</div>
    </div>
    <div class="m-result">
      <div id="js-result" class="result"></div>
    </div>
  </div>
</template>

<script>
import remoteLoad from "@/utils/remoteLoad.js";
import eventBus from "@/utils/eventBus.js";
const MapKey = "da5fae8f5e10d86564f1c0803232c577";
const MapCityName = "深圳";
export default {
  props: ["lat", "lng"],
  data() {
    return {
      AMapUI: null,
      AMap: null
      // map:null,
    };
  },
  computed: {
    msg() {
      return this.$store.getters.indexSearchResults;
    }
  },
  watch: {},
  methods: {
    // 初始化地图
    initMap() {
      // 加载MarkerList，loadUI的路径参数为模块名中 'ui/' 之后的部分
      let AMapUI = (this.AMapUI = window.AMapUI);
      let AMap = (this.AMap = window.AMap);
      let map;
      let that = this;
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
          map = new AMap.Map("js-container", mapConfig);

          //创建一个实例
          let markerList = new MarkerList({
            map: map, //关联的map对象
            listContainer: "js-result", //列表的dom容器的节点或者id, 用于放置getListElement返回的内容
            getDataId: (dataItem, index) => {
              //返回数据项id
              return dataItem.id;
            },
            getPosition: dataItem => {
              //返回数据项的经纬度，AMap.LngLat实例或者经纬度数组
              // return dataItem.position;
              return [dataItem.location.lat, dataItem.location.lng];
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

          //监听选中改变
          markerList.on("selectedChanged", function(event, info) {});

          //监听Marker和ListElement上的点击，详见markerEvents，listElementEvents
          markerList.on("markerClick listElementClick", function(
            event,
            record
          ) {});

          //清除数据
          //markerList.render([]);

          // //绘制数据
          eventBus.$on("refreshData", function() {
            if (that.msg) {
              markerList.render(that.msg);
            }
          });
        }
      );
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
<style lang="scss">
@import "@/assets/styles/markerMap.scss";
</style>
<style lang="scss" scoped>
.m-map {
  min-width: 500px;
  min-height: 300px;
  position: relative;
  width: 100%;
  height: 500px;
  margin-bottom: 20px;

  .m-container {
    padding: 20px;
    width: 70%;
    height: 100%;
    box-sizing: border-box;
    float: left;
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
    width: 285px;
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
    height: 100%;
    overflow: auto;
    border: 1px solid #ebebeb;
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
