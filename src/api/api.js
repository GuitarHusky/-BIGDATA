import axios from 'axios';
let egg='https://data.danjiguanjia.com'
let config = {
	headers: {
		'Content-Type': 'multipart/form-data'
	}
};
//登录功能https://data.danjiguanjia.com/api/v1/login
export const loginTo = params => {
	let param = new FormData(); //创建form对象
	param.append('username', params.username);
	param.append('password', params.password);
	return axios.post(`${egg}/api/v1/login`, param).then(res => res.data);
};
//后台首页->全国地区当日活跃用户地理分析
export const getHomeArea = params => {
	return axios.post(`${egg}/api/v1/getHomeArea`).then(res => res.data);
};
//获取下载详情  总下载量。今日下载量，昨日下载量
export const downloadList = params => {
	return axios.get(`${egg}/api/v1/maindetail/getDownLoadDetail`,{
		params: params
	}).then(res => res.data);
};
//总注册量。今日注册量，昨日注册量
export const registerList = params => {
	return axios.get(`${egg}/api/v1/maindetail/getRegistDetail`,{
		params: params
	}).then(res => res.data);
};
//昨日签到人数和昨日分享人数
export const signShareList = params => {
	return axios.get(` ${egg}/api/v1/maindetail/getYesSignAndShareDetail`,{
		params: params
	}).then(res => res.data);
};
//获取鸡蛋报价原料报价总人数和昨日总人数详情 鸡蛋报价总人数 和昨日鸡蛋报价总人数 原料报价总人数 昨日原料报价总人数
export const EggPriceList = params => {
	return axios.get(` ${egg}/api/v1/maindetail/getEggPriceDetail`,{
		params: params
	}).then(res => res.data);
};
//昨日阅读量 和昨日活动用户数(pv) 昨日活跃用户数 (uv)
export const readAndActiveList = params => {
	return axios.get(` ${egg}/api/v1/maindetail/getReadAndActive`,{
		params: params
	}).then(res => res.data);
};
//https://data.danjiguanjia.com/api/v1/getTodayActiveUser  获取概况中pv和uv数据
export const getTodayActiveUser = params => {
	let param = new FormData(); //创建form对象
	param.append('page', params.page);
	param.append('currentPage', params.currentPage);
	param.append('keyword', params.keyword);
	return axios.post(`${egg}/api/v1/getTodayActiveUser`, param).then(res => res.data);
};
//昨日阅读数
export const getTodayArticleCount = params => {
	let param = new FormData(); //创建form对象
	param.append('page', params.page);
	param.append('currentPage', params.currentPage);
	return axios.post(`${egg}/api/v1/getTodayArticleCount`, param).then(res => res.data);
};
//概况->下载量->每天下载次数接口
export const dayDownload = params => {
  let param = new FormData(); //创建form对象
  param.append('start_time', params.start_time);
  param.append('end_time', params.end_time);
  return axios.post(`${egg}/api/v1/getNumberOfDownloadsPerDay`, param).then(res => res.data);
};

//概况->下载量->新增注册用户趋势图表接口
export const dayNewRegist = params => {
	let param = new FormData(); //创建form对象
	param.append('start_time', params.start_time);
	param.append('end_time', params.end_time);
	return axios.post(`${egg}/api/v1/getNumberOfRegistPerDay`, param).then(res => res.data);
};
// 概况->下载量->每天下载次数接口->详情
export const getNumberOfDownloadsPerDayToDetail  = params => {
	let param = new FormData(); //创建form对象
	param.append('date_time', params.date_time);
	param.append('page', params.page);
	param.append('currentPage', params.currentPage);
	return axios.post(`${egg}/api/v1/getNumberOfDownloadsPerDayToDetail`, param).then(res => res.data);
};
//概况->下载量分析->下载时段统计
export const getDownLoadToTime = params => {
	let param = new FormData(); //创建form对象
	param.append('start_time', params.start_time);
	param.append('end_time', params.end_time);
	return axios.post(`${egg}/api/v1/getDownLoadToTime`, param).then(res => res.data);
};
//概况->下载量分析->下载地区统计
export const getDownLoadArea = params => {
	let param = new FormData(); //创建form对象
	param.append('start_time', params.start_time);
	param.append('end_time', params.end_time);
	return axios.post(`${egg}/api/v1/getDownLoadArea`, param).then(res => res.data);
};
//概况->下载量分析->下载版本统计
export const getVersionStatistics = params => {
	let param = new FormData(); //创建form对象
	param.append('start_time', params.start_time);
	param.append('end_time', params.end_time);
	return axios.post(`${egg}/api/v1/getVersionStatistics`, param).then(res => res.data);
};
//概况->下载量分析->下载注册率
export const getDownloadRegister = params => {
	let param = new FormData(); //创建form对象
	param.append('start_time', params.start_time);
	param.append('end_time', params.end_time);
	return axios.post(`${egg}/api/v1/getDownloadRegister`, param).then(res => res.data);
};
//概况->下载量分析->下载手机统计
export const getDownloadPhoneStatistics = params => {
	let param = new FormData(); //创建form对象
	param.append('start_time', params.start_time);
	param.append('end_time', params.end_time);
	return axios.post(`${egg}/api/v1/getDownloadPhoneStatistics`, param).then(res => res.data);
};
//概况->下载量分析->用户签到时间统计
export const getUserCheckInAnalysis = params => {
	let param = new FormData(); //创建form对象
	param.append('start_time', params.start_time);
	param.append('end_time', params.end_time);
	return axios.post(`${egg}/api/v1/getUserCheckInAnalysis`, param).then(res => res.data);
};
//概况->下载量分析->用户签到地区统计
export const getUserCheckInArea = params => {
	let param = new FormData(); //创建form对象
	param.append('start_time', params.start_time);
	param.append('end_time', params.end_time);
	return axios.post(`${egg}/api/v1/getUserCheckInArea`, param).then(res => res.data);
};
//概况 ->整体趋势->每天下载次数趋势
export const getNewDownByDate = params => {
	return axios.get(`${egg}/api/v1/maindetail/getNewDownByDate`,{
		params: params
	}).then(res => res.data);
};

