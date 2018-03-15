<template>
  <div class="pad">
    <Row>
      <Col span="24" class="table-title" style="font-size:18px;">基本指标</Col>
    </Row>
    <Row>
      <router-link tag='div' to=''>
        <Col class="trend-col" span="6" offset="2">
        <div style="font-size: 16px;" v-if='user_total'>
          加载中...
        </div>
        <div v-else>
          <span>云健康使用次数</span></br>
          <span class='date-num'>{{cloudcheckusenum}}</span></br>
        </div>
        </Col>
      </router-link>
      <router-link tag='div' to='/modaluser/cloudcheckupinfo'>
        <Col class="trend-col" span="6" offset="2">
        <div style="font-size: 16px;" v-if='user_total'>
          加载中...
        </div>
        <div v-else>
          <span>云检测提交次数</span></br>
          <span class='date-num'>{{cloudcheckupnum}}</span></br>
        </div>
        </Col>
      </router-link>
      <router-link tag='div' to='/modaluser/cloudchecktodayup'>
        <Col class="trend-col" span="6" offset="2">
        <div style="font-size: 16px;" v-if='user_total'>
          加载中...
        </div>
        <div v-else>
          <span>云检测今日提交次数</span></br>
          <span class='date-num'>{{todaycloudcheckupnum}}</span></br>
        </div>
        </Col>
      </router-link>
    </Row>
    <Row style="margin-top:20px;">
      <Col span="24" class="table-title tableStyle">用户送检详情
       <DatePicker type="daterange" :options="options2" placement="bottom" v-model="timeInput" confirm format="yyyy-MM-dd"  placeholder="请选择时间段" style="width: 200px;font-size:14px;margin-left:70px;"></DatePicker>
      <Button type="primary" @click="searchData" id="search">搜索</Button>
      </Col>
    </Row>
    <Row>
      <Col span="24" style="overflow-x:hidden;">
      <i-table :columns="historyColumns" :data="historyData" size="small" style="overflow-x:hidden;"></i-table>
      </Col>
    </Row>
    <div style="margin: 10px 10% 20px 0;overflow: hidden">
      <div style="float: right;">
        <Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator :current.sync="hello_curr"></Page>
      </div>
    </div>
  </div>
</template>

