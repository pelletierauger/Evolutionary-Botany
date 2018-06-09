let JSONs;
let tree;

var sketch = new p5(function(p) {
    p.looping = true;
    p.fileName = "./frames/line-009/botany";
    p.maxFrames = 150;
    p.setup = function() {
        p.socket = io.connect('http://localhost:8080');
        p.cnvs = p.createCanvas(p.windowWidth / 16 * 9, p.windowWidth / 16 * 9);
        p.ctx = p.cnvs.drawingContext;
        p.canvasDOM = document.getElementById('defaultCanvas0');
        p.frameRate(30);
        p.background(200);
        p.stroke(0, 255);
        p.strokeWeight(3);
        if (!p.looping) {
            p.noLoop();
        }
        let dna = new DNA();
        tree = new Tree(0, 0, dna);
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
    };

    p.draw = function() {
        scene.update();
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