<template>
	<view>
		<view class="status one">
			<view class="pic">
				<view class="qiu">
					<image :src="[data.status==10||data.status==11 ? '/static/images/hui_qiu.png': '/static/images/blue_qiu.png']" mode="widthFix"></image>
				</view>
				<view :class="[data.status>0&&data.status!=10&&data.status!=11 ? 'blue' : 'hui']"></view>
				<view class="qiu">
					<image :src="[data.status>0&&data.status!=10&&data.status!=11 ? '/static/images/blue_qiu.png': '/static/images/hui_qiu.png']" mode="widthFix"></image>
				</view>
				<view :class="[data.status>1&&data.status!=10&&data.status!=11 ? 'blue' : 'hui']"></view>
				<view class="qiu">
					<image :src="[data.status>1&&data.status!=10&&data.status!=11 ? '/static/images/blue_qiu.png': '/static/images/hui_qiu.png']" mode="widthFix"></image>
				</view>
				<view :class="[data.status>2&&data.status!=10&&data.status!=11 ? 'blue' : 'hui']"></view>
				<view class="qiu">
					<image :src="[data.status>2&&data.status!=10&&data.status!=11 ? '/static/images/blue_qiu.png': '/static/images/hui_qiu.png']" mode="widthFix"></image>
				</view>
				<view :class="[data.status>3&&data.status!=10&&data.status!=11 ? 'blue' : 'hui']"></view>
				<view class="qiu">
					<image :src="[data.status>3&&data.status!=10&&data.status!=11 ? '/static/images/blue_qiu.png': '/static/images/hui_qiu.png']" mode="widthFix"></image>
				</view>
				<view :class="[data.status>4&&data.status!=10&&data.status!=11 ? 'blue_hou' : 'hui_hou']"></view>
			</view>
			<view class="name">		
				<view :class="[data.status==10||data.status==11 ? 'hui' : 'blue']">待审核</view>
				<view :class="[data.status>0&&data.status!=10&&data.status!=11 ? 'blue' : 'hui']">待派单</view>
				<view :class="[data.status>1&&data.status!=10&&data.status!=11 ? 'blue' : 'hui']">已派单</view>
				<view :class="[data.status>2&&data.status!=10&&data.status!=11 ? 'blue' : 'hui']">已接单</view>
				<view :class="[data.status>3&&data.status!=10&&data.status!=11 ? 'blue' : 'hui']">待报价</view>
			</view>
		</view>
		<view class="status two">
			<view class="pic">
				<view :class="[data.status>4&&data.status!=10&&data.status!=11 ? 'blue_qian' : 'hui_qian']"></view>
				<view class="qiu">
					<image :src="[data.status>4&&data.status!=10&&data.status!=11 ? '/static/images/blue_qiu.png': '/static/images/hui_qiu.png']" mode="widthFix"></image>
				</view>
				<view :class="[data.status>5&&data.status!=10&&data.status!=11 ? 'blue' : 'hui']"></view>
				<view class="qiu">
					<image :src="[data.status>5&&data.status!=10&&data.status!=11 ? '/static/images/blue_qiu.png': '/static/images/hui_qiu.png']" mode="widthFix"></image>
				</view>
				<view :class="[data.status>6&&data.status!=10&&data.status!=11 ? 'blue' : 'hui']"></view>
				<view class="qiu">
					<image :src="[data.status>6&&data.status!=10&&data.status!=11 ? '/static/images/blue_qiu.png': '/static/images/hui_qiu.png']" mode="widthFix"></image>
				</view>
				<view :class="[data.status>7&&data.status!=10&&data.status!=11 ? 'blue' : 'hui']"></view>
				<view class="qiu">
					<image :src="[data.status>7&&data.status!=10&&data.status!=11 ? '/static/images/blue_qiu.png': '/static/images/hui_qiu.png']" mode="widthFix"></image>
				</view>
				<view :class="[data.status>8&&data.status!=10&&data.status!=11 ? 'blue' : 'hui']"></view>
				<view class="qiu">
					<image :src="[data.status>8&&data.status!=10&&data.status!=11 ? '/static/images/blue_qiu.png': '/static/images/hui_qiu.png']" mode="widthFix"></image>
				</view>
				<view class="hui"></view>
				<view class="qiu">
					<image :src="[data.status==10||data.status==11 ? '/static/images/blue_qiu.png': '/static/images/hui_qiu.png']" mode="widthFix"></image>
				</view>
			</view>
			<view class="name">
				<view :class="[data.status>4&&data.status!=10&&data.status!=11 ? 'blue' : 'hui']">已报价</view>
				<view :class="[data.status>5&&data.status!=10&&data.status!=11 ? 'blue' : 'hui']">维修中</view>
				<view :class="[data.status>6&&data.status!=10&&data.status!=11 ? 'blue' : 'hui']">待确认</view>
				<view :class="[data.status>7&&data.status!=10&&data.status!=11 ? 'blue' : 'hui']">待付款</view>
				<view :class="[data.status>8&&data.status!=10&&data.status!=11 ? 'blue' : 'hui']">已完成</view>
				<view :class="[data.status==10||data.status==11 ? 'blue' : 'hui']">已取消</view>
			</view>
		</view>
		
		<view class="box">
			<view class="main">
				<view class="top">
					<view class="name">
						{{data.server_name}} <!-- <block v-if="data.type==1">一口价订单</block><block v-else>报价订单</block> -->
					</view>
					<view class="top_right" v-if="data.status>5&&data.total_price>0">
						￥{{data.total_price}}
					</view>
				</view>
				
				<view class="time">
					<view class="icon">
						<image src="../../static/images/time.png" mode="widthFix"></image>
					</view>
					<view class="content">
						{{data.customer_time}}
					</view>
					<view class="price">
						<!-- ￥300暂时用不到 -->
					</view>
				</view>
				<view class="item">
					<view class="icon">
						<image src="../../static/images/order_people.png" mode="widthFix"></image>
					</view>
					<view class="content">
						{{data.linkman}} | {{data.mobile}}
					</view>
				</view>
				<view class="item">
					<view class="icon">
						<image src="../../static/images/order_position.png" mode="widthFix"></image>
					</view>
					<view class="content">
						{{data.position_address}}
					</view>
				</view>
				
				<view class="line"></view>
				<view class="title">故障描述</view>
				<view class="desc">{{data.remark}}</view>
				<view class="pic" v-if="data.pics.length>0">
					<view v-for="(item,index) in data.pics" :key='index' class="pics">
						<image :src="item" mode="aspectFit" @tap='preImage(item,1)'></image>
					</view>
				</view>
				<view class="title">备注</view>
				<view class="desc">{{data.matter}}</view>
				<block v-if="data.status==10">
				<view class="title">拒绝审核原因</view>
				<view class="desc">{{data.status10_txt}}</view>
				</block>
				<block v-if="data.status==11">
				<view class="title">拒绝报价原因</view>
				<view class="desc">{{data.status11_txt}}</view>
				</block>
			</view>
		</view>
		
		<view class="master" v-if="data.master_id>0&&data.status>2&&data.status<10">
			<view class="master_top">为您服务的师傅</view>
			<view class="master_main">
				<view class="thumb"><image :src="data.master.thumb" mode="widthFix"></image></view>
				<view class="right">
					<view class="name">{{data.master.realname}}</view>
					<view class="star">
						<block v-for="t in data.master.star" :key="t">
							<image src="../../static/images/order_star.png" mode="widthFix"></image>
						</block>
					</view>
					<view class="skill">擅长：{{data.master.skill_name}}</view>
				</view>
			</view>
			<view class="but">
				<view @tap="callPhone(data.master.mobile)"><image src="../../static/images/while_phone.png" mode="widthFix"></image></view>
				<view @tap="message"><image src="../../static/images/while_message.png" mode="widthFix"></image></view>
			</view>
		</view>
		
		<view class="order">
			<view class="info">订单编号：{{data.order_no}}</view>
			<view class="info">下单时间：{{data.create_time_txt}}</view>
		</view>
		
		<view class="picture" v-if="data.report_pic.length>0">
			<view class="title">师傅签到照片</view>
			<view class="item">
				<view v-for="(item,index) in data.report_pic" :key='index' class="pics">
					<image :src="item" mode="aspectFit" @tap='preImage(item,2)'></image>
				</view>
			</view>
		</view>
		
		<view class="picture" v-if="data.before_repair_pic.length>0">
			<view class="title">维修之前照片</view>
			<view class="item">
				<view v-for="(item,index) in data.before_repair_pic" :key='index' class="pics">
					<image :src="item" mode="aspectFit" @tap='preImage(item,3)'></image>
				</view>
			</view>
		</view>
		
		<view class="picture" v-if="data.after_repair_pic.length>0">
			<view class="title">维修之后照片</view>
			<view class="item">
				<view v-for="(item,index) in data.after_repair_pic" :key='index' class="pics">
					<image :src="item" mode="aspectFit" @tap='preImage(item,4)'></image>
				</view>
			</view>
		</view>
		
		<view class="picture" v-if="data.parts_pic.length>0">
			<view class="title">配件照片</view>
			<view class="item">
				<view v-for="(item,index) in data.parts_pic" :key='index' class="pics">
					<image :src="item" mode="aspectFit" @tap='preImage(item,5)'></image>
				</view>
			</view>
		</view>
		
		<view class="picture" v-if="data.work_pic.length>0">
			<view class="title">工单照片</view>
			<view class="item">
				<view v-for="(item,index) in data.work_pic" :key='index' class="pics">
					<image :src="item" mode="aspectFit" @tap='preImage(item,6)'></image>
				</view>
			</view>
		</view>
		
		<view class="separate"></view>
		
		<view class="foot">
			<view class="contact"><button openType="contact">联系客服</button></view>
			<view><button class="mx" @tap="goBill">费用明细</button></view>
			<view v-if="data.status==7"><button class="check" @tap="finish">完成确认</button></view>
		</view>
		
	</view>
