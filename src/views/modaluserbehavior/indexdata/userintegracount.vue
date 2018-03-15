<template>
  <div class="pad">
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
        <div style="height: 300px; width: 100%;" id="UserIntegraTotalChart"></div>
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
  </div>
</template>
<script>
  import {getUserIntegraTotalInfo} from '../../../api/api'
  export default {
    data (){
      return {
        chart_load: true,
        begintime: '',
        cityChartStatus: false,
        endtime: '',
        integra_num: [], //获取用户积分数
        user_integra_num: [], //获取对应积分人数详情
        user_integra_numdetail: [], //获取对应积分详情
        integra_numdetail: [], //获取对应积分人数详情
      }
    },
    components: {

    },
    mounted() {
      /*var setime = new Date()
      this.endtime = setime.getFullYear() + '-' + (setime.getMonth() + 1) + '-' + setime.getDate()
      var oneweekdate = new Date(setime - 7 * 24 * 3600 * 1000);
      this.begintime = oneweekdate.getFullYear() + '-' + (oneweekdate.getMonth() + 1) + '-' + oneweekdate.getDate()
      this.getUserSignTime();
      this.getUserSignArea();*/
      this.getUserIntegraTotalData()
    },
    methods:{
       /*获取省搜索图表数据*/
        getUserIntegraTotalData(){
          getUserIntegraTotalInfo().then(res => {
            res.data.list.forEach((item,index) => {
              if(parseInt(item.name) > 10000){
                item.name = "10000+"
              }
              this.integra_num.push(item.name);
              this.user_integra_num.push(item.value);
            })
             this.drawUserIntegraTotalChart()
          })
          this.chart_load = false
        },
        /*绘制省搜索图表*/
        drawUserIntegraTotalChart() {
          var that = this
          var myChart = this.$echarts.init(document.getElementById('UserIntegraTotalChart'));
          /*myChart.on('click', function(pa) {
           that.province = pa.name
           that.cityChartStatus = true
           that.getCitySearchChartData()
          })*/
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
            name:"积分数",
            data: this.integra_num,
            axisTick: {
              alignWithLabel: true
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#f5f7f9'
              }
            },
            /*axisLabel: { rotate:50 }*/
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
            data: this.user_integra_num,
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
            res.data.data.list.forEach((item,index) => {
              if(item.are.length > 2){
                this.searchCity.push(item.are.substring(3))
              }else{
                this.searchCity.push(item.are)
              }
              this.searchCityNum.push(item.value)
              this.chart_load = false
              this.drawCity()
            })
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
    }
}
</script>
<style scoped>
 .table-title {
    border-bottom: none;
  }
  .ivu-table-wrapper {
    position: relative;
    border: 0px solid #dddee1;
    border-bottom: 0;
    border-right: 0;
    border-left: 0;
  }
</style>