//留存分析->新用户分析->单位时间内用户访问量趋势
export const getRetained = params => {
	return axios.post(`${egg}/api/v1/getRetained`).then(res => res.data);
};
//留存分析->新用户分析->当日注册用户明细
export const getTodayRegisterDetail = params => {
	let param = new FormData(); //创建form对象
	param.append('page', params.page);
	return axios.post(`${egg}/api/v1/getTodayRegisterDetail`, param).then(res => res.data);
};
//活跃度->活跃用户->基本指标
export const getBasicIndicators = params => {
	return axios.post(`${egg}/api/v1/getBasicIndicators`).then(res => res.data);
};
//活跃度->活跃用户->活跃用户趋势
export const getActiveUserTrends = params => {
	let param = new FormData(); //创建form对象
	param.append('start_time', params.start_time);
	param.append('end_time', params.end_time);
	return axios.post(`${egg}/api/v1/getActiveUserTrends`, param).then(res => res.data);
};
//活跃度->活跃用户分析->活跃用户地区统计
export const getActiveUserAnalysis = params => {
	let param = new FormData(); //创建form对象
	param.append('start_time', params.start_time);
	param.append('end_time', params.end_time);
	return axios.post(`${egg}/api/v1/getActiveUserAnalysis`, param).then(res => res.data);
};
//活跃度->活跃用户分析->活跃用户版本统计
export const getActiveUserCurVersion = params => {
	let param = new FormData(); //创建form对象
	param.append('start_time', params.start_time);
	param.append('end_time', params.end_time);
	return axios.post(`${egg}/api/v1/getActiveUserCurVersion`, param).then(res => res.data);
};
//活跃度->活跃用户分析->活跃用户手机类型统计
export const getActiveUserPhoneType = params => {
	let param = new FormData(); //创建form对象
	param.append('start_time', params.start_time);
	param.append('end_time', params.end_time);
	return axios.post(`${egg}/api/v1/getActiveUserPhoneType`, param).then(res => res.data);
};
// 活跃度->活跃用户->用户活跃度总数(pv)->详情
export const getActiveUserList = params => {
	let param = new FormData(); //创建form对象
	param.append('start_time', params.start_time);
	param.append('end_time', params.end_time);
	param.append('page', params.page);
	param.append('currentPage', params.currentPage);
	param.append('keyword', params.keyword);
	return axios.post(`${egg}/api/v1/getActiveUserList`, param).then(res => res.data);
};
//活跃度->活跃用户->活跃用户趋势->详情
export const getActiveUserToDay  = params => {
	let param = new FormData(); //创建form对象
	param.append('date_time', params.date_time);
	param.append('keyword', params.keyword);
	param.append('currentPage', params.currentPage);
	param.append('page', params.page);
	return axios.post(`${egg}/api/v1/getActiveUserToDay`, param).then(res => res.data);
};
//整体趋势->注册用户搜索 手机号 $tel   $type   1 总用户 2昨日  3 今日   必须
export const telSearchRegist = params => {
	let param = new FormData(); //创建form对象
	param.append('tel', params.tel);
	param.append('type', params.type);
	param.append('star_time', params.star_time);
	param.append('end_time', params.end_time);
	param.append('c_page', params.c_page);
	return axios.post(`${egg}/api/v1/telSearchRegist`, param).then(res => res.data);
};
//整体趋势->报价搜索 手机号 $tel   $type 6 鸡蛋报价总人数  7昨日鸡蛋报价人数 8 原料报价总人数 9 昨日原料报价总人数
export const telSearchEggPrice = params => {
	let param = new FormData(); //创建form对象
	param.append('tel', params.tel);
	param.append('type', params.type);
	param.append('star_time', params.star_time);
	param.append('end_time', params.end_time);
	param.append('c_page', params.c_page);
	return axios.post(`https://data.danjiguanjia.com/api/v1/telSearchEggPrice`, param).then(res => res.data);
};
//整体趋势->签到和分享 手机号 $tel   $type 4 昨日签到  5分享用户搜索
export const telSearchSignAndShare = params => {
	let param = new FormData(); //创建form对象
	param.append('tel', params.tel);
	param.append('type', params.type);
	param.append('star_time', params.star_time);
	param.append('end_time', params.end_time);
	param.append('c_page', params.c_page);
	return axios.post(`https://data.danjiguanjia.com/api/v1/telSearchSignAndShare`, param).then(res => res.data);
};
//用户分析->注册用户分布->注册用户地理分布
export const getRegisterUserDistribution = params => {
	return axios.post(`${egg}/api/v1/getRegisterUserDistribution`).then(res => res.data);
};
//用户分析->注册用户分布->根据地区进行筛选   https://data.danjiguanjia.com/api/v1/getRegisterUserArea
export const getRegisterUserArea = params => {
	let param = new FormData(); //创建form对象
	param.append('start_time', params.start_time);
	param.append('end_time', params.end_time);
	param.append('page', params.page);
	param.append('currentPage', params.currentPage);
	param.append('number_attribution', params.number_attribution);
	param.append('keyword', params.keyword);
	return axios.post(`${egg}/api/v1/getRegisterUserArea`, param).then(res => res.data);
};
//用户分析->注册用户详细  https://data.danjiguanjia.com/api/v1/registInfo
export const registInfo = params => {
	return axios.get(`${egg}/api/v1/registInfo`,{
		params: params
	}).then(res => res.data);
};
//用户分析->个人用户行为 -> 用户详情
export const oneUserAction = params => {
	let param = new FormData(); //创建form对象
	param.append('tel', params.tel);
	return axios.post(`${egg}/api/v1/oneUserAction`, param).then(res => res.data);
};
//用户分析->个人用户行为 -> 用户详情 -> 获取签到总天数以及数据
export const getUserSign = params => {
	let param = new FormData(); //创建form对象
	param.append('tel', params.tel);
	param.append('star_time', params.star_time);
	param.append('end_time', params.end_time);
	param.append('c_page', params.c_page);
	return axios.post(`${egg}/api/v1/getUserSign`, param).then(res => res.data);
};
//用户分析->个人用户行为 -> 用户详情 -> 获取登录数据
export const getUserLoginInfo = params => {
	let param = new FormData(); //创建form对象
	param.append('tel', params.tel);
	param.append('star_time', params.star_time);
	param.append('end_time', params.end_time);
	param.append('c_page', params.c_page);
	return axios.post(`${egg}/api/v1/getUserLoginInfo`, param).then(res => res.data);
};
//用户分析->个人用户行为 -> 用户详情 -> 获取生产效益数据
export const getBroodInfo = params => {
	let param = new FormData(); //创建form对象
	param.append('tel', params.tel);
	param.append('star_time', params.star_time);
	param.append('end_time', params.end_time);
	param.append('type', params.type);
	param.append('c_page', params.c_page);
	return axios.post(`${egg}/api/v1/getBroodInfo`, param).then(res => res.data);
};
//用户分析->个人用户行为 -> 用户详情 -> 获取栋舍数据
export const getBatchInfo = params => {
	let param = new FormData(); //创建form对象
	param.append('tel', params.tel);
	param.append('star_time', params.star_time);
	param.append('end_time', params.end_time);
	param.append('type', params.type);
	param.append('c_page', params.c_page);
	return axios.post(`${egg}/api/v1/getBatchInfo`, param).then(res => res.data);
};
//用户分析->个人用户行为 -> 用户详情 -> 获取论坛数据
export const getCommunityInfo = params => {
	let param = new FormData(); //创建form对象
	param.append('tel', params.tel);
	param.append('star_time', params.star_time);
	param.append('end_time', params.end_time);
	param.append('c_page', params.c_page);
	return axios.post(`${egg}/api/v1/getCommunityInfo`, param).then(res => res.data);
};
//用户分析->个人用户行为 -> 用户详情 -> 获取免疫数据
export const getImmuneInfo = params => {
	let param = new FormData(); //创建form对象
	param.append('tel', params.tel);
	param.append('star_time', params.star_time);
	param.append('end_time', params.end_time);
	param.append('c_page', params.c_page);
	return axios.post(`${egg}/api/v1/getImmuneInfo`, param).then(res => res.data);
};
//用户分析->个人用户行为 -> 用户详情 -> 获取我的优惠券数据
export const myCoupon = params => {
	let param = new FormData(); //创建form对象
	param.append('tel', params.tel);
	param.append('star_time', params.star_time);
	param.append('end_time', params.end_time);
	param.append('c_page', params.c_page);
	return axios.post(`${egg}/api/v1/myCoupon`, param).then(res => res.data);
};
//用户分析->个人用户行为 -> 用户详情 -> 获取我的订单数据
export const orderInfo = params => {
	let param = new FormData(); //创建form对象
	param.append('tel', params.tel);
	param.append('star_time', params.star_time);
	param.append('end_time', params.end_time);
	param.append('c_page', params.c_page);
	return axios.post(`${egg}/api/v1/orderInfo`, param).then(res => res.data);
};
//用户分析->个人用户行为 -> 用户详情 -> 获取我的报价数据
export const myPrice = params => {
	let param = new FormData(); //创建form对象
  param.append('star_time', params.star_time);
  param.append('end_time', params.end_time);
  param.append('type', params.type);
	param.append('tel', params.tel);
	param.append('c_page', params.c_page);
	return axios.post(`${egg}/api/v1/myPrice`, param).then(res => res.data);
};
//用户分析->个人用户行为 -> 用户详情 -> 获取我的大转盘数据使用次数
export const getWheelInfo = params => {
	let param = new FormData(); //创建form对象
	param.append('tel', params.tel);
	param.append('star_time', params.star_time);
	param.append('end_time', params.end_time);
	param.append('c_page', params.c_page);
	return axios.post(`${egg}/api/v1/getWheelInfo`, param).then(res => res.data);
};
//用户分析->个人用户行为 -> 用户详情 -> 获取我的大转盘数据使用天数
export const getWheelInfoDay = params => {
	let param = new FormData(); //创建form对象
	param.append('tel', params.tel);
	param.append('star_time', params.star_time);
	param.append('end_time', params.end_time);
	param.append('c_page', params.c_page);
	return axios.post(`${egg}/api/v1/getWheelInfoDay`, param).then(res => res.data);
};
//用户分析->个人用户行为 -> 用户详情 -> 获取模块情况图表数据
export const userViewModule = params => {
	let param = new FormData(); //创建form对象
	param.append('tel', params.tel);
	return axios.post(`${egg}/api/v1/userViewModule`, param).then(res => res.data);
};
//用户分析->个人用户行为 -> 用户详情 ->用户活跃情况图表
export const getUserActionByHour = params => {
	let param = new FormData(); //创建form对象
	param.append('tel', params.tel);
	return axios.post(`${egg}/api/v1/getUserActionByHour`, param).then(res => res.data);
};

