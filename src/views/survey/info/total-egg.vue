<template>
	<div class="total-info pad">
	<!--   <div class="crumbs_me">
    <Breadcrumb separator=">">
      <BreadcrumbItem to="/">首页</BreadcrumbItem>
      <BreadcrumbItem>概况</BreadcrumbItem>
      <BreadcrumbItem to="/trend">整体趋势</BreadcrumbItem>
      <BreadcrumbItem to="/totalegg">鸡蛋报价总人数 </BreadcrumbItem>
    </Breadcrumb>
  </div> -->
		<Row>
			<Col span="24">
			<div class="table-title tableStyle">
				鸡蛋报价总人数
				<i-input placeholder="这里输入正确的用户名" v-model='phone_number' style="width: 200px;margin: 0 20px 0 40px;"></i-input>
				<!-- <DatePicker type="date" placeholder="开始时间" v-model='begintime' style="width: 200px;"></DatePicker>
        <DatePicker type="date" placeholder="结束时间" v-model='endtime' style="width: 200px;margin:0 20px;"></DatePicker> -->
        <DatePicker type="daterange" :options="options2" placement="bottom" v-model="timeInput" confirm format="yyyy-MM-dd"  style="width: 200px;font-size:14px;"></DatePicker>
				<Button type="primary" @click="search">搜索</Button>
        <Button type="primary" @click="goBack" style="float:right;margin-right:50px;">返回</Button>
			</div>
			<!-- <Table border :columns="historyColumns" :data="historyData"></Table> -->
      <i-table :columns="historyColumns" :data="historyData" size="large"></i-table>
			</Col>
		</Row>
		<div style="margin: 10px 10% 20px 0;overflow: hidden">
			<div style="float: right;">
				<Page :total="dataCount" :page-size="pageSize" :current.sync="hello_curr" show-total class="paging" @on-change="changepage" show-elevator></Page>
			</div>
		</div>
	</div>
</template>
<script>
	import { telSearchEggPrice } from '../../../api/api'
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
				total_down_list: [], //总数据存放的地方
				phone_number: '', //搜索的电话号码
				begintime: '',
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
      goBack(){
          window.history.back()
      },
			search() {
        if(this.timeInput[0] == null || this.timeInput[1] == null){
          this.timeInput = ""
        }
        var begin = new Date(this.timeInput[0])
        this.begintime = begin.getFullYear() + '-' + (begin.getMonth() + 1) + '-' + begin.getDate()
        var end = new Date(this.timeInput[1])
        this.endtime = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()
				var now_time = new Date();
				if(this.endtime > now_time) {
					this.$Message.info('结束时间不能大于当前日期!')
					return
				}
				if(this.begintime > this.endtime) {
					this.$Message.info('结束时间需大于开始时间!')
					return
				}
				//				if(this.begintime == '' || this.endtime == "") {
				//					this.$Message.info('请输入搜素时间!')
				//					return
				//				}
				/*var setime = new Date(this.begintime)
				this.begintime = setime.getFullYear() + '-' + (setime.getMonth() + 1) + '-' + setime.getDate()
				var endtimes = new Date(this.endtime)
				this.endtime = endtimes.getFullYear() + '-' + (endtimes.getMonth() + 1) + '-' + endtimes.getDate()*/
        /*this.begintime = this.timeInput[0].getFullYear() + '-' + (this.timeInput[0].getMonth() + 1) + '-' + this.timeInput[0].getDate()
        this.endtime = this.timeInput[1].getFullYear() + '-' + (this.timeInput[1].getMonth() + 1) + '-' + this.timeInput[1].getDate()*/
				if(this.begintime == 'NaN-NaN-NaN') {
					this.begintime = ''
				}
				if(this.endtime == 'NaN-NaN-NaN') {
					this.endtime = ''
				}
				telSearchEggPrice({
					tel: this.phone_number,
					type: 6,
					star_time: this.begintime,
					end_time: this.endtime,
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
			getDownloadDate() {
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
			},
			changepage(index) {
				var setime = new Date(this.begintime)
				this.begintime = setime.getFullYear() + '-' + (setime.getMonth() + 1) + '-' + setime.getDate()
				var endtimes = new Date(this.endtime)
				this.endtime = endtimes.getFullYear() + '-' + (endtimes.getMonth() + 1) + '-' + endtimes.getDate()
				if(this.begintime == 'NaN-NaN-NaN') {
					this.begintime = ''
				}
				if(this.endtime == 'NaN-NaN-NaN') {
					this.endtime = ''
				}
				telSearchEggPrice({
					tel: this.phone_number,
					type: 6,
					star_time: this.begintime,
					end_time: this.endtime,
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
    border-left: 0;
	}

	.total-info {
		margin-top: 20px;
	}

  .ivu-col-offset-2 {
    margin-left: 0;
  }
</style>
