function race_feature() {
    jQuery.ajax({ 
        type: "GET", 
        url: "https://phl.carto.com/api/v2/sql?q=SELECT * FROM covid_hospitalizations_by_race ORDER BY racial_identity", 
        dataType: "json", 
        success: function(data) {
            var rows = data.rows;
        
            var timelineChart = echarts.init(document.getElementById("echarts-racegraph"));
            var xAxisData = [];
            var data1 = [];
            var data2 = [];
            console.log(data["rows"]);
            data["rows"].forEach(element => {
                var racial_identity = element.racial_identity;
                switch (racial_identity) {
                    case "AFRICAN AMERICAN":
                        if (element.hospitalized.includes("Yes"))
                            data1[0] = element.count;
                        else 
                            data2[0] = element.count;
                        break;
                    case "White":
                        if (element.hospitalized.includes("Yes"))
                            data1[1] = element.count;
                        else 
                            data2[1] = element.count;
                        break;
                    case "UNKNOWN":
                        if (element.hospitalized.includes("Yes")) {
                            if (data1[2] != null)
                                data1[2] += element.count;
                            else
                                data1[2] = element.count
                        }
                        else {
                            if (data2[2] != null)
                                data2[2] += element.count;
                            else
                                data2[2] = element.count
                        }
                        break;
                    case null:
                        if (element.hospitalized.includes("Yes")) {
                            if (data1[2] != null)
                                data1[2] += element.count;
                            else
                                data1[2] = element.count
                        }
                        else {
                            if (data2[2] != null)
                                data2[2] += element.count;
                            else
                                data2[2] = element.count
                        }
                        break;
                    case "DECLINE":
                        if (element.hospitalized.includes("Yes")) {
                            if (data1[2] != null)
                                data1[2] += element.count;
                            else
                                data1[2] = element.count
                        }
                        else {
                            if (data2[2] != null)
                                data2[2] += element.count;
                            else
                                data2[2] = element.count
                        }
                        break;
                    case "HISPANIC":
                        if (element.hospitalized.includes("Yes"))
                            data1[3] = element.count;
                        else 
                            data2[3] = element.count;
                        break;
                    case "OTHER":
                        if (element.hospitalized.includes("Yes"))
                            data1[4] = element.count;
                        else 
                            data2[4] = element.count;
                        break;
                    case "Asian":
                        if (element.hospitalized.includes("Yes"))
                            data1[5] = element.count;
                        else 
                            data2[5] = element.count;
                        break;
                    case "Native American":
                        if (element.hospitalized.includes("Yes"))
                            data1[6] = element.count;
                        else 
                            data2[6] = element.count;
                        break;
                    case "Pacific Islander":
                        if (element.hospitalized.includes("Yes"))
                            data1[7] = element.count;
                        else 
                            data2[7] = element.count;
                        break;
                    case "AMERICAN INDIAN":
                        if (element.hospitalized.includes("Yes"))
                            data1[8] = element.count;
                        else 
                            data2[8] = element.count;
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
                    text: 'Covid Cases by Race',
                    textStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    }
                    
                },
                backgroundColor: '#2c343c',
                textStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                },
                legend: {
                    right: '10%',
                    textStyle: {
                        color: '0'
                    },
                    data: ['Hospitalized', 'Not Hospitalized/Unknown']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value'
                },
                yAxis: {
                    type: 'category',
                    data: ['AFRICAN AMERICAN', 'White','UNKNOWN', 'HISPANIC', 'OTHER','Asian','Native American','Pacific Islander','AMERICAN INDIAN']
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
                        itemStyle: {
                            color: '#a0cbc7'
                        },
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
};