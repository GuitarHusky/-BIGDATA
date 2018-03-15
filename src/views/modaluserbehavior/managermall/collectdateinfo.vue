<template>
  <div class="total-info pad">
    <Row style="margin-top:20px;">
      <Col span="24">
      <div class="table-title tableStyle">
        <span style="font-size:16px;">收藏次数日期详细</span>
         <i-input placeholder="请输入商品名称关键字" v-model='phone_number' style="width: 200px;margin: 0 20px 0 40px;"></i-input>
        <Button type="primary" @click="searchCollectData">搜索</Button>
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
  import { getCollectNumDateData } from '../../../api/api'
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
          width: 60,
          align: "center"
        }, {
          title: '用户名',
          key: 'username',
          width: 130,
          align: "center",
        }, {
          title: '手机号',
          key: 'mobile_phone',
          width: 130,
          align: "center"
        }, {
          title: '归属地',
          key: 'numberarea',
          sortable: true,
          width: 135,
          align: "center"
        }, {
          title: '地址',
          key: 'area',
          width: 170,
          sortable: true,
          align: "center"
        }, {
          title: '商品名称',
          key: 'goods_name',
          width: 180,
          align: "center"
        }, {
          title: '正常兑换积分',
          key: 'old_scores',
          width: 120,
          align: "center"
        }, {
          title: '活动兑换积分',
          key: 'new_scores',
          width: 120,
          align: "center"
        }, {
          title: '市场价格',
          key: 'price',
          width: 100,
          align: "center"
        }, {
          title: '物流费用',
          key: 'logistics_cost',
          width: 100,
          align: "center"
        }, {
          title: '库存数量',
          key: 'stock_num',
          width: 100,
          align: "center"
        }, {
          title: '商品状态',
          key: 'status',
          width: 100,
          align: "center"
        }, {
          title: '收藏时间',
          width: 180,
          fixed: 'right',
          key: 'create_time',
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
      searchCollectData() {
       getCollectNumDateData({
          date_time: this.$route.params.time,
          page: 1,
          keyword:  this.phone_number
        }).then(res => {
          this.hello_curr = 1;
          if(res.retcode == 2000) {
             console.log(res)
            this.historyData = res.result.data;
            this.dataCount = res.result.totalCount;
            var i = 1;
            this.historyData.forEach((item, index) => {
              item['numid'] = i++
              item['numberarea'] = item.number_attribution + item.number_attribution_city
            })
          } else {
            alert(res.msg)
          }
        })
      },
      /*页面初始获取交换次数列表数据*/
      getCollectNumDatainfo() {
        getCollectNumDateData({
          date_time: this.$route.params.time,
          page: 1,
          keyword:  this.phone_number
        }).then(res => {
          this.historyData = res.result.data;
          this.dataCount = res.result.totalCount;
          var i = 1;
          this.historyData.forEach((item, index) => {
            item['numid'] = i++
            item['numberarea'] = item.number_attribution + item.number_attribution_city
          })
        })
      },
      /*分页点击事件*/
      changepage(index) {
       getCollectNumDateData({
          date_time: this.$route.params.time,
          page: index,
          keyword:  this.phone_number
        }).then(res => {
          this.historyData = res.result.data;
            this.dataCount = res.result.totalCount;
          var i = 1;
          this.historyData.forEach((item, index) => {
            item['numid'] = i++
            item['numberarea'] = item.number_attribution + item.number_attribution_city
          })
        })
        document.getElementsByClassName("pad")[0].scrollTop = 0
      },
    },
    mounted() {
      this.getCollectNumDatainfo();
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
