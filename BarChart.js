class BarChart {
    constructor(obj) {
        this.data = obj.data;

        this.xValue = obj.xValue;
        this.yValue = obj.yValue;

        this.transX = obj.transX !== undefined ? obj.transX : 100;
        this.transY = obj.transY !== undefined ? obj.transY : 400;

        this.chartW = obj.chartW !== undefined ? obj.chartW : 300;
        this.chartH = obj.chartH !== undefined ? obj.chartH : 300;

        this.barW = obj.barW !== undefined ? obj.barW : 10;

        this.labelRotate = obj.labelRotate !== undefined ? obj.labelRotate : 90;
        this.labelMargin = obj.labelMargin !== undefined ? obj.labelMargin : 3;

        this.tickNumber = obj.tickNumber !== undefined ? obj.tickNumber : 5;
        this.tickLength = obj.tickLength !== undefined ? obj.tickLength : 10;

        this.axisCol = obj.axisCol !== undefined ? obj.axisCol : "#2e2e2e";
        this.axisWidth = obj.axisWidth !== undefined ? obj.axisWidth : 1;

        this.barCol = obj.barCol !== undefined ? obj.barCol : "#e0dcdc";
        this.barOutlineWidth = obj.barOutlineWidth !== undefined ? obj.barOutlineWidth : 1;
        this.barOutlineCol = obj.barOutlineCol !== undefined ? obj.barOutlineCol : "#2e2e2e";

        this.barValues = obj.barValues !== undefined ? obj.barValues : "top";
        this.barValuesMargin = obj.barValuesMargin !== undefined ? obj.barValuesMargin : this.labelMargin;
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

        this.axisLabelX = obj.axisLabelX !== undefined ? obj.axisLabelX : this.xValue;
        this.axisLabelXMargin = obj.axisLabelXMargin !== undefined ? obj.axisLabelXMargin : 100;
        this.axisLabelY = obj.axisLabelY !== undefined ? obj.axisLabelY : this.yValue;
        this.axisLabelYMargin = obj.axisLabelYMargin !== undefined ? obj.axisLabelYMargin : 50;
        this.axisLabelFont = obj.axisLabelFont !== undefined ? obj.axisLabelFont : "arial";
        this.axisLabelSize = obj.axisLabelSize !== undefined ? obj.axisLabelSize : 40;
        this.axisLabelCol = obj.axisLabelCol !== undefined ? obj.axisLabelCol : "#2e2e2e";

        this.decimal = obj.decimal !== undefined ? obj.decimal : 0;
        this.max = max(this.data.map(i => +i[this.yValue]));
        this.rounding = obj.rounding !== undefined ? obj.rounding : true;
        this.maxRounded = this.max; //for now

    }

    render() {
        push();

        //SOME SETTINGS
        noLoop();
        angleMode(DEGREES);


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
        }
        else { }



        //DRAWING
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



        //bars
        let nBars = this.data.length;
        let gapW = (this.chartW - this.barW * nBars) / (nBars + 1);
        let adjustH = this.chartH / this.maxRounded;

        push();
        stroke(this.barOutlineCol);
        strokeWeight(this.barOutlineWidth);
        fill(this.barCol);

        translate(gapW, 0);
        for (let i = 0; i < nBars; i++) {

            let jump = this.barW * i + gapW * i;
            let barH = +this.data[i][this.yValue];

            rect(jump, 0, this.barW, -barH * adjustH);

            //show values on bars
            push();
            textFont(this.barValuesFont);
            textSize(this.barValuesSize);
            fill(this.barValuesCol);
            noStroke();

            let label;

            if (this.decimal !== false) {
                label = barH.toFixed(this.decimal);
            } else {
                label = barH;
            }
            if (this.barValues == "top") {
                translate(this.barW / 2, -this.barValuesMargin);
                textAlign(CENTER, BOTTOM);
                text(label, jump, -barH * adjustH);
            }
            else if (this.barValues == "middle") {
                translate(this.barW / 2, 0);
                textAlign(CENTER, CENTER);
                if (label !== 0) {
                    text(label, jump, -barH * adjustH / 2);
                }
            }
            else { };
            pop();

        }
        pop();



        //text customisation
        push();
        textFont(this.labelFont);
        textSize(this.labelSize);
        fill(this.labelCol);



        //x labels
        push();

        translate(gapW + this.barW / 2, this.labelMargin);

        for (let i = 0; i < nBars; i++) {

            let label = this.data[i][this.xValue];

            push();
            rotate(this.labelRotate);

            if (this.labelRotate > 0) {
                textAlign(LEFT, CENTER);
            }
            else {
                textAlign(CENTER, TOP);
            }

            text(label, 0, 0);
            pop();

            translate(this.barW + gapW, 0);
        }
        pop();



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

