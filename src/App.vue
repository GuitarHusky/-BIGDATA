<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
	export default {
		name: 'app',
	}
</script>

<style>
	.ivu-tabs-bar {
		padding: 0;
		margin: 0;
	}

	.ivu-tabs-bar {
		border: none;
		height: 72px;
		background: linear-gradient(to right, rgb(41, 69, 203), rgb(55, 152, 254));
	}

	.ivu-tabs-nav .ivu-tabs-tab {
		height: 72px;
		line-height: 72px;
		font-size: 16px;
		padding: 0 20px;
		color: #FFFFFF;
	}
  body{
    position: relative;
  }
  html {
    box-sizing: border-box;
  }
  body,html {
  height: 100%;
   overflow:scroll;
   overflow-x:hidden;
   overflow-y:hidden;
  /* padding-bottom:5%; */
  }
	.nav_bor {
		min-height: 900px;
		border-right: 1px solid #ccc;
    overflow: auto;
	}

	.ivu-menu-item {
		font-size: 14px;
	}

	.header_big:after,
	.header_big:before,
	.basic_indicators:after {
		clear: both;
		content: "";
		display: table;
	}

	.header_big {
		height: 70px;
		line-height: 70px;
		width: 100%;
		background: linear-gradient(to right, rgb(41, 69, 203), rgb(56, 153, 254));
		color: #FFFFFF;
		font-size: 16px;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
	}

	.header_big ul li {
		float: left;
		width: 120px;
		text-align: center;
		height: 70px;
		cursor: pointer;
	}

	.header_logo {
		float: left;
		margin-left: 20px;
	}

	.small_title {
		margin: 10px 0;
		height: 40px;
		line-height: 40px;
		font-size: 14px;
		border-bottom: 2px solid #e3e8ee;
    box-sizing: border-box;
	}

	.trend {
		padding-left: 20px;
	}

	.basic_indicators {
		font-size: 18px;
		color: #464c5b;
		padding: 10px 0;
		margin-top: 10px;
		font-weight: 400;
		border-bottom: 2px solid #e3e8ee;
	}

	.trend-bottom {
		position: relative;
	}

	.trend-col {
		cursor: pointer;
		margin-bottom: 10px;
	}

	.date-num {
		font-size: 32px;
		color: #464c5b;
		line-height: 48px;
		display: inline-block;
		width: 100%;
	}

	.date-num:hover {
		color: #2d8cf0;
	}

	.trend-col:hover {
		color: #2d8cf0;
	}
  .table-title {
    border-bottom: 2px solid #e3e8ee;
    margin-bottom: 20px;
    padding-bottom: 10px;
    /*margin-top: 10px;*/
    color: #464c5b;
    font-weight: 600;
    font-size: 16px;
  }
  .pad {
    padding: 5px 20px;
    position:fixed;
    top:6em;
    bottom:0;
    width: 87.5%;
    overflow:scroll;
    overflow-x:hidden;
  }
  .tableStyle {
   /* background: #f7f8f8;
    box-shadow: 0 1px 3px #ced3d9;*/
    border-bottom: none;
    margin-bottom: 0px;
  }
  .titleStyle {
    padding:10px 20px;
  }
  .ivu-col-offset-2 {
    margin-left: 0;
  }

  .ivu-table-wrapper {
    position: relative;
    border: 0px solid #dddee1;
    border-bottom: 0;
    border-right: 0 !important;
    border-left: 0px !important;
  }
  .ivu-table-wrapper .ivu-table th {
    height: 40px;
    white-space: nowrap;
    overflow: hidden;
    background-color: #ffffff;
    border-left: 0px;
  }

  .ivu-picker-panel-sidebar {
    width: 100px;
    float: left;
    margin-left: -92px;
    position: absolute;
    top: 0;
    bottom: 0;
    background: #f5f7f9;
    border-right: 1px solid #e3e8ee;
    border-radius: 4px 0 0 4px;
    overflow: auto;
}
.ivu-date-picker .ivu-select-dropdown {
    width: 530px;
    padding: 0;
    overflow: visible;
    max-height: none;
    font-size: 12px;
    font-weight:normal;
}
.ivu-date-picker-with-range .ivu-picker-panel-body {
    min-width: 435px;
    float: right;
}
.ivu-table-wrapper .ivu-table,.ivu-table-wrapper .ivu-table-border td, .ivu-table-wrapper .ivu-table-border th {
    border-right: 0px;
    border-left: 0px;
}
.ivu-table-wrapper .ivu-table:after {
    content: '';
    width: 0px;
    height: 100%;
    position: absolute;
    display: none;
    top: 0;
    right: 0;
    background-color: #dddee1;
    z-index: 3;
}
.ivu-table-wrapper .ivu-table-header,.ivu-table-wrapper .ivu-table-body{
  border-left: 0px;
}
th .ivu-table-cell {
    padding-left: 18px;
    padding-right: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
 .ivu-table-large td.datelink{
    color: rgba(56, 153, 254, .9);
  }
  .ivu-table-large td.datelink:hover{
    text-decoration: underline;
    cursor: pointer;
  }
</style>
