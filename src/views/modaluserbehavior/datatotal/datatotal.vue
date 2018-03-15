<template>
  <div class="pad">
    <Row>
      <Col span="24" class="table-title" style="font-size:18px;">基本指标</Col>
    </Row>
    <Row>
      <router-link tag='div' to='/modaluser/allprodnum'>
        <Col class="trend-col" span="6" offset="2">
        <div style="font-size: 16px;" v-if='user_total'>
          加载中...
        </div>
        <div v-else>
          <span>总的录入生产数据的次数</span></br>
          <span class='date-num'>{{allprod}}</span></br>
        </div>
        </Col>
      </router-link>
      <router-link tag='div' to='/modaluser/allcostnum'>
        <Col class="trend-col" span="6" offset="2">
        <div style="font-size: 16px;" v-if='user_total'>
          加载中...
        </div>
        <div v-else>
          <span>总的录入成本数据的次数</span></br>
          <span class='date-num'>{{allcost}}</span></br>
        </div>
        </Col>
      </router-link>
      <router-link tag='div' to='/modaluser/yesprodnum'>
        <Col class="trend-col" span="6" offset="2">
        <div style="font-size: 16px;" v-if='user_total'>
          加载中...
        </div>
        <div v-else>
          <span>昨日录入生产数据的次数</span></br>
          <span class='date-num'>{{yesprod}}</span></br>
        </div>
        </Col>
      </router-link>
      <router-link tag='div' to='/modaluser/yescostnum'>
        <Col class="trend-col" span="6" offset="2">
        <div style="font-size: 16px;" v-if='user_total'>
          加载中...
        </div>
        <div v-else>
          <span>昨日录入成本数据的次数</span></br>
          <span class='date-num'>{{yescost}}</span></br>
        </div>
        </Col>
      </router-link>
      <router-link tag='div' to='/modaluser/yessmallprodnum'>
        <Col class="trend-col" span="6" offset="2">
        <div style="font-size: 16px;" v-if='user_total'>
          加载中...
        </div>
        <div v-else>
          <span>昨日录入育雏鸡生产数据次数</span></br>
          <span class='date-num'>{{yessmallJprod}}</span></br>
        </div>
        </Col>
      </router-link>
      <router-link tag='div' to='/modaluser/yessmallcostnum'>
        <Col class="trend-col" span="6" offset="2">
        <div style="font-size: 16px;" v-if='user_total'>
          加载中...
        </div>
        <div v-else>
          <span>昨日录入育雏鸡成本数据次数</span></br>
          <span class='date-num'>{{yessmallJCost}}</span></br>
        </div>
        </Col>
      </router-link>
      <router-link tag='div' to='/modaluser/yesbigprodnum'>
        <Col class="trend-col" span="6" offset="2">
        <div style="font-size: 16px;" v-if='user_total'>
          加载中...
        </div>
        <div v-else>
          <span>昨日录入育成鸡生产数据次数</span></br>
          <span class='date-num'>{{yesbigJprod}}</span></br>
        </div>
        </Col>
      </router-link>
      <router-link tag='div' to='/modaluser/yesbigcostnum'>
        <Col class="trend-col" span="6" offset="2">
        <div style="font-size: 16px;" v-if='user_total'>
          加载中...
        </div>
        <div v-else>
          <span>昨日录入育成鸡成本数据次数</span></br>
          <span class='date-num'>{{yesbigJCost}}</span></br>
        </div>
        </Col>
      </router-link>
      <router-link tag='div' to='/modaluser/yescdjprodnum'>
        <Col class="trend-col" span="6" offset="2">
        <div style="font-size: 16px;" v-if='user_total'>
          加载中...
        </div>
        <div v-else>
          <span>昨日录入产蛋鸡生产数据次数</span></br>
          <span class='date-num'>{{yeseggJprod}}</span></br>
        </div>
        </Col>
      </router-link>
      <router-link tag='div' to='/modaluser/yescdjcostnum'>
        <Col class="trend-col" span="6" offset="2">
        <div style="font-size: 16px;" v-if='user_total'>
          加载中...
        </div>
        <div v-else>
          <span>昨日录入产蛋鸡成本数据次数</span></br>
          <span class='date-num'>{{yeseggJCost}}</span></br>
        </div>
        </Col>
      </router-link>
      <router-link tag='div' to='/modaluser/allbatch'>
        <Col class="trend-col" span="6" offset="2">
        <div style="font-size: 16px;" v-if='user_total'>
          加载中...
        </div>
        <div v-else>
          <span>建立批次及栋舍总次数</span></br>
          <span class='date-num'>{{batchtotal}}</span></br>
        </div>
        </Col>
      </router-link>
      <router-link tag='div' to='/modaluser/yesallbatch'>
        <Col class="trend-col" span="6" offset="2">
        <div style="font-size: 16px;" v-if='user_total'>
          加载中...
        </div>
        <div v-else>
          <span>昨日建立批次及栋舍数据的次数</span></br>
          <span class='date-num'>{{yesbatchtotal}}</span></br>
        </div>
        </Col>
      </router-link>
      <router-link tag='div' to='/modaluser/allprodusers'>
        <Col class="trend-col" span="6" offset="2">
        <div style="font-size: 16px;" v-if='user_total'>
          加载中...
        </div>
        <div v-else>
          <span>总的录入生产数据的用户数</span></br>
          <span class='date-num'>{{allproduser}}</span></br>
        </div>
        </Col>
      </router-link>
      <router-link tag='div' to='/modaluser/allcostusers'>
        <Col class="trend-col" span="6" offset="2">
        <div style="font-size: 16px;" v-if='user_total'>
          加载中...
        </div>
        <div v-else>
          <span>总的录入成本数据的用户数</span></br>
          <span class='date-num'>{{allconstuser}}</span></br>
        </div>
        </Col>
      </router-link>
      <router-link tag='div' to='/modaluser/allbatchlist'>
        <Col class="trend-col" span="6" offset="2">
        <div style="font-size: 16px;" v-if='user_total'>
          加载中...
        </div>
        <div v-else>
          <span>鸡场总数</span></br>
          <span class='date-num'>{{allbatch}}</span></br>
        </div>
        </Col>
      </router-link>
    </Row>
   <!--  <div class="trend-bottom">
     <Row>
       <Col span="24" class="table-title  titleStyle">
       <span  style="font-size:16px;">每日录入生产效益(旧版)</span>
       <span style="font-size:16px;margin-left:40px ;">请选择时间段 : </span>
        <DatePicker type="daterange" :options="options2" placement="bottom" v-model="timeInputfirst" confirm format="yyyy-MM-dd"  style="width: 200px;font-size:14px;"></DatePicker>
       <Button style="background:rgb(56, 153, 254);color: #FFFFFF;margin: 0 20px;" id="search1" @click="searchOldProd">搜索</Button>
       </Col>
     </Row>
     <Row>
       <Col span="24" class="table-bor">
       <div style="height: 300px; width: 100%;" id="OldProdChart"></div>
       </Col>
     </Row>
   </div> -->
     <div class="trend-bottom" style="margin-top:20px;">
      <Row>
        <Col span="24" class="table-title  titleStyle">
        <span  style="font-size:16px;">每日录入生产效益(新版)</span>
        <span style="font-size:16px;margin-left:40px ;">请选择时间段 : </span>
         <DatePicker type="daterange" :options="options2" placement="bottom" v-model="timeInputtwo" confirm format="yyyy-MM-dd"  style="width: 200px;font-size:14px;"></DatePicker>
        <Button style="background:rgb(56, 153, 254);color: #FFFFFF;margin: 0 20px;" id="search2" @click="searchNewProd">搜索</Button>
        </Col>
      </Row>
      <Row>
        <Col span="24" class="table-bor">
        <div style="height: 300px; width: 100%;" id="NewProdChart"></div>
        </Col>
      </Row>
    </div>
    <div class="trend-bottom" style="margin-top:20px;">
      <Row>
        <Col span="24" class="table-title  titleStyle">
        <span  style="font-size:16px;">每日录入成本数据(新版)</span>
        <span style="font-size:16px;margin-left:40px ;">请选择时间段 : </span>
         <DatePicker type="daterange" :options="options2" placement="bottom" v-model="timeInputthree" confirm format="yyyy-MM-dd"  style="width: 200px;font-size:14px;"></DatePicker>
        <Button style="background:rgb(56, 153, 254);color: #FFFFFF;margin: 0 20px;" id="search3" @click="searchNewCost">搜索</Button>
        </Col>
      </Row>
      <Row>
        <Col span="24" class="table-bor">
        <div style="height: 300px; width: 100%;" id="NewCostChart"></div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
  import { getAllCostInfo, getAllProdInfo,getYesBroodInfo,getYesBroodNumByChicken,getYesBroodListByChicken,getAllAndYesBatchInfo,getBroodByUser,getProdByTime,getCostByTime,getOldProdByTime,getAllBatchNum} from '../../../api/api'
  export default {
    data() {
      return {
        allprod: '', //总录入生产数据次数
        allcost: "", //总录入成本数据次数
        yesprod: '', //昨日录入生产数据次数
        yescost: '', //昨日录入成本数据次数
        yessmallJprod: '', //昨日录入幼雏鸡生产数据次数
        yessmallJCost: '', //昨日录入幼雏鸡成本数据次数
        yesbigJprod: '', //昨日录入育成鸡生产数据次数
        yesbigJCost: '', //昨日录入育成鸡成本数据次数
        yeseggJprod: '', //昨日录入产蛋鸡生产数据次数
        yeseggJCost: '', //昨日录入产蛋鸡成本数据次数
        batchtotal: '', //建立批次及栋舍总次数
        yesbatchtotal: '', //昨日建立批次及栋舍总次数
        allproduser: '', //总录入生产数据用户数
        allconstuser: '', //总录入成本数据用户数
        allbatch:'',  //鸡场总数
        begintime: '',
        endtime: '',
        OldProdNum: [], //每日录入生产效益（旧）数量
        OldCostNum: [],//每日录入成本数据（旧）数量
        OldCostTime: [],//每日录入成本数据（旧）数量
        OldProdTime: [], //每日录入生产效益（旧）时间
        NewProdNum: [], //每日录入生产效益（新）数量
        NewProdTime: [], //每日录入生产效益（新）时间
        NewCostNum: [], //每日录入成本数据（新）数量
        NewCostTime: [], //每日录入成本数据（新）时间

        user_total: true,
        timeInputfirst: '',
        timeInputtwo: '',
        timeInputthree: '',
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
      //模块用户行为-》生产效益-》数据统计
      getDataTotal() {
        //总得录入生产数据的次数
        getAllProdInfo().then(res => {
          this.user_total = false;
          this.allprod = res.data.prodNum
        });
        //总得录入成本数据的次数
        getAllCostInfo().then(res => {
          this.user_total = false;
          this.allcost = res.data.costNum
        });
         //昨日录入生产数据的次数
        getYesBroodInfo().then(res => {
          this.user_total = false;
          this.yesprod = res.data.prodNum
          this.yescost = res.data.costNum
        });
        getYesBroodNumByChicken().then(res => {
          this.user_total = false;
          this.yessmallJprod = res.data.ycuj_sc_num
          this.yessmallJCost = res.data.ycuj_cb_num
          this.yesbigJprod = res.data.ycj_sc_num
          this.yesbigJCost = res.data.ycj_cb_num
          this.yeseggJprod = res.data.cdj_sc_num
          this.yeseggJCost = res.data.cdj_cb_num
        })
        getAllAndYesBatchInfo().then(res => {
          this.user_total = false;
          this.batchtotal = res.data.allBatchNum
          this.yesbatchtotal = res.data.allYesBatchNum
        });
        getBroodByUser({
          type: 1
        }).then(res => {
          this.user_total = false;
          this.allproduser = res.data.info.num
          getBroodByUser({
          type: 2
        }).then(res => {
          this.user_total = false;
          this.allproduser += res.data.info.num
        });
        });

        getBroodByUser({
          type: 3
        }).then(res => {
          this.user_total = false;
          this.allconstuser = res.data.info.num
          getBroodByUser({
          type: 4
          }).then(res => {
          this.user_total = false;
          this.allconstuser += res.data.info.num
          });
        });

        getAllBatchNum().then(res => {
          this.allbatch = res.data.totalFarmNum
        });
      },
      getOldProdChart() {
        getOldProdByTime({
          star_time: this.begintime,
          end_time: this.endtime
        }).then(res => {
          /*console.log(res)*/
          res.data.prodList.forEach((item, index) => {
            /*console.log(item)*/
            this.OldProdNum.push(item.value);
            this.OldProdTime.push(item.name);
          })
          this.draWOldProdChart();
        })
      },
      getNewProdChart() {
        getProdByTime({
          star_time: this.begintime,
          end_time: this.endtime
        }).then(res => {
          // console.log(res)
          res.data.list.forEach((item, index) => {
            // console.log(item)
            this.NewProdNum.push(item.value);
            this.NewProdTime.push(item.name);
          })
          this.draWNewProdChart();
        })
      },
      getNewCostChart() {
        getCostByTime({
          star_time: this.begintime,
          end_time: this.endtime
        }).then(res => {
          // console.log(res)
          res.data.list.forEach((item, index) => {
            // console.log(item)
            this.NewCostNum.push(item.value);
            this.NewCostTime.push(item.name);
          })
          this.draWNewCostChart();
        })
      },

      searchOldProd() {
        if(this.timeInputfirst[0] == null || this.timeInputfirst[1] == null){
          this.timeInputfirst = ""
        }
        var now_time = new Date().getTime();
        var beginTime = this.timeInputfirst[0].getTime()
        var endTime = this.timeInputfirst[1].getTime()
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

        var begin = new Date(this.timeInputfirst[0])
        this.begintime = begin.getFullYear() + '-' + (begin.getMonth() + 1) + '-' + begin.getDate()
        var end = new Date(this.timeInputfirst[1])
        this.endtime = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()
        if(this.begintime == 'NaN-NaN-NaN') {
          this.begintime = ''
        }
        if(this.endtime == 'NaN-NaN-NaN') {
          this.endtime = ''
        }
        document.getElementById('search1').disabled=true
        getOldProdByTime({
          star_time: this.begintime,
          end_time: this.endtime
        }).then(res => {
          /*console.log(res)*/
          res.data.prodList.forEach((item, index) => {
            /*console.log(item)*/
            this.OldProdNum.push(item.value);
            this.OldProdTime.push(item.name);
          })
          res.data.costList.forEach((item, index) => {
            /*console.log(item)*/
            this.OldCostNum.push(item.value);
            this.OldCostTime.push(item.name);
          })
          document.getElementById('search1').disabled = false
          this.draWOldProdChart();
        })
       /* console.log(this.begintime)
        console.log(this.endtime)*/
      },
      searchNewProd(){
        if(this.timeInputtwo[0] == null || this.timeInputtwo[1] == null){
          this.timeInputtwo = ""
        }
        var now_time = new Date().getTime();
        var beginTime = this.timeInputtwo[0].getTime()
        var endTime = this.timeInputtwo[1].getTime()
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

        var begin = new Date(this.timeInputtwo[0])
        this.begintime = begin.getFullYear() + '-' + (begin.getMonth() + 1) + '-' + begin.getDate()
        var end = new Date(this.timeInputtwo[1])
        this.endtime = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()
        if(this.begintime == 'NaN-NaN-NaN') {
          this.begintime = ''
        }
        if(this.endtime == 'NaN-NaN-NaN') {
          this.endtime = ''
        }
        this.NewProdNum = [];
        this.NewProdTime = [];
        document.getElementById('search2').disabled = true
        getProdByTime({
          star_time: this.begintime,
          end_time: this.endtime
        }).then(res => {
          // console.log(res)
          res.data.list.forEach((item, index) => {
            // console.log(item)
            this.NewProdNum.push(item.value);
            this.NewProdTime.push(item.name);
          })
           document.getElementById('search2').disabled = false
          this.draWNewProdChart();
        })
        /*console.log(this.begintime)
        console.log(this.endtime)*/
      },
      searchNewCost(){
        if(this.timeInputthree[0] == null || this.timeInputthree[1] == null){
          this.timeInputthree = ""
        }
        var now_time = new Date().getTime();
        var beginTime = this.timeInputthree[0].getTime()
        var endTime = this.timeInputthree[1].getTime()
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

        var begin = new Date(this.timeInputthree[0])
        this.begintime = begin.getFullYear() + '-' + (begin.getMonth() + 1) + '-' + begin.getDate()
        var end = new Date(this.timeInputthree[1])
        this.endtime = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()
        if(this.begintime == 'NaN-NaN-NaN') {
          this.begintime = ''
        }
        if(this.endtime == 'NaN-NaN-NaN') {
          this.endtime = ''
        }
        this.NewCostNum = [];
        this.NewCostTime = [];
        document.getElementById('search3').disabled = true
        getCostByTime({
          star_time: this.begintime,
          end_time: this.endtime
        }).then(res => {
          // console.log(res)
          res.data.list.forEach((item, index) => {
            // console.log(item)
            this.NewCostNum.push(item.value);
            this.NewCostTime.push(item.name);
          })
           document.getElementById('search3').disabled = false
          this.draWNewCostChart();
        })
        /*console.log(this.begintime)
        console.log(this.endtime)*/
      },
      draWOldProdChart() {
        var myChart = this.$echarts.init(document.getElementById('OldProdChart'));
        var colors = ['#5793f3', '#d14a61', '#675bba'];
        var _this = this;
        myChart.on('click', function(pa) {
          _this.$router.push('/modaluser/dayprodoldinfo/' + pa.name + '/' + pa.value)
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
            data: ['录入成本数据','录入生产数据']
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
            data: this.OldProdTime,
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
            name: '录入成本数据',
            type: 'line',
            data: this.OldCostNum,
            markPoint: {
                data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                ]
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
          },{
            name: '录入生产数据',
            type: 'line',
            data: this.OldProdNum,
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
      draWNewProdChart() {
        var myChart = this.$echarts.init(document.getElementById('NewProdChart'));
        var colors = ['#5793f3', '#d14a61', '#675bba'];
        var _this = this;
        myChart.on('click', function(pa) {
          _this.$router.push('/modaluser/dayprodnewinfo/' + pa.name + '/' + pa.value)
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
            data: ['录入生产数据']
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
            data: this.NewProdTime.reverse(),
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
            name: '录入生产数据',
            type: 'line',
            data: this.NewProdNum.reverse(),
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
      draWNewCostChart() {
        var myChart = this.$echarts.init(document.getElementById('NewCostChart'));
        var colors = ['#5793f3', '#d14a61', '#675bba'];
        var _this = this;
        myChart.on('click', function(pa) {
          _this.$router.push('/modaluser/daycostinfo/' + pa.name + '/' + pa.value)
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
            data: ['录入成本数据']
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
            data: this.NewCostTime.reverse(),
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
            name: '录入成本数据',
            type: 'line',
            /*smooth: true,
            symbol: 'circle', //拐点样式
            symbolSize: 10, //拐点大小*/
            data: this.NewCostNum.reverse(),
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
    mounted() {
      var setime = new Date();
      this.endtime = setime.getFullYear() + '-' + (setime.getMonth() + 1) + '-' + setime.getDate()
      var oneweekdate = new Date(setime - 6* 24 * 3600 * 1000);
      this.begintime = oneweekdate.getFullYear() + '-' + (oneweekdate.getMonth() + 1) + '-' + oneweekdate.getDate()
      this.getDataTotal();
      this.getOldProdChart();
      this.getNewProdChart();
      this.getNewCostChart();
      /*console.log(this.OldProdNum)
      console.log(this.OldProdTime)*/
      /*this.getActiveQs();*/
    }
  }
</script>

<style scoped>
  .trend-col {
    text-align: center;
    height: 100px;
    background: rgba(243, 250, 241, 0.1);
    /*border: 1px solid rgb(56, 153, 254);*/
    padding-top: 20px;
    cursor: pointer;
  }

  .trend-col:hover,.trend-col:hover .date-num {
    /*box-shadow: 0 0 30px #57B663, 0 0 50px #CCCCCC inset;
    box-shadow: 0 0 30px rgb(56, 153, 254), 0 0 50px rgb(56, 153, 254);*/
    color: rgb(56, 153, 254);
  }

  .trend-col span:first-child {
    font-size: 16px;
  }

  .date-num {
    /*font-size: 24px;*/
    font-size: 30px;
    width: 100%;
    display: inline-block;
    /* transition: 0.3s; */
  }

  /* .date-num:hover {
    font-size: 30px;
      color: #57B663;
    color: rgb(56, 153, 254);
    margin-top: -10px;
  } */

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
