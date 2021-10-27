/**
 * 用于判断空，Undefined String Array Object
 */
function isBlank(str) {
  if (Object.prototype.toString.call(str) === '[object Undefined]') {//空
    return true
  } else if (
    Object.prototype.toString.call(str) === '[object String]' ||
    Object.prototype.toString.call(str) === '[object Array]') { //字条串或数组
    return str.length == 0 ? true : false
  } else if (Object.prototype.toString.call(str) === '[object Object]') {
    return JSON.stringify(str) == '{}' ? true : false
  } else {
    return true
  }
}


// 设置缓存-----------setCache(k, v, t)
// k为key，v为具体内容（支持字符串、json、数组、boolean等等），t为可选参数表示有效时间（单位：秒）

// 如存储k为123过期时间1秒，则调用setCache('k', '123', 1)方法；若永久存储调用setCache('k', '123') 永久保存json则 setCache('k', { "a": "1" }) ，数组、boolean等同理。

//如果参数t为负数，则移除缓存。

var dtime = '_deadtime';

function setCache(k, v, t) {
  uni.setStorageSync(k, v);
  var seconds = parseInt(t);
  if (seconds > 0) {
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000 + seconds;
    uni.setStorageSync(k + dtime, timestamp)
  } else {
    uni.removeStorageSync(k + dtime)
  }
}

// 读取缓存----- getCache(k, def)------- def(自定义读取失败的默认值)
// k为key，def为可选参数，表示无缓存数据时返回值（支持字符串、json、数组、boolean等等）

// 如读取k缓存，则调用getCache('k') ；若想要无缓存时返回默认值则getCache('k', '默认值') ，支持各个数据类型。

function getCache(k, def='') {
  var deadtime = parseInt(uni.getStorageSync(k + dtime))
  if (deadtime) {
    if (parseInt(deadtime) < Date.parse(new Date()) / 1000) {
      if (def) { return def; } else { return; }
    }
  }
  var res = uni.getStorageSync(k);
  if (res) {
    return res;
  } else {
    return def;
  }
}


//将时间戳格式化为相应的时间格式
function formatDT(dt, tag='') {
  if (dt > 0) {
    if (tag=='') tag = 'yyyy-MM-dd h:m:s';	//默认格式
    dt = new Date(Number(dt) * 1000);
    var date = {
      "M+": dt.getMonth() + 1,
      "d+": dt.getDate(),
      "h+": (dt.getHours() > 9 ? dt.getHours() : '0' + dt.getHours()),
      "m+": (dt.getMinutes() > 9 ? dt.getMinutes() : '0' + dt.getMinutes()),
      "s+": (dt.getSeconds() > 9 ? dt.getSeconds() : '0' + dt.getSeconds()),
      "q+": Math.floor((dt.getMonth() + 3) / 3),
      "S+": dt.getMilliseconds()
    };
    if (/(y+)/i.test(tag)) {
      tag = tag.replace(RegExp.$1, (dt.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
      if (new RegExp("(" + k + ")").test(tag)) {
        tag = tag.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
      }
    }
    return tag;
  }
}

//验证手机号码
function checkMobile(str) {
  if (!(/^1[345789]\d{9}$/.test(str))) {
    return false;
  }else{
    return true;
  }
}

//解决方案 加法 
function accAdd(arg1,arg2){
	var r1,r2,m;
	try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
	try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
	m=Math.pow(10,Math.max(r1,r2))
	return (arg1*m+arg2*m)/m
}
// 乘法函数
function accMul(arg1, arg2) {
  var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  try { m += s1.split(".")[1].length } catch (e) { }
  try { m += s2.split(".")[1].length } catch (e) { }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}

//减法函数，用来得到精确的减法结果   
//调用：accSub(arg1,arg2)   
//返回值：arg1减去arg2的精确结果 

function accSub(arg1, arg2) {
  var r1, r2, m, n;
  try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
  try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2));
  //last modify by deeka  
  //动态控制精度长度  
  n = (r1 >= r2) ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

module.exports={
  isBlank: isBlank,
  setCache:setCache,
  getCache:getCache,
  formatDT: formatDT,
  checkMobile: checkMobile,
  accAdd:accAdd,
  accSub: accSub,
  accMul: accMul
};
