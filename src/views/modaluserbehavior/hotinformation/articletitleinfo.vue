<template>
  <div class="total-info pad">
    <Row>
      <Col span="24">
      <div class="table-title tableStyle">
        <span>本日文章阅读详情</span>
        <i-input placeholder="这里输入阅读地址关键字" v-model='phone_number' style="width: 200px;margin: 0 20px 0 40px;"></i-input>
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
  import { getDayReadArticleInfos } from '../../../api/api'
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
          title: 'IP',
          key: 'ip',
          align: "center"
        }, {
          title: '阅读地址',
          sortable: true,
          key: 'address',
          align: "center"
        }, {
          title: '是否微信访问',
          key: 'is_wx',
          align: "center"
        }, {
          title: '阅读时间',
          key: 'visit_time',
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
        this.$Spin.show();
        getDayReadArticleInfos({
          date_time: this.$route.params.time,
          news_id: this.$route.params.news_id,
          page: 1,
          currentPage: 20,
          keyword: this.phone_number,
        }).then(res => {
          this.$Spin.hide();
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
      getDayReadArticleInfosinfo() {
        this.$Spin.show();
        getDayReadArticleInfos({
          date_time: this.$route.params.time,
          news_id: this.$route.params.news_id,
          page: 1,
          currentPage: 20,
          keyword: '',
        }).then(res => {
          this.$Spin.hide();
          this.historyData = res.result.data;
          this.dataCount = res.result.totalCount;
          var i = 1;
          this.historyData.forEach((item, index) => {
            item['numid'] = i++
          })
        })
      },
      changepage(index) {
        this.$Spin.show();
        getDayReadArticleInfos({
          date_time: this.$route.params.time,
          news_id: this.$route.params.news_id,
          page: index,
          currentPage: 20,
          keyword: this.phone_number,
        }).then(res => {
          this.$Spin.hide();
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
      this.getDayReadArticleInfosinfo();
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
