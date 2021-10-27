<script>
	export default {
		globalData: {
			isRequest: 0,
			user_info:'',
			
			open_id: '',
			uid: 0,
			token: '',
			shop_info:'',
			serviceadr:''
		},
		//判断是否需要登录
		isLogin: function(code, msg) {
			uni.showToast({
				title: msg,
				icon: 'none',
				mask: true,
				complete: function() {
					setTimeout(function() {
						if (code < 0) {
							wx.navigateTo({
								url: '/pages/index/index',
							})
						}
					}, 1500)
				}
			})
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	page{
	  color: #000;
	  font-size: 28rpx;
	}
</style>
