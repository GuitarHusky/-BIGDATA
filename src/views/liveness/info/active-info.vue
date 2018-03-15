<template>
	<div class="pad">
		<!-- <div class="crumbs_me">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem>活跃度</BreadcrumbItem>
        <BreadcrumbItem to="/activeuser">活跃用户</BreadcrumbItem>
        <BreadcrumbItem>活跃用户趋势详情</BreadcrumbItem>
      </Breadcrumb>
    </div> -->
		<Row>
			<Col span="24">
			<div class="table-title titleStyle tableStyle">
				<span>活跃用户趋势详情</span>
				<i-input placeholder="这里输入关键字" v-model='phone_number' style="width: 200px;margin: 0 20px 0 40px;"></i-input>
				<Button type="primary" @click="searchRegisterUser">搜索</Button>
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
	import { getActiveUserToDay } from '../../../api/api'
	export default {
		data() {
			return {
				dataCount: 0,
				// 每页显示多少条
				pageSize: 20,
				historyColumns: [{
					title: '序号',
					key: 'numid',
					width: 100,
          sortable: true,
          align: "center"
				}, {
					title: '用户名称',
					key: 'username',
          sortable: true,
          align: "center"
				}, {
					title: '手机号',
					key: 'mobile_phone',
          sortable: true,
          align: "center"
				}, {
					title: '号码归属地',
					key: 'tel_address',
          sortable: true,
          align: "center"
				}, {
					title: '活跃地址',
					key: 'area',
          sortable: true,
          align: "center"
				}, {
					title: '手机型号',
					key: 'model',
          sortable: true,
          align: "center"
				}, {
					title: '设备号',
					key: 'device',
          sortable: true,
          align: "center"
				}, {
					title: '手机版本系统',
					key: 'version',
          sortable: true,
          align: "center"
				}, {
					title: '蛋鸡管家版本',
					key: 'cur_version',
          sortable: true,
          align: "center"
				}, {
					title: '活跃时间',
					key: 'time',
					width:180,
          sortable: true,
          align: "center"
				}],
				historyData: [],
				phone_number: '',
				hello_curr: 1
			}
		},
		mounted() {
			this.getDayDetail()
		},
		methods: {
      goBack(){
        window.history.back()
      },
			getDayDetail() {
				getActiveUserToDay({
					date_time: this.$route.params.active_time,
					currentPage: this.pageSize,
					keyword: this.phone_number,
					page: 1
				}).then(res => {
					this.dataCount = res.result.count
					this.historyData = res.result.data
					var num = 1;
					res.result.data.forEach((item, index) => {
						item['numid'] = num++
							item.area = item.province + item.city + item.area
					})
				})
			},
			changepage(index) {
				getActiveUserToDay({
					date_time: this.$route.params.active_time,
					currentPage:this.pageSize,
					keyword: this.phone_number,
					page: index
				}).then(res => {
					this.dataCount = res.result.count
					this.historyData = res.result.data
					var num = 1;
					res.result.data.forEach((item, index) => {
						item['numid'] = num++
							item.area = item.province + item.city + item.area
					})
				})
        document.getElementsByClassName("pad")[0].scrollTop = 0;
			},
			searchRegisterUser() {
				getActiveUserToDay({
					date_time: this.$route.params.active_time,
					currentPage: this.pageSize,
					keyword: this.phone_number,
					page: 1
				}).then(res => {
					this.hello_curr=1
					this.historyData = res.result.data
					this.dataCount = res.result.count
					var num = 1;
					res.result.data.forEach((item, index) => {
						item['numid'] = num++
							item.area = item.province + item.city + item.area
					})
				})
			}
		}
	}
</script>

<style scoped>
	.ivu-table-border td,
	.ivu-table-border th {
		text-align: center;
	}
</style>
