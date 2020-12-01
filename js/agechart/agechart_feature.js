var retData;
function age_feature() {
    jQuery.ajax({ 
        type: "GET", 
        url: "https://phl.carto.com/api/v2/sql?q=SELECT * FROM covid_hospitalizations_by_age ORDER BY age", 
        dataType: "json", 
        success: function(data) {
            var rows = data.rows;
        
            var timelineChart = echarts.init(document.getElementById("echarts-agegraph"));
            var xAxisData = [];
            var data1 = [];
            var data2 = [];
            console.log(data["rows"]);
            data["rows"].forEach(element => {
                var age = element.age;
                switch (age) {
                    case "<20":
                        if (element.hospitalized.includes("Yes"))
                            data1[0] = element.count;
                        else 
                            data2[0] = element.count;
                        break;
                    case "20-34":
                        if (element.hospitalized.includes("Yes"))
                            data1[1] = element.count;
                        else 
                            data2[1] = element.count;
                        break;
                    case "35-54":
                        if (element.hospitalized.includes("Yes"))
                            data1[2] = element.count;
                        else 
                            data2[2] = element.count;
                        break;
                    case "55-74":
                        if (element.hospitalized.includes("Yes"))
                            data1[3] = element.count;
                        else 
                            data2[3] = element.count;
                        break;
                    case "75+":
                        if (element.hospitalized.includes("Yes"))
                            data1[4] = element.count;
                        else 
                            data2[4] = element.count;
                        break;
                    default:
                        break;
                }
            });
            console.log(data1);
            console.log(data2);

            option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {          
                        type: 'shadow'      
                    }
                },
                title: {
                    text: 'Covid Cases by Age'
                }, //bitter google
                legend: {
                    right: '10%',
                    data: ['Hospitalized', 'Not Hospitalized/Unknown']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                yAxis: {
                    type: 'value'
                },
                xAxis: {
                    type: 'category',
                    data: ['<20', '20-34', '35-54', '55-74', '75+']
                },
                series: [
                    {
                        name: 'Hospitalized',
                        type: 'bar',
                        stack: 'total',
                        label: {
                            show: false,
                            position: 'insideRight'
                        },
                        data: data1
                    },
                    {
                        name: 'Not Hospitalized/Unknown',
                        type: 'bar',
                        stack: 'total',
                        label: {
                            show: false,
                            position: 'insideRight'
                        },
                        data: data2
                    }
                ]
            };

            timelineChart.setOption(option);
        }
    });
}

function getData_Age(){
    return retData;
}