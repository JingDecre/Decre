/**初始化页面*/
var mapId = document.getElementById("map-container");
var map = new BMap.Map(mapId, {enableMapClick: false});        //在container容器中创建一个地图,参数container为div的id属性;并将底图设为不可点击状态
map.addControl(new BMap.NavigationControl());        // 添加平移缩放控件
map.addControl(new BMap.ScaleControl());             // 添加比例尺控件
map.addControl(new BMap.OverviewMapControl());       //添加缩略地图控件
/*map.enableScrollWheelZoom();                         //启用滚轮放大缩小*/
map.disable3DBuilding();
map.setMinZoom(5);
map.setMaxZoom(14);
var parkList = [];
var proList = [];
var availableParks = [];
park_all();
pro_push();
searchBox();
initialize();
/* $("#side-toggle").toggle(
 function () {
 $("#side").animate({right: "-319px"}, "fast");
 /!* $("#side-container").animate({left:'319px'},"slow");
 $("#side-toggle").animate({left:'304px'},"slow");*!/
 },
 function () {
 $("#side").animate({right: "0px"}, "fast");
 }
 );*/

$("#combo-box-search").click(function () {
    if (flag) {
        wrapShow();
        flag = false;
    } else {
        wrapHide();
        flag = true;
    }
});
$("#map-container").click(function () {
        $("#search-park").blur();
        $("#search-container").attr("class","search-container");
        $("#search-close").attr("class","search-close");
        if (!flag || !flag_c) {
            cityHide();
            wrapHide();
            flag = true;
            flag_c = true;
        }
    }
);
$("#combo-box-order").click(function () {
    if (flag_c) {
        cityShow();
        flag_c = false;
    } else {
        cityHide();
        flag_c = true;
    }
});
function checkNum() {
    var checkList = $("[name='checkPark']");
    var nameStr = '';
    var lotStr = '';
    for (var index in checkList) {
        if (checkList[index].checked) {
            var checkVal = checkList[index].value;
            if (nameStr != '')
                nameStr += ",";
            nameStr += "" + checkVal.split(':')[1] + "";
            if (lotStr != '')
                lotStr += ",";
            lotStr += "" + checkVal.split(':')[0] + ""
        }
    }
    var params = {'parkTextBox': nameStr, 'lotCode': lotStr, 'parkFlag': 0};

    $.ajax({
        url: basePath + "auth/saveParkData",
        type: "POST",
        contentType: 'application/json',
        data: $.toJSON(params),
        success: function (result) {
            parent.reloadSelectPark();
        },
        error: function (jqXhr) {
            alert(jqXhr);
        }
    });
    parent.$('#parkTextBox').val(nameStr);
    parent.$('#parkAllData').val(lotStr);
    parent.$('#isOrgData').val('0');
    parent.queryData(0);
}
/**初始化页面*/

//个性化在线编辑器地址：http://developer.baidu.com/map/custom/
var mapStyle = {features: ["road", "building", "water", "land"], style: "dark"};

var styleJson = [
    {
        "featureType": "land",
        "elementType": "geometry",
        "stylers": {
            "color": "#303845",
            "hue": "#303845",
            "saturation": 0
        }
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": {
            "color": "#232931",
            "hue": "#232931"
        }
    },
    {
        "featureType": "green",
        "elementType": "all",
        "stylers": {
            "color": "#303845",
            "hue": "#303845"
        }
    },
    {
        "featureType": "manmade",
        "elementType": "all",
        "stylers": {
            "color": "#303845",
            "hue": "#303845"
        }
    },
    {
        "featureType": "building",
        "elementType": "all",
        "stylers": {
            "color": "#303845",
            "hue": "#303845"
        }
    },
    {
        "featureType": "highway",
        "elementType": "all",
        "stylers": {
            "visibility": "off"
        }
    },
    {
        "featureType": "railway",
        "elementType": "all",
        "stylers": {
            "visibility": "off"
        }
    },
    {
        "featureType": "subway",
        "elementType": "all",
        "stylers": {
            "visibility": "off"
        }
    },
    {
        "featureType": "local",
        "elementType": "all",
        "stylers": {
            "visibility": "off"
        }
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": {
            "visibility": "off"
        }
    },
    {
        "featureType": "all",
        "elementType": "labels",
        "stylers": {
            "visibility": "off"
        }
    },
    {
        "featureType": "boundary",
        "elementType": "geometry.fill",
        "stylers": {
            "color": "#5a6b7f",
            "hue": "#5a6b7f",
        }
    },
    {
        "featureType": "boundary",
        "elementType": "geometry.stroke",
        "stylers": {
            "color": "#5a6b7f",
            "weight": "0.5"
        }
    },
    {
        "featureType": "arterial",
        "elementType": "all",
        "stylers": {
            "color": "#1a1f24",
            "hue": "#1a1f24",
            "weight": "0.5"
        }
    }
];
map.setMapStyle({styleJson: styleJson});

