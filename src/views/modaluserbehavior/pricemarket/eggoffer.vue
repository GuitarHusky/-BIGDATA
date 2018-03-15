<template>
  <div class="pad">
    <Row>
      <Col span="24" class="table-title" style="font-size:18px;">基本指标</Col>
    </Row>
    <Row>
      <router-link tag='div' to='/modaluser/eggofferdetail'>
        <Col class="trend-col" span="6">
        <div style="font-size: 16px;" v-if='user_total'>
          加载中...
        </div>
        <div v-else>
          <span>鸡蛋报价总人数</span></br>
          <span class='date-num'>{{eggoffertotal}}</span></br>
        </div>
        </Col>
      </router-link>
    </Row>
    <div class="trend-bottom">
      <Row>
        <Col span="24" class="table-title  titleStyle">
        <span  style="font-size:16px;">鸡蛋报价人数趋势图</span>
        <DatePicker type="daterange" :options="options2" placement="bottom" v-model="timeInput1" confirm format="yyyy-MM-dd"  placeholder="请选择时间段" style="width: 200px;font-size:14px;margin-left:70px;"></DatePicker>
        <Button type="primary" @click="searchEggOfferchartData" id="search">搜索</Button>
        </Col>
      </Row>
      <Row>
        <Col span="24" class="table-bor">
        <div style="font-size: 16px;" v-show="chart_load">
          加载中...
        </div>
        <div style="height: 300px; width: 100%;" id="eggofferchart"></div>
        </Col>
      </Row>
    </div>
    <Row style="margin-top:20px;">
      <Col span="24">
      <div class="table-title tableStyle">
        <span>鸡蛋报价详情</span>
        <i-input placeholder="这里输入正确的手机号" v-model='phone_number' style="width: 200px;margin: 0 20px 0 40px;"></i-input>
        <DatePicker type="daterange" :options="options2" placement="bottom" v-model="timeInput2" confirm format="yyyy-MM-dd"  placeholder="请选择时间段" style="width: 200px;font-size:14px;margin-left:30px;"></DatePicker>
        <Button type="primary" @click="searchEggOfferListData" id="search">搜索</Button>
      </div>
      <i-table :columns="historyColumns" :data="historyData" size="large"></i-table>
      </Col>
    </Row>
    <div style="margin: 10px 10% 20px 0;overflow: hidden">
      <div style="float: right;">
       <Page :total="dataCount" :page-size="PageSize" show-total :current.sync="hello_curr" class="paging" @on-change="changepage" show-elevator></Page>
      </div>
    </div>
  </div>
