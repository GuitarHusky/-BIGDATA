<template>
  <div class="total-info pad">
    <Row>
      <Col span="24" class="table-title tableStyle">Banner点击用户详细
      <i-input placeholder="这里输入正确的手机号" v-model='phone_number' style="width: 200px;margin: 0px 50px 0 40px;"></i-input>
      <DatePicker type="daterange" :options="options2" placement="bottom" v-model="timeInput" confirm format="yyyy-MM-dd"  style="width: 200px;font-size:14px;"></DatePicker>
      <Button type="primary" @click="searchBannerClickTable">搜索</Button>
      <!-- <Button type="primary" @click="goBack" style="float:right;margin-right:50px;">返回</Button> -->
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
  import { getBannerClickTable } from '../../../api/api'
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
            width:70,
            align: "center"
          }, {
            title: '用户名',
            width: 130,
            key: 'username',
            align: "center"
          },
          {
            title: '手机号',
            width: 130,
            key: 'mobile_phone',
            align: "center"
          },
          {
            title: '归属地',
            key: 'tel_address',
            width: 130,
            sortable: true,
            align: "center"
          },
          {
            title: '真实姓名',
            width: 100,
            key: 'real_name',
            align: "center"
          },
          {
            title: '用户地址',
            key: 'area',
            sortable: true,
            width: 135,
            align: "center"
          },
          {
            title: '鸡场规模',
            width: 130,
            key: 'account',
            align: "center"
          },
          {
            title: '注册时间',
            key: 'create_time',
            width:180,
            align: "center"
          },
          {
            title: '手机型号',
            key: 'model',
            width: 120,
            align: "center"
          },{
            title: '系统版本',
            key: 'version',
            width: 100,
            align: "center"
          },{
            title: '蛋鸡管家版本',
            key: 'cur_version',
            width:120,
            align: "center"
          },{
            title: '活跃地区',
            key: 'city',
            width: 150,
            align: "center"
          },{
            title: '活跃时间',
            key: 'add_time',
            width: 180,
            fixed: 'right',
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

    methods: {
      goBack(){
        window.history.back()
      },
      changepage(index) {
        /*var begin = new Date(this.timeInput[0])
        this.begintime = begin.getFullYear() + '-' + (begin.getMonth() + 1) + '-' + begin.getDate()
        var end = new Date(this.timeInput[1])
        this.endtime = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()

        if(this.begintime == 'NaN-NaN-NaN') {
          this.begintime = ''
        }
        if(this.endtime == 'NaN-NaN-NaN') {
          this.endtime = ''
        }*/
        getBannerClickTable({
          tel: this.phone_number,
          star_time: this.begintime,
          end_time: this.endtime,
          c_page: index,
          p_size: this.pageSize
        }).then(res => {
          // console.log(this.dataCount)
          this.dataCount = res.data.list.count;
          this.historyData = res.data.list.list
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
        document.getElementsByClassName("pad")[0].scrollTop = 0
      },
      searchBannerClickTable() {
        if(this.timeInput[0] == null || this.timeInput[1] == null){
          this.timeInput = ""
        }
        var begin = new Date(this.timeInput[0])
        this.begintime = begin.getFullYear() + '-' + (begin.getMonth() + 1) + '-' + begin.getDate()
        var end = new Date(this.timeInput[1])
        this.endtime = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()
        var now_time = new Date();
        if(this.endtime > now_time) {
          this.$Message.info('结束时间不能大于当前日期!')
          return
        }
        if(this.begintime > this.endtime) {
          this.$Message.info('结束时间需大于开始时间!')
          return
        }
        if(this.begintime == '' || this.endtime == "") {
          this.$Message.info('请输入搜素时间!')
          return
        }
        if(this.begintime == 'NaN-NaN-NaN') {
          this.begintime = ''
        }
        if(this.endtime == 'NaN-NaN-NaN') {
          this.endtime = ''
        }
        this.dataCount = 0;
        this.historyData = []
        getBannerClickTable({
          tel: this.phone_number,
          star_time: this.begintime,
          end_time: this.endtime,
          c_page: 1
        }).then(res => {
          this.dataCount = res.data.list.count;
          this.historyData = res.data.list.list
          var num = 1;
          this.historyData.forEach((item, index) => {
            item['numid'] = num++
            if(item.area==''){
              item.area=item.tel_address
            }else{
              item.area=item.area
            }
          })
          this.hello_curr = 1
        })
      },
      //banner点击->banner点击详细列表
      beginaSearchBannerClickTable() {
        this.begintime =  this.$route.params.start_time;
        this.endtime =  this.$route.params.end_time;
        this.dataCount = 0;
        this.historyData = []
        getBannerClickTable({
          tel: this.phone_number,
          star_time: this.begintime,
          end_time: this.endtime,
          c_page: 1
        }).then(res => {
          this.dataCount = res.data.list.count;
          this.historyData = res.data.list.list
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

    },
    mounted() {
      this.beginaSearchBannerClickTable();
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
