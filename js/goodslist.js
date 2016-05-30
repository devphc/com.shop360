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
								<a href="#">\
									<img src="' + data.data.list[key].img + '"/>\
									<span>' + data.data.list[key].itemId + '</span>\
								</a>\
							</dt>\
							<dd>\
								<a href="#">\
									<span>' + data.data.list[key].title + '</span>\
									<b>' + data.data.list[key].price / 100 + '元</b>\
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
$("#productsList").on("mouseenter", "li", function() {

		//设置购买按钮的位置，并且赋给当前按钮当前的商品id值
		iLeft = $(this).offset().left - $(this).parent().offset().left;
		iTop = $(this).offset().top + parseInt($(this).css("height")) - $(this).parent().offset().top;
		$("#addToCart").show();
		$("#addToCart").css({
			left: iLeft,
			top: iTop
		});
	})
	//展示页码

$("#page").createPage({
	pageCount: 50,
	current: 1,
	backFn: function(number) {
		getGoods(number-1);
	}
})