let Tree = function(x, y, dna) {
    this.pos = { x: x, y: y };
    this.dna = dna;
    this.angle = Math.PI / 2;
    this.root = new Segment(this, dna);
};

Tree.prototype.grow = function() {
    this.root.grow();
};

Tree.prototype.gatherShapes = function() {

};

Tree.prototype.draw = function() {
    this.root.draw(this.pos.x, this.pos.y);
};

//-----------------------------------------------------------------

let Segment = function(parent) {
    this.parent = parent;
    this.dna = parent.dna;
    this.isRoot = this.parent instanceof Tree;
    if (this.isRoot) {
        this.energy = this.dna.initialEnergy;
        this.angle = this.parent.angle
    } else {
        this.energy = this.parent.energy * this.dna.energyLoss;
        let coin = (Math.random() > 0.5) ? -1 : 1;
        this.angle = this.parent.angle + this.dna.branchingAngle * coin;
        this.angle += (Math.random() > 0.5) ? -0.1 : 0.1;
    }
    this.children = [];
    this.length = 0;
};

Segment.prototype.grow = function() {
    if (this.energy > 0) {
        this.length += this.dna.branchGrowth;
        this.energy -= this.dna.branchGrowthCost;
    }
    for (let i = 0; i < this.children.length; i++) {
        this.children[i].grow();
    }
    if (Math.random() <= this.dna.branchingProbability) {
        this.branch();
    }
    this.angle += (Math.random() > 0.5) ? -0.005 : 0.005;
};

Segment.prototype.branch = function() {
    this.children.push(new Segment(this));
    this.energy -= this.dna.branchingCost;
};

Segment.prototype.draw = function(x, y) {
    let a = this.angle;
    let l = this.length;
    var newX = x + Math.cos(a) * l;
    var newY = y - Math.sin(a) * l;
    sketch.line(x, y, newX, newY);
    for (let i = 0; i < this.children.length; i++) {
        this.children[i].draw(newX, newY);
    }
};

Segment.prototype.gatherShapes = function() {

};