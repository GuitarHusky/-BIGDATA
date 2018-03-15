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
import DownloadInfo from '@/views/survey/info/download-info' //概况->下载量->每天下载次数->详情


import UserData from '@/components/UserData'
/*import datwo from '@/components/da_2'
import dathree from '@/components/da_3'*/
/*import two from '@/views/two'
import three from '@/views/three'*/
import RegisterDistribution from '@/views/userdata/RegisterDistribution' //用户分析-注册用户分布
import RegisterInfo from '@/views/userdata/RegisterInfo'//用户分析-注册用户详细
import UserBehavior from '@/views/userdata/UserBehavior' //用户分析-个人用户行为
import RegisterAnalyse from '@/views/userdata/RegisterAnalyse' //用户分析-注册用户分析-详情
import UserAnalyse from '@/views/userdata/UserAnalyse' //用户分析-新用户分析
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

import Login from '@/components/Login' //登录页
import SearchModal from '@/views/userdata/telSearchModal' //用户分析-个人用户行为-手机搜索页

import ModalUserBehavior from '@/components/ModalUserBehavior' //模块用户行为
/*import ModalTrend from '@/views/modaluserbehavior/modaltrend' //模块用户行为-模块整体趋势*/
import Scan from '@/views/modaluserbehavior/indexdata/scan' //模块用户行为-首页数据-扫一扫
import UserIntegraCount from '@/views/modaluserbehavior/indexdata/userintegracount' ////模块用户行为-首页数据-用户积分统计
import BannerClick from '@/views/modaluserbehavior/indexdata/bannerclick' //模块用户行为-首页数据-banner点击次数
import UserIntegraInfo from '@/views/modaluserbehavior/indexdata/userintegrainfo' //模块用户行为-首页数据-用户积分详细
import BannerClickInfo from '@/views/modaluserbehavior/indexdata/bannerclickinfo' //模块用户行为-首页数据-banner点击总次数详细
import BannerClickInfoTable from '@/views/modaluserbehavior/indexdata/bannerclickinfotable' //模块用户行为-首页数据-banner点击图表详细
import DataTotal from '@/views/modaluserbehavior/datatotal/datatotal' //模块用户行为-生产效益-数据统计
import AllProdNum from '@/views/modaluserbehavior/datatotal/allprodnum' //模块用户行为-生产效益-数据统计-总的录入生产数据次数详细
import AllCostNum from '@/views/modaluserbehavior/datatotal/allcostnum' //模块用户行为-生产效益-数据统计-总的录入成本数据次数详细
import YesProdNum from '@/views/modaluserbehavior/datatotal/yesprodnum' //模块用户行为-生产效益-数据统计-昨日录入生产数据次数详细
import YesCostNum from '@/views/modaluserbehavior/datatotal/yescostnum' //模块用户行为-生产效益-数据统计-昨日录入成本数据次数详细
import YesSmallProdNum from '@/views/modaluserbehavior/datatotal/yessmallprodnum' //模块用户行为-生产效益-数据统计-昨日录入育雏鸡生产数据次数详细
import YesSmallCostNum from '@/views/modaluserbehavior/datatotal/yessmallcostnum' //模块用户行为-生产效益-数据统计-昨日录入育雏鸡成本数据次数详细
import YesBigProdNum from '@/views/modaluserbehavior/datatotal/yesbigprodnum' //模块用户行为-生产效益-数据统计-昨日录入育成鸡生产数据次数详细
import YesBigCostNum from '@/views/modaluserbehavior/datatotal/yesbigcostnum' //模块用户行为-生产效益-数据统计-昨日录入育成鸡成本数据次数详细
import YesCDJProdNum from '@/views/modaluserbehavior/datatotal/yescdjprodnum' //模块用户行为-生产效益-数据统计-昨日录入产蛋鸡生产数据次数详细
import YesCDJCostNum from '@/views/modaluserbehavior/datatotal/yescdjcostnum' //模块用户行为-生产效益-数据统计-昨日录入产蛋鸡成本数据次数详细
import AllBatch from '@/views/modaluserbehavior/datatotal/allbatch' //模块用户行为-生产效益-数据统计-建立批次栋舍总次数详细
import YesAllBatch from '@/views/modaluserbehavior/datatotal/yesallbatch' //模块用户行为-生产效益-数据统计-昨日建立批次栋舍总次数详细
import AllProdUsers from '@/views/modaluserbehavior/datatotal/allprodusers' //模块用户行为-生产效益-数据统计-总的录入生产数据用户数详细
import AllCostUsers from '@/views/modaluserbehavior/datatotal/allcostusers' //模块用户行为-生产效益-数据统计-总的录入成本数据用户数详细
import AllBatchList from '@/views/modaluserbehavior/datatotal/allbatchlist' //模块用户行为-生产效益-数据统计-鸡场总数
import DayProdOldInfo from '@/views/modaluserbehavior/datatotal/dayprodoldinfo' //模块用户行为-生产效益-数据统计-每日录入生产效益旧版图表详细
import DayProdNewInfo from '@/views/modaluserbehavior/datatotal/dayprodnewinfo' //模块用户行为-生产效益-数据统计-每日录入生产效益新版图表详细
import DayCostInfo from '@/views/modaluserbehavior/datatotal/daycostinfo' //模块用户行为-生产效益-数据统计-每日录入成本效益新版图表详细
import OnlineCheck from '@/views/modaluserbehavior/cloudhealth/onlinecheck' //模块用户行为-云健康-在线检测
import CloudCheckUpInfo from '@/views/modaluserbehavior/cloudhealth/cloudcheckupinfo' //模块用户行为-云健康-在线检测-云检测提交次数详细
import CloudCheckTodayUp from '@/views/modaluserbehavior/cloudhealth/cloudchecktodayup' //模块用户行为-云健康-在线检测-云检测今日提交次数详细
import ImmuneTrend from '@/views/modaluserbehavior/cloudhealth/immunetrend' //模块用户行为-云健康-免疫程序
import ImmunePgInfo from '@/views/modaluserbehavior/cloudhealth/immunepginfo' //模块用户行为-云健康-免疫程序-免疫程序总数详细
import ImmuneLogNum from '@/views/modaluserbehavior/cloudhealth/immunelognum' //模块用户行为-云健康-免疫程序-免疫记录总数详细
import VaccineNum from '@/views/modaluserbehavior/cloudhealth/vaccinenum' //模块用户行为-云健康-免疫程序云健康-免疫程序-疫苗记录总数详细
import EggDataTotal from '@/views/modaluserbehavior/eggpricesearch/eggdatatotal' //模块用户行为-蛋价查询-数据统计
import DaySearchList from '@/views/modaluserbehavior/eggpricesearch/daysearchlist' //模块用户行为-蛋价查询-数据统计
import EggPriceSearchList from '@/views/modaluserbehavior/eggpricesearch/eggpricesearchlist' //模块用户行为-蛋价查询-数据统计-使用搜索次数详细
import CitySearchList from '@/views/modaluserbehavior/eggpricesearch/citysearchlist' //模块用户行为-蛋价查询-数据统计-各市搜索详细
import EggPriceForecast from '@/views/modaluserbehavior/eggpricesearch/eggpriceforecast' //模块用户行为-蛋价查询-数据统计-各市搜索详细
import EggPriceForecastList from '@/views/modaluserbehavior/eggpricesearch/eggpriceforecastList' ////模块用户行为-蛋价查询-蛋价预测详细
import MaterialOffer from '@/views/modaluserbehavior/pricemarket/materialoffer' //模块用户行为-价格行情-原料报价
import EggOffer from '@/views/modaluserbehavior/pricemarket/eggoffer' //模块用户行为-价格行情-鸡蛋报价
import OfferAnalyse from '@/views/modaluserbehavior/pricemarket/offeranalyse' //模块用户行为-价格行情-报价分析
import EggOfferDetail from '@/views/modaluserbehavior/pricemarket/eggofferdetail' //模块用户行为-价格行情-鸡蛋报价->指标数据详情
import MaterialOfferDetail from '@/views/modaluserbehavior/pricemarket/materialofferdetail' //模块用户行为-价格行情-原料报价->指标数据详情
import ReadArticle from '@/views/modaluserbehavior/hotinformation/readarticle' //模块用户行为-热点资讯-阅读文章
import ReadArticlePVInfo from '@/views/modaluserbehavior/hotinformation/readarticlepvinfo' //模块用户行为-热点资讯-阅读文章总次数pv详情
import ReadArticleInfo from '@/views/modaluserbehavior/hotinformation/readarticleinfo' //模块用户行为-热点资讯-阅读文章总次数详情
import DayReadArticleInfo from '@/views/modaluserbehavior/hotinformation/dayreadarticleinfo' //模块用户行为-热点资讯-每天阅读文章次数详情
import ArticleTitleInfo from '@/views/modaluserbehavior/hotinformation/articletitleinfo' //模块用户行为-热点资讯-每天阅读文章标题点击详情
import ShareArticle from '@/views/modaluserbehavior/hotinformation/sharearticle' //模块用户行为-热点资讯-分享
import ReadArticleAnalyse from '@/views/modaluserbehavior/hotinformation/readarticleanalyse' //模块用户行为-热点资讯-阅读文章分析
import ManagerMallData from '@/views/modaluserbehavior/managermall/datatotal' //模块用户行为-管家商城-数据统计
import ExchangeInfo from '@/views/modaluserbehavior/managermall/exchangeinfo' //模块用户行为-管家商城-数据统计-兑换次数详细
import ExchangeDateInfo from '@/views/modaluserbehavior/managermall/exchangedateinfo' //模块用户行为-管家商城-数据统计-兑换次数日期点击详情
import CollectInfo from '@/views/modaluserbehavior/managermall/collectinfo' //模块用户行为-管家商城-数据统计-收藏次数详细
import CollectDateInfo from '@/views/modaluserbehavior/managermall/collectdateinfo' //模块用户行为-管家商城-数据统计-兑换次数日期点击详情
import BigDial from '@/views/modaluserbehavior/activecenter/bigdial' //模块用户行为-活动中心-大转盘使用情况
import BigDialNumDetail from '@/views/modaluserbehavior/activecenter/bigdialnumdetail' //模块用户行为-活动中心-大转盘使用情况-使用大转盘次数
import BigDialPersonDetail from '@/views/modaluserbehavior/activecenter/bigdialpersondetail' //模块用户行为-活动中心-大转盘使用情况-使用大转盘人数
import BreedClassRoom from '@/views/modaluserbehavior/managereyeshot/breedclassroom' //模块用户行为-管家视界-养殖课堂
import ViewVideoTotalDetail from '@/views/modaluserbehavior/managereyeshot/viewvideototaldetail' //模块用户行为-管家视界-养殖课堂-基本指标-总观看次数详情
import ViewLittleVideoTotalDetail from '@/views/modaluserbehavior/managereyeshot/viewlittlevideototaldetail' //模块用户行为-管家视界-小视频-基本指标-总观看次数详情
import TotalScoreDetail from '@/views/modaluserbehavior/managereyeshot/totalscoredetail' //模块用户行为-管家视界-养殖课堂-基本指标-总评分次数详情
import LittleVideoTotalScoreDetail from '@/views/modaluserbehavior/managereyeshot/littlevideototalscoredetail' //模块用户行为-管家视界-小视频-基本指标-总评分次数详情
import CountTotalCollect from '@/views/modaluserbehavior/managereyeshot/counttotalcollect' //模块用户行为-管家视界-养殖课堂-基本指标-总收藏次数详情
import LittleVideoCountTotalCollect from '@/views/modaluserbehavior/managereyeshot/littlevideocounttotalcollect' //模块用户行为-管家视界-小视频-基本指标-总收藏次数详情
import CountMessageDetail from '@/views/modaluserbehavior/managereyeshot/countmessagedetail' //模块用户行为-管家视界-养殖课堂-基本指标-总留言量详情
import LittleVideoCountMessageDetail from '@/views/modaluserbehavior/managereyeshot/littlevideocountmessagedetail' //模块用户行为-管家视界-小视频-基本指标-总留言量详情
import DayCollectVideoInfo from '@/views/modaluserbehavior/managereyeshot/daycollectvideoinfo' //模块用户行为-管家视界-养殖课堂-基本指标-每天收藏视频次数详情
import LittleDayCollectVideoInfo from '@/views/modaluserbehavior/managereyeshot/littledaycollectvideoinfo' //模块用户行为-管家视界-小视频-基本指标-每天收藏视频次数详情
import IntoChickenHouse from '@/views/modaluserbehavior/managereyeshot/intochickenhouse' //模块用户行为-管家视界-走进鸡场
import IntoFrameViewsDetail from '@/views/modaluserbehavior/managereyeshot/intoframeviewsdetail' //模块用户行为-管家视界-走进鸡场-基本指标-总收看次数详情
import IntoFramePostDetail from '@/views/modaluserbehavior/managereyeshot/intoframepostdetail' //模块用户行为-管家视界-走进鸡场-基本指标-总报名人数详情
import DayPostInfo from '@/views/modaluserbehavior/managereyeshot/daypostinfo' //模块用户行为-管家视界-走进鸡场-每天报名人数图表详情
import LittleVideo from '@/views/modaluserbehavior/managereyeshot/littlevideo' //模块用户行为-管家视界-小视频
import ForumTrend from '@/views/modaluserbehavior/forum/forumtrend' //模块用户行为-论坛-论坛整体趋势
import ForumTrendInfo from '@/views/modaluserbehavior/forum/forumtrendinfo' //模块用户行为-论坛-论坛整体趋势->论坛发帖次数总数详细
import DayForumTrendInfo from '@/views/modaluserbehavior/forum/dayforumtrendinfo' //模块用户行为-论坛-论坛整体趋势->当天论坛发帖次数总数详细
import GoodForumInfo from '@/views/modaluserbehavior/forum/goodforuminfo' //模块用户行为-论坛-论坛整体趋势->精华帖总数详细
import DayGoodForumInfo from '@/views/modaluserbehavior/forum/daygoodforuminfo' //模块用户行为-论坛-论坛整体趋势->当天精华帖总数详细
import AskForumInfo from '@/views/modaluserbehavior/forum/askforuminfo' //模块用户行为-论坛-论坛整体趋势->提问帖总数详细
import DayAskForumInfo from '@/views/modaluserbehavior/forum/dayaskforuminfo' //模块用户行为-论坛-论坛整体趋势->当天提问帖总数详细
import ReportForumInfo from '@/views/modaluserbehavior/forum/reportforuminfo' //模块用户行为-论坛-论坛整体趋势->被举报帖总数详细
import DayReportForumInfo from '@/views/modaluserbehavior/forum/dayreportforuminfo' //模块用户行为-论坛-论坛整体趋势->当天被举报帖总数详细
import ForumPostTimeInfo from '@/views/modaluserbehavior/forum/forumposttimeinfo' //模块用户行为-论坛-论坛整体趋势->论坛发帖时间趋势图详情



