//以下两个方法是 wx.login + code2Session 获取openid，去数据库查询用户信息
const apiurl = 'http://platform.lianhexiu.com.cn/lhxlsdapi/';

function login(app) {
	uni.login({
		success: function(res) {
			if (res.code) {
				minilogin(res.code, app);
			} else {
				uni.showToast({
					title: '微信自动登录获取code失败',
					icon: 'none',
				})
			}
		},
		fail: function(res) {
			console.log(res);
			uni.showToast({
				title: '微信自动登录失败',
				icon: 'none',
			})
		}
	})
}

function minilogin(code, app) {
	//console.log(code);
	uni.request({
		url: apiurl + 'login/login',
		method: 'POST',
		header: {
			"content-type": "application/x-www-form-urlencoded"
		},
		data: {
			code: code
		},
		success: function(res) {
			console.log(res);
			if (res.data.code == 200) {

				app.globalData.open_id = res.data.data.open_id;
				app.globalData.uid = res.data.data.id;
				app.globalData.token = res.data.data.token;
				//设置一个回调函数来判断onlunch是否已经执行完毕，有返回值

				//由于这里是网络请求，可能会在 Page.onLoad 之后才返回
				// 所以此处加入 callback 以防止这种情况

				app.globalData.isRequest = 1;
				if (app.isRequestCallback) {
					app.isRequestCallback(1);
				}
			} else {
				//到了这里说明是没有注册的微信账号
				//则不赋值全局变量
			}
		},
	})
}


//以下三个方法是wx.login获取到code,使用wx.getUserInfo授权登录，获取到加密过的数据encryptedData，再使用postLogin方法，把code和一些加密数据传到服务器，服务器用code请求code2Session获取到session-key，最后使用session-key、偏移量iv和一些加密数据在服务器进行解密，获取到unionid，保存到数据库
function reg(guider_id) {
	uni.login({
		success: function(res) {
			if (res.code) {
				getUserInfo(res.code, guider_id);
			} else {
				uni.showToast({
					title: '微信登录获取code失败',
					icon: 'none',
					duration: 1000,
				})
			}
		},
		fail: function() {
			uni.showToast({
				title: '微信自动登录失败',
				icon: 'none',
				duration: 1000,
			})
		}
	})
}
// 获取用户信息
function getUserInfo(code, guider_id) {
	uni.getUserInfo({
		withCredentials: true,
		// 获取成功，全局存储用户信息，开发者服务器登录
		success(res) {
			console.log(res);
			// console.log(res);
			// 开发者服务器登录，并解密uninoid
			postLogin(code, res.iv, res.encryptedData, guider_id)
		},
		// 获取失败，弹窗提示一键登录
		fail() {
			uni.showToast({
				title: '授权登录失败',
				icon: 'none',
				duration: 1000,
			})
		}
	})
}
//解密encryptedData获取unionid等隐私数据
function postLogin(code, iv, encryptedData, guider_id) {
	uni.request({
		url: apiurl + 'login/authlogin',
		method: 'POST',
		header: {
			"content-type": "application/x-www-form-urlencoded"
		},
		data: {
			code: code,
			iv: iv,
			encryptedData: encryptedData,
			guider_id: guider_id
		},
		success: function(res) {
			console.log(res);
			if (res.data.code == 200) {
	
				getApp().globalData.open_id = res.data.data.open_id;
				getApp().globalData.uid = res.data.data.id;
				getApp().globalData.token = res.data.data.token;

				var pages = getCurrentPages();
				if (pages.length === 1) {
					uni.reLaunch({
						url: '/pages/index/index',
					})
				} else {
					uni.navigateBack({
						delta: 1
					})
				}
			} else {
				uni.showToast({
					title: res.data.data.msg,
					icon: 'none',
					duration: 1000,
				})
			}
		},
	})
}

module.exports = {
	login: login,
	reg: reg
};