</template>
<script>
  import { getEggOfferChart,telSearchEggPrice } from '../../../api/api'
  export default {
    data(){
      return {
        chart_load: true,
        eggoffertotal: '',
        user_total: true,
        hello_curr: 1,
        PageSize: 20,
        eggoffernum: [],
        eggoffertime: [],
                user_total: true,
        // 初始化信息总条数
        dataCount: 0,
        // 每页显示多少条
        pageSize: 20,
        historyColumns: [{
            title: '序号',
            key: 'numid',
            align: "center"
          }, {
            title: '用户名称',
            key: 'BaseNum',
            align: "center"
          },
          {
            title: '注册手机号',
            key: 'mobile_phone',
            align: "center"
          },
          {
            title: '手机号归属地',
            key: 'gsd',
            sortable: true,
            align: "center"
          },
          {
            title: '报价地区',
            key: 'Province',
            sortable: true,
            align: "center"
          },
          {
            title: '鸡蛋报价',
            key: 'EggSalePrice',
            sortable: true,
            align: "center"
          },
          {
            title: '报价时间',
            key: 'AddTime',
            align: "center"
          },
          {
            title: '填写时间',
            key: 'create_time',
            width:180,
            align: "center"
          }
        ],
        historyData: [],
        phone_number: '',
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
      begintime1: '',
      endtime1: '',
      begintime2: '',
      endtime2: '',
      timeInput1: '',
      timeInput2: '',
      }
    },
    methods:{
      getEggOfferTotal(){
        telSearchEggPrice({
          tel: '',
          type: 6,
          star_time: '',
          end_time: '',
          c_page: 1
        }).then(res => {
          this.eggoffertotal = res.data.list.count;
          this.user_total = false
        })
        /*EggPriceList().then(res => {
          this.eggoffertotal = res.data.total_egg_price.count
        })*/
      },
      getEggOfferList(){
        telSearchEggPrice({
          tel: this.phone_number,
          type: 6,
          star_time: '',
          end_time: '',
          c_page: 1
        }).then(res => {
          this.historyData = res.data.list.list;
          this.dataCount = res.data.list.count;
          var i = 1;
          this.historyData.forEach((item, index) => {
            item.Province = item.Province + item.City+item.County
            item['numid'] = i++
          })
        })
        document.getElementsByClassName("pad")[0].scrollTop = 0;
      },
      geteggofferchartdata(){
        var setime = new Date();
        this.endtime1 = setime.getFullYear() + '-' + (setime.getMonth() + 1) + '-' + setime.getDate()
        var oneweekdate = new Date(setime - 7* 24 * 3600 * 1000);
        this.begintime1 = oneweekdate.getFullYear() + '-' + (oneweekdate.getMonth() + 1) + '-' + oneweekdate.getDate()
        getEggOfferChart({
          star_time: this.begintime1,
          end_time: this.endtime1
        }).then(res => {
          res.data.list.forEach((item,index) => {
            this.eggoffernum.push(item.value)
            this.eggoffertime.push(item.date)
          })
          this.chart_load = false
          this.drawEggOffer();
        })
       },
       searchEggOfferListData(){
        if(this.timeInput2[0] == null || this.timeInput2[1] == null){
          this.timeInput2 = ""
        }
        var begin = new Date(this.timeInput2[0])
        this.begintime2 = begin.getFullYear() + '-' + (begin.getMonth() + 1) + '-' + begin.getDate()
        var end = new Date(this.timeInput2[1])
        this.endtime2 = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()
        var now_time = new Date();
        if(this.endtime2 > now_time) {
          this.$Message.info('结束时间不能大于当前日期!')
          return
        }
        if(this.begintime2 > this.endtime2) {
          this.$Message.info('结束时间需大于开始时间!')
          return
        }
        //        if(this.begintime2 == '' || this.endtime2 == "") {
        //          this.$Message.info('请输入搜素时间!')
        //          return
        //        }
        /*var setime = new Date(this.begintime2)
        this.begintime2 = setime.getFullYear() + '-' + (setime.getMonth() + 1) + '-' + setime.getDate()
        var endtime2s = new Date(this.endtime2)
        this.endtime2 = endtime2s.getFullYear() + '-' + (endtime2s.getMonth() + 1) + '-' + endtime2s.getDate()*/
        /*this.begintime2 = this.timeInput2[0].getFullYear() + '-' + (this.timeInput2[0].getMonth() + 1) + '-' + this.timeInput2[0].getDate()
        this.endtime2 = this.timeInput2[1].getFullYear() + '-' + (this.timeInput2[1].getMonth() + 1) + '-' + this.timeInput2[1].getDate()*/
        if(this.begintime2 == 'NaN-NaN-NaN') {
          this.begintime2 = ''
        }
        if(this.endtime2 == 'NaN-NaN-NaN') {
          this.endtime2 = ''
        }
        telSearchEggPrice({
          tel: this.phone_number,
          type: 6,
          star_time: this.begintime2,
          end_time: this.endtime2,
          c_page: 1
        }).then(res => {
          this.hello_curr = 1
          this.historyData = res.data.list.list;
          this.dataCount = res.data.list.count;
          var i = 1;
          this.historyData.forEach((item, index) => {
            item.Province = item.Province + item.City+item.County
            item['numid'] = i++
          })
        })
       },
      searchEggOfferchartData(){
        this.hello_curr = 1;
        this.eggoffernum = []
        this.eggoffertime = []
        if(this.timeInput1.length){
            document.getElementById("search").disabled = true;
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
            var begin = new Date(this.timeInput1[0])
            this.begintime1 = begin.getFullYear() + '-' + (begin.getMonth() + 1) + '-' + begin.getDate()
            var end = new Date(this.timeInput1[1])
            this.endtime1 = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()

            if(this.begintime1 == 'NaN-NaN-NaN') {
              this.begintime = ''
            }
            if(this.endtime1 == 'NaN-NaN-NaN') {
              this.endtime = ''
            }
        }
        getEggOfferChart({
          star_time: this.begintime1,
          end_time: this.endtime1
        }).then(res => {
          res.data.list.forEach((item,index) => {
            this.eggoffernum.push(item.value)
            this.eggoffertime.push(item.date)
          })
          document.getElementById("search").disabled = false
          this.chart_load = false
          this.drawEggOffer();
        })
       },

       drawEggOffer() {
        var myChart = this.$echarts.init(document.getElementById('eggofferchart'));
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
            data: this.eggoffertime.reverse(),
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
            name: '鸡蛋报价人数',
            type: 'line',
            data: this.eggoffernum.reverse(),
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
       changepage(index) {
        telSearchEggPrice({
          tel: this.phone_number,
          type: 6,
          star_time: this.begintime2,
          end_time: this.endtime2,
          c_page: index
        }).then(res => {
          this.historyData = res.data.list.list;
          this.dataCount = res.data.list.count;
          var i = 1;
          this.historyData.forEach((item, index) => {
            item.Province = item.Province + item.City+item.County
            item['numid'] = i++
          })
        })
        document.getElementsByClassName("pad")[0].scrollTop = 0;
      },

    },
    mounted(){
      this.geteggofferchartdata()
      this.getEggOfferTotal()
      this.getEggOfferList()
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
