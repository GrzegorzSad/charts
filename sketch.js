let data = [];
let data2 = [];
let data3 = [];
let data4 = [];

let rawData;
let rawData2;
let rawData3;
let rawData4;

let fontLight;
let fontRegular;
let fontBold;

let canvasW = 4500;
let canvasH = 2900;
let chartW = 800;
let chartH = 800;

let transX = ((canvasW - chartW) / 2);
let transY = ((canvasH - chartH) / 2 + chartH) - 35;

let colors = ["#a48abd", "#e8aa78", "#e2918f", "#629ddd", "#a4bf7f", "#a5d7d8", "#a48abd"];
let dark = "#222222"


function preload() {

    rawData = loadTable('data/AFROEURASIA.csv', 'csv', 'header');
    rawData2 = loadTable('data/countriesEU.csv', 'csv', 'header');
    rawData3 = loadTable('data/continentsPOP.csv', 'csv', 'header');
    rawData4 = loadTable('data/continentsPOP2021.csv', 'csv', 'header');


    fontLight = loadFont('fonts/Montserrat-Light.ttf');
    fontMedium = loadFont('fonts/Montserrat-Medium.ttf');
    fontBold = loadFont('fonts/Montserrat-Bold.ttf');
}

function setup() {
    createCanvas(canvasW, canvasH);

    data = rawData.rows.map(i => i.obj);

    data2 = rawData2.rows.map(i => i.obj);

    data3 = rawData3.rows.map(i => i.obj);

    data4 = rawData4.rows.map(i => i.obj);

    x = new BarChart({
        data: data3,
        xValue: "Year",
        yValue: "Africa",

        title: "African Population over Time",
        titleCol: dark,
        titleSize: 56,
        titleMargin: 35,

        transX: 150,
        transY: 2300,
        chartW: chartW,
        chartH: chartH,

        barW: 50,
        barCol: colors[0],
        barOutlineWidth: 1,
        barOutlineCol: dark,

        barValues: "top", //"top" or "middle" 
        barValuesMargin: 2,
        barValuesCol: dark,
        barValuesSize: 20,

        tickNumber: 12,
        tickLength: 10,
        rounding: true,
        decimal: false,

        axisCol: dark,
        axisWidth: 3,

        labelCol: dark,
        labelSize: 18,
        labelRotate: 90,
        labelMargin: 10,

        axisLabelX: "Year",
        axisLabelXMargin: 70,
        axisLabelY: "Population (Millions)",
        axisLabelYMargin: 90,
        axisLabelSize: 40,
        axisLabelCol: dark,

        labelFont: fontMedium,
        barValuesFont: fontMedium,
        axisLabelFont: fontRegular,
        titleFont: fontBold

    });

    y = new StackedBarChart({    
        data: data3,
        xValue: "Year",
        yValues: ["Asia", "Africa", "Europe"],

        title: "Afro-Eurasian Population over Time",
        titleCol: dark,
        titleSize: 56,
        titleMargin: 35,

        transX: 1300,
        transY: 2300,
        chartW: chartW,
        chartH: chartH,

        barW: 55,
        barColors: colors,
        barOutlineWidth: 1,
        barOutlineCol: dark,

        barValues: true,
        barValuesSum: true,
        barValuesMargin: 20,
        barValuesCol: dark,
        barValuesSize: 22,

        tickNumber: 12,
        tickLength: 10,
        rounding: true,
        decimal: 0,

        axisCol: dark,
        axisWidth: 3,

        labelCol: dark,
        labelSize: 18,
        labelRotate: 90,
        labelMargin: 10,

        legend: "middle",
        legendMargin: 40,
        legendColSize: 40,
        legendColMarginY: 25,
        legendColMarginX: 12,
        legendTextSize: 30,
        adjustYposition: 150,
        //legendTitles: ,

        //axisLabelX: "Year",
        axisLabelXMargin: 70,
        axisLabelY: "Population (Millions)",
        axisLabelYMargin: 70,
        axisLabelSize: 40,
        axisLabelCol: dark,

        labelFont: fontMedium,
        barValuesFont: fontMedium,
        titleFont: fontBold,
        axisLabelFont: fontRegular,
        legendFont: fontMedium,

    });

    p = new PieChart({
        data: data4,
        xValue: "Population",

        title: "World Population in Millions",
        titleCol: dark,
        titleSize: 56,
        titleMargin: 35,

        transX: 100,
        transY: 1000,
        chartW: chartW,
        chartH: chartH,

        pieScale:0.82,
        barColors: colors,
        barOutlineWidth: 1,
        barOutlineCol: dark,

        barValues: "middle",
        barValuesSum: true,
        barValuesMargin: 20,
        barValuesCol: dark,
        barValuesSize: 42,

        decimal: 0,


        labelCol: dark,
        labelSize: 18,
        labelRotate: 90,
        labelMargin: 10,

        legend: "middle",
        legendMargin: 40,
        legendColSize: 40,
        legendColMarginY: 25,
        legendColMarginX: 12,
        legendTextSize: 30,
        adjustYposition: 150,
        legendTitles: "Continent",

        labelFont: fontMedium,
        barValuesFont: fontMedium,
        titleFont: fontBold,
        axisLabelFont: fontRegular,
        legendFont: fontMedium,

    });

    z = new ScatterPlot({
        data: data2,
        xValue: "Area",
        yValue: "Population",
        dotLabelValue: "Country",

        title: "EU Countries Population to Area 2023",
        titleCol: dark,
        titleSize: 56,
        titleMargin: 25,

        transX: 3000,
        transY: 1000,
        chartW: chartW,
        chartH: chartH,

        dotW: 15,
        dotCol: colors[3],
        dotOutlineWidth: 1,
        dotOutlineCol: dark,

        dotValues: "top", //"top" or "middle" 
        dotValuesMargin: 5,
        dotValuesCol: dark,
        dotValuesSize: 20,
        dotValuesAlign: "right",  //left middle or right

        tickNumber: 12,
        tickNumberx: 16,
        tickLength: 10,
        rounding: true,
        decimal: false,

        axisCol: dark,
        axisWidth: 3,

        labelCol: dark,
        labelSize: 18,
        labelRotate: 0,
        labelMargin: 10,

        labelFont: fontMedium,
        dotValuesFont: fontMedium,
        titleFont: fontBold,
        axisLabelFont: fontRegular,

        axisLabelX: "Area (100k)",
        axisLabelXMargin: 60,
        axisLabelY: "Population (1M)",
        axisLabelYMargin: 60,
        axisLabelSize: 40,
        axisLabelCol: dark,

        highlightDist: 5,
        highlightDistCol: "#AA0000",
        avgLine: true,
        avgLineCol: "#AA0000",
        avgLineWidth: 2,


    });

    l = new LineChart({
        data: data3,
        xValue: "Year",
        yValues: ["Africa", "Asia", "Europe", "North America", "Oceania", "South America"],

        title: "Continents Population over Time",
        titleCol: dark,
        titleSize: 56,
        titleMargin: 35,

        transX: 1600,
        transY: 1000,
        chartW: chartW,
        chartH: chartH,

        barW: 50,
        barOutlineWidth: 7,     //lineWidth
        barOutlineCol: colors,    //linecolors

        barValues: false,
        barValuesMargin: 10,        //add this !!!!!
        barValuesCol: dark,
        barValuesSize: 22,

        tickNumber: 5,
        tickNumberx: 10,
        tickLength: 10,
        rounding: true,
        decimal: 0,

        axisCol: dark,
        axisWidth: 3,

        labelCol: dark,
        labelSize: 18,
        labelRotate: 0,
        labelMargin: 10,

        legend: "middle",
        legendMargin: 40,
        legendColSize: 40,
        legendColMarginY: 25,
        legendColMarginX: 12,
        legendTextSize: 30,
        adjustYposition: 150,
        //legendTitles: ["property crime", "violent crime"],

        //axisLabelX: "Age Group",
        axisLabelXMargin: 70,
        axisLabelY: "Population (Millions)",
        axisLabelYMargin: 70,
        axisLabelSize: 40,
        axisLabelCol: dark,

        labelFont: fontMedium,
        barValuesFont: fontRegular,
        titleFont: fontBold,
        axisLabelFont: fontRegular,
        legendFont: fontMedium,

    });


}

function draw() {
    background(247);

    x.render();
    y.render();
    z.render();
    l.render();
    p.render();

}