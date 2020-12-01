function time_feature() {
    console.log("ANOTHER TEST");
    jQuery.ajax({ 
        type: "GET", 
        url: "https://phl.carto.com/api/v2/sql?q=SELECT * FROM covid_hospitalizations_by_date ORDER BY date", 
        dataType: "json", 
        success: function(data) {
            var rows = data.rows;
            var timelineChart = echarts.init(document.getElementById("echarts-timeline"));
            var xAxisData = [];
            var data1 = [];
            var data2 = [];
            console.log(data["rows"]);
            data["rows"].forEach(element => {
                var date = element.date;
                if (!xAxisData.includes(date) && (date != null)) //if the next row is the same date as previous but just
                    xAxisData.push(date.substring(0,10));

                if (element.hospitalized === "Yes") 
                    data1.push(element.count);
                else   
                    data2.push(element.count)
            });
            console.log(data1);
            console.log(data2);
            var option = {
                title: {
                    text: 'Timeline Covid'
                },
                legend: {
                    data: ['Hospitlized', 'Not Hospitlized']
                },
                toolbox: {
                    // y: 'bottom',
                    feature: {
                        magicType: {
                            type: ['stack', 'tiled']
                        },
                        dataView: {},
                        saveAsImage: {
                            pixelRatio: 2
                        }
                    }
                },
                tooltip: {},
                xAxis: {
                    data: xAxisData,
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                },
                series: [{
                    name: 'Hospitlized',
                    type: 'bar',
                    data: data1,
                    animationDelay: function (idx) {
                        return idx * 10;
                    }
                }, {
                    name: 'Not Hospitlized',
                    type: 'bar',
                    data: data2,
                    animationDelay: function (idx) {
                        return idx * 10 + 100;
                    }
                }],
                animationEasing: 'elasticOut',
                animationDelayUpdate: function (idx) {
                    return idx * 5;
                }
            };

            timelineChart.setOption(option);
        }
    });
};
