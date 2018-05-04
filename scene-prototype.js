let Scene = function() {
    this.frameCount = 1;
    this.shapes = [];
};

Scene.prototype.addShape = function(s) {
    this.shapes.push(s);
};

let scene = new Scene();