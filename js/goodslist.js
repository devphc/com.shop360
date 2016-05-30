//加载头部文件
loadHtml("./html/header.html", ".webHeader");
//加载底部文件
loadHtml("./html/footer.html",".webFooter");
//加载数据文件
function getGoods(page) {
	$.ajax({
		type: "get",
		async: true,
		url: "http://search.mall.360.com/search/q?sort=weight&q=*&page="+page,
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
									<span></span>\
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
getGoods(2);