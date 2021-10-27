<template>
	<view>
		<view class="map">
			<map id="myMap" style="width: 100%; height:calc(100vh - 290px);" show-compass="true" scale="16" show-location="true" :latitude="latitude"
			 :longitude="longitude" :show-location="true">
				<cover-view class="location" @tap="moveToLocation">
					<cover-image src="/static/images/dangqian.png" mode="widthFix"></cover-image>
				</cover-view>
			</map>
		</view>
		<view class="main">
			<view class="city">
				{{dangqian}}
			</view>
			<view class="content">
				<view class="storename">
					{{data.store.storename}}
				</view>
				<view class="address">
					<scroll-view scroll-x='true' v-if="address_count>0">
						<block v-for="(item,index) in data.adr" :key="index">
							<view class="item check" v-if="item.dft">
								{{item.linkman}}
							</view>
							<view v-else class="item" @tap="setDefault(item.id,index)">
								{{item.linkman}}
							</view>
						</block>
					</scroll-view>
					<view class="item add" v-else @tap="addAdr">
						请先添加地址
					</view>
					<view class="item add" @tap="addAdr">
						+
					</view>
				</view>
				<view class="linkman" v-if="address_count>0">
					<view class="left">
						<image src="../../static/images/address_people.png" mode="widthFix"></image>
					</view>
					<view class="right">
						{{linkman}}
					</view>
				</view>
				<view class="position_address" v-if="address_count>0">
					<view class="left">
						<image src="../../static/images/address_position.png" mode="widthFix"></image>
					</view>
					<view class="right">
						{{data.store.position_address}}
					</view>
				</view>
				<view class="sub">
					<button type="default" @tap="order">立即下单</button>
				</view>
			</view>
			
		</view>
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
				user_info:'',
				latitude: '',
				longitude: '',
				dangqian: '',
				data:[],
				linkman:'',
				address_count:0,
			}
		},
		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady() {
			this.mapCtx = wx.createMapContext('myMap');
		},
		onLoad() {
			this.loadMap();
		},
		onShow(){
			this.user_info = app.globalData.user_info;
			if (this.user_info) {
				this.loadData();
			} else {
				wx.reLaunch({
					url: '/pages/index/index',
				})
			}	
		},
		methods: {
			loadData(){
				this.request({
					url: interfaces.adrList,
					header: {
						token:this.user_info.token
					},
					method: 'POST',
					success: res => {
						console.log(res);
						if (res.code == 200) {
							this.data=res.data;
							this.address_count=res.data.adr.length;
							if(this.address_count>0){
								this.linkman=res.data.adr[0].linkman;
							}
						} else {
							app.isLogin(res.code, res.msg);
						}
					}
				});
			},
			loadMap() {
				qqmapsdk = new QQMapWX({
					key: 'WCYBZ-EWVC4-CC3U2-DZGZI-UWGK2-E2BMM'
				});
				wx.getLocation({
					type: 'gcj02',
					success: res => {
						qqmapsdk.reverseGeocoder({
							location: {
								latitude: res.latitude,
								longitude: res.longitude
							},
							success: addressRes => {
								this.latitude = res.latitude,
								this.longitude = res.longitude,
								this.dangqian = addressRes.result.address_component.city
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
			//设为默认地址
			setDefault(id,index){
				this.request({
					url: interfaces.setDefaultAdr,
					header: {
						token:this.user_info.token
					},
					data:{
						id:id
					},
					method: 'POST',
					success: res => {
						//console.log(res);
						if (res.code == 200) {
							for(var k in this.data.adr){
								this.data.adr[k].dft=0;
							}
							this.data.adr[index].dft=1;
							this.linkman=this.data.adr[index].linkman;
						} else {
							app.isLogin(res.code, res.msg);
						}
					}
				});
			},
			//跳转去添加地址页面
			addAdr(){
				if(this.address_count==0){
					wx.navigateTo({
						url: '../address/editstore',
					})
				}else{
					wx.navigateTo({
						url: '../address/adduser',
					})
				}
			},
			order(){
				if(this.address_count==0){
					wx.showToast({
						title: '请先添加服务地址',
						icon: "none",
					});
					setTimeout(function() {
						wx.navigateTo({
							url: '../address/editstore',
						})
					}, 1500);
				}else{
					if(this.data.store.position_area_id==0){
						wx.showToast({
							title: '请补全门店信息',
							icon: "none",
						});
						setTimeout(function() {
							wx.navigateTo({
								url: '../address/editstore',
							})
						}, 1500);
					}else{
						wx.navigateTo({
							url: '../order/add',
						})
					}
				}
			},
			//移到自己定位坐标
			moveToLocation: function() {
				this.mapCtx.moveToLocation()
			},
		}
	}
</script>

<style lang="scss">
	.location {
		position: absolute;
		top: 10px;
		right: 10px;
		width: 30px;
	}
	.main{
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		box-shadow:0 0 9px 3px #ccc;
		height: 290px;
		.city{
			background-color: #FFF5D3;
			line-height: 30px;
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
			color: #4C3C06;
			padding-left: 15px;
		}
		.content{
			padding: 15px;
			.storename{
				color: #257AFA;
				font-size: 16px;
				font-weight: 400;
			}
			.address{
				display: flex;
				padding-top: 15px;
				scroll-view{
					white-space: nowrap;
					overflow: auto;
				}
				.item{
					margin-right: 10px;
					background-color: #F2F2F2;
					color: #000;
					height: 30px;
					line-height: 30px;
					border-radius: 15px;
					padding: 0 15px;
					display: inline-block;
				}
				.check{
					background-color: #257AFA;
					color: #fff;
				}
				.add{
					color: #257AFA;
				}
			}
			.linkman{
				display: flex;
				line-height: 40px;
				padding-top: 10px;
			}
			image{
				width: 18px;
			}
			.position_address{
				display: flex;
				background-color: #F6F6F6;
				height: 40px;
			}
			.left{
				padding-top: 11px;
				padding-left: 5px;
			}
			.right{
				padding-left: 10px;
				display: flex;
				display: -webkit-flex;
				align-items:center;
				justify-content:center;
			}
			.sub{
				padding-top: 20px;
				button{
					background-color: #257AFA;
					color: #fff;
					height: 40px;
					line-height: 40px;
					border-radius: 20px;
					width: 150px;
					font-size: 14px;
				}
			}
		}
	}
	
	
	
</style>
