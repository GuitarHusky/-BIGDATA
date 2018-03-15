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
        <li style="border-bottom: 5px solid rgb(79,227,193);">活跃度</li>
        </router-link>
        <router-link to="/priceanalyse" tag='li'>
        <li>价格分析</li>
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
          <Menu width="auto" :active-name="active_name" :open-names="['1','2']">
              <Submenu name="1">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>
                活跃度
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
            {to:'/active/active-user',name:'1-1',text:'活跃用户'},
            {to:'/active/active-user-analyse',name:'1-2',text:'活跃用户分析'}
          ]
      }
    },
    components: {

    },
    mounted() {
      console.log(this.user_real_name)
      this.user_real_name = sessionStorage.getItem('userrealname')

      for(var i=0;i<this.asideNav_list.length;i++){
        if(this.asideNav_list[i].to == this.$route.path){
             this.active_name = this.asideNav_list[i].name;
             break;
        }
      }

      this.loginStatus = sessionStorage.getItem('login')
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
