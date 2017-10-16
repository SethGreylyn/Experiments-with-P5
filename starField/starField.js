'use strict';

var stars = [];
function setup(){
    createCanvas(640, 640);
    pixelDensity(1);
}

function draw() {
   starfield();
}

function starfield() {
    background(0);
    translate(width/2, height/2);
    stars = setupStars();
    stars.forEach((star)=>{
        star.update(100);
        star.show();
    });
 }

 function setupStars() {
    if (stars.length !== 0) {
        return stars;
    }
    var starsLimit = 800;
    var Star = function () {
        var x = random(-width, width);
        var y = random(-height, height);
        var d = random(width);
        var pd = d;
        var update = function (decrement) {
            d = d - decrement;
            if (d < 1) {
                d = width;
                x = random(-width, width);
                y = random(-height, height);
                pd = d;
            }
        };
        var show = function () {
            fill(255);
            noStroke();
            var sx = map(x/d, 0, 1, 0, width);
            var sy = map(y/d, 0, 1, 0, height);
    
            var r = map(d, 0, width, 8, 0);
            ellipse(sx, sy, r, r);
    
            var px = map(x/pd, 0, 1, 0, width);
            var py = map(y/pd, 0, 1, 0, height);
            stroke(255);
            line(px, py, sx, sy);
            pd = d;
        };
        return {
            x,
            y,
            update,
            show
        };
    };
    for (var starsIndex = 0; starsIndex < starsLimit; ++starsIndex) {
        stars[starsIndex] = new Star();
    }
    return stars;
}