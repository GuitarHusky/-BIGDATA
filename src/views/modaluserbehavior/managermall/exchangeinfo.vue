<template>
  <div class="total-info pad">
    <Row>
      <Col span="24" class="table-title" style="font-size:18px;">基本指标</Col>
    </Row>
    <Row>
      <router-link tag='div' to='/modaluser/exchangeinfo'>
        <Col class="trend-col" span="6">
        <div style="font-size: 16px;" v-if='user_total'>
          加载中...
        </div>
        <div v-else>
          <span style="color: rgb(56, 153, 254);">兑换次数</span></br>
          <span class='date-num' style="color: rgb(56, 153, 254);">{{exchangeNum}}</span></br>
        </div>
        </Col>
      </router-link>
      <router-link tag='div' to='/modaluser/collectinfo'>
        <Col class="trend-col" span="6">
        <div style="font-size: 16px;" v-if='user_total'>
          加载中...
        </div>
        <div v-else>
          <span>收藏次数</span></br>
          <span class='date-num'>{{collectNum}}</span></br>
        </div>
        </Col>
      </router-link>
    </Row>
    <Row style="margin-top:20px;">
      <Col span="24">
      <div class="table-title tableStyle">
        <span style="font-size:16px;">兑换次数详细</span>
         <i-input placeholder="请输入日期如:2018-01-01" v-model='timedata' style="width: 200px;margin: 0 20px 0 40px;"></i-input>
        <Button type="primary" @click="searchExchangeData">搜索</Button>
      </div>
      <i-table :columns="historyColumns" :data="historyData" size="large"  @on-row-click="dateLink"></i-table>
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
  import { getExchangeNumData,getManagerMallData } from '../../../api/api'
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
          title: '日期',
          key: 'date',
          align: "center",
          className: 'datelink'
        }, {
          title: '兑换记录数量',
          key: 'exchangeCount',
          sortable: true,
          align: "center"
        }, {
          title: '未发货数量',
          key: 'nnshippedNum',
          align: "center"
        }],
        historyData: [],
        timedata: '',
        hello_curr: 1,
        options: {
        disabledDate (date) {
          return date && date.valueOf() >= Date.now();
        },
        },
      }
    },
    methods: {
      dateLink(currentRow, oldCurrentRow){
        this.$router.push('/modaluser/exchangedateinfo/' + currentRow.date)
      },
      /*搜索事件  获取交换次数信息*/
      searchExchangeData() {
        /*var begin = new Date(this.timedata)
        var month = (begin.getMonth() + 1)>=10?(begin.getMonth() + 1):'0'+(begin.getMonth() + 1)
        var day = begin.getDate()>=10?begin.getDate():'0'+begin.getDate()
        this.timedata = begin.getFullYear() + '-' + month + '-' + day*/
        getExchangeNumData({
          page: 1,
          keyword: this.timedata
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
        getExchangeNumData({
          page: 1,
          keyword: this.timedata
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
        getExchangeNumData({
          page: index,
          keyword: this.timedata
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
      getData(){
        getManagerMallData().then(res => {
          this.exchangeNum = res.result.orderCount
          this.collectNum = res.result.collectionCount
        })
        this.user_total = false;
      },
    },
    mounted() {
      this.getExchangeNumDatainfo();
      this.getData()
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
