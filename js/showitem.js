//加载头部文件
loadHtml("./html/header.html", ".webHeader");
//加载底部文件
loadHtml("./html/footer.html", ".webFooter");

//展示搜索建议
$("#searchbox").focus(function() {
	$("#goodsList").show();
	$.get("./JSON/goodscount.json", function(date) {
		$("#goodsList ul").html("");
		for (key in date) {
			$("#goodsList ul").append('<li><a href="#"><span>' + key + '</span><em>约有' + date[key] + '件</em></a></li>');
		}
	});
});
$("#searchbox").blur(function() {
	$("#goodsList").hide();
});

//360搜索建议jsonP地址http://search.mall.360.com/suggest/?callback=suggest

//二级菜单的展示
var hideClock = null;

function showSecondMenu() {
	$("#secondNav").slideDown();
}

function hideSecondMenu() {
	$("#secondNav").slideUp();
}
$(".top-nav-bar ul li:lt(5)").on("mouseover", function() {
	//调用修改二级标签的函数
	cgSecNavCont($(this).attr("currNav"));
	//清楚隐藏的定时器
	clearTimeout(hideClock);
	//展示二级界面
	showSecondMenu();
	//当二级界面被鼠标滑过的时候也会被保持显示
	$("#secondNav").on("mouseover", function() {
		clearTimeout(hideClock);
	});
	$("#secondNav").on("mouseleave", function() {
		hideClock = setTimeout(hideSecondMenu, 500);
	});

});
$(".top-nav-bar ul li:lt(5)").on("mouseleave", function() {
	hideClock = setTimeout(hideSecondMenu, 500);
});

//修改二级标签中的内容的函数
function cgSecNavCont(currNav) {
	$.get("./JSON/navbargoods.json", function(date) {
		$("#secNavContainer ul").html("");
		for (key in date[currNav]) {
			$("#secNavContainer ul").append('<li><img src="' + date[currNav][key].image + '"/><span>' + date[currNav][key].name + '</span><i>' + date[currNav][key].price + '元</i></li>');
		}
	})
}
//查看购物车内容
$(".webHeader").on("mouseover", ".chart", function() {
	$(".show-chart").show();
});
$(".webHeader").on("mouseleave", ".chart", function() {
	$(".show-chart").hide();
});

//Ajax动态加载HTML文件
function loadHtml(url, target) {
	$.ajax({
		url: url,
		dataType: "html",
		async: false,
		success: function(msg) {
			$(target).html(msg);
		}
	});
}

//购买数量
$("#num_reduce").on("click", function() {
	if ($("#goodNum").val() <= 1) {
		$("#num_reduce").addClass("disabled");
	} else {
		$("#goodNum").val($("#goodNum").val() - 1);
		$("#num_reduce").removeClass("disabled");
	}
});
$("#num_plus").on("click", function() {
	$("#goodNum").val(Number($("#goodNum").val()) + 1);
});

