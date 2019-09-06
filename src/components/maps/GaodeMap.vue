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
    import remoteLoad from '@/utils/remoteLoad.js'
    const MapKey = 'da5fae8f5e10d86564f1c0803232c577'
    const MapCityName = '深圳'
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
