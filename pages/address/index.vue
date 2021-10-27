<template>
	<view>
		<!--下单信息-->
		<view class="box">
			<view class="store">
				<view class="left">
					<view class="name">
						{{data.store.storename}}
					</view>
					<view class="address">
						具体地址：{{data.store.position_address}}
					</view>
				</view>
				<view class="right" @tap="editStore">
					<image src="../../static/images/address_edit.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="item" v-for="(item,index) in data.adr" :key="index" @tap="editUser(item.id)">
				<view class="name">
					{{item.linkman}}（{{item.job}}）
				</view>
				<view class="phone">
					{{item.mobile}}
				</view>
				<view class="entry">
					>
				</view>
			</view>
			<view class="add" @tap="addUser">
				新增
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
				data: [],
				user_info: '',
			}
		},
		onShow() {
			this.user_info = app.globalData.user_info;
			if (this.user_info) {
				this.request({
					url: interfaces.adrList,
					header: {
						token: this.user_info.token
					},
					method: 'POST',
					success: res => {
						if (res.code == 200) {
							this.data = res.data;
						} else {
							app.isLogin(res.code, res.msg);
						}
					}
				});
			} else {
				wx.reLaunch({
					url: '/pages/index/index',
				})
			}
		},

		methods: {
			//编辑门店信息和店长信息
			editStore(){
				wx.navigateTo({
					url: 'editstore',
				})
			},
			//添加员工信息
			addUser() {
				wx.navigateTo({
					url: 'adduser',
				})
			},
			//修改员工信息
			editUser(id) {
				wx.navigateTo({
					url: 'edituser?id=' + id,
				})
			},
		}
	}
</script>

<style lang="scss">
	.box {
		padding: 10px 15px;
	}
	.store{
		display: flex;
		justify-content: space-between;
		margin-bottom: 20px;
		.left{
			width: calc(100% - 50px);
			.name{
				font-weight: bold;
				font-size: 14px;
				line-height: 30px;
			}
			.address{
				font-size: 12px;
			}
		}
		.right{
			width: 20px;
			padding-top: 5px;
			image{
				width: 20px;
			}
		}
	}
	.item{
		display: flex;
		border-radius: 10px;
		box-shadow:0 0 9px 3px #ccc;
		height: 50px;
		line-height: 50px;
		margin-bottom: 10px;
		padding: 0 10px;
		.name{
			width: 150px;
		}
		.phone{
			width: calc(100% - 170px);
		}
		.entry{
			width: 20px;
			text-align: right;
		}
	}
	.add{
		border-radius: 10px;
		box-shadow:0 0 9px 3px #ccc;
		height: 50px;
		line-height: 50px;
		margin-bottom: 10px;
		padding: 0 10px;
		text-align: center;
		color: #4688FF;
	}
	
</style>
