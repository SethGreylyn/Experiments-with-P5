/**
 * This file provides a graphic representation of the Mandelbrot set, and was inspired by The Coding Train's Coding Challenge #21,
 * which can be viewed at https://www.youtube.com/watch?v=6z7GQewK-Ks.
 * If the image loads slowly, try rendering it on a smaller canvas.
 */
'use strict';
function setup(){
    createCanvas(640, 640);
    pixelDensity(1);
}

function draw() {
    loadPixels();

    var mapMin = -1.5; // The minimum range of the pixel map
    var mapMax = 1.5; // The maximum range of the pixel map
    var iterLimit = 100; // The maximum number of iterations to put each pixel through
    var squareMagBound = 36; // If the square of the magnitude of an output point exceeds this value, we assume the value diverges.

    // Loop through all of the pixels, converting them to a complex number, and perform the Mandelbrot process to that number.
    for (var x = 0; x < width; ++x){
        for (var y = 0; y < height; ++y) {
            // Map the pixel coordinates to a complex number a + bi within the box delimited by mapMin and mapMax.
            var a = map(x, 0, width, mapMin, mapMax);
            var b = map(y, 0, height, mapMin, mapMax);
            // Preserve the initial values of a and b, as they are added at each stage of iteration.
            var pixelA = a;
            var pixelB = b;

            // Iterate through the Mandelbrot process, starting with c = a + bi and z_0 = 0, and calculating z_i = (z_{i-1})^2 + c.
            // Note that (a + bi)^2 = a^2 - b^2 + 2abi for *any* complex number a + bi.

            // Keep track of how many iterations have taken place for a particular pixel point. Recall that the first iteration of
            // the Mandelbrot process simply returns the original complex number, and as we've remapped our values in a reasonable
            // way, we can assume we aren't starting with values beyond our squareMagBound. Thus we can start iterating at 1.
            var iterCount = 1;
            for (var i = 1; i < iterLimit; ++i) {
                var aSq = a * a;
                var bSq = b * b;
                var twoAb = 2*a*b;
                // We now have the new value, which we add to the original pixel value coordinate-wise.
                a = pixelA + aSq - bSq;
                b = pixelB + twoAb;
            
                // If the new value has a square-magnitude outside of the bounds, break out of the loop.
                if(abs(a*a + b*b) > squareMagBound) {
                    break;
                }
                // Increment the loop count and continue.
                ++iterCount;
            }
            
            // Map the iterCount to a value between 0 and 1, and then re-map the square root of this number between 0 and 255.
            var bright = map(iterCount, 0, iterLimit, 0, 1);
            bright = map(sqrt(bright), 0, 1, 0, 255);
            // If we reached iterLimit, we assume the starting point does not diverge (i.e., that it's part of the Mandelbrot set),
            // and so we make the brightness zero.
            if (iterCount === iterLimit) {
                bright = 0;
            }

            // We alter the pixel's RGB value in a somewhat arbitrary fasion; the author likes green, so we've cut the R and B values
            // down by iterCount. (We can do this because iterCount >= 1.)
            var pix = (x + y * width) * 4;
            pixels[pix + 0] = bright/iterCount;
            pixels[pix + 1] = bright;
            pixels[pix + 2] = bright/iterCount;
            pixels[pix + 3] = 255;
        }
    }
    updatePixels();
 }