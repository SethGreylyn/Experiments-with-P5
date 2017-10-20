'use strict';

var sigma = 10;
var rho = 28;
var beta = 8 / 3;

var x = 0.01;
var y = 0;
var z = 0;

var points = [];

function setup() {
    createCanvas(600,600);
}

function draw() {
    background(0);

    var dt = 0.01;
    var dx = (sigma * (y - x)) * dt;
    var dy = (x * (rho - z) - y) * dt;
    var dz = ((x * y) - (beta * z)) * dt;

    x += dx;
    y += dy;
    z += dz;

    points.push(new createVector(x, y));

    translate(width / 2, height / 2);
    scale(5);
    noFill();
    beginShape(points);

    var rSeed = 50;
    var gSeed = 100;
    var bSeed = 198;

    points.forEach((pnt) => {
        print(rSeed, gSeed, bSeed);
        stroke((rSeed++)%256, (gSeed++)%256, (bSeed++)%256);
        curveVertex(pnt.x,pnt.y);
    });
    endShape();
}