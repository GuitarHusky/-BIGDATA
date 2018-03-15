<template>
  <div class="total-info pad">
    <Row>
      <Col span="24">
      <div class="table-title tableStyle">
        <span>每天报名人数详情</span>
        <i-input placeholder="这里输入企业名称关键字" v-model='phone_number' style="width: 200px;margin: 0 20px 0 40px;"></i-input>
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
  import { getDayPostData } from '../../../api/api'
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
          title: '企业名称',
          key: 'company',
          align: "center"
        }, {
          title: '企业规模',
          key: 'size',
          align: "center"
        }, {
          title: '企业地址',
          key: 'address',
          sortable: true,
          align: "center"
        }, {
          title: '产品类型',
          key: 'pro_type',
          align: "center"
        }, {
          title: '联系人',
          key: 'linkman',
          align: "center"
        }, {
          title: '联系电话',
          key: 'phone',
          align: "center"
        }, {
          title: '报名时间',
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
        getDayPostData({
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
            })
          } else {
            alert(res.msg)
          }
        })
      },
      getDayPostDatainfo() {
        getDayPostData({
          page: 1,
          date_time: this.$route.params.time,
          keyword: this.phone_number
        }).then(res => {
          this.historyData = res.result.data;
          this.dataCount = res.result.count;
          var i = 1;
          this.historyData.forEach((item, index) => {
            item['numid'] = i++
          })
        })
      },
      changepage(index) {
        getDayPostData({
          page: index,
          date_time: this.$route.params.time,
          keyword: this.phone_number
        }).then(res => {
          this.historyData = res.result.data;
          this.dataCount = res.result.count;
          var i = 1;
          this.historyData.forEach((item, index) => {
            item['numid'] = i++
          })
        })
        document.getElementsByClassName("pad")[0].scrollTop = 0
      },
    },
    mounted() {
      this.getDayPostDatainfo();
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
