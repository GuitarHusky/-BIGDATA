<template>
   <div class="total-info pad">
    <Row>
      <Col span="24" class="table-title tableStyle titleStyle">每日录入生产效益详情
      <i-input placeholder="这里输入正确的手机号" v-model='phone_number' style="width: 200px;margin: 0px 50px 0 40px;"></i-input>
      <Button type="primary" @click="searchDataProd">搜索</Button>
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
  import { getAllCostInfo } from '../../../api/api'
  export default {
    data() {
      return {
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
            width:125,
            sortable: true,
            key: 'tel_address',
            align: "center"
          },
          {
            title: '真实姓名',
            width:85,
            key: 'real_name',
            align: "center"
          },
          {
            title: '地址',
            key: 'address',
            sortable: true,
            width:140,
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
            width:85,
            align: "center"
          },
          {
            title: '批次名称',
            key: 'batch_name',
            width:125,
            align: "center"
          },
          {
            title: '疫苗',
            key: 'vaccine',
            width: 85,
            /*sortable: true,*/
            align: "center"
          },
          {
            title: '药品',
            key: 'drug',
            width: 85,
            /*sortable: true,*/
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
            width: 85,
            /*sortable: true,*/
            align: "center"
          },
          {
            title: '工资',
            key: 'wages',
            width: 85,
            /*sortable: true,*/
            align: "center"
          },
          {
            title: '水电费',
            key: 'water_elec',
            width: 85,
            /*sortable: true,*/
            align: "center"
          },
          {
            title: '鸡粪',
            key: 'chicken_manure',
            width: 85,
            align: "center"
          },
          {
            title: '鸡蛋收益',
            key: 'egg_yield',
            width: 95,
            align: "center"
          },
          {
            title: '淘汰鸡收入',
            key: 'die_yield',
            width: 120,
            /*sortable: true,*/
            align: "center"
          },
          {
            title: '录入时间',
            key: 'add_time',
            fixed: 'right',
            align: "center",
            width:180
          }
        ],
        historyData: [],
        phone_number: '',
        begintime:'',
        endtime:''
      }
    },
    mounted() {
      this.getDayDetail()
    },
    methods: {
      goBack(){
        window.history.back()
      },
      getDayDetail() {
        this.begintime = this.$route.params.prod_time;
        this.endtime = this.$route.params.prod_time;
        getAllCostInfo({
          star_time: this.$route.params.prod_time,
          end_time: this.$route.params.prod_time,
          tel: this.phone_number,
          type: 1,
          c_page: 1
        }).then(res => {
          this.dataCount = res.data.broodInfo.count
          this.historyData = res.data.broodInfo.list
          var num = 1;
          res.data.broodInfo.list.forEach((item, index) => {
            if(item.batch_name == '' || item.batch_name == null){
              item.batch_name = '不详'
            }
            item['numid'] = num++
          })
        })
      },
      searchDataProd(){
         getAllCostInfo({
          tel: this.phone_number,
          type: 1,
          c_page: 1
        }).then(res => {
          this.dataCount = res.data.broodInfo.count
          this.historyData = res.data.broodInfo.list
          var num = 1;
          res.data.broodInfo.list.forEach((item, index) => {
            if(item.batch_name == '' || item.batch_name == null){
              item.batch_name = '不详'
            }
            item['numid'] = num++
          })
          this.hello_curr = 1
        })
      },
      changepage(index) {
        this.begintime = this.$route.params.prod_time;
        this.endtime = this.$route.params.prod_time;
        getAllCostInfo({
          star_time: this.begintime,
          end_time: this.endtime,
          tel: this.phone_number,
          type: 1,
          c_page: index
        }).then(res => {
          this.dataCount = res.data.broodInfo.count
          this.historyData = res.data.broodInfo.list
          var num = 1;
          res.data.broodInfo.list.forEach((item, index) => {
            if(item.batch_name == '' || item.batch_name == null){
              item.batch_name = '不详'
            }
            item['numid'] = num++
          })
        })
        document.getElementsByClassName("pad")[0].scrollTop = 0;
      }
    }
  }
</script>

<style scoped>
  .ivu-table-border td,
  .ivu-table-border th {
    text-align: center;
    border-left: 0px;
  }
  .ivu-col-offset-2 {
    margin-left: 0;
  }
</style>
