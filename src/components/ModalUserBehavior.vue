<template>
  <div >
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
        <li>价格分析</li>
        </router-link>
        <router-link to="/modaluserbehavior" tag='li'>
        <li style="border-bottom: 5px solid rgb(79,227,193);">模块用户行为</li>
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
          <Menu width="auto" :active-name="active_name" :open-names="['3','4']" accordion>
            <!-- <Submenu name="1">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>
                模块用户行为
              </template>
              <router-link to="/modaluser/modaltrend" style='color: #333;'>
                <MenuItem name="1-1">模块整体趋势</MenuItem>
              </router-link>
             </Submenu> -->
              <Submenu name="2">
                    <template slot="title">
                    <Icon type="home"></Icon>
                    首页数据
                    </template>
                    <router-link to="/modaluser/scan" style='color: #333;'>
                    <MenuItem name="2-1">扫一扫统计</MenuItem>
                    </router-link>
                   <router-link to="/modaluser/userintegracount" style='color: #333;'>
                   <MenuItem name="2-2">用户积分统计</MenuItem>
                   </router-link>
                    <router-link to="/modaluser/bannerclick" style='color: #333;'>
                    <MenuItem name="2-3">banner点击次数</MenuItem>
                    </router-link>
                    <router-link to="/modaluser/userintegrainfo" style='color: #333;'>
                    <MenuItem name="2-4">用户积分详情</MenuItem>
                    </router-link>
             </Submenu>
             <Submenu name="3">
                    <template slot="title">
                    <Icon type="wrench"></Icon>
                    生产效益
                    </template>
                    <router-link to="/modaluser/datatotal" style='color: #333;'>
                    <MenuItem name="3-1">数据统计</MenuItem>
                    </router-link>
             </Submenu>
             <Submenu name="4">
                    <template slot="title">
                    <Icon type="cloud"></Icon>
                    云健康
                    </template>
                    <router-link to="/modaluser/onlinecheck" style='color: #333;'>
                    <MenuItem name="4-1">在线检测</MenuItem>
                    </router-link>
                    <!-- <Submenu name="4-2"> -->
                    <!-- <template slot="title" style="font-size:12px;">
                    <Icon type="ios-heart-outline" style="font-size:12px;"></Icon>
                    免疫程序
                    </template> -->
                    <router-link to="/modaluser/immunelognum" style='color: #333;'>
                    <MenuItem name="4-2">免疫程序</MenuItem>
                    </router-link>
             <!-- </Submenu> -->
             </Submenu>
             <Submenu name="5">
                    <template slot="title">
                    <Icon type="egg"></Icon>
                    蛋价查询
                    </template>
                    <router-link to="/modaluser/eggdatatotal" style='color: #333;'>
                    <MenuItem name="5-1">数据统计</MenuItem>
                    </router-link>
                    <router-link to="/modaluser/eggpriceforecastList" style='color: #333;'>
                    <MenuItem name="5-2">蛋价预测</MenuItem>
                    </router-link>
             </Submenu>
             <Submenu name="6">
                    <template slot="title">
                    <Icon type="social-yen"></Icon>
                    价格行情
                    </template>
                    <router-link to="/modaluser/eggoffer" style='color: #333;'>
                    <MenuItem name="6-1">鸡蛋报价</MenuItem>
                    </router-link>
                    <router-link to="/modaluser/materialoffer" style='color: #333;'>
                    <MenuItem name="6-2">原料报价</MenuItem>
                    </router-link>
                    <router-link to="/modaluser/offeranalyse" style='color: #333;'>
                    <MenuItem name="6-3">报价分析</MenuItem>
                    </router-link>
             </Submenu>
             <Submenu name="7">
                    <template slot="title">
                    <Icon type="ios-book"></Icon>
                    热点资讯
                    </template>
                    <router-link to="/modaluser/readarticle" style='color: #333;'>
                    <MenuItem name="7-1">阅读文章</MenuItem>
                    </router-link>
                    <router-link to="/modaluser/sharearticle" style='color: #333;'>
                    <MenuItem name="7-2">分享</MenuItem>
                    </router-link>
                    <router-link to="/modaluser/readarticleanalyse" style='color: #333;'>
                    <MenuItem name="7-3">阅读文章分析</MenuItem>
                    </router-link>
             </Submenu>
             <Submenu name="8">
                    <template slot="title">
                    <Icon type="ios-cart"></Icon>
                    管家商城
                    </template>
                    <router-link to="/modaluser/exchangeinfo" style='color: #333;'>
                    <MenuItem name="8-1">数据统计</MenuItem>
                    </router-link>
             </Submenu>
             <Submenu name="9">
                    <template slot="title">
                    <Icon type="ios-speedometer"></Icon>
                    活动中心
                    </template>
                    <router-link to="/modaluser/bigdial" style='color: #333;'>
                    <MenuItem name="9-1">大转盘使用情况</MenuItem>
                    </router-link>
             </Submenu>
              <Submenu name="10">
                    <template slot="title">
                    <Icon type="eye"></Icon>
                    管家视界
                    </template>
                    <router-link to="/modaluser/breedclassroom" style='color: #333;'>
                    <MenuItem name="10-1">养殖课堂</MenuItem>
                    </router-link>
                    <router-link to="/modaluser/intochickenhouse" style='color: #333;'>
                    <MenuItem name="10-2">走进鸡场</MenuItem>
                    </router-link>
                    <router-link to="/modaluser/littlevideo" style='color: #333;'>
                    <MenuItem name="10-3">小视频</MenuItem>
                    </router-link>
             </Submenu>
             <Submenu name="11">
                    <template slot="title">
                    <Icon type="chatbubble-working"></Icon>
                    论坛
                    </template>
                    <router-link to="/modaluser/forumtrend" style='color: #333;'>
                    <MenuItem name="11-1">论坛整体趋势</MenuItem>
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
          active_name: "3-1",
         /* nav_list: [
            {to:'/p/trend',text:'概况'},
            {to:'/p/download',text:'用户分析'},
            {to:'/p/download-analyse',text:'活跃度'},
            {to:'/p/user-sign-analyse',text:'用户签到分析'}
          ]*/
          /*asideNav_list:[
            {to:'/modaluser/modaltrend',name:'1-1',text:'模块整体趋势'},
            {to:'/modaluser/indexdata',name:'1-2',text:'首页数据'},
          ]*/
      }
    },
    components: {

    },
    mounted() {
      this.user_real_name = sessionStorage.getItem('userrealname')

      /*for(var i=0;i<this.asideNav_list.length;i++){
        if(this.asideNav_list[i].to == this.$route.path){
             this.active_name = this.asideNav_list[i].name;
             break;
        }
      }*/

      if(this.loginStatus != null) {
        this.$store.state.loginStatus = true;
      } else {
        this.$store.state.loginStatus = false;
        this.$router.push('/')
      }

        if(this.$route.path == '/modaluser/scan'){
          this.active_name = '2-1'
        }
        if(this.$route.path == '/modaluser/userintegracount'){
          this.active_name = '2-2'
        }
        if(this.$route.path == '/modaluser/bannerclick'){
          this.active_name = '2-3'
        }
        if(this.$route.path == '/modaluser/userintegrainfo'){
          this.active_name = '2-4'
        }
        if(this.$route.path == '/modaluser/datatotal'){
          this.active_name = '3-1'
        }
        if(this.$route.path == '/modaluser/onlinecheck'){
          this.active_name = '4-1'
        }
        if(this.$route.path == '/modaluser/immunelognum'){
          this.active_name = '4-2'
        }
        if(this.$route.path == '/modaluser/eggdatatotal'){
          this.active_name = '5-1'
        }
        if(this.$route.path == '/modaluser/eggpriceforecastList'){
          this.active_name = '5-2'
        }
        if(this.$route.path == '/modaluser/eggoffer'){
          this.active_name = '6-1'
        }
        if(this.$route.path == '/modaluser/materialoffer'){
          this.active_name = '6-2'
        }
        if(this.$route.path == '/modaluser/offeranalyse'){
          this.active_name = '6-3'
        }
        if(this.$route.path == '/modaluser/readarticle'){
          this.active_name = '7-1'
        }
        if(this.$route.path == '/modaluser/sharearticle'){
          this.active_name = '7-2'
        }
        if(this.$route.path == '/modaluser/readarticleanalyse'){
          this.active_name = '7-3'
        }
        if(this.$route.path == '/modaluser/exchangeinfo'){
          this.active_name = '8-1'
        }
        if(this.$route.path == '/modaluser/bigdial'){
          this.active_name = '9-1'
        }
        if(this.$route.path == '/modaluser/breedclassroom'){
          this.active_name = '10-1'
        }
        if(this.$route.path == '/modaluser/intochickenhouse'){
          this.active_name = '10-2'
        }
        if(this.$route.path == '/modaluser/bigdial'){
          this.active_name = '10-3'
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
  .ivu-table-wrapper {
    position: relative;
    border: 0px solid #dddee1;
    border-bottom: 0;
    border-right: 0;
    border-left: 0;
  }
</style>
