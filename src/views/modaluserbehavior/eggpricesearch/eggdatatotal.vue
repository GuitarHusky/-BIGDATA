<template>
  <div class="pad">
    <Row>
      <Col span="24" class="table-title" style="font-size:18px;">基本指标</Col>
    </Row>
    <Row>
      <router-link tag='div' to='/modaluser/eggpricesearchlist'>
        <Col class="trend-col" span="6">
        <div style="font-size: 16px;" v-if='user_total'>
          加载中...
        </div>
        <div v-else>
          <span>使用搜索次数</span></br>
          <span class='date-num'>{{searchNums}}</span></br>
        </div>
        </Col>
      </router-link>
    </Row>
    <div class="trend-bottom">
      <Row>
        <Col span="24" class="table-title  titleStyle">
        <span  style="font-size:16px;">各省使用搜索次数</span>
        </Col>
      </Row>
      <Row>
        <Col span="24" class="table-bor">
        <div style="font-size: 16px;" v-show="chart_load">
          加载中...
        </div>
        <div style="height: 300px; width: 100%;" id="provinceSearchNum"></div>
        </Col>
      </Row>
    </div>
    <div class="trend-bottom" v-show="cityChartStatus">
      <Row>
        <Col span="24" class="table-bor">
        <div style="font-size: 16px;" v-show="chart_load">
          加载中...
        </div>
        <div style="height: 300px; width: 100%;" id="citySearchChart"></div>
        </Col>
      </Row>
    </div>
    <div class="trend-bottom">
      <Row>
        <Col span="24" class="table-title  titleStyle">
        <span  style="font-size:16px;">每日蛋价预测人数</span>
        <DatePicker type="daterange" :options="options2" placement="bottom" v-model="timeInput" confirm format="yyyy-MM-dd"  placeholder="请选择时间段" style="width: 200px;font-size:14px;margin-left:70px;"></DatePicker>
        <Button type="primary" @click="searchData" id="search">搜索</Button>
        </Col>
      </Row>
      <Row>
        <Col span="24" class="table-bor">
        <div style="font-size: 16px;" v-show="chart_load">
          加载中...
        </div>
        <div style="height: 300px; width: 100%;" id="eggPriceForecast"></div>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
    import axios from 'axios';
    import {getEggPriceSearchData,getPriceSearchChart,getCitySearchChart,getCitySearchInfo,getEggPriceForecastInfo} from '../../../api/api'
    export default {
      data(){
        return {
          searchNums: '',/*省搜索总次数*/
          user_total: true,
          searchProvince: [],  /*省搜素图表省份数据*/
          searchProvinceNum: [],   /*省搜素图表数量数据*/
          searchCity: [],  /*市搜素图表城市数据*/
          searchCityNum: [],   /*市搜素图表数量数据*/
          chart_load: true,
          province: '',
          cityChartStatus: false,
          getEggPriceForecastNum: [],
          getEggPriceForecastTime: [],
          begintime:'',
          endtime:'',
          timeInput:'',
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
        /*获取搜索总次数*/
        geteggpricesearchtotal(){
          getEggPriceSearchData().then(res => {
            this.searchNums = res.data.allNum;
            this.user_total = false
          })
        },
        /*获取省搜索图表数据*/
        getPriceSearchChartData(){
          getPriceSearchChart().then(res => {
            res.data.list.forEach((item,index) => {
              this.searchProvince.push(item.name);
              this.searchProvinceNum.push(item.value);
            })
             this.drawProvince()
          })
          this.chart_load = false
        },
        /*绘制省搜索图表*/
        drawProvince() {
          var that = this
          var myChart = this.$echarts.init(document.getElementById('provinceSearchNum'));
          myChart.on('click', function(pa) {
           that.province = pa.name
           that.cityChartStatus = true
           that.getCitySearchChartData()
          })
          myChart.setOption({
          /*color: ['#57b663'],*/
          color: ['rgb(56, 153, 254)'],
          tooltip: {
            trigger: 'axis',
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
            top:30,
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            name:"省份",
            data: this.searchProvince,
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
            name:"数量",
            splitLine: {
              show: true,
              lineStyle: {
                color: '#f5f7f9'
              }
            }
          }],
          series: [{
            name: '数量',
            type: 'bar',
            barWidth: '60%',
            data: this.searchProvinceNum,
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
          }],
        })
        },
        /*获取市搜索图表数据*/
        getCitySearchChartData(){
         this.searchCity = []
         this.searchCityNum = []
         axios.post('https://data.danjiguanjia.com/api/v1/getEggSearchNumByCity?province='+this.province).then(res => {
            var temparr = null
            res.data.data.list.forEach((item,index) => {
              /*console.log(item.are.length)*/
             /* if(item.are.indexOf(',')){
                temparr = item.are.split(',')
                item.are = temparr[1]
              }*/
              var indexs = item.are.indexOf(',')
              item.are = item.are.substring(indexs+1)
              this.searchCity.push(item.are)
              this.searchCityNum.push(item.value)
              this.chart_load = false
            })
              this.drawCity()
          })
        },
        /*绘制市搜索图表*/
        drawCity() {
          var myChart = this.$echarts.init(document.getElementById('citySearchChart'));
          var that = this
          myChart.on('click', function(pa) {
            that.$router.push('/modaluser/citysearchlist/' + pa.name)
          })
          myChart.setOption({
          color: ['rgb(56, 153, 254)'],
          tooltip: {
            trigger: 'axis',
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
            top:30,
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            name:"城市",
            data: this.searchCity,
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
            name:"数量",
            splitLine: {
              show: true,
              lineStyle: {
                color: '#f5f7f9'
              }
            }
          }],
          series: [{
            name: '数量',
            type: 'bar',
            barWidth: '60%',
            data: this.searchCityNum,
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
          }],
        })
        },
        searchData(){
          if(this.timeInput[0] == null || this.timeInput[1] == null){
          this.timeInput = ""
          }
          this.getEggPriceForecastNum = []
          this.getEggPriceForecastTime = []
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
          getEggPriceForecastInfo({
            star_time: this.begintime,
            end_time: this.endtime,
          }).then(res => {
            res.data.list.forEach((item,index) => {
              this.getEggPriceForecastNum.push(item.value)
              this.getEggPriceForecastTime.push(item.date)
              document.getElementById("search").disabled = false;
            })
            this.chart_load = false
            this.draWEggPriceForecast()
          })
        },
        /*获取每日蛋价预测人数图表数据*/
        getEggPriceForecast(){
          getEggPriceForecastInfo({
            star_time: this.begintime,
            end_time: this.endtime,
          }).then(res => {
            res.data.list.forEach((item,index) => {
              this.getEggPriceForecastNum.push(item.value)
              this.getEggPriceForecastTime.push(item.date)
            })
            this.chart_load = false
            this.draWEggPriceForecast()
          })
        },
        /*绘制每日蛋价预测人数图表*/
        draWEggPriceForecast() {
        var myChart = this.$echarts.init(document.getElementById('eggPriceForecast'));
        var colors = ['#5793f3', '#d14a61', '#675bba'];
        var _this = this;
        myChart.on('click', function(pa) {
          _this.$router.push('/modaluser/eggpriceforecast/' + pa.name)
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
            data: this.getEggPriceForecastTime.reverse(),
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
            name: '蛋价预测人数',
            type: 'line',
            data: this.getEggPriceForecastNum.reverse(),
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
        this.getEggPriceForecast()
        /*this.getCitySearchChartData()*/
        this.geteggpricesearchtotal()
        this.getPriceSearchChartData()
      },
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
