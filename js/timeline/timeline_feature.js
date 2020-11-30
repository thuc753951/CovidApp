var retData;

(function() {
    console.log("ANOTHER TEST");
    jQuery.ajax({ 
        type: "GET", 
        url: "https://phl.carto.com/api/v2/sql?q=SELECT * FROM covid_hospitalizations_by_date ORDER BY date", 
        dataType: "json", 
        success: function(data) {
            retData = data;
        }  
    });
})();

function Covid_Timeline_inject(){//////////////////Look here to insert the pie chart
    var content = '<div id="echarts-timeline" style="width: 100%;height:400px;"></div>'; //fix width to be container
   
    return content;
};

function getData(){
    return retData;
}