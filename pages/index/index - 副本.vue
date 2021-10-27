<template>
	<view>
		<form @submit="formSubmit">
		<view class="logo">
			<image src="../../static/images/xiadan2.png" mode="widthFix"></image>
		</view>
		<view class="main">
			<view class="item">
				<input type="text" name="account" placeholder="请输入账号" placeholder-style="color:#fff"/>
			</view>
			<view class="item">
				<input type="password" name="password" placeholder="请输入密码" placeholder-style="color:#fff"/>
			</view>
			<view class="item">
				<button formType="submit">立即登陆</button>
			</view>
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
				latitude: '',
				longitude: '',
				dangqian: ''
			}
		},
		methods: {
			//表单提交事件
			formSubmit(e) {
				var data = e.detail.value;
				if (data.account == "") {
					wx.showToast({
						title: '请输入账号',
						icon: "none",
					});
					return;
				}
				if (data.password == "") {
					wx.showToast({
						title: '请输入密码',
						icon: "none",
					});
					return;
				}
				this.request({
					url: interfaces.login,
					data: data,
					method: 'POST',
					success: res => {
						console.log(res);
						if (res.code == 200) {
							wx.showToast({
								title: '登陆成功',
								icon: 'success'
							})
							console.log(res);
							app.globalData.user_info = res.data;
							setTimeout(function() {
								wx.switchTab({
									url: 'home',
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
	page{
		background-image: linear-gradient(#257AFA, #Ffffff);
	}
	.logo{
		padding-top: 100px;
		padding-bottom: 50px;
		margin: 0 auto;
		width: 150px;
		image{
			width: 100%;
		}
	}
	.main{
		width: 60%;
		margin: 0 auto;
		.item{
			padding-top: 15px;
			input{
				width: 100%;
				background-color:transparent;
				border: 1px #fff solid;
				color: #fff;
				border-radius: 20px;
				line-height: 40px;
				height: 40px;
				text-align: center;
			}
			button{
				width: 100%;
				color: #2B7DFA;
				background-color: #fff;
				line-height: 40px;
				height: 40px;
				border-radius: 20px;
				font-size: 16px;
				margin-top: 10px;
			}
		}
	}
	
	
	
	
</style>
