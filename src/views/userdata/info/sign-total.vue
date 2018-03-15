<template>
	<div class="total-info pad">
		<!-- <div class="crumbs_me">
			<Breadcrumb separator=">">
				<BreadcrumbItem to="/">首页</BreadcrumbItem>
				<BreadcrumbItem> 用户分析</BreadcrumbItem>
				<BreadcrumbItem to="/userbehavior">个人用户行为</BreadcrumbItem>
				<BreadcrumbItem >签到总次数</BreadcrumbItem>
			</Breadcrumb>
		</div> -->
		<Row>
			<Col span="24" class="table-title tableStyle"> 签到总次数
			<!-- <DatePicker type="date" v-model='begintime' placeholder="开始时间" style="width: 200px;margin-left: 40px;"></DatePicker>
      <DatePicker type="date" v-model='endtime' placeholder="结束时间" style="width: 200px;margin:0 20px;"></DatePicker> -->
      <DatePicker type="daterange" :options="options2" placement="bottom-start" v-model="timeInput" confirm format="yyyy-MM-dd"  style="width: 200px;font-size:14px;margin-left:30px;"></DatePicker>
			<Button type="primary" @click="searchTotalRegister">搜索</Button>
      <Button type="primary" @click="goBack" style="float:right;margin-right:50px;">返回</Button>
			</Col>
		</Row>
		<Row>
			<Col span="24">
			<!-- <Table border :columns="historyColumns" :data="historyData"></Table> -->
      <i-table :columns="historyColumns" :data="historyData" size="large"></i-table>
			</Col>
		</Row>
		<div style="margin: 10px 10% 20px 0;overflow: hidden">
			<div style="float: right;">
				<Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator :current.sync="hello_curr"></Page>
			</div>
		</div>
	</div>
</template>
<script>
	import {getUserSign } from '../../../api/api'
	export default {
		data() {
			return {
				// 初始化信息总条数
				dataCount: 0,
				// 每页显示多少条
				pageSize: 20,
        hello_curr: 1,
				historyColumns: [{
						title: '序号',
						key: 'numid',
            align: "center"
					}, {
						title: '用户名',
						key: 'username',
            align: "center"
					},
					{
						title: '手机号',
						key: 'mobile_phone',
            align: "center"
					},
					{
						title: '号码归属地',
						key: 'number_attribution',
            sortable: true,
            align: "center"
					},
					{
						title: '真实姓名',
						key: 'real_name',
            align: "center"
					},
					{
						title: '注册地址',
						key: 'area',
            sortable: true,
            align: "center"
					},
					{
						title: '签到时间',
						key: 'create_time',
						width:180,
            align: "center"
					}
				],
				historyData: [],
				begintime: "",
				endtime: '',
				phone_number: '',

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
				this.$Spin.show();
				/*var begin = new Date(this.begintime);
				this.begintime = begin.getFullYear() + '-' + (begin.getMonth() + 1) + '-' + begin.getDate();
				var end = new Date(this.endtime);
				this.endtime = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate();*/
        var begin = new Date(this.timeInput[0])
        this.begintime = begin.getFullYear() + '-' + (begin.getMonth() + 1) + '-' + begin.getDate()
        var end = new Date(this.timeInput[1])
        this.endtime = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()
				if(this.begintime=='NaN-NaN-NaN'){
					this.begintime=''
				}
				if(this.endtime=='NaN-NaN-NaN'){
					this.endtime=''
				}
				getUserSign({
					tel:this.$route.query.num,
					star_time: this.begintime,
					end_time: this.endtime,
					c_page:index
				}).then(res => {
					 this.$Spin.hide();
					this.dataCount = res.data.list.count;
					this.historyData = res.data.list.list
					var num =1
					this.historyData.forEach((item,index)=>{
            if(item.real_name == null || item.real_name == ""){
              item.real_name = '不详'
            }
            if(item.area == null || item.area == ""){
              item.area = '不详'
            }
						item['numid']=num++
					})
				})
				console.log(this.begintime)
        document.getElementsByClassName("pad")[0].scrollTop = 0;
			},
			searchTotalRegister() {
        if(this.timeInput[0] == null || this.timeInput[1] == null){
          this.timeInput = ""
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
				this.dataCount=0;
				this.historyData =[];
				if(this.begintime=='NaN-NaN-NaN'){
					this.begintime=''
				}
				if(this.endtime=='NaN-NaN-NaN'){
					this.endtime=''
				}
				getUserSign({
					tel:this.$route.query.num,
					star_time: this.begintime,
					end_time: this.endtime,
					c_page:1
				}).then(res => {
					this.dataCount = res.data.list.count;
					this.historyData = res.data.list.list
					var num =1
					this.historyData.forEach((item,index)=>{
            if(item.real_name == null || item.real_name == ""){
              item.real_name = '不详'
            }
            if(item.area == null || item.area == ""){
              item.area = '不详'
            }
						item['numid']=num++
					})
          this.hello_curr = 1
				})
			},
			getLoginTotalList() {
				getUserSign({
					tel:this.$route.query.num,
					star_time:'',
					end_time:'',
					c_page:1
				}).then(res => {
					console.log(res)
					this.dataCount = res.data.list.count;
					this.historyData = res.data.list.list
					var num =1
					this.historyData.forEach((item,index)=>{
            if(item.real_name == null || item.real_name == ""){
              item.real_name = '不详'
            }
            if(item.area == null || item.area == ""){
              item.area = '不详'
            }
						item['numid']=num++
					})
				})
			}
		},
		mounted() {
			if(this.$route.query.num==''){
//				this.$Message.info('暂无数据!');
			}else{
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
