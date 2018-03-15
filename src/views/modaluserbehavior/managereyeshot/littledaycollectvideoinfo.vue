<template>
  <div class="total-info pad">
    <Row>
      <Col span="24">
      <div class="table-title tableStyle">
        <span>每天收藏视频次数详情</span>
        <i-input placeholder="这里输入文章标题关键字" v-model='phone_number' style="width: 200px;margin: 0 20px 0 40px;"></i-input>
        <Button type="primary" @click="searchTotalViewVideo">搜索</Button>
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
  import { getDayCollectNumDetail } from '../../../api/api'
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
          width:100,
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
          title: '归属地',
          key: 'tel_address',
          align: "center"
        }, {
          title: '用户地址',
          key: 'area',
          sortable: true,
          align: "center"
        }, {
          title: '文章标题',
          key: 'title',
          width:230,
          align: "center"
        }, {
          title: '消费积蛋',
          key: 'con_score',
          align: "center"
        }, {
          title: '讲师',
          key: 'teach',
          align: "center"
        }, {
          title: '收藏时间',
          key: 'create_time',
          align: "center"
        }
        ],
        historyData: [],
        phone_number: '',
        hello_curr: 1,
      }
    },
    methods: {
      goBack(){
        window.history.back()
      },
      searchTotalViewVideo() {

        getDayCollectNumDetail({
          type: 1,
          page: 1,
          date_time: this.$route.params.time,
          keyword: this.phone_number
        }).then(res => {
          this.hello_curr = 1;
          if(res.retcode == 2000) {
            this.historyData = res.result.data;
            this.dataCount = res.result.count;
            var i = 1;
            this.historyData.forEach((item, index) => {
              item['numid'] = i++
              item['tel_address'] = item.number_attribution + item.number_attribution_city
            })
          } else {
            alert(res.msg)
          }
        })
      },
      getDayCollectNumDetailinfo() {
        getDayCollectNumDetail({
          type: 1,
          page: 1,
          date_time: this.$route.params.time,
        }).then(res => {
          this.historyData = res.result.data;
          this.dataCount = res.result.data.length;
          var i = 1;
          this.historyData.forEach((item, index) => {
            item['numid'] = i++
            item['tel_address'] = item.number_attribution + item.number_attribution_city
          })
        })
      },
      changepage(index) {
        getDayCollectNumDetail({
          type: 1,
          page: index,
          date_time: this.$route.params.time,
          keyword: this.phone_number
        }).then(res => {
          this.historyData = res.result.data;
          this.dataCount = res.result.count;
          var i = 1;
          this.historyData.forEach((item, index) => {
            item['numid'] = i++
            item['tel_address'] = item.number_attribution + item.number_attribution_city
          })
        })
        document.getElementsByClassName("pad")[0].scrollTop = 0
      },
    },
    mounted() {
      this.getDayCollectNumDetailinfo();
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
