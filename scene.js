let Scene = function() {
    this.fileName = "./frames/scene-001/botany";
    this.maxFrames = 500;
    this.frameCount = 0;
    this.shapes = [];
    this.shapesPerFrame = 10000;
    this.framePrinted = true;
    this.trees = [];
    this.hills = [];
};

Scene.prototype.addShape = function(s) {
    this.shapes.push(s);
};

Scene.prototype.registerLine = function(x1, y1, x2, y2, c) {
    let col;
    if (c) {
        col = c;
    } else {
        col = { r: 0, g: 0, b: 0, a: 255 };
    }
    this.shapes.push({
        type: "line",
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        col: col
    });
};

Scene.prototype.registerEllipse = function(x, y, c) {
    let col;
    if (c) {
        col = c;
    } else {
        col = { r: 0, g: 0, b: 0, a: 255 };
    }
    this.shapes.push({
        type: "ellipse",
        x: x,
        y: y,
        col: col
    });
};

Scene.prototype.registerPolygon = function(arr, c) {
    let col;
    if (c) {
        col = c;
    } else {
        col = { r: 0, g: 0, b: 0, a: 255 };
    }
    this.shapes.push({
        type: "polygon",
        arr: arr,
        col: col
    });
};

let lll = 0;
Scene.prototype.update = function() {
    if (this.framePrinted) {
        this.frameCount++;
        sketch.graphics.background(205);
        for (let i = 0; i < this.trees.length; i++) {
            this.trees[i].grow();
            this.trees[i].grow();
            this.trees[i].gatherShapes();
        }
        for (let i = 0; i < this.hills.length; i++) {
            this.hills[i].gatherShapes();
        }
        lll = this.shapes.length;
        this.framePrinted = false;
    }
    if (!this.framePrinted) {
        sketch.graphics.push();
        sketch.graphics.translate(sketch.width / 2, sketch.height - 50);
        sketch.graphics.scale(zoomLevel, zoomLevel);
        if (this.shapes.length <= this.shapesPerFrame) {
            for (let i = 0; i < this.shapes.length; i++) {
                this.printObject(this.shapes[i]);
            }
            this.shapes = [];
        } else {
            for (let i = 0; i < this.shapesPerFrame; i++) {
                this.printObject(this.shapes[this.shapes.length - 1]);
                this.shapes.pop();
            }
        }
    }
    if (this.shapes.length == 0) {
        this.framePrinted = true;
        sketch.graphics.pop();
        if (exporting && this.frameCount < this.maxFrames) {
            frameExport(sketch);
        }
    }
};

Scene.prototype.printz = function() {
    if (this.shapes.length <= this.shapesPerFrame) {
        sketch.graphics.background(200);
        sketch.graphics.translate(sketch.width / 2, sketch.height - 100);
        sketch.graphics.scale(zoomLevel, zoomLevel);
        tree.grow();
        tree.gatherShapes();
        for (let i = 0; i < this.shapes.length; i++) {
            this.printObject(this.shapes[i]);
        }
        this.shapes = [];
        this.frameCount++;
    } else {
        // if ()
    }
};

Scene.prototype.printObject = function(obj) {
    if (obj.type == "line") {
        // sketch.graphics.stroke(obj.col.r, obj.col.g, obj.col.b, obj.col.a);
        // sketch.graphics.line(obj.x1, obj.y1, obj.x2, obj.y2);
        let l = makeLine(obj.x1, obj.y1, obj.x2, obj.y2, 1);
        sketch.fill(120);
        sketch.beginShape();
        for (let i = 0; i < l.length; i++) {
            sketch.vertex(l[i][0], l[i][1]);
        }
        sketch.endShape(sketch.CLOSE);
    }
    if (obj.type == "ellipse") {
        // sketch.graphics.noStroke();
        sketch.fill(obj.col.r, obj.col.g, obj.col.b, obj.col.a);
        sketch.ellipse(obj.x, obj.y, 5);
    }
    if (obj.type == "polygon") {
        // sketch.graphics.noStroke();
        // let b = sketch.graphics.random(0, 100);
        // sketch.graphics.fill(b, 255);
        sketch.fill(obj.col.r, obj.col.g, obj.col.b, obj.col.a);
        sketch.beginShape();
        for (let i = 0; i < obj.arr.length; i++) {
            sketch.vertex(obj.arr[i].x, obj.arr[i].y);
        }
        sketch.endShape(sketch.CLOSE);
        // sketch.graphics.ellipse(obj.x, obj.y, 10);
    }
};

let scene = new Scene({
    name: "demo",
    type: "line",
    frameRate: 24
});

function makeLine(x0, y0, x1, y1, weight) {
    let w = weight;
    let a0 = Math.atan2(y1 - y0, x1 - x0);
    let halfPI = Math.PI * 0.5;
    let xA = x0 + Math.cos(a0 + halfPI) * w;
    let yA = y0 + Math.sin(a0 + halfPI) * w;
    let xB = x0 + Math.cos(a0 - halfPI) * w;
    let yB = y0 + Math.sin(a0 - halfPI) * w;
    let a1 = Math.atan2(y0 - y1, x0 - x1);
    let xC = x1 + Math.cos(a1 + halfPI) * w;
    let yC = y1 + Math.sin(a1 + halfPI) * w;
    let xD = x1 + Math.cos(a1 - halfPI) * w;
    let yD = y1 + Math.sin(a1 - halfPI) * w;
    return [
        [xA, yA],
        [xB, yB],
        [xC, yC],
        [xD, yD]
    ];
}