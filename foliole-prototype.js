let Foliole = function(parent) {
    this.parent = parent;
    this.dna = this.parent.dna;
};

Foliole.prototype.grow = function() {
    // console.log("The foliole is growing!");
};

Foliole.prototype.gatherShape = function(x, y) {
    // console.log("The foliole is growing!");
    scene.registerEllipse(x, y);
};