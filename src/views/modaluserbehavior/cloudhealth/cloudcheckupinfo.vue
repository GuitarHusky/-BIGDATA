<template>
  <div class="total-info pad">
    <Row>
      <Col span="24" class="table-title tableStyle">云检测提交详细
      <DatePicker type="daterange" :options="options2" placement="bottom" v-model="timeInput" confirm format="yyyy-MM-dd"  style="width: 200px;font-size:14px;margin-left:30px;"></DatePicker>
      <Button type="primary" @click="searchTotalRegister">搜索</Button>
      <Button type="primary" @click="goBack" style="float:right;margin-right:50px;">返回</Button>
      </Col>
    </Row>
    <Row>
      <Col span="24">
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
  import { getCloudCheckCommit } from '../../../api/api'
  export default {
    data() {
      return {
        // 初始化信息总条数
        dataCount: 0,
        // 每页显示多少条
        pageSize: 15,
        hello_curr: 1,
        historyColumns: [{
            title: '序号',
            key: 'numid',
            width: 60,
            align: "center"
          }, {
            title: '用户名',
            key: 'username',
            align: "center",
            width: 125
          },
          {
            title: '手机号',
            key: 'mobile_phone',
            align: "center",
            width: 125,
          },
          {
            title: '归属地',
            key: 'number_attribution',
            sortable: true,
            width:95,
            align: "center"
          },
          {
            title: '真实姓名',
            key: 'real_name',
            width: 95,
            align: "center"
          },
          {
            title: '地区',
            key: 's_farm_addr',
            sortable: true,
            width:160,
            align: "center"
          },
          {
            title: '养殖场',
            width: 150,
            key: 's_farm_name',
            align: "center"
          },
          {
            title: '栋舍',
            width: 70,
            key: 's_batch_name',
            align: "center"
          },
          {
            title: '蛋鸡品种',
            key: 's_type_chiken',
            width: 95,
            align: "center"
          },
          {
            title: '日龄',
            key: 's_old_day',
            width: 65,
            align: "center"
          },
          {
            title: '问题简述',
            width: 280,
            key: 's_issue_sketch',
            align: "center"
          },
          {
            title: '状态',
            key: 'status',
            width: 115,
            align: "center"
          },
          {
            title: '创建时间',
            key: 'create_time',
            align: "center",
            width: 180,
            fixed: 'right'
          },
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
    methods: {
      goBack(){
        window.history.back()
      },
      //点击分页
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
        getCloudCheckCommit({
          start_time: this.begintime,
          end_time: this.endtime,
          page: index
        }).then(res => {
          this.dataCount = res.result.count;
          this.historyData = res.result.data
          var num = 1;
          this.historyData.forEach((item, index) => {
            item['numid'] = num++
            item['username'] = item.member_info[0].username
            item['mobile_phone'] = item.member_info[0].mobile_phone
            item['number_attribution'] = item.member_info[0].number_attribution
            item['real_name'] = item.member_info[0].real_name
          })
        })
        document.getElementsByClassName("pad")[0].scrollTop = 0;
      },
      //用户分析->注册用户详细列表
     getRegisterList() {

        this.dataCount = 0;
        this.historyData = []
        getCloudCheckCommit().then(res => {
          this.dataCount = res.result.count;
          this.historyData = res.result.data
          var num = 1;
          this.historyData.forEach((item, index) => {
            item['numid'] = num++
            item['username'] = item.member_info[0].username
            item['mobile_phone'] = item.member_info[0].mobile_phone
            item['number_attribution'] = item.member_info[0].number_attribution
            item['real_name'] = item.member_info[0].real_name
          })
        })
      },

      searchTotalRegister() {
        if(this.timeInput[0] == null || this.timeInput[1] == null){
          this.timeInput = ""
        }
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
        getCloudCheckCommit({
          start_time: this.begintime,
          end_time: this.endtime,
          page: 1
        }).then(res => {
          this.dataCount = res.result.count;
          this.historyData = res.result.data
          var num = 1;
          this.historyData.forEach((item, index) => {
            item['numid'] = num++
            item['username'] = item.member_info[0].username
            item['mobile_phone'] = item.member_info[0].mobile_phone
            item['number_attribution'] = item.member_info[0].number_attribution
            item['real_name'] = item.member_info[0].real_name
          })
            this.hello_curr = 1
        })
      }

    },
    mounted() {
      this.getRegisterList()
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
