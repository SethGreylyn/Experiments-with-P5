'use strict';
function setup(){
    createCanvas(640, 640);
    pixelDensity(1);
    colorMode(HSB, 1);
}

function draw() {
    loadPixels();
    var x = -0.8;
    var y = 0.156;
    basicJuliaSetPixels(x, y);
    updatePixels();
 }

 /**
  * Runs over the pixels in the canvas, entering each one as a complex input z to the function f(z) = z^2 + c,
  * which is then iterated. If no inputs are provided, the algorithm draws the Mandelbrot set.
  * @param {float} realComp The real component of the complex number c to use during iteration; if omitted, use the initial 
  * x-coordinate of the current pixel.
  * @param {float} imagiComp The imaginary component of the complex number c to use during iteration; if omitted, use the
  * initial y-coordinate of the current pixel.
  */
 function basicJuliaSetPixels(realComp, imagiComp) {
    var mapMin = -1.5; // The minimum range of the pixel map
    var mapMax = 1.5; // The maximum range of the pixel map
    var iterLimit = 100; // The maximum number of iterations to put each pixel through
    var squareMagBound = 36; // If the square of the magnitude of an output point exceeds this value, we assume the value diverges.

    // Loop through all of the pixels, converting them to a complex number, and perform the function iteration to that number.
    for (var x = 0; x < width; ++x){
        for (var y = 0; y < height; ++y) {
            // Map the pixel coordinates to a complex number a + bi within the box delimited by mapMin and mapMax.
            var a = map(x, 0, width, mapMin, mapMax);
            var b = map(y, 0, height, mapMin, mapMax);

            var fixedA = a; // For fallback use if realComp is not defined.
            var fixedB = b; // For fallback use if imagiComp is not defined.

            // Iterate through the function, starting with c = a + bi and z_0 = 0, and calculating z_i = (z_{i-1})^2 + c.
            // Note that (a + bi)^2 = a^2 - b^2 + 2abi for *any* complex number a + bi.

            // Keep track of how many iterations have taken place for a particular pixel point. Recall that the first iteration of
            // the Mandelbrot process simply returns the original complex number, and as we've remapped our values in a reasonable
            // way, we can assume we aren't starting with values beyond our squareMagBound. Thus we can start iterating at 1.
            var iterCount = 1;
            for (var i = 1; i < iterLimit; ++i) {
                var aSq = a * a;
                var bSq = b * b;
                // If the new value has a square-magnitude outside of the bounds, break out of the loop.
                if(abs(aSq + bSq) > squareMagBound) {
                    break;
                }
                var twoAb = 2*a*b;
                // We now have the new value, which we add to the inputs coordinate-wise.
                a = realComp !== void 0? realComp + aSq - bSq : fixedA + aSq - bSq;
                b = imagiComp !== void 0? imagiComp + twoAb : fixedB + twoAb;
            
                // Increment the loop count and continue.
                ++iterCount;
            }

            // Map the iterCount to a value between 0 and 255.
            var hu = map(iterCount, 1, iterLimit, 0, 1);
            var col = color(hu, 255, 255);
            // If we reached iterLimit, we assume the starting point does not diverge (i.e., that it's part of the Mandelbrot set),
            // and so we make the brightness zero.
            if (iterCount === iterLimit) {
                col = color(0);
            }

            var pix = (x + y * width) * 4;
            pixels[pix + 0] = red(col);
            pixels[pix + 1] = green(col);
            pixels[pix + 2] = blue(col);
            pixels[pix + 3] = 255;
        }
    }
 }