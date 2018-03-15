<template>
	<div class="total-info pad">
		<!-- <div class="crumbs_me">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem>活跃度</BreadcrumbItem>
        <BreadcrumbItem to="/activeuser">活跃用户</BreadcrumbItem>
        <BreadcrumbItem>活跃用户详情</BreadcrumbItem>
      </Breadcrumb>
    </div> -->
		<Row>
			<Col span="24">
			<div class="table-title tableStyle titleStyle">
				<span>活跃用户</span>
				<i-input placeholder="这里输入正确的手机号" v-model='phone_number' style="width: 200px;margin: 0px 20px 0 40px;"></i-input>
				<!-- <DatePicker type="date" v-model='begintime' placeholder="开始时间" style="width: 200px;"></DatePicker>
        <DatePicker type="date" v-model='endtime' placeholder="结束时间" style="width: 200px;margin:0 20px;"></DatePicker> -->
        <DatePicker type="daterange" :options="options2" placement="bottom" v-model="timeInput" confirm format="yyyy-MM-dd"  style="width: 200px;font-size:14px;"></DatePicker>
				<Button type="primary" @click="searchTotalRegister">搜索</Button>
        <Button @click="toDownLoad" type="primary" style="margin-left:30px;text-align:center;width:56px;height:32px;padding:0;padding-top:5px;"><Icon type="arrow-down-a" size="23"></Icon></Button>
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
	import { getActiveUserList } from '../../../api/api'
	export default {
		data() {
			return {
				begintime: '',
				endtime: '',
				// 初始化信息总条数
				dataCount: 0,
				// 每页显示多少条
				pageSize: 20,
				historyColumns: [{
					title: '序号',
					key: 'numid',
					width: 100,
          align: "center"
				}, {
					title: '用户名称',
					key: 'username',
          width: 139,
          align: "center"
				}, {
					title: '手机号',
					key: 'mobile_phone',
          width: 139,
          align: "center"
				}, {
					title: '号码归属地',
					key: 'tel_address',
          width: 220,
          sortable: true,
          align: "center"
				}, {
					title: '活跃地址',
          width: 220,
					key: 'area',
          sortable: true,
          align: "center"
				}, {
					title: '手机型号',
          width: 120,
					key: 'model',
          align: "center"
				}, {
					title: '设备号',
          width: 230,
					key: 'device',
          align: "center"
				}, {
					title: '手机版本系统',
          width: 150,
					key: 'version',
          align: "center"
				}, {
					title: '蛋鸡管家版本',
          width: 150,
					key: 'cur_version',
          align: "center"
				}, {
					title: '活跃时间',
					key: 'time',
					width:180,
          fixed: 'right',
          align: "center"
				}],
				historyData: [],
				registerPhone: '',
				phone_number: '',
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
      /*下载表格*/
      toDownLoad(){
        if(!this.timeInput.length){
          this.$Message.error('请选择时间')
        }else{
        /*var begin = new Date(this.timeInput[0])
        this.begintime = begin.getFullYear() + '-' + (begin.getMonth() + 1) + '-' + begin.getDate()
        var end = new Date(this.timeInput[1])
        this.endtime = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()*/
          window.location.href="https://data.danjiguanjia.com/api/v1/yes_pv_excel?star_time="+this.begintime+"&end_time="+this.endtime
        }
      },
      goBack(){
        window.history.back()
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

				this.$Spin.show();
				this.historyData = []
				this.dataCount = 0
				/*var setime = new Date(this.begintime)
				this.begintime = setime.getFullYear() + '-' + (setime.getMonth() + 1) + '-' + setime.getDate()
				var endtimes = new Date(this.endtime)
				this.endtime = endtimes.getFullYear() + '-' + (endtimes.getMonth() + 1) + '-' + endtimes.getDate()*/
       /* var begin = new Date(this.timeInput[0])
        var month1 = (begin.getMonth() + 1)>=10?(begin.getMonth() + 1):'0'+(begin.getMonth() + 1)
        var day1 = begin.getDate()>=10?begin.getDate():'0'+begin.getDate()
        this.begintime = begin.getFullYear() + '-' + month1 + '-' + day1
        var end = new Date(this.timeInput[1])
        var month2 = (end.getMonth() + 1)>=10?(end.getMonth() + 1):'0'+(end.getMonth() + 1)
        var day2 = end.getDate()>=10?end.getDate():'0'+end.getDate()
        this.endtime = end.getFullYear() + '-' + month2 + '-' + day2
*/
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
        if(this.begintime == '' || this.endtime == "") {
          this.$Message.info('请输入搜素时间!')
          return
        }
        if(((this.endtime - this.begintime) / (24 * 60 * 60 * 1000))>7){
          this.$Message.info('搜索时间间隔需在7天之内!')
          return
        }

				if(this.begintime == 'NaN-NaN-NaN') {
					this.begintime = ''
				}
				if(this.endtime == 'NaN-NaN-NaN') {
					this.endtime = ''
				}

				getActiveUserList({
					start_time: this.begintime,
					end_time: this.endtime,
					page: 1,
					currentPage: this.pageSize,
					keyword: this.phone_number
				}).then(res => {
					this.$Spin.hide();
					this.hello_curr = 1
          var i = 1;
          res.result.data.forEach((item, index) => {
            item['numid'] = i++
            if(item.area == null){
              item.area = '不详'
            }else{
            item.area = item.province + item.city + item.area
            }
          })
          this.historyData = res.result.data
          this.dataCount = res.result.count;
				})
			},
			changepage(index) {
				this.$Spin.show();
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
				getActiveUserList({
					start_time: this.begintime,
					end_time: this.endtime,
					page: index,
					currentPage: this.pageSize,
					keyword: this.phone_number
				}).then(res => {
					this.$Spin.hide();
          var i = 1;
          res.result.data.forEach((item, index) => {
            item['numid'] = i++
            if(item.area == null){
              item.area = '不详'
            }else{
            item.area = item.province + item.city + item.area
            }
          })
          this.historyData = res.result.data
          this.dataCount = res.result.count;
				})
        document.getElementsByClassName("pad")[0].scrollTop = 0;
			},
			//获取活跃度->活跃用户->用户活跃度总数(pv)->详情第一周的数据
			getUserList() {
				this.$Spin.show();
				getActiveUserList({
					start_time: this.begintime,
					end_time: this.endtime,
					page: 1,
					currentPage: this.pageSize,
					keyword: this.phone_number
				}).then(res => {
//					console.log(res)
					this.$Spin.hide();
          var i = 1;
          res.result.data.forEach((item, index) => {
            item['numid'] = i++
            if(item.area == null){
              item.area = '不详'
            }else{
            item.area = item.province + item.city + item.area
            }
          })
          this.historyData = res.result.data
          this.dataCount = res.result.count;
				})
			}
		},
		mounted() {
			var setime = new Date()
			this.endtime = setime.getFullYear() + '-' + (setime.getMonth() + 1) + '-' + setime.getDate()
			var oneweekdate = new Date(setime - 7 * 24 * 3600 * 1000);
			this.begintime = oneweekdate.getFullYear() + '-' + (oneweekdate.getMonth() + 1) + '-' + oneweekdate.getDate()
			this.getUserList();
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

  .ivu-col-offset-2 {
    margin-left: 0;
  }

  /*.table-title {
    margin-top: 20px;
  }*/
</style>
