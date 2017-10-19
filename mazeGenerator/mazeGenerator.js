'use strict';

var cols, rows;
var grid = [];
var cellWidth = 40;
var cellStack = [];
var currentCell;

function setup() {
    createCanvas(400,400);
    cols = floor(width/cellWidth);
    rows = floor(height/cellWidth);

    for (var r = 0; r < rows; ++r) {
        for (var c = 0; c < cols; ++c) {
            grid.push(new Cell(c, r));
        }
    }

    currentCell = grid[0];
}

function draw() {
    background(51);
    grid.forEach((cell) => {
        cell.show();
    });
    currentCell.visited = true;
    moveCurrentCell();
}

function gridIndex(col, row) {
    if (col < 0 || row < 0 || col > cols - 1 || row > rows - 1) {
        return -1;
    }
    return col + rows * row;
}

function moveCurrentCell() {
    var lonelyNeighbours = [];

    var topCell = grid[gridIndex(currentCell.col, currentCell.row - 1)];
    var leftCell = grid[gridIndex(currentCell.col - 1, currentCell.row)];
    var rightCell = grid[gridIndex(currentCell.col + 1, currentCell.row)];
    var bottomCell = grid[gridIndex(currentCell.col, currentCell.row + 1)];

    if (topCell !== void 0 && topCell !== null && !topCell.visited) {
        lonelyNeighbours.push(topCell);
    }
    if (leftCell !== void 0 && leftCell !== null && !leftCell.visited) {
        lonelyNeighbours.push(leftCell);
    }
    if (rightCell !== void 0 && rightCell !== null && !rightCell.visited) {
        lonelyNeighbours.push(rightCell);
    }
    if (bottomCell !== void 0 && bottomCell !== null && !bottomCell.visited) {
        lonelyNeighbours.push(bottomCell);
    }

    if (lonelyNeighbours.length !== 0) {
        cellStack.push(currentCell);
        var newCell = random(lonelyNeighbours);
        if (newCell.col == currentCell.col) {
            if (newCell.row == currentCell.row - 1) {
                newCell.showBottom = false;
                currentCell.showTop = false;
            } else {
                newCell.showTop = false;
                currentCell.showBottom = false;
            }
        }
        else {
            if (newCell.col == currentCell.col - 1) {
                newCell.showRight = false;
                currentCell.showLeft = false;
            }
            else {
                newCell.showLeft = false;
                currentCell.showRight = false;
            }
        }
        currentCell = newCell;
    }
    else if (cellStack.length !== 0){
        currentCell = cellStack.pop();
    }
}

function Cell(col, row) {
    this.col = col;
    this.row = row;    
    this.x = col*cellWidth;
    this.y = row*cellWidth;
    this.showTop = true;
    this.showLeft = true;
    this.showRight = true;
    this.showBottom = true;
    this.visited = false;

    this.show = () => {
        stroke(255);
        if (this.showTop) {
            line(this.x,this.y,this.x+cellWidth,this.y);
        }
        if(this.showLeft) {
            line(this.x,this.y,this.x,this.y+cellWidth);
        }
        if(this.showBottom) {
            line(this.x,this.y+cellWidth,this.x+cellWidth,this.y+cellWidth);
        }
        if(this.showRight) {
            line(this.x+cellWidth,this.y,this.x+cellWidth,this.y+cellWidth);
        }

        if(this.visited){
            noStroke();
            fill(200,49,205,100);
            rect(this.x, this.y, cellWidth, cellWidth);
        }
        else if(this.col === currentCell.col && this.row === currentCell.row) {
            noStroke();
            fill(15,255,5,200);
            rect(this.x, this.y, cellWidth, cellWidth);
        }
    };
}