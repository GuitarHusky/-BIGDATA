<template>
	<div class="total-info pad">
		<!-- <div class="crumbs_me">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem>概况</BreadcrumbItem>
        <BreadcrumbItem to="/trend">整体趋势</BreadcrumbItem>
        <BreadcrumbItem>每日下载次数详情</BreadcrumbItem>
      </Breadcrumb>
    </div> -->
		<Row>
			<Col span="24">
			<div class="table-title tableStyle titleStyle">
				<span>每日下载次数详情</span>
        <Button type="primary" @click="goBack" style="float:right;margin-right:50px;">返回</Button>
			</div>
			<!-- <Table border :columns="historyColumns" :data="historyData"></Table> -->
      <i-table :columns="historyColumns" :data="historyData" size="large"></i-table>
			</Col>
		</Row>
		<div style="margin: 10px 10% 20px 0;overflow: hidden">
			<div style="float: right;">
				<Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator ></Page>
			</div>
		</div>
	</div>
</template>

<script>
	import { getNumberOfDownloadsPerDayToDetail } from '../../../api/api'
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
          align: "center"
				}, {
					title: '设备号',
					key: 'device',
          align: "center"
				}, {
					title: '省份',
					key: 'PROVINCE',
          sortable: true,
          align: "center"
				}, {
					title: '城市',
					key: 'CITY',
          sortable: true,
          align: "center"
				}, {
					title: '区',
					key: 'AREA',
          sortable: true,
          align: "center"
				}, {
					title: '蛋鸡管家版本号',
					key: 'cur_version',
          sortable: true,
          align: "center"
				}, {
					title: '手机型号',
					key: 'phone_model',
          align: "center"
				}, {
					title: '手机类型	',
					key: 'phone_model_type',
          align: "center"
				}, {
					title: '下载时间	',
					key: 'downloadtime',
					width:180,
          align: "center"
				}],
				historyData: [],
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
				this.dataCount = parseInt(this.$route.params.down_value);
				getNumberOfDownloadsPerDayToDetail({
					date_time: this.$route.params.down_time,
					page: 1,
					currentPage: this.pageSize
				}).then(res => {
					this.historyData = res.result
					var num = 1;
					res.result.forEach((item, index) => {
						item['numid'] = num++
					})
				})
			},
			changepage(index) {
				this.dataCount =  parseInt(this.$route.params.down_value);
				getNumberOfDownloadsPerDayToDetail({
					date_time: this.$route.params.down_time,
					page: index,
					currentPage: this.pageSize
				}).then(res => {
					this.historyData = res.result
					var num = 1;
					res.result.forEach((item, index) => {
						item['numid'] = num++
					})
				})
        document.getElementsByClassName("pad")[0].scrollTop = 0;
			}
		}
	}
</script>

<style scoped>
	.ivu-table-border td,
	.ivu-table-border th {
		text-align: center;
    border-left: 0px;
	}
  .ivu-col-offset-2 {
    margin-left: 0;
  }
</style>
