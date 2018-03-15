<template>
  <div class="pad">
 <!--    <div class="crumbs_me">
   <Breadcrumb separator=">">
     <BreadcrumbItem to="/">首页</BreadcrumbItem>
     <BreadcrumbItem> 用户分析</BreadcrumbItem>
     <BreadcrumbItem to="/registeranalyse">注册用户分析</BreadcrumbItem>
   </Breadcrumb>
 </div> -->
    <Row style="margin-top: 20px;">
      <Col span="24">
      <!-- <DatePicker type="date" v-model='begintime' placeholder="选择开始时间"></DatePicker>
      <DatePicker type="date" v-model='endtime' placeholder="选择结束时间" style="margin: 0 20px;"></DatePicker> -->
      <DatePicker type="daterange" :options="options2" placement="bottom-start" v-model="timeInput" confirm format="yyyy-MM-dd"  style="width: 200px;font-size:14px;margin-right:10px;"></DatePicker>
      <Button style="background:rgb(56, 153, 254);color: #FFFFFF;" @click="seachRegister">搜索</Button>
      <!-- #57b663 -->
      </Col>
    </Row>
    <Row>
      <Col span="24" class="table-title">用户注册时段统计
      </Col>
    </Row>
    <Row>
      <Col span="24" class="table-bor">
      <div style="height: 300px;width: 100%;padding: 0;margin-top: 20px;" id="register-time"></div>
      </Col>
    </Row>
    <Row>
      <Col span="24" class="table-title">用户注册地区统计
      </Col>
    </Row>
    <Row>
      <Col span="24" class="table-bor">
      <div style="height: 300px;width: 100%;padding: 0;" id="register-area"></div>
      </Col>
    </Row>
    <Row>
      <Col span="12" class="table-title">用户当前版本统计
      </Col>
    </Row>
    <Row>
      <Col span="12" class="table-bor" style="margin-bottom: 20px;">
      <div style="height: 300px;width: 100%;padding: 0;font-size: 16px;text-align: center;" v-if='loading'>加载中...</div>
      <div style="height: 300px;width: 100%;padding: 0;" v-else id="register-version"></div>
      </Col>
    </Row>
  </div>
</template>

