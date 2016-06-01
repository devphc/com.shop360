//加载头部文件
loadHtml("./html/header.html",".webHeader");
//加载底部文件
loadHtml("./html/footer.html",".webFooter");
//展示图
$(function(){
	$(".jqzoom").imagezoom();
	$("#thumblist li a").click(function(){
		$(this).parents("li").addClass("tb-selected").siblings().removeClass("tb-selected");
		$(".jqzoom").attr('src',$(this).find("img").attr("mid"));
		$(".jqzoom").attr('rel',$(this).find("img").attr("big"));
	});
});


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
var hideClock = null;
function showSecondMenu(){
	$("#secondNav").slideDown();
}
function hideSecondMenu(){
	$("#secondNav").slideUp();
}
$(".top-nav-bar ul li:lt(5)").on("mouseover",function(){
	//调用修改二级标签的函数
	cgSecNavCont($(this).attr("currNav"));
	//清楚隐藏的定时器
	clearTimeout(hideClock);
	//展示二级界面
	showSecondMenu();
	//当二级界面被鼠标滑过的时候也会被保持显示
	$("#secondNav").on("mouseover",function(){
		clearTimeout(hideClock);
	});
	$("#secondNav").on("mouseleave",function(){
		hideClock = setTimeout(hideSecondMenu,500);
	});
	
});
$(".top-nav-bar ul li:lt(5)").on("mouseleave",function(){
	hideClock = setTimeout(hideSecondMenu,500);
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
$(".webHeader").on("mouseover",".chart",function(){
	$(".show-chart").show();
});
$(".webHeader").on("mouseleave",".chart",function(){
	$(".show-chart").hide();
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

//购买数量
$("#num_reduce").on("click",function(){
	if($("#goodNum").val() <=1 ){
		$("#num_reduce").addClass("disabled");
	}else{
		$("#goodNum").val($("#goodNum").val()-1);
		$("#num_reduce").removeClass("disabled");
	}
});
$("#num_plus").on("click",function(){
	$("#goodNum").val( Number($("#goodNum").val())+1);
});

//滚动展示楼梯效果
$(document).ready(function(){
	var pDetailSCT = Number($(".product-detail").offset().top),
		pDetailSCB = pDetailSCT + parseInt($(".product-detail").css("height")),
		pParamSCT = Number($("#pParam").offset().top),
		pParamSCB = pParamSCT + parseInt($("#pParam").css("height"))+parseInt($(".product-param").css("height")),
		pCommonQSCT = Number($("#commonQ").offset().top),
		pCommomQSCB = pCommonQSCT + parseInt($("#commonQ").css("height")) + parseInt($(".commonQ").css("height"));
	$(window).scroll(function(){
		if ($(window).scrollTop()>=pDetailSCT && $(window).scrollTop()<= pDetailSCB) {
			//滚动到详细介绍中的时候
			$("#productDetailTip").addClass("active").siblings().removeClass("active");
		}
		if ($(window).scrollTop()>=pParamSCT && $(window).scrollTop()<= pParamSCB) {
			//滚动到参数页面中时候
			$("#pParamTip").addClass("active").siblings().removeClass("active");
		}
		if ($(window).scrollTop()>=pCommonQSCT && $(window).scrollTop()<= pCommomQSCB) {
			//滚动到参数页面中时候
			$("#commonQTip").addClass("active").siblings().removeClass("active");
		}
		//当不在范围内的时候就清除掉按钮的样式
		else if ($(window).scrollTop()>pCommomQSCB || $(window).scrollTop() <pDetailSCT) {
			if($(".nav-stair-wrap a").hasClass("active")){
				$(".nav-stair-wrap a").removeClass("active");
			}
		}
	});
	
	//当点击对应的楼层按钮的时候跳转到对应的楼层
	$("#productDetailTip").on("click",function(){
		$("html,body").animate({scrollTop:Number($("#goProductDe").offset().top)});
	});
	$("#pParamTip").on("click",function(){
		$("html,body").animate({scrollTop:Number($("#pParam").offset().top)-50});
	});
	$("#commonQTip").on("click",function(){
		$("html,body").animate({scrollTop:Number($("#commonQ").offset().top)-50});
	});
	
	
	
});

//楼梯吸顶
$(document).ready(function(){
	var stairT = parseInt($(".nav-stair").offset().top);
	var stairH = parseInt($(".nav-stair").css("height"));
	$(window).scroll(function(){
		if ($(window).scrollTop() >= stairT) {
			$(".nav-stair").addClass("top-navbar-absolute");
			$(".nav-stair").css({"margin-top": "0"});
			$(document.body).css({"margin-top":stairH});
		}else{
			$(".nav-stair").removeClass("top-navbar-absolute");
			$(".nav-stair").css({"margin-top": "20"});
			$(document.body).css({"margin-top":0});
		}
	})
});

//根据商品的item_id来获取商品的介绍图片和基本信息

function renderPageByID(id){
	$.ajax({
	type: "get",
	async: true,
	url: "php/getGoodInfo.php?item_id="+id,
	dataType: "jsonp",
	jsonp: "callback",
	success: function(data){
		if(data.success == 1){
			//当返回的数据是成功数据的时候，进行解析
			console.log(data);
			document.title = data.title;
			$("#productName").text(data.title);  //标题
			$("#productPrice").text('￥'+data.price);  //价格
			$("#goProductDe").html("");
			for (key in data.introimg) {
				$("#goProductDe").append('<img src="'+data.introimg[key]+'">');
			}
			
		}
	}
})
}



//获取url中的参数方法
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

var itemId = GetQueryString("item_id")
if(itemId !=null && itemId.toString().length>1)
{
   renderPageByID(itemId);
}