/**车场搜索框的搜索范围*/
function searchBox() {
    for (var i = 0; i < parkList.length; i++) {
        availableParks.push(parkList[i].name);
    }
    $("#search-park").autocomplete({
        source: availableParks,
        select: function (event, ui) {
            var park_name = ui.item.value;
            var parks = parkList;
            for (var i = 0; i < parks.length; i++) {
                if (park_name == parks[i].name) {
                    var park = parks[i];
                    break;
                }
            }

            parkProMark(park.id);
        }
    });
}
var flag = true;//省份弹出框判断
var flag_c = true;//城市弹出框判断
var colors = [];

/**全部权限车场信息*/
function park_all() {
    var url = basePath + "map/index/getAllPark";
    var param = {};
    postJSON($, url, function (result) {
        if (result.success) {
            var parkArr = result.json.data;
            for (var i = 0; i < parkArr.length; i++) {
                var pObj = parkArr[i];
                var poi = new OpiAr(pObj.LONGITUDE, pObj.LATITUDE);
                parkList.push(new parkPoi(pObj.ID, pObj.NAME, poi, pObj.CITY_ID, pObj.PROV_ID, i + 1));
            }
        } else {
            alert("数据加载错误！");
        }
    }, $.toJSON(param), "application/json; charset=UTF-8", false);
}

/**坐标*/
function OpiAr(lon, lat) {
    this.lon = lon;
    this.lat = lat;
}
/**车场*/
function parkPoi(id, name, poi, cid, pid, no) {
    this.id = id;
    this.name = name;
    this.poi = poi;
    this.cid = cid;
    this.pid = pid;
    this.no = no;
}
/**市级对象*/
function cityPoi(id, pid, name, poi,color) {
    this.id = id;
    this.name = name;
    this.poi = poi;
    this.pid = pid;//省编号
    this.color = color;
}
/**地域*/
function areaObj(id, name) {
    this.id = id;
    this.name = name;
}
/**省级*/
function proPoi(id, aid, name, poi,color) {
    this.id = id;
    this.aid = aid;
    this.name = name;
    this.poi = poi;
    this.color = color;
}
function cityShow() {
    $("#combo-box-city").show();
}
function cityHide() {
    $("#combo-box-city").hide();
}
function wrapShow() {
    $("#combo-box-wrapper").show();
}
function wrapHide() {
    $("#combo-box-wrapper").hide();
}
function backShow() {
    $("#back-cn").show();
}
function backHide() {
    $("#back-cn").hide();
}
/**区域信息*/
function areaPush() {
    var areaArray = [];
    areaArray.push(new areaObj(1, "华北"));
    areaArray.push(new areaObj(2, "华东"));
    areaArray.push(new areaObj(3, "华南"));
    areaArray.push(new areaObj(4, "西南"));
    areaArray.push(new areaObj(5, "西北"));
    areaArray.push(new areaObj(6, "华中"));
    areaArray.push(new areaObj(7, "东北"));
    return areaArray;
}

