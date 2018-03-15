<template>
  <div class="total-info pad">
    <Row>
      <Col span="24">
      <div class="table-title tableStyle">
        <span>每天文章阅读次数详情</span>
        <i-input placeholder="这里输入文章标题关键字" v-model='phone_number' style="width: 200px;margin: 0 20px 0 40px;"></i-input>
        <Button type="primary" @click="searchTotalViewVideo">搜索</Button>
        <Button type="primary" @click="goBack" style="float:right;margin-right:50px;">返回</Button>
      </div>
      <i-table :columns="historyColumns" :data="historyData" size="large" @on-row-click="handler"></i-table>
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
  import { getDayReadArticleCountDetail } from '../../../api/api'
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
          title: '文章编号',
          key: 'news_id',
          align: "center"
        }, {
          title: '标题',
          width: 230,
          className: 'datelink',
          key: 'title',
          align: "center"
        }, {
          title: '当日微信阅读量',
          key: 'iswx',
          align: "center"
        }, {
          title: '当日非微信阅读量',
          key: 'isnotwx',
          align: "center"
        }, {
          title: '总阅读量',
          key: 'view',
          align: "center"
        }, {
          title: '总收藏量',
          key: 'collection',
          align: "center"
        }, {
          title: '总点赞量',
          key: 'praise',
          align: "center"
        }, {
          title: '文章来源',
          key: 'source',
          align: "center"
        }, {
          title: '作者',
          key: 'author',
          align: "center"
        }
        ],
        historyData: [],
        phone_number: '',
        hello_curr: 1,

      }
    },
    methods: {
      handler(currentRow, oldCurrentRow){
        var time = this.$route.params.time
        this.$router.push('/modaluser/articletitleinfo/' + time +'/'+currentRow.news_id)
      },
      goBack(){
        window.history.back()
      },
      searchTotalViewVideo() {
        this.$Spin.show();
        this.historyData = []
        this.dataCount = 0
        getDayReadArticleCountDetail({
          page: 1,
          date_time: this.$route.params.time,
          keyword: this.phone_number
        }).then(res => {
          this.$Spin.hide();
          this.hello_curr = 1;
          if(res.retcode == 2000) {
            console.log(res)
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
      getDayReadArticleCountDetailinfo() {
        this.$Spin.show();
        getDayReadArticleCountDetail({
          page: 1,
          date_time: this.$route.params.time,
          keyword: this.phone_number
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
        getDayReadArticleCountDetail({
          page: index,
          date_time: this.$route.params.time,
          keyword: this.phone_number
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
      this.getDayReadArticleCountDetailinfo();
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
