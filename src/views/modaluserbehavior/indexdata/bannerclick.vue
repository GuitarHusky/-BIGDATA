<template>
  <div class="pad">
    <Row>
      <Col span="24" class="table-title" style="font-size:18px;">基本指标</Col>
    </Row>
    <Row>
      <!-- <router-link tag='div' to='/modaluser/bannerclickinfo'> -->
        <Col class="trend-col" span="6" @click.native="toPush">
        <div style="font-size: 16px;" v-if='user_total'>
          加载中...
        </div>
        <div v-else>
          <span>banner点击总次数</span></br>
          <span class='date-num'>{{bannerclicktotal}}</span></br>
        </div>
        </Col>
      <!-- </router-link> -->
    </Row>
    <div class="trend-bottom">
      <Row>
        <Col span="24" class="table-title  titleStyle">
        <span  style="font-size:16px;">Banner点击次数</span>
        <span style="font-size:16px;margin-left:40px ;">请选择时间段 : </span>
        <DatePicker type="daterange" :options="options2" placement="bottom" v-model="timeInput" confirm format="yyyy-MM-dd"  style="width: 200px;font-size:14px;"></DatePicker>
        <Button style="background:rgb(56, 153, 254);color: #FFFFFF;margin: 0 20px;" id="search" @click="searchTrend">搜索</Button>
        </Col>
      </Row>
      <Row>
        <Col span="24" class="table-bor">
        <div style="font-size: 16px;" v-show='chart_load'>
          加载中...
        </div>
        <div style="height: 300px; width: 100%;" id="bannerclickchart"></div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
  import { getBannerClick,getBannerClickCharts } from '../../../api/api'
  export default {
    data() {
      return {
        bannerclicknum : '', //banner点击总数
        begintime: '',
        endtime: '',
        user_total: true,
        chart_load: true,
        bannerclicktotal: '',
        banner_click_count: [], //baner点击次数
        banner_click_time: [], //banner点击时间
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
      toPush(){
        this.$router.push("/modaluser/bannerclickinfo")
      },
      //模块用户行为->首页数据->banner点击次数
      getBannerClickNum() {
        getBannerClick({
          start_time: this.begintime,
          end_time: this.endtime
        }).then(res => {
          console.log(res.data.list)
          this.user_total = false;
          this.bannerclicktotal = res.data.list.count;
        })
      },
      //模块用户行为->首页数据->banner点击次数图表
      getBannerClickInfo() {
        getBannerClickCharts({
          star_time: this.begintime,
          end_time: this.endtime
        }).then(res => {
          res.data.list.forEach((item, index) => {
            this.banner_click_count.push(item.value);
            this.banner_click_time.push(item.name);
            this.chart_load = false
          })
          this.draWbatter();
        })
      },
      searchTrend() {
        if(this.timeInput[0] == null || this.timeInput[1] == null){
          this.timeInput = ""
        }
        this.banner_click_count = []
        this.banner_click_time = []
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
        this.begintime = begin.getFullYear() + '-' + (begin.getMonth() + 1) + '-' + begin.getDate()
        var end = new Date(this.timeInput[1])
        this.endtime = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()
        if(this.begintime == 'NaN-NaN-NaN') {
          this.begintime = ''
        }
        if(this.endtime == 'NaN-NaN-NaN') {
          this.endtime = ''
        }
        document.getElementById('search').disabled=true
        getBannerClickCharts({
          star_time: this.begintime,
          end_time: this.endtime
        }).then(res => {
          res.data.list.forEach((item, index) => {
            this.banner_click_count.push(item.value);
            this.banner_click_time.push(item.name);
            document.getElementById('search').disabled=false
          })
          this.draWbatter();
        })
      },
      draWbatter() {
        var myChart = this.$echarts.init(document.getElementById('bannerclickchart'));
        var colors = ['#5793f3', '#d14a61', '#675bba'];
        var _this = this;
        myChart.on('click', function(pa) {
          _this.$router.push('/modaluser/bannerclickinfotable/' + pa.name)
        })
        myChart.setOption({
          color: colors,
          tooltip: {
           trigger: 'axis',
           axisPointer: {
           type: 'line'
           }
          },
          legend: {
            data: ['点击次数']
          },
          grid: {
            top: 50,
            bottom: 50,
            left: 60,
            right: 50
          },
          xAxis: [{
            type: 'category',
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
            data: this.banner_click_time.reverse(),
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
            name: '点击次数',
            type: 'line',
            smooth: true,
            symbol: 'circle', //拐点样式
            symbolSize: 10, //拐点大小
            data: this.banner_click_count.reverse(),
            itemStyle: {
              normal: {
                areaStyle: {
                  type: 'default'
                },
                color: 'rgb(232,245,253)',
                lineStyle: {
                  color: '#2d8cf0'
                },
                borderColor:'#2d8cf0'
              }
            }
          }]
        });
      },
    },
    mounted() {
      var setime = new Date();
      this.endtime = setime.getFullYear() + '-' + (setime.getMonth() + 1) + '-' + setime.getDate()
      var oneweekdate = new Date(setime.getTime() - 7 * 24 * 3600 * 1000);
      this.begintime = oneweekdate.getFullYear() + '-' + (oneweekdate.getMonth() + 1) + '-' + oneweekdate.getDate()
      this.getBannerClickNum();
      this.getBannerClickInfo();
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
