<template>
	<!--用户签到分析-->
	<div class="user_sign pad">
		<!--<div class="crumbs_me">
			<Breadcrumb separator=">">
				<BreadcrumbItem to="/">首页</BreadcrumbItem>
				<BreadcrumbItem>概况</BreadcrumbItem>
				<BreadcrumbItem>用户签到分析</BreadcrumbItem>
			</Breadcrumb>
		</div>-->
		<div style="margin-top: 10px;padding: 10px 0; ">
			<!-- <DatePicker type="date" v-model='begintime' placeholder="选择开始时间"></DatePicker>
      <DatePicker type="date" v-model='endtime' placeholder="选择结束时间" style="margin:0 20px;"></DatePicker> -->
      <DatePicker type="daterange" :options="options2" placement="bottom-start" v-model="timeInput" confirm format="yyyy-MM-dd"  style="width: 200px;font-size:14px;"></DatePicker>
      <Button style="background:rgb(56, 153, 254);color: #FFFFFF;" @click="seachDownload" id="search">搜索</Button>
      <!-- #57b663 -->
		</div>
		<div class="small_title">
      用户签到时间统计
    </div>
		<div style="height: 300px;width: 100%;padding: 0;margin-top: 20px;" id="download-analyse-hour"></div>
		<div class="small_title">
			用户签到地区统计
		</div>

		<div style="height: 300px;width: 100%;padding: 0;" id="download-analyse-city"></div>
	</div>
</template>

<script>
	import { getUserCheckInAnalysis, getUserCheckInArea } from '../../api/api'
	export default {
		data() {
			return {
				begintime: '',
				endtime: '',
				user_sign_time_num: [], //获取用户签到时间的count
				user_sign_time_date: [], //获取用户签到时间的日期
				user_sign_area_num: [], //获取用户签到地区的count
				user_sign_area: [], //获取用户签到地区
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
		mounted() {
			var setime = new Date()
			this.endtime = setime.getFullYear() + '-' + (setime.getMonth() + 1) + '-' + setime.getDate()
			var oneweekdate = new Date(setime - 7 * 24 * 3600 * 1000);
			this.begintime = oneweekdate.getFullYear() + '-' + (oneweekdate.getMonth() + 1) + '-' + oneweekdate.getDate()
			this.getUserSignTime();
			this.getUserSignArea();
		},
		methods: {
			getUserSignTime() {
        document.getElementById('search').disabled = true
				this.$Spin.show();
				getUserCheckInAnalysis({
					start_time: this.begintime,
					end_time: this.endtime
				}).then(res => {
					this.$Spin.hide();
					res.result.forEach((item, index) => {
						this.user_sign_time_num.push(item.count)
						this.user_sign_time_date.push(item.hour)
            document.getElementById('search').disabled = false
					})
					this.draWbatter()
				})
			},
			getUserSignArea() {
        document.getElementById('search').disabled = true
				this.$Spin.show();
				getUserCheckInArea({
					start_time: this.begintime,
					end_time: this.endtime
				}).then(res => {
					this.$Spin.hide();
					res.result.forEach((item, index) => {
            if(item.count && item.area){
						this.user_sign_area_num.push(item.count)
						this.user_sign_area.push(item.area)
            }
            document.getElementById('search').disabled = false
					})
					this.draWcity();
				})
			},
			draWcity() {
				var myChart = this.$echarts.init(document.getElementById('download-analyse-city'));
				myChart.setOption({
					color: ['#2d8cf0'],
					tooltip: {
						trigger: 'axis',
					},
					grid: {
						top: 30,
						bottom: 30,
						left: 50,
						right: 50,
					},
					xAxis: [{
						type: 'category',
						data: this.user_sign_area,
						name: "地区",
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
						name: "人数",
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
						data: this.user_sign_area_num
					}]
				})
			},
			draWbatter() {
				var myChart = this.$echarts.init(document.getElementById('download-analyse-hour'));
				var colors = ['#57b663', '#d14a61', '#675bba'];
				myChart.setOption({
					color: colors,
					tooltip: {
           trigger: 'axis',
           axisPointer: {
           type: 'line'
           }
          },
					legend: {
//						data: ['人数']
					},
					grid: {
						top: 30,
						bottom: 30,
						left: 50,
						right: 50,
					},
					xAxis: [{
						type: 'category',
						boundaryGap: false,
						name: "时",
						axisTick: {
							alignWithLabel: true
						},
						axisLine: {
							onZero: true,
							lineStyle: {
								color: '#000'
							}
						},
						data: this.user_sign_time_date,
						splitLine: {
							show: true,
							lineStyle: {
								color: '#f5f7f9'
							}
						}
					}],
					yAxis: [{
						type: 'value',
						name: "人数",
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
						smooth: true,
						symbol: 'circle', //拐点样式
						symbolSize: 10, //拐点大小
						data: this.user_sign_time_num,
						itemStyle: {
							normal: {
								areaStyle: {
									type: 'default',
								},
								color: 'rgb(232,245,253)',
								lineStyle: {
									color: '#2d8cf0'
								},
								borderColor: '#2d8cf0'
							}
						}
					}]
				});
			},
			seachDownload() {
        if(this.timeInput[0] == null || this.timeInput[1] == null){
          this.timeInput = ""
        }
				this.user_sign_time_num = []
				this.user_sign_time_date = []
				this.user_sign_area_num = []
				this.user_sign_area = []
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

				this.getUserSignTime();
				this.getUserSignArea();

			}
		}
	}
</script>

<style scoped>
	.user_sign {
		padding-left: 20px;
	}

	.time-pad {
		padding: 20px 0;
	}

	.trend-title {
		padding-left: 50px;
		height: 80px;
		line-height: 80px;
		/* background: rgb(206, 230, 207); */
		font-size: 30px;
	}
  .specTtitle {
    height: 50px;
  }
</style>