</template>

<script>
	import interfaces from '../../utils/interfaces.js';
	var common = require('../../utils/common.js');
	import app from "../../App.vue";
	export default {
		data() {
			return {
				user_info: '',
				data:[],
				id: 0,
				is_preview:false
			}
		},
		onLoad(options) {
			this.id = options.id ? options.id : 0;
		},
		onShow() {
			this.user_info = app.globalData.user_info;
			if (this.user_info) {
				if(!this.is_preview){
					this.initData();
				}
			} else {
				wx.reLaunch({
					url: '/pages/auth/index',
				})
			}
		},
		methods: {
			//初始化订单详情
			initData(){
				this.request({
					url: interfaces.orderDetail,
					data: {
						id: this.id,
					},
					header: {
						token: this.user_info.token
					},
					method: 'POST',
					success: res => {
						console.log(res);
						if (res.code == 200) {
							this.is_preview=true;
							if(res.data.pics!=''){
								res.data.pics = res.data.pics.split(",");
							}else{
								res.data.pics=[];
							}
							res.data.create_time_txt = common.formatDT(res.data.create_time, 'yyyy.MM.dd h:m');
							res.data.status1_time_txt = common.formatDT(res.data.status1_time, 'yyyy.MM.dd h:m');
							res.data.status2_time_txt = common.formatDT(res.data.status2_time, 'yyyy.MM.dd h:m');
							res.data.status3_time_txt = common.formatDT(res.data.status3_time, 'yyyy.MM.dd h:m');
							res.data.status4_time_txt = common.formatDT(res.data.status4_time, 'yyyy.MM.dd h:m');
							res.data.status5_time_txt = common.formatDT(res.data.status5_time, 'yyyy.MM.dd h:m');
							res.data.status6_time_txt = common.formatDT(res.data.status6_time, 'yyyy.MM.dd h:m');
							res.data.status7_time_txt = common.formatDT(res.data.status7_time, 'yyyy.MM.dd h:m');
							res.data.status8_time_txt = common.formatDT(res.data.status8_time, 'yyyy.MM.dd h:m');
							res.data.status9_time_txt = common.formatDT(res.data.status9_time, 'yyyy.MM.dd h:m');
							res.data.status10_time_txt = common.formatDT(res.data.status10_time, 'yyyy.MM.dd h:m');
							res.data.status11_time_txt = common.formatDT(res.data.status11_time, 'yyyy.MM.dd h:m');
							res.data.status12_time_txt = common.formatDT(res.data.status12_time, 'yyyy.MM.dd h:m');
							
							if (res.data.report_pic) {
								res.data.report_pic = res.data.report_pic.split(",");
							}
							if (res.data.before_repair_pic) {
								res.data.before_repair_pic = res.data.before_repair_pic.split(",");
							}
							if (res.data.after_repair_pic) {
								res.data.after_repair_pic = res.data.after_repair_pic.split(",");
							}
							if (res.data.parts_pic) {
								res.data.parts_pic = res.data.parts_pic.split(",");
							}
							if (res.data.work_pic) {
								res.data.work_pic = res.data.work_pic.split(",");
							}
							
							this.data=res.data;
						} else {
							app.isLogin(res.code, res.msg);
						}
					}
				})
			},
			//点击报修图片预览图片事件
			preImage(url,type) {
				var pics='';
				if(type==1){
					pics=this.data.pics;
				}else if(type==2){
					pics=this.data.report_pic;
				}else if(type==3){
					pics=this.data.before_repair_pic;
				}else if(type==4){
					pics=this.data.after_repair_pic;
				}else if(type==5){
					pics=this.data.parts_pic;
				}else if(type==6){
					pics=this.data.work_pic;
				}
				wx.previewImage({
					current: url,
					urls: pics,
				})
			},
			//拨打师傅电话
			callPhone(n) {
				wx.makePhoneCall({
					phoneNumber: n
				});
			},
			//给师傅发信息
			message(){
				wx.showToast({
					title: '功能未开放，敬请期待',
					icon: "none",
				});
			},
			//门店确认完工
			finish() {
				var _this = this;
				wx.showModal({
					title: '提示',
					content: '确认完工了吗？',
					success: function(res) {
						if (res.confirm) {
							_this.request({
								url: interfaces.orderFinish,
								header: {
									token: _this.user_info.token
								},
								data: {
									id: _this.id
								},
								method: 'POST',
								success: res => {
									if (res.code == 200) {
										_this.data.status = 8;
									} else {
										app.isLogin(res.code, res.msg);
									}
								}
							})
						}
					}
				})
			},
			//跳转费用明细
			goBill(){
				if(this.data.status>4&&this.data.status<10){
					wx.navigateTo({
						url: 'bill?id=' + this.id,
					})
				}else if(this.data.status==11){
					wx.navigateTo({
						url: 'bill?id=' + this.id,
					})
				}else{
					wx.showToast({
						title: '暂无报价',
						icon: "none",
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	.one{
		.pic{
			padding-left: calc((750rpx - 18px * 5) / 10);
			.hui_hou,.blue_hou{
				width: calc((750rpx - 18px * 5) / 10);
			}
			.blue,.hui{
				width: calc((750rpx - 18px * 5) / 5);
			}
		}
	}
	.two{
		.pic{
			padding-right: calc((750rpx - 18px * 6) / 12);
			.hui_qian,.blue_qian{
				width: calc((750rpx - 18px * 6) / 12);
			}
			.blue,.hui{
				width: calc((750rpx - 18px * 6) / 6);
			}
		}
	}
	.status{
		.pic{
			display: flex;
			.hui_qian,.hui_hou,.hui{
				height: 2px;
				margin: 8px 0;
				background-color: #DFDFDF;
			}
			.blue_qian,.blue_hou,.blue{
				height: 2px;
				margin: 8px 0;
				background-color: #257AFA;
			}
			.qiu{
				width: 18px;
				image{
					width: 100%;
				}
			}
		}
		.name{
			display: flex;
			//padding: 0 12px;
			justify-content: space-around;
			.blue{
				color: #257AFA;
			}
			.hui{
				color: #848484;
			}
		}
	}
	
	.box{
		margin: 15px 15px 0 15px;
		box-shadow:0 0 9px 3px #ccc;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		.main{
			padding: 10px;
			.top{
				display: flex;
				justify-content: space-between;
				line-height: 20px;
				padding: 10px 0;
				margin-bottom: 10px;
				.name{
					font-size: 16px;
				}
				.top_right{
					color: #FFAE00;
				}
			}
			.time{
				display: flex;
				padding-bottom: 10px;
				.icon{
					width: 20px;
					padding-right: 10px;
					image{
						width: 100%;
					}
				}
				.content{
					color: #676767;
					width: calc(100% - 30px - 50px);
				}
				.price{
					width: 50px;
					color: #FFAE00;
					text-align: right;
				}
			}
			.item{
				display: flex;
				padding-bottom: 10px;
				.icon{
					width: 20px;
					padding-right: 10px;
					image{
						width: 100%;
					}
				}
				.content{
					color: #676767;
				}
			}
			.line{
				width: 100%;
				border-bottom: 1px #ccc solid;
			}
			.title{
				color: #257AFA;
				font-size: 16px;
				padding: 10px 0;
			}
			.desc{
				color: #676767;
				padding-bottom:10px;
			}
			.pic{
				display: flex;
				align-items: center;
				flex-wrap: wrap;
			}
			.pics{
				display: flex;
				width: calc(((750rpx - 50px) / 3) - 10px);
				height: calc(((750rpx - 50px) / 3) - 10px);
				margin: 5px;
				justify-content: center;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}	
	}
	
	.master{
		color: #fff;
		background-color: #257AFA;
		padding: 5px 8px;
		line-height: 20px;
		margin: 15px 15px 0 15px;
		box-shadow:0 0 9px 3px #ccc;
		border-radius: 10px;
		
		.master_top{
			padding: 3px 0 8px 0;
		}
		.master_main{
			display: flex;
		}
		.thumb{
			width: 60px;
			padding-right: 8px;
			image{
				width: 100%;
				border-radius: 50%;
			}
		}
		.name{
			font-size: 14px;
		}
		.star image{
			width: 12px;
		}
		.skill{
			font-size: 12px;
		}
		.but{
			display: flex;
			justify-content: space-around;
			padding-top: 10px;
			padding-bottom: 5px;
			view{
				width: 100px;
				text-align: center;
				border: 2px #fff solid;
				line-height: 30px;
				height: 30px;
				border-radius: 15px;
				image{
					width: 20px;
					padding-top: 4px;
				}
			}
		}
	}
	.order{
		color: #676767;
		padding: 5px 8px;
		line-height: 20px;
		margin: 15px;
		box-shadow:0 0 9px 3px #ccc;
		border-radius: 10px;
		.info{
			padding: 5px 0;
		}
	}
	.picture{
		color: #676767;
		padding: 5px 8px;
		line-height: 20px;
		margin: 15px 15px 0 15px;
		box-shadow:0 0 9px 3px #ccc;
		border-radius: 10px;
		.title{
			color: #257AFA;
			font-size: 16px;
			padding: 10px 0;
		}
		.item{
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			.pics{
				display: flex;
				width: calc(((750rpx - 50px) / 3) - 10px);
				height: calc(((750rpx - 50px) / 3) - 10px);
				margin: 5px;
				justify-content: center;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	
	.separate{
		height: 80px;
		width: 100%;
	}
	
	.foot{
		background-color: #fff;
		color: #257AFA;
		padding: 10px 0;
		box-shadow:0 0 9px 3px #ccc;
		display: flex;
		position: fixed;
		bottom: 0;
		width: 100%;
		text-align: center;
		line-height: 30px;
		justify-content: flex-end;
		view{
			padding: 5px 0;
			width: 25%;
		}
		button{
			height: 30px;
			font-size: 14px;
			width: 80px;
			padding: 0 5px;
			line-height: 30px;
			border-radius: 15px;
		}
		.contact{
			button{
				background-color:transparent;
				color: #257AFA;
			}
			button::after {
				border: 0;
			}
		}
		.mx{
			border: 1px #257AFA solid;
			color: #257AFA;
			background-color: #fff;
		}
		.check{
			color: #fff;
			background-color: #257AFA;
		}
		
	}
	
</style>