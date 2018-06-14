Segment.prototype.makeLeaf = function() {
    // A tree segment can only have one leaf, but a leaf can have many leaflets.
    this.leaf = new Leaf(this);
};

// Leaf

let Leaf = function(parent) {
    this.parent = parent;
    this.root = new PetioleSegment(this, "forward");
};

Leaf.prototype.grow = function() {
    // This should 

};

// Petiole

let PetioleSegment = function(parent, direction) {
    this.parent = parent;
    this.isLeafRoot = this.parent instanceof Leaf;
    this.isPetioluleRoot = this.parent.petioluleIndex == 0;
    this.leaf = null;

    if (isLeafRoot) {
        this.isPetioluleRoot = 0;
        this.petioluleIndex = 0;
        this.petioleIndex = 0;
    } else {
        if (direction == "forward") {
            this.petioluleIndex = this.parent.petioluleIndex + 1;
            this.petioleIndex = this.parent.petioleIndex;
        } else if (direction == "left" ||  direction == "right") {
            this.petioluleIndex = 0;
            this.petioleIndex = this.parent.petioleIndex + 1;
        }
    }

    let fL = this.dna.petioleBranchingFrequencyLeft;
    let oL = this.dna.petioleBranchingOffsetLeft;
    let fR = this.dna.petioleBranchingFrequencyRight;
    let oR = this.dna.petioleBranchingOffsetRight;
    this.branchedLeft = !((this.petioluleIndex + oL) % fL == 0);
    this.branchedRight = !((this.petioluleIndex + oR) % fR == 0);
    this.branchedForward = false;
};

PetioleSegment.prototype.grow = function() {
    if (Math.random() <= this.dna.petioleBranchingProbability) {
        if (!this.branchedLeft) {
            this.branch("left");
        }
    }
    if (Math.random() <= this.dna.petioleBranchingProbability) {
        if (!this.branchedForward) {
            this.branch("forward");
        }
    }
    if (Math.random() <= this.dna.petioleBranchingProbability) {
        if (!this.branchedRight) {
            this.branch("right");
        }
    }
};

PetioleSegment.prototype.branch = function(direction) {
    // Branching is going to be fully deterministic, no probability whatsoever.
    this.children.push(new PetioleSegment(this, direction));
    this.energy -= this.dna.petioleBranchingCost;
    if (direction == "left") {
        this.branchedLeft = true;
    } else if (direction == "forward") {
        this.branchedForward = true;
    } else if (direction == "right") {
        this.branchedRight = true;
    } else {
        console.error("Invalid branching direction.");
    }
};

PetioleSegment.prototype.makeLeaflet = function() {

};

// Leaflet

let Leaflet = function() {

};

Leaflet.prototype.grow = function() {

};