//滚动展示楼梯效果
$(document).ready(function() {
	var pDetailSCT = Number($(".product-detail").offset().top),
		pDetailSCB = pDetailSCT + parseInt($(".product-detail").css("height")),
		pParamSCT = Number($("#pParam").offset().top),
		pParamSCB = pParamSCT + parseInt($("#pParam").css("height")) + parseInt($(".product-param").css("height")),
		pCommonQSCT = Number($("#commonQ").offset().top),
		pCommomQSCB = pCommonQSCT + parseInt($("#commonQ").css("height")) + parseInt($(".commonQ").css("height"));
	$(window).scroll(function() {
		if ($(window).scrollTop() >= pDetailSCT && $(window).scrollTop() <= pDetailSCB) {
			//滚动到详细介绍中的时候
			$("#productDetailTip").addClass("active").siblings().removeClass("active");
		}
		if ($(window).scrollTop() >= pParamSCT && $(window).scrollTop() <= pParamSCB) {
			//滚动到参数页面中时候
			$("#pParamTip").addClass("active").siblings().removeClass("active");
		}
		if ($(window).scrollTop() >= pCommonQSCT && $(window).scrollTop() <= pCommomQSCB) {
			//滚动到参数页面中时候
			$("#commonQTip").addClass("active").siblings().removeClass("active");
		}
		//当不在范围内的时候就清除掉按钮的样式
		else if ($(window).scrollTop() > pCommomQSCB || $(window).scrollTop() < pDetailSCT) {
			if ($(".nav-stair-wrap a").hasClass("active")) {
				$(".nav-stair-wrap a").removeClass("active");
			}
		}
	});

	//当点击对应的楼层按钮的时候跳转到对应的楼层
	$("#productDetailTip").on("click", function() {
		$("html,body").animate({
			scrollTop: Number($("#goProductDe").offset().top)
		});
	});
	$("#pParamTip").on("click", function() {
		$("html,body").animate({
			scrollTop: Number($("#pParam").offset().top) - 50
		});
	});
	$("#commonQTip").on("click", function() {
		$("html,body").animate({
			scrollTop: Number($("#commonQ").offset().top) - 50
		});
	});

});

//楼梯吸顶
$(document).ready(function() {
	var stairT = parseInt($(".nav-stair").offset().top);
	var stairH = parseInt($(".nav-stair").css("height"));
	$(window).scroll(function() {
		if ($(window).scrollTop() >= stairT) {
			$(".nav-stair").addClass("top-navbar-absolute");
			$(".nav-stair").css({
				"margin-top": "0"
			});
			$(document.body).css({
				"margin-top": stairH
			});
		} else {
			$(".nav-stair").removeClass("top-navbar-absolute");
			$(".nav-stair").css({
				"margin-top": "20"
			});
			$(document.body).css({
				"margin-top": 0
			});
		}
	})
	
});

//根据商品的item_id来获取商品的介绍图片和基本信息

function renderPageByID(id) {
	$.ajax({
		type: "get",
		async: true,
		url: "./php/getGoodInfo.php?item_id=" + id,
		dataType: "jsonp",
		jsonp: "callback",
		success: function(data) {
			if (data.success == 1) {
				//当返回的数据是成功数据的时候，进行解析
				console.log(data);
				document.title = data.title;
				$("#productName").text(data.title); //标题
				$("#productPrice").text( data.price); //价格
				$("#goProductDe").html("");
				$("#thumblist").html("");
				//展示介绍图片
				for (key in data.introimg) {
					$("#goProductDe").append('<img src="' + data.introimg[key] + '">');
				}
				//展示放大镜图片
				$("#posiImg").html('<a href="' + data.tinyimg[0] + '"><img src="' + data.tinyimg[0] + '" alt="360商城" rel="' + data.tinyimg[0] + '" class="jqzoom" /></a>');
				$("#thumblist").append('<li class="tb-selected">\
							<div class="tb-pic tb-s40">\
								<a href="javascript:void(0)"><img src="' + data.tinyimg[0] + '" mid="' + data.tinyimg[0] + '" big="' + data.tinyimg[0] + '"></a>\
							</div>\
						</li>');
				//只展示5张图片,之前已经有1张了,所以这里只要4张
				var len = data.tinyimg.length>5?5:data.tinyimg.length;
				for (var i=1;i<len;i++) {
					$("#thumblist").append('<li>\
							<div class="tb-pic tb-s40">\
								<a href="javascript:void(0)"><img src="' + data.tinyimg[i] + '" mid="' + data.tinyimg[i] + '" big="' + data.tinyimg[i] + '"></a>\
							</div>\
						</li>');
				}
				//展示放大镜效果
				$(function() {
					$(".jqzoom").imagezoom();
					$("#thumblist li a").click(function() {
						$(this).parents("li").addClass("tb-selected").siblings().removeClass("tb-selected");
						$(".jqzoom").attr('src', $(this).find("img").attr("mid"));
						$(".jqzoom").attr('rel', $(this).find("img").attr("big"));
					});
				});
			}
		}
	})
}
var iProductId = null;
//获取url中的参数方法
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null){
		iProductId = unescape(r[2]);
		return unescape(r[2]);
	}
	return null;
}

