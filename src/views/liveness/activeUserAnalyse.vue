<template>
	<div class="pad">
		<!-- <div class="crumbs_me">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem>活跃度</BreadcrumbItem>
        <BreadcrumbItem to="/activeuseranalyse">活跃用户分析</BreadcrumbItem>
      </Breadcrumb>
    </div> -->
		<Row style="margin-top: 20px;">
			<Col span="24">
			<!-- <DatePicker type="date" v-model='begintime' placeholder="选择开始时间"></DatePicker>
      <DatePicker type="date" v-model='endtime' placeholder="选择结束时间" style="margin: 0 20px;"></DatePicker> -->
      <DatePicker type="daterange" :options="options2" placement="bottom-start" v-model="timeInput" confirm format="yyyy-MM-dd"  style="width: 200px;font-size:14px;"></DatePicker>
			<Button style="background:rgb(56, 153, 254);color: #FFFFFF;" @click="seachDownload" id="search">搜索</Button>
      <!-- #57b663 -->
			</Col>
		</Row>
		<Row>
			<Col span="24" class="table-title titleStyle">活跃用户地区统计
			</Col>
		</Row>
		<Row>
			<Col span="24" class="table-bor">
			<div style="height: 300px;width: 100%;padding: 0;margin-top: 20px;" id="user-city"></div>
			</Col>
		</Row>
		<Row>
			<Col span="11">
			<div class="table-title titleStyle">活跃用户版本统计</div>
			</Col>
			<Col span="11" offset='2' style="margin-left: 7%;">
			<div class="table-title titleStyle">活跃用户手机类型统计</div>
			</Col>
		</Row>
		<Row style="margin-bottom: 20px;">
			<Col span="11" class="download-border">
			<div style="height: 300px;width:100%;padding: 0;text-align: center;" id="user-version"></div>
			</Col>
			<Col span="11" offset='2' class="download-border" style="margin-left: 7%;">
			<div style="height: 300px;width:100%;padding: 0;text-align: center;" id="user-type"></div>
			</Col>
		</Row>
	</div>
</template>

