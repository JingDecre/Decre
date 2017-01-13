define(['jquery', 'knockout', 'ztree', 'jquery-json', 'knockvalidation'], function ($, ko) {

    var MapDataModel = function (mainViewModel) {
        self.queryMap = function(){
            var lotName =  $('#lotCode').html();
            var lotCode =$('#lotCodeValue').html();
            alert(lotName+" "+lotCode);
        }
    }


    return function () {

        var self = this;
        var lots='';
        var tipId = null;
        var queryTimes = 0;
        // var hcharts objs
        var container1 = null;
        var container2 = null;
        var container3 = null;

        var mapDataModel = null;

        self.abnormalPass = ko.observable('');
        self.avgChargemoney = ko.observable('');
        self.chargeTotalMoney = ko.observable('');
        self.totalVehicle = ko.observable('');

        self.abnormalPassC = ko.observable('');
        self.avgChargemoneyC = ko.observable('');
        self.chargeTotalMoneyC = ko.observable('');
        self.totalVehicleC = ko.observable('');

        self.abnormalPassCom = ko.observable('');
        self.avgChargemoneyCom = ko.observable('');
        self.chargeTotalMoneyCom = ko.observable('');
        self.totalVehicleCom = ko.observable('');

        self.alarmData = ko.observableArray([]);
        self.vehicleFlowData = ko.observableArray([]);
        self.incomeMoneyData = ko.observableArray([]);
        /**权限车场*/
        self.parklotInit = function() {
            postJSON($, "auth/getParklot", function (result) {
                if(result.json.status != -1) {
                    var opts = '';
                    for(var i=0;i< result.json.resource.length; i++) {
                        opts += "<option value='"+ result.json.resource[i].id+"' >" +  result.json.resource[i].name + "</option>";
                        if(lots !=''){
                            lots +=','
                        }
                        lots += result.json.resource[i].id;
                    }
                    $("#lotInfo").append(opts);
                    self.query();
                }
            });
        };

        self.parklotInit();

        self.MapSelect = function(){
            openPopWindow("#popShadowBg", "#mapPopWin", "1200px","630");
            movePopWindow("#popMapWinH5", "#mapPopWin");
        }



        $("#clsmapPopWin").live("click", function () {
            closePopWindow("#popShadowBg", "#mapPopWin");
        });


        var queryParameters = {};
        function queryParameter(){
            var lotIds = $("#parkAllData").val();
            var parkFlag = $("#isOrgData").val();
            if(parkFlag != '1' && parkFlag != 1) {
                parkFlag = 0;
            }
            if(lotIds=='all'){
                lotIds = lots;
            }
            queryParameters = {
                'lotIds':lotIds,
                'parkFlag': parkFlag,
                'dayTime':queryTimes
            }
        }

        queryData= function (times){
            queryTimes = times;
            self.query();
        };

        // 监视全局车场选取框，被改变时 执行查询
        $("#parkTextBox").on('change', function(){
            // 按照上次时间查询
            self.query();
        });

        /**查询*/
        self.query = function () {
            tipId = showTip($, "加载数据中", {"longShow": true});
            queryParameter();
            self.simpleQuery();
            self.chargeTypeQuery();
            self.passTypeQuery();
            self.carFlowQuery();
            self.moneyFlowQuery();
            self.incomeAmountQuery();
            self.plateTypeReportQuery();
            self.vehicleFlowDataQuery();
            self.incomeMoneyDataDataQuery();
            self.alarmDataQuery();
            removeTip(tipId);
            container1 = $('#container1').highcharts();
            container2 = $('#container2').highcharts();
            container3 = $('#container3').highcharts();
            reloadContrainer();
        };

        var t10 = "↑";
        var t11 = "↓";
        var t20 ="同比上升";
        var t21 ="同比下降";
        var t30 = "与同期持平";
        var t31 = "";
        /**查询*/
        self.simpleQuery = function () {
            postJSON($, "report/parkingStatistics/queryData", function (result) {
                if (result.success) {
                    if(result.json!=null) {
                        self.abnormalPass(result.json.ABNORMALPASS);
                        self.avgChargemoney(result.json.AVGCHARGEMONEY);
                        self.chargeTotalMoney(result.json.CHARGETOTALMONEY);
                        self.totalVehicle(result.json.TOTALVEHICLE);

                        if(result.json.TOTALVEHICLECOM>0){
                            self.totalVehicleC(t20);
                            $("#totalVehicleT").html(t10);
                        }else if(result.json.TOTALVEHICLECOM==0){
                            self.totalVehicleC(t30);
                            $("#totalVehicleT").html("");
                        }else{
                            self.totalVehicleC(t21);
                            $("#totalVehicleT").html(t11);
                        }
                        if(result.json.AVGCHARGEMONEYCOM>0){
                            self.avgChargemoneyC(t20);
                            $("#avgChargemoneyT").html(t10);
                        }else  if(result.json.AVGCHARGEMONEYCOM==0){
                            self.avgChargemoneyC(t30);
                            $("#avgChargemoneyT").html("");
                        }else{
                            self.avgChargemoneyC(t21);
                            $("#avgChargemoneyT").html(t11);
                        }
                        if(result.json.CHARGETOTALMONEYCOM>0){
                            self.chargeTotalMoneyC(t20);
                            $("#chargeTotalMoneyT").html(t10);
                        }else if(result.json.CHARGETOTALMONEYCOM==0){
                            self.chargeTotalMoneyC(t30);
                            $("#chargeTotalMoneyT").html("");
                        }else{
                            self.chargeTotalMoneyC(t21);
                            $("#chargeTotalMoneyT").html(t11);
                        }
                        if(result.json.ABNORMALPASSCOM>0){
                            self.abnormalPassC(t20);
                            $("#abnormalPassT").html(t10);
                        }else if(result.json.ABNORMALPASSCOM==0){
                            self.abnormalPassC(t30);
                            $("#abnormalPassT").html("");
                        }else{
                            self.abnormalPassC(t21);
                            $("#abnormalPassT").html(t11);
                        }
                        self.abnormalPassCom(Math.abs(result.json.ABNORMALPASSCOM));
                        self.avgChargemoneyCom(Math.abs(result.json.AVGCHARGEMONEYCOM));
                        self.chargeTotalMoneyCom(Math.abs(result.json.CHARGETOTALMONEYCOM));
                        self.totalVehicleCom(Math.abs(result.json.TOTALVEHICLECOM));
                    }
                }
            }, ko.toJSON(queryParameters));
        }

        /**收费排名*/
        self.incomeMoneyDataDataQuery = function () {
            postJSON($, "report/parkingStatistics/queryIncomeMoneyData", function (result) {
                if (result.success) {
                    if(result.json!=null){
                        self.incomeMoneyData(result.json);
                    }
                }
            }, ko.toJSON(queryParameters));
        }

        /**流量排名*/
        self.vehicleFlowDataQuery = function () {
            postJSON($, "report/parkingStatistics/queryVehicleFlowData", function (result) {
                if (result.success) {
                    if(result.json!=null){
                        self.vehicleFlowData(result.json);
                    }
                }
            }, ko.toJSON(queryParameters));
        }

        /**警告*/
        self.alarmDataQuery = function () {
            postJSON($, "report/parkingStatistics/queryAlarmData", function (result) {
                if (result.success) {
                    if(result.json!=null){
                        if(result.json.length>0){
                            $('#tips').html("");
                            self.alarmData(result.json);
                        }else{
                            self.alarmData('');
                            $('#tips').html("恭喜，暂无警告");
                        }

                    }
                }
            }, ko.toJSON(queryParameters));
        }



        /**车辆类型统计*/
        self.plateTypeReportQuery = function () {
            postJSON($, "report/parkingStatistics/queryPlateTypeData", function (result) {
                if (result.success) {
                    if(result.json!=null){
                        plateType(result.json);
                    }
                }
            }, ko.toJSON(queryParameters));
        }

        /**车辆类型统计*/
        function plateType(result){
            $('#plateTypeReport').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: result.yTime
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: ''
                    },
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                        }
                    }
                },
                legend: {
                    x:0,
                    y:0,
                    floating: true,
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    borderColor: null,
                    borderWidth: 1,
                    shadow: false
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">时间:{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y} 辆</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true

                    //formatter: function() {
                    //    return '<b>'+ this.x +'</b><br/>'+
                    //        this.series.name +': '+ this.y +'<br/>'+
                    //        '总计: '+ this.point.stackTotal;
                    //}
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: false,
                            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                        }
                    }
                },
                series: [{
                    name: '固定车',
                    data: result.xFixedcar
                }, {
                    name: '临时车',
                    data: result.xTempcar

                }]
            });
        }

        /**收费金额*/
        self.incomeAmountQuery = function () {
            postJSON($, "report/parkingStatistics/queryIncomeAmountData", function (result) {
                if (result.success) {
                    if(result.json!=null){
                        incomeAmount(result.json);
                    }
                }
            }, ko.toJSON(queryParameters));
        }

        /**收费金额*/
        function incomeAmount(result){
            $('#incomeAmountReport').highcharts({
                title: {
                    text: '',
                    x: -20 //center
                },
                xAxis: {
                    categories: result.yTime
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '总收入（元）'
                    }
                },
                tooltip: {
                    valueSuffix: '元'
                },
                legend: {
                    x:-20,
                    y:0,
                    floating: true,
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    borderWidth: 0
                },
                series: [{
                    name: '收费金额',
                    data: result.xMoney
                }]
            });
        }

        /**今日收入构成*/
        self.chargeTypeQuery = function () {
            postJSON($, "report/parkingStatistics/queryChargeTypeData", function (result) {
                if (result.success) {
                    if(result.json!=null){
                        chargeType(result.json);
                    }
                }
            }, ko.toJSON(queryParameters));
        }

        /**
         * Grid theme for Highcharts JS
         * @author Torstein Honsi
         */

        Highcharts.theme = {
            colors: ['#2f77e0', '#df4242', '#f7a332', '#3dbc63', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
            chart: {

                borderWidth: 0,
                plotBackgroundColor: 'rgb(255, 255, 255)',
                plotShadow: true,
                plotBorderWidth: 1
            },
            title: {
                style: {
                    color: '#000',
                    font: 'bold 16px "微软雅黑", Verdana, sans-serif'
                }
            },
            subtitle: {
                style: {
                    color: '#666666',
                    font: 'bold 12px "微软雅黑", Verdana, sans-serif'
                }
            },
            xAxis: {
                gridLineWidth: 1,
                lineColor: '#000',
                tickColor: '#000',
                labels: {
                    style: {
                        color: '#000',
                        font: '11px "微软雅黑", Verdana, sans-serif'
                    }
                },
                title: {
                    style: {
                        color: '#333',
                        fontWeight: 'bold',
                        fontSize: '12px',
                        fontFamily: '微软雅黑, Verdana, sans-serif'

                    }
                }
            },
            yAxis: {
                minorTickInterval: 'auto',
                lineColor: '#000',
                lineWidth: 1,
                tickWidth: 1,
                tickColor: '#000',
                labels: {
                    style: {
                        color: '#000',
                        font: '11px "微软雅黑", Verdana, sans-serif'
                    }
                },
                title: {
                    style: {
                        color: '#333',
                        fontWeight: 'bold',
                        fontSize: '12px',
                        fontFamily: '"微软雅黑", Verdana, sans-serif'
                    }
                }
            },
            legend: {
                itemStyle: {
                    font: '9pt "微软雅黑", Verdana, sans-serif',
                    color: 'black'

                },
                itemHoverStyle: {
                    color: '#039'
                },
                itemHiddenStyle: {
                    color: 'gray'
                },
                borderColor: null
            },
            labels: {
                style: {
                    color: '#99b'
                }
            },

            navigation: {
                buttonOptions: {
                    theme: {
                        stroke: '#CCCCCC'
                    }
                }
            }
        };

        // Apply the theme
        var highchartsOptions = Highcharts.setOptions(Highcharts.theme);

        /**今日收入构成*/
        function chargeType(result){
            $('#container1').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: '总收入构成'
                },
                tooltip: {
                    formatter: function() {
                        return '<b>'+ this.point.name +'</b>: '+ Highcharts.numberFormat(this.percentage, 1) +'% '+'<br>总额:'+
                            Highcharts.numberFormat(this.y, 0, ',') +'元';
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    type: 'pie',
                    name: '比例',
                    innerSize:'50%',
                    data: result.data
                }]
            });
        }

        /**今日流量构成*/
        self.passTypeQuery = function () {
            postJSON($, "report/parkingStatistics/queryPassTypeData", function (result) {
                if (result.success) {
                    if(result.json!=null){
                        passType(result.json);
                    }
                }
            }, ko.toJSON(queryParameters));
        }
        /**今日流量构成*/
        function passType(result){
            $('#container2').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: '车流量构成'
                },
                tooltip: {
                    formatter: function() {
                        return '<b>'+ this.point.name +'</b>: '+ Highcharts.numberFormat(this.percentage, 1) +'% '+'<br>总计:'+
                            Highcharts.numberFormat(this.y, 0, ',') +'辆';
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    type: 'pie',
                    name: '比例',
                    innerSize:'50%',
                    data: result.data
                }]
            });
        }


        /**最近一周停车时长分布*/
        self.carFlowQuery = function () {
            postJSON($, "report/parkingStatistics/queryCarFlowData", function (result) {
                if (result.success) {
                    if(result.json!=null){
                        carFlow(result.json);
                    }
                }
            }, ko.toJSON(queryParameters));
        }
        /**最近一周停车时长分布*/
        function carFlow(result){
            $('#container3').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: '停车时长分布'
                },
                tooltip: {
                    formatter: function() {
                        return '<b>'+ this.point.name +'</b>: '+ Highcharts.numberFormat(this.percentage, 1) +'% '+'<br>总计:'+
                            Highcharts.numberFormat(this.y, 0, ',') +'辆';
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    type: 'pie',
                    innerSize:'50%',
                    name: '比例',
                    data: result.data
                }]
            });
        };

        /**收费金额段分布*/
        self.moneyFlowQuery = function () {
            postJSON($, "report/parkingStatistics/queryMoneyFlowData", function (result) {
                if (result.success) {
                    if(result.json!=null){
                        moneyFlow(result.json);
                    }
                }
            }, ko.toJSON(queryParameters));
        }
        /**收费金额段分布*/
        function moneyFlow(result){
            $('#container4').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: '收费金额段分布'
                },
                tooltip: {
                    formatter: function() {
                        return '<b>'+ this.point.name +'</b>: '+ Highcharts.numberFormat(this.percentage, 1) +'% '+'<br>总计:'+
                            Highcharts.numberFormat(this.y, 0, ',') +'辆';
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    type: 'pie',
                    innerSize:'50%',
                    name: '比例',
                    data: result.data
                }]
            });
        };
        var flag= false;
        var times=null;
        //初始化完毕后执行
        self.postConstructor = function () {
            mapDataModel = new MapDataModel(self);
            ko.applyBindings(mapDataModel, $("#mapSelect")[0]);
            times= setInterval("queryData(0)", 1000 * 60); // 1分钟刷一次
        }



        $("#parkMap").hide();
        $(".side-bar").click(function(){
            $("#parkMap").slideToggle("slow");
            (parent.frames['mapIframe']).checkNum();
            if(flag){
                flag= false;
                times= setInterval("queryData(0)", 1000 * 60); // 1分钟刷一次
            }else{
                flag= true;
                if(times!=null){
                    clearInterval(times);
                }

            }
        });



        function reloadContrainer() {
            //if(container1 != undefined)
            //    container1.reflow();
            //if(container2 != undefined)
            //    container2.reflow();
            //if(container3 != undefined)
            //    container3.reflow();
        }
        // 页面大小被改变
        $(window).resize(function(){
            reloadContrainer();
        });

    }
});