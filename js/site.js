//展示搜索建议
$("#searchbox").focus(function(){
	$("#goodsList").show();
	$.get("./JSON/goodscount.json",function(date){
		$("#goodsList ul").html("");
		for (key in date) {
			$("#goodsList ul").append('<li><a href="#"><span>'+key+'</span><em>约有'+date[key]+'件</em></a></li>');
		}
	});
});
$("#searchbox").blur(function(){
	$("#goodsList").hide();
});

//360搜索建议jsonP地址http://search.mall.360.com/suggest/?callback=suggest


//二级菜单的展示
//var hideClock = null;
//function showSecondMenu(){
//	$("#secondNav").slideDown();
//}
//function hideSecondMenu(){
//	$("#secondNav").slideUp();
//}
//$(".top-nav-bar ul li:lt(5)").on("mouseover",function(){
//	//调用修改二级标签的函数
//	cgSecNavCont($(this).attr("currNav"));
//	//清楚隐藏的定时器
//	clearTimeout(hideClock);
//	//展示二级界面
//	showSecondMenu();
//	//当二级界面被鼠标滑过的时候也会被保持显示
//	$("#secondNav").on("mouseover",function(){
//		clearTimeout(hideClock);
//	});
//	$("#secondNav").on("mouseleave",function(){
//		hideClock = setTimeout(hideSecondMenu,500);
//	});
//	
//});
//$(".top-nav-bar ul li:lt(5)").on("mouseleave",function(){
//	hideClock = setTimeout(hideSecondMenu,500);
//});

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
$(".webHeader").on("mouseover",".chart",function(){
	$(".show-chart").show();
});
$(".webHeader").on("mouseleave",".chart",function(){
	$(".show-chart").hide();
})

//导航栏的吸顶效果
$(document).ready(function(){
	var navOffsetTop = $("#fixNavbar").offset().top;
	$(window).scroll(function (){
		if (navOffsetTop <= $(window).scrollTop()) {
			$(".top-navbar").addClass("top-navbar-absolute");
			$(document.body).css({"margin-top":$(".top-navbar").css("height")});  //滚动更加顺畅，不会跳动
			$("#secondNav").css({top:96});  //二级菜单的定位问题
		}else{
			$(".top-navbar").removeClass("top-navbar-absolute");
			$(document.body).css({"margin-top":0});  //重新回到原来的位置
			$("#secondNav").css({top:193});
		}
	});
});
//Ajax动态加载HTML文件
function loadHtml(url,target){
	$.ajax({
		url:url,
		dataType:"html",
		async:false,
		success: function (msg) {
			$(target).html(msg);
		}
	});
}

//获取一个object中的条目数量
function getCount(oCart){
	var count = 0;
	for (key in oCart) {
		count++;
	}
	return count;
}

//修改顶部购物车中商品的数量
$(document).ready(function(){
	$("#topCartCount").text($.cookie("cartcount"));
});

//将商品信息写入cookie的函数
function buybuybuy(oGood) {
	var cartGoods = $.cookie('cart') ? $.cookie('cart') : '{}';
	var oCartGoods = JSON.parse(cartGoods);
	if (oGood.goodid in oCartGoods) {
		oCartGoods[oGood.goodid].number += 1;
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
}