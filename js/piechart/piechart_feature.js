var male = 1;
var female = 0; 
var maleNH=0;
var femaleNH=0;
(function () {
    console.log("TEST1");
    jQuery.ajax({ 
        type: "GET", 
        url: "https://phl.carto.com/api/v2/sql?q=SELECT * FROM covid_hospitalizations_by_sex", 
        dataType: "json", 
        success: function(data) {
            console.log(data);
            var rows = data.rows;
          
            rows.forEach(element => {
                switch (element["cartodb_id"]) {
                    case 1:
                        male += element.count;
                        break;
                    case 2:
                        female += element.count;
                        break;
                    case 3:
                        maleNH += element.count;
                        break;
                    case 4:
                        femaleNH += element.count;//NH=Non-Hospitalize
                        break;
    
                    default:
                        break;
                }
            });
        }
    
    });
})();

function Covid_Gender_inject(){//////////////////Look here to insert the pie chart
   
    
    var content = '<canvas id="chartjs-4" class="chartjs" width="250" height="125" style="display: block; width: 250px; height: 125px;"></canvas>';
   

    return content;
};

function getData_Pie(){
    return({
        male,
        female,
        maleNH,
        femaleNH,
    });
}