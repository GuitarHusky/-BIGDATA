<template>
	<div class="total-info pad">
		<!-- <div class="crumbs_me">
			<Breadcrumb separator=">">
				<BreadcrumbItem to="/">首页</BreadcrumbItem>
				<BreadcrumbItem> 用户分析</BreadcrumbItem>
				<BreadcrumbItem to="/userbehavior">个人用户行为</BreadcrumbItem>
				<BreadcrumbItem >生产效益总次数</BreadcrumbItem>
			</Breadcrumb>
		</div> -->
		<Row>
			<Col span="24" class="table-title tableStyle"> 生产效益总次数
			<!-- <DatePicker type="date" v-model='begintime' placeholder="开始时间" style="width: 200px;margin-left: 40px;"></DatePicker>
      <DatePicker type="date" v-model='endtime' placeholder="结束时间" style="width: 200px;margin:0 20px;"></DatePicker> -->
      <DatePicker type="daterange" :options="options2" placement="bottom-start" v-model="timeInput" confirm format="yyyy-MM-dd"  style="width: 200px;font-size:14px;margin-left:30px;margin-right:10px;"></DatePicker>
			<RadioGroup v-model="disabledGroup">
				<Radio label="1">新版生产</Radio>
				<Radio label="2">旧版生产</Radio>
				<Radio label="3">新版成本</Radio>
				<Radio label="4">旧版成本</Radio>
			</RadioGroup>
			<Button type="primary" @click="searchTotalRegister">搜索</Button>
      <Button type="primary" @click="goBack" style="float:right;margin-right:50px;">返回</Button>
			</Col>
		</Row>
		<span v-if="oneandtwo">
		<Row>
			<Col span="24">
			<!-- <Table border :columns="historyColumns" :data="historyData"></Table> -->
      <i-table :columns="historyColumns" :data="historyData" size="large"></i-table>
			</Col>
		</Row>
		</span>
		<span v-if="shrandfour">
		<Row>
			<Col span="24">
			<!-- <Table border :columns="historyColumnsone" :data="historyDataone"></Table> -->
      <i-table :columns="historyColumnsone" :data="historyDataone" size="large" v-ref:table></i-table>
			</Col>
		</Row>
		</span>
		<div style="margin: 10px 10% 20px 0;overflow: hidden">
			<div style="float: right;">
				<Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator :current.sync="hello_curr"></Page>
			</div>
		</div>
	</div>
