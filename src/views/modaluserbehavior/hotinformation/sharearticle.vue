<template>
  <div class="pad">
    <Row>
      <Col span="24" class="table-title" style="font-size:18px;">基本指标</Col>
    </Row>
    <Row>
      <router-link tag='div' to=''>
        <Col class="trend-col" span="6">
        <div style="font-size: 16px;" v-if='user_total'>
          加载中...
        </div>
        <div v-else>
          <span>分享文章总次数</span></br>
          <span class='date-num'>{{sharearticleNum}}</span></br>
        </div>
        </Col>
      </router-link>
    </Row>
    <div class="trend-bottom" style="margin-top:20px;">
      <Row>
        <Col span="24" class="table-title  titleStyle">
        <span  style="font-size:16px;">每天分享文章次数</span>
        <DatePicker type="daterange" :options="options2" placement="bottom" v-model="timeInput1" confirm format="yyyy-MM-dd"  placeholder="请选择时间段" style="width: 200px;font-size:14px;margin-left:70px;"></DatePicker>
        <Button type="primary" @click="searchSharearticleCountData" id="search1">搜索</Button>
        </Col>
      </Row>
      <Row>
        <Col span="24" class="table-bor">
        <div style="font-size: 16px;" v-show="chart_load">
          加载中...
        </div>
        <div style="height: 300px; width: 100%;" id="sharearticleCount"></div>
        </Col>
      </Row>
    </div>
    <div class="trend-bottom" style="margin-top:20px;">
      <Row>
        <Col span="24" class="table-title  titleStyle">
        <span  style="font-size:16px;">每天分享文章人数</span>
        <DatePicker type="daterange" :options="options2" placement="bottom" v-model="timeInput2" confirm format="yyyy-MM-dd"  placeholder="请选择时间段" style="width: 200px;font-size:14px;margin-left:70px;"></DatePicker>
        <Button type="primary" @click="searchSharearticlePersonData" id="search2">搜索</Button>
        </Col>
      </Row>
      <Row>
        <Col span="24" class="table-bor">
        <div style="font-size: 16px;" v-show="chart_load">
          加载中...
        </div>
        <div style="height: 300px; width: 100%;" id="sharearticlePerson"></div>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
  import {getshareArticleCount,getshareArticleCountChart,getshareArticlePersonChart} from '../../../api/api'
  export default {
    data(){
      return {
        chart_load: true,
        timeInput1: '',
        timeInput2: '',
        begintime1: '',
        endtime1: '',
        begintime2: '',
        endtime2: '',
        user_total: true,
        sharearticleNum: '',
        sharearticleCountNum: [],
        sharearticleCountTime: [],
        sharearticlePersonNum: [],
        sharearticlePersonTime: [],
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
    methods:{
      getReadCount(){
        getshareArticleCount().then(res => {
          this.sharearticleNum = res.result.count
        })
        this.user_total = false;
      },
      /*获取每日分享文章次数数据*/
      getshareArticleCountChartData(){
        var setime = new Date();
        this.endtime1 = setime.getFullYear() + '-' + (setime.getMonth() + 1) + '-' + setime.getDate()
        var oneweekdate = new Date(setime - 6* 24 * 3600 * 1000);
        this.begintime1 = oneweekdate.getFullYear() + '-' + (oneweekdate.getMonth() + 1) + '-' + oneweekdate.getDate()
        getshareArticleCountChart({
          start_time: this.begintime1,
          end_time: this.endtime1
        }).then(res => {
          res.result.count.forEach((item,index) => {
            this.sharearticleCountNum.push(item.count)
            this.sharearticleCountTime.push(item.date)
          })
          this.chart_load = false
          this.drawSharearticleCount();
        })
      },
      /*获取每日分享文章人数数据*/
      getshareArticlePersonChartData(){
        var setime = new Date();
        this.endtime2 = setime.getFullYear() + '-' + (setime.getMonth() + 1) + '-' + setime.getDate()
        var oneweekdate = new Date(setime - 6* 24 * 3600 * 1000);
        this.begintime2 = oneweekdate.getFullYear() + '-' + (oneweekdate.getMonth() + 1) + '-' + oneweekdate.getDate()
        getshareArticlePersonChart({
          start_time: this.begintime2,
          end_time: this.endtime2
        }).then(res => {
          res.result.data.forEach((item,index) => {
            this.sharearticlePersonNum.push(item.count)
            this.sharearticlePersonTime.push(item.date)
          })
          this.chart_load = false
          this.drawSharearticlePerson();
        })
       },
       searchSharearticleCountData(){
        if(this.timeInput1[0] == null || this.timeInput1[1] == null){
          this.timeInput1 = ""
        }
        this.sharearticleCountNum = []
        this.sharearticleCountTime = []
        if(this.timeInput1.length){
            document.getElementById("search1").disabled = true;
            var begin = new Date(this.timeInput1[0])
            this.begintime1 = begin.getFullYear() + '-' + (begin.getMonth() + 1) + '-' + begin.getDate()
            var end = new Date(this.timeInput1[1])
            this.endtime1 = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()

            if(this.begintime1 == 'NaN-NaN-NaN') {
              this.begintime1 = ''
            }
            if(this.endtime1 == 'NaN-NaN-NaN') {
              this.endtime1 = ''
            }
            var now_time = new Date().getTime();
            var beginTime = this.timeInput1[0].getTime()
            var endTime = this.timeInput1[1].getTime()
            if(endTime > now_time) {
              this.$Message.info('结束时间不能大于当前日期!')
              return
            }
            if(beginTime > this.endtime) {
              this.$Message.info('结束时间需大于开始时间!')
              return
            }
        }
        getshareArticleCountChart({
          start_time: this.begintime1,
          end_time: this.endtime1
        }).then(res => {
          res.result.count.forEach((item,index) => {
            this.sharearticleCountNum.push(item.count)
            this.sharearticleCountTime.push(item.date)
          })
          document.getElementById("search1").disabled = false;
          this.chart_load = false
          this.drawSharearticleCount();
        })
       },
       searchSharearticlePersonData(){
        if(this.timeInput2[0] == null || this.timeInput2[1] == null){
          this.timeInput2 = ""
        }
        this.sharearticlePersonNum = []
        this.sharearticlePersonTime = []
        if(this.timeInput2.length){
            document.getElementById("search2").disabled = true;
            var begin = new Date(this.timeInput2[0])
            this.begintime2 = begin.getFullYear() + '-' + (begin.getMonth() + 1) + '-' + begin.getDate()
            var end = new Date(this.timeInput2[1])
            this.endtime2 = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()

            if(this.begintime2 == 'NaN-NaN-NaN') {
              this.begintime2 = ''
            }
            if(this.endtime2 == 'NaN-NaN-NaN') {
              this.endtime2 = ''
            }
            var now_time = new Date().getTime();
            var beginTime = this.timeInput2[0].getTime()
            var endTime = this.timeInput2[1].getTime()
            if(endTime > now_time) {
              this.$Message.info('结束时间不能大于当前日期!')
              return
            }
            if(beginTime > this.endtime) {
              this.$Message.info('结束时间需大于开始时间!')
              return
            }
          }
          getshareArticlePersonChart({
          start_time: this.begintime2,
          end_time: this.endtime2
          }).then(res => {
          res.result.data.forEach((item,index) => {
            this.sharearticlePersonNum.push(item.count)
            this.sharearticlePersonTime.push(item.date)
          })
          document.getElementById("search2").disabled = false;
          this.chart_load = false
          this.drawSharearticlePerson();
          })
       },
       drawSharearticleCount() {
        var myChart = this.$echarts.init(document.getElementById('sharearticleCount'));
        var colors = ['#5793f3', '#d14a61', '#675bba'];
        var _this = this;
        /*myChart.on('click', function(pa) {
          _this.$router.push('/modaluser/eggpriceforecast/' + pa.name)
        })*/
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
            data: this.sharearticleCountTime.reverse(),
            splitLine: {
             show: true,
             lineStyle: {
               color: '#f5f7f9'
             }
            }
          }],
          yAxis: [{
            type: 'value',
            name:"数量",
            splitLine: {
              show: true,
              lineStyle: {
                color: '#f5f7f9'
              }
            }
          }],
          series: [{
            name: '文章分享次数',
            type: 'line',
            data: this.sharearticleCountNum.reverse(),
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
       drawSharearticlePerson() {
        var myChart = this.$echarts.init(document.getElementById('sharearticlePerson'));
        var colors = ['#5793f3', '#d14a61', '#675bba'];
        var _this = this;
        /*myChart.on('click', function(pa) {
          _this.$router.push('/modaluser/eggpriceforecast/' + pa.name)
        })*/
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
            data: this.sharearticlePersonTime.reverse(),
            splitLine: {
             show: true,
             lineStyle: {
               color: '#f5f7f9'
             }
            }
          }],
          yAxis: [{
            type: 'value',
            name:"数量",
            splitLine: {
              show: true,
              lineStyle: {
                color: '#f5f7f9'
              }
            }
          }],
          series: [{
            name: '文章分享人数',
            type: 'line',
            data: this.sharearticlePersonNum.reverse(),
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
    },

    mounted(){
      this.getReadCount()
      this.getshareArticleCountChartData()
      this.getshareArticlePersonChartData()
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
