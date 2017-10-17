'use strict';

var rainDrops = [];
var dropLimit = void 0;
var gravity = void 0;
var dropColour = void 0;

function setup(){
    createCanvas(640, 640);
    gravity = 0.1;
    dropColour = color(138, 43, 226);
    dropLimit = 500;
    for (var d = 0; d < dropLimit; ++d){
        rainDrops.push(new RainDrop());        
    }
}

// This function should call only one of the top-level Coding Challenge methods collected in this file.
function draw() {
    background(230, 230, 250);
    rainDrops.forEach((drop) => {
        drop.show();
        drop.fall();
    });
}

function RainDrop() {
    this.pos = createVector(random(width), random(-height));
    this.r = random(0, 20);
    this.speed = map(this.r, 0, 20, 4, 10);
    this.len = map(this.r, 0, 20, 10, 20);
    
    this.fall = () => {
        this.pos.add(0, this.speed);
        this.speed += gravity;
        if (this.pos.y > height) {
            this.pos.set(random(width), random(-height));
            this.speed = map(this.r, 0, 20, 4, 10);
        }
    }

    this.show = () => {
        stroke(dropColour);
        strokeWeight(map(this.r, 0, 20, 1, 3));
        line(this.pos.x, this.pos.y, this.pos.x, this.pos.y - this.len);
    }
}