var itemId = GetQueryString("item_id")
if (itemId != null && itemId.toString().length > 1) {
	renderPageByID(itemId);
}

//当点击加入购物车按钮之后
$(".item-show-addtocart").on("click",function(){
	var iNum= $("#goodNum").val();
	var iPrice = parseInt($("#productPrice").text());
	var iImg = $("#thumblist li div a img").eq(0).attr("src");
	var iTitle = $("#productName").text();
	
	var oGood = {
		"goodid": iProductId,
		"name": iTitle,
		"price": iPrice,
		"image": iImg,
		"number": iNum
	}
	buybuybuy(oGood);
	
});


//获取一个object中的条目数量
function getCount(oCart){
	var count = 0;
	for (key in oCart) {
		count += parseInt(oCart[key].number);
	}
	return count;
}

//修改顶部购物车中商品的数量
$(document).ready(function(){
	$("#topCartCount").text($.cookie("cartcount"));
	
	//判断是否登录如果登录，那么就展示购物车中的内容
	if ($.cookie("user")) {
		$("#noLoginCart").hide();
		
		//展示购物车中的内容
		if ($.cookie("cart")) {
			showCartByCookies();
			$("#goToDo").prop("href","shopcart.html");
			$("#goToDo em").text("去结算");
		} else{
			$("#goToDo").prop("href","goodsList.html");
			$("#goToDo em").text("去购物");
		}
		
		//如果用户已经登录，就展示登录的内容，隐藏登录注册按钮
		
		
		$(".noLogop").hide();
		$("#logedUser a").text(cutAPhone(JSON.parse($.cookie("user")).phone));
		$("#logedUser").show();
		
		$("#topCartInfo").show();
	}else{
		$("#noLoginCart").show();
		$("#topCartInfo").hide();
		
		//隐藏用户内容，展示登录注册按钮
		$(".noLogop").show();
		$("#logedUser").hide();
	}
});
//展示购物车中的数据的函数
function showCartByCookies(){
	var oCart = JSON.parse($.cookie("cart"));
			$("#topCartContainer").html("");
			for (key in oCart) {
				$("#topCartContainer").append('<li>\
									<img src="'+ oCart[key].image +'"/>\
									<span class="title">'+ oCart[key].name +'</span>\
									<span class="count">'+ oCart[key].number +'</span>\
									<span class="price">'+ oCart[key].number * oCart[key].price +'.00</span>\
								</li>');
			}
}


//将商品信息写入cookie的函数
function buybuybuy(oGood) {
	var cartGoods = $.cookie('cart') ? $.cookie('cart') : '{}';
	var oCartGoods = JSON.parse(cartGoods);
	if (oGood.goodid in oCartGoods) {
		oCartGoods[oGood.goodid].number = parseInt(oCartGoods[oGood.goodid].number) + parseInt(oGood.number);
	} else {
		oCartGoods[oGood.goodid] = oGood;
	}
	$.cookie("cart", JSON.stringify(oCartGoods), {
		path: '/',
		expires: 1
	});

	//设置购物车中商品的数量
	$.cookie("cartcount", getCount(oCartGoods), {
		path: '/',
		expires: 1
	});

	//	更新购物车数量
	$("#topCartCount").text($.cookie("cartcount"));
	
	//更新顶部购物车的内容
	showCartByCookies();
}

//剪切一个手机号,用**隐藏
function cutAPhone(phoneStr){
	var beginStr = phoneStr.substring(0,3);
	var endStr = phoneStr.substr(-4);
	return (beginStr+"****"+endStr);
}