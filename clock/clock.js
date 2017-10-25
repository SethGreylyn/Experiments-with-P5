'use strict';

function setup() {
    createCanvas(200, 200);
    background(51);
}

function draw() {
    background(51);
    var hr = hour();
    var min = minute();
    var sec = second();
    translate(width/2, height/2);    
    noFill();
    var startAngle = 3*PI / 2;
    var secAngle = sec * (2 * PI) / 60;
    if (sec !== 0) {
        stroke(255);
        strokeWeight(4);
        arc(0, 0, 30, 30, startAngle, secAngle + startAngle);        
    }

    var minAngle = min * (2 * PI) / 60;
    if (min !== 0) {
        stroke(153, 0, 0);
        strokeWeight(7);
        arc(0, 0, 50, 50, startAngle, minAngle + startAngle);        
    }

    var hrAngle = hr * (2 * PI) / 24;
    if (hr !== 0) {
        stroke(0, 122, 0);
        strokeWeight(11);
        arc(0, 0, 80, 80, startAngle, hrAngle + startAngle);
    }
}