<script>
  import { getCloudData,getCheckUserDetails } from '../../../api/api'
  export default {
    data() {
      return {
        dataCount: 0,
        pageSize: 20,
        cloudcheckusenum:'',//云健康使用次数
        cloudcheckupnum:'', //云检测提交次数
        todaycloudcheckupnum:'', //云检测今日提交次数
        begintime: '',
        endtime: '',
        timeInput: '',
        hello_curr: 1,
        historyColumns: [{
          title: '序号',
          key: 'numid',
          width:100,
          align: "center"
        }, {
          title: '用户名',
          key: 's_user_phone',
          width: 135,
          align: "center"
        }, {
          title: '手机号',
          key: 's_user_phone',
          width: 135,
          align: "center"
        }, {
          title: '归属地',
          key: 'number_attributions',
          sortable: true,
          width: 155,
          align: "center"
        }, {
          title: '真实姓名',
          key: 's_user_name',
          width: 120,
          align: "center"
        },{
          title: '送检中心',
          key: 'test_center',
          width: 115,
          align: "center"
        },{
          title: '检测项目',
          key: 'checkdetil',
          width: 175,
          align: "center"
        },{
          title: '检测单状态',
          key: 'orderStatus',
          width: 115,
          align: "center"
        },{
          title: '分析顾问',
          key: 'vet_name',
          width: 110,
          align: "center"
        },{
          title: '发起支付金额',
          key: 'countPrice',
          width: 135,
          align: "center"
        },{
          title: '实际支付金额',
          key: 'pay',
          width: 135,
          align: "center"
        },{
          title: '提交时间',
          key: 'date',
          width: 180,
          fixed: 'right',
          align: "center"
        }],
        historyData: [],
        list_arr:[],
        phone_number: '',

        user_total: true,
        options2: {
                    disabledDate (date) {
                        return date && date.valueOf() >= Date.now();
                    },
                    shortcuts: [
                        {
                            text: '今日',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime());
                                return [start, end];
                            }
                        },
                        {
                            text: '昨日',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近一周',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近一个月',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近三个月',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近半年',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
                                return [start, end];
                            }
                        },{
                            text: '最近一年',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
                                return [start, end];
                            }
                        }
                    ]
        }
      }
    },
    methods: {
      getDataTotal(){
        getCloudData().then(res => {
        this.cloudcheckusenum = res.result.useCount
        this.cloudcheckupnum = res.result.submitCount
        this.todaycloudcheckupnum = res.result.todayCount
        this.user_total = false
      })
      },
      getCheckUserDetailTable(){
        getCheckUserDetails().then(res => {
          this.dataCount = res.result.count
          this.historyData = res.result.data;
          var i = 1
          this.historyData.forEach((item, index) => {
            item['numid'] = i++
            // item['orderStatus']=item.project
            if(item.project && item.project.length>0){
              item.project.forEach((item,index)=>{
                /*if(this.list_arr.indexOf(item.title) == -1){*/
                  this.list_arr=[]
                  this.list_arr.push(item.title)
                /*}*/
              })
            }else{
              item['checkdetil'] = ""
            }
            item['checkdetil']=this.list_arr.join(",");

            if(item.paystatus == 4) {
            item['orderStatus'] = "已提交"
            }else if(item.paystatus == 1 && item.send_status == 1 && item.vet_id != 0){
              item['orderStatus'] = "完成报告"
            }else if(item.paystatus == 1){
              item['orderStatus'] = "检测中"
            }else if(item.paystatus == 4 && item.send_status == 0 && item.vet_id != 0){
              item['orderStatus'] = "分析中"
            }

            if(item.countPrice == 0){
              item['countPrice'] = "未发起"
            }

            if(item.pay.length == 0){
              item['pay'] = "未发起"
            }else{
            if(item.pay[0].status == 0){
              item['pay'] = "待支付"
            }
            if(item.pay[0].status == 1){
              item['pay'] = item.countPrice
            }
            if(item.pay[0].status == 2){
              item['pay'] = "检测已完成"
            }
            if(item.pay[0].status == 3){
              item['pay'] = "报告已完成"
            }
            if(item.pay[0].status == 4){
              item['pay'] = "支付失败"
            }
            }
          })
        })
      },
      searchData(){
        if(this.timeInput[0] == null || this.timeInput[1] == null){
          this.timeInput = ""
        }
        if(this.timeInput[0] == null || this.timeInput[1] == null){
        document.getElementById("search").disabled = true;
        this.getCheckUserDetailTable()
        document.getElementById("search").disabled = false;
        }else{
        document.getElementById("search").disabled = true;
        var begin = new Date(this.timeInput[0])
        this.begintime = begin.getFullYear() + '-' + (begin.getMonth() + 1) + '-' + begin.getDate()
        var end = new Date(this.timeInput[1])
        this.endtime = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()

        if(this.begintime == 'NaN-NaN-NaN') {
          this.begintime = ''
        }
        if(this.endtime == 'NaN-NaN-NaN') {
          this.endtime = ''
        }
        getCheckUserDetails({
          page: 1,
          start_time: this.begintime,
          end_time: this.endtime,
        }).then(res => {
          this.historyData = res.result.data;
          this.dataCount = res.result.count;
          document.getElementById("search").disabled = false
          var i = 1
          this.historyData.forEach((item, index) => {
            item['numid'] = i++
            // item['orderstatus']=item.project
            if(item.project && item.project.length>0){
              item.project.forEach((item,index)=>{
                /*if(this.list_arr.indexOf(item.title) == -1){*/
                  this.list_arr=[]
                  this.list_arr.push(item.title)
                /*}*/
              })
            }else{
              item['checkdetil'] = ""
            }
            item['checkdetil']=this.list_arr.join(",");

            if(item.paystatus == 4) {
            item['orderStatus'] = "已提交"
            }else if(item.paystatus == 1 && item.send_status == 1 && item.vet_id != 0){
              item['orderStatus'] = "完成报告"
            }else if(item.paystatus == 1){
              item['orderStatus'] = "检测中"
            }else if(item.paystatus == 4 && item.send_status == 0 && item.vet_id != 0){
              item['orderStatus'] = "分析中"
            }

            if(item.pay.length == 0){
              item['pay'] = "未发起"
            }else{
            if(item.pay[0].status == 0){
              item['pay'] = "待支付"
            }
            if(item.pay[0].status == 1){
              item['pay'] = "已支付,待送检"
            }
            if(item.pay[0].status == 2){
              item['pay'] = "检测已完成"
            }
            if(item.pay[0].status == 3){
              item['pay'] = "报告已完成"
            }
            if(item.pay[0].status == 4){
              item['pay'] = "支付失败"
            }
            }
          })
          this.hello_curr = 1
        })
        }
        document.getElementById("search").disabled = true;

        var now_time = new Date().getTime();
        var beginTime = this.timeInput[0].getTime()
        var endTime = this.timeInput[1].getTime()
        if(endTime > now_time) {
          this.$Message.info('结束时间不能大于当前日期!')
          return
        }
        if(beginTime > this.endtime) {
          this.$Message.info('结束时间需大于开始时间!')
          return
        }
        var begin = new Date(this.timeInput[0])
        this.begintime = begin.getFullYear() + '-' + (begin.getMonth() + 1) + '-' + begin.getDate()
        var end = new Date(this.timeInput[1])
        this.endtime = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()

        if(this.begintime == 'NaN-NaN-NaN') {
          this.begintime = ''
        }
        if(this.endtime == 'NaN-NaN-NaN') {
          this.endtime = ''
        }
        getCheckUserDetails({
          page: 1,
          start_time: this.begintime,
          end_time: this.endtime,
        }).then(res => {
          this.historyData = res.result.data;
          this.dataCount = res.result.count;
          document.getElementById("search").disabled = false
          var i = 1
          this.historyData.forEach((item, index) => {
            item['numid'] = i++
            // item['orderstatus']=item.project
            if(item.project && item.project.length>0){
              item.project.forEach((item,index)=>{
                /*if(this.list_arr.indexOf(item.title) == -1){*/
                  this.list_arr=[]
                  this.list_arr.push(item.title)
                /*}*/
              })
            }else{
              item['checkdetil'] = ""
            }
            item['checkdetil']=this.list_arr.join(",");

            if(item.paystatus == 4) {
            item['orderStatus'] = "已提交"
            }else if(item.paystatus == 1 && item.send_status == 1 && item.vet_id != 0){
              item['orderStatus'] = "完成报告"
            }else if(item.paystatus == 1){
              item['orderStatus'] = "检测中"
            }else if(item.paystatus == 4 && item.send_status == 0 && item.vet_id != 0){
              item['orderStatus'] = "分析中"
            }

            if(item.pay.length == 0){
              item['pay'] = "未发起"
            }else{
            if(item.pay[0].status == 0){
              item['pay'] = "待支付"
            }
            if(item.pay[0].status == 1){
              item['pay'] = "已支付,待送检"
            }
            if(item.pay[0].status == 2){
              item['pay'] = "检测已完成"
            }
            if(item.pay[0].status == 3){
              item['pay'] = "报告已完成"
            }
            if(item.pay[0].status == 4){
              item['pay'] = "支付失败"
            }
            }
          })
        })
      },
      changepage(index) {
        var begin = new Date(this.timeInput[0])
        this.begintime = begin.getFullYear() + '-' + (begin.getMonth() + 1) + '-' + begin.getDate()
        var end = new Date(this.timeInput[1])
        this.endtime = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()

        if(this.begintime == 'NaN-NaN-NaN') {
          this.begintime = ''
        }
        if(this.endtime == 'NaN-NaN-NaN') {
          this.endtime = ''
        }
        getCheckUserDetails({
          page: index,
          start_time: this.begintime,
          end_time: this.endtime,
        }).then(res => {
          this.historyData = res.result.data;
          this.dataCount = res.result.count;
          var i = 1;
          this.historyData.forEach((item, index) => {
            item['numid'] = i++
            if(item.project && item.project.length>0){
              item.project.forEach((item,index)=>{
                  this.list_arr=[]
                  this.list_arr.push(item.title)
              })
            }else{
              item['checkdetil'] = ""
            }
            item['checkdetil']=this.list_arr.join(",");

            if(item.paystatus == 4) {
            item['orderStatus'] = "已提交"
            }else if(item.paystatus == 1 && item.send_status == 1 && item.vet_id != 0){
              item['orderStatus'] = "完成报告"
            }else if(item.paystatus == 1){
              item['orderStatus'] = "检测中"
            }else if(item.paystatus == 4 && item.send_status == 0 && item.vet_id != 0){
              item['orderStatus'] = "分析中"
            }

            if(item.pay.length == 0){
              item['pay'] = "未发起"
            }else{
            if(item.pay[0].status == 0){
              item['pay'] = "待支付"
            }
            if(item.pay[0].status == 1){
              item['pay'] = "已支付,待送检"
            }
            if(item.pay[0].status == 2){
              item['pay'] = "检测已完成"
            }
            if(item.pay[0].status == 3){
              item['pay'] = "报告已完成"
            }
            if(item.pay[0].status == 4){
              item['pay'] = "支付失败"
            }
            }
          })
        })
        document.getElementsByClassName("pad")[0].scrollTop = 0
      },
    },
    mounted() {
      this.getDataTotal();
      this.getCheckUserDetailTable()
    }
  }
</script>

<style scoped>
  .trend-col {
    text-align: center;
    height: 100px;
    background: rgba(243, 250, 241, 0.1);
    /*border: 1px solid rgb(56, 153, 254);*/
    padding-top: 20px;
    cursor: pointer;
  }

  .trend-col:hover,.trend-col:hover .date-num {
    /*box-shadow: 0 0 30px #57B663, 0 0 50px #CCCCCC inset;
    box-shadow: 0 0 30px rgb(56, 153, 254), 0 0 50px rgb(56, 153, 254);*/
    color: rgb(56, 153, 254);
  }

  .trend-col span:first-child {
    font-size: 16px;
  }

  .date-num {
    /*font-size: 24px;*/
    font-size: 30px;
    width: 100%;
    display: inline-block;
    /* transition: 0.3s; */
  }

  /* .date-num:hover {
    font-size: 30px;
      color: #57B663;
    color: rgb(56, 153, 254);
    margin-top: -10px;
  } */

  .ivu-col-offset-2 {
    margin-left: 0;
  }
  .pad {
    padding: 28px 20px;
  }
  .table-title {
    padding-left: 0;
    font-size: 14px;
  }
</style>
