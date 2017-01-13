//---------------------------------------------------
//
//---------------------------------------------------
Date.prototype.isLeapYear = function()
{
    return (0==this.getYear()%4&&((this.getYear()%100!=0)||(this.getYear()%400==0)));
}
//---------------------------------------------------
//
//  YYYY/yyyy/YY/yy
// MM/M
// W/w
// dd/DD/d/D
// hh/HH/h/H
// mm/m
// ss/SS/s/S
//---------------------------------------------------
Date.prototype.format = function(formatStr)
{
    var str = formatStr;
    var Week = ['','','','','','',''];

    str=str.replace(/yyyy|YYYY/,this.getFullYear());
    str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));

    str=str.replace(/MM/,this.getMonth()>8?(this.getMonth() + 1).toString():'0' + (this.getMonth()+1));
    str=str.replace(/M/g,this.getMonth() + 1);

    str=str.replace(/w|W/g,Week[this.getDay()]);

    str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());
    str=str.replace(/d|D/g,this.getDate());

    str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());
    str=str.replace(/h|H/g,this.getHours());
    str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());
    str=str.replace(/m/g,this.getMinutes());

    str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());
    str=str.replace(/s|S/g,this.getSeconds());

    return str;
};

//+---------------------------------------------------
//|   YYYY-MM-dd
//+---------------------------------------------------
function daysBetween(DateOne,DateTwo)
{
    var OneMonth = DateOne.substring(5,DateOne.lastIndexOf ('-'));
    var OneDay = DateOne.substring(DateOne.length,DateOne.lastIndexOf ('-')+1);
    var OneYear = DateOne.substring(0,DateOne.indexOf ('-'));

    var TwoMonth = DateTwo.substring(5,DateTwo.lastIndexOf ('-'));
    var TwoDay = DateTwo.substring(DateTwo.length,DateTwo.lastIndexOf ('-')+1);
    var TwoYear = DateTwo.substring(0,DateTwo.indexOf ('-'));

    var cha=((Date.parse(OneMonth+'/'+OneDay+'/'+OneYear)- Date.parse(TwoMonth+'/'+TwoDay+'/'+TwoYear))/86400000);
    return Math.abs(cha);
}


//+---------------------------------------------------
//|
//+---------------------------------------------------
Date.prototype.add = function(strInterval, Number) {
    var dtTmp = this;
    switch (strInterval) {
        case 's' :return new Date(Date.parse(dtTmp) + (1000 * Number));
        case 'n' :return new Date(Date.parse(dtTmp) + (60000 * Number));
        case 'h' :return new Date(Date.parse(dtTmp) + (3600000 * Number));
        case 'd' :return new Date(Date.parse(dtTmp) + (86400000 * Number));
        case 'w' :return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));
        case 'q' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number*3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'm' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'y' :return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
    }
};

//+---------------------------------------------------
//|  dtEnd
//+---------------------------------------------------
Date.prototype.diff = function(strInterval, dtEnd) {
    var dtStart = this;
    if (typeof dtEnd == 'string' )//
    {
        dtEnd = StringToDate(dtEnd);
    }
    switch (strInterval) {
        case 's' :return parseInt((dtEnd - dtStart) / 1000);
        case 'n' :return parseInt((dtEnd - dtStart) / 60000);
        case 'h' :return parseInt((dtEnd - dtStart) / 3600000);
        case 'd' :return parseInt((dtEnd - dtStart) / 86400000);
        case 'w' :return parseInt((dtEnd - dtStart) / (86400000 * 7));
        case 'm' :return (dtEnd.getMonth()+1)+((dtEnd.getFullYear()-dtStart.getFullYear())*12) - (dtStart.getMonth()+1);
        case 'y' :return dtEnd.getFullYear() - dtStart.getFullYear();
    }
};

////+---------------------------------------------------
////| ?toString
////+---------------------------------------------------
//Date.prototype.toString = function(showWeek)
//{
//    var myDate= this;
//    var str = myDate.toLocaleDateString();
//    if (showWeek)
//    {
//        var Week = ['','','','','','',''];
//        str += ' ' + Week[myDate.getDay()];
//    }
//    return str;
//};

//+---------------------------------------------------
//|
//+---------------------------------------------------
Date.prototype.toArray = function()
{
    var myDate = this;
    var myArray = Array();
    myArray[0] = myDate.getFullYear();
    myArray[1] = myDate.getMonth();
    myArray[2] = myDate.getDate();
    myArray[3] = myDate.getHours();
    myArray[4] = myDate.getMinutes();
    myArray[5] = myDate.getSeconds();
    return myArray;
};

//+---------------------------------------------------
//|
//|  interval
//| y  m d w ww h n s
//+---------------------------------------------------
Date.prototype.part = function(interval)
{
    var myDate = this;
    var partStr='';
    var Week = ['','','','','','',''];
    switch (interval)
    {
        case 'y' :partStr = myDate.getFullYear();break;
        case 'm' :partStr = myDate.getMonth()+1;break;
        case 'd' :partStr = myDate.getDate();break;
        case 'w' :partStr = Week[myDate.getDay()];break;
        case 'ww' :partStr = myDate.WeekNumOfYear();break;
        case 'h' :partStr = myDate.getHours();break;
        case 'n' :partStr = myDate.getMinutes();break;
        case 's' :partStr = myDate.getSeconds();break;
    }
    return partStr;
};

//+---------------------------------------------------
//|
//+---------------------------------------------------
Date.prototype.maxDayOfDate = function()
{
    var myDate = this;
    var ary = myDate.toArray();
    var date1 = (new Date(ary[0],ary[1]+1,1));
    var date2 = date1.add('m',1);
    var result = dateDiff(date1.format('yyyy-MM-dd'),date2.format('yyyy-MM-dd'));
    return result;
};

//+---------------------------------------------------
//|
//+---------------------------------------------------
Date.prototype.weekNumOfYear = function()
{
    var myDate = this;
    var ary = myDate.toArray();
    var year = ary[0];
    var month = ary[1]+1;
    var day = ary[2];
    document.write('< script language=VBScript/> /n');
    document.write('myDate = DateValue(""+month+"-"+day+"-"+year+"") /n');
    document.write('result = DatePart("ww", myDate) /n');
    document.write(' /n');
    return result;
};

//+---------------------------------------------------
//|
//|  MM/dd/YYYY MM-dd-YYYY YYYY/MM/dd YYYY-MM-dd
//+---------------------------------------------------
function StringToDate(DateStr)
{

    var converted = Date.parse(DateStr);
    var myDate = new Date(converted);
    if (isNaN(myDate))
    {
        //var delimCahar = DateStr.indexOf('/')!=-1?'/':'-';
        var arys= DateStr.split('-');
        myDate = new Date(arys[0],--arys[1],arys[2]);
    }
    return myDate;
}


function getDays(years, months) {
    var is_run = ((years % 4 == 0 && years % 100 != 0) || years % 400 == 0) ? true : false;
    if (months == 2) {
        return is_run ? 29 : 28;
    }
    if (months == 4 || months == 6 || months == 9 || months == 11) {
        return 30;
    }
    return 31;
}

//Date.prototype.pad
function pad(num, n) {
    var len = num.toString().length;
    while(len < n) {
        num = '0' + num;
        len++;
    }
    return num;
};