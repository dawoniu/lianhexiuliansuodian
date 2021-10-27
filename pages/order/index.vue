<template>
	<view>	
		<view class="tab">
			<picker @change="tabChange" :range="tab.name">
				<view class="picker">
					<view>
						{{tab.name[tab_index]}}
					</view>
					<view>
						<image src="../../static/images/xiala.png" mode="widthFix"></image>
					</view>
				</view>
				
			</picker>
		</view>
		<view class="order">
			<block v-if="sum>0">
			
			<view class="box" v-for="(item,index) in list" :key="index" @tap="goDetail(item.id)">
				<view class="main">
					<view class="top">
						<view class="name">
							{{item.server_name}}
						</view>
						<view class="top_right">
							<view v-if="item.status==0">
								等待区域经理审核
							</view>
							<view v-else-if="item.status==1">
								等待指派师傅
							</view>
							<view v-else-if="item.status==2">
								等待师傅接单
							</view>
							<view v-else-if="item.status==3">
								师傅已接单
							</view>
							<view v-else-if="item.status==4">
								等待平台报价
							</view>
							<view v-else-if="item.status==5">
								等待区域经理确认报价
							</view>
							<view v-else-if="item.status==6">
								维修中
							</view>
							<view v-else-if="item.status==7">
								待确认完工
							</view>
							<view v-else-if="item.status==8">
								待付款
							</view>
							<view v-else-if="item.status==9">
								已完结
							</view>
							<view v-else-if="item.status==10">
								审核不通过
							</view>
							<view v-else-if="item.status==11">
								报价不通过
							</view>
							<view class="entry">
								<image src="../../static/images/blue_entry.png" mode="widthFix"></image>
							</view>
						</view>
					</view>
					
					<view class="time">
						<view class="icon">
							<image src="../../static/images/time.png" mode="widthFix"></image>
						</view>
						<view class="content">
							{{item.customer_time}}
						</view>
						<view class="price" v-if="item.total_price>0">
							￥{{item.total_price}}
						</view>
					</view>
					<view class="item">
						<view class="icon">
							<image src="../../static/images/order_people.png" mode="widthFix"></image>
						</view>
						<view class="content">
							{{item.linkman}} | {{item.mobile}}
						</view>
					</view>
					<view class="item">
						<view class="icon">
							<image src="../../static/images/order_position.png" mode="widthFix"></image>
						</view>
						<view class="content">
							{{item.position_address}}
						</view>
					</view>
					
					<view class="master" v-if="item.status>5 && item.status<10">
						<view class="master_top">为您服务的师傅</view>
						<view class="master_main">
							<view class="thumb"><image :src="item.thumb" mode="widthFix"></image></view>
							<view class="right">
								<view class="name">{{item.realname}}</view>
								<view class="star">
									<block v-for="count in item.star" :key="count">
									<image src="../../static/images/order_star.png" mode="widthFix"></image>
									</block>
								</view>
								<view class="skill">擅长：{{item.skill_name}}</view>
							</view>
						</view>
					</view>
				</view>
				
				<view class="foot" v-if="item.status>6&&item.status<10">
					<view class="foot_item2 blue" @tap.stop="finish(item.id,index)" v-if="item.status==7">确认完工</view>
					<view class="foot_item2 blue" @tap.stop="evaluate(index)" v-if="item.is_eval==0 && item.status>7">评价</view>
				</view>
				
			</view>
			
			
			</block>
			<block v-else>
				
				<view class="empty">
					<image src="../../static/images/empty.png" mode="widthFix"></image>
					您还没有订单噢
				</view>
				
			</block>
			
		</view>
		 
		<pop ref="pop" :direction="direction" :is_close="true" :is_mask="true" :width="80">
			<form @submit="formSubmit">
				<view class="eval">
					<view class="thumb"><image :src="master_thumb" mode="widthFix"></image></view>
					<view class="name">{{master_name}}</view>
					<view class="star">
						<block v-for="count in blue_star" :key="count">
							<image src="../../static/images/blue_star.png" mode="widthFix" @tap="checkStar(count,1)"></image>
						</block>
						<block v-for="count in (hui_star)" :key="count">
							<image src="../../static/images/hui_star.png" mode="widthFix" @tap="checkStar(count,2)"></image>
						</block>
					</view>
					<view class="content">
						<textarea value="" placeholder="请输入评价内容" name="content"/>
					</view>
					<view class="sub">
						<button formType="submit">确定</button>
					</view>
				</view>
			</form>
		</pop>
		
	</view>
</template>

