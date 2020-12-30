const Http = new XMLHttpRequest();
const url = 'http://127.0.0.1:3000/chart1/001/8';
Http.open("GET", url);
Http.send();

Http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        console.log('数据返回成功');

        console.log(Http.responseText)
    }
}
/*
var myChart1 = echarts.init(document.getElementById('chart1'));
var option1 = {
    backgroundColor: 'rgba(3, 0, 28, 0.75)',
    color: ['#0C75EB'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            axisTick: {
                alignWithLabel: true,
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#ffffff',//坐标轴颜色
                    fontSize: 10
                }

            },
            data: (function () {
                var arr = [];
                $.ajax({
                    type: "get",
                    async: false, //同步执行
                    url: "http://localhost:3000/chart1/001/8",
                    data: {},
                    dataType: "json", //返回数据形式为json
                    success: function (json) {
                        if (json) {
                            for (var i = 0; i < json.length; i++) {
                                console.log(json[i].context);
                                arr.push(json[i].time);
                            }
                        }

                    },
                    error: function (errorMsg) {
                        alert("不好意思,图表请求数据失败啦!");
                        myChart1.hideLoading();
                    }
                })
                return arr;
            })()
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '直接访问',
            type: 'bar',
            barWidth: '30%', //设置柱状图大小
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                        {
                            offset: 0,
                            color: "#03001C"
                        }, {
                            offset: 1,
                            color: "#0C75EB"
                        }
                    ]
                    )
                }
            },
            data: (function () {
                var arr = [];
                $.ajax({
                    type: "get",
                    async: false, //同步执行
                    url: "http://localhost:3000/chart1/001/8",
                    data: {},
                    dataType: "json", //返回数据形式为json
                    success: function (json) {
                        if (json) {
                            for (var i = 0; i < json.length; i++) {
                                console.log(json[i].context);
                                arr.push(json[i].production);
                            }
                        }
                    },
                    error: function (errorMsg) {
                        alert("不好意思,图表请求数据失败啦!");
                        myChart1.hideLoading();
                    }
                })
                return arr;
            })()
        }
    ]
};

myChart1.setOption(option1);
*/


/*
var myChart1 = echarts.init(document.getElementById('chart1'));
var app = {};
option1 = null;
var option1 = {
    backgroundColor: 'rgba(3, 0, 28, 0.75)',
    color: ['#0C75EB'],
    title: {
        text: '活性炭的生产指标',
        padding: 14,
        textStyle: {
            color: '#ffffff',
            fontSize: 13,
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            data: '{{time}}'.split(','),
            axisTick: {
                alignWithLabel: true,
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#ffffff',//坐标轴颜色
                    fontSize: 10
                }

            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            splitLine: { show: false },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#ffffff',//坐标轴颜色
                    fontSize: 8
                }

            }
        }
    ],
    series: [
        {
            name: '直接访问',
            type: 'bar',
            barWidth: '30%', //设置柱状图大小
            data: '{{production}}'.split(','),
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                        {
                            offset: 0,
                            color: "#03001C"
                        }, {
                            offset: 1,
                            color: "#0C75EB"
                        }
                    ]
                    )
                }
            }
        }
    ]
};

if (option1 && typeof option1 === "object") {

    myChart1.setOption(option1, true);

}

*/




















//chart1
var myChart1 = echarts.init(document.getElementById('chart1'));
var option1 = {
    backgroundColor: 'rgba(3, 0, 28, 0.75)',
    color: ['#0C75EB'],
    title: {
        text: '活性炭的生产指标',
        padding: 14,
        textStyle: {
            color: '#ffffff',
            fontSize: 13,
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
            axisTick: {
                alignWithLabel: true,
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#ffffff',//坐标轴颜色
                    fontSize: 10
                }

            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            splitLine: { show: false },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#ffffff',//坐标轴颜色
                    fontSize: 8
                }

            }
        }
    ],
    series: [
        {
            name: '直接访问',
            type: 'bar',
            barWidth: '30%', //设置柱状图大小
            data: [10, 52, 200, 334, 390, 330, 220, 120],
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                        {
                            offset: 0,
                            color: "#03001C"
                        }, {
                            offset: 1,
                            color: "#0C75EB"
                        }
                    ]
                    )
                }
            }
        }
    ]
};
myChart1.setOption(option1);