//用户分析->个人用户行为 -> 用户详情 -> 获取资讯查看情况图表数据
export const getNewsViewInfo = params => {
	let param = new FormData(); //创建form对象
	param.append('tel', params.tel);
	return axios.post(`${egg}/api/v1/getNewsViewInfo`, param).then(res => res.data);
};
//用户分析->注册用户分析->用户注册时段统计
export const getRegisterUserToHour = params => {
	let param = new FormData(); //创建form对象
	param.append('start_time', params.start_time);
	param.append('end_time', params.end_time);
	return axios.post(`${egg}/api/v1/getRegisterUserToHour`, param).then(res => res.data);
};
//用户分析->注册用户分析->用户当前版本统计
export const getRegisterUserAsync = params => {
	let param = new FormData(); //创建form对象
	param.append('start_time', params.start_time);
	param.append('end_time', params.end_time);
	return axios.post(`${egg}/api/v1/getRegisterUserAsync`, param).then(res => res.data);
};
//用户分析->注册用户分析->用户注册地区统计
export const getRegistArea = params => {
	let param = new FormData(); //创建form对象
	param.append('start_time', params.start_time);
	param.append('end_time', params.end_time);
	return axios.post(`${egg}/api/v1/UserRegisteredRegionalStatistics`, param).then(res => res.data);
};
// 抓取蛋价信息->price_type 0 鸡蛋价格  1 玉米价格  2 豆粕价格  3 淘汰鸡价格 page:1,currentPage:10, keyword 黑龙江start_time 2017-12-05 end_time 2017-12-11
export const getPriceTypes = params => {
  let param = new FormData(); //创建form对象
  param.append('price_type', params.price_type);
  param.append('page', params.page);
  param.append('currentPage', params.currentPage);
  param.append('keyword', params.keyword);
  param.append('start_time', params.start_time);
  param.append('end_time', params.end_time);
  return axios.post(`${egg}/api/v1/CaptureUnitPriceInformation`, param).then(res => res.data);
};

