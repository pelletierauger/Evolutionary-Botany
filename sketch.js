let tree;

var sketch = new p5(function(p) {
    p.looping = true;
    p.fileName = "./frames/line-003/evolving-botany";
    p.maxFrames = 550;
    p.setup = function() {
        p.socket = io.connect('http://localhost:8080');
        p.cnvs = p.createCanvas(p.windowWidth, p.windowWidth / 16 * 9);
        p.ctx = p.cnvs.drawingContext;
        p.canvasDOM = document.getElementById('defaultCanvas0');
        if (!exporting)  {
            p.frameRate(30);
        } else {
            p.frameRate(1);
        }
        p.background(200);
        // p.fill(255, 50);
        p.stroke(0);
        p.strokeWeight(3);
        // p.noStroke();
        if (!p.looping) {
            p.noLoop();
        }
        let dna = new DNA();
        tree = new Tree(0, 0, dna);
    };

    p.draw = function() {
        p.background(200, 50);
        // let s = p.map(p.frameCount, 0, 200, 1, 0.9);
        p.translate(p.width /  2, p.height);
        p.scale(0.5, 0.5);
        tree.grow();
        tree.draw();



        if (exporting && p.frameCount < p.maxFrames) {
            frameExport(p);
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
        if (p.key == 'p' || p.key == 'P') {
            frameExport(p);
        }
        if (p.key == 'r' || p.key == 'R') {
            window.location.reload();
        }
        if (p.key == 'm' || p.key == 'M') {
            p.redraw();
        }
    };
});