<!--
 * @Description：
    拖放地图组件，默认尺寸是 500 * 300
    接收属性参数：
      lat: 纬度
      lng: 经度
 * @Author: your name
 * @Date: 2019-08-29 13:38:27
 * @LastEditTime: 2019-09-01 17:03:17
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="m-map">
    <div class="search">
      <input type="text" id="pickerInput" placeholder="请输入关键字">
    </div>
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
import { MapKey, MapCityName } from "@/config/config";
export default {
  props: ["lat", "lng"],
  data() {
    return {
      AMapUI: null,
      AMap: null
      // map:null,
    };
  },
  watch: {},
  methods: {
    // 初始化地图
    initMap() {
      // 加载MarkerList，loadUI的路径参数为模块名中 'ui/' 之后的部分
      let AMapUI = (this.AMapUI = window.AMapUI);
      let AMap = (this.AMap = window.AMap);
      let map;

      AMapUI.loadUI(["misc/PoiPicker"], PoiPicker => {
        let mapConfig = {
          zoom: 16,
          cityName: MapCityName
        };
        if (this.lat && this.lng) {
          mapConfig.center = [this.lng, this.lat];
        }
        map = new AMap.Map("js-container", mapConfig);

        var poiPicker = new PoiPicker({
          city: "深圳",
          input: "pickerInput",
          placeSearchOptions: {
            map: map,
            pageSize: 10
          },
          searchResultsContainer: "js-result"
        });

        //初始化poiPicker
        poiPickerReady(poiPicker);
      });

      function poiPickerReady(poiPicker) {
        window.poiPicker = poiPicker;

        var marker = new AMap.Marker();

        var infoWindow = new AMap.InfoWindow({
          offset: new AMap.Pixel(0, -20)
        });

        //选取了某个POI
        poiPicker.on("poiPicked", function(poiResult) {
          var source = poiResult.source,
            poi = poiResult.item,
            info = {
              source: source,
              id: poi.id,
              name: poi.name,
              location: poi.location.toString(),
              address: poi.address
            };

          marker.setMap(map);
          infoWindow.setMap(map);

          marker.setPosition(poi.location);
          infoWindow.setPosition(poi.location);

          infoWindow.setContent(
            "POI信息: <pre>" + JSON.stringify(info, null, 2) + "</pre>"
          );
          infoWindow.open(map, marker.getPosition());

          //map.setCenter(marker.getPosition());
        });

        poiPicker.onCityReady(function() {
          poiPicker.suggest("美食");
          poiPicker.searchByKeyword("酒店");
        });
      }

      // AMapUI.loadUI(["misc/MarkerList"], MarkerList => {
      //   //创建一个实例
      //   let markerList = new MarkerList({
      //     map: map, //关联的map对象
      //     listContainer: "js-result", //列表的dom容器的节点或者id, 用于放置getListElement返回的内容
      //     getDataId: (dataItem, index) => {
      //       //返回数据项id
      //       return dataItem.id;
      //     },
      //     getPosition: dataItem => {
      //       //返回数据项的经纬度，AMap.LngLat实例或者经纬度数组
      //       return dataItem.position;
      //     },
      //     getMarker: (dataItem, context, recycledMarker) => {
      //       let content = "标注: " + (context.index + 1) + "",
      //         label = {
      //           offset: new AMap.Pixel(16, 18),
      //           content: content
      //         };

      //       if (recycledMarker) {
      //         //存在可回收利用的marker,直接setLabel返回
      //         recycledMarker.setLabel(label);
      //         return recycledMarker;
      //       }
      //       //返回一个新的Marker
      //       return new AMap.Marker({
      //         label: label
      //       });
      //     },
      //     getListElement: (dataItem, context, recycledListElement) => {
      //       var tpl = "<p><%- dataItem.id %>：<%- dataItem.desc %><p>";
      //       var content = MarkerList.utils.template(tpl, {
      //         dataItem: dataItem,
      //         dataIndex: context.index
      //       });
      //       if (recycledListElement) {
      //         //存在可回收利用的listElement, 直接更新内容返回
      //         recycledListElement.innerHTML = content;
      //         return recycledListElement;
      //       }
      //       //返回一段html，MarkerList将利用此html构建一个新的dom节点
      //       return "<li>" + content + "</li>";
      //     }
      //   });

      //   //监听选中改变
      //   markerList.on("selectedChanged", function(event, info) {});

      //   //监听Marker和ListElement上的点击，详见markerEvents，listElementEvents
      //   markerList.on("markerClick listElementClick", function(
      //     event,
      //     record
      //   ) {});

      //   //构建数据源，数据项本身没有格式要求，但需要支持getDataId和getPosition
      //   var data = [
      //     {
      //       id: "A",
      //       position: [116.020764, 39.904989],
      //       desc: "数据_1"
      //     },
      //     {
      //       id: "B",
      //       position: [116.405285, 39.904989],
      //       desc: "数据_2"
      //     },
      //     {
      //       id: "C",
      //       position: [116.789806, 39.904989],
      //       desc: "数据_3"
      //     }
      //   ];

      //   //绘制数据源，Let's go!
      //   markerList.render(data);

      //   //清除数据
      //   //markerList.render([]);

      // });
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

<style lang='less'>
.m-map {
  min-width: 500px;
  min-height: 300px;
  position: relative;
  width: 100%;
  height: 720px;
  margin-bottom: 20px;
}
.m-map::after {
  content: "";
  display: block;
  clear: both;
}
.m-map .m-container {
  padding: 20px;
  width: 70%;
  height: 100%;
  box-sizing: border-box;
  float: left;
}
.m-map .map {
  display: inline-block;
  width: 100%;
  height: 100%;
  border: 1px solid #ebebeb;
}
.m-map .search {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 285px;
  z-index: 1;
}
.m-map .search input {
  width: 180px;
  border: 1px solid #ccc;
  line-height: 20px;
  padding: 5px;
  outline: none;
}
.m-map .m-result {
  width: 29%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  display: inline-block;
}
.m-map .result {
  display: inline-block;
  width: 100%;
  height: 100%;
  overflow: auto;
  border: 1px solid #ebebeb;
}
.clr {
  clear: both;
}
</style>
