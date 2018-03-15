<template>
 <div class="pad">
    <div class="trend-bottom" style="margin-top:20px;">
      <Row>
        <Col span="24" class="table-title  titleStyle">
        <span  style="font-size:16px;">鸡蛋报价时间统计</span>
        <DatePicker type="daterange" :options="options2" placement="bottom-start" v-model="timeInput" confirm format="yyyy-MM-dd"  placeholder="请选择数据时间段" style="width: 200px;font-size:14px;margin-left:70px;"></DatePicker>
        <Button type="primary" @click="searchData" id="search">搜索</Button>
        </Col>
      </Row>
      <Row>
        <Col span="24" class="table-bor">
        <div style="font-size: 16px;" v-show="chart_load">
          加载中...
        </div>
        <div style="height: 300px; width: 100%;" id="eggofferTime"></div>
        </Col>
      </Row>
    </div>
    <div class="trend-bottom" style="margin-top:20px;">
      <Row>
        <Col span="24" class="table-title  titleStyle">
        <span  style="font-size:16px;">鸡蛋报价地区统计</span>
        </Col>
      </Row>
      <Row>
        <Col span="24" class="table-bor">
        <div style="font-size: 16px;" v-show="chart_load">
          加载中...
        </div>
        <div style="height: 300px; width: 100%;" id="eggofferArea"></div>
        </Col>
      </Row>
    </div>
    <div class="trend-bottom" style="margin-top:20px;">
      <Row>
        <Col span="24" class="table-title  titleStyle">
        <span  style="font-size:16px;">原料报价时间统计</span>
        </Col>
      </Row>
      <Row>
        <Col span="24" class="table-bor">
        <div style="font-size: 16px;" v-show="chart_load">
          加载中...
        </div>
        <div style="height: 300px; width: 100%;" id="materialofferTime"></div>
        </Col>
      </Row>
    </div>
    <div class="trend-bottom" style="margin-top:20px;">
      <Row>
        <Col span="24" class="table-title  titleStyle">
        <span  style="font-size:16px;">原料报价地区统计</span>
        </Col>
      </Row>
      <Row>
        <Col span="24" class="table-bor">
        <div style="font-size: 16px;" v-show="chart_load">
          加载中...
        </div>
        <div style="height: 300px; width: 100%;" id="materialofferArea"></div>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
  import {getPriceAnaylseData} from '../../../api/api'
  export default{
    data(){
      return{
        timeInput: '',
        begintime: '',
        endtime: '',
        chart_load: true,
        eggofferTimetime: [],
        eggofferTimenum: [],
        eggofferAreaProvince: [],
        eggofferAreanum: [],
        materialofferTimetime: [],
        materialofferTimenum: [],
        materialofferAreanum: [],
        materialofferAreaProvince: [],
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
       searchData(){
        this.searchEggOfferTimeData()
        this.searchEggOfferAreaData()
        this.searchmaterialOfferAreaData()
        this.searchmaterialOfferTimeData()
       },
       /*获取鸡蛋报价时段数据*/
      geteggofferTimeData(){
        var setime = new Date();
        this.endtime = setime.getFullYear() + '-' + (setime.getMonth() + 1) + '-' + setime.getDate()
        var oneweekdate = new Date(setime - 6* 24 * 3600 * 1000);
        this.begintime = oneweekdate.getFullYear() + '-' + (oneweekdate.getMonth() + 1) + '-' + oneweekdate.getDate()
        getPriceAnaylseData({
          star_time: this.begintime,
          end_time: this.endtime,
          type: 1
        }).then(res => {
          res.data.list.forEach((item,index) => {
            this.eggofferTimenum.push(item.value)
            this.eggofferTimetime.push(item.name+"时")
          })
          this.chart_load = false
          this.draweggoffertime();
        })
       },
       searchEggOfferTimeData(){
        this.eggofferTimenum = []
        this.eggofferTimetime = []
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
            var month1 = (begin.getMonth() + 1)>=10?(begin.getMonth() + 1):"0"+(begin.getMonth() + 1)
            var day1 = begin.getDate()>=10?begin.getDate():"0"+begin.getDate()
            this.begintime = begin.getFullYear() + '-' + month1 + '-' + day1
            var end = new Date(this.timeInput[1])
            var month2 = (end.getMonth() + 1)>=10?(end.getMonth() + 1):"0"+(end.getMonth() + 1)
            var day2 = end.getDate()>=10?end.getDate():"0"+end.getDate()
            this.endtime = end.getFullYear() + '-' + month2 + '-' + day2

            if(this.begintime == 'NaN-NaN-NaN') {
              this.begintime = ''
            }
            if(this.endtime == 'NaN-NaN-NaN') {
              this.endtime = ''
            }
        }
        getPriceAnaylseData({
          star_time: this.begintime,
          end_time: this.endtime,
          type: 1
        }).then(res => {
          res.data.list.forEach((item,index) => {
            this.eggofferTimenum.push(item.value)
            this.eggofferTimetime.push(item.name+"时")
          })
          document.getElementById("search").disabled = false;
          this.chart_load = false
          this.draweggoffertime();
        })
       },

        /*获取鸡蛋报价地区数据*/
        geteggofferAreaData(){
        var setime = new Date();
        this.endtime = setime.getFullYear() + '-' + (setime.getMonth() + 1) + '-' + setime.getDate()
        var oneweekdate = new Date(setime - 6* 24 * 3600 * 1000);
        this.begintime = oneweekdate.getFullYear() + '-' + (oneweekdate.getMonth() + 1) + '-' + oneweekdate.getDate()
        getPriceAnaylseData({
          star_time: this.begintime,
          end_time: this.endtime,
          type: 3
        }).then(res => {
          res.data.list.forEach((item,index) => {
            this.eggofferAreanum.push(item.value)
            this.eggofferAreaProvince.push(item.Province)
          })
          this.chart_load = false
          this.draweggofferarea();
        })
       },
       searchEggOfferAreaData(){
        if(this.timeInput[0] == null || this.timeInput[1] == null){
          this.timeInput = ""
        }
        this.eggofferAreaProvince = []
        this.eggofferAreanum = []
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
            var month1 = (begin.getMonth() + 1)>=10?(begin.getMonth() + 1):"0"+(begin.getMonth() + 1)
            var day1 = begin.getDate()>=10?begin.getDate():"0"+begin.getDate()
            this.begintime = begin.getFullYear() + '-' + month1 + '-' + day1
            var end = new Date(this.timeInput[1])
            var month2 = (end.getMonth() + 1)>=10?(end.getMonth() + 1):"0"+(end.getMonth() + 1)
            var day2 = end.getDate()>=10?end.getDate():"0"+end.getDate()
            this.endtime = end.getFullYear() + '-' + month2 + '-' + day2

            if(this.begintime == 'NaN-NaN-NaN') {
              this.begintime = ''
            }
            if(this.endtime == 'NaN-NaN-NaN') {
              this.endtime = ''
            }
        }
        getPriceAnaylseData({
          star_time: this.begintime,
          end_time: this.endtime,
          type: 3
        }).then(res => {
          res.data.list.forEach((item,index) => {
            this.eggofferAreanum.push(item.value)
            this.eggofferAreaProvince.push(item.Province)
          })
          document.getElementById("search").disabled = false;
          this.chart_load = false
          this.draweggofferarea();
        })
       },
       draweggoffertime() {
        var myChart = this.$echarts.init(document.getElementById('eggofferTime'));
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
            data: this.eggofferTimetime.reverse(),
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
            data: this.eggofferTimenum.reverse(),
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
       draweggofferarea() {
        var myChart = this.$echarts.init(document.getElementById('eggofferArea'));
        myChart.setOption({
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
            data: this.eggofferAreaProvince,
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
            data: this.eggofferAreanum,
            itemStyle: {
                        normal: {
                            label: {
                                /*show: true,
                                position: 'top',*/
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
        })
      },

       /*获取原料报价时段数据*/
      getmaterialofferTimeData(){
        var setime = new Date();
        this.endtime = setime.getFullYear() + '-' + (setime.getMonth() + 1) + '-' + setime.getDate()
        var oneweekdate = new Date(setime - 6* 24 * 3600 * 1000);
        this.begintime = oneweekdate.getFullYear() + '-' + (oneweekdate.getMonth() + 1) + '-' + oneweekdate.getDate()
        getPriceAnaylseData({
          star_time: this.begintime,
          end_time: this.endtime,
          type: 2
        }).then(res => {
          res.data.list.forEach((item,index) => {
            this.materialofferTimenum.push(item.value)
            this.materialofferTimetime.push(item.name+"时")
          })
          console.log(this.materialofferTimenum)
          console.log(this.materialofferTimetime)
          this.chart_load = false
          this.drawmaterialoffertime();
        })
       },
       searchmaterialOfferTimeData(){
        if(this.timeInput[0] == null || this.timeInput[1] == null){
          this.timeInput = ""
        }
        this.materialofferTimenum = []
        this.materialofferTimetime = []
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
            var month1 = (begin.getMonth() + 1)>=10?(begin.getMonth() + 1):"0"+(begin.getMonth() + 1)
            var day1 = begin.getDate()>=10?begin.getDate():"0"+begin.getDate()
            this.begintime = begin.getFullYear() + '-' + month1 + '-' + day1
            var end = new Date(this.timeInput[1])
            var month2 = (end.getMonth() + 1)>=10?(end.getMonth() + 1):"0"+(end.getMonth() + 1)
            var day2 = end.getDate()>=10?end.getDate():"0"+end.getDate()
            this.endtime = end.getFullYear() + '-' + month2 + '-' + day2

            if(this.begintime == 'NaN-NaN-NaN') {
              this.begintime = ''
            }
            if(this.endtime == 'NaN-NaN-NaN') {
              this.endtime = ''
            }
        }
        getPriceAnaylseData({
          star_time: this.begintime,
          end_time: this.endtime,
          type: 2
        }).then(res => {
          res.data.list.forEach((item,index) => {
            this.materialofferTimenum.push(item.value)
            this.materialofferTimetime.push(item.name+"时")
          })
          document.getElementById("search").disabled = false;
          this.chart_load = false
          this.drawmaterialoffertime();
        })
       },

        /*获取原料报价地区数据*/
        getmaterialofferAreaData(){
        var setime = new Date();
        this.endtime = setime.getFullYear() + '-' + (setime.getMonth() + 1) + '-' + setime.getDate()
        var oneweekdate = new Date(setime - 6* 24 * 3600 * 1000);
        this.begintime = oneweekdate.getFullYear() + '-' + (oneweekdate.getMonth() + 1) + '-' + oneweekdate.getDate()
        getPriceAnaylseData({
          star_time: this.begintime,
          end_time: this.endtime,
          type: 4
        }).then(res => {
          res.data.list.forEach((item,index) => {
            this.materialofferAreanum.push(item.value)
            this.materialofferAreaProvince.push(item.Province)
            this.drawmaterialofferarea();
          })
          this.chart_load = false
        })
       },
       searchmaterialOfferAreaData(){
        if(this.timeInput[0] == null || this.timeInput[1] == null){
          this.timeInput = ""
        }
        this.materialofferAreaProvince = []
        this.materialofferAreanum = []
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
            var month1 = (begin.getMonth() + 1)>=10?(begin.getMonth() + 1):"0"+(begin.getMonth() + 1)
            var day1 = begin.getDate()>=10?begin.getDate():"0"+begin.getDate()
            this.begintime = begin.getFullYear() + '-' + month1 + '-' + day1
            var end = new Date(this.timeInput[1])
            var month2 = (end.getMonth() + 1)>=10?(end.getMonth() + 1):"0"+(end.getMonth() + 1)
            var day2 = end.getDate()>=10?end.getDate():"0"+end.getDate()
            this.endtime = end.getFullYear() + '-' + month2 + '-' + day2

            if(this.begintime == 'NaN-NaN-NaN') {
              this.begintime = ''
            }
            if(this.endtime == 'NaN-NaN-NaN') {
              this.endtime = ''
            }
        }
        getPriceAnaylseData({
          star_time: this.begintime,
          end_time: this.endtime,
          type: 4
        }).then(res => {
          res.data.list.forEach((item,index) => {
            this.materialofferAreanum.push(item.value)
            this.materialofferAreaProvince.push(item.Province)
            this.drawmaterialofferarea();
          })
          document.getElementById("search").disabled = false;
          this.chart_load = false

        })
       },
       drawmaterialoffertime() {
        var myChart = this.$echarts.init(document.getElementById('materialofferTime'));
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
            data: this.materialofferTimetime.reverse(),
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
            data: this.materialofferTimenum.reverse(),
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
       drawmaterialofferarea() {
        var myChart = this.$echarts.init(document.getElementById('materialofferArea'));
        myChart.setOption({
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
            data: this.materialofferAreaProvince,
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
            data: this.materialofferAreanum,
            itemStyle: {
                        normal: {
                            label: {
                                /*show: true,
                                position: 'top',*/
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
        })
      },
    },
    mounted(){
      this.geteggofferTimeData()
      this.geteggofferAreaData()
      this.getmaterialofferTimeData()
      this.getmaterialofferAreaData()
    }
  }
</script>
<style scoped>

</style>
