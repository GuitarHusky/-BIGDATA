<template>
	<div class="total-info pad">
		<!-- <div class="crumbs_me">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem>概况</BreadcrumbItem>
        <BreadcrumbItem to="/trend">整体趋势</BreadcrumbItem>
        <BreadcrumbItem to="/todaydownload">今日下载量</BreadcrumbItem>
      </Breadcrumb>
    </div> -->
		<Row>
			<Col span="24">
				<div class="table-title tableStyle">
					今日下载量
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
	import { downloadList } from '../../../api/api'
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
				total_down_list: [], //总数据存放的地方
			}
		},
		methods: {
      goBack(){
        window.history.back()
      },
			getDownloadDate() {
				downloadList().then(res => {
					this.historyData = res.data.today_down_list.list;
					this.dataCount = res.data.today_down_list.count;
					var i = 1;
					this.historyData.forEach((item,index)=>{
						if(item.phone_model_type=='1'){
							item.phone_model_type='安卓'
						}else{
							item.phone_model_type='IOS'
						}
						item['numid'] = i++
					})
				})
			},
			changepage(index) {
				downloadList({
					c_page:index
				}).then(res => {
					this.historyData = res.data.today_down_list.list;
					this.dataCount = res.data.today_down_list.count;
					var i = 1;
					this.historyData.forEach((item,index)=>{
						if(item.phone_model_type=='1'){
							item.phone_model_type='安卓'
						}else{
							item.phone_model_type='苹果'
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
	}
	.total-info {
		margin-top: 20px;
	}
  .ivu-col-offset-2 {
    margin-left: 0;
  }
</style>