/**省份信息*/
function pro_push() {
    var colorList=["#FFCCCC","#FF9966","#CCFFFF","#99FFCC","#CCFF00"
        ,"#99CCFF","#FF9966","#CC9900","#9966FF","#FF66CC","#CC0000"
        ,"#33FFFF","#33CCCC","#3366FF","#00FF33","#006699","#663300",
        "#00CC66","#66CC99","#009999","#6666CC","#CCFFFF","#99FFCC","#CCFF00"
        ,"#99CCFF","#FF9966","#CC9900","#9966FF","#FF66CC","#CC0000"
        ,"#33FFFF","#33CCCC","#3366FF","#FFCCCC","#CCFFFF"];
    var url = basePath + "map/index/getPro";
    var param = {};
    postJSON($, url, function (result) {
        if (result.success) {
            var proArr = result.json.data;
            for (var i = 0; i < proArr.length; i++) {
                var obj = proArr[i];
                var poi = new OpiAr(obj.LONGITUDE, obj.LATITUDE);
                proList.push(new proPoi(obj.ID, obj.AREAID, obj.NAME, poi,colorList[i]));
            }
        } else {
            alert("数据加载错误！");
        }
    }, $.toJSON(param), "application/json; charset=UTF-8", false);
}
/**添加城市信息*/
function cityPush(pid) {
    var colorList=["#FFCCCC","#FF9966","#CCFFFF","#99FFCC","#CCFF00"
        ,"#99CCFF","#FF9966","#CC9900","#9966FF","#FF66CC","#CC0000"
        ,"#33FFFF","#33CCCC","#3366FF","#00FF33","#006699","#663300",
        "#00CC66","#66CC99","#009999","#6666CC","#CCFFFF","#99FFCC","#CCFF00"
        ,"#99CCFF","#FF9966","#CC9900","#9966FF","#FF66CC","#CC0000"
        ,"#33FFFF","#33CCCC","#3366FF","#FFCCCC","#CCFFFF"];
    var cityArray = new Array();
    var url = basePath + "map/index/getCity";
    var param = {
        'pid': pid
    };
    postJSON($, url, function (result) {
        if (result.success) {
            var cityArr = result.json.data;
            for (var i = 0; i < cityArr.length; i++) {
                var obj = cityArr[i];
                var poi = new OpiAr(obj.LONGITUDE, obj.LATITUDE);
                cityArray.push(new cityPoi(obj.ID, obj.PROV_ID, obj.NAME, poi,colorList[i]));
            }
        } else {
            alert("数据加载错误！");
        }
    }, $.toJSON(param), "application/json; charset=UTF-8", false);

    return cityArray;

}
/**绘制边界*/
function getBoundary(name) {
    var boundary = new BMap.Boundary();
    boundary.get(name, function (rs) {
        var count = rs.boundaries.length;
        if (count === 0) {
            alert('未能获取当前点击的行政区域');
            return;
        }
        var pointArray = [];
        for (var i = 0; i < count; i++) {
            var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 2, fillColor: "", strokeColor: "#a169e3"});
            map.addOverlay(ply);
            pointArray = pointArray.concat(ply.getPath());
        }
        map.setViewport(pointArray);
    });
}
/**未调整视野的边界绘制*/
function drawBoundary(name,cStr) {
    var boundary = new BMap.Boundary();
    boundary.get(name, function (rs) {
        var count = rs.boundaries.length;
        if (count === 0) {
            alert('未能获取当前点击的行政区域');
            return;
        }
        for (var i = 0; i < count; i++) {
            var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 2, fillColor:cStr , strokeColor: ""});
            map.addOverlay(ply);
        }
    });
}
/**返回全国地图*/
$("#back-cn").on("click", function () {
    backHide();
    country();
});
/**省级*/
function province(id) {
    wrapHide();
    backShow();
    flag = true;//省份弹出框判断
    flag_c = true;//城市弹出框判断
    $("#city-list").text("");
    $("#list").text("");
    var proArr = proList;
    for (var i = 0; i < proArr.length; i++) {
        if (proArr[i].id == id) {
            var pObj = proArr[i];
            break;
        }
    }
    $("#search-text").text(pObj.name);
    $("#city-text").text("请选择");
    map.clearOverlays();
    var cityArray = cityPush(pObj.id);
    var parkArray = parkList;
    var no = 1;
    getBoundary(pObj.name);

    for (var j = 0; j < parkArray.length; j++) {
        var park = parkArray[j];
        if (pObj.id == park.pid) {
            $("#list").append("<li id='park_" + park.no + "'><a href='javascript:void(0);' onclick='parkProMark(" + park.id + ")' >" +
                "<span class='scenic' title='" + park.name + "'>" + (no) + "." + park.name + "</span>" +
                "</a><span class='checkPark'><input type='checkbox'  id='checkPark' name='checkPark' value='" + park.id + ":" + park.name + "'></span></li>");
            no++;
        }
    }
    for (var i = 0; i < cityArray.length; i++) {
        var cObj = cityArray[i];
        city_park(cObj);
        $("#city-list").append("<div class='area-group'>" +
            "<a href='javascript: void(0);' onclick='city(" + cObj.id + ")' class='area-group-item' >" + cObj.name + "</a></div>");

    }

    parkCheck();
    /**市级聚合*/
    function city_park(c) {
        cityMarkerClus(c);
    }
}
/**根据城市id添加车场信息*/
function parkPush(cid) {
    var parkArray = [];
    var url = basePath + "map/index/getPark";
    var param = {
        'cid': cid
    };
    postJSON($, url, function (result) {
        if (result.success) {
            var parkArr = result.json.data;
            for (var i = 0; i < parkArr.length; i++) {
                var obj = parkArr[i];
                var poi = new OpiAr(obj.LONGITUDE, obj.LATITUDE);
                parkArray.push(new parkPoi(obj.ID, obj.NAME, poi, cid, obj.PROV_ID, i + 1));
            }
        } else {
            alert("数据加载错误！")
        }
    }, $.toJSON(param), "application/json; charset=UTF-8", false);
    return parkArray;

}
/**根据省份id获取车场数据*/
function parkProPush(pid) {
    var parkArray = [];
    for (var i = 0; i < parkList.length; i++) {
        if (pid == parkList[i].pid) {
            parkArray.push(parkList[i]);
        }
    }
    return parkArray;
}
/**根据车场id获取车场*/
function queryPark(id) {
    var obj = {};
    var url = basePath + "map/index/queryPark";
    var param = {
        'id': id
    };
    postJSON($, url, function (result) {
        if (result.success) {
            var park = result.json.data;
            var poi = new OpiAr(park.LONGITUDE, park.LATITUDE);
            obj = new parkPoi(park.ID, park.NAME, poi, park.CITY_ID, park.PROV_ID);
        } else {
            alert("数据加载错误！")
        }
    }, $.toJSON(param), "application/json; charset=UTF-8", false);
    return obj;
}