// 模块用户行为->首页数据->扫一扫统计
export const getSysCountToday = params => {
	return axios.get(`${egg}/api/v1/getSysToday`,params).then(res => res.data);
};
// 模块用户行为->首页数据->用户积分详情
export const getUserIntegraInfo = params => {
  let param = new FormData(); //创建form对象
  param.append('c_page', params.c_page);
  param.append('tel', params.keyword);
  param.append('star_time', params.start_time);
  param.append('end_time', params.end_time);
  return axios.post(`${egg}/api/v1/getUserScoreList`, param).then(res => res.data);
};
// 模块用户行为->首页数据->用户积分统计
export const getUserIntegraTotalInfo = params => {
  return axios.get(`${egg}/api/v1/getUserScoreMap`, params).then(res => res.data);
};

// 模块用户行为->首页数据->banner点击次数
export const getBannerClick = params => {
  return axios.post(`${egg}/api/v1/getBannerHitList`, params).then(res => res.data);
};
// 模块用户行为->首页数据->banner点击次数>详细
export const getBannerClickTable = params => {
  /*let param = new FormData(); //创建form对象
  param.append('tel', params.keyword);
  param.append('c_page', params.c_page);
  param.append('star_time', params.start_time);
  param.append('end_time', params.end_time);*/
  return axios.post(`${egg}/api/v1/getBannerHitList`, params).then(res => res.data);
};
// 模块用户行为->首页数据->banner点击次数表格
export const getBannerClickCharts = params => {
  /*let param = new FormData(); //创建form对象
  param.append('star_time', params.start_time);
  param.append('end_time', params.end_time);*/
  return axios.post(`${egg}/api/v1/getBannerHitCharts`, params).then(res => res.data);
};


