	<template>
	<!--注册用户分布-->
	<div class="RegisterDistributionBox pad">
		<!-- <div class="crumbs_me">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem> 用户分析</BreadcrumbItem>
        <BreadcrumbItem to="/registerdis">注册用户分布</BreadcrumbItem>
      </Breadcrumb>
    </div> -->
		<div id="registerchain" style="width: 100%;height: 800px;"></div>
	</div>
</template>

<script>
	import 'echarts/map/js/china'
	import { getRegisterUserDistribution } from '../../api/api'
  import DistributionInfo from '@/views/userdata/info/distribution-info'
	export default {
		data() {
			return {
				register_list: []
			}
		},
		mounted() {
			this.getRegisterCity();
			this.drawRegister();

      this.$store.state.modalStatus = true
      this.$store.state.behaviorStatus = false
		},
		methods: {
			//用户分析->注册用户分布->注册用户地理分布数据
			getRegisterCity() {
				getRegisterUserDistribution().then(res => {
					res.result.forEach((item, index) => {
						this.register_list.push({
							name: item.name,
							value: item.count
						})
					})
					this.drawRegister();
				})
			},
			drawRegister() {
				var myCharts = this.$echarts.init(document.getElementById('registerchain'));
				var _this=this
				myCharts.on('click', function(pa) {
					console.log(pa.data.name)
					_this.$router.push('/distributioninfo/'+pa.data.name)
				})
				myCharts.setOption({
					title: {
						text: '注册用户地理分布',
						x: 'center'
					},
					tooltip: {
						trigger: 'item'
					},
					legend: {
						orient: 'vertical',
						x: 'left',
					},
					dataRange: {
						x:200,
						y:600,
						splitList: [{
								start: 2000,
								/*color: 'rgb(177,44,139)'*/
                color: "#d9c633"
							}, {
								start: 1500,
								end: 2000,
								/*color: 'rgba(255,0,0,0.8)'*/
                color: "#4579c8"
							},
							{
								start: 900,
								end: 1500,
								/*color: 'rgb(244,101,35)'*/
                color: "#3f90d8"
							},
							{
								start: 300,
								end: 1000,
								/*color: 'rgb(248,147,31)'*/
                color:"#3f90d8"
							},
							{
								start: 200,
								end: 300,
								/*color: 'rab(254,242,0)'*/
                color: "#47c4d7"
							},
							{
								start: 10,
								end: 200,
								/*color: 'rgb(140,197,64)'*/
                color: "#4b6dcf"
							},
							{
								end: 10,
								/*color: 'rgb(9,179,205)'*/
                color: "#4ee096"
							}
						],
					},
					roamController: {
						show: true,
						x: 'right',
						mapTypeControl: {
							'china': true
						}
					},
					series: [{
						name: '注册用户数',
						type: 'map',
						mapType: 'china',
						roam: false,
						itemStyle: {
							normal: {
								label: {
									show: true,
									borderColor: 'rgba(100,149,237,1)'
								}
							},
							emphasis: {
								borderWidth: 2,
								borderColor: '#fff',
								color: '#32cd32',
								label: {
									show: true
								}
							}
						},
						data: this.register_list
					}]
				});
			}
		}
	}
</script>

<style scoped>
  .RegisterDistributionBox{
    margin-top: 30px;
  }
  .crumbs_me {
    margin-left: 35px;
  }
</style>