<script>
	import { getActiveUserCurVersion, getActiveUserPhoneType, getActiveUserAnalysis } from '../../api/api'
	export default {
		data() {
			return {
				begintime: '',
				endtime: '',
				user_version: [], //版本信息图例制作
				user_version_count: [], //每个版本的数量
				user_web: '', //网页用户的数量
				user_anzhuo: '', //安卓手机数量
				user_ios: '', //ios手机数量
				user_city_count: [], //活跃用户地区统计数量
				user_city_province: [], //活跃用户地区统计省份
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
			//获取活跃度->活跃用户分析->活跃用户版本统计数据
			getUserVersion() {
        document.getElementById('search').disabled = true
				getActiveUserCurVersion({
					start_time: this.begintime,
					end_time: this.endtime
				}).then(res => {
					res.result.forEach((item, index) => {
						this.user_version.push(item.cur_version)
						this.user_version_count.push({
							'value': item.count,
							"name": item.cur_version
						})
            document.getElementById('search').disabled = false
					})
					this.draWversion();
				})
			},
			//获取活跃度->活跃用户分析->活跃用户手机类型统计
			getUserIphone() {
        document.getElementById('search').disabled = true
				getActiveUserPhoneType({
					start_time: this.begintime,
					end_time: this.endtime
				}).then(res => {
					this.user_web = res.result[0].count
					this.user_ios = res.result[1].count
					this.user_anzhuo = res.result[2].count
					this.draWiphoneType();
          document.getElementById('search').disabled = false
				})
			},
			//活跃度->活跃用户分析->活跃用户地区统计
			getUserArea() {
        document.getElementById('search').disabled = true
				getActiveUserAnalysis({
					start_time: this.begintime,
					end_time: this.endtime
				}).then(res => {
					res.result.forEach((item, index) => {
						this.user_city_count.push(item.count);
						this.user_city_province.push(item.province);
            document.getElementById('search').disabled = false
					})
					this.draWcity()
				})
			},
			draWcity() {
				var myChart = this.$echarts.init(document.getElementById('user-city'));
				myChart.setOption({
          /*color: ['#57b663'],*/
					color: ['rgb(56, 153, 254)'],
					tooltip: {
						trigger: 'axis',
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
						name:"地区",
						data: this.user_city_province,
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
						data: this.user_city_count
					}]
				})
			},
			draWversion() {
				var myChart = this.$echarts.init(document.getElementById('user-version'));
				myChart.setOption({
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					//					legend: {
					//						left: 'center',
					//						data: this.user_version
					//					},
					series: [{
						name: '版本',
						type: 'pie',
						radius: '70%',
						center: ['50%', '61%'],
						data: this.user_version_count,
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}],
          /*color: ['#cd0c3a','#db6c15', '#db158b', '#db15d2','#9e15db','#15dbad','#15db6b','#88db15','#db1a15','#15cvdb','#6615db','#1537db','#15cadb']*/
					color: ['#7FFF00','rgb(56, 153, 254)', '#E3A83F', '#32CD99','#ff9d37','#9d37ff','#ff2693','#FF7F00','#85fe11','#8a11ff','#11ff8a','#fe8a11','#fe1185']
				})
			},
			//下载手机类型统计图表
			draWiphoneType() {
				var myChart = this.$echarts.init(document.getElementById('user-type'));
				myChart.setOption({
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						left: 'center',
						data: ['网页', 'IOS', '安卓']
					},
					series: [{
						name: '手机类型',
						type: 'pie',
						radius: '70%',
						center: ['50%', '60%'],
						data: [{
								value: this.user_web,
								name: '网页'
							},
							{
								value: this.user_ios,
								name: 'IOS'
							},
							{
								value: this.user_anzhuo,
								name: '安卓'
							}
						],
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}],
					/*color: ['#F47A7A', '#FB9857', '#F0BA4E']*/
          color: ['#7FFF00','#feae5d','rgb(56, 153, 254)']
				})
			},
			seachDownload() {
        if(this.timeInput[0] == null || this.timeInput[1] == null){
          this.timeInput = ""
        }
				this.user_version = []
				this.user_version_count = []
				this.user_web = ''
				this.user_anzhuo = ''
				this.user_ios = ''
				this.user_city_count = []
				this.user_city_province = []
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
        console.log(this.timeInput)
        /*var now_time = new Date();
        var begin = new Date(this.begintime)
        this.begintime = begin.getFullYear() + '-' + (begin.getMonth() + 1) + '-' + begin.getDate()
        var end = new Date(this.endtime)
        this.endtime = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()
				if(this.endtime > now_time) {
					this.$Message.info('结束时间不能大于当前日期!')
					return
				}
        console.log(this.begintime)
        console.log(this.endtime)
				if(this.begintime > this.endtime) {
					this.$Message.info('结束时间需大于开始时间!')
					return
				}*/

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
				this.getUserVersion();
				this.getUserIphone();
				this.getUserArea();
			},
		},
		mounted() {
			var setime = new Date()
			this.endtime = setime.getFullYear() + '-' + (setime.getMonth() + 1) + '-' + setime.getDate()
			var oneweekdate = new Date(setime - 7 * 24 * 3600 * 1000);
			this.begintime = oneweekdate.getFullYear() + '-' + (oneweekdate.getMonth() + 1) + '-' + oneweekdate.getDate()
			this.getUserVersion();
			this.getUserIphone();
			this.getUserArea();
		}
	}
</script>

<style scoped>
	.download-border {
		/* border: 1px solid rgb(206, 230, 207); */
    /* border: 1px solid rgb(56, 153, 254); */
	}
  .ivu-col-offset-2 {
    margin-left: 0;
  }
  .pad {
    padding: 28px 20px;
  }
  .table-title {
    padding-left: 0;
  }
</style>
