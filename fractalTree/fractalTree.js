'use strict';

/**
 * variables: F+-[]
 * axiom: F
 * rules: F -> FF+[+F-F-F]-[-F+F+F]
 */
var axiom = "F";
var sentence = axiom;
var rules = [];
var len = 100;
var angle = 0;

function setup(){
    createCanvas(400, 400);
    rules.push({
        input: "F",
        output: "FF+[+F-F-F]-[-F+F+F]"
    });
    var button = createButton("clickme");
    button.mousePressed(ellSystemFractalTree);

    angle = radians(25);

    drawLSystemTree();
}

function draw() {
    drawLSystemTree();
}

function applyRules(unit) {
    var ret = unit;
    for (var rulesInd = 0; rulesInd < rules.length; ++rulesInd) {
        if (unit === rules[rulesInd].input) {
            ret = rules[rulesInd].output;
            break;
        }
    }
    return ret;
}

function drawLSystemTree() {
    background(51);
    stroke(255, 100);
    translate(width/2, height);
    for (var i = 0; i < sentence.length; ++i) {
        var current = sentence.charAt(i);
        if (current === "F") {
            line(0, 0, 0, -len);
            translate(0, -len);
        }
        else if (current === "+") {
            rotate(angle);
        }
        else if (current === "-") {
            rotate(-angle);
        }
        else if (current === "[") {
            push();
        }
        else if (current === "]") {
            pop();
        }
    }
}

function ellSystemFractalTree() {
    len *= 0.5;
    for (var strInd = sentence.length - 1; strInd > -1; --strInd) {
        var currentChar = sentence.charAt(strInd);
        var prefix = sentence.substring(0, strInd) || "";
        var suffix = sentence.substring(strInd + 1, sentence.length) || "";
        sentence = prefix.concat(applyRules(currentChar),suffix);
    }
}

function recursiveFractalTree(angle, stemLength) {
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