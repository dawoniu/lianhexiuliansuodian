<template>
	<view>
		<view class="box2" :hidden="show_categ">
			<view class="ba">
				<view class="item">
					<view class="icon"></view>
					<view class="name">7*12h客服服务</view>
				</view>
				<view class="item">
					<view class="icon"></view>
					<view class="name">双向投保</view>
				</view>
				<view class="item">
					<view class="icon"></view>
					<view class="name">实名认证</view>
				</view>
				<view class="item">
					<view class="icon"></view>
					<view class="name">售后无忧</view>
				</view>
			</view>
			<form @submit="formSubmit">
			<view class="box">
				<view class="title">
					服务信息
				</view>
				<view class="item" @tap="selectCateg">
					<view class="name">服务项目：</view>
					<view class="time">
						{{server_name}}
					</view>
					<view class="entry">></view>
				</view>
				<view class="item">
					<view class="name">上门时间：</view>
					<view class="time">
						<picker mode="multiSelector" @change="bindMultiPickerChange" value="0" :range="multiArray">
							{{multiArray[0][multiIndex[0]]}} {{multiArray[1][multiIndex[1]]}}
						</picker>
					</view>
					<view class="entry">></view>
				</view>
				<view class="item">
					<view class="name">现场照片：</view>
				</view>
				<view class="pic">
					<view v-for="(item,index) in img_list" :key='index' class="pics">
						<image :src="item" mode="aspectFit" @tap='preImage(item)'></image>
						<view class="pic_delete" @tap="picsDelete(index)">X</view>
					</view>
					<view class="addpics" @tap="choosePic">
						<image src="../../static/images/upload.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="gz">
					<view class="name">报修故障：</view>
					<view class="area">
						<textarea placeholder="请描述报修故障及内容" placeholder-style="line-height:20px;padding-top:5px" name="remark"></textarea>
					</view>
				</view>
			</view>
			
			<view class="box">
				<view class="bj">
					<view class="name">填写备注：</view>
					<view class="remark">
						<input placeholder="尽可能清晰描述现场故障" name="matter" />
					</view>
				</view>
			</view>
			
			<view class="tip">
				温馨提示:1，严谨按系统下单流程保证各人资金安全 2， 保持通话畅通，方便师傅联系 3，灌注微信通知，接受是 师傅事实价格说明
			</view>
			
			<view class="sub">
				<button formType="submit" type="default" :disabled="prohibit">下单</button>
			</view>
			</form>
		</view>
		
		<view :hidden="!show_categ" class="t_bg">
			<!--客户报修选择报修项目-->
			<block v-for='(item,index) in categ' :key='index'>
				<view class="t_title">{{item.name}}</view>
				<view class="t_content">
					<block v-for='(childitem,idx) in item.child' :key='idx'>
						<view class="t_item" @tap="checkCateg(childitem.name,childitem.id)">
							<view class="t_item_img">
								<image :src="childitem.thumb" mode="widthFix"></image>
							</view>
							<view class="t_item_title">{{childitem.name}}</view>
						</view>
					</block>
				</view>
			</block>
			<view class="t_nomore">我是有底线的</view>
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
				categ:[],
				server_name: '请选择服务类型',
				server_id: 0,
				img_list: [
					// 'https://www.lianhexiu.com.cn/uploads/order/20210308/4c5d09b1b9657fad7e25c4f294699084.jpg',
					// 'https://www.lianhexiu.com.cn/uploads/order/20210308/4c5d09b1b9657fad7e25c4f294699084.jpg',
					// 'https://www.lianhexiu.com.cn/uploads/order/20210308/4c5d09b1b9657fad7e25c4f294699084.jpg'
				], //照片数组
				img_num: 0, //照片的数量
				multiArray: [
					[],
					[]
				], //上门时间数组
				multiIndex: [0, 0],
				show_categ:false,
				prohibit: false,
			}
		},
		onLoad(options) {
			
			//从0天开始循环出之后7天
			for (let i = 0; i < 7; i++) {
				this.getDay(i);
			}
			this.getHours();
			
		},
		onShow() {
			this.user_info = app.globalData.user_info;
			if (this.user_info) {
				this.categList();
			} else {
				wx.reLaunch({
					url: '/pages/auth/index',
				})
			}
		},
		methods: {
			categList(){
				this.request({
					url: interfaces.categList,
					data:{
						id:this.user_info.store_id
					},
					method: 'POST',
					success: res => {
						console.log(res);
						if (res.code == 200) {
							this.categ=res.data;
						} else {
							app.isLogin(res.code, res.msg);
						}
					}
				});
			},
			getDay(day) {
				var today = new Date();
				var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
				today.setTime(targetday_milliseconds); //注意，这行是关键代码
				var tYear = today.getFullYear();
				var tMonth = today.getMonth();
				var tDate = today.getDate();
				tMonth = this.doHandleMonth(tMonth + 1);
				tDate = this.doHandleMonth(tDate);
	
				this.multiArray[0].push(tYear + "-" + tMonth + "-" + tDate);
			},
			getHours() {
				var today = new Date();
				var tHours = today.getHours();
				for (let i = tHours; i <= 22; i = i + 2) {
					this.multiArray[1].push(i + ":00~" + (i + 2) + ":00");
				}
			},
			//当长度为1时，前面加个0，例如 7月改称07月
			doHandleMonth(month) {
				var m = month;
				if (month.toString().length == 1) {
					m = "0" + month;
				}
				return m;
			},

			bindMultiPickerChange(e) {
				//console.log(e);
				this.multiIndex=e.detail.value;
			},

			
			//参数一 e 数据源
			//参数二 t 成功success的数量
			//参数三 a 失败fail的数量
			//参数四 i 完成comlete的数量
			//参数五 n 要上传的图片数量
			uploadDIY: function(e, t, a, i, n) {
				var o = this,
					s = this;
				wx.uploadFile({
					url: interfaces.orderUpload,
					filePath: e[i],
					name: "file",
					header: {
						'content-type': 'application/json',
						token:s.token
					},
					success: function(e) {
						e.data=JSON.parse(e.data);
						var num = s.img_list.length + 1;
						t++;
						s.img_list.push(e.data);
						s.img_num = num;
					},
					fail: function(e) {
						a++;
					},
					complete: function() {
						++i == n ? wx.hideLoading() : o.uploadDIY(e, t, a, i, n);
					}
				});
			},
			
			choosePic() {
				var a = this;
				wx.chooseImage({
					count: 6,
					sizeType: ["compressed"],
					sourceType: ["album", "camera"],
					success: function(e) {
						e.tempFilePaths;
						var t = e.tempFilePaths.length;
						a.uploadDIY(e.tempFilePaths, 0, 0, 0, t);
					}
				});
			},

			//表单提交事件
			formSubmit(e) {
				var data = e.detail.value;
				
				data.server_id = this.server_id;
				data.server_name=this.server_name;
				if (data.server_id == 0) {
					wx.showToast({
						title: '请选择服务项目',
						icon: "none",
					});
					return;
				}
				if (common.isBlank(data.remark)) {
					wx.showToast({
						title: '请描述报修故障及内容',
						icon: "none",
					});
					return;
				}
				
				data.customer_time = this.multiArray[0][this.multiIndex[0]] + " " + this.multiArray[1][this.multiIndex[1]];
				data.pics = this.img_list.join();
				this.prohibit= true;
				console.log(data);
				this.request({
					url: interfaces.orderAdd,
					data: data,
					header: {
						token:this.user_info.token
					},
					method: 'POST',
					success: res => {
						console.log(res);
						if (res.code == 200) {
							wx.reLaunch({
								url: 'index',
							})
						} else {
							app.isLogin(res.code, res.msg);
						}
					}
				});
			},

			//点击报修图片预览图片事件
			preImage(url) {
				wx.previewImage({
					current: url,
					urls: this.img_list,
				})
			},

			//删除订单图片
			picsDelete(index) {
				this.img_list.splice(index, 1);
				this.img_num--;
			},
			//显示选择服务项目页面
			selectCateg() {
				this.show_categ=true;
			},
			//选择服务项目
			checkCateg(server_name,server_id){
				this.server_name = server_name;
				this.server_id = server_id;
				this.show_categ=false;
			},
		}
	}
