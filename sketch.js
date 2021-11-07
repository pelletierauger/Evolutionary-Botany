let JSONs;
let tree;
let zoomLevel = 0.5;
let dna;
let growth = true;
let growthScalar = 1;
const seed = Date.now();
const openSimplex = openSimplexNoise(seed);
const framesPerLoop = 300;
const noiseIncrement = Math.PI * 2 / framesPerLoop;
let noiseTime = 0;
let noiseWheel = { x: 0, y: 0 };
let exportingFrame = 0;
let noiseScalar = 1;
let totalAngle = 0;
let totalLength = 0;

var sketch = new p5(function(p) {
    p.looping = true;
    p.pixelDensity(1);
    p.fileName = "./frames/loop-001/botany";
    p.maxFrames = 450;
    p.setup = function() {
        p.socket = io.connect('http://localhost:8080');
        // p.cnvs = p.createCanvas(p.windowWidth, p.windowWidth * 9 / 16);
        p.cnvs = p.createCanvas(p.windowWidth, p.windowWidth * 9 / 16);
        p.ctx = p.cnvs.drawingContext;
        p.canvasDOM = document.getElementById('defaultCanvas0');
        p.frameRate(30);
        p.background(200);
        p.stroke(0, 255);
        p.strokeWeight(3);
        if (!p.looping) {
            p.noLoop();
        }
        dna = new DNA();
        // dna = new Genotype();
        // dna = dna.geneInterpretation;
        tree = new Tree(0, 40, dna);
        // tree = new Tree(-650, 0, dna);
        // tree = new Tree(650, 0, dna);
        // tree = new Tree(0, -p.height / 2 - 100, dna);
        // tree = new Tree(p.width / 3, -pr.height / 2 - 200, dna);
        // tree = new Tree(-p.width / 2.5, p.height / 2 - 350, dna);
        // tree = new Tree(p.width / 2.5, p.height / 2 - 350, dna);
        // tree = new Tree(-400, 0, dna);
        // tree2 = new Tree(400, 0, dna);
        p.socket.on('pushJSONs', function(data) {
            JSONs = data;
        });
        p.socket.emit('pullJSONs', "");
        scene.terrain.makeHills();
    };

    p.draw = function() {
        totalAngle = 0;
        totalLength = 0;
        noiseWheel.x = Math.cos(noiseTime);
        noiseWheel.y = Math.sin(noiseTime);
        scene.update();
        if (noiseTime == 0) {
            console.log("frameCount: " + p.frameCount);
            console.log("totalAngle: " + totalAngle);
            console.log("totalLength: " + totalLength);
        }
        noiseTime += noiseIncrement;
        if (noiseTime >= Math.PI * 2 - noiseIncrement) {
            // console.log("yurp!", p.frameCount);
            noiseTime = 0;
        }
        if (p.frameCount == 245) {
            growth = !growth;
            growthScalar = (growth) ? 1 : 0;
        }
    };

    p.keyPressed = function() {
        if (p.keyCode === 32) {
            if (p.looping) {
                p.noLoop();
                p.looping = false;
            } else {
                p.loop();
                p.looping = true;
            }
        }
        // if (p.key == 'p' || p.key == 'P') {
        //     frameExport(p);
        // }
        if (p.key == 'r' || p.key == 'R') {
            window.location.reload();
        }
        if (p.key == 'm' || p.key == 'M') {
            p.redraw();
        }
        if (p.key == 'k' || p.key == 'K') {
            zoomLevel *= 0.5;
        }
        if (p.key == 'l' || p.key == 'L') {
            zoomLevel *= 2;
        }
        if (p.key == 't' || p.key == 'T') {
            tree.reroot();
        }
        if (p.key == 'g' || p.key == 'G') {
            growth = !growth;
            growthScalar = (growth) ? 1 : 0;
        }
        if (p.key == 'p' || p.key == 'P') {
            if (!exporting) {
                exporting = true;
            }
        }
    };
});




let sky = [
    { offset: 0, r: 159, g: 107, b: 197 },
    { offset: 0.5, r: 214, g: 123, b: 163 },
    { offset: 0.8, r: 199, g: 97, b: 148 },
    { offset: 0.8, r: 174, g: 89, b: 156 }
];
// 199, 97, 148

function printBackgroundGradient() {
    let ctx = sketch.cnvs.drawingContext;
    var gradient = ctx.createLinearGradient(sketch.width * 0.5, 0, sketch.width * 0.5, sketch.height);
    var cols = sky;
    // console.log(cols);
    for (var i = 0; i < cols.length; i++) {
        gradient.addColorStop(cols[i].offset, "rgba(" + cols[i].r + ", " + cols[i].g + ", " + cols[i].b + ",1)");
        // console.log("How is this not working?");
    }
    sketch.noStroke();
    ctx.fillStyle = gradient;
    // sketch.rect(-sketch.width * 0.5, -sketch.height * 0.5, sketch.width, sketch.height);
    sketch.rect(0, 0, sketch.width, sketch.height);
    // sketch.rect(0, 0, 300, 300);
    // sketch.fill(0, 0, 255);
    // sketch.rect(0, 0, 200, 200);
}