// 模块用户行为->生产效益->总的录入成本数据的次数
export const getAllCostInfo = params => {
  return axios.post(`${egg}/api/v1/getAllCostInfo`, params).then(res => res.data);
};
// 模块用户行为->生产效益->总得录入生产数据的次数
export const getAllProdInfo = params => {
  return axios.post(`${egg}/api/v1/getAllProdInfo`, params).then(res => res.data);
};
// 模块用户行为->生产效益->昨日录入生产和成本数据总次数及详情
export const getYesBroodInfo = params => {
  return axios.get(`${egg}/api/v1/getYesBroodInfo`, params).then(res => res.data);
};
// 模块用户行为->生产效益->昨日录入育雏鸡、育成鸡、产蛋鸡 生产和成本数据总次数
export const getYesBroodNumByChicken = params => {
  return axios.post(`${egg}/api/v1/getYesBroodNumByChicken`, params).then(res => res.data);
};
// 模块用户行为->生产效益->昨日录入生产和成本数据及详情
export const getYesBroodListByChicken = params => {
  return axios.post(`${egg}/api/v1/getYesBroodListByChicken`, params).then(res => res.data);
};
// 模块用户行为->生产效益->建立批次及栋舍总次数及详情  和昨日建立批次及栋舍次数及详情
export const getAllAndYesBatchInfo = params => {
  return axios.post(`${egg}/api/v1/getAllAndYesBatchInfo`, params).then(res => res.data);
};
// 模块用户行为->生产效益->录入生产效益总人数及用户信息
export const getBroodByUser = params => {
  return axios.post(`${egg}/api/v1/getBroodByUser`, params).then(res => res.data);
};
// 模块用户行为->生产效益->每日录入生产效益数据 图表 新版
export const getProdByTime = params => {
  return axios.post(`${egg}/api/v1/getProdByTime`, params).then(res => res.data);
};
// 模块用户行为->生产效益->每日录入成本数据 图表 新版
export const getCostByTime = params => {
  return axios.post(`${egg}/api/v1/getCostByTime`, params).then(res => res.data);
};
// 模块用户行为->生产效益->每日录入生产和成本数据 图表 旧版
export const getOldProdByTime = params => {
  return axios.post(`${egg}/api/v1/getOldProdByTime`, params).then(res => res.data);
};
// 模块用户行为->生产效益->鸡场总数
export const getAllBatchNum = params => {
  return axios.post(`${egg}/api/v1/getChickenFarmNum`, params).then(res => res.data);
};
// 模块用户行为->生产效益->鸡场总数列表
export const getAllBatchList = params => {
  return axios.post(`${egg}/api/v1/getChickenFarmList`, params).then(res => res.data);
};

// 模块用户行为->云健康->在线监测->基本指标数据
export const getCloudData = params => {
  return axios.post(`${egg}/api/v1/getOnLineDetection`, params).then(res => res.data);
};

//模块用户行为->云健康->云检测提交次数详情
export const getCloudCheckCommit = params => {
  return axios.post(`${egg}/api/v1/getSubmitToDetail`, params).then(res => res.data);
};
//模块用户行为->云健康->云检测今日提交次数详情
export const getCloudCheckTodayCommit = params => {
  return axios.post(`${egg}/api/v1/getTodaySubmitCount`, params).then(res => res.data);
};

