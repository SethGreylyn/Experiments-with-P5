/**
 * This is my mostly-solo attempt at the reaction diffusion coding challenge, for which I only used the video
 * as a spot reference. As you can see, I went overboard and grid-ised the canvas and made each cell an object.
 * Not really satisfied, and might revisit later.
 */

'use strict';

var feedRate = 0.055;
var diffusionA = 1;
var diffusionB = 0.5;
var killRate = 0.062;
var dt = 1;

var grid = [];
var rows = 100;
var cols = 100;
var cellHeight = 10;
var cellWidth = 10;

function setup() {
    createCanvas(200, 200);
    pixelDensity(1);
    cellHeight = floor(height/rows);
    cellWidth = floor(width/rows);
    for (var r = 0; r < rows; ++r) {
        var row = [];
        for (var c = 0; c < cols; ++c) {
            row.push(new Cell(r, c, 1, 0));
        }
        grid.push(row);
    }
    seedGrid();
}

function draw() {
    background(51);
    diffusion();
    grid.forEach((row) => {
        row.forEach((cell) => {
            cell.update();
            cell.show();
        });
    });
}

function seedGrid() {
    var kBound = floor(random(5));
    for(var k = 0; k < kBound; ++k){
        var i = floor(random(rows));
        var iBound = i + floor(random(10));
        var j = floor(random(cols));
        var jBound = j + floor(random(10));
        for (i; i < iBound; ++i) {
            for (j; j < jBound; ++j) {
                grid[i][j].b = 1;
            }
        }
    }
}

function getGridCell(row, col) {
    if (row < 0 || col < 0 || row > grid.length - 1 || col > grid[row].length - 1) {
        return void 0;
    }
    return grid[row][col];
}

function laplaceA(cell) {
    var cornerWeight = 0.05;
    var neighbourWeight = 0.2;
    var centreWeight = -1;

    var topLeftCorner = getGridCell(cell.row-1,cell.col-1);
    var bottomLeftCorner = getGridCell(cell.row+1,cell.col-1);
    var topRightCorner = getGridCell(cell.row-1,cell.col+1);
    var bottomRightCorner = getGridCell(cell.row+1,cell.col+1);
    var leftNeighbour = getGridCell(cell.row,cell.col-1);
    var rightNeighbour = getGridCell(cell.row,cell.col+1);
    var topNeighbour = getGridCell(cell.row-1,cell.col);
    var bottomNeighbour = getGridCell(cell.row+1,cell.col);

    var topLeftWeight = topLeftCorner ? topLeftCorner.a * cornerWeight : 0;
    var topRightWeight = topRightCorner ? topRightCorner.a * cornerWeight : 0;
    var bottomLeftWeight = bottomLeftCorner ? bottomLeftCorner.a * cornerWeight : 0;
    var bottomRightWeight = bottomRightCorner ? bottomRightCorner.a * cornerWeight : 0;
    var leftNeighbourWeight = leftNeighbour ? leftNeighbour.a * neighbourWeight : 0;
    var rightNeighbourWeight = rightNeighbour ? rightNeighbour.a * neighbourWeight : 0;
    var topNeighbourWeight = topNeighbour ? topNeighbour.a * neighbourWeight : 0;
    var bottomNeighbourWeight = bottomNeighbour ? bottomNeighbour.a * neighbourWeight : 0;

    return cell.a * centreWeight +
    topLeftWeight + topRightWeight + bottomLeftWeight + bottomRightWeight +
    leftNeighbourWeight + rightNeighbourWeight + topNeighbourWeight + bottomNeighbourWeight;
}

function laplaceB(cell) {
    var cornerWeight = 0.05;
    var neighbourWeight = 0.2;
    var centreWeight = -1;

    var topLeftCorner = getGridCell(cell.row-1,cell.col-1);
    var bottomLeftCorner = getGridCell(cell.row+1,cell.col-1);
    var topRightCorner = getGridCell(cell.row-1,cell.col+1);
    var bottomRightCorner = getGridCell(cell.row+1,cell.col+1);
    var leftNeighbour = getGridCell(cell.row,cell.col-1);
    var rightNeighbour = getGridCell(cell.row,cell.col+1);
    var topNeighbour = getGridCell(cell.row-1,cell.col);
    var bottomNeighbour = getGridCell(cell.row+1,cell.col);

    var topLeftWeight = topLeftCorner ? topLeftCorner.b * cornerWeight : 0;
    var topRightWeight = topRightCorner ? topRightCorner.b * cornerWeight : 0;
    var bottomLeftWeight = bottomLeftCorner ? bottomLeftCorner.b * cornerWeight : 0;
    var bottomRightWeight = bottomRightCorner ? bottomRightCorner.b * cornerWeight : 0;
    var leftNeighbourWeight = leftNeighbour ? leftNeighbour.b * neighbourWeight : 0;
    var rightNeighbourWeight = rightNeighbour ? rightNeighbour.b * neighbourWeight : 0;
    var topNeighbourWeight = topNeighbour ? topNeighbour.b * neighbourWeight : 0;
    var bottomNeighbourWeight = bottomNeighbour ? bottomNeighbour.b * neighbourWeight : 0;

    return cell.a * centreWeight +
    topLeftWeight + topRightWeight + bottomLeftWeight + bottomRightWeight +
    leftNeighbourWeight + rightNeighbourWeight + topNeighbourWeight + bottomNeighbourWeight;
}

function diffusion() {
    grid.forEach((row) => {
        row.forEach((cell) => {
            cell.nextA = cell.a + (diffusionA * laplaceA(cell) - (cell.a * Math.pow(cell.b, 2)) + feedRate * (1 - cell.a)) * dt;
            cell.nextB = cell.b + (diffusionB * laplaceB(cell) + (cell.a * Math.pow(cell.b, 2)) - (killRate + feedRate)*cell.b) * dt;
        });
    });
}

function Cell(row, col, a, b) {
    this.row = row;
    this.col = col;
    this.a = a;
    this.b = b;

    this.nextA = 0;
    this.nextB = 0;

    this.update = () => {
        this.a = this.nextA;
        this.b = this.nextB;
    }

    this.show = () => {
        noStroke();
        var fillProportion = (255 + 255*(this.a - this.b)) / 2;
        fill(fillProportion);
        rect(this.col * cellWidth, this.row * cellHeight, cellWidth, cellHeight);
    };
}