<script>
  import { getRegisterUserToHour, getRegisterUserAsync, getRegistArea } from '../../api/api'
  export default {
    data() {
      return {
        begintime: '',
        endtime: '',
        register_time_date: [],
        register_time_num: [],
        register_version_date: [],
        register_version: [],
        register_area_date: [],
        register_area_num: [],
        loading:true,
        timeInput: "",
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
      seachRegister() {
        if(this.timeInput[0] == null || this.timeInput[1] == null){
          this.timeInput = ""
        }
        this.register_time_date= [];
        this.register_time_num=[];
        this.register_version_date=[];
        this.register_version=[];
        this.register_area_date=[];
        this.register_area_num=[];

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

        /*var now_time = new Date();
        if(this.endtime > now_time) {
          this.$Message.info('结束时间不能大于当前日期!')
          return
        }
        if(this.begintime > this.endtime) {
          this.$Message.info('结束时间需大于开始时间!')
          return
        }*/
        var begin = new Date(this.begintime);
        this.begintime = begin.getFullYear() + '-' + (begin.getMonth() + 1) + '-' + begin.getDate();
        var end = new Date(this.endtime);
        this.endtime = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate();
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
        this.getResiterHour();
        this.getResiterVersion();
        this.getRegistArea();
      },
      //用户分析->注册用户分析->用户注册时段统计
      getResiterHour() {
        getRegisterUserToHour({
          start_time: this.begintime,
          end_time: this.endtime
        }).then(res => {
          res.result.reverse().forEach((item, index) => {
            this.register_time_date.push(item.hour)
            this.register_time_num.push(item.count)
          })
          this.draWbatter();
        })
      },
      //用户分析->注册用户分析->用户当前版本统计
      getResiterVersion() {
        getRegisterUserAsync({
          start_time: this.begintime,
          end_time: this.endtime
        }).then(res => {
          res.result.forEach((item, index) => {
            this.register_time_date.push(item.cur_version)
            this.register_version.push({
              'value': item.count,
              'name': item.cur_version
            })
          })
          this.draWversion();
        })
      },
      //用户分析->注册用户分析->用户注册地区统计
      getRegistArea() {
        getRegistArea({
          start_time: this.begintime,
          end_time: this.endtime
        }).then(res => {
          res.result.data.forEach((item, index) => {
            this.register_area_num.push(item.value)
            this.register_area_date.push(item.name)
          })
          /*console.log(this.register_area_num)
          console.log(this.register_area_date)*/
          this.draWcity()
        })
      },
      //时段统计图
      draWbatter() {
        var myChart = this.$echarts.init(document.getElementById('register-time'));
        var colors = ['#5793f3', '#d14a61', '#675bba'];
        myChart.setOption({
          color: colors,
          tooltip: {
           trigger: 'axis',
           axisPointer: {
           type: 'line'
           }
          },
          legend: {
            data: ['人数']
          },
          grid: {
            top: 30,
            bottom: 50,
            left: 60,
            right: 50
          },
          xAxis: [{
            type: 'category',
            name:"时",
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
            data: this.register_time_date,
            splitLine: {
              show: true,
              lineStyle: {
                color: '#f5f7f9'
              }
            }
          }],
          yAxis: [{
            type: 'value',
            name:"人数",
            splitLine: {
              show: true,
              lineStyle: {
                color: '#f5f7f9'
              }
            }
          }],
          series: [{
            /*name: '人数',*/
            type: 'line',
            smooth: true,
            symbol: 'circle', //拐点样式
            symbolSize: 10, //拐点大小
            data: this.register_time_num,
            itemStyle: {
              normal: {
                areaStyle: {
                  //                  type: 'default',
                  /*color: ['rgba(87,182,99,1)', 'rgba(87,182,99,0.1)']*/
                  /*color: ['rgba(56, 153, 254, 1)', 'rgba(56, 153, 254, 0.1)']*/
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
      //版本统计图
      draWversion() {
        var myChart = this.$echarts.init(document.getElementById('register-version'));
        myChart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            left: 'center',
            data: this.register_version_date
          },
          series: [{
            name: '版本',
            type: 'pie',
            radius: '70%',
            center: ['50%', '60%'],
            data: this.register_version,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }],
          /*color: ['rgba(255,0,0,0.5)', '#57b663', 'orange', 'rgba(0,0,0,0.3)']*/
          /*color: ['#11fe8a', '#ffce44','rgb(56, 153, 254)', '#ff3928']*/
          color: ['#7FFF00','rgb(56, 153, 254)','#E3A83F',  '#32CD99','#ff9d37','#9d37ff','#ff2693','#FF7F00','#85fe11','#8a11ff','#11ff8a','#fe8a11','#fe1185']
        })
      },
      //地区统计图
      draWcity() {
        var myChart = this.$echarts.init(document.getElementById('register-area'));
        myChart.setOption({
          /*color: ['#57b663'],*/
          color: ['rgb(56, 153, 254)'],
          tooltip: {
            trigger: 'axis',
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            name:"地区",
            data: this.register_area_date,
            axisTick: {
              alignWithLabel: true
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#f5f7f9'
              }
            }
          }],
          yAxis: [{
            type: 'value',
            name:"人数",
            splitLine: {
              show: true,
              lineStyle: {
                color: '#f5f7f9'
              }
            }
          }],
          series: [{
            name: '人数',
            type: 'bar',
            barWidth: '60%',
            data: this.register_area_num
          }]
        })
      },

    },
    mounted() {
      var setime = new Date()
      this.endtime = setime.getFullYear() + '-' + (setime.getMonth() + 1) + '-' + setime.getDate()
      var oneweekdate = new Date(setime - 7 * 24 * 3600 * 1000);
      this.begintime = oneweekdate.getFullYear() + '-' + (oneweekdate.getMonth() + 1) + '-' + oneweekdate.getDate()
      this.getResiterHour();
      this.getResiterVersion();
      this.getRegistArea();
      this.loading=false;
      this.$store.state.modalStatus = true
      this.$store.state.behaviorStatus = false
    }
  }
</script>

<style scoped>
.table-title {
  margin-top: 10px;
}
</style>
