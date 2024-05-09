class LineChart {
    constructor(obj) {
        this.data = obj.data;

        this.xValue = obj.xValue;
        this.yValues = obj.yValues;

        this.transX = obj.transX !== undefined ? obj.transX : 100;
        this.transY = obj.transY !== undefined ? obj.transY : 400;

        this.chartW = obj.chartW !== undefined ? obj.chartW : 300;
        this.chartH = obj.chartH !== undefined ? obj.chartH : 300;

        this.labelRotate = obj.labelRotate !== undefined ? obj.labelRotate : 90;
        this.labelMargin = obj.labelMargin !== undefined ? obj.labelMargin : 3;

        this.tickNumber = obj.tickNumber !== undefined ? obj.tickNumber : 5;
        this.tickNumberx = obj.tickNumberx !== undefined ? obj.tickNumberx : 5;
        this.tickLength = obj.tickLength !== undefined ? obj.tickLength : 10;

        this.axisCol = obj.axisCol !== undefined ? obj.axisCol : "#2e2e2e";
        this.axisWidth = obj.axisWidth !== undefined ? obj.axisWidth : 1;

        this.barOutlineWidth = obj.barOutlineWidth !== undefined ? obj.barOutlineWidth : 1;
        this.barOutlineCol = obj.barOutlineCol !== undefined ? obj.barOutlineCol : ["#a48abd", "#e8aa78", "#e2918f", "#629ddd", "#a4bf7f", "#a5d7d8", "#a48abd"];

        this.barValues = obj.barValues !== undefined ? obj.barValues : "true";
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

        this.xLabelType = obj.xLabelType !== undefined ? obj.xLableType : "category";

        this.axisLabelX = obj.axisLabelX !== undefined ? obj.axisLabelX : this.xValue;
        this.axisLabelXMargin = obj.axisLabelXMargin !== undefined ? obj.axisLabelXMargin : 100;
        this.axisLabelY = obj.axisLabelY !== undefined ? obj.axisLabelY : this.yValues;
        this.axisLabelYMargin = obj.axisLabelYMargin !== undefined ? obj.axisLabelYMargin : 50;
        this.axisLabelFont = obj.axisLabelFont !== undefined ? obj.axisLabelFont : "arial";
        this.axisLabelSize = obj.axisLabelSize !== undefined ? obj.axisLabelSize : 40;
        this.axisLabelCol = obj.axisLabelCol !== undefined ? obj.axisLabelCol : "#2e2e2e";

        this.legend = obj.legend !== undefined ? obj.legend : "top";
        this.adjustYposition = obj.adjustYposition !== undefined ? obj.adjustYposition : 15;
        this.legendMargin = obj.legendMargin !== undefined ? obj.legendMargin : 14;
        this.legendColSize = obj.legendColSize !== undefined ? obj.legendColSize : 20;
        this.legendColMarginY = obj.legendColMarginY !== undefined ? obj.legendColMarginY : 20;
        this.legendColMarginX = obj.legendColMarginX !== undefined ? obj.legendColMarginX : 20;
        this.legendTextSize = obj.legendTextSize !== undefined ? obj.legendTextSize : 10;
        this.legendFont = obj.legendFont !== undefined ? obj.legendFont : "arial";
        this.legendTitles = obj.legendTitles !== undefined ? obj.legendTitles : this.yValues;

        this.decimal = obj.decimal !== undefined ? obj.decimal : "off";

        this.max = 0; //for now 

        this.maxx = max(this.data.map(i => +i[this.xValue]));
        this.maxRoundedx = this.maxx; //for now

        this.rounding = obj.rounding !== undefined ? obj.rounding : true;
        this.maxRounded = 0; //for now

    }



    render() {

        //SOME SETTINGS
        noLoop();
        angleMode(DEGREES);




        //MAX VALUE FOR SCALE

        //looking for highest value in any array

        let maxArr = [];

        for (let i = 0; i < this.yValues.length; i++) {
            maxArr[i] = max(this.data.map(j => +j[this.yValues[i]]));
        }

        this.max = max(maxArr);
        this.maxRounded = this.max;


        //ROUNDING MAX
        //maxRounded for ticks and bar h
        //basically rounding up to nearest number divisable by tickNumber
        if (this.rounding == true) {
            for (let i = 0; i > -1; i++) {
                if (this.maxRounded % this.tickNumber == 0) {
                    break;
                } else {
                    this.maxRounded = round(this.maxRounded);
                    this.maxRounded += 1;
                }
            }
            for (let i = 0; i > -1; i++) {
                if (this.maxRoundedx % this.tickNumberx == 0) {
                    break;
                } else {
                    this.maxRoundedx = round(this.maxRoundedx);
                    this.maxRoundedx += 1;
                }
            }
        }
        else { }



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



        //axis
        push();
        stroke(this.axisCol);
        strokeWeight(this.axisWidth);

        line(0, 0, this.chartW, 0);
        line(0, 0, 0, -this.chartH);
        pop();



        //LINES

        //let gapW = (this.chartW - this.barW * nBars) / (nBars + 1);
        let adjustH = this.chartH / this.maxRounded;
        let adjustW = this.maxx / this.maxRoundedx;

        push();
        strokeWeight(this.barOutlineWidth);
        noFill();


        for (let i = 0; i < this.yValues.length; i++) {
            stroke(this.barOutlineCol[i]);

            beginShape();
            for (let j = 0; j < this.data.length; j++) {
                let x = this.chartW / (this.data.length - 1) * j * adjustW;
                let y = -(+this.data[j][this.yValues[i]]) * adjustH;
                vertex(x, y);
            }
            endShape();

        }


        //LINE VALUES LABELS in different loop so theyre always in front of lines

        for (let i = 0; i < this.yValues.length; i++) {

            for (let j = 0; j < this.data.length; j++) {
                let x = this.chartW / (this.data.length - 1) * j * adjustW;
                let y = -(+this.data[j][this.yValues[i]]) * adjustH;
                push();
                textFont(this.barValuesFont);
                textSize(this.barValuesSize);
                fill(this.barValuesCol);
                noStroke();

                if (this.barValuesAlign == "left") {
                    textAlign(RIGHT, BOTTOM);
                } else if (this.barValuesAlign == "middle") {
                    textAlign(CENTER, BOTTOM);
                } else if (this.barValuesAlign == "right") {
                    textAlign(LEFT, BOTTOM);
                }
                let label = +this.data[j][this.yValues[i]];
                if (this.decimal !== false) {
                    label = label.toFixed(this.decimal)
                }
                if (this.barValues == true) {
                    text(label, x, y - this.barValuesMargin);
                }
                pop();
            }



        }
        pop();



        //text customisation used in labels on both axis
        push();
        textFont(this.labelFont);
        textSize(this.labelSize);
        fill(this.labelCol);



        if (this.xLabelType == "category") {

            //x labels
            push();

            let jump = this.chartW/(this.data.length-1);

            //translate(jump / 2, this.labelMargin);

            for (let i = 0; i < this.data.length; i++) {

                let label = this.data[i][this.xValue];

                push();
                rotate(this.labelRotate);

                if (this.labelRotate > 0) {
                    textAlign(LEFT, CENTER);
                }
                else {
                    textAlign(CENTER, TOP);
                }

                push();
                stroke(this.axisCol);
                strokeWeight(this.axisWidth);
                line(0, 0, 0, this.tickLength,);
                pop();

                text(label, 0, this.tickLength + this.labelMargin);
                pop();

                translate(jump, 0);
            }
            pop();
        }
        else if ((this.xLabelType == "number")) {


            //ticks and xLabels

            push();


            for (let i = 0; i <= this.tickNumberx; i++) {

                let label = this.maxRoundedx / this.tickNumberx * i;

                if (this.decimal !== false) {
                    label = label.toFixed(this.decimal);
                } else { }

                push();
                stroke(this.axisCol);
                strokeWeight(this.axisWidth);
                line(0, 0, 0, this.tickLength,);
                pop();

                push();
                rotate(this.labelRotate);
                if (this.labelRotate > 0) {
                    textAlign(LEFT, CENTER);
                    text(label, this.tickLength + this.labelMargin, 0);
                }
                else {
                    textAlign(CENTER, TOP);
                    text(label, 0, this.tickLength + this.labelMargin);
                }
                pop();

                translate(this.chartW / this.tickNumberx, 0);

            }
            pop();

        }

        //ticks and y labels
        push();

        for (let i = 0; i <= this.tickNumber; i++) {

            let label = this.maxRounded / this.tickNumber * i;

            if (this.decimal !== false) {
                label = label.toFixed(this.decimal);
            } else { }

            push();
            stroke(this.axisCol);
            strokeWeight(this.axisWidth);
            line(0, 0, -this.tickLength, 0);
            pop();

            textAlign(RIGHT, CENTER);
            text(label, -this.tickLength - this.labelMargin, 0);

            translate(0, -this.chartH / this.tickNumber);
        }
        pop();


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

        for (let i = 0; i < this.yValues.length; i++) {
            push(); //colorsquares
            stroke(this.barOutlineCol[i]);
            strokeWeight(this.barOutlineWidth);
            line(0, this.legendColSize, this.legendColSize, 0);
            pop();

            push(); //labels
            translate(0, this.legendColSize / 2);
            textFont(this.legendFont);
            textSize(this.legendTextSize);
            textAlign(LEFT, CENTER);
            text(this.legendTitles[i], this.legendColSize + this.legendColMarginX, 0)
            pop();

            translate(0, this.legendColSize + this.legendColMarginY);

        }

        pop();
        pop(); //end of text customisation

        //axis x name label
        push();
        textFont(this.axisLabelFont);
        textSize(this.axisLabelSize);
        fill(this.axisLabelCol);
        textAlign(CENTER, TOP);
        text(this.axisLabelX, 0, this.axisLabelXMargin, this.chartW);

        //axis y name label
        textAlign(CENTER, BOTTOM);
        translate(-this.axisLabelYMargin, -this.chartH / 2);
        rotate(-90);
        text(this.axisLabelY, 0, 0);

        pop();
        pop();
    }
}