</template>
<script>
	import { getBroodInfo } from '../../../api/api'
	export default {
		data() {
			return {
				// 初始化信息总条数
				dataCountone: 0,
				dataCount: 0,
				// 每页显示多少条
				pageSize: 20,
        hello_curr: 1,
				historyColumnsone: [{
						title: '序号',
						key: 'numid',
						width: 70,
            align: "center"
					}, {
						title: '用户名称',
            width: 130,
						key: 'username',
            align: "center"
					},
					{
						title: '手机号',
            width: 130,
						key: 'mobile_phone',
            width:100,
            align: "center"
					},
					{
						title: '号码归属地',
						key: 'gsd',
            width:135,
            align: "center"
					},
					{
						title: '真实姓名',
						key: 'real_name',
            width: 95,
            align: "center"
					},
					{
						title: '地址',
						key: 'area',
            width:130,
            align: "center"
					},
					{
						title: '鸡场规模',
						key: 'account',
            width:120,
            align: "center"
					},
					{
						title: '鸡类型',
						key: 'bid',
            width: 95,
            align: "center"
					},{
						title: '批次名称',
						key: 'batch_name',
            width: 120,
            align: "center"
					},{
						title: '疫苗',
						key: 'vaccine',
            width:90,
            align: "center"
					},{
						title: '药品',
						key: 'drug',
            width:90,
            align: "center"
					},{
						title: '煤钱',
						key: 'coal',
            width:90,
            align: "center"
					},{
						title: '工资',
						key: 'wages',
            width:90,
            align: "center"
					},{
						title: '水电费',
						key: 'water_elec',
            width:100,
            align: "center"
					},{
						title: '饲料单价',
						key: 'feed_unit_price',
            width:120,
            align: "center"
					},{
						title: '鸡粪',
						key: 'chicken_manure',
            width:70,
            align: "center"
					},{
						title: '鸡蛋收益',
						key: 'egg_yield',
            width:120,
            align: "center"
					},{
						title: '其他支出统计',
						key: 'other',
            width:120,
            align: "center"
					},{
						title: '录入时间',
						key: 'add_time',
						width:180,
            fixed: 'right',
            align: "center"
					}],
				historyColumns: [{
						title: '序号',
						key: 'numid',
            width:60,
            align: "center"
					}, {
						title: '用户名称',
						key: 'username',
            width: 130,
            align: "center"
					},
					{
						title: '手机号',
						key: 'mobile_phone',
            width: 130,
            align: "center"
					},
					{
						title: '号码归属地',
						key: 'gsd',
            width:120,
            align: "center"
					},
					{
						title: '真实姓名',
						key: 'real_name',
            width: 95,
            align: "center"
					},
					{
						title: '地址',
						key: 'area',
            width:130,
            align: "center"
					},
					{
						title: '鸡场规模',
						key: 'account',
            width:100,
            align: "center"
					},
					{
						title: '鸡类型',
						key: 'bid',
            width:80,
            align: "center"
					},
					{
						title: '日初存栏',
						key: 'sunrise_stock',
            width:100,
            align: "center"
					},
					{
						title: '批次名称	',
						key: 'batch_name',
            width:100,
            align: "center"
					},
					{
						title: '日龄',
						key: 'day_old',
            width:70,
            align: "center"
					},
					{
						title: '死淘数量',
						key: 'dead_amoy',
            width:100,
            align: "center"
					},
					{
						title: '体重',
						key: 'week_weight',
            width:100,
            align: "center"
					},
					{
						title: '总采食量',
						key: 'total_feed',
            width:100,
            align: "center"
					},
					{
						title: '破损蛋数',
						key: 'die_eggs_num',
            width:100,
            align: "center"
					},
					{
						title: '总蛋数',
						key: 'total_egg_num',
            width:90,
            align: "center"
					},
					{
						title: '总蛋重',
						key: 'total_egg_weight',
            width: 100,
            align: "center"
					},
					{
						title: '录入时间',
						key: 'add_time',
            fixed: 'right',
            width: 180,
            align: "center"
					}
				],
				historyData: [],
				historyDataone: [],
				begintime: "",
				endtime: '',
				phone_number: '',
				disabledGroup: 1,
				oneandtwo: true,
				shrandfour: false,
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
      goBack(){
          window.history.back()
      },
			//点击分页
			changepage(index) {
				if(this.disabledGroup == 3 || this.disabledGroup == 4) {
					this.oneandtwo = false;
					this.shrandfour = true;
				} else {
					this.oneandtwo = true;
					this.shrandfour = false;
				}
				/*var begin = new Date(this.begintime);
				this.begintime = begin.getFullYear() + '-' + (begin.getMonth() + 1) + '-' + begin.getDate();
				var end = new Date(this.endtime);
				this.endtime = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate();*/
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
				getBroodInfo({
					tel: this.$route.query.num,
					star_time: this.begintime,
					end_time: this.endtime,
					c_page: index,
					type: this.disabledGroup
				}).then(res => {
					if(this.disabledGroup == 3 || this.disabledGroup == 4) {
						this.dataCount = res.data.BroodInfo.count;
						this.historyDataone = res.data.BroodInfo.list;
						var num = 1
						this.historyDataone.forEach((item, index) => {
							item['numid'] = num++
								if(item.bid == 1) {
									item.bid = '育雏鸡'
								}
							if(item.bid == 2) {
								item.bid = '育成鸡'
							}
							if(item.bid == 3) {
								item.bid = '产蛋鸡'
							}
						})

					} else {
						this.dataCount = res.data.BroodInfo.count;
						this.historyData = res.data.BroodInfo.list
						var num = 1
						this.historyData.forEach((item, index) => {
							item['numid'] = num++
								if(item.bid == 1) {
									item.bid = '育雏鸡'
								}
							if(item.bid == 2) {
								item.bid = '育成鸡'
							}
							if(item.bid == 3) {
								item.bid = '产蛋鸡'
							}
						})
					}
				})
        document.getElementsByClassName("pad")[0].scrollTop = 0;
			},
			searchTotalRegister() {
        if(this.timeInput[0] == null || this.timeInput[1] == null){
          this.timeInput = ""
        }
        /*console.log(this.disabledGroup)*/
				if(this.disabledGroup == 3 || this.disabledGroup == 4) {
					this.oneandtwo = false;
					this.shrandfour = true;
				} else {
					this.oneandtwo = true;
					this.shrandfour = false;
				}
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
				/*var begin = new Date(this.begintime);
				this.begintime = begin.getFullYear() + '-' + (begin.getMonth() + 1) + '-' + begin.getDate();
				var end = new Date(this.endtime);
				this.endtime = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate();*/
        var begin = new Date(this.timeInput[0])
        this.begintime = begin.getFullYear() + '-' + (begin.getMonth() + 1) + '-' + begin.getDate()
        var end = new Date(this.timeInput[1])
        this.endtime = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()
				this.dataCount = 0;
				this.historyData = [];
				if(this.begintime == 'NaN-NaN-NaN') {
					this.begintime = ''
				}
				if(this.endtime == 'NaN-NaN-NaN') {
					this.endtime = ''
				}
				getBroodInfo({
					tel: this.$route.query.num,
					star_time: this.begintime,
					end_time: this.endtime,
					c_page: 1,
					type: this.disabledGroup
				}).then(res => {
					if(this.disabledGroup == 3 || this.disabledGroup == 4) {
						this.dataCount = res.data.BroodInfo.count;
						this.historyDataone = res.data.BroodInfo.list;
						var num = 1
						this.historyDataone.forEach((item, index) => {
							item['numid'] = num++
								if(item.bid == 1) {
									item.bid = '育雏鸡'
								}
							if(item.bid == 2) {
								item.bid = '育成鸡'
							}
							if(item.bid == 3) {
								item.bid = '产蛋鸡'
							}
						})

					} else {
						this.dataCount = res.data.BroodInfo.count;
						this.historyData = res.data.BroodInfo.list
						var num = 1
						this.historyData.forEach((item, index) => {
							item['numid'] = num++
								if(item.bid == 1) {
									item.bid = '育雏鸡'
								}
							if(item.bid == 2) {
								item.bid = '育成鸡'
							}
							if(item.bid == 3) {
								item.bid = '产蛋鸡'
							}
						})
					}
          this.hello_curr = 1
				})
			},
			getLoginTotalList() {
				getBroodInfo({
					tel: this.$route.query.num,
					star_time: '',
					end_time: '',
					c_page: 1,
					type: this.disabledGroup
				}).then(res => {
					this.dataCount = res.data.BroodInfo.count;
					this.historyData = res.data.BroodInfo.list
					var num = 1
					this.historyData.forEach((item, index) => {
						item['numid'] = num++
							if(item.bid == 1) {
								item.bid = '育雏鸡'
							}
						if(item.bid == 2) {
							item.bid = '育成鸡'
						}
						if(item.bid == 3) {
							item.bid = '产蛋鸡'
						}
					})
				})
			}

		},
		mounted() {
			if(this.$route.query.num == '') {
				//				this.$Message.info('暂无数据!');
			} else {
				this.getLoginTotalList();
			}

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
