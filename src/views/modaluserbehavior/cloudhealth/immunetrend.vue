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
          <span>免疫记录总数</span></br>
          <span class='date-num'>{{ immunerecordtotal }}</span></br>
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
  </div>
</template>

<script>
  import { getImmuneTrendData } from '../../../api/api'
  export default {
    data() {
      return {
        immunepgnum:'',//免疫程序总数
        immunerecordtotal:'', //免疫记录总数
        vaccinerecordtotal:'', //疫苗记录总数
        begintime: '',
        endtime: '',

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
        getImmuneTrendData().then(res => {
        console.log(res)
        this.immunepgnum = res.result.totalApplication
        this.immunerecordtotal = res.result.totalImmunization
        this.vaccinerecordtotal = res.result.totalVaccineRecord
        this.user_total = false
      })
      },
    },
    mounted() {
      this.getDataTotal();
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