var markers = [];//存放标注marker对象
function mark(id, marker) {
    this.id = id;
    this.marker = marker;
}
/**市级*/
function city(id, park_id) {
    backShow();
    flag = true;//省份弹出框判断
    flag_c = true;//城市弹出框判断
    $("#list").text("");
    var obj = new Object();
    var level = 12;
    var param = {
        'cid': id
    };
    var url = basePath + "map/index/queryCity";
    postJSON($, url, function (result) {
        if (result.success) {
            var c = result.json.data;
            var p = new OpiAr(c.LONGITUDE, c.LATITUDE);
            obj = new cityPoi(c.ID, c.PROV_ID, c.NAME, p);
        } else {
            alert("数据加载错误！");
        }
    }, $.toJSON(param), "application/json; charset=UTF-8", false);
    map.clearOverlays();
    cityHide();
    $("#city-text").text(obj.name);
    getBoundary(obj.name);
    var pArr = parkPush(id);
    for (var i = 0; i < pArr.length; i++) {
        var pObj = pArr[i];
        var poi = new BMap.Point(pArr[i].poi.lon, pArr[i].poi.lat);
        poiMark(poi, level, pObj.name, pObj.no);
        var str = "" + pObj.id + ":" + pObj.no;
        $("#list").append("<li id='park_" + pObj.no + "'><a href='javascript:void(0);' onclick='parkMark(\"" + str + "\"  )' >" +
            "<span class='scenic' title='" + pObj.name + "'>" + (pObj.no) + "." + pObj.name + "</span>" +
            "</a><span class='checkPark'><input type='checkbox'  id='checkPark' name='checkPark' value='" + pObj.id + ":" + pObj.name + "'></span></li>");
        if (park_id != "" && park_id == pObj.id) {
            $("#list li").attr("class", "");
            var pStr = "park_" + pObj.no;
            $("#" + pStr).attr("class", "selected");
            var marks = markers;
            for (var j = 0; j < marks.length; j++) {
                if (pObj.no == marks[j].id) {
                    var mark = marks[j].marker;
                    mark.setAnimation(BMAP_ANIMATION_BOUNCE);
                } else {
                    marks[j].marker.setAnimation(null);
                }
            }
        }
    }
    parkCheck();

}

