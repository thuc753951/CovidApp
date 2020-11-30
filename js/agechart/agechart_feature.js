var retData;
(function() {
    jQuery.ajax({ 
        type: "GET", 
        url: "https://phl.carto.com/api/v2/sql?q=SELECT * FROM covid_hospitalizations_by_age ORDER BY age", 
        dataType: "json", 
        success: function(data) {
            retData = data;
        }
    });
})();

function getData_Age(){
    return retData;
}