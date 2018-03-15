<template>
	<div class="total-info pad">
		<!-- <div class="crumbs_me">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem>概况</BreadcrumbItem>
        <BreadcrumbItem to="/trend">整体趋势</BreadcrumbItem>
        <BreadcrumbItem to="/yesregist">昨日增加注册数 </BreadcrumbItem>
      </Breadcrumb>
    </div> -->
		<Row>
			<Col span="24">
			<div class="table-title  tableStyle">
				昨日增加注册数
				<i-input placeholder="这里输入正确的手机号" v-model='phone_number' style="width: 200px;margin: 0 20px 0 40px;"></i-input>
				<Button type="primary" icon="ios-search" @click="searchTodayRegister">搜索</Button>
        <a href="https://data.danjiguanjia.com/api/v1/yes_regist_excel"><Button type="primary" @click="toDownload" style="margin-left:30px;text-align:center;width:56px;height:32px;padding:0;padding-top:5px;"><Icon type="arrow-down-a" size="23"></Icon></Button></a>
        <Button type="primary" @click="goBack" style="float:right;margin-right:50px;">返回</Button>
			</div>
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
	import { telSearchRegist } from '../../../api/api'
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
						width:100,
            align: "center"
					}, {
						title: '用户名称',
						key: 'username',
            align: "center"
					},
					{
						title: '电话',
						key: 'mobile_phone',
            align: "center"
					},
					{
						title: '号码归属地',
						key: 'tel_address',
            sortable: true,
            align: "center"
					},
					{
						title: '地址',
						key: 'area',
            sortable: true,
            align: "center"
					},
					{
						title: '注册时间',
						key: 'regist_time',
						width:180,
            align: "center"
					}
				],
				historyData: [],
				total_down_list: [], //总数据存放的地方
				phone_number: '', //搜索的电话号码
			}
		},
		methods: {
      goBack(){
        window.history.back()
      },
			getDownloadDate() {
				telSearchRegist({
					tel: this.phone_number,
					type: 3,
					star_time: '',
					end_time: '',
					c_page: 1
				}).then(res => {
					this.historyData = res.data.list.list;
					this.dataCount = res.data.list.count;
					var i = 1;
					this.historyData.forEach((item, index) => {
						if(item.area == '') {
							item.area = item.tel_address
						} else {
							item.area = item.area
						}
						item['numid'] = i++
					})
				})
			},
			changepage(index) {
				var begin = new Date(this.begintime)
				this.begintime = begin.getFullYear() + '-' + (begin.getMonth() + 1) + '-' + begin.getDate()
				var end = new Date(this.endtime)
				this.endtime = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()
				if(this.begintime == 'NaN-NaN-NaN') {
					this.begintime = ''
				}
				if(this.endtime == 'NaN-NaN-NaN') {
					this.endtime = ''
				}
				telSearchRegist({
					tel: this.phone_number,
					type: 3,
					star_time: this.begintime,
					end_time: this.endtime,
					c_page: index
				}).then(res => {
					this.historyData = res.data.list.list;
					this.dataCount = res.data.list.count;
					var i = 1;
					this.historyData.forEach((item, index) => {
						if(item.area == '') {
							item.area = item.tel_address
						} else {
							item.area = item.area
						}
						item['numid'] = i++
					})
				})
        document.getElementsByClassName("pad")[0].scrollTop = 0;
			},
			searchTodayRegister() {
        if(this.timeInput[0] == null || this.timeInput[1] == null){
          this.timeInput = ""
        }
				var begin = new Date(this.begintime)
				this.begintime = begin.getFullYear() + '-' + (begin.getMonth() + 1) + '-' + begin.getDate()
				var end = new Date(this.endtime)
				this.endtime = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()
				if(this.begintime == 'NaN-NaN-NaN') {
					this.begintime = ''
				}
				if(this.endtime == 'NaN-NaN-NaN') {
					this.endtime = ''
				}
				this.dataCount = 0;
				this.historyData = []
				telSearchRegist({
					tel: this.phone_number,
					type: 3,
					star_time: this.begintime,
					end_time: this.endtime,
					c_page: 1
				}).then(res => {
					if(res.retcode == 2000) {
						var i = 1;
						this.dataCount = res.data.list.count;
						this.historyData = res.data.list.list;
						this.historyData.forEach((item, index) => {
							if(item.area == '') {
								item.area = item.tel_address
							} else {
								item.area = item.area
							}
							item['numid'] = i++
						})

					} else {
						alert(res.msg)
					}
          this.hello_curr = 1
				})
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
