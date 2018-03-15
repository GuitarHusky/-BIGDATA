<template>
  <div class="pad">
    <Row>
      <Col span="24" class="table-title" style="font-size:18px;">基本指标</Col>
    </Row>
    <Row>
      <router-link tag='div' to='/modaluser/exchangeinfo'>
        <Col class="trend-col" span="6">
        <div style="font-size: 16px;" v-if='user_total'>
          加载中...
        </div>
        <div v-else>
          <span>兑换次数</span></br>
          <span class='date-num'>{{exchangeNum}}</span></br>
        </div>
        </Col>
      </router-link>
      <router-link tag='div' to='/modaluser/collectinfo'>
        <Col class="trend-col" span="6">
        <div style="font-size: 16px;" v-if='user_total'>
          加载中...
        </div>
        <div v-else>
          <span>收藏次数</span></br>
          <span class='date-num'>{{collectNum}}</span></br>
        </div>
        </Col>
      </router-link>
    </Row>
  </div>
</template>
<script>
  import {getManagerMallData} from '../../../api/api'
  export default {
    data(){
      return {
        user_total: true,
        exchangeNum: '',
        collectNum: '',
      }
    },
    methods:{
      /*获取基本指标数据 -> 兑换次数、收藏次数  */
      getData(){
        getManagerMallData().then(res => {
          this.exchangeNum = res.result.orderCount
          this.collectNum = res.result.collectionCount
        })
        this.user_total = false;
      },
    },

    mounted(){
      this.getData()
    }
  }
</script>
<style scoped>
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
