class StackedBarChart {
    constructor(obj) {
        this.data = obj.data;

        this.xValue = obj.xValue;
        this.yValues = obj.yValues;

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

        this.barColors = obj.barColors !== undefined ? obj.barColors : ["#a48abd", "#e8aa78", "#e2918f", "#629ddd", "#a4bf7f", "#a5d7d8", "#a48abd"];
        this.barOutlineWidth = obj.barOutlineWidth !== undefined ? obj.barOutlineWidth : 1;
        this.barOutlineCol = obj.barOutlineCol !== undefined ? obj.barOutlineCol : "#2e2e2e";

        this.barValues = obj.barValues !== undefined ? obj.barValues : "true";
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

        this.rounding = obj.rounding !== undefined ? obj.rounding : true;
        this.maxRounded = 0; //for now

    }



    render() {

        //SOME SETTINGS
        noLoop();
        angleMode(DEGREES);




        //MAX VALUE FOR SCALE

        //looking for highest stack of bars for scale height
        let arrays = [];

        for (let i = 0; i < this.yValues.length; i++) {    //we get arrays of just numbers for all the bars
            arrays.push(this.data.map(j => +j[this.yValues[i]]));
        }

        let sumArray = new Array(arrays[0].length).fill(0);  //empty array with the length of one of the arrays

        // Iterate through each array in arrays
        arrays.forEach(subArray => {
            // Iterate through each element in the subArray
            subArray.forEach((value, i) => {
                // Add the value to the sumArray at the corresponding index
                sumArray[i] += value;
            });
        });

        this.max = max(sumArray);
        this.maxRounded = this.max;


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



        //bars
        let nBars = this.data.length;
        let gapW = (this.chartW - this.barW * nBars) / (nBars + 1);
        let adjustH = this.chartH / this.maxRounded;

        push();
        stroke(this.barOutlineCol);
        strokeWeight(this.barOutlineWidth);

        translate(gapW, 0);
        for (let i = 0; i < nBars; i++) { //for the ammount of bars a loop

            let jump = this.barW * i + gapW * i;

            push();
            for (let j = 0; j < this.yValues.length; j++) {  //for the ammount of stacks a loop

                let barH = +this.data[i][this.yValues[j]];

                //drawing totals
                push();
                textFont(this.barValuesFont);
                textSize(this.barValuesSize);
                fill(this.barValuesCol);
                noStroke();

                translate(this.barW / 2, 0);
                textAlign(CENTER, CENTER);


                //only if its on in the setting and were doing a new bar of stacked bars
                if (this.barValuesSum == true && j % this.yValues.length == 0) {
                    let label;

                    if (this.decimal !== false) {
                        label = sumArray[i].toFixed(this.decimal);
                    } else {
                        label = sumArray[i];
                    }
                    text(label, jump, -sumArray[i] * adjustH - this.barValuesMargin);
                }
                pop();

                //drawing bars
                fill(this.barColors[j]);

                rect(jump, 0, this.barW, -barH * adjustH);


                //the second text drawing is after the translate
                translate(0, -barH * adjustH);

                //adding values labels on the
                push();
                textFont(this.barValuesFont);
                textSize(this.barValuesSize);
                fill(this.barValuesCol);
                noStroke();

                translate(this.barW / 2, 0);
                textAlign(CENTER, CENTER);

                if (this.barValues == true) {

                    let label;

                    if (this.decimal !== false) {
                        label = barH.toFixed(this.decimal);
                    } else {
                        label = barH;
                    }
                    if (label != 0) {   //it looks bad if it displays 0's
                        text(label, jump, barH * adjustH / 2);
                    }
                }
                pop();
            }
            pop();
        }
        pop();



        //text customisation used in labels on both axis
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

