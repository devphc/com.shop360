//通过id返回元素对象
function getEleById(idStr) {
	return document.getElementById(idStr);
}
var $ = getEleById
	//文档的操作
var zDocument = {
	//通过classname获取元素
	getEleByClass: function(oparent, classname) {
		var i,
			aElements = [],
			eleReg = new RegExp("\\b" + classname + "\\b"),
			aEles = oparent.getElementsByTagName("*");
		for (i = 0; i < aEles.length; i++) {
			if (eleReg.test(aEles[i].className)) {
				aElements.push(aEles[i])
			}
		}
		return aElements;
	},
	//通用获取页面元素style样式
	getStyle: function(eleObj, Attr) {
		//返回的属性值是一个字符串，因此赋处置为""
		var attrStyle = "";
		if (Attr.currentStyle) {
			//IE浏览器的style
			attrStyle = eleObj.currentStyle[Attr];
		} else {
			//其他浏览器获取的style
			attrStyle = window.getComputedStyle(eleObj, null)[Attr];
		}
		return attrStyle;
	}
};

//随机返回一个随机颜色
function getRandomColor() {
	var color = "#";
	var colorEle = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
	for (var i = 0; i < 6; i++) {
		color += colorEle[Math.floor(Math.random() * 15)];
	}
	return color
};
//数学函数
var zMath = {
	//获得阶乘值
	factorial: function(num) {
		if (num <= 1) {
			return 1;
		} else {
			return num * factorial(num - 1);
		}
	},
	//判断是不是闰年的函数
	isLoop: function(year) {
		if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
			return true;
		} else {
			return false;
		}
	},
	//获取斐波那契数列的第n位
	getFibo: function(n) {
		var result = [0, 1];
		if (n < 2) {
			return result[n];
		}
		var fib1 = 0;
		var fib2 = 1;
		var fibn = 0;
		for (i = 2; i <= n; i++) {
			fibn = fib1 + fib2;
			fib1 = fib2;
			fib2 = fibn;
		}
		return fibn;
	}
};

//cookie的操作
var zCookie = {
	//从cookie中通过键获取对应的值
	getCookieValue: function(cookieKey) {
		var aCookie = document.cookie.split("; ");
		var cookieVaue = "";
		for (i in aCookie) {
			var tCookie = aCookie[i].split("=");
			if (tCookie[0] === cookieKey) {
				cookieVaue = tCookie[1];
			}
		}
		return cookieVaue;
	},
	//通过Key-value和过期时间创建cookie，过期时间单位为秒
	setCookie: function(Key, Value, expiresSec) {
		var date = new Date();
		date.setTime(date.getTime() + expiresSec * 1000);
		document.cookie = "" + Key + "=" + Value + ";expires=" + date.toGMTString();
		if (zCookie.getCookieValue(Key) != "") {
			return true;
		} else {
			return false;
		}
	},
	//通过key删除一个cookie
	delCookie: function(Key) {
		var date = new Date();
		date.setTime(date.getDate() - 1);
		document.cookie = "" + Key + "= ;expires=" + date.toGMTString();
		if (zCookie.getCookieValue(Key) == "") {
			return true;
		} else {
			return false;
		}
	}
};
//Ajax的操作
var zAjax = {
	//使用get方法
	get: function(url, fnSucc, fnFaild) {
		//1.创建Ajax对象
		var oAjax = null;

		if (window.XMLHttpRequest) {
			//支持浏览器 IE7+, Firefox, Chrome, Opera, Safari
			oAjax = new XMLHttpRequest();
		} else {
			//IE5和IE6浏览器
			oAjax = new ActiveXObject("Microsoft.XMLHTTP");
		}

		//2.连接服务器
		oAjax.open('GET', url, true);

		//设置header，设置apikey
		//			oAjax.setRequestHeader("apikey","2c72b7951ef29fd27b3ea15ad1ac399f");

		//3.发送请求
		oAjax.send();

		//4.接收服务器的返回
		oAjax.onreadystatechange = function() {
			if (oAjax.readyState == 4) //完成
			{
				if (oAjax.status == 200) //成功
				{
					fnSucc(oAjax.responseText);
					//获取到的响应数据为Text类型，还有一种类型为xml文件类型
				} else {
					if (fnFaild)
						fnFaild(oAjax.status);
				}
			}
		}
	},
	//用post方法来获取数据
	post: function(url, data, fnSucc, fnFaild) {
		var oAjax = null;
		if (window.XMLHttpRequest) {
			oAjax = new XMLHttpRequest();
		} else {
			oAjax = new ActiveXObject("Microsoft.XMLHTTP");
		}
		oAjax.open("POST", url, true);
		oAjax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
		oAjax.send(data);
		oAjax.onreadystatechange = function() {
			if (oAjax.readyState == 4 && oAjax.status == 200) {
				fnSucc(oAjax.responseText);
			} else {
				fnFaild(oAjax.status);
			}
		}
	}

};
//动画效果
var zAnimation = {
	//根据提供的json值，移动元素
	eleMove: function(obj, json, endFun) {
		clearInterval(obj.timer);
		var iSpeed = 0;
		obj.timer = setInterval(function() {
			var isOver = true;
			for (var attr in json) {
				var iCur = parseInt(zDocument.getStyle(obj, attr));
				iSpeed = (json[attr] - iCur) / 5;
				iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				if (iCur != json[attr]) {
					isOver = false;
					obj.style[attr] = iCur + iSpeed + "px";
				}
			}
			if (isOver) {
				clearInterval(obj.timer);
				endFun && endFun();
			}
		}, 30);
	}
};