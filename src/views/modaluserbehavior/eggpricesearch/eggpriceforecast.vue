<template>
  <div class="total-info pad">
    <Row>
      <Col span="24">
      <div class="table-title tableStyle">
        <span>每日蛋价预测人数详细</span>
        <i-input placeholder="这里输入正确的手机号" v-model='phone_number' style="width: 200px;margin: 0 20px 0 40px;"></i-input>
        <Button type="primary" @click="SearchEggPriceForecast" id="search">搜索</Button>
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
  import { getEggPriceForecastList } from '../../../api/api'
  export default {
    data(){
      return {
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
          align: "center"
        }, {
          title: '手机号',
          key: 'mobile_phone',
          align: "center"
        }, {
          title: '号码归属地',
          key: 'tel_address',
          sortable: true,
          align: "center"
        }, {
          title: '真实姓名',
          key: 'real_name',
          align: "center"
        }, {
          title: '地址',
          key: 'tel_address',
          sortable: true,
          align: "center"
        }, {
          title: '注册时间',
          width:180,
          key: 'res_time',
          align: "center"
        }, {
          title: '预测地址',
          key: 'pre_addr',
          sortable: true,
          align: "center"
        }, {
          title: '涨幅程度',
          key: 'predict',
          align: "center"
        }, {
          title: '预测时间',
          key: 'pre_time',
          align: "center"
        }, {
          title: '填写时间',
          width:180,
          key: 'create_time',
          align: "center"
        }],
        historyData: [],
        registerPhone: '',
        phone_number: '',
        hello_curr: 1,
        time:'',
      }
    },
    methods: {
      goBack(){
        window.history.back()
      },
      SearchEggPriceForecast() {
        getEggPriceForecastList({
          c_page : 1,
          date: this.$route.params.time,
          tel: this.phone_number,
        }).then(res => {
          this.hello_curr = 1;
          if(res.retcode == 2000) {
            this.historyData = res.data.list.list;
            this.dataCount = res.data.list.num;
            var i = 1;
            this.historyData.forEach((item, index) => {
              item['numid'] = i++
            })
          } else {
            alert(res.msg)
          }
        })
      },
      getEggPriceForecastList() {
        getEggPriceForecastList({
          c_page: 1,
          date: this.$route.params.time,
          tel: this.phone_number,
        }).then(res => {
          console.log(res)
          this.historyData = res.data.list.list;
          this.dataCount = res.data.list.num;
          var i = 1;
          this.historyData.forEach((item, index) => {
            item['numid'] = i++
          })
        })
      },
      changepage(index) {
        getEggPriceForecastList({
          c_page: index,
          date: this.$route.params.time,
          tel: this.phone_number
        }).then(res => {
          console.log(res)
          this.historyData = res.data.list.list;
          this.dataCount = res.data.list.num;
          var i = 1;
          this.historyData.forEach((item, index) => {
            item['numid'] = i++
          })
        })
        document.getElementsByClassName("pad")[0].scrollTop = 0
      },
    },
    mounted() {
      this.getEggPriceForecastList();
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
</style>
