<style scoped>
.ivu-table-wrapper {
    position: relative;
    border: 0px solid #dddee1;
    border-bottom: 0;
    border-right: 0;
    border-left: 0;
  }
</style>
<template>
  <div>
    <div class="header_big">
      <div class="header_logo">
        <img src="../assets/NewjianongLine.png" style="display: inline-block;height: 44px;width: 71px;float: left;margin-top: 10px;" alt="" />
        <div style="float: left;line-height: 20px;margin-top: 25px;font-size: 18px;margin-left: 10px;font-weight: bold;">
          <span>嘉农云<span style="display:inline-block;margin:0px 5px;">·</span>大数据平台</span>
        </div>
      </div>
      <ul>
        <router-link to="/index" tag='li'>
          <li>概况</li>
        </router-link>
        <router-link to="/userdata" tag='li'>
          <li>用户分析</li>
        </router-link>
        <router-link to="/liveness" tag='li'>
        <li>活跃度</li>
        </router-link>
        <router-link to="/priceanalyse" tag='li'>
        <li style="border-bottom: 5px solid rgb(79,227,193);">价格分析</li>
        </router-link>
        <router-link to="/modaluserbehavior" tag='li'>
        <li>模块用户行为</li>
        </router-link>
        <a href="https://data.danjiguanjia.com/screen/" style="position:absolute;right:300px;top:10px;">
        <img src="../assets/DataPage.png" height="50" width="50" alt="">
        </a>
      </ul>
      <Dropdown trigger="click" style="float: right;margin-right:5%">
        <a href="javascript:void(0)" style="color:#ffffff">
            <img src="../assets/jianongLine.png" alt=""  style="float: left;height: 25px;width: 38px;margin-top: 20px;margin-right:10px;"/>
            {{ user_real_name }}
            <Icon type="arrow-down-b"></Icon>
        </a>
        <DropdownMenu slot="list">
             <DropdownItem style="width:100px;height:30px;"><span  @click="quits" style="display:block;width:100px;height:30px;padding-right:45%;">退出</span></DropdownItem>
        </DropdownMenu>
    </Dropdown>
    </div>
    <div style="clear: both;margin-top: 72px;">
      <div class="layout-content">
        <Row>
          <Col span="3" class="nav_bor">
          <Menu width="auto" :active-name="active_name" :open-names="['1','2','3','4']">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>
                价格分析
              </template>
              <router-link :to='nav.to' style='color: #333;' v-for="nav in asideNav_list" :key="nav.to">
                <MenuItem :name="nav.name">{{ nav.text }}</MenuItem>
              </router-link>
            </Submenu>
          </Menu>
          </Col>
          <Col span="21">
          <router-view></router-view>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
    data (){
      return {
          user_real_name: "",
          loginStatus: "",
          active_name:"1-1",
          asideNav_list:[
            {to:'/price/egg-data',name:'1-1',text:'鸡蛋数据'},
            {to:'/price/corn-data',name:'1-2',text:'玉米价格'},
            {to:'/price/bean-data',name:'1-3',text:'豆粕价格'},
            {to:'/price/chicken-data',name:'1-4',text:'淘汰鸡价格'}
          ]
      }
    },
    components: {

    },
    mounted() {
      console.log(this.user_real_name)

      this.user_real_name = sessionStorage.getItem('userrealname')

      for(var i=0;i<this.asideNav_list.length;i++){
            console.log(this.asideNav_list[i].name);
        if(this.asideNav_list[i].to == this.$route.path){
             this.active_name = this.asideNav_list[i].name;
             break;
        }
      }


      if(this.loginStatus != null) {
        this.$store.state.loginStatus = true;
      } else {
        this.$store.state.loginStatus = false;
        this.$router.push('/')
      }
    },
    methods: {
      quits() {
        sessionStorage.removeItem('login')
        this.$store.state.loginStatus = false;
        this.$router.push("/")
      },
    }
  }
</script>
<style scoped>
.table-title {
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    box-sizing: border-box;
    background: #f7f8f8;
    box-shadow: 0 1px 3px #ced3d9;
    /* background: rgb(56, 153, 254); */
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom: none;
    padding-left: 20px;
    /*margin-top: 30px;*/
    margin-top: 0;
    margin-bottom: 0px;
  }
</style>
