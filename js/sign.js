//点击输入框之后的效果
var phonejudge = false;
var passwordjudge = false;
$(document).ready(function() {
	//边框效果
	$("input").on("focus", function() {
		$(this).parent().css({
			"border": "1px solid #22ac69"
		})
	});
	$("input").on("blur", function() {
			$(this).parent().css({
				"border": "1px solid #e6e6e6"
			});
		})
		//验证手机号
	$("#phoneNum").on("blur", function() {
		var phoneReg = /^[1][358][0-9]{9}$/;
		if (!phoneReg.test($(this).val())) {
			$("#phoneTip").css({
				"visibility": "visible"
			});
			phonejudge = false;
		} else {
			$("#phoneTip").css({
				"visibility": "hidden"
			});
			phonejudge = true;
		}
	});
	//验证密码
	$("#passWord").on("blur", function() {
		var passwordReg = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/;
		if (!passwordReg.test($(this).val())) {
			$("#passWordTip").css({
				"visibility": "visible"
			});
			passwordjudge = false;
		} else {
			$("#passWordTip").css({
				"visibility": "hidden"
			});
			passwordjudge = true;
		}

	});

	//刷新验证码
	$(".virfy-box").on("click", "img", function() {
		$("#identCode").attr("src", "http://passport.360.cn/captcha.php?m=create&app=i360&scene=strictreg&userip=&level=default&sign=5a63a7&r=" + parseInt(Math.random() * 1000));
	});

});

//点击注册之后
$("#nextBtn").on("click", function() {
	if (phonejudge && passwordjudge) {
		var phoneNum = $("#phoneNum").val();
		var password = $("#passWord").val();
		var signForm = {
			"phone": phoneNum,
			"password": password
		}
		$.cookie("signform", JSON.stringify(signForm), {
			path: '/',
			expires: 1
		})
	} 

});

//登录按钮按下之后判断
$("#loginBtn").on("click", function() {
	var phoneNum = $("#phoneNum").val();
	var password = $("#passWord").val();
	var iSignForm = $.cookie("signform") ? $.cookie("signform") : {};
	var oSignForm = JSON.parse(iSignForm);
	var loginForm = {
		"phone": phoneNum,
		"password": password
	}

	if (phoneNum == oSignForm.phone && password == oSignForm.password) {
		$.cookie("signform", "bye", {
			path: '/',
			expires: -1
		})
		$.cookie("user", JSON.stringify(loginForm), {
			path: '/',
			expires: 1
		})

	} else {
		$("#phoneTip").text("用户名或密码错误");
		$("#phoneTip").css({
			"visibility": "visible"
		});
	}

})