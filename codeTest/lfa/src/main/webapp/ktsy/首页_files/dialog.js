function initDialog($){
    if(typeof(document.getElementById("__popShadowBg__")) == 'undefined'){
        $(document.body).append('<div id="__popShadowBg__"><iframe style="width:100%; height:100%; filter:alpha(opacity=0);-moz-opacity:0"></iframe></div>');
    }

    if(document.getElementById("__dialogPopWin_") == null){
        $(document.body).append('<div class="optimizeTabsPopWin" id="__dialogPopWin_">' +
        '<h5 id="__dialogPopWin_H5"><a id="__cls__dialogPopWin___" href="javascript:;"><img src="' + imagePath + 'icons/ClosePop.gif" /></a><span id="__dialogTitle_">公告更新</span></h5>' +
        '<div class="noticeBox" id="__dialogContent__" style="padding-top: 10px"></div></div>');
    }

}

function info($,content,width,height){
    document.getElementById("__dialogTitle_").innerText = '信息';
    document.getElementById("__dialogContent__").innerHTML = '<div style="text-align: center;margin:0 auto;">' + content + '</div>';

    var popWidth = '320px';
    var popHeight = '80px';

    if(typeof(width) != 'undefined'){
        popWidth = width;
        popHeight = height;
    }

    openPopWindow("#__popShadowBg__", "#__dialogPopWin_", popWidth, popHeight);
    movePopWindow("#__dialogPopWin_H5","#__dialogPopWin_");

    $("#__cls__dialogPopWin___").live("click", function(){
        closePopWindow("#__popShadowBg__","#__dialogPopWin_");
    });
}

function parkDialog($,content,width,height){
    document.getElementById("__dialogTitle_").innerText = '筛选';
    document.getElementById("__dialogContent__").innerHTML = '<div style="text-align: center;margin:0 auto;">' + content + '</div>';

    var popWidth = '320px';
    var popHeight = '80px';

    if(typeof(width) != 'undefined'){
        popWidth = width;
        popHeight = height;
    }

    openPopWindow("#__popShadowBg__", "#__dialogPopWin_", popWidth, popHeight);
    movePopWindow("#__dialogPopWin_H5","#__dialogPopWin_");
}

/**
 *
 * @param $         jquery对象
 * @param msg       显示内容
 * @param options   tip配置
 *      {duration 显示时间 默认 3秒
 *      width 宽度 默认 320px
 *      height 高度 默认 80px
 *      type 显示类型[INFO,ERROR,WARN] 默认 INFO}
 */
function showTip($,msg,options){
    options = options || {};
    options["duration"] = options["duration"] == null ? 3 : options["duration"];
    options["width"] = options["width"] == null ? "320px" : options["width"];
    options["height"] = options["height"] == null ? "80px" : options["height"];
    options["type"] = options["type"] == null ? "INFO" : options["type"];
    options["longShow"] = options["longShow"] == null ? false : options["longShow"];
    var duration = options["duration"],type=options["type"].toUpperCase(),
        windwId= _uuid(),titleId=_uuid(),h5Id=_uuid(),closeId=_uuid(),contentId=_uuid(),longShow=options["longShow"];

    $(document.body).append('<div class="optimizeTabsPopWin" id='+windwId+'>' +
        '<h5 id='+h5Id+'><a id='+closeId+' href="javascript:;"><img src="' + imagePath + 'icons/ClosePop.gif" /></a><span id='+titleId+'>信息</span></h5>' +
        '<div class="noticeBox" id='+contentId+' style="padding-top: 10px"></div></div>');

    $("#"+contentId).empty().append('<div style="text-align: center;margin:0 auto;">' + msg + '</div>') ;
    switch (type){
        case 'WARN' :
            $("#"+titleId).text('警告信息');
            $("#"+h5Id).css("background","#FF8000");
            $("#"+titleId).css("color","#000000");
            break;
        case 'ERROR' :
            $("#"+titleId).text('异常信息');
            $("#"+h5Id).css("background","red");
            break;
    }
    openPopWindow("#__popShadowBg__", "#"+windwId, options["width"], options["height"]);
    movePopWindow("#"+h5Id,"#"+windwId);
    $("#"+closeId).live("click", function(){
        closePopWindow("#__popShadowBg__","#"+windwId);
        $("#"+windwId).remove();
    });

    if(!longShow) { // 长时间显示
        //多久后关闭
        if(duration){
            duration = parseFloat(duration) * 1000;
            window.setTimeout(function () {
                if(!closed){
                    closePopWindow("#__popShadowBg__","#"+windwId);
                    $("#"+windwId).remove();
                }
            }, duration);
        }
    }

    return windwId;
}

function _uuid(){
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
}


function dialog($,html,width,height){
    document.getElementById("__dialogTitle_").innerText = '信息';
    document.getElementById("__dialogContent__").innerHTML = html;

    var __popWidth = '320px';
    var __popHeight = '80px';

    if(typeof(width) != 'undefined'){
        __popWidth = width;
        __popHeight = height;
    }

    openPopWindow("#__popShadowBg__", "#__dialogPopWin_", __popWidth, __popHeight);
    movePopWindow("#__dialogPopWin_H5","#__dialogPopWin_");

    $("#__cls__dialogPopWin___").live("click", function(){
        closePopWindow("#__popShadowBg__","#__dialogPopWin_");
    });
}


function removeTip(windwId){
    closePopWindow("#__popShadowBg__","#"+windwId);
    $("#"+windwId).remove();
}