'use strict';

var sponge = void 0;
function setup(){
    createCanvas(640, 640, WEBGL);
    pixelDensity(1);
}

function draw() {
    mengerSponge();
 }

  // Draws a Menger sponge. To properly call this function, add WEBGL to the createCanvas call in setup().
  function mengerSponge() {
    background(51);
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.001);
    rotateZ(frameCount * 0.0001);
    sponge = makeSponge();
    sponge.generate(2);
    sponge.show();
 }

 // Makes a pseudo-Menger Sponge. Pseudo because I haven't yet removed the 'middle' boxes.
 function makeSponge() {
    if (sponge !== void 0) {
        return sponge;
    }

    var Box = function(x, y, z, _r, _filled) {
        var pos = {x, y, z};
        var r = _r;
        var filled = _filled;

        var show = function() {
            push();
            if (filled) {
                fill(255);
            } else {
                noFill();
            }
            translate (pos.x, pos.y, pos.z);
            box(r);
            pop();
        };

        return {
            pos,
            r,
            show
        };
    };
     var Sponge = function () {
        var boxes = [];
        var spongify = function() {
            var bxs = [];
            boxes.forEach((bx, index) => {
                for (var xIndex = -1; xIndex < 2; ++xIndex) {
                    for (var yIndex = -1; yIndex < 2; ++yIndex) {
                        for (var zIndex = -1; zIndex < 2; ++zIndex) {
                            var newR = bx.r/3;
                            var fillSum = abs(xIndex) + abs(yIndex) + abs(zIndex);
                            var fill = fillSum > 1;
                            bxs.push(
                                new Box(
                                    bx.pos.x + xIndex*newR,
                                    bx.pos.y + yIndex*newR,
                                    bx.pos.z + zIndex*newR,
                                    newR,
                                    fill
                                )
                            );
                        }
                    }
                }
            });
            boxes = bxs;
        }

        var generate = function(depth) {
            if (boxes.length !== 0) {
                return;
            }
            depth = depth || 0;
            boxes.push(new Box(0,0,0,width/2, true))
            for (var spongeIndex = 0; spongeIndex < depth; ++ spongeIndex) {
                spongify();
            }            
        };

        var show = function() {
            boxes.forEach((bx) =>{
                bx.show();
            });
        };

        return {
            show,
            generate
        }
     };
     return new Sponge();
}

