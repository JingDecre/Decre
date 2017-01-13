var GUID = (function() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return function() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };
})();

function createPagingControl(containerId, total, pageSize, currentPage, queryFun){
    var self = {};
    self.container = document.getElementById(containerId);
    self.total = total;
    self.pageSize = pageSize;
    self.queryFun = queryFun;

    self.navigate = function(currentPage, doQuery) {
        if(total == 0){
            $("#"+containerId).empty();
            return;
        }
        var start = (currentPage - 1) * pageSize ;
        var end = currentPage * pageSize;
        if(end > total)
            end = total;

        var pages = Math.ceil(total/pageSize);
        var startPage = currentPage - 5;
        if(startPage < 1)
            startPage = 1;
        var endPage = currentPage + 5;
        if(endPage > pages)
            endPage = pages;

        var buttonId = GUID();

        var innerHtml = '<div class="operateDrill">显示 ' + (start+1) + ' - ' + end + '条记录，共 ' + total + ' 条</div>';
        if(currentPage <= 6)
            innerHtml += '<span class="disabled"> << </span>';
        else
            innerHtml += '<a href="javascript:;" id="' + buttonId + '-first"> << </a>';

        if(currentPage == 1)
            innerHtml += '<span class="disabled"> < </span>';
        else
            innerHtml += '<a href="javascript:;" id="' + buttonId + '-prev"> < </a>';

        var i;
        for (i = startPage; i <= endPage; i++) {
            if(i == currentPage){
                innerHtml += '<span class="current">' + i + '</span>';
            }
            else{
                innerHtml += '<a href="javascript:;" id="' + buttonId + '-' + i + '" >' + i + '</a>';
            }
        }

        if(currentPage == endPage)
            innerHtml += '<span class="disabled"> > </span>';
        else
            innerHtml += '<a href="javascript:;" id="' + buttonId + '-next"> > </a>';

        if(pages - currentPage < 6)
            innerHtml += '<span class="disabled"> >> </span>';
        else
            innerHtml += '<a href="javascript:;" id="' + buttonId + '-last"> >> </a>';

        this.container.innerHTML = innerHtml;

        for (i = startPage; i <= endPage; i++) {
            if(i == currentPage)
                continue;

            $("#"+buttonId + '-' + i).on("click",function(){
                self.navigate(parseInt($(this).text()), true);
            });
        }

        if(currentPage > 6)
            document.getElementById(buttonId + '-first').onclick = function(){self.navigate(1,true);};
        if(pages - currentPage >= 6)
            document.getElementById(buttonId + '-last').onclick = function(){self.navigate(pages,true);};
        if(currentPage > 1)
            document.getElementById(buttonId + '-prev').onclick = function(){self.navigate(currentPage - 1,true);};
        if(currentPage < pages)
            document.getElementById(buttonId + '-next').onclick = function(){self.navigate(currentPage + 1,true);};

        if(typeof(doQuery) == 'undefined' || doQuery == true)
            self.queryFun(pageSize, currentPage);

        refreshGrid();
    };

    self.navigate(currentPage, false);

    return self;
}

function dropPagingControl(containerId, total, pageSize, queryFun) {
    document.getElementById(containerId).innerHTML = "";
}