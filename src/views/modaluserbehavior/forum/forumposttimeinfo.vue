<template>
  <div class="total-info pad">
    <Row>
      <Col span="24" class="table-title tableStyle">论坛发帖时间详细
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
        <Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator></Page>
      </div>
    </div>
  </div>
</template>
<script>
  import { getForumTotalData } from '../../../api/api'
  export default {
    data() {
      return {
        // 初始化信息总条数
        dataCount: 0,
        // 每页显示多少条
        pageSize: 20,
        historyColumns: [{
            title: '序号',
            key: 'numid',
            width:70,
            align: "center"
          }, {
            title: '用户名称',
            key: 'username',
            width: 130,
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
             width: 130,
            key: 'mobile_phone',
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
            width:170,
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
            width:90,
            key: 'praise',
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
            key: 'view',
            width:90,
            align: "center"
          },
          {
            title: '举报量',
            width:90,
            key: 'reportCount',
            align: "center"
          },
          {
            title: '回复量',
            width:90,
            key: 'commentCount',
            align: "center"
          },{
            title: '状态',
            width:90,
            key: 'communityStatus',
            align: "center"
          },{
            title: '帖子类型',
            width:110,
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
      }
    },
    methods: {
      goBack(){
        window.history.back()
      },
      //点击分页
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
        this.begintime = this.$route.params.time
        this.endtime = this.$route.params.time
        getForumTotalData({
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
     getforumdata() {
        this.begintime = this.$route.params.time
        this.endtime = this.$route.params.time
        this.dataCount = 0;
        this.historyData = []
        getForumTotalData({
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
        })
      },

     /* searchForumData() {
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
        getForumTotalData({
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
        })
      }*/

    },
    mounted() {
      this.getforumdata()
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