<script>
	import interfaces from '../../utils/interfaces.js';
	var common = require('../../utils/common.js');
	import app from "../../App.vue";
	//时间走动
	import jszd from "../../components/jszd.vue";
	//弹窗
	import pop from "@/components/ming-pop.vue";
	export default {
		components:{
			jszd,
			pop
		},
		data() {
			return {
				tab:{
					name:["最新订单","待审核","待派单","已接单","已报价","维修中","待确认","待付款","已完成","已取消"],
					value:["new","0","1,2","3,4","5","6","7","8","9","10,11"]
				},
				tab_index:0,
				user_info: '',
				tip: '',
				sum: 0,
				list: [],
				page: 1,
				complete: true,
				//弹窗位置，默认上方
				direction: "up",
				//选择的订单索引index
				check_index:0,
				master_thumb:'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eodJHgGcKwtDiaWVkzIebbg4t1GrSCp0PDk6DblSkPbQSQ9EsX29G3p8pBB4hbEGibxiaX8jyKERtsCg/132',
				master_name:'王师傅',
				blue_star:5,
				hui_star:0
			}
		},
		onShow() {
			this.user_info = app.globalData.user_info;
			if (this.user_info) {
				this.loadData(1);
			} else {
				wx.reLaunch({
					url: '/pages/auth/index',
				})
			}
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom() {
		 	if (!this.complete) {
		 		this.page++;
		 		this.loadData(this.page);
			}
		},
		methods: {
			checkStar(count,type){
				if(type==1){
					this.blue_star=count+1;
					this.hui_star=5-this.blue_star;
				}else{
					this.blue_star=this.blue_star+count+1;
					this.hui_star=5-this.blue_star;
				}
			},
			//拨打师傅电话
			callPhone(n) {
				wx.makePhoneCall({
					phoneNumber: n
				});
			},
			//获取数据
			loadData(page) {
				var status= this.tab.value[this.tab_index];
				this.request({
					url: interfaces.orderList,
					data: {
						page: page,
						status: status
					},
					header: {
						token: this.user_info.token
					},
					method: 'POST',
					success: res => {
						console.log(res);
						if (res.code == 200) {
							
							if (page == 1) {
								this.list = [];
							}

							this.sum=res.sum;

							if (!common.isBlank(res.data)) {
					
								this.list = this.list.concat(res.data);
								this.page = page;

								if (this.list.length >= res.sum) {
									this.complete = true;
									this.tip = '数据已全部加载，暂无其他数据';
								} else {
									this.complete = false;
									this.tip = '上拉加载更多';
								}
								
							} else {
								this.complete = true;
								this.tip = '数据已全部加载，暂无其他数据';
							}
							
						} else {
							app.isLogin(res.code, res.msg);
						}
					}
				})
			},
			tabChange(e) {
				this.tab_index=e.detail.value;
				this.loadData(1);
			},
			
			//跳转订单详情页
			goDetail(id) {
				wx.navigateTo({
					url: 'detail?id=' + id,
				})
			},
			//评价
			evaluate(index){
				this.check_index=index;
				this.open('center');
			},
			//门店确认完工
			finish(id,index) {
				var _this = this;
				wx.showModal({
					title: '提示',
					content: '确认完工了吗？',
					success: function(res) {
						if (res.confirm) {
							_this.request({
								url: interfaces.orderFinish,
								header: {
									token: _this.user_info.token
								},
								data: {
									id: id
								},
								method: 'POST',
								success: res => {
									console.log(res);
									if (res.code == 200) {
										if(_this.tab_index==0){
											_this.list[index].status = 8;
										}else{
											_this.tab_index=7;
											_this.loadData(1);
										}
									} else {
										app.isLogin(res.code, res.msg);
									}
								}
							})
						}
					}
				})
			},
			//表单提交事件，报价下单改为一口价下单，或者一口价下单修改价格
			formSubmit(e) {
				var _this = this;
				var data = e.detail.value;
				data.id=this.list[this.check_index].id;
				data.star=this.blue_star;
				this.request({
					url: interfaces.orderEval,
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
							this.list[this.check_index].is_eval=1;
							this.$refs.pop.close();
						} else {
							app.isLogin(res.code, res.msg);
						}
					}
				});
			},
			
			//弹窗组件
			open(direction) {
				this.direction = direction;
				
				this.master_thumb=this.list[this.check_index].thumb;
				this.master_name=this.list[this.check_index].realname;
				this.blue_star=this.list[this.check_index].star;
				this.hui_star=5-this.list[this.check_index].star;
				
				//打开弹窗
				this.$refs.pop.show();
			}
		}
	}
</script>

