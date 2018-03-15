<template>
  <div style="background:rgba(0,0,0,0.1);height:900px;" class="pad">
    <Row style="position:relative;width:100%;height:100%;">
      <Col span="24">
      <div class="modal">
      <div class="title">
        <Icon type="information-circled"></Icon>查询用户信息
      </div>
      <p class="searchTitle">用户手机号：</p>
      <Input v-model="ipone_number" placeholder="请输入用户手机号码" class="searchInput"></Input>
      <Button type="primary" class="searchBtn" @click="toSearch">搜索</Button>
      </div>
      </Col>
    </Row>
    </div>
</template>
<script>
import { oneUserAction, getUserLoginInfo, getUserSign, getBroodInfo, getBatchInfo, getCommunityInfo, myCoupon, orderInfo, myPrice, getWheelInfo, userViewModule, getWheelInfoDay, getNewsViewInfo, getImmuneInfo,getUserActionByHour } from '../../api/api'
  export default {
    data() {
      return {
        ipone_number: "",
        model_total: [],
        model_name: [],
        model_value: [],
        new_value: [],
        new_name: [],
        value2: 0,
        list_data:[],
        list_area:'',
        user_actice_time:[],
        user_actice_value:[]
      }
    },
    methods: {
      toSearch(){
        var reg = /^1[3|4|5|7|8][0-9]{9}$/;
        if(this.ipone_number == '') {
          this.$Message.info('请输入手机号码')
          return;
        }
        if(!reg.test(this.ipone_number)) {
          this.$Message.info('请输入正确的手机号码')
          return;
        }
        this.$store.state.ipone_number = this.ipone_number
        this.$router.push('/d/user-behavior/'+this.$store.state.ipone_number)
      }
    }
  }

</script>
<style scoped>
.modal {
  width: 500px;
  height: 300px;
  background: #ffffff;
  position: fixed;
  border-radius: 5%;
  top: 52%;
  left: 52%;
  margin-top: -150px;
  margin-left: -225px;
}
.searchInput {
  width: 300px;
  margin-top: 3%;
  margin-left: 7%;
}
.searchBtn{
  margin-top: 3%;
  margin-left: 5%;
}
.searchTitle{
   margin-top: 8%;
   padding-left: 7%;
   font-size: 20px;
   color: rgb(56, 153, 254);
}
.title{
  padding-top: 3%;
  color: rgb(56, 153, 254);
  font-size:23px;
  text-align: center;
  padding-bottom: 2%;
  border-bottom: 1px solid #ccc;
}
</style>
