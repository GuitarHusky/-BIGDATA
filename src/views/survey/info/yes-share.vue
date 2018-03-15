<template>
	<div class="total-info pad">
		<!-- <div class="crumbs_me">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem>概况</BreadcrumbItem>
        <BreadcrumbItem to="/trend">整体趋势</BreadcrumbItem>
        <BreadcrumbItem to="/yesshare">昨日分享人数 </BreadcrumbItem>
      </Breadcrumb>
    </div> -->
		<Row>
			<Col span="24">
			<div class="table-title  tableStyle">
				昨日分享人数
				<i-input placeholder="这里输入正确的手机号" v-model='phone_number' style="width: 200px;margin: 0 20px 0 40px;"></i-input>
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
	import { telSearchSignAndShare } from '../../../api/api'
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
            title: '分享时间',
            key: 'time',
            width:180,
            align: "center"
          }
        ],
				historyData: [],
				total_down_list: [], //总数据存放的地方
				phone_number: '',
				hello_curr: 1
			}
		},
		methods: {
      goBack(){
        window.history.back()
      },
			search() {
				telSearchSignAndShare({
					tel: this.phone_number,
					type: 5,
					star_time: '',
					end_time: '',
					c_page: 1
				}).then(res => {
					this.historyData = res.data.list.list;
					this.dataCount = res.data.list.count;
					var i = 1;
					this.hello_curr = 1
					this.historyData.forEach((item, index) => {
						item.Province = item.Province + item.City
						item.City = item.Province
						item.number_attribution = item.number_attribution + item.number_attribution_city
						item['numid'] = i++
					})
				})
			},
			getDownloadDate() {
				telSearchSignAndShare({
					tel: this.phone_number,
					type: 5,
					star_time: '',
					end_time: '',
					c_page: 1
				}).then(res => {
					console.log(res)
					this.historyData = res.data.list.list;
					this.dataCount = res.data.list.count;
					var i = 1;
					this.historyData.forEach((item, index) => {
						item.Province = item.Province + item.City
						item.City = item.Province
						item['numid'] = i++
					})
				})
			},
			changepage(index) {
				telSearchSignAndShare({
					tel: this.phone_number,
					type: 5,
					star_time: '',
					end_time: '',
					c_page: index
				}).then(res => {
					this.historyData = res.data.list.list;
					this.dataCount = res.data.list.count;
					var i = 1;
					this.historyData.forEach((item, index) => {
						item.Province = item.Province + item.City
						item.City = item.Province
						item.number_attribution = item.number_attribution + item.number_attribution_city
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
