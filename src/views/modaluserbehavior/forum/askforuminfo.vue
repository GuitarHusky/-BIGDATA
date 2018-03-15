<template>
  <div class="total-info pad">
    <Row>
      <Col span="24" class="table-title tableStyle">提问帖详细
      <DatePicker type="daterange" :options="options2" placement="bottom" v-model="timeInput" confirm format="yyyy-MM-dd"  style="width: 200px;font-size:14px;margin-left:30px;"></DatePicker>
      <Button type="primary" @click="searchAskForumData">搜索</Button>
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
  import { getAskForumTotalData } from '../../../api/api'
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
            title: '用户名称',
            width: 130,
            key: 'username',
            align: "center"
          },
          {
            title: '真实姓名',
            width: 110,
            key: 'real_name',
            align: "center"
          },
          {
            title: '注册手机号',
            key: 'mobile_phone',
            width: 130,
            align: "center"
          },
          {
            title: '手机号归属地',
            sortable: true,
            width: 150,
            key: 'tel_address',
            align: "center"
          },
          {
            title: '注册地址',
            key: 'address',
            sortable: true,
            width:180,
            align: "center"
          },
          {
            title: '文章标题',
            key: 'title',
            width:180,
            align: "center"
          },
          {
            title: '收藏量',
            width:90,
            key: 'favorite',
            align: "center"
          },
          {
            title: '点赞量',
            key: 'praise',
            width: 90,
            align: "center"
          },
          {
            title: '分享量',
            key: 'shareCount',
            width:90,
            align: "center"
          },
          {
            title: '浏览量',
            width: 90,
            key: 'view',
            align: "center"
          },
          {
            title: '举报量',
            width: 90,
            key: 'reportCount',
            align: "center"
          },
          {
            title: '回复量',
            width: 90,
            key: 'commentCount',
            align: "center"
          },{
            title: '状态',
            width: 90,
            key: 'communityStatus',
            align: "center"
          },{
            title: '帖子类型',
            width: 110,
            key: 'communityType',
            align: "center"
          },{
            title: '创建时间',
            key: 'create_time',
            width:180,
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
        getAskForumTotalData({
          star_time: this.begintime,
          end_time: this.endtime,
          c_page: index
        }).then(res => {
          this.dataCount = res.data.list.num;
          this.historyData = res.data.list.list
          var num = 1;
          this.historyData.forEach((item, index) => {
            item['numid'] = num++
          })
        })
        document.getElementsByClassName("pad")[0].scrollTop = 0;
      },
      //用户分析->注册用户详细列表
     getaskforumdata() {

        this.dataCount = 0;
        this.historyData = []
        getAskForumTotalData().then(res => {
          this.dataCount = res.data.list.num;
          this.historyData = res.data.list.list
          var num = 1;
          this.historyData.forEach((item, index) => {
            item['numid'] = num++
          })
        })
      },

      searchAskForumData() {
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
        getAskForumTotalData({
          star_time: this.begintime,
          end_time: this.endtime,
          c_page: 1
        }).then(res => {
          this.dataCount = res.data.list.num;
          this.historyData = res.data.list.list
          var num = 1;
          this.historyData.forEach((item, index) => {
            item['numid'] = num++
          })
          this.hello_curr = 1
        })
      }

    },
    mounted() {
      this.getaskforumdata()
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
