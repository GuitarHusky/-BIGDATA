<template>
 <div class="pad">
    <div class="trend-bottom" style="margin-top:20px;">
      <Row>
        <Col span="24" class="table-title  titleStyle">
        <span  style="font-size:16px;">阅读时段统计</span>
        <DatePicker type="daterange" :options="options2" placement="bottom-start" v-model="timeInput" confirm format="yyyy-MM-dd"  placeholder="请选择时间段" style="width: 200px;font-size:14px;margin-left:70px;"></DatePicker>
        <Button type="primary" @click="searchData" id="search">搜索</Button>
        </Col>
      </Row>
      <Row>
        <Col span="24" class="table-bor">
        <div style="font-size: 16px;" v-show="chart_load">
          加载中...
        </div>
        <div style="height: 300px; width: 100%;" id="readarticleTime"></div>
        </Col>
      </Row>
    </div>
    <div class="trend-bottom" style="margin-top:20px;">
      <Row>
        <Col span="10" class="table-title  titleStyle">
        <span  style="font-size:16px;">阅读模块统计</span>
        </Col>
      </Row>
      <Row>
        <Col span="10" class="table-bor">
        <div style="font-size: 16px;" v-show="chart_load">
          加载中...
        </div>
        <div style="height: 300px; width: 100%;" id="readarticleModule"></div>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
  import {getreadArticleTimeChart,getreadArticleModuleChart} from '../../../api/api'
  export default{
    data(){
      return{
        timeInput: '',
        begintime: '',
        endtime: '',
        chart_load: true,
        readarticleTimeNum: [],
        readarticleTimeHour: [],
        readarticleModuleData: [],
        readarticleModule: [],
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
       /*获取每日分享文章人数数据*/
      getreadArticleTimeData(){
        var setime = new Date();
        this.endtime = setime.getFullYear() + '-' + (setime.getMonth() + 1) + '-' + setime.getDate()
        var oneweekdate = new Date(setime - 6* 24 * 3600 * 1000);
        this.begintime = oneweekdate.getFullYear() + '-' + (oneweekdate.getMonth() + 1) + '-' + oneweekdate.getDate()
        getreadArticleTimeChart({
          start_time: this.begintime,
          end_time: this.endtime
        }).then(res => {
          res.result.data.forEach((item,index) => {
            this.readarticleTimeNum.push(item.value)
            this.readarticleTimeHour.push(item.name+"时")
          })
          this.chart_load = false
          this.drawReadarticleTime();
        })
       },
       searchData(){
        this.searchReadarticleTimeData()
        this.searchReadarticleModuleData()
       },
       searchReadarticleTimeData(){
        if(this.timeInput[0] == null || this.timeInput[1] == null){
          this.timeInput = ""
        }
        this.readarticleTimeNum = []
        this.readarticleTimeHour = []
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
        getreadArticleTimeChart({
          start_time: this.begintime,
          end_time: this.endtime
        }).then(res => {
          res.result.data.forEach((item,index) => {
            this.readarticleTimeNum.push(item.value)
            this.readarticleTimeHour.push(item.name+"时")
          })
          this.chart_load = false
          this.drawReadarticleTime();
        })
       },
       searchReadarticleModuleData(){
        if(this.timeInput[0] == null || this.timeInput[1] == null){
          this.timeInput = ""
        }
        this.readarticleModuleData = []
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
          getreadArticleModuleChart({
          start_time: this.begintime,
          end_time: this.endtime
          }).then(res => {
          res.result.data.forEach((item,index) => {
            this.readarticleModule.push(item.title)
            this.readarticleModuleData.push({
              'value': item.count,
              "name": item.title
            })
          })
          document.getElementById("search").disabled = false;
          this.chart_load = false
          this.drawReadarticleModule();
          })
       },
       drawReadarticleTime() {
        var myChart = this.$echarts.init(document.getElementById('readarticleTime'));
        var colors = ['#5793f3', '#d14a61', '#675bba'];
        var _this = this;
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
            data: this.readarticleTimeHour.reverse(),
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
            name: '人数',
            type: 'line',
            data: this.readarticleTimeNum.reverse(),
            itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                position: 'top',
                                textStyle: {
                                    fontWeight:'bolder',
                                    fontSize : '12',
                                    fontFamily : '微软雅黑',
                                    shadowOffsetY: 50
                                }
                            }
                        }
                    },
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
       drawReadarticleModule() {
        var myChart = this.$echarts.init(document.getElementById('readarticleModule'));
          myChart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          grid: {
            top: 50,
            bottom: 50,
            left: 60,
            right: 50
          },
          series: [{
            name: '模块',
            type: 'pie',
            radius: '70%',
            center: ['50%', '60%'],
            data: this.readarticleModuleData,
            itemStyle: {
               normal: {
                            label: {
                                show: true,
                                position: 'top',
                                formatter: '{b}:{c}\n({d}%)',
                                textStyle: {
                                    fontWeight:'bolder',
                                    fontSize : '12',
                                    fontFamily : '微软雅黑',
                                    shadowOffsetY: 50
                                }
                            }
                        }
            }
          }],
          color: ['#336cda','rgb(56, 153, 254)', '#E3A83F', '#32CD99','#ff9d37','#4277cb','#ff2693','#FF7F00','#85fe11','#8a11ff','#11ff8a','#fe8a11','#fe1185']
        })
      },
    },
    mounted(){
      this.getreadArticleTimeData()
      this.searchReadarticleModuleData()
    }
  }
</script>
<style scoped>

</style>
