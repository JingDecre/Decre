// 移动弹出层
function openPopWindow(divShadow, popWindow, popWidth, popHeight){
	$(divShadow).fadeIn();
	$(popWindow).fadeIn(0);
	$(popWindow).width(popWidth);
    if(popHeight){
        $(popWindow).height(popHeight);
    }
	//$(popChildBox).height(popHeight - 28);
	var winLe = $(window).width() - $(popWindow).width()
	var winTo = $(window).height() - $(popWindow).height()
	$(popWindow).css({"left": winLe/2, "top":winTo/2 - 28});

};
function closePopWindow(divShadow, popWindow){
	$(divShadow).fadeOut();
	$(popWindow).fadeOut(0);
};
function movePopWindow(moveTit, moveFaBox){
	var _move=false;//移动标记
	var _x,_y;//鼠标离控件左上角的相对位置
    $(moveTit).mousedown(function(e){
		 _move=true;
		 _x=e.pageX-parseInt($(this).parent(moveFaBox).css("left"));
		 _y=e.pageY-parseInt($(this).parent(moveFaBox).css("top"));
		 $(moveFaBox).fadeTo(0, 0.95);//点击后开始拖动并透明显示
     });
	 $(document).mousemove(function(e){
		if(_move){
			var x=e.pageX-_x;//移动时根据鼠标位置计算控件左上角的绝对位置
			var y=e.pageY-_y;
			$(moveTit).parent(moveFaBox).css({top:y,left:x});//控件新位置
		}
	}).mouseup(function(){
		if(_move){_move=false;
		$(moveTit).parent(moveFaBox).fadeTo(0, 1);//松开鼠标后停止移动并恢复成不透明
		}
    });	
}