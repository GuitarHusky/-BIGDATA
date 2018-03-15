<template>
  <div class="total-info pad">
    <Row>
      <Col span="24" class="table-title tableStyle">昨日录入成本数据详细
      <i-input placeholder="这里输入正确的手机号" v-model='phone_number' style="width: 200px;margin: 0px 50px 0 40px;"></i-input>
      <RadioGroup v-model="dataprod">
        <Radio label="oldprod">
            <span>旧数据</span>
        </Radio>
        <Radio label="newprod">
            <span>新数据</span>
        </Radio>
    </RadioGroup>
      <Button type="primary" @click="searchDataProd">搜索</Button>
      <a href="https://data.danjiguanjia.com/api/v1/yes_cost_excel"><Button type="primary" @click="toDownload" style="margin-left:30px;text-align:center;width:56px;height:32px;padding:0;padding-top:5px;"><Icon type="arrow-down-a" size="23"></Icon></Button></a>
      <Button type="primary" @click="goBack" style="float:right;margin-right:50px;">返回</Button>
      </Col>
    </Row>
    <Row>
      <Col span="24" style="overflow-x:hidden;">
      <i-table :columns="historyColumns" :data="historyData" size="small" style="overflow-x:hidden;"></i-table>
      </Col>
    </Row>
    <div style="margin: 10px 10% 20px 0;overflow: hidden">
      <div style="float: right;">
        <Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator :current.sync="hello_curr"></Page>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import { getYesBroodInfo } from '../../../api/api'
  export default {
    data() {
      return {
        dataprod: 'newprod',
        // 初始化信息总条数
        dataCount: 0,
        // 每页显示多少条
        pageSize: 20,
        hello_curr: 1,
        historyColumns: [{
            title: '序号',
            key: 'numid',
            width:60,
            align: "center"
          }, {
            title: '用户名称',
            key: 'username',
            width:130,
            align: "center"
          },
          {
            title: '手机号',
            key: 'mobile_phone',
            width:130,
            align: "center"
          },
          {
            title: '号码归属地',
            key: 'tel_address',
            width: 115,
            sortable: true,
            align: "center"
          },
          {
            title: '真实姓名',
            key: 'real_name',
            width:85,
            align: "center"
          },
          {
            title: '地址',
            key: 'address',
            width:135,
            sortable: true,
            align: "center"
          },
          {
            title: '鸡场规模',
            key: 'account',
            width:135,
            align: "center"
          },
          {
            title: '鸡类型',
            key: 'bid',
            width:75,
            align: "center"
          },
          {
            title: '批次名称',
            key: 'batch_name',
            width: 110,
            align: "center"
          },
          {
            title: '疫苗',
            key: 'vaccine',
            width:60,
            align: "center"
          },
          {
            title: '药品',
            key: 'drug',
            width:60,
            align: "center"
          },
          {
            title: '饲料单价',
            key: 'feed_unit_price',
            width: 85,
            align: "center"
          },
          {
            title: '煤钱',
            key: 'coal',
            width:60,
            align: "center"
          },
          {
            title: '工资',
            key: 'wages',
            width:60,
            align: "center"
          },
          {
            title: '水电费',
            key: 'water_elec',
            width: 75,
            align: "center"
          },
          {
            title: '鸡粪',
            key: 'chicken_manure',
            width: 90,
            align: "center"
          },
          {
            title: '鸡蛋收益',
            key: 'egg_yield',
            width: 90,
            align: "center"
          },
          {
            title: '其他支出统计',
            key: 'other',
            width:125,
            align: "center"
          },
          {
            title: '录入时间',
            key: 'add_time',
            width: 180,
            fixed: 'right',
            align: "center"
          }
        ],
        historyData: [],
        phone_number: ''
      }
    },

    methods: {
      goBack(){
        window.history.back()
      },
      changepage(index) {
       if( this.dataprod === 'newprod' ){
          axios.get('https://data.danjiguanjia.com/api/v1/getYesBroodInfo?tel='+this.phone_number+'&type=4&c_page='+index).then(res => {
          this.dataCount =  res.data.data.BroodInfo.count;
          this.historyData = res.data.data.BroodInfo.list
          var num = 1;
           this.historyData.forEach((item, index) => {
            item['numid'] = num++
            if(item.vaccine == undefined){
                item.vaccine = 0;
            }
            if(item.other == undefined){
                item.other = 0;
            }
            if(item.drug == undefined){
                item.drug = 0;
            }
            if(item.coal == undefined){
                item.coal = 0;
            }
            if(item.wages == undefined){
                item.wages = 0;
            }
            if(item.water_elec == undefined){
                item.water_elec = 0;
            }
            if(item.chicken_manure == undefined){
                item.chicken_manure = 0;
            }
            if(item.egg_yield == undefined){
                item.egg_yield = 0;
            }
            if(item.area==''){
              item.area=item.tel_address
            }else{
              item.area=item.area
            }
          })
        })
        }else{
          axios.get('https://data.danjiguanjia.com/api/v1/getYesBroodInfo?tel='+this.phone_number+'&type=3&c_page='+index).then(res => {
          this.dataCount =  res.data.data.BroodInfo.count;
          this.historyData = res.data.data.BroodInfo.list
          var num = 1;
           this.historyData.forEach((item, index) => {
            item['numid'] = num++
            if(item.vaccine == undefined){
                item.vaccine = 0;
            }
            if(item.other == undefined){
                item.other = 0;
            }
            if(item.drug == undefined){
                item.drug = 0;
            }
            if(item.coal == undefined){
                item.coal = 0;
            }
            if(item.wages == undefined){
                item.wages = 0;
            }
            if(item.water_elec == undefined){
                item.water_elec = 0;
            }
            if(item.chicken_manure == undefined){
                item.chicken_manure = 0;
            }
            if(item.egg_yield == undefined){
                item.egg_yield = 0;
            }
            if(item.area==''){
              item.area=item.tel_address
            }else{
              item.area=item.area
            }
          })
         })
        }
        document.getElementsByClassName("pad")[0].scrollTop = 0;
      },

      getYesALLCostList() {
         axios.get('https://data.danjiguanjia.com/api/v1/getYesBroodInfo?tel='+this.phone_number+'&type=4&c_page=1').then(res => {
          this.dataCount =  res.data.data.BroodInfo.count;
          this.historyData = res.data.data.BroodInfo.list
          var num = 1;
          this.historyData.forEach((item, index) => {
            item['numid'] = num++
            if(item.vaccine == undefined){
                item.vaccine = 0;
            }
            if(item.other == undefined){
                item.other = 0;
            }
            if(item.drug == undefined){
                item.drug = 0;
            }
            if(item.coal == undefined){
                item.coal = 0;
            }
            if(item.wages == undefined){
                item.wages = 0;
            }
            if(item.water_elec == undefined){
                item.water_elec = 0;
            }
            if(item.chicken_manure == undefined){
                item.chicken_manure = 0;
            }
            if(item.egg_yield == undefined){
                item.egg_yield = 0;
            }
            if(item.area==''){
              item.area=item.tel_address
            }else{
              item.area=item.area
            }
          })
        })
      },
      searchDataProd() {
        if( this.dataprod === 'newprod' ){
          axios.get('https://data.danjiguanjia.com/api/v1/getYesBroodInfo?tel='+this.phone_number+'&type=4&c_page=1').then(res => {
          this.dataCount =  res.data.data.BroodInfo.count;
          this.historyData = res.data.data.BroodInfo.list
          var num = 1;
          this.historyData.forEach((item, index) => {
            item['numid'] = num++
            if(item.vaccine == undefined){
                item.vaccine = 0;
            }
            if(item.other == undefined){
                item.other = 0;
            }
            if(item.drug == undefined){
                item.drug = 0;
            }
            if(item.coal == undefined){
                item.coal = 0;
            }
            if(item.wages == undefined){
                item.wages = 0;
            }
            if(item.water_elec == undefined){
                item.water_elec = 0;
            }
            if(item.chicken_manure == undefined){
                item.chicken_manure = 0;
            }
            if(item.egg_yield == undefined){
                item.egg_yield = 0;
            }
            if(item.area==''){
              item.area=item.tel_address
            }else{
              item.area=item.area
            }
            this.hello_curr = 1
          })
        })
        }else{
          axios.get('https://data.danjiguanjia.com/api/v1/getYesBroodInfo?tel='+this.phone_number+'&type=3&c_page=1').then(res => {
          this.dataCount =  res.data.data.BroodInfo.count;
          this.historyData = res.data.data.BroodInfo.list
          var num = 1;
          this.historyData.forEach((item, index) => {
            item['numid'] = num++
            if(item.vaccine == undefined){
                item.vaccine = 0;
            }
            if(item.other == undefined){
                item.other = 0;
            }
            if(item.drug == undefined){
                item.drug = 0;
            }
            if(item.coal == undefined){
                item.coal = 0;
            }
            if(item.wages == undefined){
                item.wages = 0;
            }
            if(item.water_elec == undefined){
                item.water_elec = 0;
            }
            if(item.chicken_manure == undefined){
                item.chicken_manure = 0;
            }
            if(item.egg_yield == undefined){
                item.egg_yield = 0;
            }
            if(item.area==''){
              item.area=item.tel_address
            }else{
              item.area=item.area
            }
          })
          this.hello_curr = 1
         })
        }
      }

    },
    mounted() {
      this.getYesALLCostList()
    }
  }
</script>
<style scoped>
  .ivu-table-cell {
    text-align: center;
  }

  .ivu-table-border td,
  .ivu-table-border th {
    text-align: center;
  }
  .total-info {
    margin-top: 20px;
    border-right: 1px solid #ccc;
  }
  .crumbs_me {
    margin-left: 35px;
  }
  .table-title {
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    box-sizing: border-box;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding-left: 20px;
    border-bottom: none;
  }
  .ivu-col-offset-2 {
    margin-left: 0;
  }

  .table-title,.tableStyle {
    margin-top: 0;
  }
</style>
