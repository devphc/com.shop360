//加载头部文件
loadHtml("./html/header.html",".webHeader");
//图片鼠标滑过之后有移动的效果
$(".product-content-list ul li img").on("mouseover",function(){
	$(this).stop().animate({margin:"0 10px"},500);
});
$(".product-content-list ul li img").on("mouseout",function(){
	$(this).stop().animate({margin:"0 20px"},500);
})

//banner运动图
var bannerClock = null;
var currBannerLeft = Math.abs(parseInt($("#banner-box").css("left")));
//左边导航的背景颜色数组
var navLeftContainerBc = ["#080504","#106E80","#32487C","#747474","#807200"]
$(document).ready(function(){
	//自动滚动轮播图
	startBannerUnslder();
	$("#banner-box").on("mouseover",function(){
		clearInterval(bannerClock);
	});
	$("#banner-box").on("mouseleave",function(){
		startBannerUnslder();
	})
	
	//当点击左右按钮时候
	$(".left-arrow").on("click",function(){
		currBannerLeft += 4000;
		changeBanner();
	});
	$(".right-arrow").on("click",function(){
		currBannerLeft+=1000;
		changeBanner();
	});
	
	//当点击小banner导航的时候
	$("#naviTiny a").on("click",function(event){
		currBannerLeft = $(this).index()*1000;
		changeBanner();
		
		event.preventDefault();
	});
	
	
});

//滚动banner图
function startBannerUnslder() {
	bannerClock = setInterval(function(){
		currBannerLeft = Math.abs(parseInt($("#banner-box").css("left")))+1000;
		changeBanner();
	}, 4000);
}
//切换banner图
function changeBanner(){
	var bannerLeft = currBannerLeft % 5000;
		$("#banner-box").stop().animate({
			opacity: .5
		}, 500);
		setTimeout(function() {
			$("#banner-box").css({
				left: -bannerLeft
			})
			$("#banner-box").stop().animate({
				opacity: 1
			}, 1000);
		}, 500);
	//更换左边导航栏的背景颜色
	$(".navi-left-container").css({background:navLeftContainerBc[(currBannerLeft%5000)/1000]})
	//更换小导航按钮的样式
	$("#naviTiny a").eq((currBannerLeft%5000)/1000).addClass("active").siblings().removeClass("active");
}
