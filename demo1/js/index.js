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