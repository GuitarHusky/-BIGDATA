<template>
  <div class="total-info pad">
    <Row>
      <Col span="24">
      <div class="table-title tableStyle">
        <span>蛋价预测详细</span>
        <i-input placeholder="这里输入正确的手机号" v-model='phone_number' style="width: 200px;margin: 0 20px 0 40px;"></i-input>
        <DatePicker type="daterange" :options="options2" placement="bottom" v-model="timeInput" confirm format="yyyy-MM-dd"  style="width: 200px;font-size:14px;" placeholder="请选择时间段"></DatePicker>
        <Button type="primary" @click="searchTotalIntegra">搜索</Button>
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
          width: 100,
          align: "center"
        }, {
          title: '用户名',
          width: 135,
          key: 'username',
          align: "center"
        }, {
          title: '手机号',
          key: 'mobile_phone',
          width: 135,
          align: "center"
        }, {
          title: '号码归属地',
          key: 'tel_address',
          width: 170,
          sortable: true,
          align: "center"
        }, {
          title: '真实姓名',
          width: 110,
          key: 'real_name',
          align: "center"
        }, {
          title: '地址',
          key: 'tel_address',
          width: 180,
          sortable: true,
          align: "center"
        }, {
          title: '注册时间',
          width: 180,
          key: 'res_time',
          align: "center"
        }, {
          title: '预测地址',
          key: 'pre_addr',
          width: 170,
          sortable: true,
          align: "center"
        }, {
          title: '涨幅程度',
          key: 'predict',
          width:100,
          align: "center"
        },{
          title: '预测时间',
          key: 'pre_time',
          width: 200,
          align: "center"
        },{
          title: '填写时间',
          key: 'create_time',
          width: 180,
          fixed: 'right',
          align: "center"
        }],
        historyData: [],
        phone_number: '',
        begintime: "",
        endtime: '',
        hello_curr: 1,
        timeInput: '',

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
      /*搜索事件  获取预测人员数据*/
      searchTotalIntegra() {
        if(this.timeInput[0] == null || this.timeInput[1] == null){
          this.timeInput = ""
        }
        var begin = new Date(this.timeInput[0])
        this.begintime = begin.getFullYear() + '-' + (begin.getMonth() + 1) + '-' + begin.getDate()
        var end = new Date(this.timeInput[1])
        this.endtime = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()
        /*var now_time = new Date().getTime();
        var beginTime = this.timeInput[0].getTime()
        var endTime = this.timeInput[1].getTime()
        if(endTime > now_time) {
          this.$Message.info('结束时间不能大于当前日期!')
          return
        }
        if(beginTime > this.endtime) {
          this.$Message.info('结束时间需大于开始时间!')
          return
        }*/
        var now_time = new Date();
        if(this.endtime > now_time) {
          this.$Message.info('结束时间不能大于当前日期!')
          return
        }
        if(this.begintime > this.endtime) {
          this.$Message.info('结束时间需大于开始时间!')
          return
        }
        if(this.begintime == '' || this.endtime == "") {
          this.$Message.info('请输入搜素时间!')
          return
        }
        if(this.begintime == 'NaN-NaN-NaN') {
          this.begintime = ''
        }
        if(this.endtime == 'NaN-NaN-NaN') {
          this.endtime = ''
        }
        getEggPriceForecastList({
          c_page : 1,
          star_time: this.begintime,
          end_time: this.endtime,
          tel: this.phone_number
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
      /*页面初始获取预测人员列表数据*/
      getEggPriceForecastListinfo() {
        getEggPriceForecastList({
          c_page: 1,
          star_time: this.begintime,
          end_time: this.endtime,
          tel: this.phone_number
        }).then(res => {
          this.historyData = res.data.list.list;
          this.dataCount = res.data.list.num;
          var i = 1;
          this.historyData.forEach((item, index) => {
            item['numid'] = i++
          })
        })
      },
      /*分页点击事件*/
      changepage(index) {
        var begin = new Date(this.timeInput[0])
        this.begintime = begin.getFullYear() + '-' + (begin.getMonth() + 1) + '-' + begin.getDate()
        var end = new Date(this.timeInput[1])
        this.endtime = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()
        if(this.begintime == 'NaN-NaN-NaN') {
          this.begintime = ''
        }
        if(this.endtime == 'NaN-NaN-NaN') {
          this.endtime = ''
        }
        getEggPriceForecastList({
          c_page: index,
          star_time: this.begintime,
          end_time: this.endtime,
          tel: this.phone_number
        }).then(res => {
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
      this.getEggPriceForecastListinfo();
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
