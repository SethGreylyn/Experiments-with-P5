'use strict';

var snake = void 0;
var food = void 0;
var scl = 20;
function setup(){
    createCanvas(640, 640);
    frameRate(10);
    snake = new Snake();
    food = new Food();
    food.place();
}

// This function should call only one of the top-level Coding Challenge methods collected in this file.
function draw() {
    background(51);
    snake.update();
    snake.show();
    food.show();
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        snake.dir(0,-1);
    }
    if (keyCode === DOWN_ARROW) {
        snake.dir(0,1);
    }
    if (keyCode === LEFT_ARROW) {
        snake.dir(-1,0);
    }
    if (keyCode === RIGHT_ARROW) {
        snake.dir(1,0);
    }    
}

function Food() {
    this.pos = createVector(0,0);

    this.place = function () {
        var cols = floor(width/scl);
        var rows = floor(height/scl);
        var randX = floor(random(cols));
        var randY = floor(random(rows));
        this.pos.set(randX*scl, randY*scl);
    }

    this.show = function () {
        fill(255, 0, 100);
        rect(this.pos.x, this.pos.y, scl, scl);
    }
}

function Snake() {
    this.pos = createVector(0,0);
    this.xDir = 1;
    this.yDir = 0;
    this.tail = [];

    this.eatFood = function () {
        food.place();
        this.tail.push(createVector(this.pos.x, this.pos.y));
    }

    this.update = function () {
        if (this.tail.length !== 0) {
            for (var tailIndex = this.tail.length - 1; tailIndex > 0; --tailIndex) {
                this.tail[tailIndex].set(this.tail[tailIndex - 1]);
            }
            this.tail[0].set(this.pos);
        }

        this.pos.add(this.xDir * scl, this.yDir * scl);

        this.pos.x = constrain(this.pos.x, 0, width - scl);
        this.pos.y = constrain(this.pos.y, 0, height - scl);

        this.tail.forEach((segment) => {
            if (segment.equals(this.pos)) {
                this.tail = [];
            }
        });

        if (this.pos.equals(food.pos)) {
            this.eatFood();
        }
    }

    this.dir = (xDir, yDir) => {
        if (this.xDir === -xDir && this.yDir === -yDir) {
            return;
        }
        this.xDir = xDir;
        this.yDir = yDir;
    }

    this.show = function () {
        fill(255);
        rect(this.pos.x, this.pos.y, scl, scl);

        if (this.tail.length !== 0) {
            this.tail.forEach((segment) => {
                rect(segment.x, segment.y, scl, scl);
            });
        }
    }
}