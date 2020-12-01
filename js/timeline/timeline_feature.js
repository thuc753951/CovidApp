function time_feature() {
    console.log("ANOTHER TEST");
    jQuery.ajax({ 
        type: "GET", 
        url: "https://phl.carto.com/api/v2/sql?q=SELECT * FROM covid_hospitalizations_by_date ORDER BY date", 
        dataType: "json", 
        success: function(data) {
            var timelineChart = echarts.init(document.getElementById("echarts-timeline"));
            var xAxisData = [];
            var data1 = [];
            var data2 = [];
            var i = 0;
            data["rows"].forEach(element => {
                var date = element.date;
                if (!xAxisData.includes(date) && (date != null)) {
                    xAxisData[i] = date.substring(0,10);
                } else { //we found a duplicate date, mostlikely need to add again
                    i--;
                }
                
                if (element.hospitalized.includes("Yes")) {
                    if (data1[i] != null)
                        data1[i] += element.count;
                    else
                        data1[i] = element.count
                }
                else {
                    if (data2[i] != null)
                        data2[i] += element.count;
                    else
                        data2[i] = element.count
                }

                i++;
            });
            var option = {
                title: {
                    text: 'Covid Cases Timeline'
                },
                toolbox: {
                    // y: 'bottom',
                    feature: {
                        dataView: {}
                    }
                },
                legend: {
                    right: '10%',
                    data: ['Hospitalized', 'Not Hospitalized']
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
                dataZoom: [
                    {
                        show: true,
                        start: 0,
                        end: 100
                    },
                    {
                        type: 'inside',
                        start: 94,
                        end: 100
                    },
                    {
                        show: true,
                        yAxisIndex: 0,
                        filterMode: 'empty',
                        width: 30,
                        height: '80%',
                        showDataShadow: false,
                        left: '93%'
                    }
                ],
                series: [{
                    name: 'Hospitalized',
                    type: 'bar',
                    data: data1,
                    animationDelay: function (idx) {
                        return idx * 10;
                    }
                }, 
                {
                    name: 'Not Hospitalized',
                    type: 'bar',
                    data: data2,
                    animationDelay: function (idx) {
                        return idx * 10;
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
