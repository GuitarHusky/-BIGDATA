<template>
	<div class="total-info pad">
		<!-- <div class="crumbs_me">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem>概况</BreadcrumbItem>
        <BreadcrumbItem to="/trend">整体趋势</BreadcrumbItem>
        <BreadcrumbItem to="/yesread">昨日阅读文章数 </BreadcrumbItem>
      </Breadcrumb>
    </div> -->
		<Row>
			<Col span="24">
			<div class="table-title  tableStyle">
				昨日阅读文章数
        <Button type="primary" @click="goBack" style="float:right;margin-right:50px;">返回</Button>
			</div>
			<!-- <Table border :columns="historyColumns" :data="historyData"></Table> -->
      <i-table :columns="historyColumns" :data="historyData" size="large"></i-table>
			</Col>
		</Row>
		<div style="margin: 10px 5% 20px 0;overflow: hidden">
			<div style="float: right;">
				<Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator></Page>
			</div>
		</div>
	</div>
</template>
<script>
	import { readAndActiveList, getTodayArticleCount } from '../../../api/api'
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
            align: "center"
					}, {
						title: '阅读时间',
						key: 's_date',
            align: "center"
					},
					{
						title: '阅读量',
						key: 'views',
            sortable: true,
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
				getTodayArticleCount({
					page: 1,
					currentPage: this.pageSize
				}).then(res => {
					this.historyData = res.result.data;
					this.dataCount = res.result.count;
					var i = 1;
					this.historyData.forEach((item, index) => {
						item['numid'] = i++
					})
				})
			},
			changepage(index) {
				getTodayArticleCount({
					page: index,
					currentPage: this.pageSize
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
    border-left: 0;
	}

	.total-info {
		margin-top: 20px;
	}

  .ivu-col-offset-2 {
    margin-left: 0;
  }
</style>
