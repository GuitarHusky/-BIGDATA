<template>
  <div class="pad">
    <Row>
      <Col span="24" class="table-title" style="font-size:18px;">基本指标</Col>
    </Row>
    <Row>
      <router-link tag='div' to='/modaluser/immunepginfo'>
        <Col class="trend-col" span="6" offset="2">
        <div style="font-size: 16px;" v-if='user_total'>
          加载中...
        </div>
        <div v-else>
          <span>免疫程序总数</span></br>
          <span class='date-num'>{{ immunepgnum }}</span></br>
        </div>
        </Col>
      </router-link>
      <router-link tag='div' to='/modaluser/immunelognum'>
        <Col class="trend-col" span="6" offset="2">
        <div style="font-size: 16px;" v-if='user_total'>
          加载中...
        </div>
        <div v-else>
          <span style="color: rgb(56, 153, 254);">免疫记录总数</span></br>
          <span class='date-num' style="color: rgb(56, 153, 254);">{{ immunerecordtotal }}</span></br>
        </div>
        </Col>
      </router-link>
      <router-link tag='div' to='/modaluser/vaccinenum'>
        <Col class="trend-col" span="6" offset="2">
        <div style="font-size: 16px;" v-if='user_total'>
          加载中...
        </div>
        <div v-else>
          <span>疫苗记录总数</span></br>
          <span class='date-num'>{{ vaccinerecordtotal }}</span></br>
        </div>
        </Col>
      </router-link>
    </Row>
    <Row style="margin-top:20px;">
      <Col span="24">
      <div class="table-title tableStyle">
        <span>免疫记录详情</span>
        <i-input placeholder="这里输入正确的手机号" v-model='phone_number' style="width: 200px;margin: 0 20px 0 40px;"></i-input>
        <Button type="primary" @click="searchTotalIntegra" id="search">搜索</Button>
      </div>
      <i-table :columns="historyColumns" :data="historyData" size="large"></i-table>
      </Col>
    </Row>
    <div style="margin: 10px 10% 20px 0;overflow: hidden">
      <div style="float: right;">
       <Page :total="dataCount" :page-size="PageSize" show-total :current.sync="hello_curr" class="paging" @on-change="changepage" show-elevator></Page>
      </div>
    </div>
  </div>
</template>
<script>
  import { getImmuneLogTotalList,getImmuneTrendData } from '../../../api/api'
  export default {
    data(){
      return {
        immunepgnum:'',//免疫程序总数
        immunerecordtotal:'', //免疫记录总数
        vaccinerecordtotal:'', //疫苗记录总数
        begintime: '',
        endtime: '',
        PageSize: 20,

        user_total: true,
        // 初始化信息总条数
        dataCount: 0,
        historyColumns: [{
          title: '序号',
          key: 'numid',
          width: 120,
          align: "center"
        }, {
          title: '用户手机号',
          key: 'mobile_phone',
          width: 150,
          align: "center"
        }, {
          title: '真实姓名',
          key: 'real_name',
          width: 150,
          align: "center"
        }, {
          title: '免疫项目',
          key: 'immune_name',
          width: 180,
          align: "center"
        }, {
          title: '实际免疫日龄',
          key: 'day_old',
          width: 180,
          sortable: true,
          align: "center"
        },{
          title: '免疫剂量',
          key: 'immune_dose',
          width: 150,
          align: "center"
        },{
          title: '免疫方法',
          key: 'immune_method',
          width: 150,
          align: "center"
        },{
          title: '免疫数量',
          key: 'immune_num',
          sortable: true,
          width: 160,
          align: "center"
        },{
          title: '实际免疫时间',
          key: 'immune_time',
          width: 190,
          align: "center"
        },{
          title: '记录时间',
          key: 'acreate_time',
          width: 180,
          fixed: 'right',
          align: "center"
        }/*,{
          title: '备注',
          key: 'immune_notice',
          sortable: true,
          align: "center"
        }*/],
        historyData: [],
        registerPhone: '',
        phone_number: '',
        begintime: "",
        endtime: '',
        hello_curr: 1,
        timeInput: '',

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
        getImmuneTrendData().then(res => {
        console.log(res)
        this.immunepgnum = res.result.totalApplication
        this.immunerecordtotal = res.result.totalImmunization
        this.vaccinerecordtotal = res.result.totalVaccineRecord
        this.user_total = false
      })
      },
      searchTotalIntegra() {
        document.getElementById('search').disabled = true
        getImmuneLogTotalList({
          page: 1,
          keyword: this.phone_number
        }).then(res => {
          this.hello_curr = 1;
          if(res.retcode == 2000) {
          this.historyData = res.result.data;
          this.dataCount = res.result.count;
          document.getElementById('search').disabled = false
            var i = 1;
            this.historyData.forEach((item, index) => {
              item['numid'] = i++
            })
          } else {
            alert(res.msg)
          }
        })
      },
      getimmuneloginfo() {
        getImmuneLogTotalList({
          page: 1,
          keyword: this.phone_number
        }).then(res => {
          console.log(res)
          this.historyData = res.result.data;
          this.dataCount = res.result.count;
          var i = 1;
          this.historyData.forEach((item, index) => {
            item['numid'] = i++
          })
        })
      },
      changepage(index) {
        getImmuneLogTotalList({
          page: index,
          keyword: this.phone_number
        }).then(res => {
          this.historyData = res.result.data;
          this.dataCount = res.result.count;
          var i = 1;
          this.historyData.forEach((item, index) => {
            item['numid'] = i++
          })
        })
        document.getElementsByClassName("pad")[0].scrollTop = 0
      },
    },
    mounted() {
      this.getimmuneloginfo();
      this.getDataTotal();
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
  }

  .table-title {
    margin-top: 0;
  }
   .trend-col {
    text-align: center;
    height: 100px;
    background: rgba(243, 250, 241, 0.1);
    padding-top: 20px;
    cursor: pointer;
  }

  .trend-col:hover,.trend-col:hover .date-num {
    color: rgb(56, 153, 254);
  }

  .trend-col span:first-child {
    font-size: 16px;
  }

  .date-num {
    font-size: 30px;
    width: 100%;
    display: inline-block;
  }
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
