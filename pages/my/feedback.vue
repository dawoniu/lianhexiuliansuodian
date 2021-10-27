<template>
	<view>

		<!--意见反馈-->
		<form @submit="formSubmit">
			<view class='main'>
				<view class='title'>反馈内容</view>
				<textarea name='content' placeholder="请输入反馈内容,最多200个字" auto-focus maxlength='200' />
			</view>
			<view class='submit'>
				<button formType="submit">提交反馈</button>
			</view>
		</form>
		
	</view>
</template>

<script>
	import interfaces from '../../utils/interfaces.js';
	import app from "../../App.vue";
	export default {
		data() {
			return {
				user_info: '',
				token: '',
				nickname: ''
			}
		},
		onShow() {
			this.user_info = app.globalData.user_info;
			if (this.user_info) {
				this.token = app.globalData.user_info.token;
				this.nickname = app.globalData.user_info.storename;
			} else {
				wx.reLaunch({
					url: '/pages/index/index',
				})
			}
		},
		methods: {
			//表单提交事件
			  formSubmit(e) {
			    var data = e.detail.value;
			    if (data.content=='') {
			      wx.showToast({
			        title: '请输入反馈内容',
			        icon: "none"
			      });
			      return;
			    }
			
			    this.request({
					url: interfaces.feedbackAdd,
					header:{
						token:this.token
					},
					data: {
						content: data.content,
						nickname: this.nickname
					},
					method: 'POST',
					success: res => {
						console.log(res);
						if (res.code == 200) {
							wx.showToast({
								title: res.msg,
								icon: 'none'
							}) 
							setTimeout(function () {
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

<style>
	/* pages/my/feedback.wxss */
	page{
	  background-color: #f7f7f7;
	  font-size: 12px;
	}
	.main{
	  padding: 10px;
	  background-color: #fff;
	}
	.title{
	  color: #333333;
	  font-weight: bold;
	}
	textarea{
	  border: 1px #e4e4e4 solid;
	  width: calc(100% - 18px);
	  padding: 8px;
	  line-height: 20px;
	  height: 100px;
	  margin-top: 10px;
	}
	.submit{
	  background-color: #fff;
	  border-top: 1px #e5e5e5 solid;
	  padding: 10px 20px;
	  position: fixed;
	  bottom: 0;
	  width: calc(100% - 42px);
	}
	button{
	  background-color: #03b3ff;
	  color: #fff;
	  font-size: 16px;
	}
</style>
