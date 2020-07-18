
export function makeGraph() {
    let objToPush;
    let keys = Object.keys(this.response)

    if (chart.data) {
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i]
            let coin = this.response[key].USD
            objToPush = { x: new Date(), y: coin }
            if (chart.data[i].dataPoints.length > 15) {
                chart.data[i].dataPoints.splice(0, 1)
            }
            chart.data[i].dataPoints.push(objToPush)
        }
    }
    chart.render();
}

let chart;

export function createCanvasElement(arr) {
    chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
            text: "Coins Value Comparison To USD"
        },
        axisX: {
            valueFormatString: "hh:mm:ss"
        },
        axisY: {
            title: "Worth in $",
            includeZero: false,
            suffix: " $"
        },
        legend: {
            cursor: "pointer",
            fontSize: 16,
            itemclick: toggleDataSeries
        },
        toolTip: {
            shared: true
        },
        data: [{
            name: arr[0],
            type: "spline",
            yValueFormatString: "#0.## $",
            showInLegend: true,
            dataPoints: []

        },

        {
            name: arr[1],
            type: "spline",
            yValueFormatString: "#0.## $",
            showInLegend: true,
            dataPoints: []
        },

        {
            name: arr[2],
            type: "spline",
            yValueFormatString: "#0.## $",
            showInLegend: true,
            dataPoints: []
        }, {
            name: arr[3],
            type: "spline",
            yValueFormatString: "#0.## $",
            showInLegend: true,
            dataPoints: []
        }, {
            name: arr[4],
            type: "spline",
            yValueFormatString: "#0.## $",
            showInLegend: true,
            dataPoints: []
        }]

    });
    function toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        chart.render();
    }
}