/**12级市级地图车场定位*/
function parkMark(str) {
    var id = str.split(":")[0];
    var n = str.split(":")[1];
    var marks = markers;
    for (var j = 0; j < marks.length; j++) {
        if (n == marks[j].id) {
            var mark = marks[j].marker;
            mark.setAnimation(BMAP_ANIMATION_BOUNCE);
        } else {
            marks[j].marker.setAnimation(null);
        }
    }
    $("#list li").attr("class", "");
    var obj = queryPark(id);
    var proArr = proList;
    for (var i = 0; i < proArr.length; i++) {
        if (obj.pid == proArr[i].id) {
            var pObj = proArr[i];
            break;
        }
    }
    var pStr = "park_" + n;
    $("#" + pStr).attr("class", "selected");
    $("#search-text").text(pObj.name);
    /* var level = 12;
     var poi = new BMap.Point(obj.poi.lon,obj.poi.lat);
     centerPoi(poi,level);
     var info = infoWin(id);
     map.openInfoWindow(info,poi);*/
}
/**省级地图定位*/
function parkProMark(id) {
    var obj = queryPark(id);
    var proArr = proList;
    for (var i = 0; i < proArr.length; i++) {
        if (obj.pid == proArr[i].id) {
            var pObj = proArr[i];
            break;
        }
    }
    $("#search-text").text(pObj.name);
    city(obj.cid, obj.id);
    var level = 12;
    var poi = new BMap.Point(obj.poi.lon, obj.poi.lat);
    centerPoi(poi, level);
}
/**右侧栏加载全部车场*/
function loadParkAll() {
    var parkArr = parkList;
    for (var k = 0; k < parkArr.length; k++) {
        var park = parkArr[k];
        $("#list").append("<li id='park_" + park.no + " '><a href='javascript:void(0);' onclick='parkProMark(" + park.id + ")' >" +
            "<span class='scenic' title='" + park.name + "'>" + (park.no) + "." + park.name + "</span>" +
            "</a><span class='checkPark'><input type='checkbox'  id='checkPark' name='checkPark' value='" + park.id + ":" + park.name + "'></span></li>");
    }
}
/**国家级*/
function initialize() {
    backHide();
    $("#city-list").text("");
    $("#list").text("");
    map.clearOverlays();
    var point = new BMap.Point(115.820701, 32.89608);
    var level = 5;
    centerPoi(point, level);
    var proArr = proList;
    var areaArr = areaPush();
    pro_park();
    loadParkAll();
    parkCheck();
    for (var i = 0; i < areaArr.length; i++) {
        var aObj = areaArr[i];
        var opts = "<div class='area-group' >" +
            "<div class='area-group-name'>" + aObj.name + "：</div>" +
            "<div class='area-group-list' id='area-group-" + i + "'></div>" +
            "</div>";
        $("#area-list").append(opts);
        for (var j = 0; j < proArr.length; j++) {
            var pObj = proArr[j];
            if (aObj.id == pObj.aid) {
                var id = "area-group-" + i;
                $("#" + id).append("<a class='area-group-item' href='javascript:void(0)' onclick='province(" + pObj.id + ")'>" + pObj.name + "</a>");
            }
        }
    }
};
/**全国地图*/
function country() {
    backHide();
    $("#city-list").text("");
    $("#city-text").text("请选择");
    $("#list").text("");
    wrapHide();
    map.clearOverlays();
    var point = new BMap.Point(115.820701, 32.89608);
    var level = 5;
    $("#search-text").text("全国");
    centerPoi(point, level);
    pro_park();
    loadParkAll();
    parkCheck();
}
/**省级聚合*/
function pro_park() {
    var proArr = proList;
    for (var i = 0; i < proArr.length; i++) {
        proMarkerClus(proArr[i]);
    }
}

