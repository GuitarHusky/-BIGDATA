<template>
	<div class="pad">
		<!-- <div class="crumbs_me">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem>活跃度</BreadcrumbItem>
        <BreadcrumbItem to="/activeuser">活跃用户</BreadcrumbItem>
      </Breadcrumb>
    </div> -->
		<Row>
			<Col span="24" class="table-title" style="font-size:18px;">基本指标</Col>
		</Row>
		<Row>
			<router-link tag='div' to='/activetotalpv'>
				<Col class="trend-col" span="6" offset="2">
				<div style="font-size: 16px;" v-if='user_total'>
					加载中...
				</div>
				<div v-else>
					<span>用户活跃总数（pv）</span></br>
					<span class='date-num'>{{user_pv}}</span></br>
				</div>

				</Col>
			</router-link>
			<!--<router-link tag='div' to='/todaydownload'>-->
			<Col class="trend-col" span="6">
			<div style="font-size: 16px;" v-if='user_total'>
				加载中...
			</div>
			<div v-else>
				<span>注册用户活跃总数（uv）</span></br>
				<span class='date-num'>{{register_uv}}</span></br>
			</div>
			</Col>
			<!--</router-link>-->
			<!--<router-link tag='div' to='/yesdownload'>-->
			<Col class="trend-col" span="6">
			<div style="font-size: 16px;" v-if='user_total'>
				加载中...
			</div>
			<div v-else>
				<span>非注册用户活跃总数（uv）</span></br>
				<span class='date-num'>{{nonRegisteredUser_uv}}</span></br>
			</div>
			</Col>
			<!--</router-link>-->
			<Col class="trend-col" span="6">
			</Col>
		</Row>
		<div class="trend-bottom">
			<Row>
				<Col span="24" class="table-title  titleStyle">
				<span  style="font-size:16px;">活跃用户趋势</span>
				<span style="font-size:16px;margin-left:40px ;">请选择时间段 : </span>
				<!-- <DatePicker v-model="begintime" type="date" placeholder="选择开始时间"></DatePicker>
        <span style="font-size:16px;margin-left:40px ;">请选择结束时间 : </span>
        <DatePicker v-model='endtime' type="date" placeholder="选择结束时间"></DatePicker> -->
         <DatePicker type="daterange" :options="options2" placement="bottom" v-model="timeInput" confirm format="yyyy-MM-dd"  style="width: 200px;font-size:14px;"></DatePicker>
				<Button style="background:rgb(56, 153, 254);color: #FFFFFF;margin: 0 20px;" id="search" @click="searchTrend">搜索</Button>
				</Col>
			</Row>
			<Row>
				<Col span="24" class="table-bor">
				<!--<div style="height: 300px; width: 100%;font-size:16px;text-align: center;" v-if="active_table"> 加载中...</div>-->
				<div style="height: 300px; width: 100%;" id="table-active-user"></div>
				</Col>
			</Row>
		</div>
	</div>
</template>

<script>
	import { getBasicIndicators, getActiveUserTrends } from '../../api/api'
	export default {
		data() {
			return {
				user_pv: '', //用户注册总数
				register_uv: "", //注册用户活跃总数
				nonRegisteredUser_uv: '', //非注册用户活跃总数
				begintime: '',
				endtime: '',
				user_qu_count: [], //趋势数据数量
				user_qu_time: [], //趋势数据时间
//				active_table: true,
				user_total: true,
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
			//获取活跃度-》活跃用户-》基本指标数据
			getActiveUser() {
				//				this.$Spin.show()
				getBasicIndicators().then(res => {
					//					this.$Spin.hide()
					this.user_total = false;
					this.user_pv = res.result.user_pv;
					this.register_uv = res.result.register_uv;
					this.nonRegisteredUser_uv = res.result.nonRegisteredUser_uv;
				})
			},
			//活跃度->活跃用户->活跃用户趋势
			getActiveQs() {
				getActiveUserTrends({
					start_time: this.begintime,
					end_time: this.endtime
				}).then(res => {
					res.result.forEach((item, index) => {
						this.user_qu_count.push(item.count);
						this.user_qu_time.push(item.time);
					})
					this.draWbatter();
				})
//				this.active_table = false;
			},
			searchTrend() {
        if(this.timeInput[0] == null || this.timeInput[1] == null){
          this.timeInput = ""
        }
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
				if(this.begintime == '' || this.endtime == "") {
					this.$Message.info('请输入搜素时间!')
					return
				}
				/*var begin = new Date(this.begintime)
				this.begintime = begin.getFullYear() + '-' + (begin.getMonth() + 1) + '-' + begin.getDate()
				var end = new Date(this.endtime)
				this.endtime = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()*/
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
				this.user_qu_count = [];
				this.user_qu_time = [];
				document.getElementById('search').disabled=true
				getActiveUserTrends({
					start_time: this.begintime,
					end_time: this.endtime
				}).then(res => {
					res.result.forEach((item, index) => {
						this.user_qu_count.push(item.count);
						this.user_qu_time.push(item.time);
						document.getElementById('search').disabled=false
					})
					this.draWbatter();
				})
			},
			draWbatter() {
				var myChart = this.$echarts.init(document.getElementById('table-active-user'));
				var colors = ['#5793f3', '#d14a61', '#675bba'];
				var _this = this;
				myChart.on('click', function(pa) {
					_this.$router.push('/activeinfo/' + pa.name + '/' + pa.value)
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
						data: ['活跃用户']
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
						data: this.user_qu_time,
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
						name: '活跃用户',
						type: 'line',
						smooth: true,
            symbol: 'circle', //拐点样式
            symbolSize: 10, //拐点大小
						data: this.user_qu_count,
						itemStyle: {
							normal: {
								areaStyle: {
									type: 'default'
								},
                /*color: 'rgba(138.204,146,0.5)',*/
								color: 'rgb(232,245,253)',
								lineStyle: {
                  /*color: 'rgba(138.204,146,0.5)'*/
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
			var oneweekdate = new Date(setime - 7 * 24 * 3600 * 1000);
			this.begintime = oneweekdate.getFullYear() + '-' + (oneweekdate.getMonth() + 1) + '-' + oneweekdate.getDate()
			this.getActiveUser();
			this.getActiveQs();
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
