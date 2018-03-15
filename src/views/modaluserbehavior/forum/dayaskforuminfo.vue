<template>
  <div class="total-info pad">
    <Row>
      <Col span="24" class="table-title tableStyle">当天提问帖帖详细
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
  import { getDayAskForumTotalData } from '../../../api/api'
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
            key: 'real_name',
            width: 110,
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
            width:150,
            align: "center"
          },
          {
            title: '收藏量',
            width: 90,
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
            width: 90,
            align: "center"
          },
          {
            title: '浏览量',
            key: 'view',
            width: 90,
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
      }
    },
    methods: {
      goBack(){
        window.history.back()
      },
      //点击分页
      changepage(index) {
        getDayAskForumTotalData({
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

     getaskdayforumdata() {
        this.dataCount = 0;
        this.historyData = []
        getDayAskForumTotalData().then(res => {
          this.dataCount = res.data.list.num;
          this.historyData = res.data.list.list
          var num = 1;
          this.historyData.forEach((item, index) => {
            item['numid'] = num++
          })
        })
      },
    },
    mounted() {
      this.getaskdayforumdata()
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