/**省级点聚合*/
function proMarkerClus(pObj) {
    var parkArr = parkProPush(pObj.id);
    var no = parkArr.length;
    var myStyles = [{
        url: basePath + 'images/location.png',
        size: new BMap.Size(30, 40),
        opt_anchor: [16, 0],
        textColor: '#ffffff',
        opt_textSize: 20
    }];

    if (no != 0) {
        drawBoundary(pObj.name,pObj.color);
        var poi = new BMap.Point(pObj.poi.lon-0.5, pObj.poi.lat+0.6);
        var opts = {
            position: poi,    // 指定文本标注所在的地理位置
            offset: new BMap.Size(-15, 10)    //设置文本偏移量
        };
        var label = new BMap.Label(pObj.name, opts);  // 创建文本标注对象
        label.setStyle({
            color: "#ffffff",
            fontSize: "12px",
            height: "20px",
            lineHeight: "20px",
            fontFamily: "微软雅黑",
            backgroundColor: "#00000000",
            border: "0px"
        });
        map.addOverlay(label);
        var rm = new BMapLib.TextIconOverlay(poi, no, {styles: myStyles});
        map.addOverlay(rm);
        rm.addEventListener("click", function () {
            province(pObj.id);
        });
    }

}
/**市级点聚合*/
function cityMarkerClus(cObj) {
    var no = 0;
    var parkArr = parkList;
    for (var i = 0; i < parkArr.length; i++) {
        if (cObj.id == parkArr[i].cid) {
            no++;
        }
    }
    var myStyles = [{
        url: basePath + 'images/location.png',
        size: new BMap.Size(30, 40),
        opt_anchor: [16, 0],
        textColor: '#ffffff',
        opt_textSize: 20
    }];
    if (no != 0) {
        drawBoundary(cObj.name,cObj.color);
        var poi = new BMap.Point(cObj.poi.lon, cObj.poi.lat+0.2);
        var opts = {
            position: poi,    // 指定文本标注所在的地理位置
            offset: new BMap.Size(-15, 10)    //设置文本偏移量
        };
        var label = new BMap.Label(cObj.name, opts);  // 创建文本标注对象
        label.setStyle({
            color: "#ffffff",
            fontSize: "12px",
            height: "20px",
            lineHeight: "20px",
            fontFamily: "微软雅黑",
            backgroundColor: "#00000000",
            border: "0px"
        });
        map.addOverlay(label);
        var rm = new BMapLib.TextIconOverlay(poi, no, {styles: myStyles});
        map.addOverlay(rm);
        rm.addEventListener("click", function () {
            city(cObj.id);
        });
    }

}
/**坐标标注*/
function poiMark(poi, level, name, no) {
    var marker = new BMap.Marker(poi);
    map.addOverlay(marker);               // 将标注添加到地图中
    markers.push(new mark(no, marker));
    marker.setTitle(name);
    /*marker.setAnimation(BMAP_ANIMATION_BOUNCE); */
    marker.addEventListener("click", function () {
        $("#list li").attr("class", "");
        var pStr = "park_" + no;
        $("#" + pStr).attr("class", "selected");
        var marks = markers;
        for (var j = 0; j < marks.length; j++) {
            if (marker == marks[j].marker) {
                marker.setAnimation(BMAP_ANIMATION_BOUNCE);
            } else {
                marks[j].marker.setAnimation(null);
            }
        }
        /*this.openInfoWindow(infoWindow);*/
        //图片加载完毕重绘infowindow
        /* document.getElementById('imgDemo').onload = function (){
         infoWindow.redraw();   //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
         }*/
    });

}
/**定位中心点*/
function centerPoi(poi, lev) {
    map.centerAndZoom(poi, lev);
}


/**车场复选框*/
//默认全选
function parkCheck() {
    $("[id= 'checkAll']:checkbox").attr("checked", true);
    $("[id = 'checkPark']:checkbox").attr("checked", true);
}
$("#checkAll").bind("click", function () {
    if ($("input[id='checkAll']").attr("checked")) {
        $("[id = checkPark]:checkbox").attr("checked", true);
    } else {
        $("[id = checkPark]:checkbox").attr("checked", false);
    }
});

