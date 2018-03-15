<template>
  <div class="pad">
    <Row>
      <Col span="24" class="table-title" style="font-size:18px;">基本指标</Col>
    </Row>
    <Row>
      <router-link tag='div' to='/modaluser/forumtrendinfo'>
        <Col class="trend-col" span="6">
        <div style="font-size: 16px;" v-if='user_total'>
          加载中...
        </div>
        <div v-else>
          <span>论坛发帖总数</span></br>
          <span class='date-num'>{{forumposttotal}}</span></br>
        </div>
        </Col>
      </router-link>
      <router-link tag='div' to='/modaluser/dayforumtrendinfo'>
        <Col class="trend-col" span="6">
        <div style="font-size: 16px;" v-if='user_total'>
          加载中...
        </div>
        <div v-else>
          <span>当天发帖总数</span></br>
          <span class='date-num'>{{Dayforumposttotal}}</span></br>
        </div>
        </Col>
      </router-link>
      <router-link tag='div' to='/modaluser/goodforuminfo'>
        <Col class="trend-col" span="6">
        <div style="font-size: 16px;" v-if='user_total'>
          加载中...
        </div>
        <div v-else>
          <span>精华帖总数</span></br>
          <span class='date-num'>{{goodforumtotal}}</span></br>
        </div>
        </Col>
      </router-link>
      <router-link tag='div' to='/modaluser/daygoodforuminfo'>
        <Col class="trend-col" span="6">
        <div style="font-size: 16px;" v-if='user_total'>
          加载中...
        </div>
        <div v-else>
          <span>当天精华帖总数</span></br>
          <span class='date-num'>{{Daygoodforumtotal}}</span></br>
        </div>
        </Col>
      </router-link>
    </Row>
        <Row>
      <router-link tag='div' to='/modaluser/askforuminfo'>
        <Col class="trend-col" span="6">
        <div style="font-size: 16px;" v-if='user_total'>
          加载中...
        </div>
        <div v-else>
          <span>提问帖总数</span></br>
          <span class='date-num'>{{askforumtotal}}</span></br>
        </div>
        </Col>
      </router-link>
      <router-link tag='div' to='/modaluser/dayaskforuminfo'>
        <Col class="trend-col" span="6">
        <div style="font-size: 16px;" v-if='user_total'>
          加载中...
        </div>
        <div v-else>
          <span>当天提问帖总数</span></br>
          <span class='date-num'>{{Dayaskforumtotal}}</span></br>
        </div>
        </Col>
      </router-link>
      <router-link tag='div' to='/modaluser/reportforuminfo'>
        <Col class="trend-col" span="6">
        <div style="font-size: 16px;" v-if='user_total'>
          加载中...
        </div>
        <div v-else>
          <span>被举报帖总数</span></br>
          <span class='date-num'>{{reportedforumtotal}}</span></br>
        </div>
        </Col>
      </router-link>
      <router-link tag='div' to='/modaluser/dayreportforuminfo'>
        <Col class="trend-col" span="6">
        <div style="font-size: 16px;" v-if='user_total'>
          加载中...
        </div>
        <div v-else>
          <span>当天被举报帖总数</span></br>
          <span class='date-num'>{{Dayreportedforumtotal}}</span></br>
        </div>
        </Col>
      </router-link>
    </Row>
    <div class="trend-bottom">
      <Row>
        <Col span="24" class="table-title  titleStyle">
        <span  style="font-size:16px;">论坛发帖时间趋势图</span>
        <span style="font-size:16px;margin-left:40px ;">请选择时间段 : </span>
        <DatePicker type="daterange" :options="options2" placement="bottom" v-model="timeInput1" confirm format="yyyy-MM-dd"  style="width: 200px;font-size:14px;"></DatePicker>
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
        <span>未采纳意见的提问帖</span>
        <i-input placeholder="这里输入正确的手机号" v-model='phone_number' style="width: 200px;margin: 0 20px 0 40px;"></i-input>
        <DatePicker type="daterange" :options="options2" placement="bottom" v-model="timeInput2" confirm format="yyyy-MM-dd"  style="width: 200px;font-size:14px;"></DatePicker>
        <Button type="primary" @click="searchnoforum">搜索</Button>
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
  import { getForumTotalData,getDayForumTotalData,getGoodForumTotalData,getDayGoodForumTotalData,getAskForumTotalData,getDayAskForumTotalData,getReportedForumTotalData,getDayReportedForumTotalData,getForumTimeChartData,getNoForumData} from '../../../api/api'
  export default {
    data() {
      return {
        hello_curr: 1,
        begintime1: '',
        endtime1: '',
        timeInput1: '',
        user_total: true,
        chart_load: true,
        forumposttotal: '',
        Dayforumposttotal: '',
        goodforumtotal: '',
        Daygoodforumtotal: '',
        askforumtotal: '',
        Dayaskforumtotal: '',
        reportedforumtotal: '',
        Dayreportedforumtotal: '',
        getForumTimeCount: [],
        getForumeTimetime: [],
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
        // 每页显示多少条
        pageSize: 20,
        historyColumns: [{
            title: '序号',
            key: 'numid',
            width:70,
            align: "center"
          }, {
            title: '用户名称',
            key: 'username',
            width: 130,
            align: "center"
          },
          {
            title: '真实姓名',
            width: 110,
            key: 'real_name',
            align: "center"
          },
          {
            title: '注册手机号',
            width: 130,
            key: 'mobile_phone',
            align: "center"
          },
          {
            title: '手机号归属地',
            sortable: true,
            width:150,
            key: 'tel_address',
            align: "center"
          },
          {
            title: '注册地址',
            key: 'address',
            width:180,
            sortable: true,
            width:150,
            align: "center"
          },
          {
            title: '文章标题',
            key: 'title',
            width:170,
            align: "center"
          },
          {
            title: '收藏量',
            width: 90,
            key: 'favorite',
            align: "center"
          },
          {
            title: '点赞量',
            width: 90,
            key: 'praise',
            align: "center"
          },
          {
            title: '分享量',
            key: 'shareCount',
            width: 90,
            align: "center"
          },
          {
            title: '浏览量',
            key: 'view',
            width: 90,
            align: "center"
          },
          {
            title: '举报量',
            key: 'reportCount',
            width: 90,
            align: "center"
          },
          {
            title: '回复量',
            key: 'commentCount',
            width: 90,
            align: "center"
          },{
            title: '状态',
            key: 'communityStatus',
            width: 90,
            align: "center"
          },{
            title: '采纳情况',
            width: 110,
            key: 'is_adopt',
            align: "center"
          },{
            title: '创建时间',
            key: 'create_time',
            width:180,
            fixed: 'right',
            align: "center"
          }
        ],
        historyData: [],
        registerPhone: '',
        phone_number: '',
        begintime2: "",
        endtime2: '',
        hello_curr: 1,
        timeInput2: '',
      }
    },
    methods: {
      //模块用户行为->管家视界->养殖课堂->基本指标数据
      gettotalData() {
        getForumTotalData().then(res => {
          this.forumposttotal = res.data.list.num
          this.user_total = false
        })
        getDayForumTotalData().then(res => {
          this.Dayforumposttotal = res.data.list.num
          this.user_total = false
        })
        getGoodForumTotalData().then(res => {
          this.goodforumtotal = res.data.list.num
          this.user_total = false
        })
        getDayGoodForumTotalData().then(res => {
          this.Daygoodforumtotal = res.data.list.num
          this.user_total = false
        })
        getAskForumTotalData().then(res => {
          this.askforumtotal = res.data.list.num
          this.user_total = false
        })
        getDayAskForumTotalData().then(res => {
          this.Dayaskforumtotal = res.data.list.num
          this.user_total = false
        })
        getReportedForumTotalData().then(res => {
          this.reportedforumtotal = res.data.list.num
          this.user_total = false
        })
        getDayReportedForumTotalData().then(res => {
          this.Dayreportedforumtotal = res.data.list.num
          this.user_total = false
        })
      },
       //模块用户行为->论坛-》论坛发帖趋势图
      getForumTimeChartDatainfo(){
        var setime = new Date();
        var month1 = (setime.getMonth() + 1)>=10?(setime.getMonth() + 1):'0'+(setime.getMonth() + 1)
        var day1 = setime.getDate()>=10?setime.getDate():'0'+setime.getDate()
        this.endtime1 = setime.getFullYear() + '-' + month1 + '-' + day1
        var oneweekdate = new Date(setime.getTime() - 6 * 24 * 3600 * 1000);
        var month2 = (oneweekdate.getMonth() + 1)>=10?(oneweekdate.getMonth() + 1):'0'+(oneweekdate.getMonth() + 1)
        var day2 = oneweekdate.getDate()>=10?oneweekdate.getDate():'0'+oneweekdate.getDate()
        this.begintime1 = oneweekdate.getFullYear() + '-' + month2 + '-' + day2
        getForumTimeChartData({
          star_time: this.begintime1,
          end_time: this.endtime1,
        }).then(res => {
          res.data.list.forEach((item, index) => {
            this.getForumTimeCount.push(item.value);
            this.getForumeTimetime.push(item.date);
            this.chart_load = false
          })
          this.draForumeTimeChart();
        })
      },
      searchVideoCollectNum() {
        if(this.timeInput1[0] == null || this.timeInput1[1] == null){
          this.timeInput1 = ""
        }
        this.getForumTimeCount = []
        this.getForumeTimetime = []
        if(this.timeInput1.length){

        if(this.begintime1 == '' || this.endtime1 == "") {
          this.$Message.info('请输入搜素时间!')
          return
        }
        var begin = new Date(this.timeInput1[0])
        var month1 = (begin.getMonth() + 1)>=10?(begin.getMonth() + 1):'0'+(begin.getMonth() + 1)
        var day1 = begin.getDate()>=10?begin.getDate():'0'+begin.getDate()
        this.begintime1 = begin.getFullYear() + '-' + month1 + '-' + day1
        var end = new Date(this.timeInput1[1])
        var month2 = (end.getMonth() + 1)>=10?(end.getMonth() + 1):'0'+(end.getMonth() + 1)
        var day2 = end.getDate()>=10?end.getDate():'0'+end.getDate()
        this.endtime1 = end.getFullYear() + '-' + month2 + '-' + day2
        /*var now_time = new Date();
        if(this.endtime > now_time) {
          this.$Message.info('结束时间不能大于当前日期!')
          return
        }
        if(this.begintime > this.endtime) {
          this.$Message.info('结束时间需大于开始时间!')
          return
        }*/
        var now_time = new Date().getTime();
        var beginTime1 = this.timeInput1[0].getTime()
        var endTime1 = this.timeInput1[1].getTime()
        if(endTime1 > now_time) {
          this.$Message.info('结束时间不能大于当前日期!')
          return
        }
        if(beginTime1 > this.endtime1) {
          this.$Message.info('结束时间需大于开始时间!')
          return
        }

        if(this.begintime1 == 'NaN-NaN-NaN') {
          this.begintime1 = ''
        }
        if(this.endtime1 == 'NaN-NaN-NaN') {
          this.endtime1 = ''
        }
        }
        document.getElementById('search').disabled = true
        getForumTimeChartData({
          star_time: this.begintime1,
          end_time: this.endtime1,
        }).then(res => {
          console.log(res)
          if(!res.data.list.length){
            this.$Message.error('此时间段无数据，请重新选择!');
            document.getElementById('search').disabled = false
            return
          }
          res.data.list.forEach((item, index) => {
            this.getForumTimeCount.push(item.value);
            this.getForumeTimetime.push(item.date);
            document.getElementById('search').disabled = false
            this.chart_load = false
          })
          this.draForumeTimeChart();
        })
      },
      draForumeTimeChart() {
        var myChart = this.$echarts.init(document.getElementById('videoCollectNumChart'));
        var colors = ['#5793f3', '#d14a61', '#675bba'];
        var _this = this;
        myChart.on('click', function(pa) {
          _this.$router.push('/modaluser/forumposttimeinfo/' + pa.name)
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
            data: this.getForumeTimetime.reverse(),
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
            name: '发帖数',
            type: 'line',
            data: this.getForumTimeCount.reverse(),
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

       searchnoforum() {
        if(this.timeInput2[0] == null || this.timeInput2[1] == null){
          this.timeInput2 = ""
        }
        if(this.timeInput2.length){
        var begin = new Date(this.timeInput2[0])
        this.begintime = begin.getFullYear() + '-' + (begin.getMonth() + 1) + '-' + begin.getDate()
        var end = new Date(this.timeInput2[1])
        this.endtime = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()
        /*var now_time = new Date().getTime();
        var beginTime = this.timeInput2[0].getTime()
        var endTime = this.timeInput2[1].getTime()
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
        if(this.begintime == 'NaN-NaN-NaN') {
          this.begintime = ''
        }
        if(this.endtime == 'NaN-NaN-NaN') {
          this.endtime = ''
        }
        }
        getNoForumData({
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
              if(item.real_name == ""){
              item.real_name = "不详"
              }
            })
          } else {
            alert(res.msg)
          }
          this.hello_curr = 1
        })
      },
      getNoForumDatainfo() {
        getNoForumData({
          c_page: 1,
          star_time: this.begintime,
          end_time: this.endtime,
        }).then(res => {
          this.historyData = res.data.list.list;
          this.dataCount = res.data.list.num;
          var i = 1;
          this.historyData.forEach((item, index) => {
            item['numid'] = i++
            if(item.real_name == ""){
              item.real_name = "不详"
            }
          })
          this.hello_curr = 1
        })
      },
      changepage(index) {
        if(this.timeInput2.length){
        var begin = new Date(this.timeInput2[0])
        this.begintime = begin.getFullYear() + '-' + (begin.getMonth() + 1) + '-' + begin.getDate()
        var end = new Date(this.timeInput2[1])
        this.endtime = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()
        if(this.begintime == 'NaN-NaN-NaN') {
          this.begintime = ''
        }
        if(this.endtime == 'NaN-NaN-NaN') {
          this.endtime = ''
        }
        }
        getNoForumData({
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
      this.getForumTimeChartDatainfo();
      this.getNoForumDatainfo()
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
