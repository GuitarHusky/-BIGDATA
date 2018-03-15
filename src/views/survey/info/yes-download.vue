<template>
	<div class="total-info pad">
		<!-- <div class="crumbs_me">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem>概况</BreadcrumbItem>
        <BreadcrumbItem to="/trend">整体趋势</BreadcrumbItem>
        <BreadcrumbItem to="/yesdownload">昨日下载量</BreadcrumbItem>
      </Breadcrumb>
    </div> -->
		<Row>
			<Col span="24">
			<div class="table-title tableStyle">
				昨日下载量
        <a href="https://data.danjiguanjia.com/api/v1/yes_down_excel"><Button type="primary" style="margin-left:30px;text-align:center;width:56px;height:32px;padding:0;padding-top:5px;"><Icon type="arrow-down-a" size="23"></Icon></Button></a>
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
	import { downloadList } from '../../../api/api'
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
						title: '设备号',
						key: 'device',
            align: "center"
					},
					{
						title: '省份',
						key: 'province',
            sortable: true,
            align: "center"
					},
					{
						title: '城市',
						key: 'city',
            sortable: true,
            align: "center"
					},
					{
						title: '区',
						key: 'area',
            sortable: true,
            align: "center"
					},
					{
						title: '蛋鸡管家版本号',
						key: 'cur_version',
            sortable: true,
            align: "center"
					},
					{
						title: '手机型号',
						key: 'phone_model',
            align: "center"
					},
					{
						title: '手机类型',
						key: 'phone_model_type',
            align: "center"
					},
					{
						title: '下载时间',
						key: 'downloadtime',
						width:180,
            align: "center"
					}
				],
				historyData: [],
			}
		},
		methods: {
      goBack(){
        window.history.back()
      },
			getDownloadDate() {
				downloadList().then(res => {
					this.historyData = res.data.yes_down_list.list;
					this.dataCount = res.data.yes_down_list.count;
					var i = 1;
					this.historyData.forEach((item, index) => {
						if(item.phone_model_type == '1') {
							item.phone_model_type = '安卓'
						} else {
							item.phone_model_type = 'IOS'
						}
						item['numid'] = i++
					})
				})
			},
			changepage(index) {
				downloadList({
					c_page: index
				}).then(res => {
					this.historyData = res.data.yes_down_list.list;
					this.dataCount = res.data.yes_down_list.count;
					var i = 1;
					this.historyData.forEach((item, index) => {
						if(item.phone_model_type == '1') {
							item.phone_model_type = '安卓'
						} else {
							item.phone_model_type = '苹果'
						}
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
