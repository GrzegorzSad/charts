class PieChart {
    constructor(obj) {
        this.data = obj.data;

        this.xValue = obj.xValue;

        this.transX = obj.transX !== undefined ? obj.transX : 100;
        this.transY = obj.transY !== undefined ? obj.transY : 400;

        this.chartW = obj.chartW !== undefined ? obj.chartW : 300;
        this.chartH = obj.chartH !== undefined ? obj.chartH : 300;

        this.barColors = obj.barColors !== undefined ? obj.barColors : ["#a48abd", "#e8aa78", "#e2918f", "#629ddd", "#a4bf7f", "#a5d7d8", "#a48abd"];
        this.barOutlineWidth = obj.barOutlineWidth !== undefined ? obj.barOutlineWidth : 1;
        this.barOutlineCol = obj.barOutlineCol !== undefined ? obj.barOutlineCol : "#2e2e2e";

        this.barValues = obj.barValues !== undefined ? obj.barValues : "top";
        this.barValuesSum = obj.barValuesSum !== undefined ? obj.barValuesSum : "true";
        this.barValuesMargin = obj.barValuesMargin !== undefined ? obj.barValuesMargin : 12;
        this.barValuesCol = obj.barValuesCol !== undefined ? obj.barValuesCol : "#2e2e2e";
        this.barValuesSize = obj.barValuesSize !== undefined ? obj.barValuesSize : this.labelSize;
        this.barValuesFont = obj.barValuesFont !== undefined ? obj.barValuesFont : "arial";

        this.labelCol = obj.labelCol !== undefined ? obj.labelCol : "#2e2e2e";
        this.labelSize = obj.labelSize !== undefined ? obj.labelSize : 9;
        this.labelFont = obj.labelFont !== undefined ? obj.labelFont : "arial";

        this.title = obj.title !== undefined ? obj.title : "Title";
        this.titleFont = obj.titleFont !== undefined ? obj.titleFont : "arial";
        this.titleSize = obj.titleSize !== undefined ? obj.titleSize : 42;
        this.titleCol = obj.titleCol !== undefined ? obj.titleCol : "#2e2e2e";
        this.titleMargin = obj.titleMargin !== undefined ? obj.titleMargin : 10;

        this.legend = obj.legend !== undefined ? obj.legend : "top";
        this.adjustYposition = obj.adjustYposition !== undefined ? obj.adjustYposition : 15;
        this.legendMargin = obj.legendMargin !== undefined ? obj.legendMargin : 14;
        this.legendColSize = obj.legendColSize !== undefined ? obj.legendColSize : 20;
        this.legendColMarginY = obj.legendColMarginY !== undefined ? obj.legendColMarginY : 20;
        this.legendColMarginX = obj.legendColMarginX !== undefined ? obj.legendColMarginX : 20;
        this.legendTextSize = obj.legendTextSize !== undefined ? obj.legendTextSize : 10;
        this.legendFont = obj.legendFont !== undefined ? obj.legendFont : "arial";
        this.legendTitles = obj.legendTitles !== undefined ? obj.legendTitles : this.xValue;

        this.decimal = obj.decimal !== undefined ? obj.decimal : false;

        this.pieScale = obj.pieScale !== undefined ? obj.pieScale : 1;


    }



    render() {

        //SOME SETTINGS
        noLoop();
        angleMode(DEGREES);



        //DRAWING
        push();

        //0,0 of the axis
        translate(this.transX, this.transY);

        //title
        push();
        textFont(this.titleFont);
        textSize(this.titleSize);
        fill(this.titleCol);
        textAlign(CENTER, BOTTOM);
        text(this.title, 0, -this.chartH - this.titleMargin, this.chartW);
        noStroke();
        pop();

        const centerX = this.chartW / 2;
        const centerY = -this.chartH / 2;

        // Radius of the pie chart
        const radius = Math.min(this.chartW, this.chartH) / 2 * this.pieScale;

        let angles = []

        this.data.forEach(i => angles.push(i[this.xValue]));

        let sum = 0;

        angles.forEach(i => sum += +i);

        let adjust = 360 / sum;

        for (let i = 0; i < angles.length; i++) {
            angles[i] = angles[i] * adjust;
        }

        let startAngle = 0;
        for (let i = 0; i < angles.length; i++) {

            let colorIndex = i % this.barColors.length;

            fill(this.barColors[colorIndex]);

            let endAngle = startAngle + angles[i];

            arc(centerX, centerY, radius * 2, radius * 2, startAngle, endAngle, PIE);
            startAngle = endAngle;

            
        }

        startAngle = 0;
        for (let i = 0; i < angles.length; i++) {

            let endAngle = startAngle + angles[i];
            let sliceMidAngle = startAngle + angles[i] / 2;

            // Calculate the position for the text
            let labelRadius = radius * 0.8; // Adjust this value for position of labels
            let labelX = centerX + labelRadius * cos(sliceMidAngle);
            let labelY = centerY + labelRadius * sin(sliceMidAngle);

            startAngle = endAngle;

            push();
            textFont(this.barValuesFont);
            textSize(this.barValuesSize);
            fill(this.barValuesCol);
            noStroke();

            let label=+this.data[i][this.xValue];
            
            if (this.decimal !== false) {
                label = label.toFixed(this.decimal);
            } else {}

            textAlign(CENTER, CENTER);
            if (this.barValues == "middle") {
                text(label, labelX, labelY); // Text on the slice
            } else if (this.barValues == "top") {
                text(label, labelX + cos(sliceMidAngle) * 20, labelY + sin(sliceMidAngle) * 20); // Text outside the slice
            }
            pop();

            
        }
        



        //text customisation used in labels on both axis
        push();
        textFont(this.labelFont);
        textSize(this.labelSize);
        fill(this.labelCol);

        //legend
        push();

        let yPosition;

        if (this.legend == "top") {
            yPosition = this.chartH;
        } else if (this.legend == "middle") {
            yPosition = this.chartH / 2;
        } else if (this.legend == "bottom") {
            yPosition = 0;
        }

        translate(this.chartW + this.legendMargin, -yPosition - this.adjustYposition);


        for (let i = 0; i < this.data.length; i++) {
            push(); //colorsquares
            stroke(this.barOutlineCol);
            strokeWeight(this.barOutlineWidth);
            fill(this.barColors[i]);
            rect(0, 0, this.legendColSize, this.legendColSize);
            pop();

            push(); //labels
            translate(0, this.legendColSize / 2);
            textFont(this.legendFont);
            textSize(this.legendTextSize);
            textAlign(LEFT, CENTER);
            text(this.data[i][this.legendTitles], this.legendColSize + this.legendColMarginX, 0)
            pop();

            translate(0, this.legendColSize + this.legendColMarginY);

        }

        pop();
        pop(); //end of text customisation

        pop();
    }
}