//chart2
var myChart2 = echarts.init(document.getElementById('chart2'));
var option2 = {
    backgroundColor: 'rgba(3, 0, 28, 0.75)',
    title: {
        text: '活性炭的各项经营指标',
        padding: 14,
        textStyle: {
            color: '#ffffff',
            fontSize: 13,
        }
    },
    legend: {
        data: ['2020年度预算', '2020上年度费用', '2020下年度费用'],
        textStyle: {
            fontSize: 9,
            color: '#ffffff'//图表颜色

        },
        icon: 'roundRect',
        itemWidth: 10,
        itemHeight: 10,
        orient: 'vertical',
        x: 'right',
        padding: 13,
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            data: ['材料费', '天然气', '水费', '电费'],
            axisTick: {
                alignWithLabel: true,
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#ffffff',//坐标轴颜色
                    fontSize: 10
                }

            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            splitLine: { show: false },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#ffffff',//坐标轴颜色
                    fontSize: 8
                }

            }
        }
    ],
    series: [
        {
            name: '2020年度预算',
            type: 'bar',
            barWidth: '15%', //设置柱状图大小
            data: [380, 400, 230, 210],
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                        {
                            offset: 0,
                            color: "#03001C"
                        }, {
                            offset: 1,
                            color: "#0C75EB"
                        }
                    ]
                    )
                }
            }
        },
        {
            name: '2020上年度费用',
            type: 'bar',
            barWidth: '15%', //设置柱状图大小
            data: [111, 180, 200, 170],
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                        {
                            offset: 0,
                            color: "#03001C"
                        }, {
                            offset: 1,
                            color: "#0CF5B3"
                        }
                    ]
                    )
                }
            }
        },
        {
            name: '2020下年度费用',
            type: 'bar',
            barWidth: '15%', //设置柱状图大小
            data: [400, 52, 120, 190],
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                        {
                            offset: 0,
                            color: "#03001C"
                        }, {
                            offset: 1,
                            color: "#00DFDF"
                        }
                    ]
                    )
                }
            }
        },

    ]
};
myChart2.setOption(option2);




//chart3
var myChart3 = echarts.init(document.getElementById('chart3'));
var option3 = {
    backgroundColor: 'rgba(3, 0, 28, 0.75)',
    color: ['#0CF5B3'],//图表颜色
    title: {
        text: '活性炭的生产运行负荷率',
        padding: 14,
        textStyle: {
            color: '#ffffff',
            fontSize: 13,
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#00DFDF'
            }
        }
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            splitLine: { show: false },
            boundaryGap: false,
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#ffffff',//坐标轴颜色
                    fontSize: 10
                }

            }

        }
    ],
    yAxis: [
        {
            type: 'value',
            splitLine: { show: false },
            name: '',
            axisLabel: {
                textStyle: {
                    color: '#ffffff',//坐标轴颜色
                    fontSize: 8
                }

            }
        }
    ],
    series: [
        {
            name: '耗煤',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [0, 100, 80, 300, 250, 280, 240, 200],
            smooth: true,
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                        {
                            offset: 0,
                            color: "#03001C"
                        }, {
                            offset: 1,
                            color: "#0CF5B3"
                        }
                    ]
                    )
                }
            }
        },


    ]
};
myChart3.setOption(option3);





