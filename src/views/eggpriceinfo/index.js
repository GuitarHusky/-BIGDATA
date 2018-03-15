import Vue from 'vue'
import Router from 'vue-router'
import Survey from '@/components/Survey' //概况首页
import Trend from '@/views/survey/Trend' //概况->整体趋势
import Download from '@/views/survey/Download' //概况->下载量
import DownloadAnalyse from '@/views/survey/DownloadAnalyse' //概况->下载量分析
import UserSignAnalyse from '@/views/survey/UserSignAnalyse' //概况->用户签到分析
import TotalDownload from '@/views/survey/info/TotalDownload' //概况->整体趋势 ->总下载量
import YesDownload from '@/views/survey/info/yes-download' //昨日下载量详情页
import TotalRegist from '@/views/survey/info/total-regist' //总注册量详情页
import TodayRegist from '@/views/survey/info/today-regist' //今日新增注册量详情页
import TodayDownload from '@/views/survey/info/today-download' //今日下载量详情页
import YesRegist from '@/views/survey/info/yes-regist' //昨日新增注册量详情页
import YesSign from '@/views/survey/info/yes-sign' //昨日签到详情页
import YesShare from '@/views/survey/info/yes-share' //昨日分享详情页
import TotalEgg from '@/views/survey/info/total-egg' //鸡蛋总报价详情页
import YesEgg from '@/views/survey/info/yes-egg' //昨日鸡蛋总报价详情页
import TotalMaterial from '@/views/survey/info/total-material' //原料总报价详情页
import YesMaterial from '@/views/survey/info/yes-material' //昨日原料总报价详情页
import YesRead from '@/views/survey/info/yes-read' //昨日阅读文章详情页
import YesUserPv from '@/views/survey/info/yes-user-pv' //昨日活跃用户数(PV)
import YesUserUv from '@/views/survey/info/yes-user-uv' //昨日活跃用户数(UV)

import UserData from '@/components/UserData'
import datwo from '@/components/da_2'
import dathree from '@/components/da_3'
import two from '@/views/two'
import three from '@/views/three'
import RegisterDistribution from '@/views/userdata/RegisterDistribution'
import RegisterInfo from '@/views/userdata/RegisterInfo'
import UserBehavior from '@/views/userdata/UserBehavior'
import RegisterAnalyse from '@/views/userdata/RegisterAnalyse'
import UserAnalyse from '@/views/userdata/UserAnalyse'
import DistributionInfo from '@/views/userdata/info/distribution-info' //用户分析-注册用户分析-详情
import LoginTotal from '@/views/userdata/info/login-total' //用户分析-个人用户行为 -》登陆总天数详情
import SignTotal from '@/views/userdata/info/sign-total' //用户分析-个人用户行为 -》签到总次数详情 production-total.vue
import ProductionTotal from '@/views/userdata/info/production-total' //用户分析-个人用户行为 -生产效益详情
import BatchTotal from '@/views/userdata/info/batch-total' //用户分析-个人用户行为 -》栋舍详情
import FroumTotal from '@/views/userdata/info/froum-total' //用户分析-个人用户行为 -》论坛详情
import ImmuneTotal from '@/views/userdata/info/immune-total' //用户分析-个人用户行为 -》免疫详情
import WheelDay from '@/views/userdata/info/wheel-day' //用户分析-个人用户行为 -》大转盘使用天数
import MycouponTotal from '@/views/userdata/info/mycoupon-total' //用户分析-个人用户行为 -》我的优惠券详情
import MyorderTotal from '@/views/userdata/info/myorder-total' //用户分析-个人用户行为 -》我的订单详情
import OfferTotal from '@/views/userdata/info/offer-total' //用户分析-个人用户行为 -》我的报价详情
import WheelTime from '@/views/userdata/info/wheel-time' //用户分析-个人用户行为 -》大转盘使用次数

import LiveNess from '@/components/LiveNess' //活跃度首页
import ActiveUser from '@/views/liveness/activeUser' //活跃度-活跃用户
import ActiveUserAnalyse from '@/views/liveness/activeUserAnalyse' //活跃度-活跃用户分析
import ActiveTotalPv from '@/views/liveness/info/active-total-pv'
import ActiveInfo from "@/views/liveness/info/active-info"//活跃度  -》活跃用户分析  ->活跃用户趋势->详情

