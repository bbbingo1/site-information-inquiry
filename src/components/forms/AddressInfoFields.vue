<template>
  <div>
    <div class="address-info-fields">
      <div class="item">
        <div class="label">唯一ID</div>
        <div class="filed">
          <el-input v-model="siteInfo.id" size="small" name="id" style="width: 350px"></el-input>
        </div>
      </div>
      <div class="item">
        <div class="label">场地名称</div>
        <div class="filed">
          <el-input v-model="siteInfo.name" size="small" name="name" style="width: 350px"></el-input>
        </div>
      </div>
      <div class="item">
        <div class="label">经纬度</div>
        <div class="filed">
          <el-input size="small" v-model="siteInfo.location.lng" name="lng" style="width: 160px" placeholder="经度"></el-input>
          <el-input size="small" v-model="siteInfo.location.lat" name="lat" style="width: 160px; margin-left: 30px;" placeholder="纬度"></el-input>
        </div>
      </div>
      <div class="item">
        <div class="label">场地图片链接</div>
        <div class="filed">
          <el-input size="small" v-model="siteInfo.pic" name="pic" style="width: 350px"></el-input>
        </div>
      </div>
      <div class="item">
        <div class="label">其他信息</div>
        <div class="filed">
          <el-input type="textarea" placeholder="'property1':{label:'label1',value:'value1'},property2':{label:'label2',value:'value2'}" style="width: 350px" maxlength="1000" name="otherMsg" v-model="siteInfo.otherMsg" show-word-limit>
          </el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddressInfoFields",
  props: {
    siteInfo: Object
  }
};
</script>

<style lang="scss" scoped>
.address-info-fields {
  margin: 20px 15px;
  border-bottom: 2px solid #ebebeb;
  .item {
    margin: 10px 0px;
    width: 100%;
    .label {
      display: inline-block;
      width: 120px;
      font-size: 14px;
      color: #606266;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 400;
      clear: both;
      &:after {
        content: ":";
      }
    }
    .filed {
      display: inline-block;
    }
  }
}
</style>