'use strict';

function setup(){
    createCanvas(640, 640);
    pixelDensity(1);
}

function draw() {
    fractalTree(QUARTER_PI/Math.exp(1), 200);
}

function fractalTree(angle, stemLength) {
    background(51);
    stroke(255);
    translate(width/2, height);
    var branch = function(length) {
        if (length < 1) {
            return;
        }
        line(0, 0, 0, -length);
        translate(0, -length);
        push();
        rotate(angle);
        branch(length*(2/3));
        pop();
        push();
        rotate(-angle);
        branch(length*(2/3));
        pop();
    };
    branch(stemLength);
 }