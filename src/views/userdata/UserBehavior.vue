<template>
  <div class="pad">
    <!-- <div class="crumbs_me">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem> 用户分析</BreadcrumbItem>
        <BreadcrumbItem to="/userbehavior">个人用户行为</BreadcrumbItem>
      </Breadcrumb>
    </div> -->
    <Row>
      <Col span="24">
      <div class="table-title" style="font-size:18px;">
        <span>个人用户行为</span>
      </div>
      </Col>
    </Row>
    <Row>
      <Col span="4" offset='2' style="margin-top: 20px;">
      <span class="user_number" style="color:rgb(56, 153, 254);">用户手机号: </span><br />
      <Input placeholder="请输入手机号" style="width: 60%;float: left;" v-model="ipone_number"></Input>
      <Button type="primary" style="margin-left: 10%;width: 20%;float: left;padding: 6px 0;" @click="searchUser">搜索</Button>
      </Col>
      <Col span="3" class="user_border register_time" offset='1'>
      <span class="user_number">注册时间</span> <br />
      <span class="user_number_bold">{{create_time}}</span>
      </Col>
      <router-link tag='div' :to="{ path:'/logintotal', query: { num: ipone_number} }">
        <Col span="3" class="user_border register_time" offset='1'>
        <span class="user_number">登录总天数</span> <br />
        <span class="user_number_bold">{{login_total}}</span>
        </Col>
      </router-link>
      <Col span="3" class="user_border register_time" offset='1'>
      <span class="user_number">最近登录时间</span> <br />
      <span class="user_number_bold">{{login_last}}</span>
      </Col>
      <router-link tag='span' :to="{ path:'/signtotal', query: {num: ipone_number} }">
        <Col span="3" class="user_border register_time" offset='1'>
        <span class="user_number">签到总次数</span> <br />
        <span class="user_number_bold">{{signin_total}}</span>
        </Col>
      </router-link>
    </Row>
    <Row style="margin-top: 30px;">
      <Col span="24">
      <Table border :columns="historyColumns" :data="historyData" size="large"></Table>
      </Col>
    </Row>
    <Row>
      <Col span="24">
      <!-- <el-carousel trigger="click" indicator-position="outside" arrow="hover" height="80px" style='text-align: center;padding-top: 20px;color: rgb(56, 153, 254);'>
      <el-carousel-item v-for="lists in list_data" :key="lists">
        <div class="demo-carousel" style="height:100px;padding-top:30px;font-size: 20px;">{{lists.TIME}} 在{{lists.address}}使用了{{lists.cur_version}}蛋鸡管家访问了{{lists.module}}</div>
      </el-carousel-item>
      </el-carousel> -->
      <Carousel autoplay v-model="value2" loop style='text-align: center;padding-top: 20px;color: rgb(56, 153, 254);'>
        <CarouselItem v-for="lists in list_data" :key="lists.address">
            <div class="demo-carousel" style="height:100px;padding-top:30px;font-size: 20px;">{{lists.TIME}} 在{{lists.address}}使用了{{lists.cur_version}}蛋鸡管家访问了{{lists.module}}</div>
        </CarouselItem>
    </Carousel>
      </Col>
    </Row>
    <!-- <Row style="margin-top: 10px;height:100px;width:100%;">
      <Col span="24" style="height:100px;width:100%;">
      <Carousel autoplay v-model="value2" loop height="100px" style='height: 100px;text-align: center;font-size: 20px;padding-top: 30px;color: #57b663;'>
        <CarouselItem v-for='(lists,index) in list_data' :key='index'>
          <div class="demo-carousel">{{lists.TIME}} 在{{lists.address}}使用了{{lists.cur_version}}蛋鸡管家访问了{{lists.module}}</div>
        </CarouselItem>
      </Carousel>
      </Col>
    </Row> -->
    <Row style="height:120px;margin-top:10px">
      <router-link tag='span' :to="{ path:'/productiontotal', query: {num: ipone_number} }">
        <Col span="4" offset="2" class="user_border register_time">
        <span class="user_number">生产效益总次数</span> <br />
        <span class="user_number_bold">{{brood_total}}</span>
        </Col>
      </router-link>
      <router-link tag='span' :to="{ path:'/batchtotal', query: {num: ipone_number} }">
        <Col span="4" offset="1" class="user_border register_time">
        <span class="user_number">建立栋舍数</span> <br />
        <span class="user_number_bold">{{batch_total}}</span>
        </Col>
      </router-link>
      <router-link tag='span' :to="{ path:'/froumtotal', query: {num: ipone_number} }">
        <Col span="4" offset="1" class="user_border register_time">
        <span class="user_number">论坛发帖次数</span> <br />
        <span class="user_number_bold">{{forum_total}}</span>
        </Col>
      </router-link>
      <router-link tag='span' :to="{ path:'/immunetotal', query: {num: ipone_number} }">
        <Col span="4" offset="1" class="user_border register_time">
        <span class="user_number">完成免疫总数</span> <br />
        <span class="user_number_bold">{{mianyi}}</span>
        </Col>
      </router-link>
      <router-link tag='span' :to="{ path:'/wheelday', query: {num: ipone_number} }">
        <Col span="4" offset="1" class="user_border register_time">
        <span class="user_number">大转盘使用天数</span> <br />
        <span class="user_number_bold">{{turntable_day}}</span>
        </Col>
      </router-link>
    </Row>
    <Row>
      <router-link tag='span' :to="{ path:'/mycoupontotal', query: {num: ipone_number} }">
        <Col span="4" offset='2' class="user_border register_time">
        <span class="user_number">我的优惠券</span> <br />
        <span class="user_number_bold">{{my_coupon}}</span>
        </Col>
      </router-link>
      <router-link tag='span' :to="{ path:'/myordertotal', query: {num: ipone_number} }">
        <Col span="4" offset="1" class="user_border register_time">
        <span class="user_number">我的订单</span> <br />
        <span class="user_number_bold">{{my_order}}</span>
        </Col>
      </router-link>
      <router-link tag='span' :to="{ path:'/offertotal', query: {num: ipone_number} }">
        <Col span="4" offset="1" class="user_border register_time">
        <span class="user_number">我的报价</span> <br />
        <span class="user_number_bold">{{my_price}}</span>
        </Col>
      </router-link>
      <router-link tag='span' :to="{ path:'/wheeltime', query: {num: ipone_number} }">
        <Col span="4" offset="1" class="user_border register_time">
        <span class="user_number">大转盘使用次数</span> <br/>
        <span class="user_number_bold">{{turntable_frequency}}</span>
        </Col>
      </router-link>
    </Row>
    <Row>
      <Col span="7" offset='2'>
      <div class="table-title mt">模块情况图表</div>
      </Col>
      <Col span="7" offset='1'>
      <div class="table-title mt">用户活跃情况图表</div>
      </Col>
      <Col span="7" offset='1'>
      <div class="table-title mt">资讯查看图表</div>
      </Col>
    </Row>
    <Row style="margin-bottom: 20px;">
      <Col span="7" offset='2' class="download-border">
      <div style="height: 300px;width:100%;padding: 0;text-align: center;" id="model"></div>
      </Col>
      <Col span="7" offset='1' class="download-border">
      <div style="height: 300px;width:100%;padding: 0;text-align: center;padding-bottom: -10px;" id="user_active"></div>
      </Col>
      <Col span="7" offset='1' class="download-border">
      <div style="height: 300px;width:100%;padding: 0;text-align: center;" id="new"></div>
      </Col>
    </Row>
  </div>
