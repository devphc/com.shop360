//加载头部文件
loadHtml("./html/header.html", ".webHeader");
//加载底部文件
loadHtml("./html/footer.html", ".webFooter");

//点击加减按钮的事件
$(document).ready(function() {
	//减法
	$(".decrement").on("click", function() {
		if ($(this).next("input").val() > 1) {
			$(this).next("input").val($(this).next("input").val() - 1);
		}
		//计算价格小计
		getSubTotal($(this));
	});
	//加法
	$(".increase").on("click", function() {
		$(this).prev("input").val(parseInt($(this).prev("input").val()) + 1);
		getSubTotal($(this));
	});

	//当鼠标离开input的时候计算
	$("input").on("blur", function() {
		getSubTotal($(this));
	})
});

//计算每一个商品小计价格
function getSubTotal(oBut) {
	var singlePrice = parseFloat($(oBut).parent().siblings().children(".unitPrice").text());
	var buyCount = $(oBut).parent().children("input").val();
	$(oBut).parent().siblings().children(".subTotal").text(singlePrice * buyCount + ".00");
	getTotalPrice();
}

//计算总价的方法
function getTotalPrice() {
	var totalPrice = 0;
	for (var key = 0; key < $(".subTotal").length; key++) {
		totalPrice += parseInt($(".subTotal").eq(key).text());
	}
	$("#totalPrice").text(totalPrice + ".00");
}

//获取购物车的数据，然后展示
function getCartCookie() {
	var iCart = $.cookie("cart") ? $.cookie("cart") : {},
		oCart = JSON.parse(iCart);
	$("#cartContent").html("");
	for (key in oCart) {
		$("#cartContent").append('<div class="cart-row">\
							<div class="r1">\
								<img src="'+ oCart[key].image +'" />\
								<span>'+ oCart[key].name +'</span>\
							</div>\
							<div class="r2">\
								<span class="unitPrice">'+ oCart[key].price +'.00</span>元\
							</div>\
							<div class="r3">\
								<a href="javascript:void(0);" class="decrement"></a>\
								<input type="text" value="'+ oCart[key].number +'" />\
								<a href="javascript:void(0);" class="increase"></a>\
							</div>\
							<div class="r4">\
								<span class="subTotal">'+ oCart[key].number * oCart[key].price +'.00</span> 元\
							</div>\
							<div class="r5">\
								删除\
							</div>\
						</div>')
	}
	getTotalPrice();
}
getCartCookie();