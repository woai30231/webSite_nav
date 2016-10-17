# 怎么写一个电商网站的广告导航

## 前语

* 首先这个文档不会是一个论述很牛逼技术的文档，而仅仅是一个前端拿到设计图之后怎么用代码还原设计图的一个思路过程介绍！当中会用不同的方法实现目的，以及会具体介绍一些js代码的实现细节！

## 任务需求

* 由于这里是个demo文档，所以我们的目标暂定实现一个类似京东商城网站首页侧边主网页导航的样式，设计图如下（在这里只实现导航的左边部分，以及鼠标hover上去切换内容的效果）:

![设计图](https://github.com/woai30231/webSite_nav/blob/master/image/test_1.png "设计图")


## 整理思路

* 看到设计图之后，我们就要开始具体实现了，那么需要经历那些步骤呢？我列出如下：


1. *第一步搭建项目结构*

2. *第二步分析怎么实现*

3. *首先页面的重置样式编码*

4. *写html代码，（此刻不写js代码）*

5. *js实现切换效果*



###　搭建项目结构

* 这个项目还算是很小和简单的，所以我们采用普通的图片文件、样式文件、js文件的结构搭建！为什么把搭建项目作为第一个步骤，其实是基于这样的考虑：就像盖房子一样，把项目结构先构思出来，才能便于后续逻辑思路的跟进、变通！就像有了指引，后面的开发才不会乱套！结构如下

> domo1

>> demo1.html

>> js/

>>> index.js

>> css/

>>> reset.css

>>> index.css

>> image/



### 代码实现构思

* html方面，首先是一个左右结构，然后鼠标hover上去的时候会显示对应的隐藏块。基于此，有两种dom构建方式,一：构建一个大div，在里面实现左边导航区域，然后hover层嵌套在导航里面的每个子标签里面，这个方法有个不好的地方就是，dom层次嵌套太深，容易出错，而且导航dom显得很臃肿，后期也比较难改。二：直接两个div，一个是导航，一个是hover显示区域，hover区域当然了是靠定位的实现的！这样我们容易实现代码的剥离，后期也较容易实现复用！所以我们采用第二种方式。两种方式的dom结构参考下面的图：

方案一：
![](https://github.com/woai30231/webSite_nav/blob/master/image/test_2.png)


方案一：
![](https://github.com/woai30231/webSite_nav/blob/master/image/test_3.png)

* css方面，对于这种左右结构的页面，用float布局实现起来比较轻松，隐藏块不占用其它内容的面积，所以采用定位布局。

* js方面,其实就是一个for循环，当点击一个子选项的时候，所有hover块都隐藏，对应的hover显示




### 页面重置样式

* 一些html标签在各个浏览器里面是默认有一些浏览器样式的，但是我们为了后期方便统一处理，所以我们需要把这部分样式重写！请查阅[reset.css](https://github.com/woai30231/webSite_nav/blob/master/demo1/css/reset.css)


### html编码

* 这部分不应该包含js代码，主要目的是为了保证页面在不支持js的页面里面也能正确显示，点击[这里](https://github.com/woai30231/webSite_nav/blob/master/demo1/demo1.html)可查看代码


### js实现切换效果

* 原理就是for循环，当选项hover的时候，遍历所有的隐藏框，全部设置display:none样式，然后获取当前hover选项的索引，然后找到对应的隐藏框，设置display:block，代码如下：

``` javascript



//即时函数，避免污染全局空间
(function(){
	var wraper = document.getElementById("NAV_wrapper");
	var navigation = document.getElementById('navigation');
	var hide_block = document.getElementById('hide_block');
	if(!navigation && !hide_block)return;
	var nav_list = navigation.getElementsByTagName('li');
	var hide_block_list = hide_block.getElementsByClassName('h_item');
	setTimeout(function(){
		for(var i = 0,len = nav_list.length;i<len;i++)(function(n){
			//因为这里是异步操作，所以必须用闭包包起来，延长变量作用域周期
			function fn1(){
				for(var j = 0;j<hide_block_list.length;j++){
					hide_block_list[j].style.display = 'none';
				};
				for(var xx = 0;xx<nav_list.length;xx++){
					var cssTxt = nav_list[xx].className.replace(/^\s*|\s*$/g,'').split(/\s+/);
					var num = cssTxt.indexOf('active');
					if(num != -1){
						cssTxt.splice(num,1);
						nav_list[xx].className = cssTxt.join(' ');
					};
				};
				nav_list[n].className += ' active';
				hide_block.style.display = 'block';
				hide_block_list[n].style.display = 'block';
			};
			function fn(){
				hide_block.style.display = 'none';
				hide_block_list[n].style.display = 'none';
				var cssTxt = nav_list[n].className.replace(/^\s*|\s*$/g,'').split(/\s+/);
				var num = cssTxt.indexOf('active');
				if(num != -1){
					cssTxt.splice(num,1);
					nav_list[n].className = cssTxt.join(' ');
				};
			};
			wraper.onmouseout = fn;
			hide_block.onmouseover = fn1;
			nav_list[n].onmouseover = fn1;
		})(i);
	},0);
})();
	

```


## 后话

* 当然了，思路还有种基于mvc模式的！这里不在阐述！上面的代码用了纯js来写，代码相对来说变复杂和多了，如果用到相关库，可能很少的代码就能搞定，比如使用jquery，则代码相对少了很多，如下：

``` javascript

	(function($){

	 	$(function(){

	 		$("#navigation li").mouseover(function(){
	 			var $index = $("#navigation li").index($(this));
	 			$(this).addClass('active').siblings().removeClass('active');
	 			$("#hide_block").css('display','block');
	 			$("#hide_block .h_item").css('display','none').eq($index).css('display','block');
	 		});


	 		$("#NAV_wrapper").mouseout(function(){
	 			$("#hide_block").css('display','none');
	 			$("#hide_block .h_item").css('display','none');
	 			$("#navigation li").removeClass('active');
	 		});
	 		$("#hide_block").mouseover(function(){
	 			var $child = $("#hide_block").children(".h_item");
	 			var $index = $("#hide_block .h_item").index($child);
	 			$("#hide_block .h_item").css('display','none').eq($index).css('display','block');
	 			$("#navigation li").removeClass('active').eq($index).addClass('active');
	 		});



	 	});

	})(jQuery);

```