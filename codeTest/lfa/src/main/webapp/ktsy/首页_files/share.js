// JavaScript Document

$(document).ready(function(){
	// 去Ａ标签点击后的虚线框
	$("a").bind("focus",function() {
		if(this.blur) {this.blur()};
	});
	$(".ApproveInfoBox li:nth-child(even)").css("background","#F7F7F7");
	$("#openSearch").live("click", function(){
		$(".highSearchBox").fadeIn();
	});
	$("#clsSearch").live("click", function(){
		$(".highSearchBox").fadeOut(1);
	});
})


//内容框架
$(function(){
	reAutoHeight();
	$(window).resize(function(){
		reAutoHeight();
	});
    _initMenu();
});
function reAutoHeight() {
	$("#moMainBodyCon").width($(window).width()).height($(window).height()-64);
	$("#sidebarCon").height($(window).height()-54);	
};

function getUrlParams(url)
{
    var name,value, i,str=url,index=str.indexOf("?"),
        str=str.substr(index+1),arrtmp=str.split("&"),param={} ;
    for(i=0;i < arrtmp.length;i++){
        index=arrtmp[i].indexOf("=");
        if(index>0){
            name=arrtmp[i].substring(0,index);
            value=arrtmp[i].substr(index+1);
            param[name]=value;
        }
    }
    return param;
}

function _initMenu() {
    //二级下拉菜单
    $("ul.dropLayer > li").mouseenter(function(){
        $(this).children("dl.subMenu").fadeIn(0, function(){
//            <!--[if IE 6]>$("dl.subMenu").bgiframe();<![endif]-->
			$(this).bind("mouseleave", function(){
			    $(this).unbind("mouseleave"); $(this).fadeOut(0);
			});
        });
        $(this).children("a").addClass("selA");
        $("ul.dropLayer > li").not($(this)).children("dl.subMenu").fadeOut(0);
        $("ul.dropLayer > li").not($(this)).children("a").removeClass("selA");
        $(this).mouseleave(function(){
            $("dl.subMenu").fadeOut(0);
            $(this).children("a").removeClass("selA");
        });
    });
    $("ul.dropLayer > li a").click(function(){ $("dl.subMenu").fadeOut(0);});

    //标签切换调用
	tabSwitchFun(".popSwitchBox", ".tabTit li", "taba", "tabhover", ".tabHackBox");
    //关闭警告框
    $("#clsWarn").click(function(){
        $("#warnBox").fadeOut(500);
    });

}
//
function tabSwitchFun(tabFatherCon, tabTitLi, dfLi, hvLi, tabChildBox){
	//标签切换
	$(tabFatherCon).each(function() {
        $(this).find(tabChildBox).eq(0).fadeIn(0).siblings(tabChildBox).fadeOut(1);
    });
	
	$(tabTitLi).live("click", function () {
		var index = $(this).index();
		$(this).attr('class',hvLi).siblings('li').attr('class',dfLi);
		$(this).parents(tabFatherCon).find(tabChildBox).eq(index).fadeIn(0).siblings(tabChildBox).fadeOut(0);
	});		
}
//可排序的表格
$(document).ready(function(){
	oddevenTR();
	//
	$(".drillOperate a").click(function(){
		$(this).addClass("selA").siblings("a").removeClass("selA");
	});


});
function calcSum () {
    $(".totalable tfoot tr").each(function () {
        $(this).find(".money").each(function () {
            $(this).text("0");
        });
        $(this).find(".count").each(function () {
            $(this).text("0");
        });
    });
    $(".totalable").find("tbody").each(function(){
        var tfootTr =$(this).parent().find("tfoot tr");
        $(this).find("tr").each(function () {
            $(this).find(".money").each(function () {
                var index = $(this).index();
                if (index >= 1) {
                    var tdValue = tfootTr.find("th:eq(" + index + ")").text();
                    tfootTr.find("th:eq(" + index + ")").text(parseFloat(tdValue) + parseFloat($(this).text()));
                }
            });
            $(this).find(".count").each(function () {
                var index = $(this).index();
                if (index >= 1) {
                    var tdValue = tfootTr.find("th:eq(" + index + ")").text().trim();
                    tdValue = $.isNumeric(tdValue) ? tdValue : 0;
                    tfootTr.find("th:eq(" + index + ")").text(parseInt(tdValue) + parseInt($(this).text()));
                }
            });
        });
    });
}
function oddevenTR(){
	$("table.tablesorter tbody tr").each(function() {
       $(this).removeClass("evenTr").addClass("oddTr");
	   $(this).parents("table.tablesorter").find("tr:even").addClass("evenTr").removeClass("oddTr");
    });
	$("table.tablesorter tbody tr.spaceTr").css("background","#f5f5f5");
	$("table.tablesorter tbody tr.spaceHTr").css("background","#CACACA");
	$("table.tablesorter tbody tr").hover(function(){
		$(this).addClass("hoverTr");
	},function(){
		$(this).removeClass("hoverTr");
	});
	//在线协作表格
	$("table.tableContoso tbody tr").each(function() {
       $(this).addClass("oddTr");
	   $(this).parents("table.tableContoso").find("tr:even").addClass("evenTr");
    });
	$("table.tableContoso tbody tr.spaceTr").css("background","#f5f5f5");
	$("table.tableContoso tbody tr.spaceHTr").css("background","#CACACA");
	$("table.tableContoso tbody tr").hover(function(){
		$(this).addClass("hoverTr");
	},function(){
		$(this).removeClass("hoverTr");
	});

    calcSum();
    $(".money").each(function(){
       $(this).text(roundNumber($,$(this).text()));
    });
};

