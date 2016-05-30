<?php

    //通过id值来获取商品列表的图片的数组
    function getGoodImages($item_id){
        $url = "http://mall.360.com/shop/item?item_id=".$item_id;
        $contents = file_get_contents($url);
        $tinyImg = '#<a href="" class="tinypic(.*?)</a>#';  //获取图片所在的位置的正则
        $imgUrl = '#http(.*?)jpg#';  //获取图片准确的地址的正则
        preg_match_all($tinyImg,$contents,$content);
        $images = $content[0];
        foreach($images as $key => $value){
            preg_match($imgUrl,$value,$value);
            $images[$key] = $value[0];
        }
        return $images;
    }

    //通过id值获取介绍图片
    function getGoodIntro($item_id){
        $url = "http://mall.360.com/shop/item?item_id=".$item_id;
        $contents = file_get_contents($url);
        $introImg = '#<img data-original="(.*?)"#';
        preg_match_all($introImg,$contents,$content);
        $images = $content[1];
        return $images;
    }

    //通过id获取所有信息
function getGoodInfo($item_id){
    $url = "http://mall.360.com/shop/item?item_id=".$item_id;
    $contents = file_get_contents($url);

    //获取小图
    $tinyImgReg = '#<a href="" class="tinypic(.*?)</a>#';  //获取小图图片所在的位置的正则
    $imgUrlReg = '#http(.*?)jpg#';  //获取小图图片准确的地址的正则
    preg_match_all($tinyImgReg,$contents,$tinyImages);
    $tinyImgs = $tinyImages[0];
    foreach($tinyImgs as $key => $value){
        preg_match($imgUrlReg,$value,$value);
        $tinyImgs[$key] = $value[0];
    }
    //获取介绍图
    $introImgReg = '#<img data-original="(.*?)"#';
    preg_match_all($introImgReg,$contents,$introImgs);
    $introImgs = $introImgs[1];

    //获取价格
    $priceReg = '#</em>(.*?)</strong>#';
    preg_match_all($priceReg,$contents,$price);

    //获取标题
    $titleReg = '#<div class="tr nobdr"> <strong>(.*?)</strong>#';
    preg_match_all($titleReg,$contents,$title);

    $goodInfo = array('title'=>$title[1][0],'tinyimg'=>$tinyImgs,'introimg'=>$introImgs,'price'=>$price[1][0]);
    return json_encode($goodInfo);
}

$callback = "callback";
if(isset($_GET["callback"])){
    $callback = $_GET["callback"];
}

exit ($callback."(".getGoodInfo("55f28dcb5efb11111f8b456b").")");