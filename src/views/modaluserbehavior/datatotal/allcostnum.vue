<template>
  <div class="total-info pad">
    <Row>
      <Col span="24" class="table-title tableStyle">总的录入成本数据详细
      <i-input placeholder="这里输入正确的手机号" v-model='phone_number' style="width: 200px;margin: 0px 50px 0 40px;"></i-input>
      <RadioGroup v-model="dataprod">
        <Radio label="oldprod">
            <span>旧数据</span>
        </Radio>
        <Radio label="newprod">
            <span>新数据</span>
        </Radio>
    </RadioGroup>
      <DatePicker type="daterange" :options="options2" placement="bottom" v-model="timeInput" confirm format="yyyy-MM-dd"  style="width: 200px;font-size:14px;margin-left:20px;"></DatePicker>
      <Button type="primary" @click="searchDataProd">搜索</Button>
      <Button type="primary" @click="goBack" style="float:right;margin-right:50px;">返回</Button>
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
  import { getAllCostInfo } from '../../../api/api'
  export default {
    data() {
      return {
        dataprod: 'oldprod',
        // 初始化信息总条数
        dataCount: 0,
        // 每页显示多少条
        pageSize: 20,
        hello_curr: 1,
        historyColumns: [{
            title: '序号',
            key: 'numid',
            width:80,
            align: "center"
          }, {
            title: '用户名称',
            key: 'username',
            width:130,
            align: "center"
          },
          {
            title: '手机号',
            key: 'mobile_phone',
            width:130,
            align: "center"
          },
          {
            title: '号码归属地',
            key: 'tel_address',
            width: 105,
            align: "center"
          },
          {
            title: '真实姓名',
            key: 'real_name',
            width:85,
            align: "center"
          },
          {
            title: '地址',
            key: 'address',
            width:130,
            sortable: true,
            align: "center"
          },
          {
            title: '鸡场规模',
            key: 'account',
            width:110,
            /*sortable: true,*/
            align: "center"
          },
          {
            title: '鸡类型',
            key: 'bid',
            width:75,
            sortable: true,
            align: "center"
          },
          {
            title: '批次名称',
            key: 'batch_name',
            width: 110,
            /*sortable: true,*/
            align: "center"
          },
          {
            title: '疫苗',
            key: 'vaccine',
            width:60,
            align: "center"
          },
          {
            title: '药品',
            key: 'drug',
            width:60,
            align: "center"
          },
          {
            title: '饲料单价',
            key: 'feed_unit_price',
            width: 85,
            align: "center"
          },
          {
            title: '煤钱',
            key: 'coal',
            width:60,
            align: "center"
          },
          {
            title: '工资',
            key: 'wages',
            width:60,
            align: "center"
          },
          {
            title: '水电费',
            key: 'water_elec',
            width: 85,
            align: "center"
          },
          {
            title: '鸡粪',
            key: 'chicken_manure',
            width: 60,
            align: "center"
          },
          {
            title: '鸡蛋收益',
            key: 'egg_yield',
            width: 85,
            align: "center"
          },
          {
            title: '其他支出统计',
            key: 'other',
            width:110,
            align: "center"
          },
          {
            title: '录入时间',
            key: 'add_time',
            fixed: 'right',
            width: 180,
            align: "center"
          }
        ],
        historyData: [],
        phone_number: '',
        timeInput: '',
        begintime: '',
        endtime: '',
        oldprod: 'false',
        newprod: 'true',

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
      goBack(){
        window.history.back()
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
       if( this.dataprod === 'newprod' ){
          getAllCostInfo({
          tel: this.phone_number,
          type: 1,
          star_time: this.begintime,
          end_time: this.endtime,
          c_page: index
          }).then(res => {
          this.dataCount =  res.data.broodInfo.count;
          this.historyData = res.data.broodInfo.list
          var num = 1;
          this.historyData.forEach((item, index) => {
            item['numid'] = num++
            if(item.real_name == '' || item.real_name == null){
              item.real_name = '暂无'
            }
            if(item.area==''){
              item.area=item.tel_address
            }else{
              item.area=item.area
            }
          })
        })
        }else{
          getAllCostInfo({
          tel: this.phone_number,
          type: 2,
          star_time: this.begintime,
          end_time: this.endtime,
          c_page: index
          }).then(res => {
          this.dataCount =  res.data.broodInfo.count;
          this.historyData = res.data.broodInfo.list
          var num = 1;
          this.historyData.forEach((item, index) => {
            item['numid'] = num++
            if(item.real_name == '' || item.real_name == null){
              item.real_name = '暂无'
            }
            if(item.area==''){
              item.area=item.tel_address
            }else{
              item.area=item.area
            }
          })
         })
        }
        document.getElementsByClassName("pad")[0].scrollTop = 0;
      },
      //用户分析->注册用户详细列表
      getALLCostList() {
        this.dataCount = 0;
        this.historyData = []
        getAllCostInfo({
          tel: this.phone_number,
          star_time: this.begintime,
          end_time: this.endtime,
        }).then(res => {
          this.dataCount =  res.data.broodInfo.count;
          this.historyData = res.data.broodInfo.list
          var num = 1;
          this.historyData.forEach((item, index) => {
            item['numid'] = num++
            if(item.real_name == '' || item.real_name == null){
              item.real_name = '暂无'
            }
            if(item.area == ''){
              item.area = item.tel_address
            }else{
              item.area = item.area
            }
          })
        })
      },

      searchDataProd() {
        if(this.timeInput[0] == null || this.timeInput[1] == null){
          this.timeInput = ""
        }
        this.dataCount =  [];
        this.historyData = [];
        if(this.timeInput.length){
        if(this.timeInput[0] != null || this.timeInput[1] != null){
        var begin = new Date(this.timeInput[0])
        this.begintime = begin.getFullYear() + '-' + (begin.getMonth() + 1) + '-' + begin.getDate()
        var end = new Date(this.timeInput[1])
        this.endtime = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()

        /*var now_time = new Date().getTime();
        var beginTime = this.timeInput[0].getTime()
        var endTime = this.timeInput[1].getTime()
        if(endTime > now_time){
          this.$Message.info('结束时间不能大于当前日期!')
          return
        }
        if(beginTime > this.endtime) {
          this.$Message.info('结束时间需大于开始时间!')
          return
        }*/
        var now_time = new Date();
        if(this.endtime > now_time) {
          this.$Message.info('结束时间不能大于当前日期!')
          return
        }
        if(this.begintime > this.endtime) {
          this.$Message.info('结束时间需大于开始时间!')
          return
        }
        if(this.begintime == 'NaN-NaN-NaN') {
          this.begintime = ''
        }
        if(this.endtime == 'NaN-NaN-NaN') {
          this.endtime = ''
        }
        }
        }


        if( this.dataprod == 'newprod' ){
          /*console.log("new")*/
          if(this.timeInput.length){
            getAllCostInfo({
            tel: this.phone_number,
            type: 1,
            c_page: 1,
            star_time: this.begintime,
            end_time: this.endtime,
          }).then(res => {
            this.dataCount =  res.data.broodInfo.count;
            this.historyData = res.data.broodInfo.list
            var num = 1;
            this.historyData.forEach((item, index) => {
            item['numid'] = num++
            if(item.real_name == '' || item.real_name == null){
              item.real_name = '暂无'
            }
            if(item.area==''){
              item.area=item.tel_address
            }else{
              item.area=item.area
            }
          })
            this.hello_curr = 1
          })
          return
          }
          getAllCostInfo({
          tel: this.phone_number,
          type: 1,
          star_time: this.begintime,
          end_time: this.endtime,
          c_page: 1
          }).then(res => {
          this.dataCount =  res.data.broodInfo.count;
          this.historyData = res.data.broodInfo.list
          var num = 1;
          this.historyData.forEach((item, index) => {
            item['numid'] = num++
            if(item.real_name == '' || item.real_name == null){
              item.real_name = '暂无'
            }
            if(item.area==''){
              item.area=item.tel_address
            }else{
              item.area=item.area
            }
          })
          this.hello_curr = 1
          })
          }
        else{
          if(this.timeInput[0] == null || this.timeInput[1] == null || !this.timeInput.length){
          this.getALLCostList()
          return
          }
          /*console.log("old")*/
          getAllCostInfo({
          tel: this.phone_number,
          type: 2,
          star_time: this.begintime,
          end_time: this.endtime,
          c_page: 1
          }).then(res => {
          this.dataCount =  res.data.broodInfo.count;
          this.historyData = res.data.broodInfo.list
          var num = 1;
          this.historyData.forEach((item, index) => {
            if(item.real_name == '' || item.real_name == null){
              item.real_name = '暂无'
            }
            item['numid'] = num++
            if(item.area==''){
              item.area=item.tel_address
            }else{
              item.area=item.area
            }
          })
          this.hello_curr = 1
          })
        }
      }
/*      searchDataProd() {
        var begin = new Date(this.timeInput[0])
        this.begintime = begin.getFullYear() + '-' + (begin.getMonth() + 1) + '-' + begin.getDate()
        var end = new Date(this.timeInput[1])
        this.endtime = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()

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
        if(this.begintime == 'NaN-NaN-NaN') {
          this.begintime = ''
        }
        if(this.endtime == 'NaN-NaN-NaN') {
          this.endtime = ''
        }
        if( this.dataprod === 'newprod' ){
          getAllCostInfo({
          tel: this.phone_number,
          type: 1,
          star_time: this.begintime,
          end_time: this.endtime,
          c_page: 1,
          }).then(res => {
          this.dataCount =  res.data.broodInfo.count;
          this.historyData = res.data.broodInfo.list
          var num = 1;
          this.historyData.forEach((item, index) => {
            item['numid'] = num++
            if(item.area==''){
              item.area=item.tel_address
            }else{
              item.area=item.area
            }
          })
        })
        }else{
          getAllCostInfo({
          tel: this.phone_number,
          type: 2,
          star_time: this.begintime,
          end_time: this.endtime,
          c_page: 1
          }).then(res => {
          this.dataCount =  res.data.broodInfo.count;
          this.historyData = res.data.broodInfo.list
          var num = 1;
          this.historyData.forEach((item, index) => {
            item['numid'] = num++
            if(item.area==''){
              item.area=item.tel_address
            }else{
              item.area=item.area
            }
          })
         })
        }
      }*/
    },
    mounted() {
      this.getALLCostList()
    },
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
  .total-info {
    margin-top: 20px;
    border-right: 1px solid #ccc;
  }
  .crumbs_me {
    margin-left: 35px;
  }
  .table-title {
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    box-sizing: border-box;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding-left: 20px;
    border-bottom: none;
  }
  .ivu-col-offset-2 {
    margin-left: 0;
  }

  .table-title,.tableStyle {
    margin-top: 0;
  }
</style>
