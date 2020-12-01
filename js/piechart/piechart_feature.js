function pie_feature() {
    var content;
    var male = 1;
    var female = 0; 
    var maleNH=0;
    var femaleNH=0;
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
            var ctx=document.getElementById("chartjs-4").getContext("2d")
            var myChart= new Chart(ctx,
            {"type":"doughnut",
            "data":{
              "labels":[
                "Male","Female", "Male not Hostpitalized", "Female not Hostpitalized"],
              "datasets":[{
                "label":"My First Dataset",
              "data":[male,female,maleNH,femaleNH],"backgroundColor":[
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 55, 100)",
              "rgb(54, 45, 235)"]}]}});
            console.log("male = " + male); 
            console.log("female = " + female); 
        }
    
    });
}