import PriceAnalyse from '@/components/PriceAnalyse'
import EggData from '@/views/eggpriceinfo/egg-data'// 抓取蛋价信息->鸡蛋数据
import CornData from '@/views/eggpriceinfo/corn-data'// 抓取蛋价信息->玉米价格
import BeanData from '@/views/eggpriceinfo/bean-data'// 抓取蛋价信息->豆粕价格
import ChickenData from '@/views/eggpriceinfo/chicken-data'// 抓取蛋价信息->淘汰鸡价格

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/',
    	redirect:'/p/trend',
      name: 'Survey',
      component: Survey
    },{
    		path: '/userdata',
    		name: 'UserData',
    		redirect:'/d/register-distribution',
     	  component: UserData
    },{
        path: '/liveness',
        name: 'LiveNess',
        redirect:'/active/activeUser',
        component: LiveNess
    },{
    	path:'/p',
    	component:Survey,
    	children:[{
    		path: 'trend',
    		name: 'Trend',
     	  component: Trend
    	},{
    		path: 'download',
    		name: 'Download',
     	  component: Download
    	},{
    		path: 'download-analyse',
    		name: 'DownloadAnalyse',
     	  component: DownloadAnalyse
    	},{
    		path: 'user-sign-analyse',
    		name: 'UserSignAnalyse',
     	  component: UserSignAnalyse
    	},{
    		path: 'total-download',
    		name: 'TotalDownload',
     	  component: TotalDownload
    	},{
      path: '/todaydownload',
      name: 'TodayDownload',
      component: TodayDownload
    },{
      path: '/yesdownload',
      name: 'YesDownload',
      component: YesDownload
    },{
      path: '/totalregist',
      name: 'TotalRegist',
      component: TotalRegist
    },{
      path: '/todayregist',
      name: 'TodayRegist',
      component: TodayRegist
    },{
      path: '/yesregist',
      name: 'YesRegist',
      component: YesRegist
    },{
      path: '/yessign',
      name: 'YesSign',
      component: YesSign
    },{
      path: '/yesshare',
      name: 'YesShare',
      component: YesShare
    },{
      path: '/totalegg',
      name: 'TotalEgg',
      component: TotalEgg
    },{
      path: '/yesegg',
      name: 'YesEgg',
      component: YesEgg
    },{
      path: '/yesmaterial',
      name: 'YesMaterial',
      component: YesMaterial
    },{
      path: '/totalmaterial',
      name: 'TotalMaterial',
      component: TotalMaterial
    },{
      path: '/yesread',
      name: 'YesRead',
      component: YesRead
    },{
      path: '/yesuserpv',
      name: 'YesUserPv',
      component: YesUserPv
    },{
      path: '/yesuseruv',
      name: 'YesUserUv',
      component: YesUserUv
    }]
    },{
    	path:'/d',
    	component:UserData,
    	children:[{
    		path: 'three',
    		name: 'three',
     	  component: three
    	},{
    		path: 'register-distribution',
    		name: 'RegisterDistribution',
     	  component: RegisterDistribution
    	},{
        path: 'register-info',
        name: 'RegisterInfo',
        component: RegisterInfo
      },{
        path: 'user-behavior',
        name: 'UserBehavior',
        component: UserBehavior
      },{
        path: 'register-analyse',
        name: 'RegisterAnalyse',
        component: RegisterAnalyse
      },{
        path: 'user-analyse',
        name: 'UserAnalyse',
        component: UserAnalyse
      }]
    },{
      path: '/distributioninfo/:area_name',
      name: 'DistributionInfo',
      component: DistributionInfo
    },{
      path: '/logintotal',
      name: 'LoginTotal',
      component: LoginTotal
    },{
      path: '/signtotal',
      name: 'SignTotal',
      component: SignTotal
    },{
      path: '/batchtotal',
      name: 'BatchTotal',
      component: BatchTotal
    },{
      path: '/productiontotal',
      name: 'ProductionTotal',
      component: ProductionTotal
    },{
      path: '/froumtotal',
      name: 'FroumTotal',
      component: FroumTotal
    },{
      path: '/immunetotal',
      name: 'ImmuneTotal',
      component: ImmuneTotal
    },{
      path: '/wheelday',
      name: 'WheelDay',
      component: WheelDay
    },{
      path: '/mycoupontotal',
      name: 'MycouponTotal',
      component: MycouponTotal
    },{
      path: '/myordertotal',
      name: 'MyorderTotal',
      component: MyorderTotal
    },{
      path: '/offertotal',
      name: 'OfferTotal',
      component: OfferTotal
    },{
      path: '/wheeltime',
      name: 'WheelTime',
      component: WheelTime
    },{
      path: '/activetotalpv',
      name: 'ActiveTotalPv',
      component: ActiveTotalPv
    },{
      path:'/active',
      component: LiveNess,
      children:[
      {
        path: 'activeUser',
        name: 'ActiveUser',
        component: ActiveUser
      },{
        path: 'activeUserAnalyse',
        name: 'ActiveUserAnalyse',
        component: ActiveUserAnalyse
      }]
    }
  ]
})
