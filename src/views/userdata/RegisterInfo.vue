<template>
  <div class="total-info pad">
    <!-- <div class="crumbs_me">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem> 用户分析</BreadcrumbItem>
        <BreadcrumbItem to="/registerinfo">注册用户详细</BreadcrumbItem>
      </Breadcrumb>
    </div> -->
    <Row>
      <Col span="24" class="table-title tableStyle">注册用户详细
      <i-input placeholder="这里输入正确的手机号" v-model='phone_number' style="width: 200px;margin: 0px 50px 0 40px;"></i-input>
      <!-- <DatePicker type="date" v-model='begintime' placeholder="开始时间" style="width: 200px;"></DatePicker>
      <DatePicker type="date" v-model='endtime' placeholder="结束时间" style="width: 200px;margin:0 50px;"></DatePicker> -->
      <DatePicker type="daterange" :options="options2" placement="bottom-start" v-model="timeInput" confirm format="yyyy-MM-dd"  style="width: 200px;font-size:14px;"></DatePicker>
      <Button type="primary" @click="searchTotalRegister">搜索</Button>
      </Col>
    </Row>
    <Row>
      <Col span="24">
      <!-- <Table border :columns="historyColumns" :data="historyData"></Table> -->
      <i-table :columns="historyColumns" :data="historyData" size="large"></i-table>
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
  import { telSearchRegist, registInfo } from '../../api/api'
  export default {
    data() {
      return {
        // 初始化信息总条数
        dataCount: 0,
        // 每页显示多少条
        pageSize: 20,
        hello_curr: 1,
        historyColumns: [{
            title: '序号',
            key: 'numid',
            align: "center"
          }, {
            title: '用户名',
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
            title: '真实姓名',
            key: 'real_name',
            align: "center"
          },
          {
            title: '地区',
            key: 'area',
            sortable: true,
            align: "center"
          },
          {
            title: '标签  ',
            key: 'shenpicomments',
            align: "center"
          },
          {
            title: '注册时间',
            key: 'regist_time',
            width:180,
            align: "center"
          },
          {
            title: '用户信息完整度',
            key: 'wzd',
            align: "center"
          }
        ],
        historyData: [],
        phone_number: '',
        timeInput: '',
        begintime: '',
        endtime: '',

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
    /*updated(){
      this.begintime = this.timeInput[0];
      this.begintime = this.timeInput[1];
    },*/
    methods: {
      //点击分页
      changepage(index) {
        /*console.log(index);*/

        var begin = new Date(this.timeInput[0])
        this.begintime = begin.getFullYear() + '-' + (begin.getMonth() + 1) + '-' + begin.getDate()
        var end = new Date(this.timeInput[1])
        this.endtime = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()

       /* console.log(this.begintime)

        console.log(this.endtime)*/
        if(this.begintime == 'NaN-NaN-NaN') {
          this.begintime = ''
        }
        if(this.endtime == 'NaN-NaN-NaN') {
          this.endtime = ''
        }
        registInfo({
          tel: this.phone_number,
          type: 1,
          /*star_time: this.begintime,
          end_time: this.endtime,*/
          star_time: this.begintime,
          end_time: this.endtime,
          c_page: index
        }).then(res => {
          this.dataCount = res.data.total_regist_list.count;
          this.historyData = res.data.total_regist_list.list
          var num = 1;
          this.historyData.forEach((item, index) => {
            item['numid'] = num++
            if(item.real_name == '' || item.real_name == null){
              item.real_name = '暂无'
            }
            if(item.shenpicomments == '' || item.shenpicomments == null){
              item.shenpicomments = '暂无'
            }
            if(item.area==''){
              item.area=item.tel_address
            }else{
              item.area=item.area
            }
          })
        })
        document.getElementsByClassName("pad")[0].scrollTop = 0;
      },
      //用户分析->注册用户详细列表
      getRegisterList() {
        this.dataCount = 0;
        this.historyData = []
        registInfo({
          tel: this.phone_number,
          type: 1,
          star_time: this.begintime,
          end_time: this.endtime,
          c_page: 1
        }).then(res => {
          this.dataCount = res.data.total_regist_list.count;
          this.historyData = res.data.total_regist_list.list
          var num = 1;
          this.historyData.forEach((item, index) => {
            item['numid'] = num++
            if(item.real_name == '' || item.real_name == null){
              item.real_name = '暂无'
            }
            if(item.shenpicomments == '' || item.shenpicomments == null){
              item.shenpicomments = '暂无'
            }
            if(item.area==''){
              item.area=item.tel_address
            }else{
              item.area=item.area
            }
          })
        })
      },
      searchTotalRegister() {
        if(this.timeInput[0] == null || this.timeInput[1] == null){
          this.timeInput = ""
        }
       /* this.begintime = this.timeInput[0].getTime();
        this.endtime = this.timeInput[1].getTime();
        console.log(this.begintime)
        console.log(this.endtime)*/
        var begin = new Date(this.timeInput[0])
        this.begintime = begin.getFullYear() + '-' + (begin.getMonth() + 1) + '-' + begin.getDate()
        var end = new Date(this.timeInput[1])
        this.endtime = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()
        /*var now_time = new Date().getTime();*/

        /*var now_time = new Date().getTime();
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
*/
        var now_time = new Date();
        if(this.endtime > now_time) {
          this.$Message.info('结束时间不能大于当前日期!')
          return
        }
        if(this.begintime > this.endtime) {
          this.$Message.info('结束时间需大于开始时间!')
          return
        }
        /*console.log(this.begintime)
        console.log(this.endtime)*/
        if(this.begintime == 'NaN-NaN-NaN') {
          this.begintime = ''
        }
        if(this.endtime == 'NaN-NaN-NaN') {
          this.endtime = ''
        }
        registInfo({
          tel: this.phone_number,
          type: 1,
          star_time: this.begintime,
          end_time: this.endtime,
          c_page: 1
        }).then(res => {
          this.dataCount = res.data.total_regist_list.count;
          this.historyData = res.data.total_regist_list.list
          var num = 1;
          this.historyData.forEach((item, index) => {
            item['numid'] = num++
            if(item.real_name == '' || item.real_name == null){
              item.real_name = '暂无'
            }
            if(item.shenpicomments == '' || item.shenpicomments == null){
              item.shenpicomments = '暂无'
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

    },
    mounted() {
      this.getRegisterList();

      this.$store.state.modalStatus = true
      this.$store.state.behaviorStatus = false
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
