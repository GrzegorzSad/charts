class ScatterPlot {
    constructor(obj) {
        this.data = obj.data;

        this.xValue = obj.xValue;
        this.yValue = obj.yValue;
        this.dotLabelValue = obj.dotLabelValue;

        this.transX = obj.transX !== undefined ? obj.transX : 100;
        this.transY = obj.transY !== undefined ? obj.transY : 400;

        this.chartW = obj.chartW !== undefined ? obj.chartW : 300;
        this.chartH = obj.chartH !== undefined ? obj.chartH : 300;

        this.dotW = obj.dotW !== undefined ? obj.dotW : 15;

        this.labelRotate = obj.labelRotate !== undefined ? obj.labelRotate : 90;
        this.labelMargin = obj.labelMargin !== undefined ? obj.labelMargin : 3;

        this.tickNumber = obj.tickNumber !== undefined ? obj.tickNumber : 5;
        this.tickNumberx = obj.tickNumberx !== undefined ? obj.tickNumberx : 5;
        this.tickLength = obj.tickLength !== undefined ? obj.tickLength : 10;

        this.axisCol = obj.axisCol !== undefined ? obj.axisCol : "#2e2e2e";
        this.axisWidth = obj.axisWidth !== undefined ? obj.axisWidth : 1;

        this.dotCol = obj.dotCol !== undefined ? obj.dotCol : "#e0dcdc";
        this.dotOutlineWidth = obj.dotOutlineWidth !== undefined ? obj.dotOutlineWidth : 1;
        this.dotOutlineCol = obj.dotOutlineCol !== undefined ? obj.dotOutlineCol : "#2e2e2e";

        this.dotValues = obj.dotValues !== undefined ? obj.dotValues : "top";
        this.dotValuesMargin = obj.dotValuesMargin !== undefined ? obj.dotValuesMargin : this.labelMargin;
        this.dotValuesCol = obj.dotValuesCol !== undefined ? obj.dotValuesCol : "#2e2e2e";
        this.dotValuesSize = obj.dotValuesSize !== undefined ? obj.dotValuesSize : this.labelSize;
        this.dotValuesFont = obj.dotValuesFont !== undefined ? obj.dotValuesFont : "arial";
        this.dotValuesAlign = obj.dotValuesAlign !== undefined ? obj.dotValuesAlign : "middle";

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

        this.maxx = max(this.data.map(i => +i[this.xValue]));
        this.rounding = obj.rounding !== undefined ? obj.rounding : true;
        this.maxRoundedx = this.maxx; //for now

        this.distances = [];

        this.highlightDist = obj.highlightDist !== undefined ? obj.highlightDist : this.max / 10;
        this.highlightDistCol = obj.highlightDistCol !== undefined ? obj.highlightDistCol : "#AA1111";
        this.avgLine = obj.avgLine !== undefined ? obj.avgLine : true;
        this.avgLineCol = obj.avgLineCol !== undefined ? obj.avgLineCol : "#AA1111";
        this.avgLineWidth = obj.avgLineWidth !== undefined ? obj.avgLineWidth : 5;

    }

    render() {

        push();
        translate(this.transX, this.transY);

        //ROUNDING MAX
        //maxRounded for ticks and dot h
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

        //SOME SETTINGS
        noLoop();
        angleMode(DEGREES);

        let adjustH = this.chartH / this.maxRounded;

        let adjustW = this.chartW / this.maxRoundedx;

        //linearRegression
        if (this.avgLine == true) {
            let points = [];

            for (let i = 0; i < this.data.length; i++) {
                var x = +this.data[i][this.xValue];
                var y = +this.data[i][this.yValue];
                var point = createVector(x, y);
                points.push(point);
            }

            let xSum = 0;
            let ySum = 0;
            let xySum = 0;
            let xSquaredSum = 0;
            let n = points.length;

            for (let point of points) {
                let x = point.x;
                let y = point.y;
                xSum += x;
                ySum += y;
                xySum += x * y;
                xSquaredSum += x * x;
            }

            let m = (n * xySum - xSum * ySum) / (n * xSquaredSum - xSum * xSum);
            let b = (ySum - m * xSum) / n;

            let result = { slope: m, intercept: b };


            // max x and y values from data
            let maxX = Math.max(...this.data.map(point => point[this.xValue]));
            let maxY = Math.max(...this.data.map(point => point[this.yValue]));

            if (this.rounding==true){
                for (let i = 0; i > -1; i++) {
                    if (maxX % this.tickNumber == 0) {
                        break;
                    } else {
                        maxX = round(maxX);
                        maxX += 1;
                    }
                }
                for (let i = 0; i > -1; i++) {
                    if (maxY % this.tickNumber == 0) {
                        break;
                    } else {
                        maxY = round(maxY);
                        maxY += 1;
                    }
                }
            }

            // start and stop point for regression line
            let x1 = 0;
            let y1 = result.intercept;
            let x2 = maxX;
            let y2 = result.slope * x2 + result.intercept;

            // map coords to fin in chart
            x1 = map(x1, 0, maxX, 0, this.chartW);
            y1 = map(y1, 0, maxY, this.chartH, 0);
            x2 = map(x2, 0, maxX, 0, this.chartW);
            y2 = map(y2, 0, maxY, this.chartH, 0);

            //draw the regression line
            push();
            stroke(this.avgLineCol);
            strokeWeight(this.avgLineWidth);
            translate(0, - this.chartH); //move it so it draws from bottom left of chart
            line(x1, y1, x2, y2);
            pop();

            // Calculate the distance of each point from the regression line
            for (let i = 0; i < points.length; i++) {
                //console.log(this.data[i].Country,i);
                let x = points[i].x;
                let y = points[i].y;
                let distance = Math.abs((result.slope * x - y + result.intercept) / Math.sqrt(result.slope ** 2 + 1));
                this.distances.push(distance);
            }
        }

        //DRAWING


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




        //dots
        for (let i = 0; i < +this.data.length; i++) {

            //show values on dots
            push();
            textFont(this.dotValuesFont);
            textSize(this.dotValuesSize);
            fill(this.dotValuesCol);
            noStroke();

            if (this.dotValuesAlign == "left") {
                textAlign(RIGHT, BOTTOM);
            } else if (this.dotValuesAlign == "middle") {
                textAlign(CENTER, BOTTOM);
            } else if (this.dotValuesAlign == "right") {
                textAlign(LEFT, BOTTOM);
            }

            let label = this.data[i][this.dotLabelValue];

            if (this.avgLine == false || this.distances[i] > this.highlightDist) {
                text(label, +this.data[i][this.xValue] * adjustW, +(-this.data[i][this.yValue]) * adjustH - this.dotValuesMargin);
                fill(this.highlightDistCol);
            } else {
                fill(this.dotCol)
            };

            stroke(this.dotOutlineCol);
            strokeWeight(this.dotOutlineWidth);

            ellipse(+this.data[i][this.xValue] * adjustW, +(-this.data[i][this.yValue]) * adjustH, this.dotW, this.dotW);

            pop();

        }




        //text customisation
        push();
        textFont(this.labelFont);
        textSize(this.labelSize);
        fill(this.labelCol);




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
        pop();
    }
}

