
(function($){
	$.fn.switcher=function(ops){
		var setting = {
			stay:3000
		};
if(typeof ops=='object') $.extend(setting,ops);
		var self = this[0],
			boxId = self.id;
		if(!boxId){
			boxId="wrapper001";
			self.id=boxId;
		}
		var srcImgs = $("#"+boxId+" .wshow"),
			len = srcImgs.length,
			width="100%",
			height="1",
			box= $(self),
			ul = $("#"+boxId+" ul"),
			lis = $("#"+boxId+" li"),
			curIndex = 0;
			maxleft=0,
			minleft=0,
			eachPx = 10,
			delay=10;
 
 
			console.info(srcImgs[0].onload);
		/*自适应时，宽高无法固定，根据第一张图片的大小比例进行缩放，设置滚动图片的可视区域大小*/
		var nowStyle = getComputedStyle?getComputedStyle(srcImgs[0],null):srcImgs[0].currentStyle;
 
			//console.info(srcImgs.length);
 
			
			
			width= parseInt(nowStyle.width);
			height = parseInt(nowStyle.height);
 
			box.css("height",height);
			ul.css("width",(width*len+10)+"px");
			lis.css("width",width+"px").each(function(i){
				$(this).attr("data-left",(0-width*i)+"px");
			});
 
			var arrowtop = parseInt((height-30)/2),
			arrowStyle = ' style="top:'+arrowtop+'px;" ';
 
			//添加左右箭头
			box.append('<div class="arrow-l"'+arrowStyle+'></div>').append('<div class="arrow-r"'+arrowStyle+'></div>');
 
			var arrowLeft = $(".arrow-l"),
				arrowRight = $(".arrow-r");
 
			intervalHandler = null;
			function scrollTo(tamp){
				if(intervalHandler != null)return;
				var index = curIndex+tamp;
				if(index<0||index>=len){
					return;
				}
				
				curIndex = index;
				var elen = 0-tamp*eachPx;
 
				var nowLeft = parseInt(ul.css("left")),
					moveLeft = parseInt($(lis[index]).data("left"));				
				
					intervalHandler = setInterval(function(){
						var nowLeft = parseInt(ul.css("left"));
						nowLeft += elen;
						//console.info(nowLeft+">>"+moveLeft);
						if((tamp>0&&nowLeft>=moveLeft)||(tamp<0&&nowLeft<=moveLeft)){
							ul.css("left",nowLeft+"px");
						}else{
							clearInterval(intervalHandler);
 
							if(curIndex==0){
								arrowLeft.hide();
							}else if(curIndex+1==len){
								arrowRight.hide();
							}else{
								arrowLeft.show();
								arrowRight.show();
							}
							ul.css("left",moveLeft+"px");							
							intervalHandler = null;
						}
					},delay);
			}
 
			function scrLeft(){
				scrollTo(-1);
			}
 
			
			function scrRight(){
				scrollTo(1);
			}
 
			arrowLeft.bind("click",function(){
				stopAuto();
				scrLeft();
			});
 
			arrowRight.bind("click",function(){
				stopAuto();
				scrRight();
			});
 
		var touchPos = {startX:0,endX:0};
		self.addEventListener("touchstart",function(e){
			//e.preventDefault();
			if(touchPos.startX==0){
				touchPos.startX = e.targetTouches[0].clientX;
			}
			//alert(touchPos.startX);
		},false);
		
		self.addEventListener("touchend",function(e){
			var x = e.changedTouches[0].clientX;
			
			if(x-touchPos.startX>20){
				stopAuto();
				scrLeft(-1);
			}else if(x-touchPos.startX<-20){
				stopAuto();
				scrRight(1);
			}
			//alert(x-touchPos.startX);
			touchPos = {startX:0,endX:0};
		},false);
 
		autoStep = -1;
		autoHandler = setInterval(function(){
			if(curIndex==0||curIndex+1==len){
				autoStep = 0-autoStep;
			}
			scrollTo(autoStep);
		},setting.stay);
 
		function stopAuto(){
			clearInterval(autoHandler);
		};
		
	};
});