</template>

<script>
  import { oneUserAction, getUserLoginInfo, getUserSign, getBroodInfo, getBatchInfo, getCommunityInfo, myCoupon, orderInfo, myPrice, getWheelInfo, userViewModule, getWheelInfoDay, getNewsViewInfo, getImmuneInfo,getUserActionByHour } from '../../api/api'
  export default {
    data() {
      return {
        historyColumns: [{
          title: '账户信息  ',
          key: 'username',
          align: "center"
        }, {
          title: '真实姓名',
          key: 'real_name',
          align: "center"
        }, {
          title: '注册手机号',
          key: 'mobile_phone',
          align: "center"
        }, {
          title: '鸡场规模',
          key: 'account',
          align: "center"
        }, {
          title: '鸡场地址',
          key: 'area',
          align: "center"
        }, {
          title: '省份',
          key: 'number_attribution',
          align: "center"
        }, {
          title: '城市',
          key: 'number_attribution_city',
          align: "center"
        }, {
          title: '总积分',
          key: 'score',
          align: "center"
        }],
        ipone_number: this.$route.params.ipone_number,
        historyData: [],
        create_time: '', //注册时间
        login_total: '', //登录总天数
        login_last: '', //最后登录时间
        signin_total: '', //签到总次数
        brood_total: '', //生产效益总次数
        batch_total: '', //栋舍总数
        forum_total: '', //论坛发帖数量
        my_coupon: "", //我的优惠券数据
        my_order: "", //我的订单数据
        my_price: '', //我的报价
        turntable_day: '', //大转盘使用天数
        turntable_frequency: '', //大转盘使用次数
        mianyi: '', //免疫次数
        model_total: [],
        model_name: [],
        model_value: [],
        new_value: [],
        new_name: [],
        value2: 0,
        list_data:[],
        list_area:'',
        user_actice_time:[],
        user_actice_value:[]
      }
    },
    mounted(){
      this.getUserDetail1()
    },
    /*computed: {
    getiphoneNumber() {
    return this.$route.params.ipone_number;
    }
    },*/
    /*watch: {
      '$route': 'getUserDetail',
      getiphoneNumber(val) {
      this.ipone_number = val*/
      /*this.getUserDetail()*/
      /*this.$router.go(0)
      }
    },*/
   // updated(){
   //    this.ipone_number = this.$store.state.ipone_number
   //    this.searchUser()
   //    this.$router.go(0)
   //  },
    methods: {
      //用户活跃情况图表
      draWbatter() {
        var myChart = this.$echarts.init(document.getElementById('user_active'));
        var colors = ['#5793f3', '#d14a61', '#675bba'];
        myChart.setOption({
          color: colors,
          tooltip: {
           trigger: 'axis',
           axisPointer: {
           type: 'line'
           }
          },
          legend: {
            data: ['用户活跃情况']
          },
          grid: {
            top: 30,
            bottom: 50,
            left:60,
            right:50
          },
          xAxis: [{
            type: 'category',
            /*name:"次数",*/
            name:"小时",
            boundaryGap:false,
            axisTick: {
              alignWithLabel: true
            },
            /*axisLine: {
              onZero: true,
              lineStyle: {
                color: '#57b663'
                color: 'rgb(56, 153, 254)'
              }
            },*/
            axisLine: {
              onZero: true,
              lineStyle: {
                color: '#000'
              }
            },
            data: this.user_actice_time,
            splitLine: {
              show: true,
              lineStyle: {
                color: '#f5f7f9'
              }
            }
          }],
          yAxis: [{
            type: 'value',
            /*name:"小时",*/
            name:"次数",
            splitLine: {
              show: true,
              lineStyle: {
                color: '#f5f7f9'
              }
            }
          }],
          series: [{
            name: '用户活跃情况',
            type: 'line',
            smooth: true,
            data: this.user_actice_value,
            itemStyle: {
              normal: {
                areaStyle: {
                  //                  type: 'default',
                  /*color: ['rgba(87,182,99,1)', 'rgba(87,182,99,0.1)']*/
                  /*color: ['rgba(56, 153, 254, 1)', 'rgba(56, 153, 254, 0.1)']*/
                  type: 'default'
                },
                /*color: 'rgba(87,182,99,0.8)',*/
                color: 'rgb(232,245,253)',
                /*lineStyle: {
                  color: '#57b663',
                  color: 'rgb(56, 153, 254)',
                }*/
                lineStyle: {
                  color: '#2d8cf0'
                },
                borderColor:'#2d8cf0'
              }
            }
          }]
        });
      },
      drawNew() {
        var myChart = this.$echarts.init(document.getElementById('new'));
        myChart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            left: 'center',
            data: this.new_value
          },
          series: [{
            name: '访问量',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.new_name,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }],
          color: ['rgb(56, 153, 254)','#57b663', '#E3A83F','rgba(0,0,0,0.3)']
          //          color: ['rgba(255,0,0,0.5)', '#57b663', 'yellow','rgba(0,0,0,0.3)']
        })
      },
      drawUmodel() {
        var myChart = this.$echarts.init(document.getElementById('model'));
        myChart.setOption({
          /*color: ['#57b663'],*/
          color: ['rgb(56, 153, 254)'],
          tooltip: {
            trigger: 'axis',
          },
          grid: {
            top: 50,
            bottom: 50,
            left:50,
            right:65
          },
          xAxis: [{
            type: 'category',
            name:"模块名称",
            data: this.model_name,
            axisTick: {
              alignWithLabel: true
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#f5f7f9'
              }
            }
          }],
          yAxis: [{
            type: 'value',
            name:"数量",
            splitLine: {
              show: true,
              lineStyle: {
                color: '#f5f7f9'
              }
            }
          }],
          series: [{
            name: '人数',
            type: 'bar',
            barWidth: '60%',
            data: this.model_value
          }]
        })
      },
      getUserDetail1() {
        this.phone_number = this.$store.state.ipone_number
        this.create_time = ''
        this.login_total = ''
        this.login_last = ''
        this.signin_total = ''
        this.brood_total = ''
        this.batch_total = ''
        this.forum_total = ''
        this.my_coupon = ""
        this.my_order = ""
        this.my_price = ''
        this.turntable_day = ''
        this.turntable_frequency = ''
        this.mianyi = '',
        this.model_total = []
        this.model_name = []
        this.model_value = []
        this.new_value = []
        this.new_name = []
        this.user_actice_time = []
        this.user_actice_value = []
        this.$Spin.show();
        this.list_data=[];
        this.list_area=""
        this.historyData = []
        oneUserAction({
          tel: this.ipone_number
        }).then(res => {
          if(res.msg == "该用户未注册"){
            this.$Message.info('该用户未注册')
          }
          this.$Spin.hide();
          this.create_time = res.data.list.create_time;
          this.historyData.push({
            'username': res.data.list.username,
            'real_name': res.data.list.real_name,
            'mobile_phone': res.data.list.mobile_phone,
            'account': res.data.list.account,
            'area': res.data.list.area,
            'number_attribution': res.data.list.number_attribution,
            'number_attribution_city': res.data.list.number_attribution_city,
            'score': res.data.list.score
          })
          this.list_data=res.data.list.view;
          this.list_area=res.data.list.area;
        })
        getUserLoginInfo({
          tel: this.ipone_number,
          star_time: '',
          end_time: ''
        }).then(res => {
          this.login_total = res.data.login_hour[0].c;
          this.login_last = res.data.login_last_time;
        })
        getUserSign({
          tel: this.ipone_number,
          star_time: '',
          end_time: ''
        }).then(res => {
          this.signin_total = res.data.num;
        })
        getBroodInfo({
          tel: this.ipone_number,
          star_time: '',
          end_time: '',
          type: 0
        }).then(res => {
          this.brood_total = res.data.count
        })
        getBatchInfo({
          tel: this.ipone_number,
          star_time: '',
          end_time: '',
          type: 0
        }).then(res => {
          this.batch_total = res.data.count
        })
        getCommunityInfo({
          tel: this.ipone_number,
          star_time: '',
          end_time: '',
        }).then(res => {
          this.forum_total = res.data.communityInfo.count
        })
        myCoupon({
          tel: this.ipone_number,
          star_time: '',
          end_time: '',
        }).then(res => {
          this.my_coupon = res.data.couponList.num;
        })
        orderInfo({
          tel: this.ipone_number,
          star_time: '',
          end_time: '',
        }).then(res => {
          this.my_order = res.data.orderList.num;
        })
        myPrice({
          tel: this.ipone_number,
          star_time: '',
          end_time: '',
          type: 0
        }).then(res => {
          this.my_price = res.data.count
        })
        getWheelInfo({
          tel: this.ipone_number,
          star_time: '',
          end_time: '',
        }).then(res => {
          this.turntable_frequency = res.data.wheelNumInfo.num
        })
        getWheelInfoDay({
          tel: this.ipone_number,
          star_time: '',
          end_time: '',
        }).then(res => {
          this.turntable_day = res.data.wheelDayInfo.num
        })
        userViewModule({
          tel: this.ipone_number
        }).then(res => {
          this.model_total = res.data.data.slice(0, 5)
          this.model_total.forEach((item, index) => {
            this.model_name.push(item.module_name)
            this.model_value.push(item.cu)
          })
          this.drawUmodel();
        })
        getNewsViewInfo({
          tel: this.ipone_number
        }).then(res => {

          res.data.cat.forEach((item, index) => {
            this.new_name.push({
              'value': item.c,
              "name": item.title
            })
            this.new_value.push(item.title)
          })
          this.drawNew();
        })
        getImmuneInfo({
          tel: this.ipone_number,
          star_time: '',
          end_time: '',
        }).then(res => {
          this.mianyi = res.data.count;
        })
        getUserActionByHour({
          tel: this.ipone_number,
        }).then(res=>{
          res.data.list.forEach((item,index)=>{
            this.user_actice_time.push(item.create_hour)
            this.user_actice_value.push(item.cu)
          })
          this.draWbatter();
        })
      },
      getUserDetail2() {
        this.$store.state.ipone_number = this.phone_number
        this.$route.params.ipone_number = this.phone_number
        this.create_time = ''
        this.login_total = ''
        this.login_last = ''
        this.signin_total = ''
        this.brood_total = ''
        this.batch_total = ''
        this.forum_total = ''
        this.my_coupon = ""
        this.my_order = ""
        this.my_price = ''
        this.turntable_day = ''
        this.turntable_frequency = ''
        this.mianyi = '',
        this.model_total = []
        this.model_name = []
        this.model_value = []
        this.new_value = []
        this.new_name = []
        this.user_actice_time = []
        this.user_actice_value = []
        this.$Spin.show();
        this.list_data=[];
        this.list_area=""
        this.historyData = []
        oneUserAction({
          tel: this.ipone_number
        }).then(res => {
          if(res.msg == "该用户未注册"){
            this.$Message.info('该用户未注册')
          }
          this.$Spin.hide();
          this.create_time = res.data.list.create_time;
          this.historyData.push({
            'username': res.data.list.username,
            'real_name': res.data.list.real_name,
            'mobile_phone': res.data.list.mobile_phone,
            'account': res.data.list.account,
            'area': res.data.list.area,
            'number_attribution': res.data.list.number_attribution,
            'number_attribution_city': res.data.list.number_attribution_city,
            'score': res.data.list.score
          })
          this.list_data=res.data.list.view;
          this.list_area=res.data.list.area;
        })
        getUserLoginInfo({
          tel: this.ipone_number,
          star_time: '',
          end_time: ''
        }).then(res => {
          this.login_total = res.data.login_hour[0].c;
          this.login_last = res.data.login_last_time;
        })
        getUserSign({
          tel: this.ipone_number,
          star_time: '',
          end_time: ''
        }).then(res => {
          this.signin_total = res.data.num;
        })
        getBroodInfo({
          tel: this.ipone_number,
          star_time: '',
          end_time: '',
          type: 0
        }).then(res => {
          this.brood_total = res.data.count
        })
        getBatchInfo({
          tel: this.ipone_number,
          star_time: '',
          end_time: '',
          type: 0
        }).then(res => {
          this.batch_total = res.data.count
        })
        getCommunityInfo({
          tel: this.ipone_number,
          star_time: '',
          end_time: '',
        }).then(res => {
          this.forum_total = res.data.communityInfo.count
        })
        myCoupon({
          tel: this.ipone_number,
          star_time: '',
          end_time: '',
        }).then(res => {
          this.my_coupon = res.data.couponList.num;
        })
        orderInfo({
          tel: this.ipone_number,
          star_time: '',
          end_time: '',
        }).then(res => {
          this.my_order = res.data.orderList.num;
        })
        myPrice({
          tel: this.ipone_number,
          star_time: '',
          end_time: '',
          type: 0
        }).then(res => {
          this.my_price = res.data.count
        })
        getWheelInfo({
          tel: this.ipone_number,
          star_time: '',
          end_time: '',
        }).then(res => {
          this.turntable_frequency = res.data.wheelNumInfo.num
        })
        getWheelInfoDay({
          tel: this.ipone_number,
          star_time: '',
          end_time: '',
        }).then(res => {
          this.turntable_day = res.data.wheelDayInfo.num
        })
        userViewModule({
          tel: this.ipone_number
        }).then(res => {
          this.model_total = res.data.data.slice(0, 5)
          this.model_total.forEach((item, index) => {
            this.model_name.push(item.module_name)
            this.model_value.push(item.cu)
          })
          this.drawUmodel();
        })
        getNewsViewInfo({
          tel: this.ipone_number
        }).then(res => {

          res.data.cat.forEach((item, index) => {
            this.new_name.push({
              'value': item.c,
              "name": item.title
            })
            this.new_value.push(item.title)
          })
          this.drawNew();
        })
        getImmuneInfo({
          tel: this.ipone_number,
          star_time: '',
          end_time: '',
        }).then(res => {
          this.mianyi = res.data.count;
        })
        getUserActionByHour({
          tel: this.ipone_number,
        }).then(res=>{
          res.data.list.forEach((item,index)=>{
            this.user_actice_time.push(item.create_hour)
            this.user_actice_value.push(item.cu)
          })
          this.draWbatter();
        })
      },
      searchUser() {
        var reg = /^1[3|4|5|7|8][0-9]{9}$/;
        if(this.ipone_number == '') {
          this.$Message.info('请输入手机号码')
          return;
        }
        if(!reg.test(this.ipone_number)) {
          this.$Message.info('请输入正确的手机号码')
          return;
        }
        this.getUserDetail2();
      }
    }
  }
