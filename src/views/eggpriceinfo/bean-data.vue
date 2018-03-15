<template>
	<div class="total-info pad">
		<!-- <div class="crumbs_me">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem> 抓取蛋价信息</BreadcrumbItem>
        <BreadcrumbItem to="/beandata">豆粕价格</BreadcrumbItem>
      </Breadcrumb>
    </div> -->
		<Row>
			<Col span="24">
			<div class="table-title tableStyle">
				<span>豆粕价格</span>
				<i-input placeholder="这里输入关键字" v-model='phone_number' style="width: 200px;margin: 0 20px 0 40px;"></i-input>
				<!-- <DatePicker type="date" placeholder="开始时间" v-model='begintime' style="width: 200px;"></DatePicker>
        <DatePicker type="date" placeholder="结束时间" v-model='endtime' style="width: 200px;margin:0 20px;"></DatePicker> -->
        <DatePicker type="daterange" :options="options2" placement="bottom" v-model="timeInput" confirm format="yyyy-MM-dd"  style="width: 200px;font-size:14px;"></DatePicker>
				<Button type="primary" @click="searchTotalRegister">搜索</Button>
			</div>
			<!-- <Table border :columns="historyColumns" :data="historyData"></Table> -->
       <i-table :columns="historyColumns" :data="historyData" size="large"></i-table>
			</Col>
		</Row>
		<div style="margin: 10px 10% 20px 0;overflow: hidden">
			<div style="float: right;">
				<Page :total="dataCount" :page-size="pageSize" show-total :current.sync="hello_curr" class="paging" @on-change="changepage" show-elevator></Page>
			</div>
		</div>
	</div>
</template>
<script>
	import {getPriceTypes } from '../../api/api'
	export default {
		data() {
			return {
				// 初始化信息总条数
				dataCount: 0,
				// 每页显示多少条
				pageSize: 20,
				historyColumns: [{
					title: '序号',
					key: 'numid',
					width:100,
          align: "center"
				}, {
					title: '省份',
					key: 'province',
          sortable: true,
          align: "center"
				}, {
					title: '城市',
					key: 'city',
          sortable: true,
          align: "center"
				}, {
					title: '区县',
					key: 'district',
          sortable: true,
          align: "center"
				}, {
					title: '豆粕价格',
					key: 'price',
          sortable: true,
          align: "center"
				}, {
					title: '更新次数',
					key: 'is_change',
          align: "center"
				}, {
					title: '报价来源',
					key: 'source',
          align: "center"
				}, {
					title: '报价日期',
					key: 'offer_date',
          align: "center"
				}, {
					title: '抓取时间',
					key: 'create_time',
					width:180,
          align: "center"
				}],
				historyData: [],
				registerPhone: '',
				phone_number: '',
				begintime: "",
				endtime: '',
				hello_curr: 1,
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
			searchTotalRegister() {
        if(this.timeInput[0] == null || this.timeInput[1] == null){
          this.timeInput = ""
        }
        /*var begin = new Date(this.begintime)
        this.begintime = begin.getFullYear() + '-' + (begin.getMonth() + 1) + '-' + begin.getDate()
        var end = new Date(this.endtime)
        this.endtime = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()*/
        var begin = new Date(this.timeInput[0])
        this.begintime = begin.getFullYear() + '-' + (begin.getMonth() + 1) + '-' + begin.getDate()
        var end = new Date(this.timeInput[1])
        this.endtime = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()
        /*var now_time = new Date().getTime();
        var beginTime = this.timeInput[0].getTime()
        var endTime = this.timeInput[1].getTime()
        if(endTime > now_time) {
          this.$Message.info('结束时间不能大于当前日期!')
          return
        }
        if(beginTime > this.endtime) {
          this.$Message.info('结束时间需大于开始时间!')
          return
        }*/
				var now_time = new Date();
				if(this.endtime > now_time) {
					this.$Message.info('结束时间不能大于当前日期!')
					return
				}
				if(this.begintime > this.endtime) {
					this.$Message.info('结束时间需大于开始时间!')
					return
				}
				if(this.begintime == 'NaN-NaN-NaN') {
					this.begintime = ''
				}
				if(this.endtime == 'NaN-NaN-NaN') {
					this.endtime = ''
				}
				getPriceTypes({
					price_type: 2,
					page: 1,
					currentPage: this.pageSize,
					start_time: this.begintime,
					end_time: this.endtime,
					keyword: this.phone_number
				}).then(res => {
					this.hello_curr = 1;
					if(res.retcode == 2000) {
						this.historyData = res.result.data;
						this.dataCount = res.result.count;
						var i = 1;
						this.historyData.forEach((item, index) => {
							item['numid'] = i++
						})
					} else {
						alert(res.msg)
					}
				})
        window.setTimeout(() => {
          this.timeInput = ''
        },3000)
			},
			getDownloadDate() {
				getPriceTypes({
					price_type: 2,
					page: 1,
					currentPage: this.pageSize,
					start_time: this.begintime,
					end_time: this.endtime,
					keyword: this.phone_number
				}).then(res => {
					console.log(res)
					this.historyData = res.result.data;
					this.dataCount = res.result.count;
					var i = 1;
					this.historyData.forEach((item, index) => {
						item['numid'] = i++
					})
				})
			},
			changepage(index) {
				/*var setime = new Date(this.begintime)
				this.begintime = setime.getFullYear() + '-' + (setime.getMonth() + 1) + '-' + setime.getDate()
				var endtimes = new Date(this.endtime)
				this.endtime = endtimes.getFullYear() + '-' + (endtimes.getMonth() + 1) + '-' + endtimes.getDate()*/
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
				getPriceTypes({
					price_type: 2,
					page: index,
					currentPage: this.pageSize,
					start_time: this.begintime,
					end_time: this.endtime,
					keyword: this.phone_number
				}).then(res => {
					this.historyData = res.result.data;
					this.dataCount = res.result.count;
					var i = 1;
					this.historyData.forEach((item, index) => {
						item['numid'] = i++
					})
				})
        document.getElementsByClassName("pad")[0].scrollTop = 0;
			},
		},
		mounted() {
			this.getDownloadDate();
		}
	}
</script>
<style scoped>
	.ivu-table-cell {
		text-align: center;
	}

	.ivu-table-border td,
	.ivu-table-border th {
		text-align: center;
	}

	.total-info {
		margin-top: 20px;
	}

  .table-title {
    margin-top: 0;
  }
</style>
