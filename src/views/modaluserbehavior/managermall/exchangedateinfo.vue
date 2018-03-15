<template>
  <div class="total-info pad">
    <Row style="margin-top:20px;">
      <Col span="24">
      <div class="table-title tableStyle">
        <span style="font-size:16px;">兑换次数日期详细</span>
         <i-input placeholder="请输入正确的用户名" v-model='phone_number' style="width: 200px;margin: 0 20px 0 40px;"></i-input>
        <Button type="primary" @click="searchExchangeData">搜索</Button>
         <Button type="primary" @click="goBack" style="float:right;margin-right:50px;">返回</Button>
      </div>
      <i-table :columns="historyColumns" :data="historyData" size="large"></i-table>
      </Col>
    </Row>
    <div style="margin: 10px 10% 20px 0;overflow: hidden">
      <div style="float: right;">
       <Page :total="dataCount" :page-size="pageSize" show-total :current.sync="hello_curr" class="paging" @on-change="changepage" show-elevator></Page>
      </div>
    </div>
  </div>
</template>
<script>
  import { getExchangeNumDateData } from '../../../api/api'
  export default {
    data(){
      return {
        user_total: true,
        exchangeNum: '',
        collectNum: '',
        // 初始化信息总条数
        dataCount: 0,
        // 每页显示多少条
        pageSize: 20,
        historyColumns: [{
          title: '序号',
          key: 'numid',
          align: "center"
        }, {
          title: '用户名',
          key: 'username',
          align: "center",
        }, {
          title: '用户地址',
          key: 'area',
          sortable: true,
          align: "center"
        }, {
          title: '收货人姓名',
          key: 'receipt_name',
          align: "center"
        }, {
          title: '收货人电话',
          key: 'receipt_phone',
          align: "center"
        }, {
          title: '收货地址',
          key: 'receipt_address',
          width: 180,
          align: "center"
        }, {
          title: '商品名称',
          key: 'goods_name',
          align: "center"
        }, {
          title: '商品单价',
          key: 'score',
          align: "center"
        }, {
          title: '商品数量',
          key: 'num',
          align: "center"
        }, {
          title: '商品总价',
          key: 'totalprice',
          align: "center"
        }, {
          title: '订单状态',
          key: 'status',
          align: "center"
        }, {
          title: '下单时间',
          width: 180,
          key: 'add_time',
          align: "center"
        }],
        historyData: [],
        phone_number: '',
        hello_curr: 1,
        options: {
        disabledDate (date) {
          return date && date.valueOf() >= Date.now();
        },
        },
      }
    },
    methods: {
      goBack(){
        window.history.back()
      },
      /*搜索事件  获取交换次数信息*/
      searchExchangeData() {
       getExchangeNumDateData({
          date_time: this.$route.params.time,
          page: 1,
          keyword:  this.phone_number
        }).then(res => {
          this.hello_curr = 1;
          if(res.retcode == 2000) {
            this.historyData = res.result.data;
            this.dataCount = res.result.totalCount;
            var i = 1;
            this.historyData.forEach((item, index) => {
              item['numid'] = i++
            })
          } else {
            alert(res.msg)
          }
        })
      },
      /*页面初始获取交换次数列表数据*/
      getExchangeNumDatainfo() {
        getExchangeNumDateData({
          date_time: this.$route.params.time,
          page: 1,
          keyword:  this.phone_number
        }).then(res => {
          this.historyData = res.result.data;
          this.dataCount = res.result.totalCount;
          var i = 1;
          this.historyData.forEach((item, index) => {
            item['numid'] = i++
          })
        })
      },
      /*分页点击事件*/
      changepage(index) {
       getExchangeNumDateData({
          date_time: this.$route.params.time,
          page: index,
          keyword:  this.phone_number
        }).then(res => {
          this.historyData = res.result.data;
            this.dataCount = res.result.totalCount;
          var i = 1;
          this.historyData.forEach((item, index) => {
            item['numid'] = i++
          })
        })
        document.getElementsByClassName("pad")[0].scrollTop = 0
      },
    },
    mounted() {
      this.getExchangeNumDatainfo();
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
  }

  .table-title {
    margin-top: 0;
  }
  .trend-col {
    text-align: center;
    height: 100px;
    background: rgba(243, 250, 241, 0.1);
    padding-top: 20px;
    cursor: pointer;
  }

  .trend-col:hover,.trend-col:hover .date-num {
    color: rgb(56, 153, 254);
  }

  .trend-col span:first-child {
    font-size: 16px;
  }

  .date-num {
    font-size: 30px;
    width: 100%;
    display: inline-block;
  }


  .ivu-col-offset-2 {
    margin-left: 0;
  }
  .pad {
    padding: 28px 20px;
  }
  .table-title {
    padding-left: 0;
    font-size: 14px;
  }
</style>