Vue.use(Router)

export default new Router({
  routes: [
    { path: '/index',
      redirect:'/p/trend',
      name: 'Survey',
      component: Survey,
    },{ path: '/',
      name: 'Login',
      component: Login,
    },{
    		path: '/userdata',
    		name: 'UserData',
    		redirect:'/d/register-distribution',
     	  component: UserData,
        meta: {keepAlive: true}
    },{
        path: '/liveness',
        name: 'LiveNess',
        redirect:'/active/active-user',
        component: LiveNess,
    },{
        path: '/priceanalyse',
        name: 'PriceAnalyse',
        redirect:'/price/egg-data',
        component: PriceAnalyse,
        canReuse: false
    },{
        path: '/modaluserbehavior',
        name: 'ModalUserBehavior',
        redirect:'/modaluser/datatotal',
        component: ModalUserBehavior
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
    	children:[/*{
    		path: 'three',
    		name: 'three',
     	  component: three
    	},*/{
    		path: 'register-distribution',
    		name: 'RegisterDistribution',
     	  component: RegisterDistribution
    	},{
      path: '/distributioninfo/:area_name',
      name: 'DistributionInfo',
      component: DistributionInfo
      },{
      path: '/downloadinfo/:down_time/:down_value',
      name: 'DownloadInfo',
      component: DownloadInfo
      },{
        path: 'register-info',
        name: 'RegisterInfo',
        component: RegisterInfo
      },{
        path: 'user-behavior/:ipone_number',
        name: 'UserBehavior',
        component: UserBehavior,
        meta: {keepAlive: true}
      },{
        path: 'search-modal',
        name: 'SearchModal',
        component: SearchModal
      },{
        path: 'register-analyse',
        name: 'RegisterAnalyse',
        component: RegisterAnalyse
      },{
        path: 'user-analyse',
        name: 'UserAnalyse',
        component: UserAnalyse
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
    }]
    },{
      path:'/active',
      component: LiveNess,
      children:[
      {
        path: 'active-user',
        name: 'ActiveUser',
        component: ActiveUser
      },{
        path: 'active-user-analyse',
        name: 'ActiveUserAnalyse',
        component: ActiveUserAnalyse
      },{
      path: '/activetotalpv',
      name: 'ActiveTotalPv',
      component: ActiveTotalPv
      },{
      path: '/activeinfo/:active_time/:active_value',
      name: 'ActiveInfo',
      component: ActiveInfo
      }]
    },{
      path:'/price',
      component: PriceAnalyse,
      children:[
      {
        path: 'egg-data',
        name: 'EggData',
        component: EggData
      },{
        path: 'corn-data',
        name: 'CornData',
        component: CornData
      },{
        path: 'bean-data',
        name: 'BeanData',
        component: BeanData
      },{
        path: 'chicken-data',
        name: 'ChickenData',
        component: ChickenData
      }]
    },{
      path:'/modaluser',
      component: ModalUserBehavior,
      children:[
      /*{
        path: 'modaltrend',
        name: 'ModalTrend',
        component: ModalTrend
      },*/{
        path: 'scan',
        name: 'Scan',
        component: Scan
      },{
        path: 'userintegracount',
        name: 'UserIntegraCount',
        component: UserIntegraCount
      },{
        path: 'bannerclick',
        name: 'BannerClick',
        component: BannerClick
      },{
        path: 'userintegrainfo',
        name: 'UserIntegraInfo',
        component: UserIntegraInfo
      },{
        path: 'bannerclickinfo',
        name: 'BannerClickInfo',
        component: BannerClickInfo
      },{
        path: 'bannerclickinfotable/:click_time',
        name: 'BannerClickInfoTable',
        component: BannerClickInfoTable
      },{
        path: 'datatotal',
        name: 'DataTotal',
        component: DataTotal
      },{
        path: 'allprodnum',
        name: 'AllProdNum',
        component: AllProdNum
      },{
        path: 'allcostnum',
        name: 'AllCostNum',
        component: AllCostNum
      },{
        path: 'yesprodnum',
        name: 'YesProdNum',
        component: YesProdNum
      },{
        path: 'yescostnum',
        name: 'YesCostNum',
        component: YesCostNum
      },{
        path: 'yessmallprodnum',
        name: 'YesSmallProdNum',
        component: YesSmallProdNum
      },{
        path: 'yessmallcostnum',
        name: 'YesSmallCostNum',
        component: YesSmallCostNum
      },{
        path: 'yesbigprodnum',
        name: 'YesBigProdNum',
        component: YesBigProdNum
      },{
        path: 'yesbigcostnum',
        name: 'YesBigCostNum',
        component: YesBigCostNum
      },{
        path: 'yescdjprodnum',
        name: 'YesCDJProdNum',
        component: YesCDJProdNum
      },{
        path: 'yescdjcostnum',
        name: 'YesCDJCostNum',
        component: YesCDJCostNum
      },{
        path: 'allbatch',
        name: 'AllBatch',
        component: AllBatch
      },{
        path: 'yesallbatch',
        name: 'YesAllBatch',
        component: YesAllBatch
      },{
        path: 'allprodusers',
        name: 'AllProdUsers',
        component: AllProdUsers
      },{
        path: 'allcostusers',
        name: 'AllCostUsers',
        component: AllCostUsers
      },{
        path: 'allbatchlist',
        name: 'AllBatchList',
        component: AllBatchList
      },{
        path: 'dayprodoldinfo/:prod_time/:prod_value',
        name: 'DayProdOldInfo',
        component: DayProdOldInfo
      },{
        path: 'dayprodnewinfo/:prod_time/:prod_value',
        name: 'DayProdNewInfo',
        component: DayProdNewInfo
      },{
        path: 'daycostinfo/:prod_time/:prod_value',
        name: 'DayCostInfo',
        component: DayCostInfo
      },{
        path: 'onlinecheck',
        name: 'OnlineCheck',
        component: OnlineCheck
      },{
        path: 'cloudcheckupinfo',
        name: 'CloudCheckUpInfo',
        component: CloudCheckUpInfo
      },{
        path: 'cloudchecktodayup',
        name: 'CloudCheckTodayUp',
        component: CloudCheckTodayUp
      },{
        path: 'immunetrend',
        name: 'ImmuneTrend',
        component: ImmuneTrend
      },{
        path: 'immunepginfo',
        name: 'ImmunePgInfo',
        component: ImmunePgInfo
      },{
        path: 'immunelognum',
        name: 'ImmuneLogNum',
        component: ImmuneLogNum
      },{
        path: 'vaccinenum',
        name: 'VaccineNum',
        component: VaccineNum
      },{
        path: 'eggdatatotal',
        name: 'EggDataTotal',
        component: EggDataTotal
      },{
        path: 'daysearchlist/:date',
        name: 'DaySearchList',
        component: DaySearchList
      },{
        path: 'eggpricesearchlist',
        name: 'EggPriceSearchList',
        component: EggPriceSearchList
      },{
        path: 'citysearchlist/:city',
        name: 'CitySearchList',
        component: CitySearchList
      },{
        path: 'eggpriceforecast/:time',
        name: 'EggPriceForecast',
        component: EggPriceForecast
      },{
        path: 'eggpriceforecastList',
        name: 'EggPriceForecastList',
        component: EggPriceForecastList
      },{
        path: 'materialoffer',
        name: 'MaterialOffer',
        component: MaterialOffer
      },{
        path: 'eggoffer',
        name: 'EggOffer',
        component: EggOffer
      },{
        path: 'offeranalyse',
        name: 'OfferAnalyse',
        component: OfferAnalyse
      },{
        path: 'readarticle',
        name: 'ReadArticle',
        component: ReadArticle
      },{
        path: 'readarticlepvinfo',
        name: 'ReadArticlePVInfo',
        component: ReadArticlePVInfo
      },{
        path: 'readarticleinfo',
        name: 'ReadArticleInfo',
        component: ReadArticleInfo
      },{
        path: 'dayreadarticleinfo/:time',
        name: 'DayReadArticleInfo',
        component: DayReadArticleInfo
      },{
        path: 'articletitleinfo/:time/:news_id',
        name: 'ArticleTitleInfo',
        component: ArticleTitleInfo
      },{
        path: 'sharearticle',
        name: 'ShareArticle',
        component: ShareArticle
      },{
        path: 'readarticleanalyse',
        name: 'ReadArticleAnalyse',
        component: ReadArticleAnalyse
      }/*,{
        path: 'managermalldata',
        name: 'ManagerMallData',
        component: ManagerMallData
      }*/,{
        path: 'exchangeinfo',
        name: 'ExchangeInfo',
        component: ExchangeInfo
      },{
        path: 'collectinfo',
        name: 'CollectInfo',
        component: CollectInfo
      },{
        path: 'bigdial',
        name: 'BigDial',
        component: BigDial
      },{
        path: 'bigdialnumdetail/:time',
        name: 'BigDialNumDetail',
        component: BigDialNumDetail
      },{
        path: 'bigdialpersondetail/:time',
        name: 'BigDialPersonDetail',
        component: BigDialPersonDetail
      },{
        path: 'breedclassroom',
        name: 'BreedClassRoom',
        component: BreedClassRoom
      },{
        path: 'viewvideototaldetail',
        name: 'ViewVideoTotalDetail',
        component: ViewVideoTotalDetail
      },{
        path: 'viewlittlevideototaldetail',
        name: 'ViewLittleVideoTotalDetail',
        component: ViewLittleVideoTotalDetail
      },{
        path: 'totalscoredetail',
        name: 'TotalScoreDetail',
        component: TotalScoreDetail
      },{
        path: 'littlevideototalscoredetail',
        name: 'LittleVideoTotalScoreDetail',
        component: LittleVideoTotalScoreDetail
      },{
        path: 'littlevideocounttotalcollect',
        name: 'LittleVideoCountTotalCollect',
        component: LittleVideoCountTotalCollect
      },{
        path: 'littlevideocountmessagedetail',
        name: 'LittleVideoCountMessageDetail',
        component: LittleVideoCountMessageDetail
      },{
        path: 'countmessagedetail',
        name: 'CountMessageDetail',
        component: CountMessageDetail
      },{
        path: 'daycollectvideoinfo/:time',
        name: 'DayCollectVideoInfo',
        component: DayCollectVideoInfo
      },{
        path: 'littledaycollectvideoinfo/:time',
        name: 'LittleDayCollectVideoInfo',
        component: LittleDayCollectVideoInfo
      },{
        path: 'counttotalcollect',
        name: 'CountTotalCollect',
        component: CountTotalCollect
      },{
        path: 'intochickenhouse',
        name: 'IntoChickenHouse',
        component: IntoChickenHouse
      },{
        path: 'intoframeviewsdetail',
        name: 'IntoFrameViewsDetail',
        component: IntoFrameViewsDetail
      },{
        path: 'intoframepostdetail',
        name: 'IntoFramePostDetail',
        component: IntoFramePostDetail
      },{
        path: 'daypostinfo/:time',
        name: 'DayPostInfo',
        component: DayPostInfo
      },{
        path: 'eggofferdetail',
        name: 'EggOfferDetail',
        component: EggOfferDetail
      },{
        path: 'materialofferdetail',
        name: 'MaterialOfferDetail',
        component: MaterialOfferDetail
      },{
        path: 'forumtrend',
        name: 'ForumTrend',
        component: ForumTrend
      },{
        path: 'forumtrendinfo',
        name: 'ForumTrendInfo',
        component: ForumTrendInfo
      },{
        path: 'dayforumtrendinfo',
        name: 'DayForumTrendInfo',
        component: DayForumTrendInfo
      },{
        path: 'goodforuminfo',
        name: 'GoodForumInfo',
        component: GoodForumInfo
      },{
        path: 'daygoodforuminfo',
        name: 'DayGoodForumInfo',
        component: DayGoodForumInfo
      },{
        path: 'askforuminfo',
        name: 'AskForumInfo',
        component: AskForumInfo
      },{
        path: 'dayaskforuminfo',
        name: 'DayAskForumInfo',
        component: DayAskForumInfo
      },{
        path: 'reportforuminfo',
        name: 'ReportForumInfo',
        component: ReportForumInfo
      },{
        path: 'dayreportforuminfo',
        name: 'DayReportForumInfo',
        component: DayReportForumInfo
      },{
        path: 'forumposttimeinfo/:time',
        name: 'ForumPostTimeInfo',
        component: ForumPostTimeInfo
      },{
        path: 'littlevideo',
        name: 'LittleVideo',
        component: LittleVideo
      },{
        path: 'exchangedateinfo/:time',
        name: 'ExchangeDateInfo',
        component: ExchangeDateInfo
      },{
        path: 'collectdateinfo/:time',
        name: 'CollectDateInfo',
        component: CollectDateInfo
      }/*,{
        path: 'productivity',
        name: 'Productivity',
        component: Productivity
      },{
        path: 'eggprice',
        name: 'EggPrice',
        component: EggPrice
      },{
         path: 'pricequotations',
         name: 'PriceQuotations',
         component: PriceQuotations
      },{
         path: 'hotinformation',
         name: 'HotiInformation',
         component: HotiInformation
      },{
         path: 'cloudhealth',
         name: 'CloudHealth',
         component: CloudHealth
      },{
         path: 'managermall',
         name: 'ManagerMall',
         component: CloudHealth
      },{
         path: 'activecenter',
         name: 'ActiveCenter',
         component: ActiveCenter
      },{
         path: 'managereyeshot',
         name: 'ManagerEyeshot',
         component: ManagerEyeshot
      },{
         path: 'forum',
         name: 'Forum',
         component: Forum
      }*/]
    }
  ]
})