$("#search-park").keyup(function(){
    if($(this).val != null || $(this).val != ""){
        $("#search-container").attr("class","search-container active");
        $("#search-close").attr("class","search-close search-close-active");
    }else {
        $("#search-container").attr("class","search-container");
        $("#search-close").attr("class","search-close search-close");
    }
});
$("#search-park").change(function(){
    if(!($(this).val in availableParks)){
        $("#search-null").show();
        setTimeout(function () {
            $("#search-null").hide();
        }, 3000);
    }
});
$("#search-close").click(function(){
    $("#search-park").val('');
    $("#search-park").attr("class","search-input");
    $("#search-container").attr("class","search-container");
    $("#search-close").attr("class","search-close");
});
$(function(){
    $("#search-park").focus(function(){
        $("#search-park").attr("class","search-input focus-search-input");
    });
    $("#search-park").focusout(function(){
        $("#search-null").hide();
        $("#search-park").val('');
        $("#search-park").attr("class","search-input");
        $("#search-container").attr("class","search-container");
        $("#search-close").attr("class","search-close");
    });
});


/**信息窗*/
/*
 function infoWin(parkId) {
 var obj = queryPark(parkId);
 var tObj = new Object();
 var temp = function(id,totalCar,totalIn){
 this.id = id;
 this.totalCar = totalCar;
 this.totalIn = totalIn;
 };
 var param={
 'lotIds':""+parkId,
 'parkFlag':0,
 'queryTimes':30

 };
 var url = basePath+"report/parkingStatistics/queryData";
 postJSON($,url,function(result){
 if(result.success){
 var o = result.json;
 tObj = new temp(parkId, o.TOTALVEHICLEC, o.CHARGETOTALMONEY);
 }else {
 alert("此车场暂无相关数据！");
 tObj = new temp(parkId,"——","——");
 }
 }, $.toJSON(param),"application/json; charset=UTF-8",false);
 var sContent =
 "<div class='info-1' style=' background-color:#0071C6; width: 360px;padding:40px 15px 15px; '>" +
 "<div style='font-size: 20px;position: absolute;z-index: 900;width: 250px;padding: 0;color: #fff;'>"+obj.name+"</div>" +
 "<div style='padding: 30px 0; '>" +
 "<div style='display: inline-block;width: 165px;text-align: center;vertical-align: top;border-right: 1px dotted #2887CF;'>" +
 "<div style='font-size: 16px;'>总车辆：</div>" +
 "<div style='font-family: 微软雅黑;font-size: 52px;height: 70px;'>"+tObj.totalCar+"</div>" +
 "<div style='background-color: #F3C802;'>辆</div>" +
 "</div>" +
 "<div style='display: inline-block;width: 180px;margin-left: -1px;text-align: center;vertical-align: top;border-left: 1px dotted #2887CF;'>" +
 "<div style='font-size: 16px;'>总收入：</div>" +
 "<div style='font-family: 微软雅黑;font-size: 52px;height: 70px;'>"+tObj.totalIn+"</div>" +
 "<div style='background-color: #F3C802;'>元</div>" +
 "</div>" +
 "</div>" +
 "<div style='font-size: 15px;background-color: #9ac2e5'>" +
 "<a href='javascript:void(0)'style='margin-left: 100px;text-decoration:none;color: #C54331'>近30天的车场记录</a>" +
 "</div>" +
 "</div>";
 var infoWindow = new BMap.InfoWindow(sContent);
 return infoWindow;
 }
 var sCont =
 "<div class='info-1' style=' background-color:#0071C6; width: 290px;padding:50px 40px 40px; '>" +
 "<div style='font-size: 20px;position: absolute;z-index: 900;width: 250px;padding: 0;color: #fff;'>厦门湖里万达广场停车场</div>" +
 "<div style='padding: 30px 0; '>" +
 "<div style='display: inline-block;width: 130px;text-align: center;vertical-align: top;border-right: 1px dotted #2887CF;'>" +
 "<div style='font-size: 16px;'>停车场饱和度</div>" +
 "<div style='font-family: 微软雅黑;font-size: 52px;height: 70px;'>3</div>" +
 "<div style='background-color: #F3C802;'>一般</div>" +
 "</div>" +
 "<div style='display: inline-block;width: 145px;margin-left: -1px;text-align: center;vertical-align: top;border-left: 1px dotted #2887CF;'>" +
 "<div style='font-size: 16px;'>空车位：</div>" +
 "<div style='font-family: 微软雅黑;font-size: 52px;height: 70px;'>24</div>" +
 "</div>" +
 "</div>" +
 "</div>";
 var infoWindow = new BMap.InfoWindow(sCont);*/
