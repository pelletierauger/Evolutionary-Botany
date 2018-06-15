let DNA = function() {
    // Energy
    this.initialEnergy = 30;
    this.energyLoss = 0.9;
    this.branchGrowthCost = 0.01;
    this.branchingCost = 0.02;

    // Branching struture
    this.branchGrowth = 0.01;
    this.branchingAngle = Math.PI * 0.5;
    this.branchingProbability = 0.25;
    this.branchingFrequencyLeft = 8;
    this.branchingFrequencyRight = 8;
    this.branchingOffsetLeft = 0;
    this.branchingOffsetRight = 0;
    this.leafingProbability = 0.1;

    // Leaf structure
    this.petioleSegmentGrowth = 4;
    this.petioleMaxBranchings = 0.01;
    this.petioleMaxSegmentLength = 40;
    this.petioleSegmentsToFoliole = 4;
    this.petioleSegmentGrowthCost = 0.01;
    this.petioleBranchingCost = 0.01;
    this.petioleMaxAngleDelta = Math.PI * 0.5;
    this.petioleAngleGrowth = 0.01;
    this.petioleBranchingProbability = 1;
    this.folioleProbability = 0.25;
    this.petioleBranchingFrequencyLeft = 4;
    this.petioleBranchingFrequencyRight = 4;
    this.petioleBranchingOffsetLeft = 0;
    this.petioleBranchingOffsetRight = 0;
    this.petioluleDepth = 3;
    this.petioleTerminalFoliole = false;
    this.petioleMaxLeafletAmount = 10;

    this.maxKnotsLevel0 = 1;
    this.maxKnotsLevel1 = 2;
    this.maxKnotsLevel2 = 3;
    this.maxKnotsLevel3 = 5;
    this.maxKnotsLevel4 = 2;
    this.maxKnotsLevel5 = 2;
};