//chart4
var myChart4 = echarts.init(document.getElementById('chart4'));
var option4 = {
    backgroundColor: 'rgba(3, 0, 28, 0.75)',
    /*color: ['#F7931E', '#0CF5B3', '#00DFDF'],*/
    title: {
        text: '活性炭的煤进耗存',
        padding: 14,
        textStyle: {
            color: '#ffffff',
            fontSize: 13,

        }
    },
    legend: {
        data: ['存煤', '耗煤', '进煤'],
        textStyle: {
            fontSize: 9,
            color: '#ffffff'//图表颜色

        },
        icon: 'roundRect',
        itemWidth: 10,
        itemHeight: 10,
        orient: 'vertical',
        x: 'right',
        padding: 13,
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#00DFDF'
            }
        }
    },

    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            splitLine: { show: false },
            boundaryGap: false,
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#ffffff',//坐标轴颜色
                    fontSize: 10
                }

            }

        }
    ],
    yAxis: [
        {
            type: 'value',
            splitLine: { show: false },
            name: '',
            axisLabel: {
                textStyle: {
                    color: '#ffffff',//坐标轴颜色
                    fontSize: 8
                }

            }
        }
    ],
    series: [
        {
            name: '存煤',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [150, 400, 100, 180, 278, 300, 50, 110],
            smooth: true,//曲线
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0,
                        [
                            {
                                offset: 0,
                                color: "#03001C"
                            },
                            {
                                offset: 1,
                                color: "#F7931E"
                            }
                        ]
                    )
                }
            }

        },
        {
            name: '耗煤',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [0, 100, 80, 300, 250, 280, 240, 200],
            smooth: true,
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0,
                        [
                            {
                                offset: 0,
                                color: "#03001C"
                            },
                            {
                                offset: 1,
                                color: "#0CF5B3"
                            }
                        ]
                    )
                }
            }

        },

        {
            name: '进煤',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [800, 80, 111, 64, 170, 45, 200, 30],
            smooth: true,
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0,
                        [
                            {
                                offset: 0,
                                color: "#03001C"
                            },
                            {
                                offset: 1,
                                color: "#00DFDF"
                            }
                        ]
                    )
                }
            }
        },

    ]
};
myChart4.setOption(option4);
// 使用刚指定的配置项和数据显示图表。




//chart5
var myChart5 = echarts.init(document.getElementById('chart5'));
var option5 = {
    backgroundColor: 'rgba(3, 0, 28, 0.75)',
    color: ['#00DFDF', '#0CF5B3'],//图表颜色
    title: {
        text: '环保数据',
        padding: 14,
        textStyle: {
            color: '#ffffff',
            fontSize: 13,
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data: ['目标值', '完成值'],
        orient: 'vertical',
        x: 'right',
        padding: 13,
        itemWidth: 10,
        itemHeight: 10,
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        splitLine: { show: false },
        axisLabel: {
            show: true,
            textStyle: {
                color: '#ffffff',//坐标轴颜色
                fontSize: 10
            }

        }
    },
    yAxis: {
        type: 'category',
        data: ['SO2', 'NOX', '粉尘', 'COD', '氨氮'],
        axisLabel: {
            show: true,
            textStyle: {
                color: '#ffffff',//坐标轴颜色
                fontSize: 8
            }

        }
    },
    series: [
        {
            name: '目标值',
            type: 'bar',
            stack: '总量',
            label: {
                show: false,
                position: 'insideRight'
            },
            data: [280, 50, 40, 60, 100],
            barWidth: '30%', //设置柱状图大小
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                        {
                            offset: 0,
                            color: "#03001C"
                        },
                        {
                            offset: 1,
                            color: "#0C75EB"
                        }
                    ]
                    )
                }
            }
        },
        {
            name: '完成值',
            type: 'bar',
            stack: '总量',
            label: {
                show: false,
                position: 'insideRight'
            },
            data: [120, 132, 101, 134, 90],
            barWidth: '30%', //设置柱状图大小
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                        {
                            offset: 0,
                            color: "#03001C"
                        },
                        {
                            offset: 1,
                            color: "#0CF5B3"
                        }
                    ]
                    )
                }
            }
        },
    ]
};
myChart5.setOption(option5);






















//时间-星期
var now = new Date();
var day = now.getDay();
var weeks = new Array("SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT");
var week = weeks[day];
document.getElementById("show_day").innerHTML = week;
//时间-日期
var date = new Date();
var y = date.getFullYear();
var m = date.getMonth() + 1;
var d = date.getDate();
document.getElementById("show_date").innerHTML = y + "-" + m + "-" + d;


//安全生产天数
var t = document.getElementById("bot1-text2");
var i = 852;
function f() {
    setTimeout(
        function () {
            t.value = i++;
            console.log(t.value);
            f();
        }
        //, 1000);
        , 24 * 60 * 60 * 1000);

}
f();
