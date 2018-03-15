<template>
	<div class="pad">
		<!-- <div class="crumbs_me">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem>留存分析</BreadcrumbItem>
        <BreadcrumbItem to="/useranalyse">新用户分析</BreadcrumbItem>
      </Breadcrumb>
    </div> -->
		<Row>
			<Col span="24" class="table-title">单位时间内用户访问量趋势</Col>
		</Row>

		<Row>
			<Col span="24" class="table-bor">
			<div style="height: 300px;width: 100%;padding: 0;" id="download-analyse-hour"></div>
			</Col>
		</Row>

		<Row>
			<Col span="24" class="table-title tableStyle titleStyle" style="border-bottom: none;">当日用户注册明细</Col>
		</Row>

		<Row>
			<Col span="24">
			<!-- <Table border :columns="historyColumns" :data="historyData"></Table> -->
      <i-table :columns="historyColumns" :data="historyData" size="large"></i-table>
			<div style="margin: 10px 5% 20px 0;overflow: hidden">
				<div style="float: right;">
					<Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator></Page>
				</div>
			</div>
			</Col>
		</Row>
	</div>
</template>

<script>
	import { getRetained, getTodayRegisterDetail } from '../../api/api'
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
				}, {
					title: '注册手机号',
					key: 'mobile_phone',
          align: "center"
				}, {
					title: '号码归属地',
					key: 'num_city',
          sortable: true,
          align: "center"
				}, {
					title: '真实姓名',
					key: 'real_name',
          align: "center"
				}, {
					title: '鸡场地址',
					key: 'chicken_city',
          sortable: true,
          align: "center"
				}, {
					title: '鸡场规模',
					key: 'account',
          align: "center"
				}, {
					title: '注册时间',
					key: 'create_time',
					width:180,
          align: "center"
				}, {
					title: '信息完整度',
					key: 'Integrity',
          align: "center"
				}],
				historyData: [],
				user_time_count: [], //获取单位时间内用户访问量趋势纵坐标
				user_time_hour: [], //获取单位时间内用户访问量趋势的横坐标
			}
		},
		mounted() {
			this.getNewUserTime();
			this.getNewUserRegister();
      this.$store.state.modalStatus = true
      this.$store.state.behaviorStatus = false
		},
		methods: {
			draWbatter() {
				var myChart = this.$echarts.init(document.getElementById('download-analyse-hour'));
				var colors = ['#57b663', '#d14a61', '#675bba'];
				myChart.setOption({
					color: colors,
					 tooltip: {
           trigger: 'axis',
           axisPointer: {
           type: 'line'
           }
          },
          grid: {
            top: 30,
            bottom: 30,
            left: 50,
            right: 50,
          },
					xAxis: [{
						type: 'category',
						boundaryGap: false,
						name: "时间",
						axisTick: {
							alignWithLabel: true
						},
						axisLine: {
							onZero: true,
							lineStyle: {
                /*color: '#57b663'*/
								color: 'rgb(56, 153, 254)'
							}
						},
						data: this.user_time_hour,
            splitLine: {
              show: true,
              lineStyle: {
                color: '#f5f7f9'
              }
            }
					}],
					yAxis: [{
						type: 'value',
						name: "访问次数",
            splitLine: {
              show: true,
              lineStyle: {
                color: '#f5f7f9'
              }
            }
					}],
					series: [{
						name: '每小时使用量',
						type: 'line',
						smooth: true,
            symbol: 'circle', //拐点样式
            symbolSize: 10, //拐点大小
						data: this.user_time_count,
						itemStyle: {
							normal: {
								areaStyle: {
									//									type: 'default',
                  /*color: ['rgba(87,182,99,1)', 'rgba(87,182,99,0.1)']*/
									/*color: ['rgba(56, 153, 254,1)', 'rgba(56, 153, 254,0.1)']*/
                  type: 'default'
								},
                /*color: 'rgba(87,182,99,0.8)',*/
								color: 'rgb(232,245,253)',
								lineStyle: {
                  /*color: '#57b663'*/
									color: '#2d8cf0'
								},
                borderColor:'#2d8cf0'
							}
						}
					}]
				});
			},
			changepage(index) {
				this.$Spin.show();
				getTodayRegisterDetail({
					page: index
				}).then(res => {
					this.$Spin.hide();
					this.dataCount = res.result.total;
					this.historyData = res.result.data;
					var num = 1;
					this.historyData.forEach((item, index) => {
						item.numid = num;
						num++;
            if(item.real_name == '' || item.real_name == null){
              item.real_name = '暂无'
            }
            if(item.account == '' || item.account == null){
              item.account = '不详'
            }
						if(item.area == '') {
							item.num_city = item.number_attribution + item.number_attribution_city
							item.chicken_city = item.number_attribution + item.number_attribution_city
						} else {
							item.num_city = item.number_attribution + item.number_attribution_city
							item.chicken_city = item.area
						}
					})
				})
        document.getElementsByClassName("pad")[0].scrollTop = 0;
			},
			//获取留存分析->新用户分析->单位时间内用户访问量趋势的数据
			getNewUserTime() {
				this.$Spin.show();
				getRetained().then(res => {
					this.$Spin.hide();
					res.result.forEach((item, index) => {
						this.user_time_count.push(item.count);
						this.user_time_hour.push(item.hour);
					})
					this.draWbatter();
				})
			},
			//获取留存分析->新用户分析->当日注册用户明细
			getNewUserRegister() {
				this.$Spin.show();
				getTodayRegisterDetail({
					page: 1
				}).then(res => {
					this.$Spin.hide();
					this.dataCount = res.result.total;
					this.historyData = res.result.data;
					var num = 1;
					this.historyData.forEach((item, index) => {
						item.numid = num;
						num++;
            if(item.real_name == '' || item.real_name == null){
              item.real_name = '暂无'
            }
            if(item.account == '' || item.account == null){
              item.account = '不详'
            }
						if(item.area == '') {
							item.num_city = item.number_attribution + item.number_attribution_city
							item.chicken_city = item.number_attribution + item.number_attribution_city
						} else {
							item.num_city = item.number_attribution + item.number_attribution_city
							item.chicken_city = item.area
						}
					})
				})
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

  .ivu-col-offset-2 {
    margin-left: 0;
  }

  .titleStyle {
    padding: 10px 20px;
    color: #464c5b;
    font-weight: 600;
  }

  .table-title {
    margin-top: 10px;
  }
</style>
