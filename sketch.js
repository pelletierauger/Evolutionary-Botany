// let JSONs;
let keysActive = true;
let tree, song, walker;
let zoomLevel = 1.5;
let dna;
let treeIsGrowing = true;
let walking = true;
let socket;
let growthScalar = 1;
let growthFrame = 0;
let maxGrowth = 250;
let spawnFreq = 30 * 4;

var sketch = new p5(function(p) {
    p.looping = true;
    p.fileName = "./frames/foliage-002/botany";
    p.maxFrames = 450;
    p.setup = function() {
        p.pixelDensity(1);
        socket = io.connect('http://localhost:8080');
        p.cnvs = p.createCanvas(p.windowWidth, p.windowHeight);
        p.ctx = p.cnvs.drawingContext;
        p.canvasDOM = document.getElementById('defaultCanvas0');
        p.graphics = p.createGraphics(p.width, p.height);
        p.graphics.background(0);
        p.graphics.stroke(0, 255);
        // p.graphics.strokeWeight(3);
        p.graphics.noStroke();
        p.frameRate(30);
        p.background(200);
        p.stroke(0, 255);
        // p.strokeWeight(1);
        p.noStroke();
        if (!p.looping) {
            p.noLoop();
        }
        dna = new DNA();
        // dna = new Genotype();
        // dna = dna.geneInterpretation;
        tree = new Tree(150, 0, dna);
        song = new Song();
        // tree = new Tree(-650, 0, dna);
        // tree = new Tree(650, 0, dna);
        // tree = new Tree(0, -p.height / 2 - 100, dna);
        // tree = new Tree(p.width / 3, -pr.height / 2 - 200, dna);
        // tree = new Tree(-p.width / 2.5, p.height / 2 - 350, dna);
        // tree = new Tree(p.width / 2.5, p.height / 2 - 350, dna);
        // tree = new Tree(-400, 0, dna);
        // tree2 = new Tree(400, 0, dna);
        // p.socket.on('pushJSONs', function(data) {
        //     JSONs = data;
        // });
        // p.socket.emit('pullJSONs', "");
        // scene.terrain.makeHills();
    };

    p.draw = function() {
        p.background(205);
        if (p.frameCount % spawnFreq == 0) {
            newWalker(0.5);
        }
        // p.background(50);
        sketch.translate(sketch.width / 2, sketch.height - 50);
        sketch.scale(zoomLevel, zoomLevel);
        if (growthFrame > maxGrowth) {
            growthScalar = 0;
        }
        if (treeIsGrowing) {
            scene.update();
        }
        // p.image(p.graphics, 0, 0, p.width, p.height);

        if (walking) {
            for (let i = 0; i < walkers.length; i++) {
                walkers[i].walk();
                walkers[i].show();
            }
        }
        if (growthScalar) {
            growthFrame++;
        }
    };

    p.keyPressed = function() {
        if (keysActive) {
            if (p.keyCode === 32) {
                if (p.looping) {
                    p.noLoop();
                    p.looping = false;
                } else {
                    p.loop();
                    p.looping = true;
                }
            }
            if (p.key == 'p' || p.key == 'P') {
                frameExport(p);
            }
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
                treeIsGrowing = !treeIsGrowing;
            }
            if (p.key == 'w' || p.key == 'W') {
                walking = !walking;
            }
            if (p.key == 'f' || p.key == 'F') {
                let walker = new Walker(tree.root, 0.05);
                // console.log("is this working???");
            }
        }
    };
});

function newWalker(s) {
    let walker = new Walker(tree.root, s);
}