//加载头部文件
loadHtml("./html/header.html", ".webHeader");
//加载底部文件
loadHtml("./html/footer.html", ".webFooter");
//加载数据文件
function getGoods(page) {
	$.ajax({
		type: "get",
		async: true,
		url: "http://search.mall.360.com/search/q?sort=weight&q=*&page=" + page,
		dataType: "jsonp",
		jsonp: "callback",
		success: function(data) {
			$("#productsList").html("");
			for (key in data.data.list) {
				$("#productsList").append('<li>\
					<div class="list-product-card">\
						<dl>\
							<dt>\
								<a href="showitem.html?item_id=' + data.data.list[key].itemId + '" target="_blank">\
									<img class="oGoodImg" src="' + data.data.list[key].img + '"/>\
									<span class="oGoodId">' + data.data.list[key].itemId + '</span>\
								</a>\
							</dt>\
							<dd>\
								<a href="showitem.html?item_id=' + data.data.list[key].itemId + '" target="_blank">\
									<span class="oGoodName">' + data.data.list[key].title + '</span>\
									<b class="oGoodPrice">' + data.data.list[key].price / 100 + '元</b>\
								</a>\
							</dd>\
						</dl>\
					</div>\
				</li>');
			}
		}

	});
}
getGoods(0);
//鼠标滑过li之后，出现购买按钮
var oGood = null;

$("#productsList").on("mouseenter", "li", function() {
	//设置一个object类型，其中包含商品的基本信息
	var iPrice = parseInt($(this).find(".oGoodPrice").text());
	var iName = $(this).find(".oGoodName").text();
	var iID = $(this).find(".oGoodId").text();
	var iImg = $(this).find(".oGoodImg").attr("src");
	oGood = {
		"goodid": iID,
		"name": iName,
		"price": String(iPrice),
		"image": iImg,
		"number": 1
	};

	//设置购买按钮的位置，并且赋给当前按钮当前的商品id值
	iLeft = $(this).offset().left - $(this).parent().offset().left - 1;
	iTop = $(this).offset().top + parseInt($(this).css("height")) - $(this).parent().offset().top;
	$("#addToCart").show();
	$("#addToCart").css({
		left: iLeft,
		top: iTop
	});
})

//点击购买事件
$("#addToCart").on("click", "a", function() {
	buybuybuy(oGood);
})

//展示页码

$("#page").createPage({
	pageCount: 50,
	current: 1,
	backFn: function(number) {
		getGoods(number - 1);
	}
})

