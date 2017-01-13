function getUrl($,url,callback,param){
    requestUrl($,'GET',url,callback,param);
}

function postUrl($,url,callback,param,contentType,async){
    requestUrl($,'POST',url,callback,param,contentType||"application/json; charset=UTF-8",async);
}

function postJSON($,url,callback,param,contentType,async){
    requestUrl($,'POST',url,callback,param,contentType||"application/json; charset=UTF-8",async,"json");
}

function requestUrl($,method,url,callback,param,contentType,async,dataType){
    var result = {},time = new Date().getTime();
    if(url.indexOf("?")>-1){
        url = url +="&_dc="+time;
    }else{
        url = url +="?_dc="+time;
    }

    var requertParameters = {
        url: url,
        type:method,
        async: async!='undefined'?async:true,
        dataType: dataType!='undefined'?dataType:"json",

        success: function (data) {
            result.success = true;
            try{
                result.json =data;
            }
            catch (e){}
            if(callback)
                callback(result);
        },

        error: function (xmlHttpRequest, textStatus, errorThrown) {
            result.success = false;
            result.textStatus = textStatus;
            result.errorThrown = errorThrown;
            if(callback)
                callback(result);
        }
    };

    if(typeof(param) != 'undefined'){
        requertParameters.data = param;
    }

    /*
    if(typeof(async) != 'undefined'){
        requertParameters.async = async;
    }
    */

    if(typeof(contentType) != 'undefined' && contentType != "post"){
        requertParameters.contentType = contentType;
    }

    $.ajax(requertParameters);
}