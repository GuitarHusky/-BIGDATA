<template>
	<div class="total-info pad">
		<!-- <div class="crumbs_me">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem>概况</BreadcrumbItem>
        <BreadcrumbItem to="/trend">整体趋势</BreadcrumbItem>
        <BreadcrumbItem to="/yesuserpv">昨日活跃用户(PV) </BreadcrumbItem>
      </Breadcrumb>
    </div> -->
		<Row>
			<Col span="24">
				<div class="table-title  tableStyle">
				昨日活跃用户(PV)
				<i-input placeholder="这里输入正确的手机号" v-model='keywode' style="width: 200px;margin: 0 20px 0 40px;"></i-input>
				<Button type="primary" @click="sercah">搜索</Button>
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
	import { readAndActiveList,getTodayActiveUser } from '../../../api/api'
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
						title: '手机号',
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
						title: '活跃地址',
						key: 'address',
            sortable: true,
            align: "center"
					},
					{
						title: '手机型号',
						key: 'model',
            align: "center"
					},{
						title: '手机系统版本',
						key: 'version',
            align: "center"
					},{
						title: '蛋鸡管家版本',
						key: 'cur_version',
            align: "center"
					},{
						title: '活跃时间',
						key: 'action_time',
						width:180,
            align: "center"
					}
				],
				historyData: [],
				total_down_list: [], //总数据存放的地方
				keywode:'',
				hello_curr:1
			}
		},
		methods: {
      goBack(){
        window.history.back()
      },
			getDownloadDate() {
				this.$Spin.show();
				getTodayActiveUser({
					page:1,
					currentPage: this.pageSize,
					keyword:this.keywode
				}).then(res => {
					this.$Spin.hide();
					this.historyData = res.result.data;
					this.dataCount = res.result.count;
					var i = 1;
					this.historyData.forEach((item, index) => {
						if(item.number_attribution_city==null || item.number_attribution_city==''){
							item.number_attribution_city='不详'
						}
						if(item.number_attribution==null || item.number_attribution==""){
							item.number_attribution='不详'
						}
            if(item.mobile_phone == null || item.mobile_phone == ""){
              item.mobile_phone='不详'
            }
            if(item.tel_address == null || item.tel_address == ""){
              item.tel_address='不详'
            }
            if(item.cur_version == null || item.cur_version == ""){
              item.cur_version='不详'
            }
						if(item.province==null || item.province==""){
							item.province='不详'
						}
						if(item.city==null || item.city==""){
							item.city='不详'
						}
						if(item.a_area==null || item.a_area==""){
							item.a_area='不详'
						}
						item['numid'] = i++
						if(item.username==null || item.username==""){
							item.username='非注册用户'
						}
					})
				})
			},
			changepage(index) {
        this.$Spin.show();
				getTodayActiveUser({
					page:index,
					currentPage: this.pageSize,
					keyword:this.keywode
				}).then(res => {
          this.$Spin.hide();
					this.historyData = res.result.data;
					this.dataCount = res.result.count;
					var i = 1;
					this.historyData.forEach((item, index) => {
						if(item.number_attribution_city==null || item.number_attribution_city==''){
              item.number_attribution_city='不详'
            }
            if(item.number_attribution==null || item.number_attribution==""){
              item.number_attribution='不详'
            }
            if(item.mobile_phone == null || item.mobile_phone == ""){
              item.mobile_phone='不详'
            }
            if(item.tel_address == null || item.tel_address == ""){
              item.tel_address='不详'
            }
            if(item.cur_version == null || item.cur_version == ""){
              item.cur_version='不详'
            }
            if(item.province==null || item.province==""){
              item.province='不详'
            }
            if(item.city==null || item.city==""){
              item.city='不详'
            }
            if(item.a_area==null || item.a_area==""){
              item.a_area='不详'
            }
            item['numid'] = i++
            if(item.username==null || item.username==""){
              item.username='非注册用户'
            }
					})
				})
        document.getElementsByClassName("pad")[0].scrollTop = 0;
			},
			sercah(){
        this.$Spin.show();
        if(this.phone_number == null){
          this.phone_number = ""
        }
				getTodayActiveUser({
					page:1,
					currentPage: this.pageSize,
					keyword:this.keywode
				}).then(res => {
          this.$Spin.hide();
					this.hello_curr=1
					this.historyData = res.result.data;
					this.dataCount = res.result.count;
					var i = 1;
					this.historyData.forEach((item, index) => {
						if(item.number_attribution_city==null || item.number_attribution_city==''){
              item.number_attribution_city='不详'
            }
            if(item.number_attribution==null || item.number_attribution==""){
              item.number_attribution='不详'
            }
            if(item.mobile_phone == null || item.mobile_phone == ""){
              item.mobile_phone='不详'
            }
            if(item.tel_address == null || item.tel_address == ""){
              item.tel_address='不详'
            }
            if(item.cur_version == null || item.cur_version == ""){
              item.cur_version='不详'
            }
            if(item.province==null || item.province==""){
              item.province='不详'
            }
            if(item.city==null || item.city==""){
              item.city='不详'
            }
            if(item.a_area==null || item.a_area==""){
              item.a_area='不详'
            }
            item['numid'] = i++
            if(item.username==null || item.username==""){
              item.username='非注册用户'
            }
					})
				})
			}
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
