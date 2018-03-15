<template>
  <div class="total-info pad">
    <Row>
      <Col span="24" class="table-title tableStyle">建立批次及栋舍详细
      <i-input placeholder="这里输入正确的手机号" v-model='phone_number' style="width: 200px;margin: 0px 50px 0 40px;"></i-input>
      <RadioGroup v-model="dataprod">
        <Radio label="oldprod">
            <span>旧数据</span>
        </Radio>
        <Radio label="newprod">
            <span>新数据</span>
        </Radio>
    </RadioGroup>
      <Button type="primary" @click="searchDataProd" id="search">搜索</Button>
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
  import { getAllAndYesBatchInfo } from '../../../api/api'
  export default {
    data() {
      return {
        dataprod: 'oldprod',
        // 初始化信息总条数
        dataCount: 0,
        // 每页显示多少条
        pageSize: 20,
        hello_curr: 1,
        historyColumns: [{
            title: '序号',
            key: 'numid',
            width:100,
            align: "center"
          }, {
            title: '用户名称',
            key: 'username',
            width: 130,
            align: "center"
          },
          {
            title: '手机号',
            key: 'mobile_phone',
            width: 130,
            align: "center"
          },
          {
            title: '号码归属地',
            key: 'tel_address',
            sortable: true,
            width: 160,
            align: "center"
          },
          {
            title: '真实姓名',
            key: 'real_name',
            width:110,
            align: "center"
          },
          {
            title: '地址',
            key: 'address',
            width: 200,
            sortable: true,
            align: "center"
          },
          {
            title: '鸡场规模',
            key: 'account',
            width: 150,
            align: "center"
          },
          {
            title: '鸡类型',
            key: 'bid',
            width: 110,
            sortable: true,
            align: "center"
          },
          {
            title: '批次名称',
            key: 'batch_name',
            width: 120,
            align: "center"
          },
          {
            title: '日龄',
            key: 'day_old',
            sortable: true,
            width: 110,
            align: "center"
          },
          {
            title: '日初存栏',
            width: 110,
            key: 'sunrise_stock',
            align: "center"
          },
          {
            title: '录入时间',
            key: 'create_time',
            fixed: 'right',
            width:180,
            align: "center"
          }
        ],
        historyData: [],
        phone_number: '',
      }
    },

    methods: {
      goBack(){
        window.history.back()
      },
      changepage(index) {

        if( this.dataprod === 'newprod' ){
          getAllAndYesBatchInfo({
          tel: this.phone_number,
          type: 1,
          c_page: index
          }).then(res => {
          this.dataCount =  res.data.batchInfo.num;
          this.historyData = res.data.batchInfo.list
          var num = 1;
          this.historyData.forEach((item, index) => {
            item['numid'] = num++
            if(item.real_name == '' || item.real_name == null){
              item.real_name = '暂无'
            }
            if(item.area==''){
              item.area=item.tel_address
            }else{
              item.area=item.area
            }
          })
        })
        }else{
          getAllAndYesBatchInfo({
          tel: this.phone_number,
          type: 2,
          c_page: index
          }).then(res => {
          this.dataCount =  res.data.batchInfo.num;
          this.historyData = res.data.batchInfo.list
          var num = 1;
          this.historyData.forEach((item, index) => {
            if(item.real_name == '' || item.real_name == null){
              item.real_name = '暂无'
            }
            item['numid'] = num++
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
      //用户分析->注册用户详细列表
      getALLProdList() {
        this.dataCount = 0;
        this.historyData = []
        getAllAndYesBatchInfo({
          type: 2
        }).then(res => {
         /* console.log(res.data.broodInfo.count)*/
          this.dataCount =  res.data.batchInfo.num;
          this.historyData = res.data.batchInfo.list
          var num = 1;
          this.historyData.forEach((item, index) => {
            if(item.real_name == '' || item.real_name == null){
              item.real_name = '暂无'
            }
            item['numid'] = num++
            if(item.area == ''){
              item.area = item.tel_address
            }else{
              item.area = item.area
            }
          })
        })
      },
      searchDataProd() {
        document.getElementById('search').disabled = true
        if( this.dataprod === 'newprod' ){
          getAllAndYesBatchInfo({
          tel: this.phone_number,
          type: 1,
          c_page: 1
          }).then(res => {
          this.dataCount =  res.data.batchInfo.num;
          this.historyData = res.data.batchInfo.list
          var num = 1;
          this.historyData.forEach((item, index) => {
            if(item.real_name == '' || item.real_name == null){
              item.real_name = '暂无'
            }
            item['numid'] = num++
            if(item.area==''){
              item.area=item.tel_address
            }else{
              item.area=item.area
            }
          })
          document.getElementById('search').disabled = false
        })
        }else{
          document.getElementById('search').disabled = true
          getAllAndYesBatchInfo({
          tel: this.phone_number,
          type: 2,
          c_page: 1
          }).then(res => {
          if(item.real_name == ''){
            item.real_name = '暂无'
          }
          this.dataCount =  res.data.batchInfo.num;
          this.historyData = res.data.batchInfo.list
           document.getElementById('search').disabled = false
          var num = 1;
          this.historyData.forEach((item, index) => {
            if(item.real_name == '' || item.real_name == null){
              item.real_name = '暂无'
            }
            item['numid'] = num++
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
      this.getALLProdList()
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