</script>

<style scoped>
  .user_number {
    font-size: 20px;
    padding: 10px 0;
    display: inline-block;
  }

  .user_number_bold {
    font-size: 20px;
    font-weight: bold;
  }

  .user_border {
    /* border: 1px solid rgb(56, 153, 254); */
    height: 120px;
    padding: 10px 5px;
    border-radius: 10px;
    margin-top: 10px ;
    cursor: pointer;
  }
  .user_border:hover {
    color: rgb(56, 153, 254);
  }
  .register_time {
    text-align: center;
  }

  .ivu-table-border td,
  .ivu-table-border th {
    text-align: center;
  }

  .download-border {
    /* border: 1px solid rgb(206, 230, 207); */
    /* border: 1px solid rgb(56, 153, 254); */
  }
  .table-title {
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    /* background: rgb(56, 153, 254); */
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom: 2px solid #e3e8ee;
    /*padding-left: 20px;*/
    /* margin-top: 15px; */
  }
  .mt {
    margin-top: 10px;
  }
  .ivu-col-offset-2 {
    margin-left: 0;
  }
  .vertical-center-modal{
      display: flex;
      align-items: center;
      justify-content: center;
  }
  .vertical-center-modal .ivu-modal {
      top: 0;
      color:rgb(56, 153, 254)
  }
  .ivu-table-wrapper .ivu-table,.ivu-table-wrapper .ivu-table-border td, .ivu-table-wrapper .ivu-table-border th {
    border-right: none;
    font-size: 16px;
  }

  ivu-carousel-track {
    position: relative;
    top: 0;
    left: 0;
    display: block;
    overflow: hidden;
    z-index: 1;
    transform: translate3d(814px, 0px, 0px);
    transition: transform 500ms ease;
    position:absolute;
    top: 0;
  }
</style>
