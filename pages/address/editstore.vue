<template>
	<view>
		<form @submit="formSubmit">
			<view class="box">
				<view class="item">
					<view class="name">门店名称:</view>
					<view class="input"><input placeholder="请输入门店名称" name='storename' :value="data.store.storename"></input></view>
				</view>
				<view class="item">
					<view class="name">门店地址:</view>
					<view class="input"><input @tap="openMap" disabled="true" placeholder="请选择服务区域" name='position_address' :value="data.store.position_address"></input></view>
					<input hidden="true" name='latitude' :value="data.store.latitude"></input>
					<input hidden="true" name='longitude' :value="data.store.longitude"></input>
					<input hidden="true" name='position_province_id' :value="data.store.position_province_id"></input>
					<input hidden="true" name='position_city_id' :value="data.store.position_city_id"></input>
					<input hidden="true" name='position_area_id' :value="data.store.position_area_id"></input>
					<view class="entry" @tap="openMap">></view>
				</view>
				<view class="item">
					<view class="name"></view>
					<view class="input"><input placeholder="填写详细地址" name='address' :value="data.store.address"></input></view>
				</view>
				<view class="item">
					<view class="name">店长姓名:</view>
					<view class="input"><input placeholder="请输入联系人姓名" name='linkman' :value="data.owner.linkman"></input></view>
				</view>
				<view class="item">
					<view class="name"></view>
					<view class="input">
						<button class="active" v-if="sex==1">先生</button>
						<button v-else @tap="changeSex(1)">先生</button>
						<button class="active" v-if="sex==2">女士</button>
						<button v-else @tap="changeSex(2)">女士</button>
					</view>
				</view>
				<view class="item">
					<view class="name">手机号:</view>
					<view class="input"><input placeholder="请输入手机号码" name='mobile' :value='data.owner.mobile'></input></view>
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
	import app from "../../App.vue";
	var common = require('../../utils/common.js');
	var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
	var qqmapsdk;
	export default {
		data() {
			return {
				data: '',
				sex:1,
				user_info: '',
				is_preview:0
			}
		},
		onShow() {
			this.user_info = app.globalData.user_info;
			if (this.user_info) {
				if(!this.is_preview){
					this.loadData();
				}
			} else {
				wx.reLaunch({
					url: '/pages/index/index',
				})
			}
		},

		methods: {
			loadData(){
				this.request({
					url: interfaces.storeInfo,
					header: {
						token: this.user_info.token
					},
					method: 'POST',
					success: res => {
						if (res.code == 200) {
							this.is_preview=1;
							this.data = res.data;
							if(res.data.owner){
								if(res.data.owner.sex==1){
									this.sex=1;
								}else{
									this.sex=2;
								}
							}else{
								this.sex=1;
							}
						} else {
							app.isLogin(res.code, res.msg);
						}
					}
				});
			},
			changeSex(sex){
				this.sex=sex;
			},
			//表单提交事件
			formSubmit(e) {
				var _this = this;
				var data = e.detail.value;
				data.sex=this.sex;
			
				if (data.storename == '') {
					wx.showToast({
						title: '请输入门店名称',
						icon: "none",
					});
					return;
				}
				if (data.position_address == '') {
					wx.showToast({
						title: '请选择服务地址',
						icon: "none",
					});
					return;
				}
				if (data.address == '') {
					wx.showToast({
						title: '请填写详细地址',
						icon: "none",
					});
					return;
				}
				if (data.linkman == '') {
					wx.showToast({
						title: '请输入联系人姓名',
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
			
				// 实例化API核心类
				qqmapsdk = new QQMapWX({
					key: 'WCYBZ-EWVC4-CC3U2-DZGZI-UWGK2-E2BMM'
				});
			
				qqmapsdk.reverseGeocoder({
					location: {
						latitude: data.latitude,
						longitude: data.longitude
					},
					success: addressRes => {
						data.position_city = addressRes.result.address_component.city;
						//console.log(data);
						this.request({
							url: interfaces.addressEditStore,
							data: data,
							header: {
								token: _this.user_info.token
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
										//返回地址信息列表
										wx.navigateBack({
											delta: 1
										})
									}, 1500);
								} else {
									app.isLogin(res.code, res.msg);
								}
							}
						});
					}
				})
			},
			
			//打开地图来定位
			openMap() {
				wx.chooseLocation({
					success: e => {
						console.log(e);
						this.data.store.position_address = e.address;
						this.data.store.latitude = e.latitude;
						this.data.store.longitude = e.longitude;
						this.getArea(e.latitude,e.longitude);
					},
					fail: err => {
						//console.log(err);
						if (err.errMsg === "chooseLocation:fail auth deny") {
							wx.showModal({
								title: '提示',
								content: '只有授权成功才能使用此功能，是否手动开启授权？',
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
			//根据经纬度逆推数据库里 省市区
			getArea(latitude,longitude) {
				// 实例化API核心类
				qqmapsdk = new QQMapWX({
					key: 'WCYBZ-EWVC4-CC3U2-DZGZI-UWGK2-E2BMM'
				});
				wx.getLocation({
					type: 'gcj02',
					success: res => {
						qqmapsdk.reverseGeocoder({
							location: {
								latitude:latitude,
								longitude:longitude
							},
							success: addressRes => {
								console.log(addressRes);
								addressRes.result.ad_info.adcode;
								//根据获取到的地区id，去获取省市区id
								this.getAllAddress(addressRes.result.ad_info.adcode);
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
			getAllAddress(adcode){
				this.request({
					url: interfaces.addressArea,
					data: {
						adcode:adcode
					},
					header: {
						token: this.user_info.token
					},
					method: 'POST',
					success: res => {
						if (res.code == 200) {
							console.log(res);
							var data=this.data;
							this.data=[];
							data.store.position_province_id=res.data.province_id;
							data.store.position_city_id=res.data.city_id;
							data.store.position_area_id=res.data.area_id;		
							this.data=data;	
						} else {
							wx.showToast({
								title: '请您手动选择您的所属区域',
								icon: 'none',
								mask: true,
							})
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	/* pages/customer/address/add.wxss */
	.box {
		padding: 10px 10px;
		margin-bottom: 70px;
		.item{
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