</script>

<style lang="scss">
	.box2{
		padding-top:20px;
	}
	.ba{
		display: flex;
		justify-content: space-between;
		padding: 0 15px;
		.item{
			display: flex;
			.icon{
				background-color: #257AFA;
				height: 14px;
				border-radius: 10px;
				width: 20px;
			}
			.name{
				padding-left: 5px;
				color: #676767;
				font-size: 10px;
			}
		}
	}
	.box{
		border-radius: 10px;
		margin: 15px 15px 15px 15px;
		box-shadow:0 0 9px 3px #ccc;
		padding: 10px 10px;
		.title{
			border-left: 5px #257AFA solid;
			padding-left: 5px;
			font-size: 16px;
			margin: 10px 0 15px 5px;
			color: #257AFA;
		}
		.item{
			display: flex;
			line-height: 40px;
			.name{
				width: 80px;
				font-size: 16px;
			}
			.time{
				width: calc(100% - 110px);
			}
			.entry{
				width: 30px;
				text-align: right;
			}
		}
		.pic{
			display: flex;
			align-items: center;
			flex-wrap: wrap;
		}
		.pics{
			display: flex;
			position: relative;
			width: calc(((750rpx - 50px) / 3) - 10px);
			height: calc(((750rpx - 50px) / 3) - 10px);
			margin: 5px;
			justify-content: center;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.addpics {
			position: relative;
			display: flex;
			width: calc(((750rpx - 50px) / 3) - 10px);
			height: calc(((750rpx - 50px) / 3) - 10px);
			margin: 5px;
			justify-content: center;
			background-color: #F0F3F5;
			image{
				position: absolute;
				width: 50px;
				top: calc(50% - 25px);
				left: calc(50% - 25px);
			}
		}
		.pic_delete {
			position: absolute;
			right: 0;
			top: 0;
			width: 20px;
			height: 20px;
			color: #000;
			font-size: 20px;
			line-height: 20px;
			text-align: center;
			background-color: #fff;
		}
		.gz{
			display: flex;
			padding-top: 10px;
			.name{
				width: 80px;
				font-size: 16px;
			}
			.area{
				width: calc(100% - 80px);
				textarea {
					width: 100%;
					height: 60px;
					line-height: 20px;
					padding-top: 2px;
				}
			}
		}
		.bj{
			display: flex;
			justify-content: space-between;
			padding: 15px 0;
			.name{
				font-size: 16px;
			}
			input{
				text-align: right;
			}
			.remark{
				width: calc(100% - 80px);
				input{
					width: 100%;
				}
			}
		}
	}
	.tip{
		color: #257AFA;
		padding: 0 15px;
	}
	.sub{
		width: 60%;
		margin: 15px auto;
		button{
			background-color: #257AFA;
			color: #fff;
			height: 40px;
			line-height: 40px;
			border-radius: 20px;
			width: 100%;
			font-size: 14px;
		}
	}
	
	// 分类页面
	.t_bg{
		background-color: #fff;
		height: 100%;
	}
	.t_title{
	  color: #333;
	  font-size: 16px;
	  padding: 20px 10px 10px 10px;
	}
	.t_banner image{
	  width: 750rpx;
	  border-radius: 10px;
	}
	.t_content{
	  display: flex;
	  flex-direction: row;
	  margin: 0 10px;
	  padding: 10px 0;
	  flex-wrap: wrap;
	  box-shadow: 0 0 16px #f5f5f5;
	}
	.t_item{
	  width: 23%;
	  padding: 0 1%;
	  text-align: center;
	}
	.t_content image{
	  width: 60%;
	}
	.t_item_title{
	  text-align: center;
	  padding: 5px 0;
	}
	.t_nomore {
	  line-height: 60rpx;
	  height: 60rpx;
	  text-align: center;
	  position: relative;
	  font-size: 24rpx;
	  color: #999;
	  margin-top:50px;
	}
	.t_nomore::after {
	  content: "";
	  display: block;
	  width: 100rpx;
	  height: 2rpx;
	  background: #999;
	  position: absolute;
	  right:180rpx;
	  top: 50%;
	}
	.t_nomore::before {
	  content: "";
	  display: block;
	  width: 100rpx;
	  height: 2rpx;
	  background: #999;
	  position: absolute;
	  left:180rpx;
	  top: 50%;
	}
	
	
	
</style>
