<template>
	<view>
		<form @submit="formSubmit">
			<view class="box">
				<view class="item">
					<view class="name">联系人</view>
					<view class="input"><input placeholder="请填写联系人姓名" name='linkman'></input></view>
				</view>
				<view class="item">
					<view class="name"></view>
					<view class="input">
						<button type="default" class="active" v-if="sex==1">先生</button>
						<button type="default" v-else @tap="changeSex(1)">先生</button>
						<button type="default" class="active" v-if="sex==2">女士</button>
						<button type="default" v-else @tap="changeSex(2)">女士</button>
					</view>
				</view>
				<view class="item">
					<view class="name">职位</view>
					<view class="input"><input placeholder="请填写职位" name='job' value="店员"></input></view>
				</view>
				<view class="item">
					<view class="name">手机号</view>
					<view class="input"><input type="number" name='mobile' placeholder="请输入手机号码"></input></view>
				</view>
			</view>
			<view class='foot'>
				<button formType="submit">保存</button>
			</view>
		</form>
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
				sex:1
			}
		},
		onShow() {
			this.user_info = app.globalData.user_info;
			if (!this.user_info) {
				wx.reLaunch({
					url: '/pages/auth/index',
				})
			}
		},
		methods: {
			changeSex(sex){
				this.sex=sex;
			},
			//表单提交事件
			formSubmit: function(e) {
				var _this = this;
				var data = e.detail.value;
				data.sex=this.sex;
				if (data.linkman == '') {
					wx.showToast({
						title: '请输入联系人',
						icon: "none",
					});
					return;
				}
				if (data.job == '') {
					wx.showToast({
						title: '请输入职位',
						icon: "none",
					});
					return;
				}
				if (!common.checkMobile(data.mobile)) {
					wx.showToast({
						title: '手机号码格式有误',
						icon: "none",
					});
					return;
				}
				
				this.request({
					url: interfaces.addressAddUser,
					data: data,
					header: {
						token: this.user_info.token
					},
					method: 'POST',
					success: res => {
						console.log(res);
						if (res.code == 200) {
							wx.showToast({
								title: res.msg,
								icon: 'success'
							})
							setTimeout(function() {
								//返回地址列表
								wx.navigateBack({
									delta: 1
								})
							}, 1500);
						} else {
							app.isLogin(res.code, res.msg);
						}
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	.box {
		padding: 10px 10px;
		margin-bottom: 70px;
		.item {
			display: flex;
			height: 40px;
			line-height: 40px;
			.name{
				width: 80px;
				font-size: 14px;
				font-weight: bold;
			}
			.input{
				width: calc(100% - 100px);
				input{
					height: 40px;
					line-height: 40px;
				}
				button{
					width: 80px;
					display: inline-block;
					font-size: 12px;
					margin: 0 10px 0 0;
					color: #000000;
					background-color: #C6C6C6;
					height: 30px;
					border-radius: 15px;
				}
				.active{
					background-color: #257AFA;
					color: #fff;
				}
			}
			.entry{
				width: 20px;
				text-align: right;
			}
		}
	}
	.foot{
		padding-top: 50px;
		width: 70%;
		margin: 0 auto;
		button{
			margin: 10px;
			font-size: 16px;
			line-height: 40px;
			height: 40px;
			color: #fff;
			background-color: #257AFA;
			border-radius: 20px;
		}
		.delete{
			color: #F90000;
			background-color: #fff;
		}
	}
</style>