//模块用户行为->云健康->免疫程序->免疫趋势基本指标数据
export const getImmuneTrendData = params => {
  return axios.post(`${egg}/api/v1/getTheBaseTable`, params).then(res => res.data);
};
//模块用户行为->云健康->免疫趋势->基本指标->免疫程序总数详情
export const getImmuneAppTotalList = params => {
  return axios.post(`${egg}/api/v1/getBaseApplicationToDetail`, params).then(res => res.data);
};
//模块用户行为->云健康->免疫趋势->基本指标->免疫记录总数详情
export const getImmuneLogTotalList = params => {
  return axios.post(`${egg}/api/v1/getImmuneNumberToCount`, params).then(res => res.data);
};
//模块用户行为->云健康->免疫趋势->基本指标->疫苗记录总数详情->详情
export const getVaccineNumber = params => {
  return axios.post(`${egg}/api/v1/getVaccineNumberToCountToVaccineId`, params).then(res => res.data);
};
//模块用户行为->云健康->免疫趋势->基本指标->疫苗记录总数详情
export const getVaccineTable = params => {
  return axios.post(`${egg}/api/v1/getVaccineNumberToCount`, params).then(res => res.data);
};
//模块用户行为->云健康->免疫趋势->基本指标->送检用户详情
export const getCheckUserDetails = params => {
  return axios.post(`${egg}/api/v1/DetailedUserDetails`, params).then(res => res.data);
};
//模块用户行为->蛋价查询->数据统计->基本指标->搜索次数及列表
export const getEggPriceSearchData = params => {
  return axios.get(`${egg}/api/v1/getEggSearchInfo`, params).then(res => res.data);
};
//模块用户行为->蛋价查询->数据统计->基本指标->搜索次数及列表查询详细
export const getEggPriceSearchList = params => {
  return axios.get(`${egg}/api/v1/getEggSearchListByDate`, params).then(res => res.data);
};
//模块用户行为->蛋价查询->数据统计->基本指标->搜索次数及列表查询详细->每个日期内的蛋价搜索人数列表
export const getDaySearchList = params => {
  return axios.post(`${egg}/api/v1/getEggSearchListByDate`, params).then(res => res.data);
};
//模块用户行为->蛋价查询->数据统计->各省使用搜索次数图表
export const getPriceSearchChart = params => {
  return axios.post(`${egg}/api/v1/getEggSearchNumByProvice`, params).then(res => res.data);
};
//模块用户行为->蛋价查询->数据统计->各市使用搜索次数图表
export const getCitySearchChart = params => {
  return axios.post(`${egg}/api/v1/getEggSearchNumByCity`, params).then(res => res.data);
};
//模块用户行为->蛋价查询->数据统计->各市使用搜索次数图表详细
export const getCitySearchInfo = params => {
  return axios.post(`${egg}/api/v1/getUserListByCity`, params).then(res => res.data);
};
//模块用户行为->蛋价查询->数据统计->每日蛋价预测人数图表
export const getEggPriceForecastInfo = params => {
  return axios.post(`${egg}/api/v1/getEggPredictNumByDate`, params).then(res => res.data);
};
//模块用户行为->蛋价查询->数据统计->每日蛋价预测人数图表人员详细列表
export const getEggPriceForecastList = params => {
  return axios.post(`${egg}/api/v1/getEggPredictUserList`, params).then(res => res.data);
};
//模块用户行为->价格行情->鸡蛋报价->鸡蛋报价人数趋势图
export const getEggOfferChart = params => {
  return axios.post(`${egg}/api/v1/getEggPriceUserNumByDate`, params).then(res => res.data);
};
//模块用户行为->价格行情->原料报价->原料报价人数趋势图
export const getOfferAnalyseData = params => {
  return axios.post(`${egg}/api/v1/getPriceUserNumByHourAndArea`, params).then(res => res.data);
};
//模块用户行为->价格行情->原料报价->原料报价人数趋势图
export const getMaterialOfferChart = params => {
  return axios.post(`${egg}/api/v1/getYlPriceUserNumByDate`, params).then(res => res.data);
};
//模块用户行为->价格行情->价格分析->图表数据
export const getPriceAnaylseData = params => {
  return axios.post(`${egg}/api/v1/getPriceUserNumByHourAndArea`, params).then(res => res.data);
};
//模块用户行为->热点资讯->阅读文章-阅读文章总次数/pv
export const getReadArticleCount = params => {
  return axios.post(`${egg}/api/v1/ReadingTheTotalNumberOfArticles`, params).then(res => res.data);
};
//模块用户行为->热点资讯->阅读文章-阅读文章总次数/pv详情
export const getReadArticleCountpvDetail = params => {
  return axios.post(`${egg}/api/v1/getReadingTheTotalNumberToDetail`, params).then(res => res.data);
};
//模块用户行为->热点资讯->阅读文章-每天阅读文章次数详情(图表点击)
export const getDayReadArticleCountDetail = params => {
  return axios.post(`${egg}/api/v1/getReadArticleTodayCountDetail`, params).then(res => res.data);
};
//模块用户行为->热点资讯->阅读文章-每天阅读文章次数列表标题点击详情
export const getDayReadArticleInfos = params => {
  let param = new FormData(); //创建form对象
  param.append('date_time', params.date_time);
  param.append('news_id', params.news_id);
  param.append('page', params.page);
  param.append('currentPage', params.currentPage);
  param.append('keyword', params.keyword);
  return axios.post(`${egg}/api/v1/getReadArticleTodayCountDetailToMore`, param).then(res => res.data);
};
//模块用户行为->热点资讯->阅读文章-每天阅读文章次数
export const getDayReadArticle = params => {
  return axios.post(`${egg}/api/v1/TodayReadingArticlesCount`, params).then(res => res.data);
};
//模块用户行为->热点资讯->分享-分享文章总次数
export const getshareArticleCount = params => {
  return axios.post(`${egg}/api/v1/getShareArticleCount`, params).then(res => res.data);
};
//模块用户行为->热点资讯->分享-每天分享文章次数
export const getshareArticleCountChart = params => {
  return axios.post(`${egg}/api/v1/getDayShareArticleCount`, params).then(res => res.data);
};
//模块用户行为->热点资讯->分享-每天分享文章人数
export const getshareArticlePersonChart = params => {
  return axios.post(`${egg}/api/v1/getDayShareToPerson`, params).then(res => res.data);
};
//模块用户行为->热点资讯->阅读文章分析-阅读时段统计
export const getreadArticleTimeChart = params => {
  return axios.post(`${egg}/api/v1/getReadArticleToHourStatics`, params).then(res => res.data);
};
//模块用户行为->热点资讯->阅读文章分析-阅读模块统计
export const getreadArticleModuleChart = params => {
  return axios.post(`${egg}/api/v1/getReadArticleToModuleStatics`, params).then(res => res.data);
};
//模块用户行为->基本指标->管家商城->数据统计->基本指标
export const getManagerMallData = params => {
  return axios.post(`${egg}/api/v1/getShopCount `, params).then(res => res.data);
};
//模块用户行为->管家商城->数据统计->兑换次数详情
export const getExchangeNumData = params => {
  return axios.post(`${egg}/api/v1/getDetailsOfTheTimesOfExchange`, params).then(res => res.data);
};
//模块用户行为->管家商城->数据统计->兑换次数日期点击详情
export const getExchangeNumDateData = params => {
  return axios.post(`${egg}/api/v1/getDetailOfTheTime`, params).then(res => res.data);
};
//模块用户行为->管家商城->数据统计->收藏次数详情
export const getCollectNumData = params => {
  return axios.post(`${egg}/api/v1/getDetailCollection`, params).then(res => res.data);
};
//模块用户行为->管家商城->数据统计->收藏次数日期点击详情
export const getCollectNumDateData = params => {
  return axios.post(`${egg}/api/v1/getDetailCollectionToTimeDetail`, params).then(res => res.data);
};
//模块用户行为->活动中心->大转盘使用情况->使用大转盘次数
export const getBigDialNumData = params => {
  return axios.post(`${egg}/api/v1/getAdventuresOfCount`, params).then(res => res.data);
};
//模块用户行为->活动中心->大转盘使用情况->使用大转盘人数
export const getBigDialPersonData = params => {
  return axios.post(`${egg}/api/v1/getAdventuresPeopleOfCount`, params).then(res => res.data);
};
//模块用户行为->活动中心->大转盘使用情况->使用大转盘次数详情
export const getBigDialNumDetail = params => {
  return axios.post(`${egg}/api/v1/getAdventuresOfCountToDate`, params).then(res => res.data);
};
//模块用户行为->活动中心->大转盘使用情况->使用大转盘人数详情
export const getBigDialPersonDetail = params => {
  return axios.post(`${egg}/api/v1/getAdventuresOfCountToPeople`, params).then(res => res.data);
};
//模块用户行为->管家视界->养殖课堂->基本指标
export const getManagerEyeShotDate = params => {
  return axios.post(`${egg}/api/v1/getCultureTotalViewCounts`, params).then(res => res.data);
};
//模块用户行为->管家视界->养殖课堂->基本指标-总观看次数详情
export const getViewVideoTotalDetail = params => {
  return axios.post(`${egg}/api/v1/getCountViewing`, params).then(res => res.data);
};
//模块用户行为->管家视界->养殖课堂->基本指标-总评分次数详情
export const getTotalScoreDetail = params => {
  return axios.post(`${egg}/api/v1/getCountScore`, params).then(res => res.data);
};
//模块用户行为->管家视界->养殖课堂->基本指标-总收藏次数详情
export const getTotalCollectDetail = params => {
  return axios.post(`${egg}/api/v1/getCountToCollection`, params).then(res => res.data);
};
//模块用户行为->管家视界->养殖课堂->基本指标-总留言量详情
export const getTotalMessageDetail = params => {
  return axios.post(`${egg}/api/v1/getMessageCount`, params).then(res => res.data);
};
//模块用户行为->管家视界->养殖课堂->每天收藏视频次数
export const getDayCollectVideoNum = params => {
  return axios.post(`${egg}/api/v1/getCultureToCollectionCount`, params).then(res => res.data);
};
//模块用户行为->管家视界->养殖课堂->每天收藏视频次数详情
export const getDayCollectNumDetail = params => {
  return axios.post(`${egg}/api/v1/getTodayFavoriteToDetail`, params).then(res => res.data);
};
//模块用户行为->管家视界->走进鸡场->基本指标
export const getIntoChickenHouseTotalData = params => {
  return axios.post(`${egg}/api/v1/getFarmtoCulture`, params).then(res => res.data);
};
//模块用户行为->管家视界->走进鸡场->基本指标-总观看次数详情
export const getIntoFrameViewsTotal = params => {
  return axios.post(`${egg}/api/v1/getChickToViewingTimes`, params).then(res => res.data);
};
//模块用户行为->管家视界->走进鸡场->基本指标-总报名人数详情
export const getIntoFramePostTotal = params => {
  return axios.post(`${egg}/api/v1/getCountTotalNumberOfEnrolmentToDetail `, params).then(res => res.data);
};
//模块用户行为->管家视界->走进鸡场->每天报名人数图表
export const getreportedData = params => {
  return axios.post(`${egg}/api/v1/getSignUpCountToPeople`, params).then(res => res.data);
};
//模块用户行为->管家视界->走进鸡场->每天报名人数图表详情
export const getDayPostData = params => {
  return axios.post(`${egg}/api/v1/getTodayNumberOfEnrolmentDetail`, params).then(res => res.data);
};
//模块用户行为->管家视界->走进鸡场->走进鸡场报名情况
export const getFramEnrollData = params => {
  return axios.post(`${egg}/api/v1/getFarmToListDetail`, params).then(res => res.data);
};
//模块用户行为->论坛->论坛趋势->基本指标->论坛发帖总数
export const getForumTotalData = params => {
  return axios.post(`${egg}/api/v1/getAllArticleList`, params).then(res => res.data);
};
//模块用户行为->论坛->论坛趋势->基本指标->当天发帖总数
export const getDayForumTotalData = params => {
  return axios.post(`${egg}/api/v1/getTodayArticleInfo`, params).then(res => res.data);
};
//模块用户行为->论坛->论坛趋势->基本指标->精华帖总数
export const getGoodForumTotalData = params => {
  return axios.post(`${egg}/api/v1/getBestArticleInfo`, params).then(res => res.data);
};
//模块用户行为->论坛->论坛趋势->基本指标->当天精华帖总数
export const getDayGoodForumTotalData = params => {
  return axios.post(`${egg}/api/v1/getTodayBestArticleInfo`, params).then(res => res.data);
};
//模块用户行为->论坛->论坛趋势->基本指标->提问帖总数
export const getAskForumTotalData = params => {
  return axios.post(`${egg}/api/v1/getQuestionArticleInfo`, params).then(res => res.data);
};
//模块用户行为->论坛->论坛趋势->基本指标->当天提问帖帖总数
export const getDayAskForumTotalData = params => {
  return axios.post(`${egg}/api/v1/getTodayQuestionArticleInfo`, params).then(res => res.data);
};
//模块用户行为->论坛->论坛趋势->基本指标->被举报帖总数
export const getReportedForumTotalData = params => {
  return axios.post(`${egg}/api/v1/getReportArticleInfo`, params).then(res => res.data);
};
//模块用户行为->论坛->论坛趋势->基本指标->当天被举报帖帖总数
export const getDayReportedForumTotalData = params => {
  return axios.post(`${egg}/api/v1/getTdReportArticleInfo`, params).then(res => res.data);
};
//模块用户行为->论坛->论坛趋势->论坛发帖时间趋势图
export const getForumTimeChartData = params => {
  return axios.post(`${egg}/api/v1/getSendArticleNumByDate`, params).then(res => res.data);
};
//模块用户行为->论坛->论坛趋势->未采纳意见的提问帖
export const getNoForumData = params => {
  return axios.post(`${egg}/api/v1/getNotAnswerArticleInfo`, params).then(res => res.data);
};
