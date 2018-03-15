<template>
  <div class="pad">
    <Row>
      <Col span="24" class="table-title" style="font-size:18px;">基本指标</Col>
    </Row>
    <Row>
      <router-link tag='div' to='/modaluser/intoframeviewsdetail'>
        <Col class="trend-col" span="6">
        <div style="font-size: 16px;" v-if='user_total'>
          加载中...
        </div>
        <div v-else>
          <span>总观看次数</span></br>
          <span class='date-num'>{{watchCount}}</span></br>
        </div>
        </Col>
      </router-link>
      <router-link tag='div' to='/modaluser/intoframepostdetail'>
        <Col class="trend-col" span="6">
        <div style="font-size: 16px;" v-if='user_total'>
          加载中...
        </div>
        <div v-else>
          <span>总报名人数</span></br>
          <span class='date-num'>{{reportedCount}}</span></br>
        </div>
        </Col>
      </router-link>
    </Row>
    <div class="trend-bottom">
      <Row>
        <Col span="24" class="table-title  titleStyle">
        <span  style="font-size:16px;">每天报名人数</span>
        <span style="font-size:16px;margin-left:40px ;">请选择时间段 : </span>
        <DatePicker type="daterange" :options="options2" placement="bottom" v-model="timeInput" confirm format="yyyy-MM-dd"  style="width: 200px;font-size:14px;"></DatePicker>
        <Button style="background:rgb(56, 153, 254);color: #FFFFFF;margin: 0 20px;" id="search" @click="searchVideoCollectNum">搜索</Button>
        </Col>
      </Row>
      <Row>
        <Col span="24" class="table-bor">
        <div style="font-size: 16px;" v-show='chart_load'>
          加载中...
        </div>
        <div style="height: 300px; width: 100%;" id="videoCollectNumChart"></div>
        </Col>
      </Row>
    </div>
         <Row>
      <Col span="24">
      <div class="table-title tableStyle">
        <span>走进鸡场报名情况</span>
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
  import { getIntoChickenHouseTotalData,getreportedData,getFramEnrollData,getNoForumData } from '../../../api/api'
  export default {
    data() {
      return {
        bannerclicknum : '', //banner点击总数
        begintime: '',
        endtime: '',
        user_total: true,
        chart_load: true,
        watchCount: '',
        reportedCount: '',
        getDayReportedCount: [], //baner点击次数
        getDayReportTime: [], //banner点击时间
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
        },
        dataCount: 0,
        hello_curr: 1,
        // 每页显示多少条
        pageSize: 20,
        historyColumns: [{
            title: '序号',
            key: 'numid',
            align: "center"
          }, {
            title: '企业名称',
            key: 'company',
            align: "center"
          },
          {
            title: '企业规模',
            key: 'size',
            align: "center"
          },
          {
            title: '企业地址',
            key: 'address',
            sortable: true,
            align: "center"
          },
          {
            title: '产品类型',
            key: 'pro_type',
            align: "center"
          },
          {
            title: '联系人',
            key: 'linkman',
            align: "center"
          },
          {
            title: '联系电话',
            key: 'phone',
            align: "center"
          },
          {
            title: '报名时间',
            width:180,
            key: 'create_time',
            align: "center"
          }
        ],
        historyData: [],
      }
    },
    methods: {
      //模块用户行为->管家视界->养殖课堂->基本指标数据
      gettotalData() {
        getIntoChickenHouseTotalData().then(res => {
          this.watchCount = res.result.watchCount
          this.reportedCount = res.result.reportedCount
          this.user_total = false
        })
      },
      //模块用户行为->管家视界->每日报名人数图表
      getDayCollectVideoNuminfo() {
        var setime = new Date();
        var month1 = (setime.getMonth() + 1)>=10?(setime.getMonth() + 1):'0'+(setime.getMonth() + 1)
        var day1 = setime.getDate()>=10?setime.getDate():'0'+setime.getDate()
        this.endtime = setime.getFullYear() + '-' + month1 + '-' + day1
        var oneweekdate = new Date(setime.getTime() - 30 * 24 * 3600 * 1000);
        var month2 = (oneweekdate.getMonth() + 1)>=10?(oneweekdate.getMonth() + 1):'0'+(oneweekdate.getMonth() + 1)
        var day2 = oneweekdate.getDate()>=10?oneweekdate.getDate():'0'+oneweekdate.getDate()
        this.begintime = oneweekdate.getFullYear() + '-' + month2 + '-' + day2
        getreportedData({
          start_time: this.begintime,
          end_time: this.endtime
        }).then(res => {
          res.result.data.forEach((item, index) => {
            this.getDayReportedCount.push(item.value);
            this.getDayReportTime.push(item.name);
            this.chart_load = false
          })
          this.draWdayvideocollect();
        })
      },
      searchVideoCollectNum() {
        if(this.timeInput[0] == null || this.timeInput[1] == null){
          this.timeInput = ""
        }
        this.getDayReportedCount = []
        this.getDayReportTime = []
        if(this.timeInput.length){
        var now_time = new Date().getTime();
        var beginTime = this.timeInput[0].getTime()
        var endTime = this.timeInput[1].getTime()
        if(endTime > now_time) {
          this.$Message.info('结束时间不能大于当前日期!')
          return
        }
        if(beginTime > this.endtime) {
          this.$Message.info('结束时间需大于开始时间!')
          return
        }

        if(this.begintime == '' || this.endtime == "") {
          this.$Message.info('请输入搜素时间!')
          return
        }
        var begin = new Date(this.timeInput[0])
        var month1 = (begin.getMonth() + 1)>=10?(begin.getMonth() + 1):'0'+(begin.getMonth() + 1)
        var day1 = begin.getDate()>=10?begin.getDate():'0'+begin.getDate()
        this.begintime = begin.getFullYear() + '-' + month1 + '-' + day1
        var end = new Date(this.timeInput[1])
        var month2 = (end.getMonth() + 1)>=10?(end.getMonth() + 1):'0'+(end.getMonth() + 1)
        var day2 = end.getDate()>=10?end.getDate():'0'+end.getDate()
        this.endtime = end.getFullYear() + '-' + month2 + '-' + day2
        if(this.begintime == 'NaN-NaN-NaN') {
          this.begintime = ''
        }
        if(this.endtime == 'NaN-NaN-NaN') {
          this.endtime = ''
        }
        }
        document.getElementById('search').disabled=true
        getreportedData({
          start_time: this.begintime,
          end_time: this.endtime
        }).then(res => {
          if(!res.result.data.length){
            this.$Message.error('此时间段无数据，请重新选择!');
            document.getElementById('search').disabled = false
            return
          }
          res.result.data.forEach((item, index) => {
            this.getDayReportedCount.push(item.value);
            this.getDayReportTime.push(item.name);
            document.getElementById('search').disabled=false
          })
          this.hello_curr = 1
          this.draWdayvideocollect();
        })
      },
      draWdayvideocollect() {
        var myChart = this.$echarts.init(document.getElementById('videoCollectNumChart'));
        var colors = ['#5793f3', '#d14a61', '#675bba'];
        var _this = this;
        myChart.on('click', function(pa) {
          _this.$router.push('/modaluser/daypostinfo/' + pa.name)
        })
        myChart.setOption({
          color: colors,
          tooltip: {
           trigger: 'axis',
           axisPointer: {
           type: 'line'
           }
          },
          toolbox: {
          show: true,
          feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
            }
         },
         grid: {
            top: 50,
            bottom: 50,
            left: 60,
            right: 50
          },
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            name:"时间",
            boundaryGap: false,
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              onZero: true,
              lineStyle: {
                color: '#000'
              }
            },
            data: this.getDayReportTime,
            splitLine: {
             show: true,
             lineStyle: {
               color: '#f5f7f9'
             }
            }
          }],
          yAxis: [{
            type: 'value',
            name:"次数",
            splitLine: {
              show: true,
              lineStyle: {
                color: '#f5f7f9'
              }
            }
          }],
          series: [{
            name: '每天报名人数',
            type: 'line',
            data: this.getDayReportedCount,
            markPoint : {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name: '平均值'}
                ]
            }
          }]
        });
       },


      getFramEnrollDatainfo() {
        getFramEnrollData({
          page: 1,
        }).then(res => {
          this.historyData = res.result.data;
          this.dataCount = res.result.count;
          var i = 1;
          this.historyData.forEach((item, index) => {
            item['numid'] = i++
            if(item.real_name == ""){
              item.real_name = "不详"
            }
          })
        })
      },
      changepage(index) {
        getFramEnrollData({
          page: index
        }).then(res => {
          this.historyData = res.result.data;
          this.dataCount = res.result.count;
          var i = 1;
          this.historyData.forEach((item, index) => {
            item['numid'] = i++
            if(item.real_name == ""){
              item.real_name = "不详"
            }
          })
        })
        document.getElementsByClassName("pad")[0].scrollTop = 0
      },
    },
    mounted() {
      this.gettotalData();
      this.getFramEnrollDatainfo()
      this.getDayCollectVideoNuminfo();
    }
  }
</script>

<style scoped>
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
