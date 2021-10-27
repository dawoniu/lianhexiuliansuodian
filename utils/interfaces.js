const domain = "https://www.lianhexiu.com.cn/lhxlsdapi/";
const interfaces = {
	// 连锁店登陆
	login: domain + "login/login",
	//服务地址列表
	adrList:domain+"address/adrlist",
	//设为默认地址
	setDefaultAdr:domain+"address/setdefault",
	//获取门店信息，包括店长信息
	storeInfo:domain+"address/storeinfo",
	//编辑保存门店信息，包括编辑保存店长信息
	addressEditStore:domain+"address/editstore",
	// 根据地区id获取省市区详细信息
	addressArea:domain+"address/area",
	//添加员工
	addressAddUser:domain+"address/adduser",
	//编辑员工
	addressEditUser:domain+"address/edituser",
	//员工详情
	addressUserInfo:domain+"address/info",
	//门店详情
	userInfo:domain+"user/info",
	//服务项目列表
	categList:domain+"categ/repair",
	//订单页面上传图片
	orderUpload:domain+"order/upload",
	//下订单
	orderAdd:domain+"order/add",
	//订单列表
	orderList:domain+"order/orderlist",
	//订单确认完工
	orderFinish:domain+"order/finish",
	//订单评论
	orderEval:domain+"order/evaluate",
	//订单详情
	orderDetail:domain+"order/detail",
	//订单费用明细
	orderBill:domain+"order/bill",
	//订单历史清单费用明细
	orderHistory:domain+"order/history"
	
	
}
module.exports = interfaces;
