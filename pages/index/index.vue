<template>
	<view>
		<!-- <form @submit="formSubmit">
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
		</form> -->
		
		<form @submit="formSubmit">
			<view class="logo">
				<image src="/static/images/logo.jpg" mode="widthFix"></image>
			</view>
			<view class="tip">连锁店客户登陆</view>
			<view class="input"><input placeholder="请输入账号" name='account'></input></view>
			<view class="input"><input type="password" placeholder="请输入密码" name='password'></input></view>
			<view class="but"><button formType="submit">登陆</button></view>
		</form>
		<!-- <button type="default" @tap="dao">导入地址数据</button> -->
		<!-- <button type="default" @tap="daomaster">导入师傅数据</button> -->
	</view>
</template>

<script>
	import interfaces from '../../utils/interfaces.js';
	var common = require('../../utils/common.js');
	import app from "../../App.vue";
	var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
	var qqmapsdk;
	export default {
		data() {
			return {
				latitude: '',
				longitude: '',
				dangqian: '',
				address:'',
				master:''
			}
		},
		methods: {
			
			//导入师傅数据
			daomaster(){
				var _this=this;
				//先获取原数据库里所有的师傅数据
				this.request({
					url: 'https://www.lianhexiu.com.cn/lhxlsdapi/data/getmaster',
					data: {},
					method: 'POST',
					success: res => {
						
						if(res.code==200){
							this.master=res.master;
							// var i=57;
							// setInterval(function(){
							// 	// console.log("i="+i);
							// 	if(i<290){
							// 		_this.getArea2(i);
							// 		i++;
							// 	}
							// 	//console.log('cishu');	
							// 	//alert("Hello"); 
							// }, 1000);
							
							this.getArea2(221);
							//this.getArea2(0);
						}
			
					}
				});
			},
			//根据经纬度逆推数据库里 省市区
			getArea2(index) {
				var _this=this;
				// 实例化API核心类
				qqmapsdk = new QQMapWX({
					key: 'WCYBZ-EWVC4-CC3U2-DZGZI-UWGK2-E2BMM'
				});
				wx.getLocation({
					type: 'gcj02',
					success: res => {
						qqmapsdk.reverseGeocoder({
							location: {
								latitude:_this.master[index].latitude,
								longitude:_this.master[index].longitude
							},
							success: addressRes => {
								//console.log(addressRes);
								//console.log(addressRes.result.ad_info.adcode);
								//根据获取到的地区id，去获取省市区id
								this.getAllAddress2(addressRes.result.ad_info.adcode,index);
							}
						})
					},
					fail: err => {
						//console.log(err);
						if (err.errMsg === "getLocation:fail auth deny") {
							wx.showModal({
								title: '提示',
								showCancel: false,
								confirmText: '好的',
								content: '未获取到你的地理位置，暂时无法为你提供服务。请检查是否开启定位权限。或尝试重新打开小程序。',
								success: (res) => {
									if (res.confirm) {
										wx.openSetting({
											success(settingdata) {
												//console.log(settingdata)
												if (settingdata.authSetting['scope.userLocation']) {
													wx.showToast({
														title: '授权成功',
														icon: 'none',
														mask: true,
													})
												} else {
													wx.showToast({
														title: '授权失败',
														icon: 'none',
														mask: true,
													})
												}
											}
										})
									}
								}
							})
						}
					}
				});
			},
			//根据地区id获取省市区完整数据
			getAllAddress2(adcode,index){
				var _this=this;
				this.request({
					url: interfaces.addressArea,
					data: {
						adcode:adcode
					},
					header: {
						token: '1630058292+649+d9f4b131a0a15a003b9d2f252aee5cbd'
					},
					method: 'POST',
					success: res => {
						if (res.code == 200) {
							//console.log(res);
							var data={};
							
							
							data.realname=_this.master[index].realname;
							data.sex=_this.master[index].sex;
							data.skill=_this.master[index].skill;
							data.mobile=_this.master[index].mobile;
							data.remark=_this.master[index].remark;
							data.create_time=_this.master[index].create_time;
							data.link_time=_this.master[index].update_time;
							
					
							data.province_id=res.data.province_id;
							data.city_id=res.data.city_id;
							data.area_id=res.data.area_id;
							
							data.province_name=res.data.province_name;
							data.city_name=res.data.city_name;
							data.area_name=res.data.area_name;
							
							this.charu2(data,index);
							
							
						} else {
							wx.showToast({
								title: '请您手动选择您的所属区域',
								icon: 'none',
								mask: true,
							})
						}
					}
				});
			},
			charu2(data,index){
				
				console.log(data);
				//data 修改用户信息表
				//还要插入ls_address表 
				
				
				this.request({
					url: 'https://www.lianhexiu.com.cn/lhxlsdapi/data/daomaster',
					data: data,
					method: 'POST',
					success: res => {
						console.log(index);
						console.log(res);
						// if (res.code == 200) {
						// 	console.log(index);
						// 	console.log(res);
						// } else {
						// 	wx.showToast({
						// 		title: '请您手动选择您的所属区域',
						// 		icon: 'none',
						// 		mask: true,
						// 	})
						// }
					}
				});	
			},
			
			
			
			
			
			
			//导入连锁店用户地址数据
			dao(){
				//先获取原数据库里所有的地址数据
				this.request({
					url: 'https://www.lianhexiu.com.cn/lhxlsdapi/data/getaddress',
					data: {},
					method: 'POST',
					success: res => {
						
						if(res.code==200){
							this.address=res.address;
							for(var i=235;i<240;i++){
								this.getArea(i);
							}
							
						}

					}
				});
			},
			//根据经纬度逆推数据库里 省市区
			getArea(index) {
				var _this=this;
				// 实例化API核心类
				qqmapsdk = new QQMapWX({
					key: 'WCYBZ-EWVC4-CC3U2-DZGZI-UWGK2-E2BMM'
				});
				wx.getLocation({
					type: 'gcj02',
					success: res => {
						qqmapsdk.reverseGeocoder({
							location: {
								latitude:_this.address[index].latitude,
								longitude:_this.address[index].longitude
							},
							success: addressRes => {
								//console.log(addressRes);
								//console.log(addressRes.result.ad_info.adcode);
								//根据获取到的地区id，去获取省市区id
								this.getAllAddress(addressRes.result.ad_info.adcode,index);
							}
						})
					},
					fail: err => {
						//console.log(err);
						if (err.errMsg === "getLocation:fail auth deny") {
							wx.showModal({
								title: '提示',
								showCancel: false,
								confirmText: '好的',
								content: '未获取到你的地理位置，暂时无法为你提供服务。请检查是否开启定位权限。或尝试重新打开小程序。',
								success: (res) => {
									if (res.confirm) {
										wx.openSetting({
											success(settingdata) {
												//console.log(settingdata)
												if (settingdata.authSetting['scope.userLocation']) {
													wx.showToast({
														title: '授权成功',
														icon: 'none',
														mask: true,
													})
												} else {
													wx.showToast({
														title: '授权失败',
														icon: 'none',
														mask: true,
													})
												}
											}
										})
									}
								}
							})
						}
					}
				});
			},
			//根据地区id获取省市区完整数据
			getAllAddress(adcode,index){
				var _this=this;
				this.request({
					url: interfaces.addressArea,
					data: {
						adcode:adcode
					},
					header: {
						token: '1629949772+649+5dfb5643686381abc0e3d89a949f7dec'
					},
					method: 'POST',
					success: res => {
						if (res.code == 200) {
							//console.log(res);
							var store={};
							var address={};

							//更新连锁店用户信息表
							store.position_province_id=res.data.province_id;
							store.position_city_id=res.data.city_id;
							store.position_area_id=res.data.area_id;
							store.latitude=_this.address[index].latitude;
							store.longitude=_this.address[index].longitude;
							store.position_address=_this.address[index].positionAddress;
							store.address=_this.address[index].address;
							store.position_city=res.data.city_name;
							//插入连锁店用户地址表
							address.user_id=_this.address[index].userID;
							address.linkman=_this.address[index].linkman;
							address.mobile=_this.address[index].mobile;
							
							this.charu(store,address,index);
							
							
						} else {
							wx.showToast({
								title: '请您手动选择您的所属区域',
								icon: 'none',
								mask: true,
							})
						}
					}
				});
			},
			charu(store,address,index){
				
				//console.log(store);
				//data 修改用户信息表
				//还要插入ls_address表
				
				
				this.request({
					url: 'https://www.lianhexiu.com.cn/lhxlsdapi/data/daoaddress',
					data: {
						position_province_id:store.position_province_id,
						position_city_id:store.position_city_id,
						position_area_id:store.position_area_id,
						latitude:store.latitude,
						longitude:store.longitude,
						position_address:store.position_address,
						position_city:store.position_city,
						address:store.address,
						user_id:address.user_id,
						linkman:address.linkman,
						mobile:address.mobile,
					},
					method: 'POST',
					success: res => {
						if (res.code == 200) {
							console.log(index);
							console.log(res);
						} else {
							wx.showToast({
								title: '请您手动选择您的所属区域',
								icon: 'none',
								mask: true,
							})
						}
					}
				});
				
				
				
			},
			
			
			
			
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
	page {
		background: url("https://www.lianhexiu.com.cn/static/api/images/master/master_bg.jpg") no-repeat bottom;
		background-size: 100% auto;
	}
	
	.logo {
		width: 100px;
		margin: 0 auto;
		padding-top: 50px;
		padding-bottom: 10px;
	}
	
	.logo image {
		width: 100%;
	}
	
	.tip {
		text-align: center;
		font-size: 18px;
		padding-bottom: 10px;
	}
	
	.but {
		padding: 10px 0;
	}
	
	.input {
		width: 70%;
		margin: 10px auto;
	}
	
	.input input {
		width: calc(100% - 12px);
		border-radius: 5px;
		border: 1px #cccccc solid;
		padding: 5px;
	}
	
	button {
		background-color: #159be4;
		color: #fff;
		width: 70%;
		border-radius: 10px;
	}
	
	
	
</style>
