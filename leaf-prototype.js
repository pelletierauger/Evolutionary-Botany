// Leaf

let leaves = [];

let Leaf = function(parent) {
    this.parent = parent;
    this.dna = this.parent.dna;
    this.angle = this.parent.angle;
    this.segmentID = 0;
    this.root = new PetioleSegment(this, "forward");
    leaves.push(this);
};

Leaf.prototype.grow = function() {
    // This should 
    this.angle = this.parent.angle;
    this.root.grow();
};

Leaf.prototype.gatherShapes = function(x, y) {
    // scene.registerEllipse(x, y);
    this.root.gatherShapes(x, y);
};

// Petiole

let PetioleSegment = function(parent, direction) {
    this.parent = parent;
    this.dna = this.parent.dna;
    this.isLeafRoot = this.parent instanceof Leaf;
    this.isBranch = (direction == "left" || direction == "right");
    this.segmentID = parent.segmentID + 1;
    this.branchedDirection = direction;
    this.foliole = null;
    this.length = 0;
    if (this.isLeafRoot) {
        this.knots = 0;
        this.energy = this.dna.initialEnergy;
        this.petioluleIndex = 0;
        this.petioleIndex = 0;
        this.lastBranching = "forward";
        this.coin = (Math.random() < 0.5) ? -1 : 1;
    } else {
        // If the petiole segment is not at the root of the leaf...

        this.energy = this.parent.energy * this.dna.energyLoss;

        // If this petiole segment was a branching segment, then...
        if (this.isBranch) {
            this.knots = 0;
            this.lastBranching = direction;
            this.petioluleIndex = 0;
            this.petioleIndex = this.parent.petioleIndex + 1;
        } else {
            // Here, direction is "forward"
            this.lastBranching = parent.lastBranching;

            // The conditional below should only be true when a segment is terminal.
            if (this.parent.knots == this.parent.maxKnots && this.dna.petioleTerminalFoliole) {
                // A terminal segment is like a branch, but forward, so indexes are adjusted.
                // A terminal segment also cannot branch anymore.
                // This is not a terminal segment !!!
                this.petioluleIndex = 0;
                this.petioleIndex = this.parent.petioleIndex + 1;
                this.knots = 0;
            } else {
                this.petioluleIndex = this.parent.petioluleIndex + 1;
                this.petioleIndex = this.parent.petioleIndex;
                this.knots = this.parent.knots;
            }
        }
        if (this.parent.children.length == 1) {
            this.coin = (Math.random() < 0.5) ? -1 : 1;
        } else {
            this.coin = this.parent.coin;
        }
    }

    let fL = this.dna.petioleBranchingFrequencyLeft;
    let oL = this.dna.petioleBranchingOffsetLeft;
    let fR = this.dna.petioleBranchingFrequencyRight;
    let oR = this.dna.petioleBranchingOffsetRight;
    this.branchedLeft = !((1 + this.petioluleIndex + oL) % fL == 0);
    this.branchedRight = !((1 + this.petioluleIndex + oR) % fR == 0);
    this.branchedForward = false;
    this.angle = this.parent.angle;
    this.angleDelta = 0;
    this.children = [];

    switch (this.petioleIndex) {
        case 0:
            this.maxKnots = this.dna.maxKnotsLevel0;
            break;
        case 1:
            this.maxKnots = this.dna.maxKnotsLevel1;
            break;
        case 2:
            this.maxKnots = this.dna.maxKnotsLevel2;
            break;
        case 3:
            this.maxKnots = this.dna.maxKnotsLevel3;
            break;
        case 4:
            this.maxKnots = this.dna.maxKnotsLevel4;
            break;
        case 5:
            this.maxKnots = this.dna.maxKnotsLevel5;
            break;
    }

    switch (this.petioleIndex) {
        case 0:
            this.maxLength = this.dna.petioleMaxSegmentLengthLevel0;
            break;
        case 1:
            this.maxLength = this.dna.petioleMaxSegmentLengthLevel1;
            break;
        case 2:
            this.maxLength = this.dna.petioleMaxSegmentLengthLevel2;
            break;
        case 3:
            this.maxLength = this.dna.petioleMaxSegmentLengthLevel3;
            break;
        case 4:
            this.maxLength = this.dna.petioleMaxSegmentLengthLevel4;
            break;
        case 5:
            this.maxLength = this.dna.petioleMaxSegmentLengthLevel5;
            break;
    }
};

