let folioles = [];

let Foliole = function(parent) {
    this.parent = parent;
    this.dna = this.parent.dna;
    folioles.push(this);
};

Foliole.prototype.grow = function() {
    // console.log("The foliole is growing!");
};

Foliole.prototype.gatherShapes = function(x, y) {
    // console.log("The foliole is growing!");
    scene.registerEllipse(x, y);
};