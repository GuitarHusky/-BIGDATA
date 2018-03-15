<template>
  <div class="total-info pad">
    <Row>
      <Col span="24">
      <div class="table-title tableStyle">
        <span>使用大转盘人数详情</span>
        <i-input placeholder="这里输入姓名关键字" v-model='nameword' style="width: 200px;margin: 0 20px 0 40px;"></i-input>
        <Button type="primary" @click="searchBigDialPersonData" id="search">搜索</Button>
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
  import { getBigDialPersonDetail } from '../../../api/api'
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
          key: 'city',
          sortable: true,
          align: "center"
        }, {
          title: '鸡场规模',
          key: 'account',
          align: "center"
        }, {
          title: '积蛋',
          key: 'jp_name',
          align: "center"
        }, {
          title: '时间',
          key: 'create_time',
          width:180,
          align: "center"
        }],
        historyData: [],
        registerPhone: '',
        nameword: '',
        hello_curr: 1,
      }
    },
    methods: {
      goBack(){
        window.history.back()
      },
      searchBigDialPersonData() {
        this.$Spin.show();
        document.getElementById("search").disabled = true
        getBigDialPersonDetail({
          date_time: this.$route.params.time,
          keyword: this.nameword,
          page: 1
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
          document.getElementById("search").disabled = false
        })
      },
      getBigDialPersonDetailinfo() {
        this.$Spin.show();
        getBigDialPersonDetail({
          date_time: this.$route.params.time,
          keyword: this.nameword,
          page: 1
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
        getBigDialPersonDetail({
          date_time: this.$route.params.time,
          keyword: this.nameword,
          page: index
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
      this.getBigDialPersonDetailinfo();
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
