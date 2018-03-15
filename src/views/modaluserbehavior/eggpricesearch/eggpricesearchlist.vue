<template>
  <div class="total-info pad">
    <Row>
      <Col span="24" class="table-title tableStyle">使用搜索次数详情
      <!-- <i-input placeholder="这里输入正确的手机号" v-model='phone_number' style="width: 200px;margin: 0px 50px 0 40px;"></i-input> -->
      <!-- <DatePicker type="daterange" :options="options2" placement="bottom" v-model="timeInput" confirm format="yyyy-MM-dd"  style="width: 200px;font-size:14px;"></DatePicker> -->
      <!-- <Button type="primary" @click="searchSearchNUmTable">搜索</Button> -->
      <!-- <Button type="primary" @click="goBack" style="float:right;margin-right:50px;">返回</Button> -->
      <Button type="primary" @click="goBack" style="float:right;margin-right:50px;">返回</Button>
      </Col>
    </Row>
    <Row>
      <Col span="24">
      <i-table :columns="historyColumns" :data="historyData" size="large" @on-row-click="dateLink"></i-table>
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
  import axios from 'axios';
  import { getEggPriceSearchData } from '../../../api/api'
  export default {
    data() {
      return {
        // 初始化信息总条数
        dataCount: 0,
        // 每页显示多少条
        pageSize: 20,
        hello_curr: 1,
        historyColumns: [{
            title: '序号',
            key: 'numid',
            align: "center"
          }, {
            title: '日期',
            key: 'add_time',
            align: "center",
            className: 'datelink'
          },
          {
            title: '搜索蛋价数量',
            key: 'num',
            sortable: true,
            align: "center"
          }
        ],
        historyData: [],
        phone_number: '',
        timeInput: '',
        begintime: '',
        endtime: '',
        add_time:[],

        options2: {
                    disabledDate (date) {
                        return date && date.valueOf() >= Date.now();
                    },
                    shortcuts: [
                        {
                            text: '今日',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime());
                                return [start, end];
                            }
                        },
                        {
                            text: '昨日',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近一周',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近一个月',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近三个月',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近半年',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
                                return [start, end];
                            }
                        },{
                            text: '最近一年',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
                                return [start, end];
                            }
                        }
                    ]
        }
      }
    },

    methods: {
      dateLink(currentRow, oldCurrentRow){
        this.$router.push('/modaluser/daysearchlist/' + currentRow.add_time)
      },
      goBack(){
        window.history.back()
      },
      changepage(index) {
        axios.get('https://data.danjiguanjia.com/api/v1/getEggSearchInfo?tel='+this.phone_number+"&c_page="+index).then(res => {
          this.dataCount = res.data.data.list.num;
          this.historyData = res.data.data.list.list
          var num = 1;
          this.historyData.forEach((item, index) => {
            item['numid'] = num++
          })
        })
        document.getElementsByClassName("pad")[0].scrollTop = 0
      },
      searchSearchNUmTable() {
        this.dataCount = 0;
        this.historyData = []
        axios.get('https://data.danjiguanjia.com/api/v1/getEggSearchInfo?tel='+this.phone_number).then(res => {
          this.dataCount = res.data.data.list.num;
          this.historyData = res.data.data.list.list
          var num = 1;
          this.historyData.forEach((item, index) => {
            item['numid'] = num++
            if(item.area==''){
              item.area=item.tel_address
            }else{
              item.area=item.area
            }
          })
          this.hello_curr = 1
        })
      },
      //banner点击->banner点击详细列表
      beginaSearchBannerClickTable() {
        /*this.begintime =  this.$route.params.start_time;
        this.endtime =  this.$route.params.end_time;*/
        this.dataCount = 0;
        this.historyData = []
        getEggPriceSearchData({
         /* tel: this.phone_number,
          star_time: this.begintime,
          end_time: this.endtime,*/
          c_page: 1
        }).then(res => {
          this.dataCount = res.data.list.num;
          this.historyData = res.data.list.list
          var num = 1;
          this.historyData.forEach((item, index) => {
            item['numid'] = num++
            if(item.area==''){
              item.area=item.tel_address
            }else{
              item.area=item.area
            }
          })
        })
      },

      getaddtime(){
        this.historyData.forEach((item, index) => {
            return item.add_time
        })
      }
    },

    mounted() {
      this.getaddtime()
      this.beginaSearchBannerClickTable();
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
    border-right: 1px solid #ccc;
  }
  .table-title {
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    box-sizing: border-box;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding-left: 20px;
    border-bottom: none;
  }
  .ivu-col-offset-2 {
    margin-left: 0;
  }
  .table-title,.tableStyle {
    margin-top: 0;
  }
</style>
