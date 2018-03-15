<template>
  <div class="total-info pad">
    <!--<div class="crumbs_me">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem>概况</BreadcrumbItem>
        <BreadcrumbItem to="/trend">整体趋势</BreadcrumbItem>
        <BreadcrumbItem to="/totaldownload">总下载量</BreadcrumbItem>
      </Breadcrumb>
    </div>-->
    <div class="table-title tableStyle" style="padding-left:20px;width:100%;">
      今天使用扫一扫情况
    </div>

    <!-- <Table border :columns="historyColumns" :data="historyData" style="margin-right: 20px;"></Table> -->
    <i-table :columns="historyColumns" :data="historyData" size="large"></i-table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage" show-elevator></Page>
      </div>
    </div>
  </div>
</template>
<script>
  import { getSysCountToday,downloadList } from '../../../api/api'
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
            width: 100,
            align: "center"
          }, {
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
            title: '活动名称',
            key: 'title',
            align: "center"
          },
          {
            title: '使用时间',
            key: 'create_time',
            align: "center"
          },
          {
            title: '活动开始时间',
            key: 'start_time',
            align: "center"
          },
          {
            title: '活动结束时间',
            key: 'end_time',
            align: "center"
          },
          {
            title: '城市',
            key: 'city',
            sortable: true,
            align: "center"
          }
        ],
        historyData: [],
        total_down_list: [], //总数据存放的地方
      }
    },
    methods: {
      getScanTody() {
        getSysCountToday().then(res => {
          console.log(res.data.list)
          this.historyData = res.data.list;
          this.dataCount = res.data.list.list.length;
          var i = 1
          this.historyData.forEach((item, index) => {
          item['numid'] = i++
          })
        })
      },
      changepage(index) {
        getSysCountToday({
          c_page: index
        }).then(res => {
          this.historyData = res.data.list;
          this.dataCount = res.data.list.list.length;
          var i = 1
          this.historyData.forEach((item, index) => {
          item['numid'] = i++
          })
        })
        document.getElementsByClassName("pad")[0].scrollTop = 0
      },
    },
    mounted() {
      this.getScanTody();
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
    border-left: 0;
  }

  .total-info {
    padding-left: 20px;
  }
  .pad {
    margin-top: 20px;
  }
  .ivu-table-wrapper .ivu-table th {
    height: 40px;
    white-space: nowrap;
    overflow: hidden;
    background: #fff;
  }
</style>
