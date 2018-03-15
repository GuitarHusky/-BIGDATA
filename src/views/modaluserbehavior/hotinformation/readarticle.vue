<template>
  <div class="pad">
    <Row>
      <Col span="24" class="table-title" style="font-size:18px;">基本指标</Col>
    </Row>
    <Row>
      <!--  to='/modaluser/readarticleinfo' -->
      <router-link tag='div' to=''>
        <Col class="trend-col" span="6">
        <div style="font-size: 16px;" v-if='user_total'>
          加载中...
        </div>
        <div v-else>
          <span>阅读文章总次数</span></br>
          <span class='date-num'>{{readarticleNum}}</span></br>
        </div>
        </Col>
      </router-link>
      <router-link tag='div' to='/modaluser/readarticlepvinfo'>
        <Col class="trend-col" span="6">
        <div style="font-size: 16px;" v-if='user_total'>
          加载中...
        </div>
        <div v-else>
          <span>阅读文章总次数(pv)</span></br>
          <span class='date-num'>{{readarticleNumpv}}</span></br>
        </div>
        </Col>
      </router-link>
    </Row>
    <div class="trend-bottom" style="margin-top:20px;">
      <Row>
        <Col span="24" class="table-title  titleStyle">
        <span  style="font-size:16px;">每天文章阅读次数</span>
        <DatePicker type="daterange" :options="options2" placement="bottom" v-model="timeInput" confirm format="yyyy-MM-dd"  placeholder="请选择时间段" style="width: 200px;font-size:14px;margin-left:70px;"></DatePicker>
        <Button type="primary" @click="searchReadarticleCountData" id="search">搜索</Button>
        </Col>
      </Row>
      <Row>
        <Col span="24" class="table-bor">
        <div style="font-size: 16px;" v-show="chart_load">
          加载中...
        </div>
        <div style="height: 300px; width: 100%;" id="dayreadarticle"></div>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
  import {getReadArticleCount,getDayReadArticle} from '../../../api/api'
  export default {
    data(){
      return {
        chart_load: true,
        timeInput: '',
        user_total: true,
        readarticleNum: '',
        readarticleNumpv: '',
        ReadArticleChartNum: [],
        ReadArticleChartTime: [],
        begintime: '',
        endtime: '',
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
    methods:{
      /*获取阅读文章总数*/
      getReadCount(){
        getReadArticleCount().then(res => {
          this.readarticleNum = res.result.articleCount
          this.readarticleNumpv = res.result.articleCountViews
        })
        this.user_total = false;
      },
      /*获取每日阅读文章图表数据*/
      getReadArticleInfo(){
        getDayReadArticle({
          start_time: this.begintime,
          end_time: this.endtime
        }).then(res => {
            res.result.forEach((item,index) => {
              this.ReadArticleChartNum.push(item.value)
              this.ReadArticleChartTime.push(item.name)
            })
            this.draWDayReadArticleNum()
            this.chart_load = false
        })
      },
      searchReadarticleCountData(){
        if(this.timeInput[0] == null || this.timeInput[1] == null){
          this.timeInput = ""
        }
        this.sharearticleCountNum = []
        this.sharearticleCountTime = []
        if(this.timeInput.length){
            document.getElementById("search").disabled = true;
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
           }
          getDayReadArticle({
              start_time: this.begintime,
              end_time: this.endtime
            }).then(res => {
            res.result.forEach((item,index) => {
              this.ReadArticleChartNum.push(item.value)
              this.ReadArticleChartTime.push(item.name)
            })
            document.getElementById("search").disabled = false;
            this.draWDayReadArticleNum()
            this.chart_load = false
        })
       },
      draWDayReadArticleNum() {
        var myChart = this.$echarts.init(document.getElementById('dayreadarticle'));
        var colors = ['#5793f3', '#d14a61', '#675bba'];
        var _this = this;
        myChart.on('click', function(pa) {
          _this.$router.push('/modaluser/dayreadarticleinfo/' + pa.name)
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
            data: this.ReadArticleChartTime.reverse(),
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
            name: '阅读次数',
            type: 'line',
            data: this.ReadArticleChartNum.reverse(),
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
      var setime = new Date();
      this.endtime = setime.getFullYear() + '-' + (setime.getMonth() + 1) + '-' + setime.getDate()
      var oneweekdate = new Date(setime - 6* 24 * 3600 * 1000);
      this.begintime = oneweekdate.getFullYear() + '-' + (oneweekdate.getMonth() + 1) + '-' + oneweekdate.getDate()
      this.getReadArticleInfo()
      this.getReadCount()
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