<style lang="scss">
	.empty{
		width: 70%;
		padding-top: 70px;
		margin: 0 auto;
		text-align: center;
		color: #64A4FF;
		font-size: 14px;
		image{
			width: 100%;
		};
	}
	.eval{
		.thumb{
			width: 60px;
			margin: 0 auto;
			image{
				width: 100%;
				border-radius: 50%;
			}
		}
		.name{
			text-align: center;
			padding-top: 5px;
		}
		.star{
			text-align: center;
			padding-top: 5px;
			image{
				width: 20px;
				padding: 0 2px;
			}
		}
		.content{
			padding-top: 10px;
			textarea{
				background-color: #F2F2F2;
				height: 60px;
				line-height: 20px;
				padding: 5px;
				width: auto;
			}
		}
		.sub{
			padding-top: 50px;
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
	
	.tab{
		background-color: #257AFA;
		line-height: 50px;
		color: #fff;
		padding-left: 15px;
		position: fixed;
		top: 0;
		width: 100%;
		.picker{
			display: flex;
			image{
				width: 18px;
				padding-left: 10px;
				padding-top: 15px;
			}
		}
	}
	.order{
		margin-bottom: 15px;
		margin-top: 65px;
		.box{
			margin: 15px 15px 0 15px;
			box-shadow:0 0 9px 3px #ccc;
			// border-top-left-radius: 10px;
			// border-top-right-radius: 10px;
			border-radius: 10px;
			.title{
				background-color: #FFF5D3;
				color: #B5A15C;
				border-top-left-radius: 10px;
				border-top-right-radius: 10px;
				font-size: 16px;
				line-height: 40px;
				padding-left: 10px;
			}
			.main{
				padding: 10px;
				.top{
					display: flex;
					justify-content: space-between;
					line-height: 20px;
					padding: 10px 0;
					margin-bottom: 10px;
					.name{
						font-size: 16px;
					}
					.top_right{
						display: flex;
						color: #257AFA;
						.entry{
							width: 6px;
							padding-left: 5px;
							image{
								width: 100%;
								padding-top: 4px;
							}
						}
					}
				}
				.time{
					display: flex;
					padding-bottom: 10px;
					.icon{
						width: 20px;
						padding-right: 10px;
						image{
							width: 100%;
						}
					}
					.content{
						color: #676767;
						width: calc(100% - 30px - 65px);
					}
					.price{
						width: 65px;
						color: #FFAE00;
						text-align: right;
					}
				}
				.item{
					display: flex;
					padding-bottom: 10px;
					.icon{
						width: 20px;
						padding-right: 10px;
						image{
							width: 100%;
						}
					}
					.content{
						color: #676767;
					}
				}
				.wait{
					background-color: #257AFA;
					color: #fff;
					position: relative;
					padding: 5px 8px;
					line-height: 25px;
					.wait_top{
						font-size: 12px;
					}
					.wait_time{
						font-size: 18px;
					}
					.wait_tip{
						font-size: 12px;
					}
					.banshou{
						width: 40px;
						position: absolute;
						top: 23px;
						right: 13px;
						image{
							width: 100%;
						}
					}
				}
				.master{
					color: #fff;
					background-color: #257AFA;
					padding: 5px 8px;
					line-height: 20px;
					.master_top{
						padding: 3px 0 8px 0;
					}
					.master_main{
						display: flex;
					}
					.thumb{
						width: 60px;
						padding-right: 8px;
						image{
							width: 100%;
							border-radius: 50%;
						}
					}
					.name{
						font-size: 14px;
					}
					.star image{
						width: 12px;
					}
					.skill{
						font-size: 12px;
					}
				}
				.baojia{
					padding-top: 10px;
					.baojia_top{
						color: #257AFA;
						font-size: 10px;
						padding-bottom: 10px;
					}
					.baojia_main{
						display: flex;
						border-bottom: 1px #ccc solid;
						margin-bottom: 10px;
						.thumb{
							width: 60px;
							padding-right: 8px;
							image{
								width: 100%;
								border-radius: 50%;
							}
						}
						.info{
							width: calc(100% - 118px);
							.name{
								font-size: 14px;
							}
							.star image{
								width: 12px;
							}
							.skill{
								font-size: 12px;
								word-break: break-all;
								display: -webkit-box;
								overflow: hidden;
								text-overflow: ellipsis;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 1;
							}
						}
					}
					.baojia_right{
						width: 50px;
						text-align: center;
						.price{
							color: #FFB420;
							padding-bottom: 5px;
						}
						.but{
							button{
								background-color: #257AFA;
								font-size: 12px;
								padding: 0;
								width: 50px;
								color: #fff;
							}
						}
					}
				}
			}
			.foot{
				border-top: 1px #ccc solid;
				display: flex;
				justify-content: space-around;
				line-height: 50px;
				.foot_item3{
					width: calc(100% / 3);
					text-align: center;
				}
				.foot_item2{
					width: 50%;
					text-align: center;
				}
				.cancel{
					color: #969696;
				}
				.blue{
					color: #257AFA;
				}
				.b_l{
					border-left: 1px #ccc solid;
					box-sizing: border-box;
				}
			}
		}
	}
</style>