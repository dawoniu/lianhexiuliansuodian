<template>
	<view>
		<view class="main">
			<view class="user">
				<view class="thumb">
					<image :src="data.thumb" mode="widthFix"></image>
				</view>
				<view class="right">
					<view class="name">
						{{data.storename}}
					</view>
					<view class="help">
						联合修师傅帮助过您 {{data.buy_count}} 次
					</view>
				</view>
			</view>
			<view class="line">
				<image src="../../static/images/my_img.png" mode="widthFix"></image>
			</view>
			<view class="tab">
				<view @tap="tip">
					<view class="thumb">
						<image src="../../static/images/my_icon1.png" mode="widthFix"></image>
					</view>
					<view>
						我的评价
					</view>
				</view>
				<view @tap="tip">
					<view class="thumb">
						<image src="../../static/images/my_icon2.png" mode="widthFix"></image>
					</view>
					<view>
						分享码
					</view>
				</view>
				<view @tap="tip">
					<view class="thumb">
						<image src="../../static/images/my_icon3.png" mode="widthFix"></image>
					</view>
					<view>
						官方客服
					</view>
				</view>
				<view @tap="goFeedback">
					<view class="thumb">
						<image src="../../static/images/my_icon4.png" mode="widthFix"></image>
					</view>
					<view>
						留言反馈
					</view>
				</view>
			</view>
			<view class="order" @tap="goAddress">
				<view class="left">
					个人信息
				</view>
				<view>></view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import interfaces from '../../utils/interfaces.js';
	import app from "../../App.vue";
	export default {
		data() {
			return {
				user_info: '',
				data:[]
			}
		},
		onShow() {
			this.user_info = app.globalData.user_info;
			if (this.user_info) {
				this.loadData();
			}else{
				wx.reLaunch({
					url: '/pages/index/index',
				})
			}
		},
		methods: {
			loadData(){
				this.request({
					url: interfaces.userInfo,
					header: {
						token: this.user_info.token
					},
					method: 'POST',
					success: res => {
						if (res.code == 200) {
							this.data=res.data;
						} else {
							app.isLogin(res.code, res.msg);
						}
					}
				});
			},
			goFeedback(){
				wx.showToast({
					title: '功能未开放，敬请期待',
					icon: "none",
				});
				// wx.navigateTo({
				// 	url: '/pages/my/feedback',
				// })
			},
			goAddress(){
				wx.navigateTo({
					url: '/pages/address/index',
				})
			},
			tip() {
				wx.showToast({
					title: '功能未开放，敬请期待',
					icon: "none",
				});
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-image: linear-gradient(#DFECFF, #Ffffff);
	}
	.main{
		padding: 0 15px;
		.user{
			display: flex;
			padding-top: 15px;
			.thumb{
				width: 60px;
				padding-right: 12px;
				image{
					width: 100%;
					border-radius: 50%;
				}
			}
			.right{
				line-height: 20px;
				padding-top: 10px;
				.name{
					font-size: 16px;
				}
				.help{
					color: #676767;
					font-size: 12px;
				}
			}
		}
		.line{
			padding-top: 15px;
			image{
				border-radius: 10px;
				width: 100%;
			}
		}
		.tab{
			display: flex;
			justify-content: space-around;
			text-align: center;
			background-color: #FFFFFF;
			border-radius: 10px;
			padding: 10px 0;
			margin-top: 15px;
			.thumb{
				image{
					width: 30px;
				}
			}
		}
		.order{
			display: flex;
			justify-content: space-between;
			background-color: #FFFFFF;
			padding:15px 10px;
			margin-top: 15px;
			border-radius: 10px;
			.left{
				font-size: 16px;
			}
		}
	}
	
</style>
