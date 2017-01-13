/**
 * Created by liaofuan on 2016/6/29.
 */
/*$(function(){

});*/
var id = document.getElementById("allmap");
map = new BMap.Map(id);
var point = new BMap.Point(118.192677,24.488377);
map.centerAndZoom(point,14);

map.enableScrollWheelZoom();
map.enableInertialDragging();

map.enableContinuousZoom();

var size = new BMap.Size(10,20);//控件位置偏移量

map.addControl(new BMap.CityListControl({
    anchor:BMAP_ANCHOR_TOP_LEFT,
    offset:size
}));
var styleJson = [
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": {
            "color": "#3d435a"
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
        "featureType": "land",
        "elementType": "geometry.fill",
        "stylers": {
            "color": "#494545",
            "hue": "#000000",
            "lightness": 19,
            "saturation": -10,
            "visibility": "on"
        }
    },
    {
        "featureType": "green",
        "elementType": "all",
        "stylers": {
            "color": "#5e5757"
        }
    },
    {
        "featureType": "boundary",
        "elementType": "all",
        "stylers": {
            "color": "#a169e3",
            "lightness": -52
        }
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": {
            "color": "#726b6b",
            "lightness": -36
        }
    },
    {
        "featureType": "manmade",
        "elementType": "all",
        "stylers": {
            "color": "#787070"
        }
    },
    {
        "featureType": "building",
        "elementType": "all",
        "stylers": {
            "color": "#635b5b",
            "lightness": 4
        }
    },
    {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": {
            "visibility": "off"
        }
    }
];
map.setMapStyle({styleJson: styleJson});