PetioleSegment.prototype.grow = function() {

    //------------------------------------------------------------------------------
    // This allows the branches to reach their desired angle.

    if (this.isBranch) {
        if (Math.abs(this.angleDelta) < this.dna.petioleMaxAngleDelta) {
            if (this.lastBranching == "left") {
                this.angleDelta += this.dna.petioleAngleGrowth;
            } else if (this.lastBranching == "right") {
                this.angleDelta -= this.dna.petioleAngleGrowth;
            }
        }
    }
    this.angleDelta += (Math.random() > 0.5) ? -0.0015 : 0.0015;
    this.angle = this.parent.angle + this.angleDelta;
    //------------------------------------------------------------------------------

    //------------------------------------------------------------------------------
    // Growing the folioles
    //------------------------------------------------------------------------------

    for (let i = 0; i < this.children.length; i++) {
        this.children[i].grow();
        if (this.children[i].foliole) {
            this.children[i].foliole.grow();
        }
    }

    //------------------------------------------------------------------------------
    // Actually growing the length of the segment
    //------------------------------------------------------------------------------

    if (this.energy > 0) {
        if (this.length < this.maxLength) {
            this.length += this.dna.petioleSegmentGrowth;
            this.energy -= this.dna.petioleSegmentGrowthCost;
        }
    }

    //------------------------------------------------------------------------------
    // Checking to see if any branching needs to be done.
    //------------------------------------------------------------------------------

    if (this.knots < this.maxKnots) {
        if (this.petioleIndex < this.dna.petioluleDepth) {
            // if (Math.random() <= this.dna.petioleBranchingProbability) {
            if (!this.branchedLeft) {
                if (this.children.length == 0) {
                    this.knots++;
                }
                this.branch("left");
            }
            // }
            // if (Math.random() <= this.dna.petioleBranchingProbability) {
            if (!this.branchedRight) {
                if (this.children.length == 0) {
                    this.knots++;
                }
                this.branch("right");
            }
            // }
        }
    }

    //------------------------------------------------------------------------------
    // Can a segment branch forward ???
    // if (this.knots < this.maxKnots) ... it can IF... terminals is true...
    // but if (this.knots == this.maxKnots)... it can if this. 
    //------------------------------------------------------------------------------

    if ((this.petioleIndex < this.dna.petioluleDepth && this.knots < this.maxKnots) ||
        (this.petioleIndex < this.dna.petioluleDepth && this.dna.petioleTerminalFoliole) ||
        (this.petioleIndex == this.dna.petioluleDepth &&
            this.petioluleIndex < this.dna.petioleSegmentsToFoliole)) {
        // if ((this.knots < this.maxKnots) ||
        // (this.knots == this.maxKnots && this.dna.petioleTerminalFoliole &&
        // this.petioluleIndex < this.dna.petioleSegmentsToFoliole)) {

        if (Math.random() <= this.dna.petioleBranchingProbability) {
            if (!this.branchedForward) {
                this.branch("forward");
            }
        }
        // }
    }

    if (this.petioleIndex == this.dna.petioluleDepth) {
        // if (Math.random() <= this.dna.folioleProbability) {
        if (!this.foliole && !this.branchedForward) {
            this.makeFoliole();
        }
        // }
    }
};

PetioleSegment.prototype.branch = function(direction) {
    this.children.push(new PetioleSegment(this, direction));
    this.energy -= this.dna.petioleBranchingCost;

    if (direction == "left") {
        this.branchedLeft = true;
    } else if (direction == "forward") {
        this.branchedForward = true;
        if (this.foliole) {
            this.pushFoliole(this.children[this.children.length - 1]);
        }
    } else if (direction == "right") {
        this.branchedRight = true;
    } else {
        console.error("Invalid branching direction.");
    }
};

PetioleSegment.prototype.gatherShapesDebug = function(x, y) {
    scene.registerEllipse(x, y);
};

PetioleSegment.prototype.gatherShapes = function(x, y) {
    let a = this.angle;
    let l = this.length;
    var newX = x + Math.cos(a) * l;
    var newY = y - Math.sin(a) * l;
    // sketch.strokeWeight(sketch.map(this.segmentID, 0, 40, 50, 5));
    // sketch.line(x, y, newX, newY);
    // console.log("x: " + x + ", y: " + y + ", newX: " + newX + " newY: " + newY);
    // if (this.petioleIndex == 0) {
    //     scene.registerLine(x, y, newX, newY, { r: 205, g: 0, b: 0, a: 55 });
    // } else if (this.petioleIndex == 1) {
    //     scene.registerLine(x, y, newX, newY, { r: 0, g: 155, b: 0, a: 55 });
    // } else if (this.petioleIndex == 2) {
    //     scene.registerLine(x, y, newX, newY, { r: 0, g: 0, b: 255, a: 55 });
    // } else if (this.petioleIndex == 3) {
    //     scene.registerLine(x, y, newX, newY, { r: 255, g: 0, b: 255, a: 55 });
    // }
    scene.registerLine(x, y, newX, newY, { r: 0, g: 0, b: 0, a: 255 });
    if (this.foliole) {
        this.foliole.gatherShapes(newX, newY);
    }
    for (let i = 0; i < this.children.length; i++) {
        this.children[i].gatherShapes(newX, newY);
    }
};

PetioleSegment.prototype.makeFoliole = function() {
    this.foliole = new Foliole(this);
};

PetioleSegment.prototype.pushFoliole = function(destination) {
    if (this.foliole) {
        destination.foliole = this.foliole;
        destination.foliole.parent = destination;
        this.foliole = null;
    }
};